'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import styles from '@/styles/home.module.css';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function Reveal({ children, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const cls = [className, shown ? styles.revealIn : styles.revealInit].filter(Boolean).join(' ');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element: any = Tag;
  return (
    <Element ref={ref} className={cls}>
      {children}
    </Element>
  );
}
