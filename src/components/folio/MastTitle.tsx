'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import styles from '@/styles/home.module.css';

const LETTERS = 'XTINCELL'.split('');

/**
 * The XTINCELL wordmark, cursor-reactive.
 * Tilts the whole plane toward the pointer (perspective + rotateX/Y) and drives
 * a counter-moving glow via --pgx/--pgy on the hero section for parallax depth.
 * Disabled for coarse pointers (touch) and prefers-reduced-motion.
 * Per-letter entrance animation lives on the spans, so the container transform
 * never fights it.
 */
export function MastTitle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const section = el.closest('section') as HTMLElement | null;
    const zone = section ?? document.body;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      const rx = (-cy * 6).toFixed(2);
      const ry = (cx * 9).toFixed(2);
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${(cx * 12).toFixed(1)}px, ${(cy * 9).toFixed(1)}px, 0)`;
      if (section) {
        section.style.setProperty('--pgx', `${(cx * -36).toFixed(1)}px`);
        section.style.setProperty('--pgy', `${(cy * -28).toFixed(1)}px`);
      }
      if (Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const recenter = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    zone.addEventListener('pointermove', onMove, { passive: true });
    zone.addEventListener('pointerleave', recenter, { passive: true });
    return () => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', recenter);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, []);

  return (
    <div ref={ref} className={styles.mastTitle} style={{ willChange: 'transform' }}>
      {LETTERS.map((c, i) => (
        <span key={i} style={{ '--ci': i } as CSSProperties}>
          {c}
        </span>
      ))}
    </div>
  );
}
