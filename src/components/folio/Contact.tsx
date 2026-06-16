'use client';

import styles from '@/styles/home.module.css';
import { StarField } from './StarField';
import { SocialRow } from './SocialRow';
import { FlameMark } from './FlameMark';
import { CONTACT } from './data/contact';
import { useT } from '@/lib/i18n';

export function Contact() {
  const t = useT();
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactBg}>
        <StarField density={60} />
      </div>
      <div className={styles.contactInner}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>05</span>
          <span className={styles.sectionLabel}>{t.contact.label}</span>
        </div>

        <h2 className={styles.contactTitle}>
          {t.contact.title1}<br /><em>{t.contact.titleEm}</em>.
        </h2>
        <p className={styles.contactLede}>{t.contact.lede}</p>

        <div className={styles.contactGrid}>
          <a
            className={`${styles.contactCard} ${styles.contactMain}`}
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.ccLabel}>{t.contact.whatsapp}</div>
            <div className={styles.ccValue}>{CONTACT.whatsappDisplay}</div>
            <div className={styles.ccArrow}>→</div>
          </a>
          <a className={styles.contactCard} href={`mailto:${CONTACT.email}`}>
            <div className={styles.ccLabel}>{t.contact.email}</div>
            <div className={styles.ccValue}>{CONTACT.email}</div>
          </a>
          <a className={styles.contactCard} href={CONTACT.linkedinLink} target="_blank" rel="noreferrer">
            <div className={styles.ccLabel}>{t.contact.linkedin}</div>
            <div className={styles.ccValue}>{CONTACT.linkedinDisplay}</div>
          </a>
          <div className={styles.contactCard}>
            <div className={styles.ccLabel}>{t.contact.status}</div>
            <div className={styles.ccValue}>
              <span className={styles.liveDot} /> {t.contact.statusValue}
            </div>
          </div>
        </div>

        <SocialRow />

        <div className={styles.contactFoot}>
          <FlameMark size={32} />
          <div>
            <div className={styles.footName}>{CONTACT.footerName}</div>
            <div className={styles.footMeta}>{CONTACT.footerMeta}</div>
          </div>
          <div className={styles.footMetaR}>{CONTACT.footerTagline}</div>
        </div>
      </div>
    </section>
  );
}
