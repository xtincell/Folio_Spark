'use client';

import styles from '@/styles/home.module.css';
import { useT } from '@/lib/i18n';

export function Stats() {
  const t = useT();
  return (
    <section className={styles.stats}>
      {t.stats.map((s) => (
        <div className={styles.stat} key={s.l}>
          <div className={styles.statV}>{s.v}</div>
          <div className={styles.statL}>{s.l}</div>
        </div>
      ))}
    </section>
  );
}
