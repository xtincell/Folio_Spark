'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/upgraders.module.css';

type Line = { p: string; t: string; cls?: 'ok' | 'blu' | '' };

const LINES: Line[] = [
  { p: '›', t: 'lafusee.os :: boot', cls: 'blu' },
  { p: '›', t: 'load :: ADVE.socle ✓', cls: 'ok' },
  { p: '›', t: '  ↳ A · authenticite.module', cls: '' },
  { p: '›', t: '  ↳ D · distinction.module', cls: '' },
  { p: '›', t: '  ↳ V · valeur.module', cls: '' },
  { p: '›', t: '  ↳ E · engagement.module', cls: '' },
  { p: '›', t: 'load :: RTIS.propulseur ✓', cls: 'ok' },
  { p: '›', t: '  ↳ R · risk.swot', cls: '' },
  { p: '›', t: '  ↳ T · track.market', cls: '' },
  { p: '›', t: '  ↳ I · innovation.map', cls: '' },
  { p: '›', t: '  ↳ S · strategie.roadmap', cls: '' },
  { p: '›', t: 'mount :: pipeline.adve_rtis', cls: 'blu' },
  { p: '›', t: 'sync  :: roadmap.dynamic', cls: '' },
  { p: '›', t: 'log   :: cycle_time -68%', cls: 'ok' },
  { p: '›', t: 'log   :: brand_consistency 98.4%', cls: 'ok' },
  { p: '›', t: 'idle  :: passion = propulseur', cls: 'blu' },
];

export function Terminal() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= LINES.length) return;
    const delay = 240 + Math.random() * 220;
    const id = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(id);
  }, [count]);

  return (
    <div className={styles.lafTermBody}>
      {LINES.slice(0, count).map((ln, i) => (
        <div className={styles.lafLine} key={i}>
          <span className={styles.lafPrompt}>{ln.p}</span>
          <span className={ln.cls ? ln.cls : undefined}>{ln.t}</span>
        </div>
      ))}
      {count >= LINES.length ? (
        <div className={styles.lafLine}>
          <span className={styles.lafPrompt}>›</span>
          <span>
            <span className={styles.lafCursor} />
          </span>
        </div>
      ) : null}
    </div>
  );
}
