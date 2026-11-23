/* Spark / Impulsion. Original six-path vector master, deterministic time.
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
  // A held anticipation, a fast release, a short controlled overrun.
  // Cubic Hermite tracks allow the velocity to flow through intermediate keys.
  function track(t,keys){
    if(t<=keys[0][0])return keys[0][1];
    if(t>=keys.at(-1)[0])return keys.at(-1)[1];
    let i=0;while(t>keys[i+1][0])i++;
    const a=keys[i],b=keys[i+1],p=keys[Math.max(0,i-1)],n=keys[Math.min(keys.length-1,i+2)];
    const dt=b[0]-a[0],u=(t-a[0])/dt;
    const m0=i===0?0:(b[1]-p[1])/(b[0]-p[0]);
    const m1=i+1===keys.length-1?0:(n[1]-a[1])/(n[0]-a[0]);
    return (2*u*u*u-3*u*u+1)*a[1]+(u*u*u-2*u*u+u)*dt*m0+(-2*u*u*u+3*u*u)*b[1]+(u*u*u-u*u)*dt*m1;
  }
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
    { index:0,name:'Flamme moyenne',root:[1008.53,1292.31],tip:[1440.9,700.8],bend:64,phase:1.2,begin:.19,end:1.12,curl:-1.9 },
    { index:1,name:'Petite flamme',root:[873.48,1709.36],tip:[1121.79,1366.91],bend:30,phase:3.8,begin:.27,end:.99,curl:1.6 },
    { index:5,name:'Grande flamme',root:[395.65,1550],tip:[470.34,478.12],bend:85,phase:.3,begin:.1,end:1.19,curl:1.8 }
  ];

  class SparkAnimation {
    static durations = { apparition:3.6, boucle:4 };
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
      const intro=mode==='apparition',t=intro?Math.max(0,time):((time%4)+4)%4;
      const exact=(intro&&t>=2.72)||(!intro&&(t<1e-9||Math.abs(t-4)<1e-9));
      this.groups.forEach(g=>{g.removeAttribute('transform');g.setAttribute('opacity',1);});
      if(intro){
        const starA=track(t,[[.13,-132],[.31,-110],[.59,5],[.94,0]]);
        const sx=Math.max(.001,track(t,[[.08,.002],[.28,.05],[.49,1.13],[.73,1.02],[1.01,1]]));
        const sy=Math.max(.001,track(t,[[.08,.002],[.3,.022],[.48,.69],[.7,1.035],[1.04,1]]));
        const need=out(stage(t,.28,.91));
        this.groups[3].setAttribute('transform',`translate(${C}) rotate(${starA}) scale(${sx},${sy}) translate(${-C[0]},${-C[1]})`);
        this.groups[4].setAttribute('transform',`translate(${C}) rotate(${starA}) scale(${sx},${sy}) translate(${-C[0]},${-C[1]})`);
        this.paths[4].setAttribute('stroke-width',Math.max(0,track(t,[[.23,0],[.44,6],[.6,27],[.97,20]])));
        this.groups[3].setAttribute('opacity',smooth(stage(t,.08,.15)));
        this.groups[4].setAttribute('opacity',smooth(stage(t,.23,.34)));
        // Stretch along the sword's own axis; keep the original clipping rectangle inside.
        const long=Math.max(.001,track(t,[[.16,.005],[.29,.04],[.46,1.095],[.7,1.025],[.98,1]]));
        const wide=Math.max(.001,track(t,[[.16,.012],[.31,.028],[.49,.9],[.7,1.015],[1.02,1]]));
        const bladeA=track(t,[[.16,-18],[.3,-13],[.52,2.5],[.9,0]]);
        this.groups[2].setAttribute('transform',`translate(${C}) rotate(${bladeA-67.78}) scale(${long},${wide}) rotate(67.78) translate(${-C[0]},${-C[1]})`);
        this.groups[2].setAttribute('opacity',smooth(stage(t,.17,.25)));
      }
      else this.paths[4].setAttribute('stroke-width',20);
      for(const f of this.flames){
        const p=this.paths[f.index],g=this.groups[f.index];
        if(exact){p.setAttribute('d',SPARK_BRAND.paths[f.index]);continue;}
        const q=intro?(t<f.begin+.15?.045*smooth(stage(t,f.begin,f.begin+.15)):Math.max(.001,track(t,[[f.begin+.15,.045],[f.begin+.4,1.08],[f.end,1]]))):1;
        const arrival=clamp(q),uncoil=1-arrival;
        const amp=intro?(1-smooth(stage(t,2.02,2.72)))*(.5+.5*arrival):1;
        const ax=f.tip[0]-f.root[0],ay=f.tip[1]-f.root[1],len=Math.hypot(ax,ay),ex=ax/len,ey=ay/len,nx=-ey,ny=ex;
        const phase=TAU*t/4;
        const rootX=f.root[0]+(C[0]-f.root[0])*uncoil;
        const rootY=f.root[1]+(C[1]-f.root[1])*uncoil;
        p.setAttribute('d',warpPath(f.segments,(x,y)=>{
          const dx=x-f.root[0],dy=y-f.root[1];const along=dx*ex+dy*ey,cross=dx*nx+dy*ny,u=clamp(along/len);
          const w1=Math.sin(phase*2-u*4.8+f.phase)-Math.sin(-u*4.8+f.phase);
          const w2=Math.sin(phase*3-u*7.1+f.phase*.7)-Math.sin(-u*7.1+f.phase*.7);
          const w3=Math.sin(phase*5-u*9+f.phase)-Math.sin(-u*9+f.phase);
          const bend=f.bend*(.65*w1+.27*w2+.08*w3)*Math.pow(u,1.6)*amp;
          const breathe=1+.065*(Math.sin(phase*3-u*4+f.phase)-Math.sin(-u*4+f.phase))*u*amp;
          const stretch=1+.034*(Math.sin(phase*2-u*3+f.phase)-Math.sin(-u*3+f.phase))*u*amp;
          const a=along*q*stretch;
          const b=cross*(.25+.75*arrival)*breathe*arrival+bend*arrival;
          const angle=f.curl*uncoil*u;
          const aa=a*Math.cos(angle)-b*Math.sin(angle),bb=a*Math.sin(angle)+b*Math.cos(angle);
          return[rootX+aa*ex+bb*nx,rootY+aa*ey+bb*ny];
        }));
        g.setAttribute('opacity',intro?smooth(stage(t,f.begin,f.begin+.1)):1);
      }
      if(intro&&t>=2.72)this.groups.forEach(g=>g.removeAttribute('transform'));
      return this;
    }
    serialize(){return new XMLSerializer().serializeToString(this.svg);}
  }
  global.SparkAnimation=SparkAnimation;
})(window);
