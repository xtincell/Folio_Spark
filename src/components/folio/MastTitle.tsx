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
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canAnimate = () => finePointer.matches && !reducedMotion.matches && !document.hidden;

    const section = el.closest('section') as HTMLElement | null;
    const zone = section ?? document.body;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let lastFrame = 0;

    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = lastFrame = tx = ty = cx = cy = 0;
      el.style.transform = '';
      el.style.willChange = '';
      section?.style.removeProperty('--pgx');
      section?.style.removeProperty('--pgy');
    };
    const tick = (time: number) => {
      if (!canAnimate()) { reset(); return; }
      const elapsed = lastFrame ? Math.min(time - lastFrame, 48) : 1000 / 60;
      lastFrame = time;
      const blend = 1 - Math.pow(0.91, elapsed / (1000 / 60));
      cx += (tx - cx) * blend;
      cy += (ty - cy) * blend;
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
        raf = lastFrame = 0;
        el.style.willChange = '';
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!canAnimate() || e.pointerType === 'touch') return;
      el.style.willChange = 'transform';
      const r = zone.getBoundingClientRect();
      tx = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
      ty = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const recenter = () => {
      if (!canAnimate()) { reset(); return; }
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPreferenceChange = () => { if (!canAnimate()) reset(); };
    finePointer.addEventListener('change', onPreferenceChange);
    reducedMotion.addEventListener('change', onPreferenceChange);
    document.addEventListener('visibilitychange', onPreferenceChange);
    zone.addEventListener('pointermove', onMove, { passive: true });
    zone.addEventListener('pointerleave', recenter, { passive: true });
    return () => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', recenter);
      finePointer.removeEventListener('change', onPreferenceChange);
      reducedMotion.removeEventListener('change', onPreferenceChange);
      document.removeEventListener('visibilitychange', onPreferenceChange);
      reset();
    };
  }, []);

  return (
    <div ref={ref} className={styles.mastTitle} role="img" aria-label="Xtincell">
      {LETTERS.map((c, i) => (
        <span key={i} aria-hidden="true" style={{ '--ci': i } as CSSProperties}>
          {c}
        </span>
      ))}
    </div>
  );
}
