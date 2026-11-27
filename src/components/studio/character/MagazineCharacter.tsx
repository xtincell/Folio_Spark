'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { poses, mobilePoses, type Pose } from './poses';
import { armPoses, armGeometry, shirtPath, palette as c, type Arm, type Point } from './graphicGeometry';
import { GraphicHead, faceFor, type FaceState } from './GraphicHead';
import {handContours} from './handContours';
import s from './magazineCharacter.module.css';

type Frame={x:number;y:number;scale:number;lean:number;head:number;camera:number;board:number;face:FaceState;left:Arm;right:Arm};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const point=(a:Point,b:Point,t:number):Point=>[mix(a[0],b[0],t),mix(a[1],b[1],t)];
function angleMix(a:number,b:number,t:number){return a+(((b-a+540)%360)-180)*t;}
function bone(a:Point,b:Point){return {angle:Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI,length:Math.hypot(b[0]-a[0],b[1]-a[1])};}
function endpoint(origin:Point,angle:number,length:number):Point {return [origin[0]+Math.cos(angle*Math.PI/180)*length,origin[1]+Math.sin(angle*Math.PI/180)*length];}
function armMix(a:Arm,b:Arm,t:number):Arm {
 if(t<=0)return a;if(t>=1)return b;
 const au=bone(a.shoulder,a.elbow),bu=bone(b.shoulder,b.elbow),al=bone(a.elbow,a.wrist),bl=bone(b.elbow,b.wrist);
 const shoulder=point(a.shoulder,b.shoulder,t);
 const elbow=endpoint(shoulder,angleMix(au.angle,bu.angle,t),mix(au.length,bu.length,t));
 const wrist=endpoint(elbow,angleMix(al.angle,bl.angle,t),mix(al.length,bl.length,t));
 return {...b,shoulder,elbow,wrist,angle:angleMix(a.angle??0,b.angle??0,t),contour:b.contour?.map((p,i)=>point(a.contour?.[i]??p,p,t))};
}
function armFor(a:Arm,right=false):Arm {
 const flip=right&&a.hand!=='open';
 const contour=handContours[a.hand].map(([x,y])=>[x,flip?-y:y] as Point);
 return {...a,contour:flip?contour.reverse():contour};
}
export function frameFor(pose:Pose,mobile:boolean):Frame {return {...poses[pose],...(mobile?mobilePoses[pose]:{}),left:armFor(armPoses[pose].left),right:armFor(armPoses[pose].right,true),face:faceFor(pose),board:pose==='fabrique'?1:0};}
export function interpolateFrame(a:Frame,b:Frame,t:number):Frame {return {x:mix(a.x,b.x,t),y:mix(a.y,b.y,t),scale:mix(a.scale,b.scale,t),lean:mix(a.lean,b.lean,t),head:mix(a.head,b.head,t),camera:mix(a.camera,b.camera,t),board:mix(a.board,b.board,t),face:Object.fromEntries(Object.entries(b.face).map(([key,v])=>[key,mix(a.face[key as keyof FaceState],v,t)])) as FaceState,left:armMix(a.left,b.left,t),right:armMix(a.right,b.right,t)};}
function Hand({arm}:{arm:Arm;right?:boolean}){
 const contour=arm.contour??handContours[arm.hand];
 const path=contour.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(3)} ${y.toFixed(3)}`).join(' ');
 return <g transform={`translate(${arm.wrist.map(v=>v.toFixed(3)).join(' ')}) rotate(${(arm.angle??0).toFixed(3)})`} data-part="hand">
  <path d={path+' Z'} fill={c.skin}/>
  <path d={path} fill="none" stroke={c.ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
 </g>;
}
function SkinArm({arm}:{arm:Arm}){const g=armGeometry(arm);return <g data-part="continuous-arm"><path d={g.fill} fill={c.skin}/><path d={g.outline} fill="none" stroke={c.ink} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/></g>;}
function Camera(){return <g transform="translate(-91 86)" stroke={c.ink} strokeWidth="4" strokeLinejoin="round">
 <path d="M4 24 H45 L58 0 H99 L113 24 H167 Q181 24 181 39 V119 Q181 133 167 133 H4 Q-9 133 -9 119 V39 Q-9 24 4 24 Z" fill="#38383e"/>
 <path d="M52 23 63 6 H94 L105 23 Z" fill="#56565e"/>
 <rect x="8" y="35" width="28" height="11" rx="4" fill="#88878a"/>
 <circle cx="101" cy="78" r="49" fill="#222226"/><circle cx="101" cy="78" r="38" fill="#44444b"/><circle cx="101" cy="78" r="30" fill="#18181b"/>
 <circle cx="91" cy="65" r="8" fill={c.ivory} stroke="none"/>
 </g>;}
export function MagazineCharacter({pose,paused=false,board,review}:{pose:Pose;paused?:boolean;board:ReactNode;review?:{from:Pose;to:Pose;progress:number;mobile?:boolean;focus?:boolean}}) {
 const [mobile,setMobile]=useState(false), reduced=useReducedMotion();
 const [frame,setFrame]=useState<Frame>(()=>frameFor(pose,false));
 const current=useRef(frame),still=!!reduced||paused;
 useEffect(()=>{const mq=matchMedia('(max-width: 700px)');const update=()=>setMobile(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update);},[]);
 useEffect(()=>{
  const start=current.current,target=frameFor(pose,mobile);
  if(still){current.current=target;setFrame(target);return;}
  const control=animate(0,1,{duration:.95,ease:[.32,0,.22,1],onUpdate:t=>{const f=interpolateFrame(start,target,t);current.current=f;setFrame(f);}});
  return()=>control.stop();
 },[pose,mobile,still]);
 const isMobile=review?.mobile??mobile;
 const f=review?interpolateFrame(frameFor(review.from,isMobile),frameFor(review.to,isMobile),review.progress):frame;
 const transform=`translate(${f.x} ${f.y}) rotate(${f.lean}) scale(${f.scale})`;
 const boardBox=isMobile?[140,105,325,430]:[475,65,510,390];
 return <svg className={s.rig} viewBox={review?.focus?`${f.x-470} ${f.y-420} 880 720`:isMobile?'0 0 700 600':'0 0 1440 570'} preserveAspectRatio="xMidYMax meet" aria-hidden="true" data-rig="continuous-vector" data-pose={pose} data-paused={still}>
  <g transform={transform}>
   <g transform={`rotate(${f.head})`}><GraphicHead pose={pose} face={f.face} instant still={still||!!review}/></g>
   <path data-part="continuous-shirt" d={shirtPath(f.left,f.right)} fill={c.shirt} stroke={c.ink} strokeWidth="4" strokeLinejoin="round"/>
   <path d="M-55 -16 Q0 34 56 -16 M-62 16 Q-25 40 0 48 L75 128" fill="none" stroke={c.ink} strokeWidth="4"/>
   <SkinArm arm={f.right}/><SkinArm arm={f.left}/>
   <g opacity={f.camera}><Camera/></g>
   <Hand arm={f.right} right/>
  </g>
  <g opacity={f.board}><foreignObject x={boardBox[0]} y={boardBox[1]} width={boardBox[2]} height={boardBox[3]}>{board}</foreignObject></g>
  <g transform={transform}><Hand arm={f.left}/></g>
 </svg>;
}
