'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

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
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  const visibleCount = (tick % (LINES.length + 4)) || 1;
  const visible = LINES.slice(0, visibleCount);

  return (
    <section id="systeme" className={styles.system}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>04</span>
        <span className={styles.sectionLabel}>LaFusée · OS UPgraders</span>
      </div>

      <div className={styles.systemGrid}>
        <div className={styles.systemCopy}>
          <h2>L&apos;IA n&apos;est pas l&apos;artiste.<br /><em>Elle est le studio.</em></h2>
          <p>
            <b>LaFusée</b> — l&apos;OS interne d&apos;UPgraders pour la gestion de l&apos;industrie créative.
            Il automatise la méthode <b>ADVE/RTIS</b> : extraction d&apos;ADN, audit de risque,
            cartographie d&apos;innovations, roadmap dynamique. Ce qui prenait deux semaines
            tient en deux jours — sans concession sur la direction.
          </p>
          <ul className={styles.systemList}>
            <li><span>01</span>Pipelines calibrés par marque, pas génériques.</li>
            <li><span>02</span>Socle ADVE versionné, propulseur RTIS ré-exécutable.</li>
            <li><span>03</span>Console unique : brief → arbitrage → livrable.</li>
            <li><span>04</span>L&apos;humain garde la décision. La passion reste le propulseur.</li>
          </ul>
          <Link href="/upgraders" className={styles.systemCta}>
            <span>Voir UPgraders en détail</span>
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
