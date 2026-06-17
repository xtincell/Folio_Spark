'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/caseStudy.module.css';
import { CASE_STUDIES, HAT_CODE } from '@/components/folio/data/cases';
import { useLang, pick } from '@/lib/i18n';

/**
 * Grille de vignettes hero cliquables → /work/[slug].
 * L'illustration hero (provisoire) est l'aperçu visible dans le portfolio.
 */
export function CaseStudyCTAGrid() {
  const { lang } = useLang();
  // Unlisted cases (e.g. personal sketchbook) are hidden from the portfolio grid.
  const cases = CASE_STUDIES.filter((c) => !c.hidden);
  if (cases.length === 0) return null;

  return (
    <div className={styles.ctaGrid}>
      {cases.map((c, i) => (
        <Link key={c.slug} href={`/work/${c.slug}`} className={styles.ctaCard}>
          <div className={styles.ctaThumb}>
            <Image
              src={c.hero}
              alt={pick(c.name, lang)}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={60}
              loading={i < 6 ? 'eager' : 'lazy'}
              className={styles.ctaImg}
            />
            <span className={styles.ctaCode}>{HAT_CODE[c.hat]}</span>
          </div>
          <div className={styles.ctaMeta}>
            <h3 className={styles.ctaName}>{pick(c.name, lang)}</h3>
            <p className={styles.ctaClient}>
              {pick(c.client, lang)} · {c.year}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
