// Render the supplied SVG directly. No dependency on either rejected animation.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const target=process.env.SPARK_REFERENCE_DIR || path.join(root,'references');
const master=await fs.readFile(path.join(root,'source/spark-symbole.svg'),'utf8');
await fs.mkdir(target,{recursive:true});
const browser=await puppeteer.launch({headless:true});
try {
 const page=await browser.newPage();
 async function capture(indices) {
  const data=await page.evaluate(async ({master,indices})=>{
   const svg=new DOMParser().parseFromString(master,'image/svg+xml').documentElement;
   svg.setAttribute('viewBox','0 0 512 512');
   svg.setAttribute('width','512');svg.setAttribute('height','512');
   svg.querySelector('#Layer_3').setAttribute('transform','translate(240 284) scale(0.205) translate(-722.28 -1341.7)');
   svg.querySelectorAll('path').forEach((p,i)=>{if(!indices.includes(i))p.setAttribute('opacity','0');});
   const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}));
   const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=reject;im.src=url;});
   const c=document.createElement('canvas');c.width=c.height=512;c.getContext('2d').drawImage(im,0,0);
   URL.revokeObjectURL(url);return c.toDataURL('image/png').split(',')[1];
  },{master,indices});
  return Buffer.from(data,'base64');
 }
 await fs.writeFile(path.join(target,'structure-blanche-exacte.png'),await capture([2,3,4]));
 await fs.writeFile(path.join(target,'master-512-alpha.png'),await capture([0,1,2,3,4,5]));
 for(const i of [0,1,5])await fs.writeFile(path.join(target,`flamme-${i}-originale.png`),await capture([i]));
 console.log('Five references rendered directly from the original SVG.');
} finally {await browser.close();}
