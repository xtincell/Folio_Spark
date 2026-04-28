import styles from '@/styles/home.module.css';
import { PRACTICES } from './data/practices';
import { Practice } from './Practice';

export function Practices() {
  return (
    <section id="travaux" className={styles.cases}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>03</span>
        <span className={styles.sectionLabel}>Travaux — trois pratiques</span>
      </div>
      <h2 className={styles.casesTitle}>
        Stratégie. Direction. <em>Exécution</em>.
      </h2>
      <p className={styles.casesLede}>
        Profil T-shaped : je couvre la chaîne complète, du positionnement
        jusqu&apos;au pixel livré. Voici comment 19 ans de pratique se répartissent.
      </p>

      <div className={styles.casesLegend}>
        <div className={styles.casesLegendTitle}>Lecture des fiches — chaîne de collaboration</div>
        <div className={styles.casesLegendRow}>
          Chaque fiche montre la <b>chaîne de filiation</b> :
          <span className={`${styles.chainNode} ${styles.chainNodeClient}`} style={{ margin: '0 4px' }}>Client final</span>
          <span className={styles.chainArrow}>←</span>
          <span className={styles.chainNode} style={{ margin: '0 4px' }}>Agence relais</span>
          <span className={styles.chainArrow}>←</span>
          <span className={`${styles.chainNode} ${styles.chainNodeSelf}`} style={{ margin: '0 4px' }}>Cellule d&apos;exécution</span>
        </div>
        <div className={styles.casesLegendRow}>
          <b>Upgraders</b> — mon agence-laboratoire (voir bloc dédié). <b>MATANGA Agency</b> — agence marketing où je suis Directeur Créatif depuis 2025. <b>Friends Studio</b> — cellule de production en binôme avec Stéphane Nounamo. <b>Imperial</b> — agence de talents (artistes), dirigée par Esther Naah, qui me missionnait pour UMA. <b>Her Media</b>, <b>OmenKart</b>, <b>Bimstr</b> — agences relais (souvent en marque blanche). On distingue donc : <i>agences-clients</i>, <i>agences de talents</i>, <i>cellules de production</i>, <i>agences-employeur</i>.
        </div>
      </div>

      <div className={styles.practiceList}>
        {PRACTICES.map((p) => <Practice practice={p} key={p.code} />)}
      </div>
    </section>
  );
}
