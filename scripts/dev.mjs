import {spawn} from 'node:child_process';
const args=process.argv.slice(2);let port='1009';let host='0.0.0.0';
for(let i=0;i<args.length;i++){if(args[i]==='--port')port=args[++i];if(args[i]==='--host')host=args[++i];}
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname',host,'--port',port],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??0));
