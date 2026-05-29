'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Site-wide page-enter motion. Keyed by pathname so the wrapper remounts on every
 * client navigation, replaying the CSS `.page-enter` animation. Pure opacity/transform,
 * gated to prefers-reduced-motion: no-preference in globals.css — cannot block routing.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
