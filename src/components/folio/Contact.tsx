import styles from '@/styles/home.module.css';
import { StarField } from './StarField';
import { SocialRow } from './SocialRow';
import { FlameMark } from './FlameMark';
import { CONTACT } from './data/contact';

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.contactBg}>
        <StarField density={60} />
      </div>
      <div className={styles.contactInner}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionNum}>05</span>
          <span className={styles.sectionLabel}>Disponibilité</span>
        </div>

        <h2 className={styles.contactTitle}>
          Direction&nbsp;:<br /><em>Abidjan</em>.
        </h2>
        <p className={styles.contactLede}>
          Je quitte le Cameroun pour porter cette vision systémique à la
          capitale créative de l&apos;Afrique francophone. Prêt pour les ADICOM,
          prêt pour les briefs qui font peur.
        </p>

        <div className={styles.contactGrid}>
          <a
            className={`${styles.contactCard} ${styles.contactMain}`}
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.ccLabel}>WhatsApp — {CONTACT.whatsappLabel} (réponse rapide)</div>
            <div className={styles.ccValue}>{CONTACT.whatsappDisplay}</div>
            <div className={styles.ccArrow}>→</div>
          </a>
          <a
            className={styles.contactCard}
            href={CONTACT.whatsappSecondaryLink}
            target="_blank"
            rel="noreferrer"
          >
            <div className={styles.ccLabel}>WhatsApp — {CONTACT.whatsappSecondaryLabel}</div>
            <div className={styles.ccValue}>{CONTACT.whatsappSecondaryDisplay}</div>
            <div className={styles.ccArrow}>→</div>
          </a>
          <a className={styles.contactCard} href={`mailto:${CONTACT.email}`}>
            <div className={styles.ccLabel}>Email</div>
            <div className={styles.ccValue}>{CONTACT.email}</div>
          </a>
          <a className={styles.contactCard} href={CONTACT.linkedinLink} target="_blank" rel="noreferrer">
            <div className={styles.ccLabel}>LinkedIn</div>
            <div className={styles.ccValue}>{CONTACT.linkedinDisplay}</div>
          </a>
          <div className={styles.contactCard}>
            <div className={styles.ccLabel}>Status</div>
            <div className={styles.ccValue}>
              <span className={styles.liveDot} /> Open to opportunities
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
