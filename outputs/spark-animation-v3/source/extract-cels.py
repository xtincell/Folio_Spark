from pathlib import Path
from PIL import Image,ImageDraw
import json,math
ROOT=Path(__file__).resolve().parent.parent
base=json.loads((ROOT/'source/master.json').read_text());N=base['N'];masters=base['master']

def connected(pixels,w,h):
    todo=set(pixels);cs=[]
    while todo:
        a=todo.pop();stack=[a];part=[a]
        while stack:
            a=stack.pop();x,y=a%w,a//w
            for b in [a-1 if x else -1,a+1 if x<w-1 else -1,a-w if y else -1,a+w if y<h-1 else -1]:
                if b in todo:todo.remove(b);stack.append(b);part.append(b)
        if len(part)>=5:cs.append(part)
    return cs

def interp(xs,x):
    x=max(0,min(len(xs)-1,x));i=int(x);j=min(len(xs)-1,i+1);return xs[i]+(xs[j]-xs[i])*(x-i)

def profile(points,w,h,idx,scale):
    m=masters[str(idx)];rows={}
    for k in points:
        x,y=k%w,k//w;rows.setdefault(y,[]).append(x)
    ymin=min(rows);ymax=max(rows)
    # Missing slices behind the white foreground are bridged between neighbours.
    ys=sorted(rows);left=[];right=[]
    for y in range(ymin,ymax+1):
        if y in rows:lo=min(rows[y]);hi=max(rows[y])+1
        else:
            loY=max(k for k in ys if k<y);hiY=min(k for k in ys if k>y);a=(y-loY)/(hiY-loY)
            lo=min(rows[loY])*(1-a)+min(rows[hiY])*a;hi=(max(rows[loY])+1)*(1-a)+(max(rows[hiY])+1)*a
        left.append(lo);right.append(hi)
    root=(left[-1]+right[-1])/2
    # Denoise only pixel edges, retaining the generated drawing and its tip.
    smooth=[]
    for k in range(N+1):
        pos=k/N*(len(left)-1);weights=[math.exp(-q*q/(2*2.4*2.4)) for q in range(-7,8)]
        l=sum(interp(left,pos+q)*v for q,v in zip(range(-7,8),weights))/sum(weights)
        r=sum(interp(right,pos+q)*v for q,v in zip(range(-7,8),weights))/sum(weights)
        taper=min(1,k/2,(N-k)/2)
        center=(l+r)/2;half=max(0,(r-l)/2)*taper
        smooth.append([m['root']+(center-half-root)*scale,m['root']+(center+half-root)*scale])
    smooth[-1]=[m['root'],m['root']]
    return {'top':m['bottom']-(ymax-ymin)*scale,'bottom':m['bottom'],'root':m['root'],'rows':smooth}

def extract(file,cols,rows):
    im=Image.open(file).convert('RGBA');out=[]
    for n in range(cols*rows):
        x0=round((n%cols)*im.width/cols);x1=round((n%cols+1)*im.width/cols)
        y0=round((n//cols)*im.height/rows);y1=round((n//cols+1)*im.height/rows)
        cel=im.crop((x0,y0,x1,y1));w,h=cel.size;px=list(cel.get_flattened_data())
        orange={i for i,(r,g,b,a) in enumerate(px) if r>175 and 45<g<145 and b<100 and r>g*1.55 and r>b*2 and a>210}
        cs=connected(orange,w,h);regions={0:[],1:[],5:[]}
        for c in cs:
            cx=sum(k%w for k in c)/len(c)/w;cy=sum(k//w for k in c)/len(c)/h
            idx=5 if cx<.50 else (0 if cy<.56 else 1)
            regions[idx].extend(c)
        white=[i for i,(r,g,b,a) in enumerate(px) if r>235 and g>235 and b>235 and a>245]
        wy=[k//w for k in white];white_height=max(wy)-min(wy)
        # Original white vertical extent from its traced bounds, in the 512 reference.
        scale=(.205*(2063.98-211.23))/white_height
        current={str(i):profile(regions[i],w,h,i,scale) for i in regions}
        out.append(current)
    return out
intro=extract(ROOT/'generation/flames-development-8.png',4,2)
idle=extract(ROOT/'generation/flames-idle-6.png',3,2)
base['intro']=intro;base['idle']=idle
(ROOT/'source/animation-data.json').write_text(json.dumps(base,separators=(',',':')))
(ROOT/'source/animation-data.js').write_text('window.SPARK_DATA='+json.dumps(base,separators=(',',':'))+';\n')
# Show extracted cels with exact white; this plate is only a contour/compositing check.
white=Image.open(ROOT/'references/white-512.png').convert('RGBA')
contact=Image.new('RGB',(2048,1024),(10,14,26))
for n,cel in enumerate(intro):
    canvas=Image.new('RGBA',(512,512),(10,14,26,255));draw=ImageDraw.Draw(canvas)
    def layer(idx):
        p=cel[str(idx)];ys=[p['top']+(p['bottom']-p['top'])*j/N for j in range(N+1)]
        poly=[(r[0],y) for r,y in zip(p['rows'],ys)]+[(r[1],y) for r,y in reversed(list(zip(p['rows'],ys)))]
        draw.polygon(poly,fill=(240,90,40,255))
    layer(0);layer(1);canvas.alpha_composite(white);draw=ImageDraw.Draw(canvas);layer(5)
    contact.paste(canvas.convert('RGB'),((n%4)*512,(n//4)*512))
contact.save(ROOT/'verification/extracted-cels.jpg',quality=94)
print('Eight development cels and six idle cels extracted; three anchored profiles in every cel.')
