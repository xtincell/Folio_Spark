import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const browser=await puppeteer.launch({headless:true});
const result={};
try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewport({width:1440,height:1100});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto(pathToFileURL(path.join(root,'index.html')).href);
 assert.equal(await page.$eval('#play',x=>x.getAttribute('aria-label')),'Lire l’animation');
 assert.equal(await page.$eval('#seek',x=>Number(x.value)),4.2);result.reducedMotion=true;
 await page.click('[data-mode="boucle"]');
 assert.equal(await page.$eval('#seek',x=>Number(x.max)),3);
 await page.click('#play');
 assert.equal(await page.$eval('#play',x=>x.getAttribute('aria-label')),'Lire l’animation');result.pause=true;
 for(const [format,w,h]of [['1920,1080',1920,1080],['1080,1080',1080,1080],['1080,1920',1080,1920]]){
  await page.click(`[data-format="${format}"]`);assert.deepEqual(await page.evaluate(()=>[spark.width,spark.height]),[w,h]);
 }
 result.threeFormats=true;
 await page.click('[data-bg="transparent"]');assert.equal(await page.evaluate(()=>spark.bg.getAttribute('fill')),'none');result.transparent=true;
 await page.click('[data-speed="0.25"]');assert.equal(await page.$eval('[data-speed="0.25"]',x=>x.getAttribute('aria-pressed')),'true');result.slowMotion=true;
 await page.$eval('#seek',e=>{e.value=1.25;e.dispatchEvent(new Event('input',{bubbles:true}));});assert.equal(await page.$eval('#seek',x=>Number(x.value)),1.25);result.scrubbing=true;
 await page.setViewport({width:390,height:844});
 result.mobileOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(result.mobileOverflow,false);
 assert.deepEqual(errors,[]);result.runtimeErrors=errors;
 await fs.writeFile(path.join(root,'verification','ui.json'),JSON.stringify(result,null,2));console.log(result);
}finally{await browser.close();}
