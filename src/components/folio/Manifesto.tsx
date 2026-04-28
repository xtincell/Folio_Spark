import styles from '@/styles/home.module.css';
import { MANIFESTO_PILLARS } from './data/pillars';

export function Manifesto() {
  return (
    <section id="manifeste" className={styles.manifesto}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>01</span>
        <span className={styles.sectionLabel}>Manifeste</span>
      </div>

      <div className={styles.manifestoGrid}>
        <h2 className={styles.manifestoTitle}>
          Le profil <em>T-shaped</em><br />
          — l&apos;ingénieur derrière l&apos;image.
        </h2>

        <div className={styles.manifestoBody}>
          <p className="lede">
            Mon passé en <strong>Télécommunications &amp; Réseaux</strong> n&apos;est pas un
            accident. C&apos;est l&apos;avantage. Là où d&apos;autres voient des couleurs,
            je vois des flux. Là où ils voient du design, je vois un
            <em> système d&apos;exploitation de marque</em>.
          </p>
          <p>
            Je conçois des identités qui se déploient comme des
            infrastructures&nbsp;: chaque pixel a une fonction, chaque
            campagne s&apos;inscrit dans un protocole. Le résultat n&apos;est pas
            une image — c&apos;est un mouvement.
          </p>
          <p className="signature">— Xtincell</p>
        </div>
      </div>

      <div className={styles.pillars}>
        {MANIFESTO_PILLARS.map((p) => (
          <article key={p.k} className={styles.pillar}>
            <div className={styles.pillarKey}>{p.k}</div>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
