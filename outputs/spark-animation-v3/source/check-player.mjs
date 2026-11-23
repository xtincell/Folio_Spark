import puppeteer from 'puppeteer';import fs from 'node:fs/promises';import path from 'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.setViewport({width:1440,height:1100});
 await page.goto('http://127.0.0.1:8766/spark-animation-v3/',{waitUntil:'networkidle0'});
 const ready=async()=>page.waitForFunction(()=>document.querySelector('video').readyState>=2);
 await ready();const modes=[];
 for(const mode of ['film','apparition','boucle']){
  await page.click(`[data-mode=${mode}]`);await ready();const info=await page.$eval('video',v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight}));modes.push({mode,...info});
 }
 await page.click('#slow');await page.click('[data-mode=film]');await ready();const rate=await page.$eval('video',v=>v.playbackRate);if(rate!==.5)throw Error('Slow speed lost between modes');
 await page.select('#format','9x16');await ready();const portrait=await page.$eval('video',v=>[v.videoWidth,v.videoHeight]);if(portrait[0]!==1080||portrait[1]!==1920)throw Error('Wrong portrait dimensions');
 await page.select('#format','16x9');await ready();await page.$eval('video',v=>{v.pause();v.currentTime=1.15;});await page.waitForFunction(()=>{const v=document.querySelector('video');if(v.seeking||v.currentTime<1.1)return false;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.drawImage(v,0,0,64,64);const p=x.getImageData(0,0,64,64).data;let n=0;for(let i=0;i<p.length;i+=4)if(p[i]>220&&p[i+1]>220&&p[i+2]>220)n++;return n>12;});
 await page.screenshot({path:path.join(root,'verification/player-desktop.png'),fullPage:true});
 await page.setViewport({width:390,height:844});await page.reload({waitUntil:'networkidle0'});await ready();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('Mobile overflow');
 const mobile=await page.$eval('video',v=>[v.videoWidth,v.videoHeight]);if(mobile[0]!==1080||mobile[1]!==1080)throw Error('Wrong default mobile format');
 await page.$eval('video',v=>{v.pause();v.currentTime=1.15;});await page.waitForFunction(()=>{const v=document.querySelector('video');if(v.seeking||v.currentTime<1.1)return false;const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.drawImage(v,0,0,64,64);const p=x.getImageData(0,0,64,64).data;let n=0;for(let i=0;i<p.length;i+=4)if(p[i]>220&&p[i+1]>220&&p[i+2]>220)n++;return n>12;});
 await page.screenshot({path:path.join(root,'verification/player-mobile.png'),fullPage:true});
 if(errors.length)throw Error(errors.join('\n'));
 const report={modes,portrait,mobile,slowRate:rate,overflow,errors};await fs.writeFile(path.join(root,'verification/player.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser.close();}
