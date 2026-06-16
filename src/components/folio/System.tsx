'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { useT } from '@/lib/i18n';

const LINES = [
  'init :: lafusee.boot',
  'load :: ADVE.socle (Authenticité · Distinction · Valeur · Engagement)',
  'load :: RTIS.propulseur (Risk · Track · Innovation · Stratégie)',
  'mount :: pipeline.adve_rtis',
  'spawn :: agent.visual_dir',
  'spawn :: agent.copy_voice',
  'sync  :: roadmap.dynamic',
  'render :: livrable_001 ✓',
  'log   :: cycle_time -68%',
  'log   :: brand_consistency 98.4%',
  'idle  :: passion = propulseur',
];

export function System() {
  const t = useT();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((tk) => tk + 1), 1600);
    return () => clearInterval(id);
  }, []);

  const visibleCount = (tick % (LINES.length + 4)) || 1;
  const visible = LINES.slice(0, visibleCount);

  return (
    <section id="systeme" className={styles.system}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>04</span>
        <span className={styles.sectionLabel}>{t.system.label}</span>
      </div>

      <div className={styles.systemGrid}>
        <div className={styles.systemCopy}>
          <h2>{t.system.title1}<br /><em>{t.system.titleEm}</em></h2>
          <p dangerouslySetInnerHTML={{ __html: t.system.body }} />
          <ul className={styles.systemList}>
            {t.system.list.map((item, i) => (
              <li key={i}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>
            ))}
          </ul>
          <Link href="/upgraders" className={styles.systemCta}>
            <span>{t.system.cta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.terminal}>
          <div className={styles.terminalBar}>
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className={styles.terminalTitle}>lafusee.os — session.live</span>
          </div>
          <div className={styles.terminalBody}>
            {visible.map((l, i) => (
              <div className={styles.termLine} key={`${l}-${i}`}>
                <span className={styles.termPrompt}>›</span>
                <span>{l}</span>
              </div>
            ))}
            <div className={`${styles.termLine} ${styles.termCursor}`}>
              <span className={styles.termPrompt}>›</span>
              <span className="cursor">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
