'use client';

import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang, pick, type Bi } from '@/lib/i18n';

type Service = {
  num: string;
  title: Bi;
  titleEm?: Bi;
  tag: Bi;
  desc: Bi;
  bullets: Bi[];
  price: Bi;
  priceLabel: Bi;
  featured?: boolean;
  ctaHref?: string;
  ctaLabel?: Bi;
};

const SERVICES: Service[] = [
  {
    num: '01',
    title: { fr: 'Audit', en: 'Audit' },
    titleEm: { fr: 'ADVE', en: 'ADVE' },
    tag: { fr: "Porte d'entrée standard · 2 à 4 semaines", en: 'Standard entry door · 2 to 4 weeks' },
    desc: {
      fr: "Trois ateliers pour extraire l'ADN de votre marque selon les quatre lentilles ADVE. Livrable : une fiche identitaire qui sert de boussole pour 18 mois minimum.",
      en: 'Three workshops to extract your brand’s DNA through the four ADVE lenses. Deliverable: an identity sheet that serves as a compass for at least 18 months.',
    },
    bullets: [
      { fr: '3 ateliers dirigés (4h chacun)', en: '3 guided workshops (4h each)' },
      {
        fr: 'Cartographie Authenticité / Distinction / Valeur / Engagement',
        en: 'Authenticity / Distinction / Value / Engagement mapping',
      },
      { fr: 'Fiche ADVE + recommandations prioritaires', en: 'ADVE sheet + priority recommendations' },
      { fr: 'Restitution équipe complète + dirigeants', en: 'Debrief with the full team + leadership' },
    ],
    price: { fr: 'Sur devis', en: 'On quote' },
    priceLabel: { fr: 'Pack atelier', en: 'Workshop pack' },
    ctaHref: CONTACT.whatsappLink,
    ctaLabel: { fr: 'Démarrer un audit', en: 'Start an audit' },
  },
  {
    num: '02',
    title: { fr: 'Accompagnement', en: 'Engagement' },
    titleEm: { fr: 'RTIS', en: 'RTIS' },
    tag: { fr: 'Mandat long · 6 à 24 mois', en: 'Long mandate · 6 to 24 months' },
    desc: {
      fr: "Le cycle complet : ADVE en entrée, propulseur RTIS en exécution. Roadmap dynamique, cellule sur mesure depuis La Guilde, restitutions trimestrielles. C'est la formule des marques cultes.",
      en: 'The full cycle: ADVE going in, RTIS propellant in execution. Dynamic roadmap, bespoke cell drawn from the Guild, quarterly debriefs. This is the cult-brand formula.',
    },
    bullets: [
      { fr: 'Audit ADVE + SWOT Risk + Track marché', en: 'ADVE audit + Risk SWOT + market Track' },
      { fr: 'Cartographie Innovation hiérarchisée', en: 'Prioritised Innovation mapping' },
      {
        fr: 'Roadmap dynamique réajustée chaque trimestre',
        en: 'Dynamic roadmap readjusted every quarter',
      },
      {
        fr: 'Cellule créative dédiée (photo, motion, design, dev)',
        en: 'Dedicated creative cell (photo, motion, design, dev)',
      },
      {
        fr: 'Reporting LaFusée — KPIs cohérence et cycle',
        en: 'LaFusée reporting — coherence & cycle KPIs',
      },
    ],
    price: { fr: 'Mandat 6 à 24 mois', en: '6-to-24-month mandate' },
    priceLabel: { fr: 'Engagement long', en: 'Long engagement' },
    featured: true,
    ctaHref: CONTACT.whatsappLink,
    ctaLabel: { fr: 'Discuter du mandat', en: 'Discuss the mandate' },
  },
  {
    num: '03',
    title: { fr: 'Marque', en: 'White' },
    titleEm: { fr: 'blanche', en: 'label' },
    tag: {
      fr: 'Pour agences & studios partenaires · ponctuel ou récurrent',
      en: 'For partner agencies & studios · one-off or recurring',
    },
    desc: {
      fr: "Vous portez la relation client, nous portons la méthode. UPgraders intervient en sous-traitance stratégique pour renforcer vos livrables sans empiéter sur votre marque.",
      en: 'You own the client relationship, we carry the method. UPgraders steps in as strategic subcontractor to strengthen your deliverables without treading on your brand.',
    },
    bullets: [
      { fr: 'Audit ADVE rebrandé à votre logo', en: 'ADVE audit rebranded under your logo' },
      { fr: 'Production de roadmaps RTIS sur vos comptes', en: 'RTIS roadmaps produced on your accounts' },
      { fr: 'Cellule Guilde activable à la mission', en: 'Guild cell activated per mission' },
      { fr: "NDA et clauses d'exclusivité standards", en: 'Standard NDA and exclusivity clauses' },
    ],
    price: { fr: 'Tarification partenaire', en: 'Partner pricing' },
    priceLabel: { fr: 'B2B agences', en: 'B2B agencies' },
    ctaHref: `mailto:${CONTACT.email}?subject=Marque%20blanche%20UPgraders`,
    ctaLabel: { fr: 'Demander la doc partenaire', en: 'Request the partner doc' },
  },
];

type ProcessStep = { num: string; title: Bi; desc: Bi };
const PROCESS: ProcessStep[] = [
  {
    num: '01',
    title: { fr: 'Brief', en: 'Brief' },
    desc: {
      fr: "Appel cadrage 45 min · WhatsApp ou visio. Diagnostic rapide pour orienter vers la porte d'entrée juste.",
      en: '45-minute scoping call · WhatsApp or video. A quick diagnosis to point you to the right entry door.',
    },
  },
  {
    num: '02',
    title: { fr: 'Ateliers', en: 'Workshops' },
    desc: {
      fr: '2 à 3 ateliers ADVE selon le format. On rentre dans le tissu — équipe, fondateurs, parfois clients finaux.',
      en: '2 to 3 ADVE workshops depending on the format. We get into the fabric — team, founders, sometimes end clients.',
    },
  },
  {
    num: '03',
    title: { fr: 'Roadmap', en: 'Roadmap' },
    desc: {
      fr: 'Livrable structuré : fiche ADVE, SWOT Risk, cartographie Innovation, hiérarchisation Stratégie.',
      en: 'Structured deliverable: ADVE sheet, Risk SWOT, Innovation mapping, Strategy prioritisation.',
    },
  },
  {
    num: '04',
    title: { fr: 'Exécution', en: 'Execution' },
    desc: {
      fr: 'La Guilde se met en cellule. LaFusée orchestre. La marque entre en mouvement — et apprend à chaque cycle.',
      en: 'The Guild forms a cell. LaFusée orchestrates. The brand sets in motion — and learns with every cycle.',
    },
  },
];

type FaqItem = { q: Bi; a: Bi };
const FAQ: FaqItem[] = [
  {
    q: { fr: 'Vous êtes basés où ?', en: 'Where are you based?' },
    a: {
      fr: "Cabinet à Douala, Cameroun. Missions principales sur Cameroun, Côte d'Ivoire, Sénégal, Gabon. Nous travaillons aussi avec des marques diasporiques et européennes ayant un terrain africain.",
      en: 'Firm in Douala, Cameroon. Main missions across Cameroon, Côte d’Ivoire, Senegal, Gabon. We also work with diaspora and European brands with African ground.',
    },
  },
  {
    q: { fr: 'Pourquoi pas de tarifs publics ?', en: 'Why no public pricing?' },
    a: {
      fr: "Parce qu'un audit ADVE pour une marque seule de 5 personnes n'a rien à voir avec un mandat RTIS pour un groupe coté. Nous proposons toujours un devis structuré après l'appel cadrage gratuit.",
      en: 'Because an ADVE audit for a five-person brand has nothing in common with an RTIS mandate for a listed group. We always provide a structured quote after the free scoping call.',
    },
  },
  {
    q: { fr: 'Combien de temps pour voir des résultats ?', en: 'How long before results show?' },
    a: {
      fr: "Le livrable ADVE arrive en 2 à 4 semaines. Les premiers résultats marché sur la formule RTIS apparaissent à 90-120 jours — c'est le temps minimum pour qu'une marque sortie de refonte se réinstalle.",
      en: 'The ADVE deliverable lands in 2 to 4 weeks. First market results on the RTIS formula appear at 90–120 days — the minimum time for a freshly rebuilt brand to settle back in.',
    },
  },
  {
    q: {
      fr: 'Vous gardez les droits sur la méthode ADVE/RTIS ?',
      en: 'Do you keep the rights to the ADVE/RTIS method?',
    },
    a: {
      fr: "Oui, ADVE/RTIS et LaFusée sont la propriété intellectuelle d'UPgraders. La marque cliente garde tous les livrables produits pour son compte. La méthode reste notre outil, comme un cabinet d'avocats garde ses templates de contrats.",
      en: 'Yes — ADVE/RTIS and LaFusée are UPgraders’ intellectual property. The client brand keeps every deliverable produced on its behalf. The method remains our tool, the way a law firm keeps its contract templates.',
    },
  },
  {
    q: {
      fr: 'Est-ce que vous prenez les missions one-shot (uniquement design/photo) ?',
      en: 'Do you take one-shot missions (design/photo only)?',
    },
    a: {
      fr: "Rarement, et seulement quand la marque a déjà un ADVE clair. Notre valeur ne se voit pas sur un livrable isolé — elle se voit sur le système. Pour des missions purement exécutives, nous orientons vers Friends Studio en direct.",
      en: 'Rarely, and only when the brand already has a clear ADVE. Our value doesn’t show on an isolated deliverable — it shows on the system. For purely executional missions we point you to Friends Studio directly.',
    },
  },
  {
    q: {
      fr: 'Vous formez les équipes internes à la méthode ?',
      en: 'Do you train in-house teams on the method?',
    },
    a: {
      fr: "Oui, sur les mandats RTIS long. Les directions marketing intégrées peuvent être formées à lire la fiche ADVE et à utiliser LaFusée en mode lecteur. La méthode reste sous IP UPgraders.",
      en: 'Yes, on long RTIS mandates. In-house marketing teams can be trained to read the ADVE sheet and use LaFusée in reader mode. The method stays under UPgraders IP.',
    },
  },
];

const T = {
  eyebrow: { fr: 'Services', en: 'Services' },
  h1a: { fr: 'Trois ', en: 'Three ' },
  h1em: { fr: 'portes', en: 'doors' },
  h1b: { fr: " d'entrée. ", en: ' in. ' },
  h1bold: { fr: 'Une', en: 'One' },
  h1c: { fr: ' méthode.', en: ' method.' },
  lede1: { fr: 'Audit, mandat long, marque blanche. Quel que soit le format, ', en: 'Audit, long mandate, white label. Whatever the format, ' },
  ledeB: { fr: 'ADVE/RTIS', en: 'ADVE/RTIS' },
  lede2: {
    fr: " est l'ossature. La différence se joue sur le périmètre, le rythme, et qui porte la relation client.",
    en: ' is the backbone. The difference plays out in scope, rhythm, and who owns the client relationship.',
  },
  s02: { fr: 'Processus standard', en: 'Standard process' },
  procTitleA: { fr: 'Quatre ', en: 'Four ' },
  procTitleEm: { fr: 'temps', en: 'beats' },
  procTitleB: { fr: '. Pas un de plus.', en: '. Not one more.' },
  procLede: {
    fr: "Notre processus est lisible, daté, livrable. Pas de phase « immersion floue » de trois semaines payée à blanc — chaque étape produit un artefact que la marque garde.",
    en: 'Our process is legible, dated, deliverable. No fuzzy three-week “immersion” billed blind — every step produces an artefact the brand keeps.',
  },
  s03: { fr: 'Questions courantes', en: 'Common questions' },
  faqTitleEm: { fr: 'Avant', en: 'Before' },
  faqTitleB: { fr: ' de nous appeler.', en: ' you call us.' },
  start: { fr: 'Démarrer un projet', en: 'Start a project' },
} satisfies Record<string, Bi>;

export function ServicesClient() {
  const { lang } = useLang();
  const t = (v: Bi) => pick(v, lang);

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="services" />

      <main id="contenu">
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>{t(T.eyebrow)}</div>
          <h1 className={styles.pageHeroTitle}>
            {t(T.h1a)}
            <em>{t(T.h1em)}</em>
            {t(T.h1b)}
            <b>{t(T.h1bold)}</b>
            {t(T.h1c)}
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
          <div className={styles.services}>
            {SERVICES.map((s) => (
              <div
                key={s.num}
                className={`${styles.serviceCard} ${s.featured ? styles.featured : ''}`}
              >
                <div className={styles.serviceNum}>{s.num}</div>
                <h2 className={styles.serviceTitle}>
                  {t(s.title)}
                  {s.titleEm ? (
                    <>
                      {' '}
                      <em>{t(s.titleEm)}</em>
                    </>
                  ) : null}
                </h2>
                <div className={styles.serviceTag}>{t(s.tag)}</div>
                <p className={styles.serviceDesc}>{t(s.desc)}</p>
                <ul className={styles.serviceList}>
                  {s.bullets.map((b, i) => (
                    <li key={i}>{t(b)}</li>
                  ))}
                </ul>
                <div className={styles.servicePrice}>
                  <span style={{ opacity: 0.6 }}>{t(s.priceLabel)}</span>
                  <br />
                  <b>{t(s.price)}</b>
                </div>
                {s.ctaHref ? (
                  <a
                    href={s.ctaHref}
                    target={s.ctaHref.startsWith('http') ? '_blank' : undefined}
                    rel={s.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                    className={styles.footerCta}
                    style={{ marginTop: 18 }}
                  >
                    <span>{s.ctaLabel ? t(s.ctaLabel) : null}</span>
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
            <span>{t(T.s02)}</span>
          </div>
          <h2 className={styles.secTitle}>
            {t(T.procTitleA)}
            <em>{t(T.procTitleEm)}</em>
            {t(T.procTitleB)}
          </h2>
          <p className={styles.secLede}>{t(T.procLede)}</p>
          <div className={styles.processGrid}>
            {PROCESS.map((p) => (
              <div className={styles.processStep} key={p.num}>
                <div className={styles.processStepNum}>{p.num}</div>
                <h3 className={styles.processStepTitle}>{t(p.title)}</h3>
                <p className={styles.processStepDesc}>{t(p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sec}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>03</span>
            <span>{t(T.s03)}</span>
          </div>
          <h2 className={styles.secTitle}>
            <em>{t(T.faqTitleEm)}</em>
            {t(T.faqTitleB)}
          </h2>
          <div className={styles.faqList}>
            {FAQ.map((item, i) => (
              <div className={styles.faqItem} key={i}>
                <h3 className={styles.faqQuestion}>{t(item.q)}</h3>
                <p className={styles.faqAnswer}>{t(item.a)}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <Link href="/upgraders/contact" className={styles.footerCta}>
              <span>{t(T.start)}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
