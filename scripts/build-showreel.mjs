#!/usr/bin/env node
/** Offline production renderer. Node + installed Puppeteer + Chromium + FFmpeg.
 * Frames stream to FFmpeg, avoiding thousands of temporary image files.
 * --preview renders a contact sheet and poster without changing the final MP4.
 * --serve exposes the seekable composition locally for motion review.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import puppeteer from 'puppeteer';
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const OUT=path.join(ROOT,'public/studio');
const preview=process.argv.includes('--preview');
const serve=process.argv.includes('--serve');
const text=await fs.readFile(path.join(ROOT,'src/components/folio/data/cases.ts'),'utf8');
const projects=[...text.matchAll(/slug: "([^"]+)"[\s\S]*?hero: "([^"]+)"/g)].filter(m=>m[1]!=='perso-sketchbook').map(m=>({project:m[1],source:m[2]}));
if(projects.length!==39)throw Error(`Expected 39 public projects, found ${projects.length}; review storyboard grid.`);
const photos=(await fs.readdir(path.join(ROOT,'public/work/galerie-pixieset'))).filter(s=>s.endsWith('.jpg')).sort().map(s=>({project:path.parse(s).name,source:'/work/galerie-pixieset/'+s}));
const extras=['/logos/spark-mark.svg','/portrait-p2.jpg','/studio/peak-billboard.webp','/studio/robuste-packaging.webp','/work/cases/goodlocs/01.webp','/work/cases/goodlocs/02.webp'];
const sources=[...new Set([...projects,...photos].map(s=>s.source).concat(extras))];
for(const source of sources)await fs.access(path.join(ROOT,'public',source));
const manifest={version:2,title:'Xtincell — L’ingénieur derrière l’image',width:1920,height:1080,fps:30,duration:48,audio:false,
  renderer:'Deterministic Canvas 2D composition / Chromium / FFmpeg H.264',
  generatedPresentations:['/studio/peak-billboard.webp','/studio/robuste-packaging.webp'],
  scenes:[
    {start:0,end:4,title:'Ignition',motion:'Authentic spark, masked wordmark, resolving brand grid'},
    {start:4,end:8,title:'Vision',motion:'Staggered kinetic typography and sliding artwork windows'},
    {start:8,end:14,title:'Peak',motion:'Anchored campaign, opposing detail planes, environmental reveal'},
    {start:14,end:20,title:'Packaging',motion:'Three opposing shutters, Goodlocs to Robuste material match cut'},
    {start:20,end:26,title:'Direction artistique',motion:'Hero portrait splits into editorial triptych; protected faces'},
    {start:26,end:32,title:'Photographie',motion:'Continuous tilted contact strip; eight existing photographs'},
    {start:32,end:36,title:'Toolsmith',motion:'Sequential vector nodes, progressive links, workflow diagram'},
    {start:36,end:43,title:'Index',motion:'39 artwork planes assemble in depth, then converge into spark'},
    {start:43,end:48,title:'Signature',motion:'Wordmark, portrait and typography resolve into opening mark'}
  ],projects,photos,sources};
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.woff2':'font/woff2','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');const name=decodeURIComponent(url.pathname);
    if(name==='/manifest.json'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(manifest));return;}
    const base=['/','/composition.js'].includes(name)?path.join(ROOT,'scripts/showreel'):path.join(ROOT,'public');
    const target=path.resolve(base,'.'+(name==='/'?'/index.html':name));
    if(!target.startsWith(base+path.sep))throw Error('Invalid path');
    const body=await fs.readFile(target);res.setHeader('Content-Type',mime[path.extname(target)]??'application/octet-stream');res.end(body);
  }catch{res.statusCode=404;res.end('Not found');}
});
await new Promise(r=>server.listen(serve?1010:0,'127.0.0.1',r));
const url=`http://127.0.0.1:${server.address().port}`;
if(serve){console.log('Composition preview:',url);await new Promise(()=>{});}
const browser=await puppeteer.launch({executablePath:process.env.PUPPETEER_EXECUTABLE_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
let encoder;
try{
  const page=await browser.newPage();await page.setViewport({width:1920,height:1080,deviceScaleFactor:1});
  page.on('pageerror',e=>{throw e;});
  await page.goto(url);console.log('Assets ready:',await page.evaluate(()=>window.ready));
  const frames=[1.9,5.8,10.1,12.5,15.8,18.6,23.9,28.8,30.7,34.4,39,44.8];
  const temp=await fs.mkdtemp('/tmp/xtincell-motion-');
  for(let i=0;i<frames.length;i++){
    const data=await page.evaluate(t=>window.renderFrame(t),frames[i]);await fs.writeFile(path.join(temp,`${String(i).padStart(2,'0')}.jpg`),Buffer.from(data,'base64'));
  }
  const sheet=spawn('ffmpeg',['-v','error','-y','-pattern_type','glob','-i',`${temp}/*.jpg`,'-vf','scale=480:270,tile=3x4','-frames:v','1',path.join(OUT,'showreel-storyboard.jpg')],{stdio:'inherit'});
  if((await once(sheet,'exit'))[0]!==0)throw Error('Storyboard failed');
  const poster=await page.evaluate(()=>window.renderFrame(10.5));
  await fs.writeFile(path.join(OUT,'showreel-poster.jpg'),Buffer.from(poster,'base64'));
  if(!preview){
    const temporaryOutput=path.join(OUT,'showreel.rendering.mp4');
    encoder=spawn('ffmpeg',['-hide_banner','-loglevel','warning','-y','-f','image2pipe','-vcodec','mjpeg','-framerate','30','-i','pipe:0','-an','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-threads','2',temporaryOutput],{stdio:['pipe','inherit','inherit']});
    let failed;
    encoder.on('error',e=>{failed=e;});encoder.stdin.on('error',e=>{failed=e;});
    const completion=once(encoder,'exit');
    const total=manifest.duration*manifest.fps;
    for(let frame=0;frame<total;frame++){
      if(failed)throw failed;
      const data=await page.evaluate(t=>window.renderFrame(t),frame/manifest.fps);
      if(!encoder.stdin.write(Buffer.from(data,'base64')))await once(encoder.stdin,'drain');
      if(frame%90===0)console.log(`Rendering ${frame}/${total} (${Math.round(frame/total*100)}%)`);
    }
    encoder.stdin.end();if((await completion)[0]!==0)throw Error('FFmpeg encoding failed');
    await fs.rename(temporaryOutput,path.join(OUT,'showreel.mp4'));
    await fs.writeFile(path.join(OUT,'showreel-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
    console.log('Rendered 48 seconds, 1920×1080, 30fps, seamless loop.');
  }
  await fs.rm(temp,{recursive:true,force:true});
} finally {if(encoder&&encoder.exitCode===null)encoder.kill('SIGTERM');await browser.close();await new Promise(r=>server.close(r));}
