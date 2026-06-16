'use client';

import styles from '@/styles/home.module.css';
import { PRACTICES } from './data/practices';
import { Practice } from './Practice';
import { useT } from '@/lib/i18n';

export function Practices() {
  const t = useT();
  return (
    <section id="travaux" className={styles.cases}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>03</span>
        <span className={styles.sectionLabel}>{t.practices.label}</span>
      </div>
      <h2 className={styles.casesTitle}>
        {t.practices.title1}
        <em>{t.practices.titleEm}</em>.
      </h2>
      <p className={styles.casesLede}>{t.practices.lede}</p>

      <div className={styles.casesLegend}>
        <div className={styles.casesLegendTitle}>{t.practices.legendTitle}</div>
        <div className={styles.casesLegendRow}>
          {t.practices.legendChain}{' '}
          <b>{t.practices.legendChainBold}</b> :
          <span className={`${styles.chainNode} ${styles.chainNodeClient}`} style={{ margin: '0 4px' }}>{t.practices.chainClient}</span>
          <span className={styles.chainArrow}>←</span>
          <span className={styles.chainNode} style={{ margin: '0 4px' }}>{t.practices.chainRelay}</span>
          <span className={styles.chainArrow}>←</span>
          <span className={`${styles.chainNode} ${styles.chainNodeSelf}`} style={{ margin: '0 4px' }}>{t.practices.chainSelf}</span>
        </div>
        <div
          className={styles.casesLegendRow}
          dangerouslySetInnerHTML={{ __html: t.practices.legendBody }}
        />
      </div>

      <div className={styles.practiceList}>
        {PRACTICES.map((p) => <Practice practice={p} key={p.code} />)}
      </div>
    </section>
  );
}
