'use client';

import { useEffect, useRef } from 'react';

/* ============================================================================
   HeroAtmosphere — animated "ember constellation" backdrop (canvas).
   ----------------------------------------------------------------------------
   « De la poussière à l'étoile » rendered literally: warm amber dust + embers
   drift through the dark, linked by faint constellation lines, with a gentle
   pointer parallax and the occasional shooting star.

   Built to the same robustness contract as StarField:
     • DPR-aware (capped at 2);
     • prefers-reduced-motion → one crisp static frame, no RAF;
     • paused when scrolled out of view (IntersectionObserver) or tab hidden;
     • particle count scales with the canvas area, hard-capped for perf.
   Glow is drawn from a pre-rendered radial sprite (no per-frame gradients).
   Pure code, no external assets.
   ========================================================================== */

type P = {
  x: number;
  y: number;
  r: number;
  z: number; // depth 0..1 → parallax strength + size
  a: number; // base alpha
  tw: number; // twinkle phase
  tws: number; // twinkle speed
  vx: number;
  vy: number;
  ember: boolean; // amber glow vs pale dust
};

type Shot = { x: number; y: number; vx: number; vy: number; life: number; len: number };

export function HeroAtmosphere({
  density = 1,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let parts: P[] = [];
    let shots: Shot[] = [];
    let raf = 0;
    let running = false;
    let onScreen = false;

    // Smoothed pointer parallax (target → current lerp).
    let tpx = 0;
    let tpy = 0;
    let px = 0;
    let py = 0;

    const LINK = 132; // max distance for a constellation link
    const LINK2 = LINK * LINK;

    /* Pre-rendered glow sprite — drawn (scaled) per particle instead of
       building a radial gradient every frame. */
    const makeSprite = (inner: string, outer: string) => {
      const s = 64;
      const off = document.createElement('canvas');
      off.width = s;
      off.height = s;
      const o = off.getContext('2d');
      if (o) {
        const g = o.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, inner);
        g.addColorStop(0.4, outer);
        g.addColorStop(1, 'rgba(255,170,80,0)');
        o.fillStyle = g;
        o.fillRect(0, 0, s, s);
      }
      return off;
    };
    const emberSprite = makeSprite('rgba(255,210,150,1)', 'rgba(255,140,46,0.55)');
    const dustSprite = makeSprite('rgba(255,246,235,1)', 'rgba(245,235,220,0.4)');

    const build = () => {
      const count = Math.min(
        150,
        Math.round(((w * h) / 12000) * density),
      );
      parts = Array.from({ length: count }, () => {
        const z = Math.random();
        const ember = Math.random() < 0.42;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: (ember ? 1.1 : 0.5) + z * (ember ? 2.2 : 1.3),
          a: (ember ? 0.5 : 0.35) + z * 0.4,
          tw: Math.random() * Math.PI * 2,
          tws: 0.0006 + Math.random() * 0.0016,
          vx: (Math.random() - 0.5) * 0.05,
          vy: -(0.02 + Math.random() * 0.06), // embers drift gently upward
          ember,
        };
      });
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (prefersReduced) draw(0, true);
    };

    const draw = (t: number, still = false) => {
      ctx.clearRect(0, 0, w, h);

      // Constellation links — faint amber, fade with distance. O(n²) but n is
      // capped low enough to stay cheap.
      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        if (!a) continue;
        const ax = a.x + px * (a.z * 26);
        const ay = a.y + py * (a.z * 26);
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          if (!b) continue;
          const bx = b.x + px * (b.z * 26);
          const by = b.y + py * (b.z * 26);
          const dx = ax - bx;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const o = (1 - d2 / LINK2) * 0.16;
            ctx.strokeStyle = `rgba(255,150,60,${o.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of parts) {
        if (!still) {
          p.x += p.vx;
          p.y += p.vy;
          p.tw += p.tws * 16;
          if (p.y < -4) p.y = h + 4;
          if (p.x < -4) p.x = w + 4;
          else if (p.x > w + 4) p.x = -4;
        }
        const twinkle = still ? 1 : 0.6 + 0.4 * Math.sin(p.tw + t * 0.0009);
        const alpha = Math.max(0, Math.min(1, p.a * twinkle));
        const dx = px * (p.z * 26);
        const dy = py * (p.z * 26);
        const size = p.r * 7; // sprite footprint
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          p.ember ? emberSprite : dustSprite,
          p.x + dx - size / 2,
          p.y + dy - size / 2,
          size,
          size,
        );
      }
      ctx.globalAlpha = 1;

      // Shooting stars (rare, only while animating)
      if (!still) {
        for (let i = shots.length - 1; i >= 0; i--) {
          const s = shots[i];
          if (!s) continue;
          s.x += s.vx;
          s.y += s.vy;
          s.life -= 0.012;
          if (s.life <= 0 || s.x > w + 60 || s.y > h + 60) {
            shots.splice(i, 1);
            continue;
          }
          const tailX = s.x - s.vx * s.len;
          const tailY = s.y - s.vy * s.len;
          const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          g.addColorStop(0, `rgba(255,225,190,${(s.life * 0.9).toFixed(3)})`);
          g.addColorStop(1, 'rgba(255,150,60,0)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
        if (shots.length < 1 && Math.random() < 0.004) {
          const fromLeft = Math.random() < 0.5;
          shots.push({
            x: fromLeft ? -40 : Math.random() * w * 0.6,
            y: Math.random() * h * 0.4,
            vx: 3 + Math.random() * 2.5,
            vy: 1.4 + Math.random() * 1.2,
            life: 1,
            len: 12 + Math.random() * 10,
          });
        }
      }
    };

    const loop = (t: number) => {
      px += (tpx - px) * 0.05;
      py += (tpy - py) * 0.05;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || prefersReduced || document.hidden || !onScreen) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      tpx = (e.clientX / window.innerWidth - 0.5) * 2;
      tpy = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? false;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', resize);
    if (!prefersReduced) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [density]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
