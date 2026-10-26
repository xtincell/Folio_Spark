import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync('src/components/studio/character/poses.ts','utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {poses,mobilePoses}=await import('data:text/javascript;base64,'+Buffer.from(js).toString('base64'));
const dir='public/character/magazine-rig';
const image=(name,x,y,w,h)=>`<image href="${name}.webp" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
for(const [name,p] of Object.entries(poses)){
 const arm=(right,handOnly=false)=>{const a=p[right?'right':'left'];return `<g transform="translate(${right?123:-123} 25) rotate(${a[0]})">${handOnly?'':image(right?'upper-right':'upper-left',-45,-24,90,154)}<g transform="translate(0 137) rotate(${a[1]}) scale(${right?-1:1} 1)">${handOnly?'':image('forearm',-14,-42,189,102)}<g transform="translate(158 0) rotate(${right?-a[2]:a[2]})">${p.camera?'':right&&p.open?'<g transform="scale(1 -1)">'+image('hand-open',-10,-46,132,104)+'</g>':image('hand-rest',-15,-38,112,107)}</g></g></g>`;};
 const root=`translate(${p.x} ${p.y}) scale(${p.scale}) rotate(${p.lean})`;
 const body=image('torso',-165,-8,330,141)+`<g transform="rotate(${p.head})">${image('head-'+p.expression,-178,-318,330,354)}</g>`+(name==='fabrique'?'':arm(true))+arm(false)+(p.camera?image('camera',-130,85,260,151):'');
 const board=name==='fabrique'?`<g fill="#101010" stroke="#6c6458"><rect x="475" y="65" width="510" height="390"/></g><text x="500" y="135" fill="#f5f1e7" font-family="Georgia" font-size="48">La Barre.</text><g transform="${root}">${arm(false,true)}</g>`:'';
 fs.writeFileSync(`${dir}/${name}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="570" viewBox="0 0 1440 570"><title>Alexandre Djengue — ${name}</title><g transform="${root}">${body}</g>${board}</svg>`);
}
fs.writeFileSync(dir+'/rig.json',JSON.stringify({version:1,type:'SVG skeleton with transparent WebP parts',bones:{neck:[0,0],leftShoulder:[-123,25],rightShoulder:[123,25],elbow:[0,137],wrist:[158,0]},poses,mobilePoses,expressions:['confident','smile','sly'],source:'master.webp',spring:{stiffness:85,damping:18},order:['torso','head','arms','camera','board','foregroundHand']},null,2));
console.log('Exported four poses and rig.json');
