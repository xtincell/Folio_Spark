import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { CONTACT } from '@/components/folio/data/contact';

export const metadata: Metadata = {
  title: 'Services — UPgraders · Audit ADVE, accompagnement long, marque blanche',
  description:
    "Trois portes d'entrée chez UPgraders : audit ADVE, accompagnement RTIS long terme, marque blanche pour agences relais. Tarifs indicatifs et processus.",
};

type Service = {
  num: string;
  title: string;
  titleEm?: string;
  tag: string;
  desc: string;
  bullets: string[];
  price: string;
  priceLabel: string;
  featured?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

const SERVICES: Service[] = [
  {
    num: '01',
    title: 'Audit',
    titleEm: 'ADVE',
    tag: 'Porte d\'entrée standard · 2 à 4 semaines',
    desc:
      "Trois ateliers pour extraire l'ADN de votre marque selon les quatre lentilles ADVE. Livrable : une fiche identitaire qui sert de boussole pour 18 mois minimum.",
    bullets: [
      '3 ateliers dirigés (4h chacun)',
      'Cartographie Authenticité / Distinction / Valeur / Engagement',
      'Fiche ADVE + recommandations prioritaires',
      'Restitution équipe complète + dirigeants',
    ],
    price: 'Sur devis',
    priceLabel: 'Pack atelier',
    ctaHref: CONTACT.whatsappLink,
    ctaLabel: 'Démarrer un audit',
  },
  {
    num: '02',
    title: 'Accompagnement',
    titleEm: 'RTIS',
    tag: 'Mandat long · 6 à 24 mois',
    desc:
      "Le cycle complet : ADVE en entrée, propulseur RTIS en exécution. Roadmap dynamique, cellule sur mesure depuis La Guilde, restitutions trimestrielles. C'est la formule des marques cultes.",
    bullets: [
      'Audit ADVE + SWOT Risk + Track marché',
      'Cartographie Innovation hiérarchisée',
      'Roadmap dynamique réajustée chaque trimestre',
      'Cellule créative dédiée (photo, motion, design, dev)',
      'Reporting LaFusée — KPIs cohérence et cycle',
    ],
    price: 'Mandat 6 à 24 mois',
    priceLabel: 'Engagement long',
    featured: true,
    ctaHref: CONTACT.whatsappLink,
    ctaLabel: 'Discuter du mandat',
  },
  {
    num: '03',
    title: 'Marque',
    titleEm: 'blanche',
    tag: 'Pour agences & studios partenaires · ponctuel ou récurrent',
    desc:
      "Vous portez la relation client, nous portons la méthode. UPgraders intervient en sous-traitance stratégique pour renforcer vos livrables sans empiéter sur votre marque.",
    bullets: [
      'Audit ADVE rebrandé à votre logo',
      'Production de roadmaps RTIS sur vos comptes',
      'Cellule Guilde activable à la mission',
      'NDA et clauses d\'exclusivité standards',
    ],
    price: 'Tarification partenaire',
    priceLabel: 'B2B agences',
    ctaHref: `mailto:${CONTACT.email}?subject=Marque%20blanche%20UPgraders`,
    ctaLabel: 'Demander la doc partenaire',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Brief',
    desc: 'Appel cadrage 45 min · WhatsApp ou visio. Diagnostic rapide pour orienter vers la porte d\'entrée juste.',
  },
  {
    num: '02',
    title: 'Ateliers',
    desc: '2 à 3 ateliers ADVE selon le format. On rentre dans le tissu — équipe, fondateurs, parfois clients finaux.',
  },
  {
    num: '03',
    title: 'Roadmap',
    desc: 'Livrable structuré : fiche ADVE, SWOT Risk, cartographie Innovation, hiérarchisation Stratégie.',
  },
  {
    num: '04',
    title: 'Exécution',
    desc: 'La Guilde se met en cellule. LaFusée orchestre. La marque entre en mouvement — et apprend à chaque cycle.',
  },
];

const FAQ = [
  {
    q: 'Vous êtes basés où ?',
    a: 'Cabinet à Douala, Cameroun. Missions principales sur Cameroun, Côte d\'Ivoire, Sénégal, Gabon. Nous travaillons aussi avec des marques diasporiques et européennes ayant un terrain africain.',
  },
  {
    q: 'Pourquoi pas de tarifs publics ?',
    a: 'Parce qu\'un audit ADVE pour une marque seule de 5 personnes n\'a rien à voir avec un mandat RTIS pour un groupe coté. Nous proposons toujours un devis structuré après l\'appel cadrage gratuit.',
  },
  {
    q: 'Combien de temps pour voir des résultats ?',
    a: 'Le livrable ADVE arrive en 2 à 4 semaines. Les premiers résultats marché sur la formule RTIS apparaissent à 90-120 jours — c\'est le temps minimum pour qu\'une marque sortie de refonte se réinstalle.',
  },
  {
    q: 'Vous gardez les droits sur la méthode ADVE/RTIS ?',
    a: 'Oui, ADVE/RTIS et LaFusée sont la propriété intellectuelle d\'UPgraders. La marque cliente garde tous les livrables produits pour son compte. La méthode reste notre outil, comme un cabinet d\'avocats garde ses templates de contrats.',
  },
  {
    q: 'Est-ce que vous prenez les missions one-shot (uniquement design/photo) ?',
    a: 'Rarement, et seulement quand la marque a déjà un ADVE clair. Notre valeur ne se voit pas sur un livrable isolé — elle se voit sur le système. Pour des missions purement exécutives, nous orientons vers Friends Studio en direct.',
  },
  {
    q: 'Vous formez les équipes internes à la méthode ?',
    a: 'Oui, sur les mandats RTIS long. Les directions marketing intégrées peuvent être formées à lire la fiche ADVE et à utiliser LaFusée en mode lecteur. La méthode reste sous IP UPgraders.',
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.folioRoot}>
      <SiteNav active="services" />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>Services</div>
          <h1 className={styles.pageHeroTitle}>
            Trois <em>portes</em> d&apos;entrée. <b>Une</b> méthode.
          </h1>
          <p className={styles.pageHeroLede}>
            Audit, mandat long, marque blanche. Quel que soit le format,{' '}
            <b>ADVE/RTIS</b> est l&apos;ossature. La différence se joue sur le périmètre, le rythme,
            et qui porte la relation client.
          </p>
        </div>
      </section>

      <section className={styles.sec} style={{ paddingTop: 0, borderTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.services}>
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className={`${styles.serviceCard} ${s.featured ? styles.featured : ''}`}
              >
                <div className={styles.serviceNum}>{s.num}</div>
                <h2 className={styles.serviceTitle}>
                  {s.title}
                  {s.titleEm ? (
                    <>
                      {' '}
                      <em>{s.titleEm}</em>
                    </>
                  ) : null}
                </h2>
                <div className={styles.serviceTag}>{s.tag}</div>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <ul className={styles.serviceList}>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className={styles.servicePrice}>
                  <span style={{ opacity: 0.6 }}>{s.priceLabel}</span>
                  <br />
                  <b>{s.price}</b>
                </div>
                {s.ctaHref ? (
                  <a
                    href={s.ctaHref}
                    target={s.ctaHref.startsWith('http') ? '_blank' : undefined}
                    rel={s.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                    className={styles.footerCta}
                    style={{ marginTop: 18 }}
                  >
                    <span>{s.ctaLabel}</span>
                    <span aria-hidden>→</span>
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sec} ${styles.advertis}`}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>02</span>
            <span>Processus standard</span>
          </div>
          <h2 className={styles.secTitle}>
            Quatre <em>temps</em>. Pas un de plus.
          </h2>
          <p className={styles.secLede}>
            Notre processus est lisible, daté, livrable. Pas de phase « immersion floue » de trois
            semaines payée à blanc — chaque étape produit un artefact que la marque garde.
          </p>
          <div className={styles.processGrid}>
            {PROCESS.map((p) => (
              <div className={styles.processStep} key={p.num}>
                <div className={styles.processStepNum}>{p.num}</div>
                <h3 className={styles.processStepTitle}>{p.title}</h3>
                <p className={styles.processStepDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sec}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>03</span>
            <span>Questions courantes</span>
          </div>
          <h2 className={styles.secTitle}>
            <em>Avant</em> de nous appeler.
          </h2>
          <div className={styles.faqList}>
            {FAQ.map((item) => (
              <div className={styles.faqItem} key={item.q}>
                <h3 className={styles.faqQuestion}>{item.q}</h3>
                <p className={styles.faqAnswer}>{item.a}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <Link href="/upgraders/contact" className={styles.footerCta}>
              <span>Démarrer un projet</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
