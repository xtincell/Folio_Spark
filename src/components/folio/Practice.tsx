'use client';

import styles from '@/styles/home.module.css';
import type { Practice as PracticeType } from './data/practices';
import { ProjectCard } from './ProjectCard';
import { useT, useLang, pick } from '@/lib/i18n';

export function Practice({ practice }: { practice: PracticeType }) {
  const t = useT();
  const { lang } = useLang();
  const title = pick(practice.title, lang);
  const words = title.split(' ');
  const lastIdx = words.length - 1;
  return (
    <section className={styles.practice}>
      <header className={styles.practiceHead}>
        <div className={styles.practiceNum} style={{ color: practice.color }}>{practice.code}</div>
        <h3 className={styles.practiceTitle}>
          {words.map((w, i) => (
            <span key={`${w}-${i}`}>
              {i === lastIdx ? <em style={{ color: practice.color }}>{w}</em> : w}
              {i < lastIdx ? ' ' : ''}
            </span>
          ))}
        </h3>
        <div className={styles.practiceSub}>{pick(practice.sub, lang)}</div>
        <p className={styles.practiceIntent}>{pick(practice.intent, lang)}</p>
        <div className={styles.practiceCount}>
          <span className={styles.countV}>{String(practice.projects.length).padStart(2, '0')}</span>
          <span className={styles.countL}>{t.practices.projectsCounted}</span>
        </div>
      </header>

      <div className={styles.practiceGrid}>
        {practice.projects.map((p) => (
          <ProjectCard p={p} accent={practice.color} key={p.name} />
        ))}
      </div>
    </section>
  );
}
