// Local preview with byte ranges, required for reliable video seeking.
import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),port=Number(process.env.SPARK_PORT||8766);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.mp4':'video/mp4','.webm':'video/webm','.mov':'video/quicktime','.zip':'application/zip','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml','.ttf':'font/ttf','.md':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  let u=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/spark-animation-v3(?=\/|$)/,'');if(u==='/'||!u)u='/index.html';
  const archive=u==='/SPARK-ANIMATION-V3.zip';let p=archive?path.join(root,'../SPARK-ANIMATION-V3.zip'):path.resolve(root,'.'+u);
  if(!archive&&!p.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(fs.statSync(p).isDirectory())p=path.join(p,'index.html');const stat=fs.statSync(p);let start=0,end=stat.size-1,status=200;
  if(req.headers.range){const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!m){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
   if(m[1]){start=Number(m[1]);if(m[2])end=Math.min(end,Number(m[2]));}else start=Math.max(0,stat.size-Number(m[2]));
   if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}status=206;
  }
  const headers={'Content-Type':mime[path.extname(p)]||'application/octet-stream','Content-Length':end-start+1,'Accept-Ranges':'bytes','Cache-Control':'no-cache'};
  if(status===206)headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;res.writeHead(status,headers);
  if(req.method==='HEAD')res.end();else fs.createReadStream(p,{start,end}).pipe(res);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Spark preview: http://127.0.0.1:${port}/spark-animation-v3/`));
