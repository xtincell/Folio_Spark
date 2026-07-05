'use client';

import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { ContactForm } from './ContactForm';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang, pick, type Bi } from '@/lib/i18n';

const T = {
  eyebrow: { fr: 'Contact', en: 'Contact' },
  h1em: { fr: 'Démarrer', en: 'Start' },
  h1b: { fr: ' un projet.', en: ' a project.' },
  lede1: { fr: 'On commence toujours par un ', en: 'We always start with a ' },
  ledeB: { fr: 'appel cadrage de 45 minutes', en: '45-minute scoping call' },
  lede2: {
    fr: " — gratuit, sans engagement. À l'issue : on sait si l'ADVE/RTIS est le bon outil pour vous, ou si on vous oriente ailleurs.",
    en: ' — free, no strings attached. By the end, we know whether ADVE/RTIS is the right tool for you, or we point you elsewhere.',
  },
  waLabel: { fr: 'WhatsApp · le plus rapide', en: 'WhatsApp · fastest' },
  waNote: {
    fr: 'Réponse en moins de 24h ouvrées. Idéal pour un premier contact direct.',
    en: 'Reply within one business day. Ideal for a first direct contact.',
  },
  mailLabel: { fr: 'Email · brief détaillé', en: 'Email · detailed brief' },
  mailNote: {
    fr: 'Pour les briefs complexes, les RFP, et les missions marque blanche.',
    en: 'For complex briefs, RFPs, and white-label missions.',
  },
  liLabel: { fr: 'LinkedIn · suivi pro', en: 'LinkedIn · professional follow-up' },
  liNote: {
    fr: 'Pour rester en veille sur les notes de cabinet et les missions en cours.',
    en: 'To keep an eye on field notes and ongoing missions.',
  },
  hqLabel: { fr: 'Cabinet', en: 'Firm' },
  hqValue: { fr: 'Douala · Cameroun', en: 'Douala · Cameroon' },
  hqNote: {
    fr: "Visites sur rendez-vous. Missions terrain : Cameroun, Côte d'Ivoire, Sénégal, Gabon, et marques diasporiques.",
    en: 'Visits by appointment. Field missions: Cameroon, Côte d’Ivoire, Senegal, Gabon, and diaspora brands.',
  },
} satisfies Record<string, Bi>;

export function ContactClient() {
  const { lang } = useLang();
  const t = (v: Bi) => pick(v, lang);

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="contact" />

      <main id="contenu">
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>{t(T.eyebrow)}</div>
          <h1 className={styles.pageHeroTitle}>
            <em>{t(T.h1em)}</em>
            {t(T.h1b)}
          </h1>
          <p className={styles.pageHeroLede}>
            {t(T.lede1)}
            <b>{t(T.ledeB)}</b>
            {t(T.lede2)}
          </p>
        </div>
      </section>

      <section className={styles.sec} style={{ paddingTop: 0, borderTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <aside className={styles.contactInfo}>
              <div className={styles.contactInfoBlock}>
                <div className={styles.contactInfoLabel}>{t(T.waLabel)}</div>
                <a
                  className={styles.contactInfoValue}
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACT.whatsappDisplay}
                </a>
                <p className={styles.contactInfoNote}>{t(T.waNote)}</p>
              </div>

              <div className={styles.contactInfoBlock}>
                <div className={styles.contactInfoLabel}>{t(T.mailLabel)}</div>
                <a className={styles.contactInfoValue} href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
                <p className={styles.contactInfoNote}>{t(T.mailNote)}</p>
              </div>

              <div className={styles.contactInfoBlock}>
                <div className={styles.contactInfoLabel}>{t(T.liLabel)}</div>
                <a
                  className={styles.contactInfoValue}
                  href={CONTACT.linkedinLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACT.linkedinDisplay}
                </a>
                <p className={styles.contactInfoNote}>{t(T.liNote)}</p>
              </div>

              <div className={styles.contactInfoBlock} style={{ borderLeftColor: 'var(--blue)' }}>
                <div className={styles.contactInfoLabel}>{t(T.hqLabel)}</div>
                <span className={styles.contactInfoValue}>{t(T.hqValue)}</span>
                <p className={styles.contactInfoNote}>{t(T.hqNote)}</p>
              </div>
            </aside>

            <ContactForm />
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
