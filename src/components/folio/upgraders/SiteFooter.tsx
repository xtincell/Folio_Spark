import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { CONTACT } from '@/components/folio/data/contact';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerMark}>
              <b>UP</b>
              <em>graders</em>
            </div>
            <p className={styles.footerClaim}>La passion pour propulseur.</p>
            <nav className={styles.footerNav} aria-label="UPgraders">
              <Link href="/upgraders">Accueil</Link>
              <Link href="/upgraders/services">Services</Link>
              <Link href="/upgraders/blog">Blog</Link>
              <Link href="/upgraders/contact">Contact</Link>
            </nav>
          </div>
          <div className={styles.footerCtaBlock}>
            <span className={styles.footerCtaLabel}>Démarrer un projet</span>
            <a
              className={styles.footerCta}
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              <span>WhatsApp — {CONTACT.whatsappDisplay}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className={styles.footerCta}
              href={`mailto:${CONTACT.email}`}
              style={{ marginTop: '10px', opacity: 0.85 }}
            >
              <span>Email — {CONTACT.email}</span>
              <span aria-hidden="true">→</span>
            </a>
            <span className={styles.footerCtaLabel} style={{ marginTop: '12px' }}>
              Partager
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span className={styles.footerHashtag}>#ToTheNextLevel</span>
              <span className={styles.footerHashtag}>#UPyourBrand</span>
            </div>
          </div>
        </div>
        <div className={styles.footerBot}>
          <span>
            © 2026 UPgraders · IP <b>ADVE/RTIS</b>
          </span>
          <span>Cabinet de conseil &amp; stratégie · Douala</span>
        </div>
      </div>
    </footer>
  );
}
