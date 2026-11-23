/* Spark / Feu intérieur. Original six-path vector master, deterministic time.
 * No dependencies. See README.md for integration and editing.
 */
(function (global) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const TAU = Math.PI * 2;
  const C = [722.28, 1341.70];
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = x => { x = clamp(x); return x*x*(3-2*x); };
  const out = x => 1-Math.pow(1-clamp(x), 3);
  const stage = (t,a,b) => clamp((t-a)/(b-a));
  const number = x => Math.abs(x) < .00005 ? '0' : x.toFixed(4);
  const node = (name, attrs={}) => { const e=document.createElementNS(NS,name); for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);return e; };

  // Lossless absolute conversion: retain every original Bezier segment and its order.
  function absolutePath(d) {
    const tokens=d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g);
    const counts={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,Z:0};
    let i=0,cmd='',x=0,y=0,sx=0,sy=0,prev='',cp=null;
    const result=[];
    while(i<tokens.length){
      if(/[a-zA-Z]/.test(tokens[i]))cmd=tokens[i++];
      const c=cmd.toUpperCase(),rel=cmd!==c,n=counts[c];
      if(n===undefined)throw Error('Unsupported SVG command '+c);
      if(c==='Z'){result.push(['Z']);x=sx;y=sy;prev='Z';cp=null;cmd='';continue;}
      const a=tokens.slice(i,i+n).map(Number); i+=n;
      const pt=(j)=>[a[j]+(rel?x:0),a[j+1]+(rel?y:0)];
      let row;
      if(c==='M'||c==='L'){const p=pt(0);row=[c,...p];x=p[0];y=p[1];if(c==='M'){sx=x;sy=y;cmd=rel?'l':'L';}cp=null;}
      if(c==='H'){x=a[0]+(rel?x:0);row=['L',x,y];cp=null;}
      if(c==='V'){y=a[0]+(rel?y:0);row=['L',x,y];cp=null;}
      if(c==='C'){const p=pt(0),q=pt(2),r=pt(4);row=['C',...p,...q,...r];cp=q;[x,y]=r;}
      if(c==='S'){const p=(prev==='C'||prev==='S')?[2*x-cp[0],2*y-cp[1]]:[x,y];const q=pt(0),r=pt(2);row=['C',...p,...q,...r];cp=q;[x,y]=r;}
      if(c==='Q'){const p=pt(0),q=pt(2);row=['Q',...p,...q];cp=p;[x,y]=q;}
      if(c==='T'){const p=(prev==='Q'||prev==='T')?[2*x-cp[0],2*y-cp[1]]:[x,y];const q=pt(0);row=['Q',...p,...q];cp=p;[x,y]=q;}
      result.push(row);prev=c;
    }
    return result;
  }
  function warpPath(segments,fn){return segments.map(seg=>{let d=seg[0];for(let i=1;i<seg.length;i+=2){const p=fn(seg[i],seg[i+1]);d+=number(p[0])+','+number(p[1])+' ';}return d;}).join('');}

  const FLAMES = [
    { index:0,name:'Flamme moyenne',root:[1008.53,1292.31],tip:[1440.9,700.8],bend:30,phase:1.2,begin:.12,end:1.64 },
    { index:1,name:'Petite flamme',root:[873.48,1709.36],tip:[1121.79,1366.91],bend:18,phase:3.8,begin:.23,end:1.42 },
    { index:5,name:'Grande flamme',root:[395.65,1550],tip:[470.34,478.12],bend:42,phase:.3,begin:.04,end:1.98 }
  ];

  class SparkAnimation {
    static durations = { apparition:4.2, boucle:3 };
    constructor(target,{width=1080,height=1080,background='transparent',size=.68}={}){
      this.width=width;this.height=height;this.size=size;
      this.svg=node('svg',{xmlns:NS,viewBox:`0 0 ${width} ${height}`,width,height,role:'img','aria-label':'Animation du symbole Spark'});
      this.bg=node('rect',{width,height,fill:background==='transparent'?'none':background});this.svg.append(this.bg);
      const uid='spark-'+Math.random().toString(36).slice(2);
      const defs=node('defs'),clip=node('clipPath',{id:uid,clipPathUnits:'userSpaceOnUse'});
      clip.append(node('rect',{x:655.34,y:105.18,width:852.26,height:1106.87,transform:'translate(-151.33 369.53) rotate(-18.14)'}));defs.append(clip);this.svg.append(defs);
      this.composition=node('g');this.svg.append(this.composition);
      this.groups=[];this.paths=[];
      SPARK_BRAND.paths.forEach((d,i)=>{
        const g=node('g',{'data-element':i});const p=node('path',{d,fill:[0,1,5].includes(i)?'#F05A28':i===4?'none':'#FFFFFF'});
        if(i===4)for(const [k,v]of Object.entries({stroke:'#FFFFFF','stroke-width':20,'stroke-linecap':'round','stroke-linejoin':'round'}))p.setAttribute(k,v);
        if(i===2){const clipped=node('g',{'clip-path':`url(#${uid})`});clipped.append(p);g.append(clipped);}else g.append(p);
        this.composition.append(g);this.groups.push(g);this.paths.push(p);
      });
      this.flames=FLAMES.map(f=>({...f,segments:absolutePath(SPARK_BRAND.paths[f.index])}));
      if(target)target.append(this.svg);this.resize(width,height);this.render(4.2,'apparition');
    }
    resize(width,height){
      this.width=width;this.height=height;
      this.svg.setAttribute('viewBox',`0 0 ${width} ${height}`);this.svg.setAttribute('width',width);this.svg.setAttribute('height',height);
      this.bg.setAttribute('width',width);this.bg.setAttribute('height',height);
      const scale=Math.min(width,height)*this.size/1870;
      // Optical centre of visible paths, not the padded source viewBox.
      this.composition.setAttribute('transform',`translate(${width/2},${height/2}) scale(${scale}) translate(-735,-1136)`);
    }
    background(fill){this.bg.setAttribute('fill',fill==='transparent'?'none':fill);}
    render(time,mode='apparition'){
      const intro=mode==='apparition',t=intro?Math.max(0,time):((time%3)+3)%3;
      const exact=(intro&&t>=3.48)||(!intro&&(t<1e-9||Math.abs(t-3)<1e-9));
      this.groups.forEach(g=>{g.removeAttribute('transform');g.setAttribute('opacity',1);});
      if(intro){
        const star=out(stage(t,.06,1.66)),need=out(stage(t,.15,1.89));
        const starA=-146*Math.pow(1-star,1.05)+6*Math.sin(Math.PI*star)*(1-star);
        // A small angular lag keeps the four-point silhouette legible while
        // the independent extension/settling timing gives the needles their own life.
        const needleA=starA-8*Math.sin(Math.PI*need)*(1-need);
        this.groups[3].setAttribute('transform',`translate(${C}) rotate(${starA}) scale(${.016+.984*star}) translate(${-C[0]},${-C[1]})`);
        this.groups[4].setAttribute('transform',`translate(${C}) rotate(${needleA}) scale(${.012+.988*need}) translate(${-C[0]},${-C[1]})`);
        this.groups[3].setAttribute('opacity',smooth(stage(t,.06,.18)));
        this.groups[4].setAttribute('opacity',smooth(stage(t,.15,.36)));
        // Stretch along the sword's own axis; keep the original clipping rectangle inside.
        const blade=out(stage(t,.08,1.52)),long=.015+.985*blade,wide=.1+.9*out(stage(t,.16,1.1));
        this.groups[2].setAttribute('transform',`translate(${C}) rotate(-67.78) scale(${long},${wide}) rotate(67.78) translate(${-C[0]},${-C[1]})`);
        this.groups[2].setAttribute('opacity',smooth(stage(t,.08,.26)));
      }
      for(const f of this.flames){
        const p=this.paths[f.index],g=this.groups[f.index];
        if(exact){p.setAttribute('d',SPARK_BRAND.paths[f.index]);continue;}
        const q=intro?out(stage(t,f.begin,f.end)):1;
        const amp=intro?(1-smooth(stage(t,2.7,3.48)))*(1+.24*(1-q)):1;
        const ax=f.tip[0]-f.root[0],ay=f.tip[1]-f.root[1],len=Math.hypot(ax,ay),ex=ax/len,ey=ay/len,nx=-ey,ny=ex;
        const phase=TAU*t/3;
        p.setAttribute('d',warpPath(f.segments,(x,y)=>{
          const dx=x-f.root[0],dy=y-f.root[1];const along=dx*ex+dy*ey,cross=dx*nx+dy*ny,u=clamp(along/len);
          const w1=Math.sin(phase-u*5.2+f.phase)-Math.sin(-u*5.2+f.phase);
          const w2=Math.sin(phase*2-u*7.4+f.phase*.7)-Math.sin(-u*7.4+f.phase*.7);
          const bend=f.bend*(.72*w1+.28*w2)*u*u*amp;
          const breathe=1+.035*(Math.sin(phase*2-u*4+f.phase)-Math.sin(-u*4+f.phase))*u*amp;
          const a=along*(.045+.955*q)+len*.026*Math.sin(phase+f.phase)*u*u*amp*Math.sin(Math.PI*q);
          const b=cross*(.12+.88*q)*breathe+bend*q;
          return[f.root[0]+a*ex+b*nx,f.root[1]+a*ey+b*ny];
        }));
        g.setAttribute('opacity',intro?smooth(stage(t,f.begin,f.begin+.18)):1);
      }
      if(intro&&t>=3.48)this.groups.forEach(g=>g.removeAttribute('transform'));
      return this;
    }
    serialize(){return new XMLSerializer().serializeToString(this.svg);}
  }
  global.SparkAnimation=SparkAnimation;
})(window);
