'use client';
import {useEffect,useState} from 'react';
import {animate,useReducedMotion} from 'motion/react';
import {MagazineCharacter} from '@/components/studio/character/MagazineCharacter';
import {GraphicHead} from '@/components/studio/character/GraphicHead';
import {poses,type Pose} from '@/components/studio/character/poses';
const names=Object.keys(poses) as Pose[];
const labels:Record<Pose,string>={cover:'01 · Confiant',regard:'02 · Observateur',direction:'03 · Narquois',fabrique:'04 · En coin'};
const field={padding:'8px 12px',border:'1px solid #bcb2a2',borderRadius:4,background:'#fffaf0',color:'#171719'};
export default function CharacterLab(){
 const [from,setFrom]=useState<Pose>('cover'),[to,setTo]=useState<Pose>('direction'),[progress,setProgress]=useState(0),[mobile,setMobile]=useState(false),[playing,setPlaying]=useState(false);
 const reduced=useReducedMotion();
 useEffect(()=>{if(!playing)return;if(reduced){setProgress(1);setPlaying(false);return;}setProgress(0);const a=animate(0,1,{duration:3,ease:[.32,0,.22,1],onUpdate:setProgress,onComplete:()=>setPlaying(false)});return()=>a.stop();},[playing,reduced]);
 const board=<div style={{height:'100%',boxSizing:'border-box',background:'#29292c',border:'3px solid #171719',color:'#f5efdf',padding:24,fontSize:30}}>La Barre.</div>;
 return <main id="contenu" style={{background:'#f3eddf',color:'#171719',minHeight:'100vh',padding:28,fontFamily:'sans-serif'}}>
  <header style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:20,marginBottom:20}}><div><h1 style={{fontSize:28,margin:'0 0 8px'}}>Alexandre · étude du mouvement</h1><p style={{margin:0,fontSize:14}}>Un visage persistant. Quatre attitudes. Contrôle des raccords et des transitions.</p></div><a href="/" style={{color:'#171719'}}>Voir le hero ↗</a></header>
  <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:16}}>{names.map(p=><section key={p} style={{border:'1px solid #c4baaa',overflow:'hidden'}}><h2 style={{fontSize:16,margin:'12px 16px 0'}}>{labels[p]}</h2><div style={{height:285}}><MagazineCharacter pose={p} paused board={board} review={{from:p,to:p,progress:1,mobile:false,focus:true}}/></div></section>)}</div>
  <section style={{marginTop:36}}><h2 style={{fontSize:22}}>Le même visage</h2><div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid #c4baaa'}}>{names.map(p=><div key={p}><svg viewBox="-160 -340 320 380" width="100%" height="240" aria-label={labels[p]} role="img"><GraphicHead pose={p} still/></svg><p style={{textAlign:'center'}}>{labels[p]}</p></div>)}</div></section>
  <section id="transition" style={{marginTop:36}}><h2 style={{fontSize:22}}>Inspecter une transition</h2><div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
   <label>Départ <select style={field} value={from} onChange={e=>{setPlaying(false);setFrom(e.target.value as Pose);}}>{names.map(p=><option key={p} value={p}>{labels[p]}</option>)}</select></label>
   <label>Arrivée <select style={field} value={to} onChange={e=>{setPlaying(false);setTo(e.target.value as Pose);}}>{names.map(p=><option key={p} value={p}>{labels[p]}</option>)}</select></label>
   <label><input type="checkbox" checked={mobile} onChange={e=>setMobile(e.target.checked)}/> Mobile</label>
   <button style={field} onClick={()=>setPlaying(!playing)}>{playing?'Arrêter':'Jouer la transition'}</button>
  </div>
  <label style={{display:'flex',alignItems:'center',gap:14,marginTop:16}}>Progression {Math.round(progress*100)} % <input style={{width:240}} aria-label="Progression" type="range" min="0" max="1" step=".01" value={progress} onChange={e=>{setPlaying(false);setProgress(Number(e.target.value));}}/></label>
  <div style={{display:'flex',gap:12,margin:'12px 0'}}>{[0,.25,.5,.75,1].map(v=><button style={field} key={v} onClick={()=>{setPlaying(false);setProgress(v);}}>{v*100} %</button>)}</div>
  <div style={{height:570,maxWidth:mobile?390:1440,border:'1px solid #c4baaa'}}><MagazineCharacter pose={to} paused board={board} review={{from,to,progress,mobile,focus:!mobile}}/></div>
  </section>
 </main>;
}
