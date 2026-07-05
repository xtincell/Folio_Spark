'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/caseStudy.module.css';
import { CASE_STUDIES, HAT_CODE, HAT_LABEL, type CaseHat } from '@/components/folio/data/cases';
import { useLang, pick } from '@/lib/i18n';

type HatFilter = 'all' | CaseHat;
type SortMode = 'edito' | 'recent';

/** Année de tri : le plus grand nombre à 4 chiffres de la chaîne (ex. « 2025–2026 » → 2026). */
function sortYear(year: string): number {
  const years = year.match(/\d{4}/g);
  return years ? Math.max(...years.map(Number)) : 0;
}

/**
 * Grille de vignettes hero cliquables → /work/[slug], filtrable par pratique
 * et triable par année. L'illustration hero est l'aperçu visible du folio.
 */
export function CaseStudyCTAGrid() {
  const { lang } = useLang();
  const [hat, setHat] = useState<HatFilter>('all');
  const [sort, setSort] = useState<SortMode>('edito');

  // Unlisted cases (e.g. personal sketchbook) are hidden from the portfolio grid.
  const all = useMemo(() => CASE_STUDIES.filter((c) => !c.hidden), []);

  const cases = useMemo(() => {
    const filtered = hat === 'all' ? all : all.filter((c) => c.hat === hat);
    if (sort === 'recent') {
      return [...filtered].sort((a, b) => sortYear(b.year) - sortYear(a.year));
    }
    return filtered;
  }, [all, hat, sort]);

  if (all.length === 0) return null;

  const hatFilters: { key: HatFilter; label: string; count: number }[] = [
    {
      key: 'all',
      label: pick({ fr: 'Toutes', en: 'All' }, lang),
      count: all.length,
    },
    ...(['strategy', 'art', 'execution'] as const).map((h) => ({
      key: h as HatFilter,
      label: pick(HAT_LABEL[h], lang),
      count: all.filter((c) => c.hat === h).length,
    })),
  ];

  return (
    <div>
      <div className={styles.gridControls}>
        <div
          className={styles.filterRow}
          role="group"
          aria-label={pick({ fr: 'Filtrer par pratique', en: 'Filter by practice' }, lang)}
        >
          {hatFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={styles.filterChip}
              aria-pressed={hat === f.key}
              onClick={() => setHat(f.key)}
            >
              {f.label}
              <span className={styles.filterCount}>{f.count}</span>
            </button>
          ))}
        </div>
        <div
          className={styles.filterRow}
          role="group"
          aria-label={pick({ fr: 'Ordre d’affichage', en: 'Display order' }, lang)}
        >
          <button
            type="button"
            className={styles.filterChip}
            aria-pressed={sort === 'edito'}
            onClick={() => setSort('edito')}
          >
            {pick({ fr: 'Ordre édito', en: 'Editorial order' }, lang)}
          </button>
          <button
            type="button"
            className={styles.filterChip}
            aria-pressed={sort === 'recent'}
            onClick={() => setSort('recent')}
          >
            {pick({ fr: 'Plus récentes', en: 'Most recent' }, lang)}
          </button>
        </div>
      </div>

      <p className={styles.gridStatus} role="status">
        {cases.length}{' '}
        {pick(
          cases.length > 1
            ? { fr: 'études de cas affichées', en: 'case studies shown' }
            : { fr: 'étude de cas affichée', en: 'case study shown' },
          lang,
        )}
      </p>

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
    </div>
  );
}
