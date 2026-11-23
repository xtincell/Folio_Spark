/* Spark V3. Generated flame drawings, matched boundaries, original white SVG.
   Rendering is deterministic. No noise, random deformation or crossfade of cels. */
(() => {
 const D=window.SPARK_DATA,NS='http://www.w3.org/2000/svg';
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
 const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
 const mix=(a,b,u)=>a+(b-a)*u;
 const el=(n,a={})=>{const e=document.createElementNS(NS,n);for(const[k,v]of Object.entries(a))e.setAttribute(k,v);return e;};
 const blend=(a,b,u)=>({top:mix(a.top,b.top,u),bottom:a.bottom,root:a.root,rows:a.rows.map((r,j)=>r.map((v,k)=>mix(v,b.rows[j][k],u)))});
 function slope(a,b,h0,h1){if(a*b<=0)return 0;const w1=2*h1+h0,w2=h1+2*h0;return(w1+w2)/(w1/a+w2/b);}
 function tween(times,values,t){
  if(t<=times[0])return values[0];const last=times.length-1;if(t>=times[last])return values[last];
  let i=0;while(times[i+1]<t)i++;const h=times[i+1]-times[i],u=(t-times[i])/h,delta=(values[i+1]-values[i])/h;
  const m0=i===0?0:slope((values[i]-values[i-1])/(times[i]-times[i-1]),delta,times[i]-times[i-1],h);
  const m1=i+1===last?0:slope(delta,(values[i+2]-values[i+1])/(times[i+2]-times[i+1]),h,times[i+2]-times[i+1]);
  return(2*u*u*u-3*u*u+1)*values[i]+(u*u*u-2*u*u+u)*h*m0+(-2*u*u*u+3*u*u)*values[i+1]+(u*u*u-u*u)*h*m1;
 }
 function at(keys,times,t){
  const rows=Array.from({length:D.N+1},(_,j)=>{
   const center=tween(times,keys.map(p=>(p.rows[j][0]+p.rows[j][1])/2),t);
   const radius=Math.max(0,tween(times,keys.map(p=>(p.rows[j][1]-p.rows[j][0])/2),t));
   return[center-radius,center+radius];
  });return{top:tween(times,keys.map(p=>p.top),t),bottom:keys[0].bottom,root:keys[0].root,rows};
 }
 const number=x=>Number(x.toFixed(4));
 function contour(p){
  // Two y-monotone cubic boundaries: smooth tangents, no folded polygons.
  const side=k=>p.rows.map((r,j)=>[r[k],p.top+(p.bottom-p.top)*j/D.N]);
  const left=side(0),right=side(1).reverse();
  const segment=pts=>{
   let s='';for(let j=0;j<pts.length-1;j++){
    const a=pts[j],b=pts[j+1],prev=pts[Math.max(0,j-1)],next=pts[Math.min(pts.length-1,j+2)];
    const c1=[a[0]+(b[0]-prev[0])/6,a[1]+(b[1]-a[1])/3];
    const c2=[b[0]-(next[0]-a[0])/6,b[1]-(b[1]-a[1])/3];
    s+='C'+[...c1,...c2,...b].map(number).join(' ');
   }return s;
  };
  return'M'+left[0].map(number).join(' ')+segment(left)+segment(right)+'Z';
 }

 const introTimes=[.09,.21,.35,.51,.70,.91,1.13,1.40,1.88];
 const intro={},idle={};
 for(const i of [0,1,5]){
  intro[i]=D.intro.map((p,j)=>blend(p[i],D.master[i],j===6?.28:j===7?.65:0));intro[i].push(D.master[i]);
  // A restrained loop derived from the six previously generated flame cels.
  idle[i]=[D.master[i],...D.idle.map(p=>blend(D.master[i],p[i],i===5?.52:.40)),D.master[i]];
 }
 class Spark{
  constructor(container){
   this.svg=el('svg',{xmlns:NS,viewBox:'0 0 512 512',width:1080,height:1080,'aria-label':'Animation du symbole Spark'});
   this.bg=el('rect',{width:512,height:512,fill:'#0A0E1A'});this.svg.append(this.bg);
   const defs=el('defs'),clip=el('clipPath',{id:'spark-blade-clip',clipPathUnits:'userSpaceOnUse'});
   clip.append(el('rect',{x:655.34,y:105.18,width:852.26,height:1106.87,transform:'translate(-151.33 369.53) rotate(-18.14)'}));defs.append(clip);this.svg.append(defs);
   this.stage=el('g');this.svg.append(this.stage);this.flames={};
   const addFlame=i=>{const dynamic=el('path',{fill:'#F05A28'}),exact=el('path',{d:D.paths[i],fill:'#F05A28',transform:'translate(240 284) scale(.205) translate(-722.28 -1341.7)'});this.stage.append(dynamic,exact);this.flames[i]={dynamic,exact};};
   addFlame(0);addFlame(1);
   this.white=el('g');this.stage.append(this.white);
   const original=el('g',{transform:'translate(240 284) scale(.205) translate(-722.28 -1341.7)'});this.white.append(original);
   for(const i of [2,3,4]){
    const p=el('path',{d:D.paths[i],fill:i===4?'none':'#fff'});
    if(i===4){p.setAttribute('stroke','#fff');p.setAttribute('stroke-width','20');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');}
    if(i===2){const clipped=el('g',{'clip-path':'url(#spark-blade-clip)'});clipped.append(p);original.append(clipped);}else original.append(p);
   }
   addFlame(5);container.append(this.svg);this.render(0);
  }
  resize(w,h=w){this.svg.setAttribute('width',w);this.svg.setAttribute('height',h);}
  background(color){this.bg.setAttribute('fill',color==='transparent'?'none':color);}
  pose(t,mode='apparition'){
   const loop=mode==='boucle';const u=clamp(t/.56),travel=(1-u)**3;
   const x=loop?0:72*travel,y=loop?0:-154*travel;
   const width=loop?1:mix(.15,1,smooth((t-.01)/.46));
   const axial=loop?1:mix(1.10,1,smooth(t/.5));
   const opacity=loop?1:smooth(t/.045);
   const ps={};
   for(const i of [0,1,5]){
    const lag=i===5?.055:i===0?.018:0;
    if(loop){const lt=((t%4)+4)%4;ps[i]=at(idle[i],[0,.45,.95,1.45,2.0,2.6,3.2,4],lt);}
    else ps[i]=at(intro[i],introTimes,t-lag);
   }
   return{x,y,width,axial,opacity,profiles:ps};
  }
  render(t,mode='apparition'){
   const p=this.pose(t,mode),loop=mode==='boucle';
   this.stage.setAttribute('transform',`translate(${256+p.x} ${256+p.y}) scale(.91) translate(-240 -242)`);
   this.stage.setAttribute('opacity',p.opacity);
   this.white.setAttribute('transform',p.width===1&&p.axial===1?'':`translate(240 284) rotate(-67.78) scale(${p.axial} ${p.width}) rotate(67.78) translate(-240 -284)`);
   for(const i of [0,1,5]){
    const f=this.flames[i],exact=(!loop&&t>=1.935)||(loop&&Math.abs(t%4)<1e-9);
    f.dynamic.setAttribute('display',exact?'none':'inline');f.exact.setAttribute('display',exact?'inline':'none');
    if(!exact)f.dynamic.setAttribute('d',contour(p.profiles[i]));
    const alpha=loop?1:smooth((t-.055)/.075);f.dynamic.setAttribute('opacity',alpha);f.exact.setAttribute('opacity',alpha);
   }
   return p;
  }
  serialize(){return new XMLSerializer().serializeToString(this.svg);}
 }
 window.Spark=Spark;
})();
