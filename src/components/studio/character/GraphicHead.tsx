'use client';
import {motion} from 'motion/react';
import {useEffect,useId,useState} from 'react';
import {acting,palette as c} from './graphicGeometry';
import type {Pose} from './poses';

export type FaceState={gaze:number;leftBrow:number;rightBrow:number;lid:number;corner:number;opening:number;upper:number};
export function faceFor(pose:Pose):FaceState {const a=acting[pose];return {gaze:a.gaze,leftBrow:a.leftBrow,rightBrow:a.rightBrow,lid:a.lid,corner:a.mouth===1?-5:a.mouth===-2?-2:a.mouth===-1?2:0,opening:a.mouth===1?11:0,upper:a.mouth===1?270:274};}
export function GraphicHead({pose,still,face,instant=false}:{pose:Pose;still:boolean;face?:FaceState;instant?:boolean}){
 const a=face??faceFor(pose),id=useId().replaceAll(':',''),[blink,setBlink]=useState(false);
 useEffect(()=>{if(still){setBlink(false);return;}let close:ReturnType<typeof setTimeout>;const tick=setInterval(()=>{setBlink(true);close=setTimeout(()=>setBlink(false),120);},4700);return()=>{clearInterval(tick);clearTimeout(close);};},[still]);
 const tr={duration:still||instant?0:.6,ease:[.22,.65,.25,1] as [number,number,number,number]};
 const {opening,corner,upper}=a;
 const mouth=`M185 273 Q214 ${upper} 250 ${270+corner} Q214 ${upper+opening} 185 273 Z`;
 const leftEye=`M148 192 Q176 ${186-a.lid} 205 198 Q178 ${207+a.lid} 148 192 Z`;
 const rightEye=`M251 202 Q273 ${193-a.lid} 297 200 Q274 ${212+a.lid} 251 202 Z`;
 return <g transform="translate(-182 -348) scale(.9)" data-face="persistent">
  <defs>
   <clipPath id={`${id}-left`}><motion.path initial={false} animate={{d:leftEye}} transition={tr}/></clipPath>
   <clipPath id={`${id}-right`}><motion.path initial={false} animate={{d:rightEye}} transition={tr}/></clipPath>
   <clipPath id={`${id}-mouth`}><motion.path initial={false} animate={{d:mouth}} transition={tr}/></clipPath>
  </defs>
  <g fill={c.shirtShadow} stroke={c.ink} strokeWidth="5" strokeLinejoin="round">
   <path d="M88 234 Q82 278 59 306 Q50 310 48 300 Q66 272 65 241 Z"/>
   <path d="M100 258 Q105 295 84 329 Q76 336 70 326 Q83 292 78 265 Z"/>
   <path d="M115 277 Q124 309 108 343 Q103 350 95 344 Q103 310 96 284 Z"/>
  </g>
  <path d="M117 275 L113 353 Q102 370 100 380 Q157 427 230 390 L248 317 Z" fill={c.skin} stroke={c.ink} strokeWidth="4"/>
  <path d="M139 305 Q166 353 230 390 L248 317 Z" fill={c.shadow}/>
  <path d="M101 151 Q122 105 178 91 Q233 79 274 109 Q301 129 301 170 L303 236 Q303 279 279 314 Q248 348 196 345 Q137 334 112 296 L96 247 Q76 218 88 178 Z" fill={c.skin} stroke={c.ink} strokeWidth="4"/>
  <path d="M99 160 143 118 128 179 111 240 120 283 100 249 84 209 Z" fill={c.shadow}/>
  <path d="M90 189 Q64 186 58 210 Q51 237 77 251 Q90 254 101 244 L101 204 Z" fill={c.skin} stroke={c.ink} strokeWidth="4"/>
  <path d="M71 208 Q86 198 93 214 Q77 219 84 233" fill="none" stroke={c.ink} strokeWidth="3.5" strokeLinecap="round"/>
  <path d="M104 228 120 249 148 271 162 250 Q181 239 198 249 Q213 242 229 249 Q245 245 263 254 L278 270 292 244 298 259 284 311 Q269 343 244 356 L199 357 163 337 129 307 108 278 Z" fill={c.ink}/>
  <path d="M179 264 Q196 252 212 258 Q230 252 250 261 L263 277 252 300 232 318 221 309 231 291 211 297 196 290 183 289 Z" fill={c.skin}/>
  <path d="M210 293 Q227 298 242 287 L232 307 Z" fill={c.ink}/>
  <path d="M214 207 Q218 220 209 228 Q199 240 214 244 Q231 250 249 242 Q268 243 267 231 Q265 224 257 222" fill={c.skin} stroke={c.ink} strokeWidth="3" strokeLinecap="round"/>
  <path d="M209 237 Q217 229 228 237 Q229 241 223 242 Z M250 237 Q255 231 263 232 Q266 240 255 241 Z" fill={c.ink}/>
  <motion.path initial={false} fill={c.shadow} animate={{d:`M185 273 Q196 261 209 264 Q217 259 224 263 Q240 260 250 ${270+corner} Q220 277 185 273 Z`}} transition={tr}/>
  <motion.path initial={false} fill={c.lip} animate={{d:`M185 273 Q215 ${278+opening} 250 ${270+corner} Q240 ${289+opening*.3} 214 288 Q197 285 185 273 Z`}} transition={tr}/>
  <motion.path initial={false} fill={c.ink} animate={{d:mouth}} transition={tr}/>
  <g clipPath={`url(#${id}-mouth)`}><path d="M183 270 Q213 273 252 263 L253 274 Q213 281 183 277 Z" fill={c.ivory}/></g>
  <motion.path initial={false} fill="none" stroke={c.ink} strokeWidth="2.2" strokeLinecap="round" animate={{d:`M185 273 Q215 ${upper} 250 ${270+corner}`}} transition={tr}/>
  <motion.g initial={false} animate={{y:a.leftBrow,rotate:0}} transition={tr} style={{originX:'180px',originY:'155px'}}>
   <path d="M145 167 Q168 143 205 150 Q211 152 208 163 Q175 157 145 174 Z" fill={c.ink}/>
  </motion.g>
  <motion.g initial={false} animate={{y:a.rightBrow}} transition={tr}><path d="M252 173 Q267 158 291 162 Q300 165 301 176 Q274 170 252 179 Z" fill={c.ink}/></motion.g>
  <g transform="translate(177 195)"><motion.g initial={false} animate={{scaleY:blink?.05:1}} transition={{duration:still?0:blink?.07:.13}} style={{originX:'0px',originY:'0px'}}><g transform="translate(-177 -195)">
   <motion.path initial={false} fill={c.ivory} animate={{d:leftEye}} transition={tr}/>
   <g clipPath={`url(#${id}-left)`}><motion.circle initial={false} cy="195" r="10" fill={c.ink} animate={{cx:174+a.gaze}} transition={tr}/><motion.circle initial={false} cy="192" r="2" fill={c.ivory} animate={{cx:171+a.gaze}} transition={tr}/></g>
   <motion.path initial={false} fill="none" stroke={c.ink} strokeWidth="3" animate={{d:leftEye}} transition={tr}/>
  </g></motion.g></g>
  <g transform="translate(275 202)"><motion.g initial={false} animate={{scaleY:blink?.05:1}} transition={{duration:still?0:blink?.07:.13}} style={{originX:'0px',originY:'0px'}}><g transform="translate(-275 -202)">
   <motion.path initial={false} fill={c.ivory} animate={{d:rightEye}} transition={tr}/>
   <g clipPath={`url(#${id}-right)`}><motion.circle initial={false} cy="201" r="9" fill={c.ink} animate={{cx:270+a.gaze}} transition={tr}/><motion.circle initial={false} cy="198" r="1.7" fill={c.ivory} animate={{cx:268+a.gaze}} transition={tr}/></g>
   <motion.path initial={false} fill="none" stroke={c.ink} strokeWidth="3" animate={{d:rightEye}} transition={tr}/>
  </g></motion.g></g>
  <g fill="none" stroke={c.ink} strokeWidth="6"><path d="M143 184 98 196 M217 196 Q229 189 242 200 M306 191 314 192"/><circle cx="180" cy="194" r="37"/><ellipse cx="274" cy="200" rx="32" ry="34"/></g>
  <g fill="none" stroke={c.silver} strokeWidth="2.8"><path d="M143 184 98 196 M217 196 Q229 189 242 200 M306 191 314 192"/><circle cx="180" cy="194" r="37"/><ellipse cx="274" cy="200" rx="32" ry="34"/></g>
  <g fill={c.shirt} stroke={c.ink} strokeWidth="6" strokeLinejoin="round">
   <path d="M82 119 Q62 75 76 42 Q90 14 116 25 Q143 25 148 49 Q174 23 197 48 L207 73 Z"/>
   <path d="M59 147 Q37 114 53 73 Q75 39 131 40 Q181 37 220 64 L194 85 Q115 55 86 101 L77 146 Q72 160 59 147 Z"/>
   <path d="M21 114 Q7 105 18 88 Q55 40 111 47 Q164 45 202 74 L175 88 Q103 61 65 98 L36 125 Q25 135 21 114 Z"/>
   <path d="M44 169 Q27 166 35 146 Q62 80 125 65 Q185 52 232 84 L210 99 Q142 77 107 106 Q80 125 64 166 Q56 183 44 169 Z"/>
   <path d="M68 198 Q48 198 54 178 Q71 117 123 85 Q165 62 217 76 Q246 83 269 104 L244 103 Q185 86 151 112 Q116 136 92 190 Q83 205 68 198 Z"/>
   <path d="M92 158 Q103 112 154 88 Q188 73 221 83 Q252 89 273 109 L243 107 Q214 95 185 105 L145 119 139 140 114 156 Z"/>
   <path d="M198 76 Q227 66 252 83 Q282 98 292 127 L273 111 Q246 90 220 94 Z"/>
  </g>
 </g>;
}
