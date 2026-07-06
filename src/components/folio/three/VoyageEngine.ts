/**
 * LE SIGNAL — moteur du voyage « du bruit à l'émission ».
 *
 * Parti pris : Alexandre est un ingénieur télécom devenu directeur
 * artistique — une marque n'a pas besoin de briller, elle a besoin
 * d'émettre. La caméra suit un rail spline à travers cinq chapitres :
 *  I   LE BRUIT      — champ de statique (jitter stroboscopique)
 *  II  LE SIGNAL     — trois rubans d'onde chevauchés (ondulation voyageuse)
 *  III LA CHAÎNE     — pylône émetteur, modulateur (anneaux), parabole
 *  IV  LE PROTOCOLE  — diagramme de constellation 16-QAM traversé (télécom)
 *  V   L'ÉMISSION    — antenne maîtresse, ondes concentriques, étincelles
 *
 * Infra : matériau particules commun (drift, statique, répulsion pointeur,
 * montée bouclée), EffectComposer (bloom + grain/vignette/CA) sur tier
 * desktop, iris d'exposition pendant la lecture des panneaux, sonde FPS
 * dégressive, dispose intégral.
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
  getScroll: () => number;
  onChapter?: (chapterFloat: number) => void;
  onReady?: () => void;
};

/* ── Palette marque ── */
const INK = new THREE.Color('#f5f1e6');
const EMBER = new THREE.Color('#ff7a36');
const EMBER_DEEP = new THREE.Color('#e8500a');
const VIOLET = new THREE.Color('#8f6cff');
const GOLD = new THREE.Color('#d9b36a');

const VERT = /* glsl */ `
attribute vec3 aColor;
attribute vec4 aRand;
uniform float uTime;
uniform float uSize;
uniform float uEnergy;
uniform float uDrift;
uniform float uStatic;   // ch1 : jitter stroboscopique type parasites
uniform float uWaveAmp;  // rubans : ondulation voyageuse
uniform float uRise;     // étincelles montantes
uniform vec3 uPointer;
uniform float uPointerR;
varying vec3 vColor;
varying float vTw;
void main() {
  vec3 p = position;
  float t = uTime * (0.06 + aRand.y * 0.09);
  p += uDrift * (0.4 + 0.6 * aRand.w) * vec3(
    sin(t * 1.7 + aRand.x * 6.2832),
    cos(t * 1.3 + aRand.x * 4.1),
    sin(t + aRand.x * 2.3)
  );
  if (uStatic > 0.001) {
    float fr = floor(uTime * 24.0);
    vec3 j = fract(sin(vec3(
      dot(aRand.xy, vec2(127.1, 311.7)) + fr,
      dot(aRand.yz, vec2(269.5, 183.3)) + fr * 1.7,
      dot(aRand.zw, vec2(419.2, 371.9)) + fr * 0.9
    )) * 43758.5453) - 0.5;
    p += j * uStatic * (0.6 + aRand.z * 1.2);
  }
  if (uWaveAmp > 0.001) {
    p.y += uWaveAmp * sin(p.z * 0.55 + p.x * 0.2 - uTime * 2.4) * (0.6 + aRand.w * 0.4);
  }
  if (uRise > 0.001) {
    p.y += mod(uTime * (1.0 + aRand.y * 2.0) * uRise + aRand.x * 30.0, 24.0) - 5.0;
  }
  vec3 toP = p - uPointer;
  float d = length(toP);
  if (d < uPointerR) {
    float f = 1.0 - d / uPointerR;
    p += normalize(toP + vec3(0.0001)) * f * f * 2.4;
  }
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = max(2.0, -mv.z);
  vTw = 0.55 + 0.45 * sin(uTime * (0.6 + aRand.y * 2.0) * (1.0 + uEnergy) + aRand.x * 6.2832);
  vColor = aColor;
  gl_PointSize = uSize * (0.3 + aRand.z * 1.5) * (34.0 / dist);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
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

const COMPOSITE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uCA;
uniform float uFocus;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main() {
  vec2 uv = vUv;
  vec2 c = uv - 0.5;
  float r2 = dot(c, c);
  vec2 off = c * r2 * uCA;
  vec3 col;
  col.r = texture2D(tDiffuse, uv + off).r;
  col.g = texture2D(tDiffuse, uv).g;
  col.b = texture2D(tDiffuse, uv - off).b;
  col *= 1.0 - r2 * 0.9;
  col *= mix(1.0, 0.74, uFocus); // iris pendant la lecture
  float g = hash(uv * vec2(1920.0, 1080.0) + fract(uTime) * 43.7) - 0.5;
  col += g * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type ColorPick = () => THREE.Color;
const defaultPick: ColorPick = () => {
  const r = Math.random();
  if (r < 0.55) return INK;
  if (r < 0.75) return GOLD;
  if (r < 0.92) return EMBER;
  return VIOLET;
};

function makeMat(size: number, opacity = 1): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size },
      uEnergy: { value: 0.4 },
      uDrift: { value: 0.4 },
      uStatic: { value: 0 },
      uWaveAmp: { value: 0 },
      uRise: { value: 0 },
      uOpacity: { value: opacity },
      uPointer: { value: new THREE.Vector3(9999, 9999, 9999) },
      uPointerR: { value: 5 },
    },
  });
}

function makePoints(positions: Float32Array, mat: THREE.ShaderMaterial, pick: ColorPick = defaultPick): THREE.Points {
  const n = positions.length / 3;
  const geo = new THREE.BufferGeometry();
  const colors = new Float32Array(n * 3);
  const rand = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const c = pick();
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    rand[i * 4] = Math.random();
    rand[i * 4 + 1] = Math.random();
    rand[i * 4 + 2] = Math.random();
    rand[i * 4 + 3] = Math.random();
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -45), 170);
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return pts;
}

/* ── Générateurs de structures (treillis de particules) ── */

/** Pylône : colonne carrée effilée — arêtes, entretoises, diagonales. */
function pylon(n: number, h: number, w0: number): Float32Array {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const r = Math.random();
    const y = Math.random() * h;
    const w = w0 * (1 - (y / h) * 0.7);
    if (r < 0.55) {
      const cx = Math.random() < 0.5 ? -w : w;
      const cz = Math.random() < 0.5 ? -w : w;
      a[o] = cx + gauss() * 0.02;
      a[o + 1] = y;
      a[o + 2] = cz + gauss() * 0.02;
    } else if (r < 0.85) {
      const lvl = Math.round(y / 1.1) * 1.1;
      const wl = w0 * (1 - (lvl / h) * 0.7);
      const st = Math.random() * 4;
      const t = Math.random() * 2 - 1;
      if (st < 1) { a[o] = t * wl; a[o + 2] = -wl; }
      else if (st < 2) { a[o] = t * wl; a[o + 2] = wl; }
      else if (st < 3) { a[o] = -wl; a[o + 2] = t * wl; }
      else { a[o] = wl; a[o + 2] = t * wl; }
      a[o + 1] = lvl;
    } else {
      a[o] = (Math.random() * 2 - 1) * w;
      a[o + 1] = y;
      a[o + 2] = (Math.random() * 2 - 1) * w;
    }
  }
  return a;
}

/** Modulateur : deux anneaux entrelacés à 90°. */
function modulator(n: number, R: number): Float32Array {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const t = Math.random() * Math.PI * 2;
    const j = () => gauss() * 0.06;
    if (i % 2 === 0) {
      a[o] = Math.cos(t) * R + j();
      a[o + 1] = Math.sin(t) * R + j();
      a[o + 2] = j();
    } else {
      a[o] = j();
      a[o + 1] = Math.sin(t) * R + j();
      a[o + 2] = Math.cos(t) * R + j();
    }
  }
  return a;
}

/** Parabole : calotte paraboloïde + mât de focale. */
function dish(n: number, R: number): Float32Array {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    if (Math.random() < 0.88) {
      const r = Math.sqrt(Math.random()) * R;
      const t = Math.random() * Math.PI * 2;
      a[o] = Math.cos(t) * r;
      a[o + 1] = Math.sin(t) * r;
      a[o + 2] = r * r * 0.16;
    } else {
      const s = Math.random();
      a[o] = gauss() * 0.03;
      a[o + 1] = gauss() * 0.03;
      a[o + 2] = s * R * 0.9;
    }
  }
  return a;
}

/** Diagramme de constellation 16-QAM : grille 4×4 d'amas serrés. */
function qam(n: number, spread: number): Float32Array {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const gx = (i % 4) - 1.5;
    const gy = (Math.floor(i / 4) % 4) - 1.5;
    a[o] = gx * spread + gauss() * 0.28;
    a[o + 1] = gy * spread + gauss() * 0.28;
    a[o + 2] = gauss() * 0.5;
  }
  return a;
}

/** Anneau d'onde (cercle horizontal, scalé par frame). */
function ring(n: number): Float32Array {
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    a[i * 3] = Math.cos(t) + gauss() * 0.015;
    a[i * 3 + 1] = gauss() * 0.02;
    a[i * 3 + 2] = Math.sin(t) + gauss() * 0.015;
  }
  return a;
}

export function createVoyage(opts: VoyageOpts): VoyageHandle | null {
  const { canvas, getScroll, onChapter, onReady } = opts;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  } catch {
    return null;
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const mem = nav.deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency || 4;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const wide = window.innerWidth > 1024;
  const highTier = fine && wide && mem >= 4 && cores >= 6;
  const dustCount = mem <= 2 || cores <= 3 ? 6000 : highTier ? 22000 : 10000;
  let dpr = Math.min(window.devicePixelRatio || 1, highTier ? 1.75 : 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x050404, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050404, 0.011);
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 260);

  /* ── Rail ── */
  const path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.5, 46),
      new THREE.Vector3(0, 1, 30),
      new THREE.Vector3(-2, 1, 16),
      new THREE.Vector3(-5, 0.5, 2),
      new THREE.Vector3(-8, 0, -10),
      new THREE.Vector3(-8, 0.5, -22),
      new THREE.Vector3(-4, 1, -34),
      new THREE.Vector3(2, 0.5, -46),
      new THREE.Vector3(6, 0, -56),
      new THREE.Vector3(4, 0, -66),
      new THREE.Vector3(0, 0.5, -73),
      new THREE.Vector3(0, 0.8, -76),
    ],
    false,
    'catmullrom',
    0.18,
  );
  const P = (t: number) => path.getPoint(t, new THREE.Vector3());
  const sideAt = (t: number) => {
    const tan = path.getTangent(t, new THREE.Vector3());
    return new THREE.Vector3().crossVectors(tan, new THREE.Vector3(0, 1, 0)).normalize();
  };

  /* Lieux depuis le rail — cadrage garanti */
  const T_WAVE: [number, number] = [0.2, 0.52];
  const T_PYLON = 0.56;
  const T_MOD = 0.63;
  const T_DISH = 0.7;
  const T_QAM = 0.82;
  const ANT_BASE = P(1)
    .add(path.getTangent(1, new THREE.Vector3()).multiplyScalar(16))
    .add(new THREE.Vector3(0, -6, 0));
  const ANT_TIP = ANT_BASE.clone().add(new THREE.Vector3(0, 11.5, 0));

  const chapters = [0.05, (T_WAVE[0] + T_WAVE[1]) / 2 - 0.02, T_MOD, T_QAM - 0.025, 0.965];

  const lookPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.5, 0),
      P(0.3),
      P((T_WAVE[0] + T_WAVE[1]) / 2 + 0.08),
      P(T_MOD).add(sideAt(T_MOD).multiplyScalar(-4)),
      P(T_QAM),
      ANT_TIP.clone().add(new THREE.Vector3(0, -2, 0)),
      ANT_TIP.clone().add(new THREE.Vector3(0, -3.5, 0)),
    ],
    false,
    'catmullrom',
    0.2,
  );

  /* ── Poussière / statique ── */
  const dustPos = new Float32Array(dustCount * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < dustCount; i++) {
    path.getPoint(Math.random(), v);
    const r = 4 + Math.pow(Math.random(), 0.6) * 40;
    const a = Math.random() * Math.PI * 2;
    dustPos[i * 3] = v.x + Math.cos(a) * r;
    dustPos[i * 3 + 1] = v.y + (Math.random() - 0.5) * r * 1.1;
    dustPos[i * 3 + 2] = v.z + Math.sin(a) * r * 0.9 - 3;
  }
  const dustMat = makeMat(2.0 * dpr, 0.85);
  dustMat.uniforms.uDrift!.value = 0.7;
  const dust = makePoints(dustPos, dustMat);
  scene.add(dust);

  /* ── Les rubans d'onde ── */
  const ribbonMat = makeMat(2.5 * dpr, 1);
  ribbonMat.uniforms.uDrift!.value = 0.12;
  ribbonMat.uniforms.uWaveAmp!.value = 0.9;
  ribbonMat.uniforms.uEnergy!.value = 0.6;
  const ribbonColors = [INK, EMBER, VIOLET];
  const ribbonN = highTier ? 4200 : 2400;
  const ribPos = new Float32Array(ribbonN * 3);
  {
    const per = Math.floor(ribbonN / 3);
    let idx = 0;
    for (let k = 0; k < 3; k++) {
      const phase = k * 2.094;
      for (let i = 0; i < per && idx < ribbonN; i++, idx++) {
        const t = T_WAVE[0] + (T_WAVE[1] - T_WAVE[0]) * (i / per);
        const base = P(t);
        const s = sideAt(t);
        const lat = Math.sin(i * 0.045 + phase) * 2.4 + (k - 1) * 1.1;
        const up = Math.cos(i * 0.03 + phase) * 1.5;
        ribPos[idx * 3] = base.x + s.x * lat + gauss() * 0.1;
        ribPos[idx * 3 + 1] = base.y + up + gauss() * 0.1;
        ribPos[idx * 3 + 2] = base.z + s.z * lat + gauss() * 0.1;
      }
    }
  }
  let ribIdx = 0;
  const ribbons = makePoints(ribPos, ribbonMat, () => {
    const c = ribbonColors[Math.floor(ribIdx++ / (ribbonN / 3)) % 3] ?? INK;
    return Math.random() < 0.85 ? c : GOLD;
  });
  scene.add(ribbons);

  /* ── La chaîne : pylône, modulateur, parabole ── */
  const chainMat = makeMat(2.3 * dpr, 1);
  chainMat.uniforms.uDrift!.value = 0.05;
  chainMat.uniforms.uEnergy!.value = 0.35;
  const chainPick: ColorPick = () => (Math.random() < 0.55 ? GOLD : Math.random() < 0.6 ? INK : EMBER);

  const pyl = makePoints(pylon(highTier ? 1600 : 900, 7.5, 1.1), chainMat, chainPick);
  const pPy = P(T_PYLON).add(sideAt(T_PYLON).multiplyScalar(4.6));
  pyl.position.set(pPy.x, pPy.y - 3.4, pPy.z);
  scene.add(pyl);

  const mod = makePoints(modulator(highTier ? 1400 : 800, 2.7), chainMat, chainPick);
  const pMo = P(T_MOD).add(sideAt(T_MOD).multiplyScalar(-4.4));
  mod.position.copy(pMo);
  scene.add(mod);

  const dsh = makePoints(dish(highTier ? 1400 : 800, 3), chainMat, chainPick);
  const pDi = P(T_DISH).add(sideAt(T_DISH).multiplyScalar(4.8));
  dsh.position.copy(pDi);
  dsh.lookAt(P(Math.max(0, T_DISH - 0.08)));
  scene.add(dsh);

  /* ── Le protocole : 16-QAM traversé ── */
  const qamMat = makeMat(3.0 * dpr, 1);
  qamMat.uniforms.uDrift!.value = 0.1;
  qamMat.uniforms.uEnergy!.value = 0.6;
  const qm = makePoints(qam(highTier ? 2600 : 1400, 2.9), qamMat, () =>
    Math.random() < 0.5 ? EMBER : Math.random() < 0.5 ? INK : GOLD,
  );
  const pQam = P(T_QAM);
  qm.position.copy(pQam);
  qm.lookAt(pQam.clone().sub(path.getTangent(T_QAM, new THREE.Vector3())));
  scene.add(qm);

  /* ── L'émission : antenne maîtresse + ondes + étincelles ── */
  const antMat = makeMat(2.4 * dpr, 1);
  antMat.uniforms.uDrift!.value = 0.05;
  const ant = makePoints(pylon(highTier ? 2200 : 1200, 11.5, 1.4), antMat, chainPick);
  ant.position.copy(ANT_BASE);
  scene.add(ant);

  const RINGS = 4;
  const ringObjs: { pts: THREE.Points; mat: THREE.ShaderMaterial; phase: number }[] = [];
  for (let i = 0; i < RINGS; i++) {
    const m = makeMat(2.6 * dpr, 0);
    m.uniforms.uDrift!.value = 0;
    const r = makePoints(ring(highTier ? 700 : 400), m, () => (Math.random() < 0.7 ? EMBER : INK));
    r.position.copy(ANT_TIP);
    scene.add(r);
    ringObjs.push({ pts: r, mat: m, phase: i / RINGS });
  }

  const sparkMat = makeMat(2.4 * dpr, 0);
  sparkMat.uniforms.uRise!.value = 1;
  sparkMat.uniforms.uEnergy!.value = 1.1;
  const sparkN = highTier ? 3000 : 1500;
  const sparkPos = new Float32Array(sparkN * 3);
  for (let i = 0; i < sparkN; i++) {
    sparkPos[i * 3] = ANT_BASE.x + gauss() * 7;
    sparkPos[i * 3 + 1] = ANT_BASE.y - 6 + Math.random() * 5;
    sparkPos[i * 3 + 2] = ANT_BASE.z + gauss() * 7;
  }
  const sparks = makePoints(sparkPos, sparkMat, () =>
    Math.random() < 0.6 ? EMBER : Math.random() < 0.5 ? EMBER_DEEP : GOLD,
  );
  scene.add(sparks);

  /* halo du sommet d'antenne */
  const glowCv = document.createElement('canvas');
  glowCv.width = 128;
  glowCv.height = 128;
  {
    const x = glowCv.getContext('2d')!;
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,190,130,0.9)');
    g.addColorStop(0.4, 'rgba(255,130,60,0.3)');
    g.addColorStop(1, 'rgba(255,120,50,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 128, 128);
  }
  const glowTex = new THREE.CanvasTexture(glowCv);
  const tipGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
    }),
  );
  tipGlow.scale.setScalar(6);
  tipGlow.position.copy(ANT_TIP);
  scene.add(tipGlow);

  /* ── Post-processing ── */
  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;
  let compositePass: ShaderPass | null = null;
  if (highTier) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.8, 0.75, 0.12);
    composer.addPass(bloom);
    compositePass = new ShaderPass(
      new THREE.ShaderMaterial({
        vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }',
        fragmentShader: COMPOSITE_FRAG,
        uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uCA: { value: 0.06 }, uFocus: { value: 0 } },
      }),
    );
    composer.addPass(compositePass);
    composer.addPass(new OutputPass());
  }

  /* ── Pointeur monde ── */
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
  let tCam = 0;
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const camAhead = new THREE.Vector3();
  let roll = 0;
  let smoothFocus = 0;
  let frames = 0;
  let acc = 0;
  let probed = false;
  let readySent = false;

  const allMats = [dustMat, ribbonMat, chainMat, qamMat, antMat, sparkMat, ...ringObjs.map((r) => r.mat)];

  const frame = () => {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, clock.getDelta());
    const time = clock.elapsedTime;

    const target = THREE.MathUtils.clamp(getScroll(), 0, 1);
    tCam += (target - tCam) * Math.min(1, dt * 4.2);
    const tt = THREE.MathUtils.clamp(tCam, 0, 1);

    path.getPoint(tt, camPos);
    lookPath.getPoint(tt, camLook);
    path.getPoint(Math.min(1, tt + 0.02), camAhead);
    roll += (THREE.MathUtils.clamp(-(camAhead.x - camPos.x) * 0.06, -0.14, 0.14) - roll) * Math.min(1, dt * 2.5);
    camera.position.copy(camPos);
    if (ndc.x < 5) {
      camera.position.x += ndc.x * 0.9;
      camera.position.y += ndc.y * 0.5;
    }
    camera.up.set(Math.sin(roll), Math.cos(roll), 0);
    camera.lookAt(camLook);

    if (ndc.x < 5) {
      focalPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()).negate(), camLook);
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(focalPlane, pointerWorld)) pointerWorld.set(9999, 9999, 9999);
    }

    /* chapitre courant + iris */
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
    const distC = Math.abs(chF - Math.round(chF));
    const focusT = 1 - THREE.MathUtils.smoothstep(distC, 0.14, 0.38);
    smoothFocus += (focusT - smoothFocus) * Math.min(1, dt * 3);

    /* vie du monde */
    const staticAmt = 1 - THREE.MathUtils.smoothstep(chF, 0.25, 0.85);
    dustMat.uniforms.uStatic!.value = staticAmt * 0.8;
    dustMat.uniforms.uEnergy!.value = 0.35 + staticAmt * 0.8;
    mod.rotation.y += dt * 0.5;
    mod.rotation.x += dt * 0.23;
    qm.rotation.z += dt * 0.06;
    const emission = THREE.MathUtils.smoothstep(chF, 3.2, 3.9);
    sparkMat.uniforms.uOpacity!.value = emission;
    tipGlow.material.opacity = 0.25 + emission * 0.7 * (1 - smoothFocus * 0.4) + Math.sin(time * 2.4) * 0.06;
    for (const r of ringObjs) {
      const ph = (time * 0.24 + r.phase) % 1;
      const s = 0.6 + ph * 17;
      r.pts.scale.set(s, 1, s);
      r.mat.uniforms.uOpacity!.value = emission * (1 - ph) * 0.9;
    }

    for (const m of allMats) {
      m.uniforms.uTime!.value = time;
      (m.uniforms.uPointer!.value as THREE.Vector3).copy(pointerWorld);
    }

    if (composer && bloom && compositePass) {
      compositePass.uniforms.uTime!.value = time;
      compositePass.uniforms.uFocus!.value = smoothFocus;
      bloom.strength = (0.7 + emission * 0.5) * (1 - smoothFocus * 0.5);
      composer.render();
    } else {
      renderer.render(scene, camera);
    }

    if (!readySent) {
      readySent = true;
      onReady?.();
    }

    if (!probed) {
      frames++;
      if (frames > 40) acc += dt;
      if (frames >= 160) {
        probed = true;
        const avg = acc / 120;
        if (avg > 0.034) {
          composer = null;
          bloom = null;
          dust.geometry.setDrawRange(0, Math.floor(dustCount * 0.4));
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
      [dust, ribbons, pyl, mod, dsh, qm, ant, sparks, ...ringObjs.map((r) => r.pts)].forEach((p) => {
        p.geometry.dispose();
        (p.material as THREE.Material).dispose();
      });
      glowTex.dispose();
      composer?.dispose();
      renderer.dispose();
    },
  };
}
