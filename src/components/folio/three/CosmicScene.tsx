'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CosmicScene — « De la poussière à l'étoile », littéralement.
 *
 * Un unique champ de particules GPU vit derrière la landing et se métamorphose
 * au scroll : nébuleuse (cover) → anneau orbital (portrait) → voile (casquettes)
 * → tunnel hyperespace (preuves) → constellation spark-mark (méthode) → colonne
 * d'embres à l'allumage (CTA final).
 *
 * Discipline :
 *  - chunk lazy (next/dynamic) — la landing ne l'attend jamais ;
 *  - tiers de particules selon l'appareil + sonde FPS qui dégrade en direct
 *    (setDrawRange, gratuit) ;
 *  - prefers-reduced-motion / WebGL absent / contexte perdu → on ne monte pas,
 *    la landing garde ses starfields 2D existants ;
 *  - pause quand l'onglet est caché ; cleanup intégral au démontage.
 */

export type CosmicState = 'galaxy' | 'orbit' | 'veil' | 'tunnel' | 'spark' | 'plume';

export type CosmicPlanItem = { cls: string; state: CosmicState };

type Props = {
  plan: CosmicPlanItem[];
  onReady?: () => void;
};

/* Palette marque (approx sRGB des tokens oklch) */
const STAR_COLORS: [string, number][] = [
  ['#f5f1e6', 0.5], // ink cream
  ['#ffd9a8', 0.18], // warm halo
  ['#e8713a', 0.14], // accent ember
  ['#8f6cff', 0.1], // nebula violet
  ['#d9b36a', 0.08], // gold
];
const EMBER = new THREE.Color('#ff7a36');

/* Énergie (vitesse de scintillement), taille et emberisation par état */
const STATE_TUNING: Record<CosmicState, { energy: number; size: number; ember: number; roll: number }> = {
  galaxy: { energy: 0.35, size: 1.0, ember: 0.0, roll: 0.05 },
  orbit: { energy: 0.3, size: 0.95, ember: 0.0, roll: 0.1 },
  veil: { energy: 0.18, size: 0.85, ember: 0.0, roll: 0.02 },
  tunnel: { energy: 1.0, size: 1.2, ember: 0.15, roll: 0.22 },
  spark: { energy: 0.5, size: 1.25, ember: 0.32, roll: 0.0 },
  plume: { energy: 0.8, size: 1.15, ember: 0.85, roll: 0.02 },
};

const VERT = /* glsl */ `
attribute vec3 aA;
attribute vec3 aB;
attribute vec3 aColor;
attribute vec4 aRand;
uniform float uTime;
uniform float uMix;
uniform float uSize;
uniform float uEnergy;
varying vec3 vColor;
varying float vTw;
void main() {
  vec3 p = mix(aA, aB, uMix);
  float t = uTime * (0.12 + aRand.y * 0.25);
  p += (0.10 + 0.30 * aRand.w) * vec3(
    sin(t + aRand.x * 6.2832),
    cos(t * 0.83 + aRand.x * 4.1),
    sin(t * 0.67 + aRand.x * 2.3)
  );
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = max(4.0, -mv.z);
  vTw = 0.55 + 0.45 * sin(uTime * (0.8 + aRand.y * 2.2) * (1.0 + uEnergy * 1.8) + aRand.x * 6.2832);
  vColor = aColor;
  gl_PointSize = uSize * (0.35 + aRand.z * 1.4) * (30.0 / dist) * (1.0 + uEnergy * 0.35);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uEmber;
uniform float uEmberize;
varying vec3 vColor;
varying float vTw;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv) * 2.0;
  float core = smoothstep(1.0, 0.0, d);
  float a = core * core * (0.22 + 0.78 * vTw);
  if (a < 0.02) discard;
  vec3 c = mix(vColor, uEmber, uEmberize * 0.75);
  gl_FragColor = vec4(c * (0.7 + 0.6 * vTw), a);
}
`;

function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function rotX(arr: Float32Array, i: number, a: number) {
  const y = arr[i + 1] ?? 0;
  const z = arr[i + 2] ?? 0;
  arr[i + 1] = y * Math.cos(a) - z * Math.sin(a);
  arr[i + 2] = y * Math.sin(a) + z * Math.cos(a);
}
function rotZ(arr: Float32Array, i: number, a: number) {
  const x = arr[i] ?? 0;
  const y = arr[i + 1] ?? 0;
  arr[i] = x * Math.cos(a) - y * Math.sin(a);
  arr[i + 1] = x * Math.sin(a) + y * Math.cos(a);
}

/** Échantillonne le spark-mark SVG en points normalisés (x∈[-.5,.5], y∈[-.5,.5], y vers le haut). */
function loadSparkPoints(timeoutMs = 1800): Promise<Float32Array | null> {
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
          const W = 200;
          const H = 249; // aspect du viewBox 1658.76 × 2063.98
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

/** Construit les 6 nuages-cibles pour n particules, dans le repère caméra (z=26, fov 55). */
function buildStates(
  n: number,
  aspect: number,
  spark: Float32Array | null,
): Record<CosmicState, Float32Array> {
  const camZ = 26;
  const halfH = Math.tan((55 / 2) * (Math.PI / 180)) * camZ; // ~13.5 à z=0
  const halfW = halfH * aspect;
  const mk = () => new Float32Array(n * 3);

  /* galaxy — disque spiralé incliné + halo */
  const galaxy = mk();
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    if (Math.random() < 0.78) {
      const Rg = Math.max(halfW, halfH * 0.85) * 1.05;
      const r = Math.pow(Math.random(), 0.55) * Rg;
      const a = Math.random() * Math.PI * 2 + r * 0.18;
      galaxy[o] = Math.cos(a) * r;
      galaxy[o + 1] = Math.sin(a) * r * 0.72;
      galaxy[o + 2] = gauss() * 1.1;
    } else {
      /* halo plein cadre — garantit des étoiles jusque dans les coins, même en 9:19 */
      galaxy[o] = (Math.random() - 0.5) * halfW * 2.5;
      galaxy[o + 1] = (Math.random() - 0.5) * halfH * 2.5;
      galaxy[o + 2] = -7 + Math.random() * 6;
    }
    rotX(galaxy, o, -0.42);
    rotZ(galaxy, o, 0.18);
  }

  /* orbit — anneau type Saturne + coquille éparse */
  const orbit = mk();
  const R = Math.min(halfW, halfH) * 0.85;
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    if (Math.random() < 0.72) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const minor = R * (0.04 + Math.random() * 0.05);
      orbit[o] = (R + minor * Math.cos(v)) * Math.cos(u);
      orbit[o + 1] = (R + minor * Math.cos(v)) * Math.sin(u);
      orbit[o + 2] = minor * Math.sin(v) * 2.0;
    } else {
      const r = R * (1.15 + Math.random() * 1.1);
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      orbit[o] = Math.cos(a) * Math.cos(b) * r;
      orbit[o + 1] = Math.sin(b) * r;
      orbit[o + 2] = Math.sin(a) * Math.cos(b) * r * 0.5;
    }
    rotX(orbit, o, 1.12);
    rotZ(orbit, o, -0.22);
  }

  /* veil — nappe calme en retrait */
  const veil = mk();
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    veil[o] = (Math.random() - 0.5) * halfW * 2.6;
    veil[o + 1] = (Math.random() - 0.5) * halfH * 2.6;
    veil[o + 2] = -9 + Math.random() * 7;
  }

  /* tunnel — tube autour de l'axe caméra */
  const tunnel = mk();
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const r = 3.5 + Math.pow(Math.random(), 0.7) * Math.min(halfW, halfH) * 1.4;
    const a = Math.random() * Math.PI * 2;
    tunnel[o] = Math.cos(a) * r;
    tunnel[o + 1] = Math.sin(a) * r;
    tunnel[o + 2] = -32 + Math.random() * 54;
  }

  /* spark — le logo assemblé depuis la poussière (fallback : double anneau) */
  const sparkArr = mk();
  const zPlane = 7;
  const hH = Math.tan((55 / 2) * (Math.PI / 180)) * (camZ - zPlane);
  const hW = hH * aspect;
  const logoAspect = 0.8036;
  const logoH = Math.min(hH * 1.45, (hW * 1.7) / logoAspect);
  if (spark && spark.length >= 6) {
    const m = spark.length / 2;
    for (let i = 0; i < n; i++) {
      const o = i * 3;
      if (Math.random() < 0.76) {
        const k = Math.floor(Math.random() * m) * 2;
        sparkArr[o] = (spark[k] ?? 0) * logoH * logoAspect + (Math.random() - 0.5) * 0.12;
        sparkArr[o + 1] = (spark[k + 1] ?? 0) * logoH + 0.4 + (Math.random() - 0.5) * 0.12;
        sparkArr[o + 2] = zPlane + gauss() * 0.5;
      } else {
        const r = Math.min(halfW, halfH) * (1.5 + Math.random() * 0.9);
        const a = Math.random() * Math.PI * 2;
        sparkArr[o] = Math.cos(a) * r;
        sparkArr[o + 1] = Math.sin(a) * r * 0.8;
        sparkArr[o + 2] = -8 + Math.random() * 4;
      }
    }
  } else {
    for (let i = 0; i < n; i++) {
      const o = i * 3;
      const ring = Math.random() < 0.5 ? 0.55 : 0.95;
      const r = Math.min(halfW, halfH) * ring * (1 + gauss() * 0.03);
      const a = Math.random() * Math.PI * 2;
      sparkArr[o] = Math.cos(a) * r;
      sparkArr[o + 1] = Math.sin(a) * r;
      sparkArr[o + 2] = zPlane * 0.5;
      rotX(sparkArr, o, 0.3);
    }
  }

  /* plume — colonne d'allumage, dense en bas */
  const plume = mk();
  for (let i = 0; i < n; i++) {
    const o = i * 3;
    if (Math.random() < 0.85) {
      const y = -halfH * 1.45 + Math.pow(Math.random(), 0.62) * halfH * 2.9;
      const flare = 1 + Math.max(0, -(y - halfH * 0.2) / halfH) * 0.8;
      plume[o] = gauss() * halfW * 0.11 * flare;
      plume[o + 1] = y;
      plume[o + 2] = gauss() * 2.4;
    } else {
      plume[o] = (Math.random() - 0.5) * halfW * 2.4;
      plume[o + 1] = (Math.random() - 0.5) * halfH * 2.6;
      plume[o + 2] = -8 + Math.random() * 6;
    }
  }

  return { galaxy, orbit, veil, tunnel, spark: sparkArr, plume };
}

export function CosmicScene({ plan, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const planRef = useRef(plan);
  planRef.current = plan;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // pas de WebGL → les starfields 2D restent
    }

    /* — Tier de particules selon l'appareil — */
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mem = nav.deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency || 4;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const wide = window.innerWidth > 1024;
    let count = finePointer && wide ? 22000 : 10000;
    if (mem <= 2 || cores <= 3) count = 5500;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
    camera.position.set(0, 0, 26);
    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.BufferGeometry();
    const aA = new Float32Array(count * 3);
    const aB = new Float32Array(count * 3);
    const aColor = new Float32Array(count * 3);
    const aRand = new Float32Array(count * 4);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      let pick = Math.random();
      let hex = STAR_COLORS[0]?.[0] ?? '#ffffff';
      for (const entry of STAR_COLORS) {
        pick -= entry[1];
        if (pick <= 0) {
          hex = entry[0];
          break;
        }
      }
      tmp.set(hex);
      aColor[i * 3] = tmp.r;
      aColor[i * 3 + 1] = tmp.g;
      aColor[i * 3 + 2] = tmp.b;
      aRand[i * 4] = Math.random();
      aRand[i * 4 + 1] = Math.random();
      aRand[i * 4 + 2] = Math.random();
      aRand[i * 4 + 3] = Math.random();
    }
    geo.setAttribute('position', new THREE.BufferAttribute(aA, 3)); // requis pour le frustum
    geo.setAttribute('aA', new THREE.BufferAttribute(aA, 3));
    geo.setAttribute('aB', new THREE.BufferAttribute(aB, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(aRand, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 90); // pas de recalcul, jamais cullé

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: 0 },
        uSize: { value: 2.1 * dpr },
        uEnergy: { value: 0.35 },
        uEmber: { value: EMBER },
        uEmberize: { value: 0 },
      },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    group.add(points);

    /* — État & mesure — */
    let states: Record<CosmicState, Float32Array> | null = null;
    let order: CosmicState[] = [];
    let anchors: { top: number; state: CosmicState }[] = [];
    let curA = -1;
    let curB = -1;
    let disposed = false;
    let raf = 0;
    let running = false;
    let lastAspect = 0;

    const uploadPair = (ia: number, ib: number) => {
      if (!states) return;
      const sa = order[Math.min(ia, order.length - 1)];
      const sb = order[Math.min(ib, order.length - 1)];
      if (!sa || !sb) return;
      (geo.getAttribute('aA') as THREE.BufferAttribute).copyArray(states[sa]).needsUpdate = true;
      (geo.getAttribute('aB') as THREE.BufferAttribute).copyArray(states[sb]).needsUpdate = true;
      curA = ia;
      curB = ib;
    };

    const measure = () => {
      const items: { top: number; state: CosmicState }[] = [];
      for (const it of planRef.current) {
        const el = document.querySelector(`.${it.cls}`);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        items.push({ top: r.top + window.scrollY, state: it.state });
      }
      items.sort((x, y) => x.top - y.top);
      anchors = items;
      order = items.map((i) => i.state);
    };

    const rebuild = (spark: Float32Array | null) => {
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      lastAspect = aspect;
      states = buildStates(count, aspect, spark);
      measure();
      curA = -1;
      curB = -1;
    };

    /* — Scroll / pointeur / énergie — */
    let pointerX = 0;
    let pointerY = 0;
    let velBoost = 0;
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastScrollT);
      velBoost = Math.min(0.7, velBoost + (Math.abs(window.scrollY - lastScrollY) / dt) * 0.25);
      lastScrollY = window.scrollY;
      lastScrollT = now;
    };
    const onPointer = (e: PointerEvent) => {
      pointerX = e.clientX / window.innerWidth - 0.5;
      pointerY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });

    /* — Sonde FPS : dégrade le drawRange, jamais l'inverse — */
    let frames = 0;
    let acc = 0;
    let probed = false;

    const clock = new THREE.Clock();
    const smooth = { mix: 0, energy: 0.35, ember: 0, size: 1, roll: 0, rx: 0, ry: 0 };

    const frame = () => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, clock.getDelta());
      const t = clock.elapsedTime;

      /* position dans le plan de vol */
      let idxF = 0;
      if (anchors.length > 1) {
        const probe = window.scrollY + window.innerHeight * 0.5;
        for (let j = 1; j < anchors.length; j++) {
          const b = anchors[j]?.top ?? 0;
          const prev = anchors[j - 1]?.top ?? 0;
          const nextT = anchors[j + 1]?.top;
          /* fenêtre bornée par les demi-hauteurs voisines : les sections courtes
             gardent un vrai plateau où leur état est pur */
          let w = window.innerHeight * 0.42;
          w = Math.min(w, (b - prev) * 0.45);
          if (nextT !== undefined) w = Math.min(w, (nextT - b) * 0.45);
          w = Math.max(60, w);
          const x = Math.min(1, Math.max(0, (probe - (b - w)) / (2 * w)));
          idxF += x * x * (3 - 2 * x);
          if (probe < b - w) break;
        }
        idxF = Math.min(idxF, anchors.length - 1);
      }
      const ia = Math.min(Math.floor(idxF), order.length - 1);
      const ib = Math.min(ia + 1, order.length - 1);
      const frac = idxF - ia;
      if ((ia !== curA || ib !== curB) && states) {
        uploadPair(ia, ib);
        smooth.mix = frac; // pas d'interpolation à travers un swap de buffers
      }

      const sa = STATE_TUNING[order[ia] ?? 'galaxy'];
      const sb = STATE_TUNING[order[ib] ?? 'galaxy'];
      const lerp = (a: number, b: number) => a + (b - a) * frac;

      velBoost *= 0.94;
      smooth.mix += (frac - smooth.mix) * 0.12;
      smooth.energy += (lerp(sa.energy, sb.energy) + velBoost - smooth.energy) * 0.06;
      smooth.ember += (lerp(sa.ember, sb.ember) - smooth.ember) * 0.05;
      smooth.size += (lerp(sa.size, sb.size) - smooth.size) * 0.05;
      smooth.roll += (lerp(sa.roll, sb.roll) - smooth.roll) * 0.05;
      smooth.rx += (-pointerY * 0.09 - smooth.rx) * 0.05;
      smooth.ry += (pointerX * 0.12 - smooth.ry) * 0.05;

      mat.uniforms.uTime!.value = t;
      mat.uniforms.uMix!.value = smooth.mix;
      mat.uniforms.uEnergy!.value = smooth.energy;
      mat.uniforms.uEmberize!.value = smooth.ember;
      mat.uniforms.uSize!.value = 2.1 * dpr * smooth.size;
      group.rotation.x = smooth.rx;
      group.rotation.y = smooth.ry;
      group.rotation.z = Math.sin(t * 0.05) * smooth.roll;

      renderer.render(scene, camera);

      if (!probed) {
        frames++;
        if (frames > 30) acc += dt;
        if (frames >= 120) {
          probed = true;
          const avg = acc / 90;
          if (avg > 0.03) geo.setDrawRange(0, Math.floor(count * 0.35));
          else if (avg > 0.021) geo.setDrawRange(0, Math.floor(count * 0.6));
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
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      measure();
      const aspect = w / Math.max(1, h);
      if (lastAspect > 0 && Math.abs(aspect - lastAspect) / lastAspect > 0.18 && states) {
        rebuild(lastSpark);
      }
    };
    window.addEventListener('resize', resize);

    /* re-mesure tardive : fonts/images décalent la mise en page au chargement */
    const remeasures = [800, 2200, 4500].map((ms) => window.setTimeout(measure, ms));
    window.addEventListener('load', measure);

    /* — Init : échantillonner le logo puis allumer — */
    let lastSpark: Float32Array | null = null;
    let ready = false;
    loadSparkPoints().then((spark) => {
      if (disposed) return;
      lastSpark = spark;
      rebuild(spark);
      resize();
      uploadPair(0, Math.min(1, order.length - 1));
      start();
      if (!ready) {
        ready = true;
        canvas.style.opacity = '1';
        onReady?.();
      }
    });

    return () => {
      disposed = true;
      stop();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('load', measure);
      document.removeEventListener('visibilitychange', onVis);
      remeasures.forEach((id) => window.clearTimeout(id));
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 1.2s ease',
      }}
    />
  );
}

export default CosmicScene;
