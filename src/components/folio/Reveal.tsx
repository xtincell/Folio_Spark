'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger offset in ms applied to the transition. */
  delay?: number;
};

/**
 * Scroll-reveal wrapper: fades + lifts its children in when first scrolled into view.
 * Robustness:
 *  - the hidden state ([data-reveal="out"]) lives under @media (scripting: enabled)
 *    in globals.css, so no-JS users always see content — never a permanent FOUC;
 *  - reduced-motion or a missing IntersectionObserver short-circuits to shown=true;
 *  - one-shot (disconnects after first reveal).
 */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window) ||
      // Degenerate viewport (some headless/offscreen contexts report 0): a
      // viewport-rooted observer could never intersect, so show rather than hide.
      window.innerHeight === 0
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element: any = Tag;
  return (
    <Element
      ref={ref}
      className={className}
      data-reveal={shown ? 'in' : 'out'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Element>
  );
}
