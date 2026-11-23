import puppeteer from 'puppeteer';import fs from 'node:fs/promises';import path from 'node:path';import{fileURLToPath,pathToFileURL}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();await page.goto(pathToFileURL(path.join(root,'render.html')).href);
 const stats=await page.evaluate(async()=>{
  const failures=[];let samples=0,minWidth=Infinity,rootError=0;
  for(const[mode,duration]of[['apparition',3.2],['boucle',4]])for(let f=0;f<=Math.round(duration*120);f++){
   const pose=spark.pose(f/120,mode);samples++;
   for(const i of [0,1,5]){const p=pose.profiles[i],m=SPARK_DATA.master[i];
    if(!Number.isFinite(p.top)||p.top>=p.bottom)failures.push([mode,f,i,'height']);
    rootError=Math.max(rootError,Math.abs(p.rows.at(-1)[0]-m.root),Math.abs(p.rows.at(-1)[1]-m.root));
    for(const[l,r]of p.rows){minWidth=Math.min(minWidth,r-l);if(!Number.isFinite(l+r)||r<l)failures.push([mode,f,i,'contour']);}
   }
  }
  const loop0=spark.pose(0,'boucle'),loop4=spark.pose(4,'boucle');
  const sameLoop=JSON.stringify(loop0)===JSON.stringify(loop4);
  const near=spark.pose(.001,'boucle');let edgeDelta=0;
  for(const i of [0,1,5])for(let j=0;j<SPARK_DATA.N;j++)edgeDelta=Math.max(edgeDelta,...near.profiles[i].rows[j].map((v,k)=>Math.abs(v-loop0.profiles[i].rows[j][k])));
  spark.resize(1080);spark.background('transparent');spark.render(3.2);
  const end=spark.serialize();
  return{failures:failures.slice(0,10),samples,minWidth,rootError,sameLoop,firstMillisecondMaxDisplacement:edgeDelta,end};
 });
 // File fetch is restricted in Chromium for file://; original is supplied below instead.
 const master=await fs.readFile(path.join(root,'source/spark-symbole.svg'),'utf8');
 const rasters=await page.evaluate(async({end,master})=>{
  const doc=new DOMParser().parseFromString(master,'image/svg+xml'),svg=doc.documentElement;
  svg.setAttribute('viewBox','0 0 512 512');svg.setAttribute('width','1080');svg.setAttribute('height','1080');
  const layer=svg.querySelector('#Layer_3');layer.setAttribute('transform','translate(240 284) scale(.205) translate(-722.28 -1341.7)');
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('transform','translate(256 256) scale(.91) translate(-240 -242)');layer.replaceWith(g);g.append(layer);
  async function raster(text){const url=URL.createObjectURL(new Blob([text],{type:'image/svg+xml'}));const im=new Image();await new Promise((a,b)=>{im.onload=a;im.onerror=b;im.src=url;});const c=document.createElement('canvas');c.width=c.height=1080;c.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(url);return{data:[...c.getContext('2d').getImageData(0,0,1080,1080).data],b64:c.toDataURL('image/png').split(',')[1]};}
  const a=await raster(end),b=await raster(new XMLSerializer().serializeToString(svg));let n=0,max=0;
  for(let i=0;i<a.data.length;i++){const d=Math.abs(a.data[i]-b.data[i]);if(d)n++;max=Math.max(max,d);}
  return{differentChannels:n,maxDifference:max,rendered:a.b64,reference:b.b64};
 },{end:stats.end,master});
 delete stats.end;delete stats.original;stats.finalComparison={differentChannels:rasters.differentChannels,maxDifference:rasters.maxDifference};
 await fs.writeFile(path.join(root,'verification/final-render.png'),Buffer.from(rasters.rendered,'base64'));
 await fs.writeFile(path.join(root,'verification/final-original.png'),Buffer.from(rasters.reference,'base64'));
 await fs.writeFile(path.join(root,'verification/geometry.json'),JSON.stringify(stats,null,2));console.log(JSON.stringify(stats));
 if(stats.failures.length||stats.rootError>.001||!stats.sameLoop||rasters.differentChannels)process.exitCode=1;
}finally{await browser.close();}
