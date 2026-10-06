/* Xtincell — an authored, deterministic 48-second motion composition.
 * Coordinates: 1920×1080. Every frame is seekable; no wall-clock animations.
 * Original artwork is composited intact; masks reveal, never redraw, the work.
 */
const W = 1920, H = 1080;
const INK = '#101010', PAPER = '#f5f0e8', ORANGE = '#f05a28';
const canvas = document.querySelector('canvas');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d', { alpha: false });
const assets = new Map();
let manifest;
const clamp = v => Math.max(0, Math.min(1, v));
const mix = (a,b,p) => a+(b-a)*p;
const progress = (t,a,b) => clamp((t-a)/(b-a));
const ease = v => { const p=clamp(v); return p<0.5?16*p**5:1-(-2*p+2)**5/2; };
const out = v => 1-(1-clamp(v))**4;
const smooth = (t,a,b) => ease(progress(t,a,b));
function rect(x,y,w,h,color=INK) { ctx.fillStyle=color; ctx.fillRect(x,y,w,h); }
function save(fn) { ctx.save(); fn(); ctx.restore(); }
function alpha(v,fn) { save(()=>{ctx.globalAlpha*=clamp(v);fn();}); }
function clip(x,y,w,h,fn) { save(()=>{ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();fn();}); }
function line(x1,y1,x2,y2,color=ORANGE,width=2) { ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke(); }
function font(size=24,family='Grotesk',weight=400) { ctx.font=`${weight} ${size}px ${family}`;ctx.textBaseline='alphabetic';ctx.textAlign='left'; }
function text(value,x,y,size=24,color=PAPER,family='Grotesk',weight=400) { font(size,family,weight);ctx.fillStyle=color;ctx.fillText(value,x,y); }
function centered(value,x,y,size=24,color=PAPER,family='Grotesk',weight=400) { font(size,family,weight);ctx.fillStyle=color;ctx.textAlign='center';ctx.fillText(value,x,y);ctx.textAlign='left'; }
function tracking(value,x,y,size=18,spacing=4,color=PAPER) { font(size,'Mono');ctx.fillStyle=color; for(const letter of value){ctx.fillText(letter,x,y);x+=ctx.measureText(letter).width+spacing;} }
function revealText(value,x,y,size,t,delay=0,color=PAPER,family='Grotesk',weight=500) {
  const p=out(progress(t,delay,delay+0.85));
  clip(x-5,y-size*1.12,1850-x,size*1.38,()=>text(value,x,y+(1-p)*size*1.4,size,color,family,weight));
}
function image(source,x,y,w,h,fit='cover',focusX=.5,focusY=.5,zoom=1) {
  const img=assets.get(source); if(!img)throw new Error(`Missing ${source}`);
  const iw=img.naturalWidth, ih=img.naturalHeight;
  const k=(fit==='contain'?Math.min(w/iw,h/ih):Math.max(w/iw,h/ih))*zoom;
  clip(x,y,w,h,()=>ctx.drawImage(img,x+(w-iw*k)*focusX,y+(h-ih*k)*focusY,iw*k,ih*k));
}
function card(source,x,y,w,h,{rotation=0,scale=1,skew=0,fit='cover',focusX=.5,focusY=.5,shadow=true}={}) {
  save(()=>{
    ctx.translate(x+w/2,y+h/2);ctx.rotate(rotation);ctx.transform(scale,skew,0,scale,0,0);
    if(shadow){ctx.shadowColor='#0008';ctx.shadowBlur=40;ctx.shadowOffsetY=24;rect(-w/2,-h/2,w,h);ctx.shadowColor='transparent';}
    rect(-w/2,-h/2,w,h,'#1d1d1d');image(source,-w/2,-h/2,w,h,fit,focusX,focusY);
  });
}
function flame(x,y,h,rotation=0) {save(()=>{ctx.translate(x,y);ctx.rotate(rotation);image('/logos/spark-mark.svg',-h*.804/2,-h/2,h*.804,h,'contain');});}
function grid(t,intensity=.13) {
  alpha(intensity,()=>{
    for(let i=0;i<13;i++){let x=80+i*146.66;line(x,80,x,1000,PAPER,1);}
    for(let i=0;i<7;i++){let y=80+i*153.33;line(80,y,1840,y,PAPER,1);}
  });
}
function corner(x,y,signX,signY,color=ORANGE) {line(x,y,x+24*signX,y,color,2);line(x,y,x,y+24*signY,color,2);}
function furniture(index,label,t,{dark=false}={}) {
  const c=dark?INK:PAPER;
  alpha(.85,()=>{tracking('XTINCELL',76,57,17,5,c);text('SELECTED WORK / 2026',1540,57,17,c,'Mono');
    line(76,82,1844,82,dark?'#10101035':'#ffffff25',1);
    text(`${String(index).padStart(2,'0')} / ${label}`,76,1029,17,c,'Mono');
    text('ALEXANDRE DJENGUE',1577,1029,17,c,'Mono');
  });
  rect(76,1055,1768*clamp(t/48),2,ORANGE);
}
function slantReveal(p,fn) {
  save(()=>{const x=mix(-620,2540,p);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(x+260,0);ctx.lineTo(x-260,H);ctx.lineTo(0,H);ctx.closePath();ctx.clip();fn();});
}
function ignition(t) {
  const p=smooth(t,.3,1.4);
  grid(t,.07*p);
  // The opening and closing hold the same mark at precisely the same position.
  flame(mix(960,291,p),mix(540,476,p),mix(240,365,p),0);
  alpha(p,()=>{
    const tail=out(progress(t,.35,1.15));
    line(550,275,550+1130*tail,275,ORANGE,2);
    revealText('xtincell',540,654,330,t,.45,PAPER,'Serif');
    tracking('L’INGÉNIEUR DERRIÈRE L’IMAGE',557,745,20,4,ORANGE);
    text('BRAND ARCHITECT',80,945,18,PAPER,'Mono');
    text('STORYTELLING CONSULTANT',630,945,18,PAPER,'Mono');
    text('TOOLSMITH',1460,945,18,PAPER,'Mono');
  });
}
function strategy(t) {
  rect(0,0,W,H);furniture(1,'LA VISION',t+4);grid(t,.055);
  const words=['Penser.','Construire.','Faire vibrer.'];
  const shots=['/work/cases/friesland-campina/hero.webp','/work/cases/goodlocs/hero.webp','/work/cases/hero-shot/hero.webp'];
  for(let i=0;i<3;i++){
    const p=out(progress(t,-.12+i*.15,.8+i*.15)), y=160+i*262;
    clip(80,y-5,1770,244,()=>{
      rect(80,y,1770,234,i===1?'#1d1b19':INK);
      text(`0${i+1}`,99,y+50,22,ORANGE,'Mono');
      text(words[i],192+(1-p)*90,y+178+(1-p)*235,165,PAPER,'Serif');
      const x=mix(1920,1250,p);
      image(shots[i],x,y,535,234,'cover',.5,.46,1+.06*(1-p));
      line(80,y+244,1840,y+244,'#ffffff28',1);
    });
  }
}
function peak(t) {
  rect(0,0,W,H,'#10282c');
  const assembly=out(progress(t,0,1.3)), spread=smooth(t,2.7,4.1);
  alpha(.12,()=>image('/work/cases/friesland-campina/hero.webp',0,0,W,H,'cover',.5,.5,1.14));
  // Artwork, detail and environment move on distinct planes around one anchor.
  const mainX=mix(370,98,spread), mainW=mix(1170,1130,spread);
  card('/work/cases/friesland-campina/hero.webp',mainX,mix(1150,190,assembly),mainW,675,{rotation:mix(-.09,0,assembly),fit:'contain'});
  clip(1255,165,600,730,()=>{
    image('/studio/peak-billboard.webp',1255+620*(1-spread),165,590,412,'cover');
    image('/work/cases/friesland-campina/hero.webp',1255-620*(1-spread),600,590,294,'cover',.22,.8,1.52);
  });
  alpha(1-spread,()=>{
    corner(355,174,1,1);corner(1555,874,-1,-1);
  });
  const rule=out(progress(t,.65,1.55));line(97,920,97+1114*rule,920,ORANGE,3);
  alpha(rule,()=>{text('PEAK',99,967,46,PAPER,'Grotesk',600);text('UNE IDÉE. TOUT UN UNIVERS.',527,963,24,PAPER,'Mono');});
  alpha(spread,()=>text('MISE EN SITUATION GÉNÉRÉE',1272,557,14,PAPER,'Mono'));
  furniture(2,'CAMPAGNE / FRIESLANDCAMPINA',t+8);
}
function packaging(t) {
  const phase=smooth(t,2.7,3.65);
  rect(0,0,W,H,INK);
  // Three offset reveals construct the product stage, then match-cut the material.
  const base=out(progress(t,0,1.05));
  rect(80,150,1760,780,'#1a1917');
  const sources=['/work/cases/goodlocs/hero.webp','/work/cases/goodlocs/01.webp','/work/cases/goodlocs/02.webp'];
  for(let i=0;i<3;i++){
    const p=out(progress(t,i*.12,.95+i*.12)), x=80+i*594;
    clip(x,150,572,780,()=>{
      image(sources[i],x,150+(1-p)*(i%2?-900:900),572,780,'cover');
      if(phase>0){
        const cut=out(progress(t,2.7+i*.1,3.4+i*.1));
        clip(x,150,572,780*cut,()=>image(i===1?'/studio/robuste-packaging.webp':'/work/cases/robuste-packaging/hero.webp',x,150,572,780,'cover',i===0?.1:i===2?.9:.5));
      }
    });
  }
  rect(81,754,680,177,'#101010');
  alpha(1-phase,()=>{text('Goodlocs.',107,833,79,PAPER,'Serif');tracking('IDENTITÉ / BEAUTÉ',110,888,18,3,ORANGE);});
  alpha(phase,()=>{text('Robuste.',107,833,79,PAPER,'Serif');tracking('PACKAGING / MATIÈRE',110,888,18,3,ORANGE);});
  alpha(base,()=>line(80,150,1839,150,ORANGE,3));
  alpha(phase,()=>text('PRÉSENTATION GÉNÉRÉE · PANNEAU CENTRAL',700,957,16,PAPER,'Mono'));
  furniture(3,'LA MARQUE PREND CORPS',t+14);
}
function artDirection(t) {
  rect(0,0,W,H);const p=out(progress(t,0,1.1));
  // Opposing shutters, stable faces. The portrait opens the scene before the triptych.
  const split=smooth(t,1.75,3);
  const xs=[80,mix(80,674,split),mix(80,1268,split)];
  const sources=['/work/cases/hero-shot/hero.webp','/work/cases/kof-festival/hero.webp','/work/cases/frutas/hero.webp'];
  for(let i=2;i>=0;i--){
    const width=i===0?mix(1760,572,split):572;
    clip(xs[i],150,width,750,()=>image(sources[i],xs[i],150+(1-p)*900*(i%2?-1:1),width,750,'cover',i===0?.57:.5,.5,1.02));
  }
  const shade=ctx.createLinearGradient(0,680,0,925);shade.addColorStop(0,'#10101000');shade.addColorStop(1,'#101010');rect(80,680,1760,245,shade);
  revealText('L’image',111,828,127,t,.15,PAPER,'Serif');
  revealText('qui reste.',675,918,142,t,2.3,ORANGE,'Serif');
  alpha(split,()=>{text('HERO SHOT',111,193,17,PAPER,'Mono');text('KOF FESTIVAL',704,193,17,PAPER,'Mono');text('FRUTAS',1300,193,17,PAPER,'Mono');});
  furniture(4,'DIRECTION ARTISTIQUE',t+20);
}
function photography(t) {
  rect(0,0,W,H);furniture(5,'PHOTOGRAPHIE / INSTANTS VIVANTS',t+26);
  const photos=manifest.photos;
  const pan=mix(0,4*465,smooth(t,.5,5.2));
  save(()=>{
    ctx.translate(960,550);ctx.rotate(-.055);ctx.translate(-960,-550);
    const left=100-pan;
    for(let i=0;i<8;i++){
      const x=left+i*465, p=out(progress(t,i*.03,.7+i*.03));
      card(photos[i].source,x,220+(1-p)*520,439,579,{fit:'cover',focusX:.5,focusY:.45,shadow:false});
      // Film perforations remain quiet: one consistent moving graphic system.
      rect(x,178,439,30,'#272522');rect(x,801,439,50,'#272522');
      for(let j=0;j<9;j++){rect(x+14+j*47,185,24,13,INK);}
      text(String(i+1).padStart(2,'0'),x+16,834,16,ORANGE,'Mono');
      text('XTINCELL / FRAGMENTS',x+74,834,15,PAPER,'Mono');
    }
  });
  // Static titles outside the travelling image strip keep faces unobstructed.
  text('Saisir le vivant.',80,968,70,PAPER,'Serif');
  line(809,944,1840,944,ORANGE,2);
}
function systems(t) {
  rect(0,0,W,H);grid(t,.05);furniture(6,'TOOLSMITH / LA BARRE',t+32);
  revealText('De l’intuition',80,294,128,t,0,PAPER,'Serif');
  revealText('au système.',80,427,128,t,.16,ORANGE,'Serif');
  const nodes=['BRIEF','DÉCISION','LIVRAISON'];
  for(let i=0;i<3;i++){
    const x=93+i*265,p=out(progress(t,.4+i*.32,1.1+i*.32));
    if(i<2)line(x+112,636,x+112+153*out(progress(t,.7+i*.3,1.4+i*.3)),636,ORANGE,2);
    alpha(p,()=>{
      save(()=>{ctx.translate(x+56,636);ctx.rotate((1-p)*.9);ctx.scale(p,p);rect(-55,-55,110,110,'#27211d');ctx.strokeStyle=ORANGE;ctx.lineWidth=2;ctx.strokeRect(-55,-55,110,110);});
      centered(String(i+1).padStart(2,'0'),x+56,647,30,PAPER,'Mono');centered(nodes[i],x+56,746,20,PAPER,'Mono');
    });
  }
  const enter=out(progress(t,.15,1.25));
  card('/studio/la-barre.svg',910+(1-enter)*960,211,930,645,{fit:'contain',skew:(1-enter)*.15});
  alpha(enter,()=>text('SCHÉMA CONCEPTUEL DU WORKFLOW',928,892,18,PAPER,'Mono'));
}
function index(t) {
  rect(0,0,W,H);furniture(7,'UN REGARD. PLUSIEURS TERRAINS.',t+36);
  const p=out(progress(t,0,1.05)), converge=smooth(t,5.2,7);
  const covers=manifest.projects;
  const cols=8, cellW=209,cellH=166,gap=12,totalW=cols*(cellW+gap)-gap;
  const startX=(W-totalW)/2, startY=137;
  for(let i=0;i<40;i++){
    const col=i%cols,row=Math.floor(i/cols),delay=(col+row)*.032;
    const en=out(progress(t,delay,delay+.85));
    let x=startX+col*(cellW+gap),y=startY+row*(cellH+gap);
    const theta=(i/40)*Math.PI*2;
    x=mix(x,960-cellW/2+Math.cos(theta)*24,converge);
    y=mix(y,540-cellH/2+Math.sin(theta)*24,converge);
    const scale=mix(.45+.55*en,.09,converge);
    alpha(en*(1-smooth(t,6.4,6.92)),()=>{
      save(()=>{ctx.translate(x+cellW/2,y+cellH/2+(1-en)*(row%2?-340:340));ctx.rotate((1-en)*((col-3.5)*.07)+converge*.5);ctx.scale(scale,scale);
        rect(-cellW/2,-cellH/2,cellW,cellH,'#25221e');
        if(i<covers.length)image(covers[i].source,-cellW/2,-cellH/2,cellW,cellH,'contain');
        else flame(0,0,117);
      });
    });
  }
  alpha(smooth(t,6.05,6.95),()=>flame(960,540,240));
}
function signature(t) {
  rect(0,0,W,H);
  const open=smooth(t,.1,.95),close=smooth(t,3.45,4.7),p=open*(1-close);
  grid(t,.065*p);
  flame(mix(960,302,p),mix(540,460,p),mix(240,300,p));
  alpha(p,()=>{
    text('xtincell',517,626,302,PAPER,'Serif');
    line(536,690,1795,690,ORANGE,2);
    tracking('L’INGÉNIEUR DERRIÈRE L’IMAGE',541,759,20,4,ORANGE);
    image('/portrait-p2.jpg',1486,144,276,368,'cover',.5,.4);
    text('ALEXANDRE DJENGUE',1491,553,16,PAPER,'Mono');
    text('BRAND ARCHITECT / STORYTELLING CONSULTANT / TOOLSMITH',535,910,18,PAPER,'Mono');
  });
}
const timeline = [
  [0,4,ignition], [4,8,strategy], [8,14,peak], [14,20,packaging],
  [20,26,artDirection], [26,32,photography], [32,36,systems],
  [36,43,index], [43,48,signature],
];
function render(t) {
  ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;rect(0,0,W,H);
  const i=timeline.findIndex(([start,end])=>t>=start&&t<end);
  const [start,end,scene]=timeline[Math.max(0,i)];
  // Pre-roll continues through the cut: incoming elements are already moving
  // underneath the reveal, never reset or wait on a vacant background.
  const lead=i===0?0:.7;
  scene(t-start+lead);
  if(i>=0&&i<timeline.length-1&&t>end-.7){
    const [, , next]=timeline[i+1];
    slantReveal(smooth(t,end-.7,end),()=>next(t-end+.7));
  }
}
window.ready=(async()=>{
  manifest=await fetch('/manifest.json').then(r=>r.json());
  await Promise.all([
    ['Grotesk','/fonts/space-grotesk-latin-400-normal.woff2',400],
    ['Grotesk','/fonts/space-grotesk-latin-500-normal.woff2',500],
    ['Grotesk','/fonts/space-grotesk-latin-600-normal.woff2',600],
    ['Serif','/fonts/instrument-serif-latin-400-normal.woff2',400],
    ['Mono','/fonts/jetbrains-mono-latin-400-normal.woff2',400]
  ].map(async([family,path,weight])=>{const face=new FontFace(family,`url(${path})`,{weight:String(weight)});document.fonts.add(await face.load());}));
  await Promise.all(manifest.sources.map(async source=>{const img=new Image();img.src=source;await img.decode();assets.set(source,img);}));
  render(0);return {loaded:assets.size};
})();
window.renderFrame=(t)=>{render(t);return canvas.toDataURL('image/jpeg',.97).split(',')[1];};
window.preview=(time=0)=>{const start=performance.now();function next(now){render((time+(now-start)/1000)%48);window.previewID=requestAnimationFrame(next);}cancelAnimationFrame(window.previewID);requestAnimationFrame(next);};
window.seek=render;
