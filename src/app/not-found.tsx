import Link from 'next/link';
import styles from '@/styles/home.module.css';

export const metadata = {
  title: '404 — page introuvable · Xtincell',
};

export default function NotFound() {
  return (
    <div className={styles.folioRoot}>
      <main id="contenu" className={styles.notFound}>
        <div className={styles.notFoundInner}>
          <div className={styles.nfEyebrow}>Erreur 404 · page introuvable</div>
          <div className={styles.nfCode}>404</div>
          <h1 className={styles.nfTitle}>
            Cette page <em>n&apos;existe pas</em>.
          </h1>
          <p className={styles.nfLede}>
            Le lien a peut-être changé, ou la page a été déplacée. Revenons à
            l&apos;essentiel.
          </p>
          <div className={styles.nfActions}>
            <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>Retour à l&apos;accueil</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </Link>
            <Link href="/work" className={`${styles.btn} ${styles.btnGhost}`}>
              <span>Voir le folio</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
