// Run from the portfolio root: node outputs/spark-animation/source/render.mjs
// Requires puppeteer. FRAME_SIZE and FPS can be set for faster draft renders.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const size=Number(process.env.FRAME_SIZE||1080),fps=Number(process.env.FPS||60);
const previewOnly=process.argv.includes('--preview');
const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();
 page.on('pageerror',e=>console.error(e));
 await page.setViewport({width:size,height:size,deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.join(root,'index.html')).href+'?render=1');
 await page.evaluate(size=>spark.resize(size,size),size);
 async function png(t,mode='apparition',bg='transparent'){
   return Buffer.from(await page.evaluate(async({t,mode,bg})=>{
    spark.background(bg);spark.render(t,mode);
    const svg=spark.serialize(),img=new Image();
    const blob=new Blob([svg],{type:'image/svg+xml'}),url=URL.createObjectURL(blob);
    try{await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url;});
    const canvas=document.createElement('canvas');canvas.width=spark.width;canvas.height=spark.height;canvas.getContext('2d').drawImage(img,0,0);
    return canvas.toDataURL('image/png').split(',')[1];}finally{URL.revokeObjectURL(url);}
   },{t,mode,bg}),'base64');
 }
 await fs.mkdir(path.join(root,'verification'),{recursive:true});
 for(const t of [0,.2,.45,.75,1.1,1.6,2.2,3,3.48,4.2])await fs.writeFile(path.join(root,'verification',`pose-${t.toFixed(2)}.png`),await png(t,'apparition','#0A0E1A'));
 for(const t of [0,.5,1,1.5,2,2.5,3])await fs.writeFile(path.join(root,'verification',`loop-${t.toFixed(2)}.png`),await png(t,'boucle'));
 await fs.writeFile(path.join(root,'verification','end-alpha.png'),await png(4.2));
 // Raster comparison against the untouched supplied SVG under the same camera.
 const original=await fs.readFile(path.join(root,'source/brand/01-vectoriel/spark-symbole.svg'),'utf8');
 const reference=Buffer.from(await page.evaluate(async original=>{
  spark.render(4.2);spark.background('transparent');const camera=spark.composition.getAttribute('transform');
  const doc=new DOMParser().parseFromString(original,'image/svg+xml');
  const xml=`<svg xmlns="http://www.w3.org/2000/svg" width="${spark.width}" height="${spark.height}"><g transform="${camera}">${doc.documentElement.innerHTML}</g></svg>`;
  const img=new Image();const url=URL.createObjectURL(new Blob([xml],{type:'image/svg+xml'}));
  await new Promise((ok,err)=>{img.onload=ok;img.onerror=err;img.src=url;});const c=document.createElement('canvas');c.width=spark.width;c.height=spark.height;c.getContext('2d').drawImage(img,0,0);URL.revokeObjectURL(url);return c.toDataURL().split(',')[1];
 },original),'base64');
 await fs.writeFile(path.join(root,'verification','original-reference.png'),reference);
 // Boundary derivatives are checked at one millisecond on each side of the seam.
 await fs.writeFile(path.join(root,'verification','loop-before.png'),await png(2.999,'boucle'));
 await fs.writeFile(path.join(root,'verification','loop-after.png'),await png(.001,'boucle'));
 if(!previewOnly){
  for(const mode of ['apparition','boucle']){
   const dir=path.join(root,'frames',mode);await fs.mkdir(dir,{recursive:true});
   const count=Math.round(fps*(mode==='apparition'?4.2:3));
   for(let n=0;n<count;n++){
    await fs.writeFile(path.join(dir,String(n).padStart(4,'0')+'.png'),await png(n/fps,mode));
    if(n%60===0)console.log(mode,n+'/'+count);
   }
   console.log(mode+' complete: '+count+' frames');
  }
 }
 await page.setViewport({width:1440,height:1100,deviceScaleFactor:1});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);
 await page.screenshot({path:path.join(root,'verification','preview-desktop.png'),fullPage:true});
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});
 await page.screenshot({path:path.join(root,'verification','preview-mobile.png'),fullPage:true});
 console.log('Visual review assets ready in '+root+'/verification');
}finally{await browser.close();}
