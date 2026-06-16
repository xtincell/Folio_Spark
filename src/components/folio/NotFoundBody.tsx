'use client';

import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { useT } from '@/lib/i18n';

export function NotFoundBody() {
  const t = useT();
  return (
    <div className={styles.folioRoot}>
      <main id="contenu" className={styles.notFound}>
        <div className={styles.notFoundInner}>
          <div className={styles.nfEyebrow}>{t.notFound.eyebrow}</div>
          <div className={styles.nfCode}>404</div>
          <h1 className={styles.nfTitle}>
            {t.notFound.h1a}<em>{t.notFound.h1em}</em>.
          </h1>
          <p className={styles.nfLede}>{t.notFound.lede}</p>
          <div className={styles.nfActions}>
            <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>{t.notFound.home}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </Link>
            <Link href="/work" className={`${styles.btn} ${styles.btnGhost}`}>
              <span>{t.notFound.folio}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
