export type Point = readonly [number, number];
export type Arm = { shoulder: Point; elbow: Point; wrist: Point; hand: 'rest'|'open'|'grip'; angle?: number; contour?: readonly Point[] };
export const palette={skin:'#a65f39',shadow:'#79412e',lip:'#ad6242',ink:'#171719',shirt:'#28282d',shirtShadow:'#202024',ivory:'#f3ede2',silver:'#b9bbbf'};
export const acting = {
 cover:{gaze:-2,leftBrow:0,rightBrow:-1,lid:4,mouth:0,tilt:0},
 regard:{gaze:7,leftBrow:-6,rightBrow:2,lid:2,mouth:-1,tilt:-3},
 direction:{gaze:-3,leftBrow:0,rightBrow:-3,lid:0,mouth:1,tilt:2},
 fabrique:{gaze:-7,leftBrow:3,rightBrow:-7,lid:-1,mouth:-2,tilt:7},
} as const;
export const armPoses:Record<keyof typeof acting,{left:Arm;right:Arm}>={
 cover:{left:{shoulder:[-110,20],elbow:[-165,155],wrist:[-20,158],hand:'rest',angle:0},right:{shoulder:[110,20],elbow:[164,153],wrist:[12,176],hand:'rest',angle:175}},
 regard:{left:{shoulder:[-110,20],elbow:[-164,177],wrist:[-82,120],hand:'grip',angle:-35},right:{shoulder:[110,20],elbow:[163,177],wrist:[80,146],hand:'grip',angle:205}},
 direction:{left:{shoulder:[-110,20],elbow:[-165,155],wrist:[-20,158],hand:'rest',angle:0},right:{shoulder:[110,20],elbow:[178,132],wrist:[272,18],hand:'open',angle:-25}},
 fabrique:{left:{shoulder:[-110,20],elbow:[-225,-22],wrist:[-180,-217],hand:'rest',angle:-8},right:{shoulder:[110,20],elbow:[140,135],wrist:[-120,120],hand:'rest',angle:175}},
};
const add=(a:Point,b:Point):Point=>[a[0]+b[0],a[1]+b[1]];
const sub=(a:Point,b:Point):Point=>[a[0]-b[0],a[1]-b[1]];
const mul=(a:Point,k:number):Point=>[a[0]*k,a[1]*k];
const unit=(a:Point):Point=>{const length=Math.hypot(...a)||1;return[a[0]/length,a[1]/length]};
const normal=(a:Point):Point=>[-a[1],a[0]];
const mid=(a:Point,b:Point):Point=>mul(add(a,b),.5);
const fmt=(p:Point)=>`${p[0].toFixed(3)} ${p[1].toFixed(3)}`;
export function armGeometry(a:Arm){
 const upper=unit(sub(a.elbow,a.shoulder)),lower=unit(sub(a.wrist,a.elbow));
 const radians=(a.angle??Math.atan2(lower[1],lower[0])*180/Math.PI)*Math.PI/180;
 const end:Point=[Math.cos(radians),Math.sin(radians)];
 const n1=normal(upper),n2=normal(end),join=unit(add(normal(upper),normal(lower)));
 const cuff=add(a.shoulder,mul(sub(a.elbow,a.shoulder),.48));
 const s1=add(cuff,mul(n1,32)),s2=add(cuff,mul(n1,-32));
 const elbowNormal=normal(lower),cross=upper[0]*lower[1]-upper[1]*lower[0];
 const u1=add(a.elbow,mul(n1,30)),u2=add(a.elbow,mul(n1,-30));
 const e1=add(a.elbow,mul(elbowNormal,30)),e2=add(a.elbow,mul(elbowNormal,-30));
 const w1=add(a.wrist,mul(n2,17)),w2=add(a.wrist,mul(n2,-17));
 const bend1=cross<0?`A30 30 0 0 0 ${fmt(e1)}`:`Q${fmt(a.elbow)} ${fmt(e1)}`;
 const bend2=cross>0?`A30 30 0 0 0 ${fmt(u2)}`:`Q${fmt(a.elbow)} ${fmt(u2)}`;
 const side1=cross>0?`M${fmt(s1)} C${fmt(add(s1,mul(upper,35)))} ${fmt(add(w1,mul(end,-35)))} ${fmt(w1)}`:`M${fmt(s1)} L${fmt(u1)} ${bend1} C${fmt(add(e1,mul(lower,35)))} ${fmt(add(w1,mul(end,-35)))} ${fmt(w1)}`;
 const side2=cross<0?`M${fmt(w2)} C${fmt(add(w2,mul(end,-35)))} ${fmt(add(s2,mul(upper,35)))} ${fmt(s2)}`:`M${fmt(w2)} C${fmt(add(w2,mul(end,-35)))} ${fmt(add(e2,mul(lower,35)))} ${fmt(e2)} ${bend2} L${fmt(s2)}`;
 const fill=side1+side2.replace(/^M/,'L')+' Z';
 return {fill,outline:side1+' '+side2,cuff,upper,n1,angle:Math.atan2(lower[1],lower[0])*180/Math.PI};
}
export function shirtPath(left:Arm,right:Arm){
 const l=armGeometry(left),r=armGeometry(right);
 const lo=add(l.cuff,mul(l.n1,40)),li=add(l.cuff,mul(l.n1,-40));
 const ro=add(r.cuff,mul(r.n1,-40)),ri=add(r.cuff,mul(r.n1,40));
 return `M-56 -17 Q-121 -23 -150 12 Q${fmt(add(lo,mul(l.upper,-25)))} ${fmt(lo)} L${fmt(li)} L-111 209 Q0 232 111 209 L${fmt(ri)} L${fmt(ro)} Q${fmt(add(ro,mul(r.upper,-25)))} 150 12 Q121 -23 56 -17 Q0 39 -56 -17 Z`;
}
export const handPaths={
 rest:{fill:'M-7 -17 C10 -17 23 -13 36 -9 C50 -5 61 3 66 15 L80 48 Q84 62 77 65 Q70 67 66 56 L53 30 L60 69 Q61 80 53 81 Q46 81 44 71 L36 38 L40 78 Q39 89 31 87 Q24 85 24 76 L21 38 L18 70 Q16 81 8 77 Q2 75 4 65 L5 34 Q-4 27 -9 17 Z',detail:'M21 38 L18 70 M36 38 L40 78 M53 30 L60 69'},
 open:{fill:'M-7 -17 Q12 -21 22 -33 L39 -55 Q47 -62 52 -55 Q54 -48 44 -34 L38 -23 Q54 -20 66 -23 L91 -33 Q102 -37 104 -30 Q105 -24 96 -19 L68 -7 L101 -15 Q113 -17 113 -9 Q112 -3 102 0 L73 7 L97 4 Q108 4 106 12 Q104 17 94 20 L67 27 Q33 41 11 25 L-7 17 Z',detail:'M38 -23 Q29 -11 31 3 M68 -7 L53 1 M73 7 L57 13 M67 27 Q43 27 31 17'},
 grip:{fill:'M-7 -17 Q6 -23 14 -37 Q26 -51 39 -48 L67 -43 Q78 -40 76 -32 Q74 -26 63 -29 L40 -31 L30 -18 L66 -17 Q79 -16 78 -7 Q77 0 65 0 L35 -2 L70 3 Q82 6 78 14 Q75 20 63 16 L33 11 L60 21 Q70 25 65 33 Q60 38 50 32 L22 24 Q7 25 -7 17 Z',detail:'M30 -18 L16 -10 M35 -2 L21 -5 M33 11 L19 4'},
} as const;
