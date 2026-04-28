import styles from '@/styles/home.module.css';
import type { Practice as PracticeType } from './data/practices';
import { ProjectCard } from './ProjectCard';

export function Practice({ practice }: { practice: PracticeType }) {
  const words = practice.title.split(' ');
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
        <div className={styles.practiceSub}>{practice.sub}</div>
        <p className={styles.practiceIntent}>{practice.intent}</p>
        <div className={styles.practiceCount}>
          <span className={styles.countV}>{String(practice.projects.length).padStart(2, '0')}</span>
          <span className={styles.countL}>projets référencés</span>
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
