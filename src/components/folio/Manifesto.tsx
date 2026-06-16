'use client';

import styles from '@/styles/home.module.css';
import { MANIFESTO_PILLARS } from './data/pillars';
import { useT, useLang, pick } from '@/lib/i18n';

export function Manifesto() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="manifeste" className={styles.manifesto}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>01</span>
        <span className={styles.sectionLabel}>{t.manifesto.label}</span>
      </div>

      <div className={styles.manifestoGrid}>
        <h2 className={styles.manifestoTitle}>
          {t.manifesto.title1}
          <em>{t.manifesto.titleEm}</em>
          {t.manifesto.title2}
        </h2>

        <div className={styles.manifestoBody}>
          <p className="lede" dangerouslySetInnerHTML={{ __html: t.manifesto.p1 }} />
          <p dangerouslySetInnerHTML={{ __html: t.manifesto.p2 }} />
          <p className="signature">{t.manifesto.signature}</p>
        </div>
      </div>

      <div className={styles.pillars}>
        {MANIFESTO_PILLARS.map((p) => (
          <article key={p.k} className={styles.pillar}>
            <div className={styles.pillarKey}>{p.k}</div>
            <h3>{pick(p.t, lang)}</h3>
            <p>{pick(p.d, lang)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
