'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { poses, mobilePoses, type Pose } from './poses';
import s from './magazineCharacter.module.css';

const base = '/character/magazine-rig/';
function Part({name,x,y,w,h}:{name:string;x:number;y:number;w:number;h:number}) {
 return <image href={`${base}${name}.webp`} x={x} y={y} width={w} height={h} />;
}
function Joint({angle,delay=0,still,children}:{angle:number;delay?:number;still:boolean;children:ReactNode}) {
 const rotate = useMotionValue(angle);
 useEffect(()=>{
  const start=rotate.get(), distance=((angle-start+540)%360)-180;
  if(still){rotate.set(angle); return;}
  const control=animate(rotate,start+distance,{type:'spring',stiffness:85,damping:18,delay});
  return ()=>control.stop();
 },[angle,delay,rotate,still]);
 return <motion.g style={{rotate,originX:'0px',originY:'0px'}}>{children}</motion.g>;
}
export function MagazineCharacter({pose,paused=false,board}:{pose:Pose;paused?:boolean;board:ReactNode}) {
 const [mobile,setMobile]=useState<boolean|null>(null);
 const reduced=useReducedMotion();
 useEffect(()=>{const mq=matchMedia('(max-width: 700px)');const update=()=>setMobile(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update);},[]);
 const p=poses[pose], pos=mobile?{...p,...mobilePoses[pose]}:p;
 const still=!!reduced||paused;
 const transition=still?{duration:0}:{type:'spring' as const,stiffness:62,damping:16};
 const arm=(side:'left'|'right',onlyHand=false)=>{
  const angles=p[side],isRight=side==='right';
  return <g transform={`translate(${isRight?123:-123} 25)`}>
   <Joint angle={angles[0]} delay={.04} still={still}>
    {!onlyHand&&<Part name={isRight?'upper-right':'upper-left'} x={-45} y={-24} w={90} h={154}/>}
    <g transform="translate(0 137)">
     <Joint angle={angles[1]} delay={.09} still={still}>
      <g transform={isRight?'scale(-1 1)':undefined}>
       {!onlyHand&&<Part name="forearm" x={-14} y={-42} w={189} h={102}/>}
       <g transform="translate(158 0)">
        <Joint angle={isRight?-angles[2]:angles[2]} delay={.13} still={still}>
         <motion.g animate={{opacity:isRight?p.open:0}} transition={{duration:still?0:.25}}><g transform="scale(1 -1)"><Part name="hand-open" x={-10} y={-46} w={132} h={104}/></g></motion.g>
         <motion.g animate={{opacity:p.camera?0:(isRight?1-p.open:1)}} transition={{duration:still?0:.25}}><Part name="hand-rest" x={-15} y={-38} w={112} h={107}/></motion.g>
        </Joint>
       </g>
      </g>
     </Joint>
    </g>
   </Joint>
  </g>;
 };
 const root=(children:ReactNode)=> <motion.g initial={false} animate={{x:pos.x,y:pos.y,scale:pos.scale,rotate:p.lean}} transition={transition} style={{originX:'0px',originY:'0px'}}>{children}</motion.g>;
 if(mobile===null)return <svg className={s.rig} aria-hidden="true"/>;
 const boardBox=mobile?[140,105,325,430]:[475,65,510,390];
 return <svg className={s.rig} viewBox={mobile?'0 0 700 600':'0 0 1440 570'} preserveAspectRatio="xMidYMax meet" aria-hidden="true" data-rig="shared-skeleton" data-pose={pose} data-paused={still}>
  {root(<g className={still?undefined:s.breathe}>
   <Part name="torso" x={-165} y={-8} w={330} h={141}/>
   <Joint angle={p.head} delay={.07} still={still}>
    {(['confident','smile','sly'] as const).map(e=><motion.g key={e} animate={{opacity:p.expression===e?1:0}} transition={{duration:still?0:.24}}><Part name={`head-${e}`} x={-178} y={-318} w={330} h={354}/></motion.g>)}
   </Joint>
   <motion.g animate={{opacity:pose==='fabrique'?0:1}} transition={{duration:still?0:.25}}>{arm('right')}</motion.g>{arm('left')}
   <motion.g animate={{opacity:p.camera}} transition={{duration:still?0:.25}}><Part name="camera" x={-130} y={85} w={260} h={151}/></motion.g>
  </g>)}
  <motion.g animate={{opacity:pose==='fabrique'?1:0}} transition={{duration:still?0:.3}}>
   <foreignObject x={boardBox[0]} y={boardBox[1]} width={boardBox[2]} height={boardBox[3]}>{board}</foreignObject>
  </motion.g>
  {root(<motion.g animate={{opacity:pose==='fabrique'?1:0}} transition={{duration:still?0:.25}}>{arm('left',true)}</motion.g>)}
 </svg>;
}
