import Link from 'next/link';
import styles from '@/styles/home.module.css';

const HATS = [
  { num: '01', name: 'Brand Architect', sub: 'Stratégie + systèmes de marque', href: '/work#strategy' },
  { num: '02', name: 'Direction Artistique', sub: 'Image, scenography, identité visuelle', href: '/work#art' },
  { num: '03', name: 'Exécution', sub: 'Photo, vidéo, livrables — hands on', href: '/work#execution' },
];

export function HatsIntro() {
  return (
    <section id="casquettes" className={styles.hatsIntro}>
      <div>
        <span className={styles.hatsEyebrow}>§ 02 — Trois casquettes, un système</span>
        <h2 className={styles.hatsTitle}>Je porte trois <em>casquettes</em> selon le brief.</h2>
        <p className={styles.hatsLede}>
          Chacune est un métier complet, pas un add-on. Mais elles partagent
          la même matière première : un point de vue de système sur la marque.
        </p>
        <Link href="/work" className={`${styles.btn} ${styles.btnGhost}`}>
          <span>Folio complet</span> <span>→</span>
        </Link>
      </div>
      <nav className={styles.hatsList} aria-label="Trois pratiques">
        {HATS.map((h) => (
          <Link key={h.num} href={h.href} className={styles.hatRow}>
            <span className={styles.hatNum}>{h.num}</span>
            <h3 className={styles.hatName}>{h.name}</h3>
            <span className={styles.hatArrow}>↗</span>
            <span className={styles.hatSub}>{h.sub}</span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
