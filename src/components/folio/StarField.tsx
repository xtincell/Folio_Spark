'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/home.module.css';

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  v: number;
  phase: number;
  drift: number;
};

export function StarField({ density = 80 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const count = Math.round((w * h) / (28000 / (density / 80)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        v: Math.random() * 0.0006 + 0.0002,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.04,
      }));
    };

    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.phase += s.v * 16;
        s.x += s.drift;
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;
        const alpha = s.a * (0.55 + 0.45 * Math.sin(s.phase + t * 0.0008));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.95 0.012 70 / ${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={styles.starfield} aria-hidden="true" />;
}
