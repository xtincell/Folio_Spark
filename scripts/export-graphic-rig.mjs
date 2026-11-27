/** Export the actual React rig, including its intermediate geometry, as editable SVG. */
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(mod,file)=>{
 const source=fs.readFileSync(file,'utf8');
 const result=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2020}});
 mod._compile(result.outputText,file);
};
require.extensions['.css']=mod=>{mod.exports={rig:'rig'};};
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {MagazineCharacter}=require('../src/components/studio/character/MagazineCharacter.tsx');
const {GraphicHead}=require('../src/components/studio/character/GraphicHead.tsx');
const {armPoses,acting}=require('../src/components/studio/character/graphicGeometry.ts');
const {poses,mobilePoses}=require('../src/components/studio/character/poses.ts');
const output=path.resolve('public/character/graphic-rig');
fs.mkdirSync(output,{recursive:true});
const names=['cover','regard','direction','fabrique'];
const board=React.createElement('div',{xmlns:'http://www.w3.org/1999/xhtml',style:{height:'100%',boxSizing:'border-box',background:'#29292c',border:'3px solid #171719',color:'#f3eddf',padding:28,fontFamily:'sans-serif',fontSize:30}},'La Barre.');
for(const pose of names){
 const markup=renderToStaticMarkup(React.createElement(MagazineCharacter,{pose,paused:true,board,review:{from:pose,to:pose,progress:1,mobile:false}}));
 fs.writeFileSync(path.join(output,`${pose}.svg`),markup.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));
 const head=renderToStaticMarkup(React.createElement('svg',{xmlns:'http://www.w3.org/2000/svg',viewBox:'-180 -350 360 400'},React.createElement(GraphicHead,{pose,still:true})));
 fs.writeFileSync(path.join(output,`expression-${pose}.svg`),head);
}
console.log(`Exported 4 poses + 4 expressions from the live component to ${output}`);

fs.writeFileSync(path.join(output,'rig.json'),JSON.stringify({version:2,type:'native SVG with continuous arm geometry and persistent face',source:'src/components/studio/character/MagazineCharacter.tsx',poses,mobilePoses,armPoses,acting,review:'/character-lab'},null,2)+'\n');
