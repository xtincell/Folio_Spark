import type { Metadata } from 'next';
import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { ContactForm } from './ContactForm';
import { CONTACT } from '@/components/folio/data/contact';

export const metadata: Metadata = {
  title: 'Contact — UPgraders · Démarrer un projet · WhatsApp & email',
  description:
    "Contacter UPgraders : appel cadrage 45 min, WhatsApp ou email. Brief structuré recommandé.",
};

export default function ContactPage() {
  return (
    <div className={styles.folioRoot}>
      <SiteNav active="contact" />

      <main id="contenu">
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>Contact</div>
          <h1 className={styles.pageHeroTitle}>
            <em>Démarrer</em> un projet.
          </h1>
          <p className={styles.pageHeroLede}>
            On commence toujours par un <b>appel cadrage de 45 minutes</b> — gratuit, sans
            engagement. À l&apos;issue : on sait si l&apos;ADVE/RTIS est le bon outil pour vous, ou
            si on vous oriente ailleurs.
          </p>
        </div>
      </section>

      <section className={styles.sec} style={{ paddingTop: 0, borderTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <aside className={styles.contactInfo}>
              <div className={styles.contactInfoBlock}>
                <div className={styles.contactInfoLabel}>WhatsApp · le plus rapide</div>
                <a
                  className={styles.contactInfoValue}
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACT.whatsappDisplay}
                </a>
                <p className={styles.contactInfoNote}>
                  Réponse en moins de 24h ouvrées. Idéal pour un premier contact direct.
                </p>
              </div>

              <div className={styles.contactInfoBlock}>
                <div className={styles.contactInfoLabel}>Email · brief détaillé</div>
                <a className={styles.contactInfoValue} href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
                <p className={styles.contactInfoNote}>
                  Pour les briefs complexes, les RFP, et les missions marque blanche.
                </p>
              </div>

              <div className={styles.contactInfoBlock}>
                <div className={styles.contactInfoLabel}>LinkedIn · suivi pro</div>
                <a
                  className={styles.contactInfoValue}
                  href={CONTACT.linkedinLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONTACT.linkedinDisplay}
                </a>
                <p className={styles.contactInfoNote}>
                  Pour rester en veille sur les notes de cabinet et les missions en cours.
                </p>
              </div>

              <div className={styles.contactInfoBlock} style={{ borderLeftColor: 'var(--blue)' }}>
                <div className={styles.contactInfoLabel}>Cabinet</div>
                <span className={styles.contactInfoValue}>Douala · Cameroun</span>
                <p className={styles.contactInfoNote}>
                  Visites sur rendez-vous. Missions terrain : Cameroun, Côte d&apos;Ivoire,
                  Sénégal, Gabon, et marques diasporiques.
                </p>
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
