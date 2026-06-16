'use client';

import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { useT, useLang, pick, type Bi } from '@/lib/i18n';

const HATS: { num: string; name: Bi; sub: Bi; href: string }[] = [
  {
    num: '01',
    name: { fr: 'Brand Architect', en: 'Brand Architect' },
    sub: { fr: 'Stratégie + systèmes de marque', en: 'Strategy + brand systems' },
    href: '/work#strategy',
  },
  {
    num: '02',
    name: { fr: 'Direction Artistique', en: 'Art Direction' },
    sub: {
      fr: 'Image, scenography, identité visuelle',
      en: 'Image, scenography, visual identity',
    },
    href: '/work#art',
  },
  {
    num: '03',
    name: { fr: 'Exécution', en: 'Execution' },
    sub: { fr: 'Photo, vidéo, livrables — hands on', en: 'Photo, video, deliverables — hands on' },
    href: '/work#execution',
  },
];

export function HatsIntro() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="casquettes" className={styles.hatsIntro}>
      <div>
        <span className={styles.hatsEyebrow}>{t.hats.eyebrow}</span>
        <h2 className={styles.hatsTitle}>
          {t.hats.title1}
          <em>{t.hats.titleEm}</em>
          {t.hats.title2}
        </h2>
        <p className={styles.hatsLede}>{t.hats.lede}</p>
        <Link href="/work" className={`${styles.btn} ${styles.btnGhost}`}>
          <span>{t.hats.cta}</span> <span>→</span>
        </Link>
      </div>
      <nav className={styles.hatsList} aria-label={t.hats.ariaList}>
        {HATS.map((h) => (
          <Link key={h.num} href={h.href} className={styles.hatRow}>
            <span className={styles.hatNum}>{h.num}</span>
            <h3 className={styles.hatName}>{pick(h.name, lang)}</h3>
            <span className={styles.hatArrow}>↗</span>
            <span className={styles.hatSub}>{pick(h.sub, lang)}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
