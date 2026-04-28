import styles from '@/styles/home.module.css';

const ITEMS = [
  'Direction Artistique',
  'Brand Systems',
  'Storytelling',
  'Photographie',
  'AI Workflows',
  'Méthode ADVE/RTIS',
  'LaFusée OS',
];

export function Marquee() {
  return (
    <div className={styles.heroMarquee}>
      <div className={styles.marqueeTrack}>
        {[0, 1, 2].map((i) => (
          <div className={styles.marqueeGroup} key={i}>
            {ITEMS.map((item, j) => (
              <span key={`${i}-${j}`} style={{ display: 'contents' }}>
                <span>{item}</span>
                <span className="dotsep">◍</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
