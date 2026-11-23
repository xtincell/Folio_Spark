"""Assemble generated cels with the untouched vector white structure.
Only crops, color mattes, translations and layer compositing are used.
No procedural flame deformation or invented intermediate shape.
"""
from pathlib import Path
from PIL import Image,ImageChops,ImageDraw,ImageFont
import json,subprocess,os
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'etude';OUT.mkdir(exist_ok=True)
S=512;ORANGE=(240,90,40);NIGHT=(10,14,26,255)
sheet=Image.open(ROOT/'generation/02-etude-flammes-aplats.png').convert('RGB')
white=Image.open(ROOT/'references/structure-blanche-exacte.png').convert('RGBA')

def matte(cel):
    m=Image.new('L',(S,S));m.putdata([round(min(1,max(0,(r-b)/200))*255) if r>g*1.55 and r>b*2 and r-b>12 else 0 for r,g,b in cel.get_flattened_data()]);return m

def parts(mask):
    pixels=list(mask.get_flattened_data());left=Image.new('L',(S,S));left.putdata([v if i%S<250 else 0 for i,v in enumerate(pixels)])
    todo={i for i,v in enumerate(pixels) if v>8 and i%S>=250};components=[]
    while todo:
        seed=todo.pop();stack=[seed];part={seed}
        while stack:
            a=stack.pop();x,y=a%S,a//S
            for b in [a-1 if x else -1,a+1 if x<S-1 else -1,a-S if y else -1,a+S if y<S-1 else -1]:
                if b in todo:todo.remove(b);part.add(b);stack.append(b)
        components.append(part)
    big=max(components,key=len);med=Image.new('L',(S,S));small=Image.new('L',(S,S))
    med.putdata([v if i in big else 0 for i,v in enumerate(pixels)])
    small.putdata([v if i%S>=250 and i not in big else 0 for i,v in enumerate(pixels)])
    return {5:left,0:med,1:small}

def root(mask):
    # Base of all three source flames is their lowest pointed end.
    solid=mask.point(lambda x:255 if x>128 else 0);b=solid.getbbox();y=b[3]-1
    row=[x for x in range(b[0],b[2]) if solid.getpixel((x,y))]
    return round(sum(row)/len(row)),y

anchors={i:root(Image.open(ROOT/f'references/flamme-{i}-originale.png').getchannel('A')) for i in [0,1,5]}
frames=[];report=[]
for n in range(6):
    x=n%3*S;y=n//3*S;cel=sheet.crop((x,y,x+S,y+S));ms=parts(matte(cel));layers={};offsets={}
    for i,m in ms.items():
        a=root(m);b=anchors[i];dx=b[0]-a[0];dy=b[1]-a[1]
        fixed=Image.new('L',(S,S));fixed.paste(m,(dx,dy));layer=Image.new('RGBA',(S,S),ORANGE+(0,));layer.putalpha(fixed);layers[i]=layer
        offsets[i]=[dx,dy]
    frame=Image.new('RGBA',(S,S),NIGHT)
    for layer in [layers[0],layers[1],white,layers[5]]:frame.alpha_composite(layer)
    frame.save(OUT/f'cel-{n+1:02}.png');frames.append(frame.convert('RGB'));report.append({'cel':n+1,'flame_translation_px':offsets})

frames[0].save(OUT/'feu-genere-etude.gif',save_all=True,append_images=frames[1:],duration=160,loop=0,optimize=True)
contact=Image.new('RGB',(1536,1088),NIGHT[:3]);draw=ImageDraw.Draw(contact)
font=ImageFont.truetype(str(ROOT/'source/Ubuntu-R.ttf'),18)
for n,frame in enumerate(frames):
    x=n%3*S;y=n//3*544;contact.paste(frame,(x,y));draw.text((x+24,y+516),f'{n+1:02} / étude de la vague',font=font,fill=(167,176,195))
contact.save(ROOT/'etude-hybride.jpg',quality=94)
(OUT/'assemblage.json').write_text(json.dumps({'source':'02-etude-flammes-aplats.png','white':'original SVG, unmodified paths','background':'#0A0E1A','flames':'#F05A28','anchors':anchors,'cels':report,'status':'six-cel motion study; not a final seamless loop'},indent=2,ensure_ascii=False)+'\n')
ff=os.environ.get('FFMPEG')
if ff:
    # Six held drawings in a 24 fps container. Repeat only for easier inspection.
    listing=OUT/'montage.txt'
    listing.write_text(''.join(f"file 'cel-{n+1:02}.png'\nduration 0.166666667\n" for _ in range(3) for n in range(6))+"file 'cel-06.png'\n")
    subprocess.run([ff,'-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(listing),'-vf','scale=out_color_matrix=bt709:out_range=tv,format=yuv420p','-r','24','-t','3','-c:v','libx264','-crf','16','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart','-an',str(OUT/'feu-genere-etude.mp4')],check=True)
print('Six generated cels assembled over original white paths. Study only.')
