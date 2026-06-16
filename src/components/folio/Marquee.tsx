'use client';

import styles from '@/styles/home.module.css';
import { useLang, pick, type Bi } from '@/lib/i18n';

const ITEMS: (string | Bi)[] = [
  { fr: 'Direction Artistique', en: 'Art Direction' },
  'Brand Systems',
  'Storytelling',
  { fr: 'Photographie', en: 'Photography' },
  'AI Workflows',
  { fr: 'Méthode ADVE/RTIS', en: 'ADVE/RTIS Method' },
  'LaFusée OS',
];

export function Marquee() {
  const { lang } = useLang();
  return (
    <div className={styles.heroMarquee}>
      <div className={styles.marqueeTrack}>
        {[0, 1, 2].map((i) => (
          <div className={styles.marqueeGroup} key={i}>
            {ITEMS.map((item, j) => (
              <span key={`${i}-${j}`} style={{ display: 'contents' }}>
                <span>{pick(item, lang)}</span>
                <span className="dotsep">◍</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
