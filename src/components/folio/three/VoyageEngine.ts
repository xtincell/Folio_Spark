/**
 * VoyageEngine — « De la poussière à l'étoile », le voyage.
 *
 * Un monde 3D continu : la caméra suit un rail spline à travers cinq
 * chapitres pilotés par le scroll — champ de poussière (bruit curl +
 * répulsion du curseur), disque d'accrétion qu'on contourne, constellation
 * spark-mark qu'on traverse, étoile-noyau vivante, allumage final.
 *
 * Rendu : particules additives (shader commun), étoile en shader
 * fresnel/déplacement, sprites de halo, EffectComposer (bloom + grain +
 * vignette + aberration chromatique) sur tier desktop. Sonde FPS qui
 * dégrade en direct ; dispose intégral.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export type VoyageHandle = {
  dispose: () => void;
  /** t réels des 5 chapitres, calculés depuis les lieux du rail. */
  chapters: number[];
};

export type VoyageOpts = {
  canvas: HTMLCanvasElement;
  /** 0..1 — position du scroll dans le voyage (le client la met à jour). */
  getScroll: () => number;
  /** Chapitre courant (float) à chaque frame — pour les panneaux HTML. */
  onChapter?: (chapterFloat: number) => void;
  onReady?: () => void;
};

/* ── Palette marque (sRGB ≈ tokens oklch) ── */
const INK = new THREE.Color('#f5f1e6');
const EMBER = new THREE.Color('#ff7a36');
const EMBER_DEEP = new THREE.Color('#e8500a');
const VIOLET = new THREE.Color('#8f6cff');
const GOLD = new THREE.Color('#d9b36a');

/* Positions des lieux du monde */
const RING_POS = new THREE.Vector3(-15, -2.5, -10);
const SPARK_POS = new THREE.Vector3(11, 2, -50);
const CORE_POS = new THREE.Vector3(-2, 0, -92);

/* Centres des chapitres sur t ∈ [0,1] (alignés avec le client) */
export const CHAPTERS = [0.05, 0.29, 0.51, 0.73, 0.94];

/* ── GLSL ── */
const SNOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const PARTICLE_VERT = /* glsl */ `
${SNOISE}
attribute vec3 aAlt;
attribute vec3 aColor;
attribute vec4 aRand;
uniform float uTime;
uniform float uSize;
uniform float uEnergy;
uniform float uForm;      // 0 → positions aAlt (dispersé), 1 → position (formé)
uniform float uDrift;     // amplitude du bruit curl
uniform float uRise;      // embres : montée en boucle
uniform vec3 uPointer;    // position monde du curseur
uniform float uPointerR;  // rayon de répulsion
void main() {
  vec3 p = mix(aAlt, position, uForm);
  // dérive organique type curl (3 axes de bruit décorrélés)
  float t = uTime * (0.05 + aRand.y * 0.08);
  vec3 np = p * 0.12 + vec3(0.0, 0.0, t);
  vec3 drift = vec3(
    snoise(np),
    snoise(np + vec3(31.4, 12.9, 7.3)),
    snoise(np + vec3(74.2, 3.7, 21.8))
  );
  p += drift * uDrift * (0.4 + 0.6 * aRand.w);
  // embres — montée bouclée
  if (uRise > 0.001) {
    p.y += mod(uTime * (1.2 + aRand.y * 2.2) * uRise + aRand.x * 40.0, 34.0) - 8.0;
  }
  // répulsion du curseur
  vec3 toP = p - uPointer;
  float d = length(toP);
  if (d < uPointerR) {
    float f = (1.0 - d / uPointerR);
    p += normalize(toP + vec3(0.0001)) * f * f * 2.6;
  }
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = max(2.0, -mv.z);
  float tw = 0.55 + 0.45 * sin(uTime * (0.6 + aRand.y * 2.0) * (1.0 + uEnergy) + aRand.x * 6.2832);
  vColor = aColor;
  vTw = tw;
  gl_PointSize = uSize * (0.3 + aRand.z * 1.5) * (34.0 / dist);
  gl_Position = projectionMatrix * mv;
}
varying vec3 vColor;
varying float vTw;
`;

/* three concatène ; les varyings doivent être déclarés avant usage → on
   réordonne proprement dans buildParticleMaterial. */

const PARTICLE_FRAG = /* glsl */ `
precision mediump float;
uniform float uOpacity;
varying vec3 vColor;
varying float vTw;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv) * 2.0;
  float core = smoothstep(1.0, 0.0, d);
  float a = core * core * (0.2 + 0.8 * vTw) * uOpacity;
  if (a < 0.015) discard;
  gl_FragColor = vec4(vColor * (0.7 + 0.6 * vTw), a);
}
`;

const CORE_VERT = /* glsl */ `
${SNOISE}
uniform float uTime;
uniform float uAmp;
varying vec3 vNormalW;
varying vec3 vPosW;
varying float vNoise;
void main() {
  float n = snoise(normal * 1.6 + vec3(uTime * 0.22));
  vNoise = n;
  vec3 p = position + normal * n * uAmp;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vPosW = world.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const CORE_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uCamPos;
uniform float uFlash;
varying vec3 vNormalW;
varying vec3 vPosW;
varying float vNoise;
void main() {
  vec3 viewDir = normalize(uCamPos - vPosW);
  float fresnel = pow(1.0 - max(0.0, dot(viewDir, normalize(vNormalW))), 2.2);
  vec3 base = mix(uColorB, uColorA, 0.5 + vNoise * 0.5);
  vec3 col = base * (0.35 + vNoise * 0.25) + uColorA * fresnel * 1.6;
  col += uColorA * uFlash * 1.8;
  // fog manuel (aligné sur FogExp2 de la scène) — sinon le noyau perce tout le voyage
  float dd = distance(uCamPos, vPosW);
  float fogF = 1.0 - exp(-(0.012 * dd) * (0.012 * dd) * 2.2);
  col = mix(col, vec3(0.02, 0.016, 0.016), clamp(fogF, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

const COMPOSITE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uCA;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main() {
  vec2 uv = vUv;
  vec2 c = uv - 0.5;
  float r2 = dot(c, c);
  // aberration chromatique radiale subtile
  vec2 off = c * r2 * uCA;
  vec3 col;
  col.r = texture2D(tDiffuse, uv + off).r;
  col.g = texture2D(tDiffuse, uv).g;
  col.b = texture2D(tDiffuse, uv - off).b;
  // vignette
  col *= 1.0 - r2 * 0.9;
  // grain vivant
  float g = hash(uv * vec2(1920.0, 1080.0) + fract(uTime) * 43.7) - 0.5;
  col += g * 0.035;
  gl_FragColor = vec4(col, 1.0);
}
`;

/* ── Utilitaires ── */
function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function pickColor(): THREE.Color {
  const r = Math.random();
  if (r < 0.52) return INK;
  if (r < 0.72) return GOLD;
  if (r < 0.88) return EMBER;
  return VIOLET;
}

function makeParticleMaterial(size: number, opacity: number): THREE.ShaderMaterial {
  // varyings déclarés en tête (le template les avait en fin de source)
  const vert = 'varying vec3 vColor;\nvarying float vTw;\n' + PARTICLE_VERT.replace('varying vec3 vColor;\nvarying float vTw;\n', '');
  return new THREE.ShaderMaterial({
    vertexShader: vert,
    fragmentShader: PARTICLE_FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size },
      uEnergy: { value: 0.4 },
      uForm: { value: 1 },
      uDrift: { value: 0.5 },
      uRise: { value: 0 },
      uOpacity: { value: opacity },
      uPointer: { value: new THREE.Vector3(9999, 9999, 9999) },
      uPointerR: { value: 5.5 },
    },
  });
}

function makePoints(
  positions: Float32Array,
  alt: Float32Array,
  mat: THREE.ShaderMaterial,
): THREE.Points {
  const n = positions.length / 3;
  const geo = new THREE.BufferGeometry();
  const colors = new Float32Array(n * 3);
  const rand = new Float32Array(n * 4);
  const tmp = new THREE.Color();
  for (let i = 0; i < n; i++) {
    tmp.copy(pickColor());
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
    rand[i * 4] = Math.random();
    rand[i * 4 + 1] = Math.random();
    rand[i * 4 + 2] = Math.random();
    rand[i * 4 + 3] = Math.random();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aAlt', new THREE.BufferAttribute(alt, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -45), 160);
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return pts;
}

function glowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const x = c.getContext('2d')!;
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,190,130,0.85)');
  g.addColorStop(0.35, 'rgba(255,130,60,0.35)');
  g.addColorStop(1, 'rgba(255,120,50,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/** Échantillonne le spark-mark SVG (mêmes points que la constellation). */
export function loadSparkPoints(timeoutMs = 1800): Promise<Float32Array | null> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v: Float32Array | null) => {
      if (!done) {
        done = true;
        resolve(v);
      }
    };
    const to = window.setTimeout(() => finish(null), timeoutMs);
    try {
      const img = new Image();
      img.onload = () => {
        try {
          const W = 180;
          const H = 224;
          const cv = document.createElement('canvas');
          cv.width = W;
          cv.height = H;
          const ctx = cv.getContext('2d', { willReadFrequently: true });
          if (!ctx) return finish(null);
          ctx.drawImage(img, 0, 0, W, H);
          const data = ctx.getImageData(0, 0, W, H).data;
          const pts: number[] = [];
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              const a = data[(y * W + x) * 4 + 3] ?? 0;
              if (a > 90) pts.push(x / W - 0.5, 0.5 - y / H);
            }
          }
          window.clearTimeout(to);
          finish(pts.length > 400 ? new Float32Array(pts) : null);
        } catch {
          finish(null);
        }
      };
      img.onerror = () => finish(null);
      img.src = '/logos/spark-mark.svg';
    } catch {
      finish(null);
    }
  });
}

export function createVoyage(opts: VoyageOpts, spark: Float32Array | null): VoyageHandle | null {
  const { canvas, getScroll, onChapter, onReady } = opts;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  } catch {
    return null;
  }

  /* Tier appareil */
  const nav = navigator as Navigator & { deviceMemory?: number };
  const mem = nav.deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency || 4;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const wide = window.innerWidth > 1024;
  const highTier = fine && wide && mem >= 4 && cores >= 6;
  let dustCount = highTier ? 26000 : 11000;
  if (mem <= 2 || cores <= 3) dustCount = 6000;
  let dpr = Math.min(window.devicePixelRatio || 1, highTier ? 1.75 : 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x050404, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050404, 0.012);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 260);

  /* ── Rail caméra : spline à travers les lieux ── */
  const path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.5, 46),
      new THREE.Vector3(0, 1, 30),
      new THREE.Vector3(-2.5, 1.5, 16),
      new THREE.Vector3(-6.5, 1.8, 4),
      new THREE.Vector3(-11.5, 2.6, -1), // survol du disque
      new THREE.Vector3(-19.5, -0.5, -13), // virage derrière
      new THREE.Vector3(-10, 0, -26),
      new THREE.Vector3(2, 1.5, -36),
      new THREE.Vector3(11, 2, -47.5), // traversée de la constellation
      new THREE.Vector3(9, 1.5, -58),
      new THREE.Vector3(2, 0.5, -68),
      new THREE.Vector3(-2, 0.6, -72), // face au noyau, à distance respectueuse
      new THREE.Vector3(-2, 0.8, -74.5),
    ],
    false,
    'catmullrom',
    0.15,
  );
  // t réels des lieux : échantillonnage du rail
  const nearestT = (target: THREE.Vector3): number => {
    let best = 0;
    let bestD = Infinity;
    const tmp = new THREE.Vector3();
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      path.getPoint(t, tmp);
      const d = tmp.distanceTo(target);
      if (d < bestD) {
        bestD = d;
        best = t;
      }
    }
    return best;
  };
  const tRing = nearestT(RING_POS);
  const tSpark = nearestT(SPARK_POS);
  const chapters = [
    0.045,
    Math.max(0.12, tRing - 0.05), // manifeste : le disque en approche, bien cadré
    tRing + (tSpark - tRing) * 0.5, // trajectoire : remontée, constellation au loin
    Math.max(0.4, tSpark - 0.035), // constellation : face à nous, avant la traversée
    0.965, // allumage : face au noyau
  ];

  const lookPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(-8, -1, -6),
      RING_POS.clone(),
      new THREE.Vector3(-2, 1, -30),
      SPARK_POS.clone(),
      new THREE.Vector3(4, 1, -66),
      CORE_POS.clone().add(new THREE.Vector3(0, -2.2, 0)),
      CORE_POS.clone().add(new THREE.Vector3(0, -4.5, 0)),
    ],
    false,
    'catmullrom',
    0.2,
  );

  /* ── La poussière : corridor autour du rail ── */
  const dustPos = new Float32Array(dustCount * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < dustCount; i++) {
    path.getPoint(Math.random(), v);
    const r = 4 + Math.pow(Math.random(), 0.6) * 42;
    const a = Math.random() * Math.PI * 2;
    const up = (Math.random() - 0.5) * 2;
    dustPos[i * 3] = v.x + Math.cos(a) * r;
    dustPos[i * 3 + 1] = v.y + up * r * 0.55;
    dustPos[i * 3 + 2] = v.z + Math.sin(a) * r * 0.9 - 4;
  }
  const dustMat = makeParticleMaterial(2.0 * dpr, 0.9);
  dustMat.uniforms.uDrift!.value = 0.9;
  const dust = makePoints(dustPos, dustPos.slice(), dustMat);
  scene.add(dust);

  /* ── Le disque d'accrétion ── */
  const beltCount = highTier ? 9000 : 4500;
  const beltPos = new Float32Array(beltCount * 3);
  for (let i = 0; i < beltCount; i++) {
    const band = Math.random();
    const R = band < 0.5 ? 6.2 : band < 0.82 ? 7.8 : 9.6;
    const a = Math.random() * Math.PI * 2;
    const rr = R + gauss() * 0.35;
    beltPos[i * 3] = Math.cos(a) * rr;
    beltPos[i * 3 + 1] = gauss() * 0.22;
    beltPos[i * 3 + 2] = Math.sin(a) * rr * 0.98;
  }
  const beltMat = makeParticleMaterial(2.4 * dpr, 1);
  beltMat.uniforms.uDrift!.value = 0.12;
  beltMat.uniforms.uEnergy!.value = 0.55;
  const belt = makePoints(beltPos, beltPos.slice(), beltMat);
  belt.position.copy(RING_POS);
  belt.rotation.set(0.42, 0, 0.18);
  scene.add(belt);

  const glowTex = glowTexture();
  const beltCore = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 }),
  );
  beltCore.scale.setScalar(7);
  beltCore.position.copy(RING_POS);
  scene.add(beltCore);

  /* ── La constellation (spark-mark traversé) ── */
  const sparkCount = highTier ? 7000 : 3800;
  const sparkPosArr = new Float32Array(sparkCount * 3);
  const sparkAlt = new Float32Array(sparkCount * 3);
  const LOGO_H = 14;
  const LOGO_ASPECT = 0.8036;
  if (spark && spark.length >= 6) {
    const m = spark.length / 2;
    for (let i = 0; i < sparkCount; i++) {
      const k = Math.floor(Math.random() * m) * 2;
      sparkPosArr[i * 3] = (spark[k] ?? 0) * LOGO_H * LOGO_ASPECT + (Math.random() - 0.5) * 0.1;
      sparkPosArr[i * 3 + 1] = (spark[k + 1] ?? 0) * LOGO_H + (Math.random() - 0.5) * 0.1;
      sparkPosArr[i * 3 + 2] = gauss() * 0.7;
      // état dispersé : nuage sphérique autour
      const r = 10 + Math.random() * 18;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      sparkAlt[i * 3] = Math.cos(a) * Math.cos(b) * r;
      sparkAlt[i * 3 + 1] = Math.sin(b) * r;
      sparkAlt[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
    }
  } else {
    for (let i = 0; i < sparkCount; i++) {
      const ring = Math.random() < 0.5 ? 4.5 : 7;
      const a = Math.random() * Math.PI * 2;
      sparkPosArr[i * 3] = Math.cos(a) * ring;
      sparkPosArr[i * 3 + 1] = Math.sin(a) * ring;
      sparkPosArr[i * 3 + 2] = gauss() * 0.6;
      sparkAlt.set(sparkPosArr.subarray(i * 3, i * 3 + 3), i * 3);
    }
  }
  const sparkMat = makeParticleMaterial(2.6 * dpr, 1);
  sparkMat.uniforms.uDrift!.value = 0.25;
  sparkMat.uniforms.uForm!.value = 0;
  const sparkPts = makePoints(sparkPosArr, sparkAlt, sparkMat);
  sparkPts.position.copy(SPARK_POS);
  sparkPts.rotation.y = -0.35;
  scene.add(sparkPts);

  /* ── Le noyau ── */
  const coreMat = new THREE.ShaderMaterial({
    vertexShader: CORE_VERT,
    fragmentShader: CORE_FRAG,
    uniforms: {
      uTime: { value: 0 },
      uAmp: { value: 0.38 },
      uColorA: { value: EMBER.clone() },
      uColorB: { value: EMBER_DEEP.clone().multiplyScalar(0.5) },
      uCamPos: { value: new THREE.Vector3() },
      uFlash: { value: 0 },
    },
  });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 48), coreMat);
  core.position.copy(CORE_POS);
  scene.add(core);
  const coreGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.95 }),
  );
  coreGlow.scale.setScalar(16);
  coreGlow.position.copy(CORE_POS);
  scene.add(coreGlow);

  /* ── Les embres du final ── */
  const emberCount = highTier ? 5000 : 2400;
  const emberPos = new Float32Array(emberCount * 3);
  for (let i = 0; i < emberCount; i++) {
    emberPos[i * 3] = CORE_POS.x + gauss() * 9;
    emberPos[i * 3 + 1] = CORE_POS.y - 12 + Math.random() * 6;
    emberPos[i * 3 + 2] = CORE_POS.z + 4 + Math.random() * 16;
  }
  const emberMat = makeParticleMaterial(2.6 * dpr, 0);
  emberMat.uniforms.uRise!.value = 1;
  emberMat.uniforms.uEnergy!.value = 1.2;
  // embres : palette chaude forcée
  const embers = makePoints(emberPos, emberPos.slice(), emberMat);
  {
    const colAttr = embers.geometry.getAttribute('aColor') as THREE.BufferAttribute;
    const tmp = new THREE.Color();
    for (let i = 0; i < emberCount; i++) {
      tmp.copy(Math.random() < 0.6 ? EMBER : Math.random() < 0.5 ? EMBER_DEEP : GOLD);
      colAttr.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    colAttr.needsUpdate = true;
  }
  scene.add(embers);

  /* ── Post-processing (tier desktop) ── */
  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;
  let compositePass: ShaderPass | null = null;
  if (highTier) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.75, 0.12);
    composer.addPass(bloom);
    compositePass = new ShaderPass(
      new THREE.ShaderMaterial({
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }',
        fragmentShader: COMPOSITE_FRAG,
        uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uCA: { value: 0.9 } },
      }),
    );
    composer.addPass(compositePass);
    composer.addPass(new OutputPass());
  }

  /* ── Pointeur : plan focal → coordonnées monde ── */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  const focalPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const pointerWorld = new THREE.Vector3(9999, 9999, 9999);
  const onPointer = (e: PointerEvent) => {
    ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
    ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  /* ── Boucle ── */
  let disposed = false;
  let raf = 0;
  let running = false;
  const clock = new THREE.Clock();
  let tCam = 0; // t amorti sur le rail
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const camAhead = new THREE.Vector3();
  let roll = 0;
  let frames = 0;
  let acc = 0;
  let probed = false;
  let readySent = false;

  const materials = [dustMat, beltMat, sparkMat, emberMat];

  const frame = () => {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, clock.getDelta());
    const time = clock.elapsedTime;

    const target = THREE.MathUtils.clamp(getScroll(), 0, 1);
    tCam += (target - tCam) * Math.min(1, dt * 4.2);
    const tt = THREE.MathUtils.clamp(tCam, 0, 1);

    /* caméra sur rail + regard spline + roulis de virage */
    path.getPoint(tt, camPos);
    lookPath.getPoint(tt, camLook);
    path.getPoint(Math.min(1, tt + 0.02), camAhead);
    const tangentX = camAhead.x - camPos.x;
    roll += (THREE.MathUtils.clamp(-tangentX * 0.06, -0.16, 0.16) - roll) * Math.min(1, dt * 2.5);
    // parallaxe pointeur
    camera.position.copy(camPos);
    camera.position.x += ndc.x < 5 ? ndc.x * 0.9 : 0;
    camera.position.y += ndc.y < 5 ? ndc.y * 0.5 : 0;
    camera.up.set(Math.sin(roll), Math.cos(roll), 0);
    camera.lookAt(camLook);

    /* pointeur monde sur plan focal */
    if (ndc.x < 5) {
      focalPlane.setFromNormalAndCoplanarPoint(
        camera.getWorldDirection(new THREE.Vector3()).negate(),
        camLook,
      );
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.ray.intersectPlane(focalPlane, pointerWorld);
      if (!hit) pointerWorld.set(9999, 9999, 9999);
    }

    /* chapitre courant (float) pour les panneaux */
    let chF = 0;
    for (let i = 0; i < chapters.length - 1; i++) {
      const a = chapters[i]!;
      const b = chapters[i + 1]!;
      if (tt >= a && tt <= b) {
        chF = i + (tt - a) / (b - a);
        break;
      }
      if (tt > b) chF = i + 1;
    }
    if (tt < chapters[0]!) chF = 0;
    onChapter?.(chF);

    /* uniformes vivants */
    const sparkForm = THREE.MathUtils.smoothstep(chF, 1.35, 2.05);
    sparkMat.uniforms.uForm!.value = sparkForm;
    const ignite = THREE.MathUtils.smoothstep(chF, 3.15, 3.85);
    emberMat.uniforms.uOpacity!.value = ignite;
    coreMat.uniforms.uFlash!.value = ignite * (0.35 + 0.2 * Math.sin(time * 2.2));
    coreMat.uniforms.uTime!.value = time;
    coreMat.uniforms.uAmp!.value = 0.32 + ignite * 0.3;
    (coreMat.uniforms.uCamPos!.value as THREE.Vector3).copy(camera.position);
    coreGlow.scale.setScalar(16 + ignite * 10 + Math.sin(time * 2.2) * 1.2);
    belt.rotation.z += dt * 0.05;
    sparkPts.rotation.y = -0.35 + Math.sin(time * 0.1) * 0.04;

    for (const m of materials) {
      m.uniforms.uTime!.value = time;
      (m.uniforms.uPointer!.value as THREE.Vector3).copy(pointerWorld);
    }

    if (composer && bloom && compositePass) {
      compositePass.uniforms.uTime!.value = time;
      bloom.strength = 0.75 + ignite * 0.55;
      composer.render();
    } else {
      renderer.render(scene, camera);
    }

    if (!readySent) {
      readySent = true;
      onReady?.();
    }

    /* sonde FPS : dégradation en escalier */
    if (!probed) {
      frames++;
      if (frames > 40) acc += dt;
      if (frames >= 160) {
        probed = true;
        const avg = acc / 120;
        if (avg > 0.034) {
          // trop lent : coupe bloom + réduit particules + DPR
          if (composer) {
            composer = null;
            bloom = null;
          }
          dust.geometry.setDrawRange(0, Math.floor(dustCount * 0.4));
          belt.geometry.setDrawRange(0, Math.floor(beltCount * 0.5));
          dpr = Math.min(dpr, 1.25);
          renderer.setPixelRatio(dpr);
          resize();
        } else if (avg > 0.024) {
          dust.geometry.setDrawRange(0, Math.floor(dustCount * 0.65));
        }
      }
    }
  };

  const start = () => {
    if (running || disposed || document.hidden) return;
    running = true;
    clock.getDelta();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const onVis = () => {
    if (document.hidden) stop();
    else start();
  };
  document.addEventListener('visibilitychange', onVis);

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    composer?.setSize(w, h);
    bloom?.setSize(w * 0.6, h * 0.6);
  };
  window.addEventListener('resize', resize);
  resize();
  start();

  return {
    chapters,
    dispose: () => {
      disposed = true;
      stop();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      [dust, belt, sparkPts, embers].forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
      core.geometry.dispose();
      coreMat.dispose();
      glowTex.dispose();
      composer?.dispose();
      renderer.dispose();
    },
  };
}
