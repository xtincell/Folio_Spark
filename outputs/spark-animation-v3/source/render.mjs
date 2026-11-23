import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fast=process.argv.includes('--preview');
const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();await page.goto(pathToFileURL(path.join(root,'render.html')).href);await page.evaluate(()=>spark.background('transparent'));
 const size=fast?512:1080,fps=fast?30:60;
 await page.evaluate(size=>spark.resize(size),size);
 for(const[mode,duration]of [['apparition',3.2],['boucle',4]]){
  const dest=path.join(root,fast?'verification/preview-frames':'frames',mode);await fs.mkdir(dest,{recursive:true});
  for(let frame=0;frame<Math.round(duration*fps);frame++){
   const b64=await page.evaluate(async({t,mode,size})=>{
    spark.render(t,mode);const url=URL.createObjectURL(new Blob([spark.serialize()],{type:'image/svg+xml'}));
    const im=new Image();await new Promise((a,b)=>{im.onload=a;im.onerror=b;im.src=url;});
    const c=document.createElement('canvas');c.width=c.height=size;c.getContext('2d').drawImage(im,0,0);URL.revokeObjectURL(url);return c.toDataURL('image/png').split(',')[1];
   },{t:frame/fps,mode,size});
   await fs.writeFile(path.join(dest,`${String(frame).padStart(4,'0')}.png`),Buffer.from(b64,'base64'));
  }
  console.log(`${mode}: ${Math.round(duration*fps)} frames rendered at ${size}px, ${fps} fps.`);
 }
}finally{await browser.close();}
