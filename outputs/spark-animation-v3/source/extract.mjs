import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const svg=await fs.readFile(path.join(root,'source/spark-symbole.svg'),'utf8');
const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();await page.setContent(svg);
 const data=await page.evaluate(()=>{
  const ps=[...document.querySelectorAll('path')];const ref=p=>[240+.205*(p.x-722.28),284+.205*(p.y-1341.7)];
  const master={};
  for(const i of [0,1,5]){
   const p=ps[i],n=8192,l=p.getTotalLength(),points=Array.from({length:n+1},(_,j)=>ref(p.getPointAtLength(j*l/n)));
   const box=p.getBBox(),top=ref({x:0,y:box.y})[1],bottom=ref({x:0,y:box.y+box.height})[1];
   const root=points.reduce((a,b)=>b[1]>a[1]?b:a);const tip=points.reduce((a,b)=>b[1]<a[1]?b:a);
   const rows=[];
   for(let j=0;j<=192;j++){
    const y=top+(bottom-top)*j/192,xs=[];
    if(j===0){rows.push([tip[0],tip[0]]);continue;}
    if(j===192){rows.push([root[0],root[0]]);continue;}
    for(let k=0;k<n;k++){const a=points[k],b=points[k+1];if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))xs.push(a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1]));}
    rows.push([Math.min(...xs),Math.max(...xs)]);
   }
   master[i]={top,bottom,root:root[0],rows};
  }
  return {paths:ps.map(p=>p.getAttribute('d')),master,N:192,camera:{cx:240,cy:284,scale:.205,origin:[722.28,1341.7]}};
 });
 await fs.writeFile(path.join(root,'source/master.json'),JSON.stringify(data));
 console.log('Original paths and precise contour correspondences extracted.');
}finally{await browser.close();}
