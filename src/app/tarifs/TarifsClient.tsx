'use client';

import { useState } from 'react';
import styles from '@/styles/tarifs.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { FlameMark } from '@/components/folio/FlameMark';
import { SparkMark } from '@/components/folio/icons/SparkMark';
import { StarField } from '@/components/folio/StarField';
import { Reveal } from '@/components/folio/Reveal';
import { SocialRow } from '@/components/folio/SocialRow';
import { useLang, pick, type Bi } from '@/lib/i18n';

/* ============================================================================
   Tarifs — Alexandre « Xtincell » Djengue
   ----------------------------------------------------------------------------
   The money page. A sales-grade pricing page wired to the folio design system.
   Bilingual content lives here as Bi fields, resolved with pick(value, lang).

   Pricing & naming theory baked into the layout:
     • Value-based naming — tiers follow the brand arc « de la poussière à
       l'étoile » (Étincelle → Trajectoire → Constellation) rather than
       feature-list names; retainers borrow flight metaphors (Copilote →
       Commandant → Apollo).
     • Anchoring + center-stage (Goldilocks) — three tiers, the middle one
       featured as « recommandé » so the eye and the wallet land there.
     • Decoy / good-better-best — the à-la-carte « from » prices make the
       packaged tiers read as the better value.
     • Prestige (round) pricing — premium services use clean round numbers,
       not charm endings (.99), to signal quality over discount.
   ========================================================================== */

type BiOrStr = Bi | string;

/* Fixed CFA peg — 1 EUR = 655.957 XOF. FCFA rounded to the nearest 5 000 for
   a clean, quotable figure (these are starting prices, not invoices). */
const XOF_PER_EUR = 655.957;
const fcfaFrom = (eur: number) => Math.round((eur * XOF_PER_EUR) / 5000) * 5000;
const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const eurStr = (eur: number) => `${group(eur)} €`;
const fcfaStr = (eur: number) => `${group(fcfaFrom(eur))} FCFA`;

type Currency = 'eur' | 'fcfa';

/* ---------------------------------------------------------------- copy ---- */
const COPY = {
  kicker: { fr: 'Alexandre Xtincell · Ace of a few things', en: 'Alexandre Xtincell · Ace of a few things' },
  badge: { fr: 'Tarifs · Édition 2026', en: 'Pricing · 2026 Edition' },
  h1a: { fr: 'Vous ne payez pas des heures.', en: "You're not paying for hours." },
  h1b: { fr: 'Vous achetez une trajectoire.', en: 'You buy a trajectory.' },
  lede: {
    fr: "Brand Architect, directeur artistique, builder. Je transforme une marque en système qui se reproduit — du positionnement au pixel livré. Voici exactement ce que ça coûte, en euro et en FCFA, sans devis-surprise.",
    en: 'Brand Architect, art director, builder. I turn a brand into a system that reproduces itself — from positioning to the delivered pixel. Here is exactly what it costs, in euro and in FCFA, with no surprise quote.',
  },
  signature: { fr: 'De la poussière à l’étoile.', en: 'From dust to the star.' },
  remote: { fr: 'Remote · Afrique · Europe', en: 'Remote · Africa · Europe' },
  fact1: { fr: 'Devis ferme sous 48 h', en: 'Firm quote within 48 h' },
  fact2: { fr: 'Acompte 50 % · solde à la livraison', en: '50% deposit · balance on delivery' },
  fact3: { fr: 'Facturation € ou FCFA', en: 'Billing in € or FCFA' },
  curEur: { fr: 'Euro', en: 'Euro' },
  curFcfa: { fr: 'FCFA', en: 'FCFA' },
  curHint: { fr: 'Afficher les prix en', en: 'Show prices in' },
} satisfies Record<string, Bi>;

/* --------------------------------------------------- pricing principles --- */
type Principle = { k: string; t: Bi; d: Bi };
const PRINCIPLES: Principle[] = [
  {
    k: '◆',
    t: { fr: 'Au système, pas à l’heure', en: 'For the system, not the hour' },
    d: {
      fr: 'Je facture une transformation et un livrable, pas un compteur. Vous savez le prix avant qu’on commence.',
      en: 'I bill a transformation and a deliverable, not a meter. You know the price before we start.',
    },
  },
  {
    k: '↗',
    t: { fr: 'Ancré sur la valeur', en: 'Anchored on value' },
    d: {
      fr: 'Un logo coûte peu ; une marque qui vend coûte ce qu’elle rapporte. Mes prix suivent l’impact, pas la quantité de fichiers.',
      en: 'A logo costs little; a brand that sells costs what it returns. My prices follow impact, not file count.',
    },
  },
  {
    k: '✶',
    t: { fr: 'Un seul interlocuteur', en: 'One single contact' },
    d: {
      fr: 'Stratégie, direction artistique, exécution, web : une seule personne tient la chaîne. Zéro déperdition, zéro marge d’agence.',
      en: 'Strategy, art direction, execution, web: one person holds the chain. Zero loss in handoff, zero agency markup.',
    },
  },
];

/* ----------------------------------------------------------- one-shots ---- */
type Tier = {
  glyph: string;
  name: string;
  tagline: Bi;
  eur: number;
  from: boolean;
  unit: Bi;
  best: BiOrStr;
  includes: Bi[];
  conditions: Bi;
  featured?: boolean;
};

const ONE_SHOTS: Tier[] = [
  {
    glyph: '♠',
    name: 'L’Étincelle',
    tagline: { fr: 'Le premier signal', en: 'The first signal' },
    eur: 1500,
    from: true,
    unit: { fr: 'forfait', en: 'flat' },
    best: { fr: 'Lancement · jeune marque · un livrable fort', en: 'Launch · young brand · one strong deliverable' },
    includes: [
      { fr: 'Atelier de cadrage (ADN, ton, cible).', en: 'Scoping workshop (DNA, tone, audience).' },
      { fr: 'Logo + système visuel essentiel.', en: 'Logo + essential visual system.' },
      { fr: '1 livrable phare : landing, pochette ou clé de campagne.', en: '1 flagship deliverable: landing, cover or campaign key.' },
      { fr: 'Mini-charte (couleurs, type, usages).', en: 'Mini guidelines (colour, type, usage).' },
      { fr: '2 allers-retours de révision.', en: '2 rounds of revisions.' },
    ],
    conditions: { fr: 'Délai 1 à 2 semaines · acompte 50 %.', en: '1–2 week turnaround · 50% deposit.' },
  },
  {
    glyph: '♥',
    name: 'La Trajectoire',
    tagline: { fr: 'La marque qui décolle', en: 'The brand that takes off' },
    eur: 4500,
    from: false,
    unit: { fr: 'forfait', en: 'flat' },
    best: { fr: 'Refonte complète · marque qui veut être prise au sérieux', en: 'Full rebrand · a brand meant to be taken seriously' },
    includes: [
      { fr: 'Tout L’Étincelle, en profondeur.', en: 'Everything in L’Étincelle, in depth.' },
      { fr: 'Plateforme de marque + positionnement (méthode ADVE).', en: 'Brand platform + positioning (ADVE method).' },
      { fr: 'Système d’identité complet + charte déployable.', en: 'Full identity system + deployable guidelines.' },
      { fr: 'Direction artistique d’une campagne ou shooting.', en: 'Art direction for one campaign or shoot.' },
      { fr: 'Kit de déploiement : réseaux, print, templates.', en: 'Deployment kit: social, print, templates.' },
      { fr: '3 allers-retours · 30 jours de support post-livraison.', en: '3 rounds · 30 days post-delivery support.' },
    ],
    conditions: { fr: 'Délai 3 à 5 semaines · acompte 50 %.', en: '3–5 week turnaround · 50% deposit.' },
    featured: true,
  },
  {
    glyph: '♦',
    name: 'La Constellation',
    tagline: { fr: 'L’écosystème complet', en: 'The full ecosystem' },
    eur: 9000,
    from: true,
    unit: { fr: 'sur-mesure', en: 'bespoke' },
    best: { fr: 'Marque ambitieuse · plusieurs canaux · le grand jeu', en: 'Ambitious brand · multiple channels · the full play' },
    includes: [
      { fr: 'Tout La Trajectoire, à l’échelle d’un écosystème.', en: 'Everything in La Trajectoire, at ecosystem scale.' },
      { fr: 'Stratégie de marque + architecture (gamme, sous-marques).', en: 'Brand strategy + architecture (range, sub-brands).' },
      { fr: 'Site web ou web-app sur-mesure, livré et déployé.', en: 'Bespoke website or web-app, shipped and deployed.' },
      { fr: 'Direction artistique multi-canal sur le lancement.', en: 'Multi-channel art direction across the launch.' },
      { fr: 'Photo / motion selon le périmètre.', en: 'Photo / motion as scope requires.' },
      { fr: 'Suivi 90 jours · option passage en retainer.', en: '90-day follow-up · option to roll into a retainer.' },
    ],
    conditions: { fr: 'Périmètre cadré ensemble · échéancier en 3 jalons.', en: 'Scope framed together · 3-milestone schedule.' },
  },
];

/* --------------------------------------------------------- à la carte ---- */
type Carte = { glyph: string; name: Bi; eur: number; desc: Bi };
const CARTE: Carte[] = [
  {
    glyph: '♠',
    name: { fr: 'Branding & identité', en: 'Branding & identity' },
    eur: 1200,
    desc: { fr: 'Logo, système visuel, charte, naming.', en: 'Logo, visual system, guidelines, naming.' },
  },
  {
    glyph: '♥',
    name: { fr: 'Direction artistique', en: 'Art direction' },
    eur: 900,
    desc: { fr: 'Concept, casting, image d’une campagne.', en: 'Concept, casting, image of a campaign.' },
  },
  {
    glyph: '♦',
    name: { fr: 'Photographie', en: 'Photography' },
    eur: 600,
    desc: { fr: 'Studio, produit, portrait, événement — la journée.', en: 'Studio, product, portrait, event — per day.' },
  },
  {
    glyph: '♣',
    name: { fr: 'Web & tech', en: 'Web & tech' },
    eur: 1000,
    desc: { fr: 'Site, landing ou web-app clé en main.', en: 'Site, landing or web-app, turnkey.' },
  },
  {
    glyph: '✦',
    name: { fr: 'Motion & vidéo', en: 'Motion & video' },
    eur: 800,
    desc: { fr: 'Clip, capsule sociale, film de marque.', en: 'Music video, social capsule, brand film.' },
  },
  {
    glyph: '★',
    name: { fr: 'Conseil & stratégie', en: 'Consulting & strategy' },
    eur: 500,
    desc: { fr: 'Atelier, audit de marque, plan d’action.', en: 'Workshop, brand audit, action plan.' },
  },
];

/* ----------------------------------------------------------- retainers ---- */
const RETAINERS: Tier[] = [
  {
    glyph: '♣',
    name: 'Copilote',
    tagline: { fr: 'Direction créative à temps partiel', en: 'Part-time creative direction' },
    eur: 1200,
    from: false,
    unit: { fr: '/ mois', en: '/ month' },
    best: { fr: 'Marque qui avance · besoin de cohérence régulière', en: 'A brand in motion · needs steady coherence' },
    includes: [
      { fr: '1 journée créative équivalente / semaine.', en: '1 creative day-equivalent / week.' },
      { fr: 'Direction artistique de vos contenus courants.', en: 'Art direction of your ongoing content.' },
      { fr: '1 visio de pilotage par semaine.', en: '1 steering call per week.' },
      { fr: 'Accès prioritaire WhatsApp.', en: 'Priority WhatsApp access.' },
    ],
    conditions: { fr: 'Engagement 3 mois min · facturé au mois.', en: '3-month minimum · billed monthly.' },
  },
  {
    glyph: '♥',
    name: 'Commandant de bord',
    tagline: { fr: 'Directeur créatif fractionné', en: 'Fractional creative director' },
    eur: 2800,
    from: false,
    unit: { fr: '/ mois', en: '/ month' },
    best: { fr: 'Équipe ou agence · pilotage créatif complet', en: 'Team or agency · full creative steering' },
    includes: [
      { fr: 'Direction créative de toute la production.', en: 'Creative direction across all production.' },
      { fr: 'Pilotage du réseau UPgraders (photo, dev, motion).', en: 'Steering the UPgraders network (photo, dev, motion).' },
      { fr: 'Roadmap de marque trimestrielle (méthode RTIS).', en: 'Quarterly brand roadmap (RTIS method).' },
      { fr: 'Revues hebdo + arbitrages.', en: 'Weekly reviews + arbitration.' },
      { fr: 'Réponse sous 24 h ouvrées.', en: 'Reply within 24 working hours.' },
    ],
    conditions: { fr: 'Engagement 3 mois min · -10 % sur 6 mois.', en: '3-month minimum · -10% over 6 months.' },
    featured: true,
  },
  {
    glyph: '♦',
    name: 'Mission Apollo',
    tagline: { fr: 'Partenaire stratégique', en: 'Strategic partner' },
    eur: 5000,
    from: true,
    unit: { fr: '/ mois', en: '/ month' },
    best: { fr: 'Lancement majeur · scale · transformation profonde', en: 'Major launch · scale · deep transformation' },
    includes: [
      { fr: 'Tout Commandant de bord, sans plafond de périmètre.', en: 'Everything in Commandant, with no scope ceiling.' },
      { fr: 'Stratégie + exécution comme un département interne.', en: 'Strategy + execution as an in-house department.' },
      { fr: 'Accès à l’OS LaFusée pour le pilotage.', en: 'Access to the LaFusée OS for steering.' },
      { fr: 'Disponibilité dédiée, jalons sur-mesure.', en: 'Dedicated availability, bespoke milestones.' },
    ],
    conditions: { fr: 'Cadré au cas par cas · contrat dédié.', en: 'Framed case by case · dedicated contract.' },
  },
];

/* --------------------------------------------------------- proof strip ---- */
const PROOF: { src: string; alt: string }[] = [
  { src: '/work/cases/cap-esterias/01.webp', alt: 'Cap Esterias' },
  { src: '/work/cases/brasseries-du-cameroun/hero.webp', alt: 'Brasseries du Cameroun' },
  { src: '/work/cases/robuste/hero.webp', alt: 'Robuste' },
  { src: '/work/cases/cover-musical/hero.webp', alt: 'Cover musical' },
  { src: '/work/cases/kof-festival/01.webp', alt: 'KOF Festival' },
];

/* ---------------------------------------------------------------- FAQ ----- */
const FAQ: { q: Bi; a: Bi }[] = [
  {
    q: { fr: 'Pourquoi un forfait plutôt qu’un taux horaire ?', en: 'Why a flat fee rather than an hourly rate?' },
    a: {
      fr: 'Parce que vous achetez un résultat, pas du temps passé. Un prix ferme aligne nos intérêts : je suis payé pour livrer vite et bien, pas pour faire tourner le compteur. Vous budgétez sans surprise.',
      en: 'Because you buy an outcome, not time spent. A firm price aligns our interests: I’m paid to ship fast and well, not to run the meter. You budget with no surprises.',
    },
  },
  {
    q: { fr: 'Le remote, ça marche vraiment ?', en: 'Does remote really work?' },
    a: {
      fr: 'Oui — c’est mon mode par défaut. Basé entre Yaoundé, Douala et Abidjan, je travaille avec des marques en Afrique et en Europe. Process écrit, jalons clairs, visios de pilotage : la distance ne change rien à la qualité.',
      en: 'Yes — it’s my default mode. Based between Yaoundé, Douala and Abidjan, I work with brands across Africa and Europe. Written process, clear milestones, steering calls: distance changes nothing about quality.',
    },
  },
  {
    q: { fr: 'Euro ou FCFA ?', en: 'Euro or FCFA?' },
    a: {
      fr: 'Les deux. Les prix sont affichés dans les deux devises (parité fixe 1 € = 655,957 FCFA) et je facture dans celle qui vous arrange. Virement, mobile money ou Wise selon le pays.',
      en: 'Both. Prices are shown in both currencies (fixed peg €1 = 655.957 FCFA) and I invoice in whichever suits you. Bank transfer, mobile money or Wise depending on the country.',
    },
  },
  {
    q: { fr: 'Comment se passe le paiement ?', en: 'How does payment work?' },
    a: {
      fr: 'Acompte de 50 % pour réserver le créneau et lancer, solde à la livraison. Pour les retainers, facturation mensuelle en début de mois. Tout est cadré par un devis signé avant de commencer.',
      en: '50% deposit to book the slot and kick off, balance on delivery. For retainers, monthly billing at the start of the month. Everything is framed by a signed quote before we begin.',
    },
  },
  {
    q: { fr: 'Combien de révisions sont incluses ?', en: 'How many revisions are included?' },
    a: {
      fr: 'De 2 à 3 allers-retours selon le forfait, sur la direction validée au cadrage. Au-delà, on ajoute un avenant clair. L’objectif n’est pas de limiter — c’est de protéger la cohérence du système.',
      en: '2 to 3 rounds depending on the package, on the direction validated at scoping. Beyond that, we add a clear amendment. The goal isn’t to limit you — it’s to protect the coherence of the system.',
    },
  },
  {
    q: { fr: 'Mon projet ne rentre dans aucune case ?', en: 'My project fits none of the boxes?' },
    a: {
      fr: 'Normal — ce sont des points de départ. Écrivez-moi sur WhatsApp avec deux lignes sur votre marque et votre échéance : je reviens sous 48 h avec un devis ferme et le bon format.',
      en: 'Normal — these are starting points. Message me on WhatsApp with two lines about your brand and your deadline: I’ll come back within 48 h with a firm quote and the right format.',
    },
  },
  {
    q: { fr: 'Qui êtes-vous, au juste ?', en: 'Who are you, exactly?' },
    a: {
      fr: 'Alexandre « Xtincell » Djengue — ingénieur télécom de formation, directeur artistique de pratique, fondateur d’UPgraders. 15 ans, Universal Music Africa, Chococam, Orange (via McCann). Ace of a few things : je tiens la stratégie, l’image et le code.',
      en: 'Alexandre “Xtincell” Djengue — telecom engineer by training, art director by practice, founder of UPgraders. 15 years, Universal Music Africa, Chococam, Orange (via McCann). Ace of a few things: I hold strategy, image and code.',
    },
  },
];

const SECTIONS = {
  why: { num: '§ 00', a: { fr: 'Le principe', en: 'The principle' }, b: { fr: 'comment je price', en: 'how I price' } },
  oneShot: { num: '§ 01', a: { fr: 'One-shots', en: 'One-shots' }, b: { fr: 'un projet, un prix ferme', en: 'one project, one firm price' } },
  carte: { num: '§ 02', a: { fr: 'À la carte', en: 'À la carte' }, b: { fr: 'ace of a few things', en: 'ace of a few things' } },
  retainer: { num: '§ 03', a: { fr: 'Retainers', en: 'Retainers' }, b: { fr: 'm’avoir dans l’équipe', en: 'have me on the team' } },
  faq: { num: '§ 04', a: { fr: 'FAQ', en: 'FAQ' }, b: { fr: 'les questions qui comptent', en: 'the questions that matter' } },
} satisfies Record<string, { num: string; a: Bi; b: Bi }>;

export function TarifsClient() {
  const { lang } = useLang();
  const tr = (v: BiOrStr): string => pick(v, lang);
  const [cur, setCur] = useState<Currency>('eur');

  const fr = lang === 'fr';
  const ctaText = fr ? 'Discuter de mon projet' : 'Discuss my project';
  const quoteText = fr ? 'Demander un devis · 48 h' : 'Request a quote · 48 h';

  /* WhatsApp deep-link prefilled with the tier name — warm the conversation. */
  const waFor = (label?: string) => {
    const base = fr
      ? "Bonjour Alexandre, j'ai vu votre page tarifs"
      : 'Hi Alexandre, I saw your pricing page';
    const msg = label ? `${base} — ${label}.` : `${base}.`;
    return `${CONTACT.whatsappLink}?text=${encodeURIComponent(msg)}`;
  };

  const Price = ({ eur, from, unit }: { eur: number; from: boolean; unit: Bi }) => {
    const primary = cur === 'eur' ? eurStr(eur) : fcfaStr(eur);
    const secondary = cur === 'eur' ? fcfaStr(eur) : eurStr(eur);
    return (
      <div className={styles.price}>
        {from && <span className={styles.priceFrom}>{fr ? 'à partir de' : 'from'}</span>}
        <span className={styles.priceBig}>{primary}</span>
        <span className={styles.priceUnit}>{tr(unit)}</span>
        <span className={styles.priceAlt}>≈ {secondary}</span>
      </div>
    );
  };

  const TierCard = ({ tier }: { tier: Tier }) => (
    <article className={`${styles.tier} ${tier.featured ? styles.tierFeatured : ''}`}>
      {tier.featured && <span className={styles.tierFlag}>{fr ? 'Recommandé' : 'Recommended'}</span>}
      <div className={styles.tierHead}>
        <span className={styles.tierGlyph} aria-hidden="true">{tier.glyph}</span>
        <div>
          <h3 className={styles.tierName}>{tier.name}</h3>
          <p className={styles.tierTagline}>{tr(tier.tagline)}</p>
        </div>
      </div>
      <Price eur={tier.eur} from={tier.from} unit={tier.unit} />
      <p className={styles.tierBest}>
        <span className={styles.tierBestK}>{fr ? 'Idéal' : 'Best for'}</span>
        {tr(tier.best)}
      </p>
      <ul className={styles.tierList}>
        {tier.includes.map((it) => (
          <li key={tr(it)}>{tr(it)}</li>
        ))}
      </ul>
      <p className={styles.tierConditions}>{tr(tier.conditions)}</p>
      <a
        className={`${styles.tierCta} ${tier.featured ? styles.tierCtaSolid : ''}`}
        href={waFor(tier.name)}
        target="_blank"
        rel="noreferrer"
      >
        {fr ? 'Choisir' : 'Pick'} {tier.name} →
      </a>
    </article>
  );

  return (
    <div className={styles.folioRoot}>
      <div className={styles.backdrop} aria-hidden="true">
        <SparkMark outline animated={false} ariaHidden />
      </div>
      <FolioTopbar active="tarifs" />

      <main id="contenu" className={styles.page}>
        {/* ============================ HERO ============================ */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true">
            <StarField density={50} />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.kicker}>{tr(COPY.kicker)}</div>
            <h1 className={styles.h1}>
              {tr(COPY.h1a)}
              <br />
              <em>{tr(COPY.h1b)}</em>
            </h1>
            <p className={styles.lede}>{tr(COPY.lede)}</p>

            <div className={styles.heroControls}>
              <div className={styles.curToggle} role="group" aria-label={tr(COPY.curHint)}>
                <span className={styles.curHint}>{tr(COPY.curHint)}</span>
                <button
                  type="button"
                  className={`${styles.curBtn} ${cur === 'eur' ? styles.curBtnOn : ''}`}
                  aria-pressed={cur === 'eur'}
                  onClick={() => setCur('eur')}
                >
                  € {tr(COPY.curEur)}
                </button>
                <button
                  type="button"
                  className={`${styles.curBtn} ${cur === 'fcfa' ? styles.curBtnOn : ''}`}
                  aria-pressed={cur === 'fcfa'}
                  onClick={() => setCur('fcfa')}
                >
                  {tr(COPY.curFcfa)}
                </button>
              </div>
              <a className={styles.heroCta} href={waFor()} target="_blank" rel="noreferrer">
                {quoteText} →
              </a>
            </div>

            <ul className={styles.heroFacts}>
              <li><span className={styles.dot} />{tr(COPY.remote)}</li>
              <li>{tr(COPY.fact1)}</li>
              <li>{tr(COPY.fact2)}</li>
              <li>{tr(COPY.fact3)}</li>
            </ul>

            <div className={styles.heroSign}>« {tr(COPY.signature)} »</div>
          </div>
        </section>

        {/* ======================= §00 — PRINCIPLE ===================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.why} tr={tr} />
          <div className={styles.principleGrid}>
            {PRINCIPLES.map((p) => (
              <div className={styles.principle} key={tr(p.t)}>
                <span className={styles.principleGlyph} aria-hidden="true">{p.k}</span>
                <h3>{tr(p.t)}</h3>
                <p>{tr(p.d)}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ======================= §01 — ONE-SHOTS ===================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.oneShot} tr={tr} />
          <p className={styles.sectionLede}>
            {fr
              ? 'Trois portées, un prix ferme chacune. La plupart des marques décollent avec La Trajectoire.'
              : 'Three reaches, one firm price each. Most brands take off with La Trajectoire.'}
          </p>
          <div className={styles.tierGrid}>
            {ONE_SHOTS.map((t) => (
              <TierCard tier={t} key={t.name} />
            ))}
          </div>
        </Reveal>

        {/* ======================= proof image strip ================== */}
        <Reveal as="section" className={styles.proofBand} aria-label={fr ? 'Travaux récents' : 'Recent work'}>
          <div className={styles.proofStrip}>
            {PROOF.map((img) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
            ))}
          </div>
          <p className={styles.proofCaption}>
            {fr
              ? '15 ans · 25+ marques · Universal Music Africa, Chococam, Orange, festivals & artistes.'
              : '15 years · 25+ brands · Universal Music Africa, Chococam, Orange, festivals & artists.'}
          </p>
        </Reveal>

        {/* ======================= §02 — À LA CARTE =================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.carte} tr={tr} />
          <p className={styles.sectionLede}>
            {fr
              ? 'Besoin d’un seul métier ? Prenez-le à la carte. Chaque prix est un point de départ — les forfaits restent la meilleure affaire.'
              : 'Need a single craft? Take it à la carte. Each price is a starting point — the packages stay the better deal.'}
          </p>
          <div className={styles.carteGrid}>
            {CARTE.map((c) => (
              <article className={styles.carteItem} key={tr(c.name)}>
                <span className={styles.carteGlyph} aria-hidden="true">{c.glyph}</span>
                <div className={styles.carteBody}>
                  <h3>{tr(c.name)}</h3>
                  <p>{tr(c.desc)}</p>
                </div>
                <div className={styles.cartePrice}>
                  <span className={styles.carteFrom}>{fr ? 'dès' : 'from'}</span>
                  <span>{cur === 'eur' ? eurStr(c.eur) : fcfaStr(c.eur)}</span>
                  <small>{cur === 'eur' ? fcfaStr(c.eur) : eurStr(c.eur)}</small>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ======================= §03 — RETAINERS ==================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.retainer} tr={tr} />
          <p className={styles.sectionLede}>
            {fr
              ? 'Pour les marques qui avancent en continu : un directeur créatif dans l’équipe, sans le coût d’un CDI.'
              : 'For brands moving continuously: a creative director on the team, without the cost of a full hire.'}
          </p>
          <div className={styles.tierGrid}>
            {RETAINERS.map((t) => (
              <TierCard tier={t} key={t.name} />
            ))}
          </div>
        </Reveal>

        {/* ============================ FAQ =========================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.faq} tr={tr} />
          <div className={styles.faqList}>
            {FAQ.map((f, i) => (
              <details className={styles.faqItem} key={tr(f.q)} {...(i === 0 ? { open: true } : {})}>
                <summary>
                  <span>{tr(f.q)}</span>
                  <span className={styles.faqPlus} aria-hidden="true" />
                </summary>
                <p>{tr(f.a)}</p>
              </details>
            ))}
          </div>
        </Reveal>

        {/* ======================== FINAL CTA ======================== */}
        <section className={styles.finalCta}>
          <div className={styles.finalBg} aria-hidden="true">
            <StarField density={60} />
          </div>
          <div className={styles.finalInner}>
            <FlameMark size={40} />
            <h2 className={styles.finalTitle}>
              {fr ? 'On fait décoller ' : 'Shall we get '}
              <em>{fr ? 'votre marque' : 'your brand off the ground'}</em>{fr ? ' ?' : '?'}
            </h2>
            <p className={styles.finalLede}>
              {fr
                ? 'Deux lignes sur votre projet, et je reviens sous 48 h avec un devis ferme — en euro ou en FCFA.'
                : 'Two lines about your project, and I’ll come back within 48 h with a firm quote — in euro or FCFA.'}
            </p>
            <div className={styles.finalBtns}>
              <a className={styles.finalPrimary} href={waFor()} target="_blank" rel="noreferrer">
                {ctaText} · WhatsApp {CONTACT.whatsappDisplay} →
              </a>
              <a className={styles.finalGhost} href={`mailto:${CONTACT.email}`}>
                {fr ? 'Ou par email' : 'Or by email'} ↗
              </a>
            </div>
            <SocialRow />
            <div className={styles.finalSign}>
              <span className={styles.finalSignName}>{CONTACT.footerName}</span>
              <span className={styles.finalSignTag}>« {tr(COPY.signature)} »</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* Shared section header — matches the §-numbered rhythm of /tech and /cv. */
function SectionHead({
  s,
  tr,
}: {
  s: { num: string; a: Bi; b: Bi };
  tr: (v: BiOrStr) => string;
}) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionNum}>{s.num}</span>
      <span className={styles.sectionA}>{tr(s.a)}</span>
      <span className={styles.sectionB}>{tr(s.b)}</span>
    </div>
  );
}
