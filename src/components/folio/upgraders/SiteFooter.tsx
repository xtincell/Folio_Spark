'use client';

import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang, pick, type Bi } from '@/lib/i18n';

const T: Record<string, Bi> = {
  claim: { fr: 'La passion pour propulseur.', en: 'Passion as the propellant.' },
  home: { fr: 'Accueil', en: 'Home' },
  services: { fr: 'Services', en: 'Services' },
  blog: { fr: 'Blog', en: 'Blog' },
  contact: { fr: 'Contact', en: 'Contact' },
  start: { fr: 'Démarrer un projet', en: 'Start a project' },
  share: { fr: 'Partager', en: 'Share' },
  bot: {
    fr: 'Cabinet de conseil & stratégie · Douala',
    en: 'Consulting & strategy firm · Douala',
  },
};

export function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerMark}>
              <b>UP</b>
              <em>graders</em>
            </div>
            <p className={styles.footerClaim}>{pick(T.claim!, lang)}</p>
            <nav className={styles.footerNav} aria-label="UPgraders">
              <Link href="/upgraders">{pick(T.home!, lang)}</Link>
              <Link href="/upgraders/services">{pick(T.services!, lang)}</Link>
              <Link href="/upgraders/blog">{pick(T.blog!, lang)}</Link>
              <Link href="/upgraders/contact">{pick(T.contact!, lang)}</Link>
            </nav>
          </div>
          <div className={styles.footerCtaBlock}>
            <span className={styles.footerCtaLabel}>{pick(T.start!, lang)}</span>
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
              {pick(T.share!, lang)}
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
          <span>{pick(T.bot!, lang)}</span>
        </div>
      </div>
    </footer>
  );
}
