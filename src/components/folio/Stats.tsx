import styles from '@/styles/home.module.css';

const STATS = [
  { v: '13', l: 'Projets référencés' },
  { v: '3', l: 'Pratiques · Stratégie · DA · Exécution' },
  { v: '12+', l: 'Marques & artistes accompagnés' },
  { v: '17+', l: 'Années dans la création' },
];

export function Stats() {
  return (
    <section className={styles.stats}>
      {STATS.map((s) => (
        <div className={styles.stat} key={s.l}>
          <div className={styles.statV}>{s.v}</div>
          <div className={styles.statL}>{s.l}</div>
        </div>
      ))}
    </section>
  );
}
