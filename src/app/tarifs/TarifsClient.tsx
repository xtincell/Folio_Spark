'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/tarifs.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { FlameMark } from '@/components/folio/FlameMark';
import { SparkMark } from '@/components/folio/icons/SparkMark';
import { StarField } from '@/components/folio/StarField';
import { HeroAtmosphere } from '@/components/folio/HeroAtmosphere';
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
    fr: "Conseil en marque d’abord — puis la production qui va avec : design, photo, vidéo, dev. Brand Architect formé ingénieur, je tiens la chaîne complète, du positionnement au pixel livré. Voici exactement ce que ça coûte, en euro et en FCFA, sans devis-surprise.",
    en: 'Brand consulting first — then the production to match: design, photo, video, dev. A Brand Architect trained as an engineer, I hold the whole chain, from positioning to the delivered pixel. Here is exactly what it costs, in euro and in FCFA, with no surprise quote.',
  },
  signature: { fr: 'De la poussière à l’étoile.', en: 'From dust to the star.' },
  remote: { fr: 'Remote · Afrique · Europe', en: 'Remote · Africa · Europe' },
  fact1: { fr: 'Devis ferme sous 48 h', en: 'Firm quote within 48 h' },
  fact2: { fr: 'Paiement en plusieurs fois possible', en: 'Installment payment available' },
  fact3: { fr: 'Facturation € ou FCFA', en: 'Billing in € or FCFA' },
  dualMarket: {
    fr: 'Une grille pensée pour deux réalités : une porte d’entrée accessible pour les marques qui démarrent en Afrique, et des forfaits à la hauteur des standards internationaux. Le bon prix pour le bon moment de votre marque.',
    en: 'A grid built for two realities: an accessible entry door for brands starting out in Africa, and packages that meet international standards. The right price for the right moment of your brand.',
  },
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
  img?: string;
};

/* Accessible entry offer — the « sweet spot » door for young brands / the
   African market. Sits below L'Étincelle so the local market has a real first
   step, while the premium tiers keep the ceiling high. */
const ENTRY: Tier = {
  glyph: '✦',
  name: 'Le Premier Pas',
  tagline: { fr: 'La marque qui commence', en: 'The brand that begins' },
  eur: 590,
  from: true,
  unit: { fr: 'forfait', en: 'flat' },
  best: { fr: 'Solo, artiste, jeune marque · un premier visage pro', en: 'Solo, artist, young brand · a first pro face' },
  img: '/tarifs/premier-pas.webp',
  includes: [
    { fr: 'Atelier express de cadrage (45 min, en visio).', en: 'Express scoping workshop (45 min, on call).' },
    { fr: 'Logo + palette + 2 typographies.', en: 'Logo + palette + 2 typefaces.' },
    { fr: '1 livrable au choix : carte de visite, post-clé ou bannière.', en: '1 deliverable of your choice: business card, key post or banner.' },
    { fr: 'Fichiers prêts à l’emploi (web + impression).', en: 'Ready-to-use files (web + print).' },
    { fr: '1 aller-retour de révision.', en: '1 round of revisions.' },
  ],
  conditions: { fr: 'Délai ~1 semaine · payable en 2×.', en: '~1 week turnaround · payable in 2×.' },
};

const ONE_SHOTS: Tier[] = [
  {
    glyph: '♠',
    img: '/tarifs/etincelle.webp',
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
    img: '/tarifs/trajectoire.webp',
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
    img: '/tarifs/constellation.webp',
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

/* ----------------------------------------------------------- conseil ----- */
/* The headline. Productized consulting built on the proprietary ADVE/RTIS
   method + the LaFusée OS — the activity Alexandre wants front and centre. */
const CONSULTING: Tier[] = [
  {
    glyph: '✶',
    img: '/tarifs/conseil-diagnostic.webp',
    name: 'Le Diagnostic',
    tagline: { fr: 'Audit de marque ADVE/RTIS', en: 'ADVE/RTIS brand audit' },
    eur: 600,
    from: true,
    unit: { fr: 'forfait', en: 'flat' },
    best: { fr: 'Comprendre où en est la marque — et quoi faire ensuite', en: 'Understand where the brand stands — and what to do next' },
    includes: [
      { fr: 'Atelier d’immersion (ADN, marché, ambition).', en: 'Immersion workshop (DNA, market, ambition).' },
      { fr: 'Passage au crible du socle ADVE : Authenticité, Distinction, Valeur, Engagement.', en: 'A sweep through the ADVE foundation: Authenticity, Distinction, Value, Engagement.' },
      { fr: 'Lecture du risque + paysage concurrentiel (propulseur RTIS).', en: 'Risk read + competitive landscape (RTIS propellant).' },
      { fr: 'Rapport d’audit + plan d’action priorisé.', en: 'Audit report + prioritised action plan.' },
      { fr: '1 h de restitution en visio.', en: '1-hour debrief on call.' },
    ],
    conditions: { fr: 'Délai ~1 semaine · idéal avant tout chantier.', en: '~1 week · ideal before any project.' },
  },
  {
    glyph: '✦',
    img: '/tarifs/conseil-plateforme.webp',
    name: 'La Plateforme',
    tagline: { fr: 'Le système de marque complet', en: 'The full brand system' },
    eur: 3000,
    from: false,
    unit: { fr: 'forfait', en: 'flat' },
    best: { fr: 'Donner à la marque un cap, une voix et une feuille de route', en: 'Give the brand a heading, a voice and a roadmap' },
    includes: [
      { fr: 'Tout Le Diagnostic, déroulé en profondeur.', en: 'Everything in Le Diagnostic, taken deep.' },
      { fr: 'Plateforme de marque : positionnement, ADN, promesse, territoire d’expression.', en: 'Brand platform: positioning, DNA, promise, territory of expression.' },
      { fr: 'Méthode ADVE/RTIS déroulée de bout en bout.', en: 'The ADVE/RTIS method run end to end.' },
      { fr: 'Architecture de marque (gamme, sous-marques, naming).', en: 'Brand architecture (range, sub-brands, naming).' },
      { fr: 'Roadmap dynamique 12 mois, pilotée via l’OS LaFusée.', en: '12-month dynamic roadmap, steered through the LaFusée OS.' },
    ],
    conditions: { fr: 'Délai 2 à 4 semaines · payable en 3×.', en: '2–4 week turnaround · payable in 3×.' },
    featured: true,
  },
  {
    glyph: '★',
    img: '/tarifs/conseil-sparring.webp',
    name: 'Le Sparring',
    tagline: { fr: 'Votre cerveau de marque, au mois', en: 'Your brand brain, monthly' },
    eur: 900,
    from: true,
    unit: { fr: '/ mois', en: '/ month' },
    best: { fr: 'Fondateur ou équipe qui veut un stratège sous la main', en: 'A founder or team that wants a strategist on tap' },
    includes: [
      { fr: '2 sessions de sparring stratégique / mois.', en: '2 strategic sparring sessions / month.' },
      { fr: 'Arbitrages créatifs + relecture des décisions de marque.', en: 'Creative arbitration + review of brand decisions.' },
      { fr: 'Mise à jour continue de la roadmap dynamique.', en: 'Continuous update of the dynamic roadmap.' },
      { fr: 'Accès direct WhatsApp, réponse sous 24 h.', en: 'Direct WhatsApp access, reply within 24 h.' },
    ],
    conditions: { fr: 'Engagement 3 mois min · sans production incluse.', en: '3-month minimum · production not included.' },
  },
];

/* --------------------------------------------------------- à la carte ---- */
type Carte = { glyph: string; name: Bi; eur: number; desc: Bi; img: string; livrable: Bi };
const CARTE: Carte[] = [
  {
    glyph: '♠',
    name: { fr: 'Branding & identité', en: 'Branding & identity' },
    eur: 1200,
    img: '/tarifs/studio-branding.webp',
    desc: {
      fr: 'Je construis le visage de la marque : naming, logo, palette, typographies et règles d’usage. Pas un joli logo isolé — un système cohérent qui tient sur un packaging comme sur un écran.',
      en: 'I build the brand’s face: naming, logo, palette, typefaces and usage rules. Not a pretty standalone logo — a coherent system that holds on a package as on a screen.',
    },
    livrable: { fr: 'Logo + mini-charte + fichiers sources', en: 'Logo + mini guidelines + source files' },
  },
  {
    glyph: '♥',
    name: { fr: 'Direction artistique', en: 'Art direction' },
    eur: 900,
    img: '/tarifs/studio-da.webp',
    desc: {
      fr: 'Le concept et le regard d’une campagne : intention, références, casting, lumière, mise en scène. Je donne une direction claire à l’image pour qu’elle raconte la bonne histoire.',
      en: 'The concept and the eye of a campaign: intent, references, casting, light, staging. I give the image a clear direction so it tells the right story.',
    },
    livrable: { fr: 'Concept + moodboard + key visual', en: 'Concept + moodboard + key visual' },
  },
  {
    glyph: '♦',
    name: { fr: 'Photographie', en: 'Photography' },
    eur: 600,
    img: '/tarifs/studio-photo.webp',
    desc: {
      fr: 'Studio, produit, portrait d’artiste ou couverture d’événement. Prise de vue + sélection + retouche professionnelle. L’image au service de la marque, pas juste une belle photo.',
      en: 'Studio, product, artist portrait or event coverage. Shoot + selection + professional retouching. Image at the service of the brand, not just a pretty photo.',
    },
    livrable: { fr: 'La journée · images retouchées livrées', en: 'Per day · retouched images delivered' },
  },
  {
    glyph: '♣',
    name: { fr: 'Web & tech', en: 'Web & tech' },
    eur: 1000,
    img: '/tarifs/studio-web.webp',
    desc: {
      fr: 'Site vitrine, landing de campagne ou web-app sur-mesure, conçus et codés. L’avantage de l’ingénieur derrière l’image : ça ne ressemble pas seulement bien, ça fonctionne et ça convertit.',
      en: 'Showcase site, campaign landing or bespoke web-app, designed and coded. The engineer-behind-the-image edge: it doesn’t just look good, it works and it converts.',
    },
    livrable: { fr: 'Site livré, déployé et responsive', en: 'Site shipped, deployed and responsive' },
  },
  {
    glyph: '✦',
    name: { fr: 'Motion & vidéo', en: 'Motion & video' },
    eur: 800,
    img: '/tarifs/studio-motion.webp',
    desc: {
      fr: 'Clip, capsule réseaux, film de marque ou habillage animé. Du storyboard au montage final, une vidéo qui se regarde jusqu’au bout et qui sert le message.',
      en: 'Music video, social capsule, brand film or animated branding. From storyboard to final cut, a video that’s watched to the end and serves the message.',
    },
    livrable: { fr: 'Vidéo montée + formats réseaux', en: 'Edited video + social formats' },
  },
  {
    glyph: '★',
    name: { fr: 'Conseil & stratégie', en: 'Consulting & strategy' },
    eur: 500,
    img: '/tarifs/studio-conseil.webp',
    desc: {
      fr: 'Atelier, audit de marque ou plan d’action via la méthode ADVE/RTIS. On clarifie le positionnement, on repère les angles morts, on repart avec une feuille de route concrète.',
      en: 'Workshop, brand audit or action plan via the ADVE/RTIS method. We clarify the positioning, spot the blind spots, and leave with a concrete roadmap.',
    },
    livrable: { fr: 'Atelier + restitution écrite', en: 'Workshop + written deliverable' },
  },
];

/* ----------------------------------------------------------- retainers ---- */
const RETAINERS: Tier[] = [
  {
    glyph: '♣',
    img: '/tarifs/retainer-copilote.webp',
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
    img: '/tarifs/retainer-commandant.webp',
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
    img: '/tarifs/retainer-apollo.webp',
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
      fr: 'Un acompte réserve le créneau et lance le projet, le solde se règle à la livraison. Sur les forfaits one-shot, le paiement peut s’étaler jusqu’à 3× sans frais (ex : 40 % pour lancer, puis 2 versements aux jalons). Pour les retainers, facturation mensuelle en début de mois. Tout est cadré par un devis signé avant de commencer.',
      en: 'A deposit books the slot and kicks off the project, the balance is due on delivery. On one-shot packages, payment can be spread up to 3× with no fees (e.g. 40% to launch, then 2 payments at milestones). For retainers, monthly billing at the start of the month. Everything is framed by a signed quote before we begin.',
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

/* --------------------------------------------------------- payment ------- */
type PayStep = { k: string; t: Bi; d: Bi };
const PAY_STEPS: PayStep[] = [
  {
    k: '40%',
    t: { fr: 'Pour lancer', en: 'To launch' },
    d: {
      fr: 'Un acompte réserve le créneau et démarre l’atelier de cadrage. Devis signé, on est partis.',
      en: 'A deposit books the slot and starts the scoping workshop. Quote signed, we’re off.',
    },
  },
  {
    k: '30%',
    t: { fr: 'Au jalon', en: 'At the milestone' },
    d: {
      fr: 'À mi-parcours, quand la direction est validée et que la production bat son plein.',
      en: 'Mid-way, once the direction is validated and production is in full swing.',
    },
  },
  {
    k: '30%',
    t: { fr: 'À la livraison', en: 'On delivery' },
    d: {
      fr: 'Le solde à la remise des fichiers finaux. Tout est clair, rien n’est caché.',
      en: 'The balance on handover of the final files. All clear, nothing hidden.',
    },
  },
];

type PayMethod = { name: string; d: Bi };
const PAY_METHODS: PayMethod[] = [
  { name: 'Mobile Money', d: { fr: 'MTN MoMo · Orange Money · Wave', en: 'MTN MoMo · Orange Money · Wave' } },
  { name: 'Virement', d: { fr: 'Banque locale (FCFA) ou SEPA (€)', en: 'Local bank (FCFA) or SEPA (€)' } },
  { name: 'Wise / PayPal', d: { fr: 'Pour les paiements internationaux', en: 'For international payments' } },
  { name: 'Espèces', d: { fr: 'En main propre, Yaoundé · Douala · Abidjan', en: 'In person, Yaoundé · Douala · Abidjan' } },
];

const PAY_COPY = {
  lede: {
    fr: 'Un budget ne devrait jamais bloquer une bonne marque. Le paiement s’adapte à votre trésorerie — sans frais cachés, sans surprise.',
    en: 'A budget should never block a good brand. Payment adapts to your cash flow — no hidden fees, no surprises.',
  },
  installTitle: { fr: 'Paiement en plusieurs fois', en: 'Pay in installments' },
  installBody: {
    fr: 'Sur tous les forfaits one-shot, l’étalement va jusqu’à 3× sans frais — réparti sur les jalons du projet. Sur les gros périmètres (Constellation), on cale un échéancier dédié ensemble. L’idée : que vous puissiez vous offrir le bon niveau, maintenant.',
    en: 'On every one-shot package, spreading goes up to 3× with no fees — split across the project milestones. On larger scopes (Constellation), we set a dedicated schedule together. The idea: that you can afford the right level, now.',
  },
  methodsTitle: { fr: 'Moyens de paiement', en: 'Payment methods' },
  conditionsLink: { fr: 'Lire les conditions complètes', en: 'Read the full terms' },
  curNote: {
    fr: 'Facturation en euro ou en FCFA, au choix. Parité fixe affichée : 1 € = 655,957 FCFA.',
    en: 'Billing in euro or FCFA, your choice. Fixed peg shown: €1 = 655.957 FCFA.',
  },
} satisfies Record<string, Bi>;

const SECTIONS = {
  why: { num: '§ 00', a: { fr: 'Le principe', en: 'The principle' }, b: { fr: 'comment je travaille', en: 'how I work' } },
  conseil: { num: '§ 01', a: { fr: 'Conseil & stratégie', en: 'Consulting & strategy' }, b: { fr: 'le cœur du métier', en: 'the heart of the craft' } },
  oneShot: { num: '§ 02', a: { fr: 'Forfaits intégrés', en: 'Integrated packages' }, b: { fr: 'de la stratégie au pixel', en: 'from strategy to pixel' } },
  carte: { num: '§ 03', a: { fr: 'Studio à la carte', en: 'Studio à la carte' }, b: { fr: 'design · photo · vidéo · dev', en: 'design · photo · video · dev' } },
  retainer: { num: '§ 04', a: { fr: 'En continu', en: 'Ongoing' }, b: { fr: 'm’avoir dans l’équipe', en: 'have me on the team' } },
  payment: { num: '§ 05', a: { fr: 'Paiement', en: 'Payment' }, b: { fr: 'souple, en plusieurs fois', en: 'flexible, in installments' } },
  faq: { num: '§ 06', a: { fr: 'FAQ', en: 'FAQ' }, b: { fr: 'les questions qui comptent', en: 'the questions that matter' } },
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
      {tier.img && (
        <div className={styles.tierImg} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tier.img} alt="" loading="lazy" />
        </div>
      )}
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
            <HeroAtmosphere className={styles.atmoCanvas} density={1} />
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

        {/* ======================= §01 — CONSEIL ====================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.conseil} tr={tr} />
          <p className={styles.sectionLede}>
            {fr
              ? 'Mon activité principale : penser la marque avant de la produire. Trois offres bâties sur ma méthode ADVE/RTIS et l’OS LaFusée — du diagnostic ponctuel au stratège embarqué.'
              : 'My main activity: thinking the brand before producing it. Three offers built on my ADVE/RTIS method and the LaFusée OS — from a one-off diagnosis to an embedded strategist.'}
          </p>
          <div className={styles.tierGrid}>
            {CONSULTING.map((t) => (
              <TierCard tier={t} key={t.name} />
            ))}
          </div>
        </Reveal>

        {/* ======================= §02 — FORFAITS INTÉGRÉS ============= */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.oneShot} tr={tr} />
          <p className={styles.sectionLede}>{tr(COPY.dualMarket)}</p>

          {/* Accessible entry — the sweet-spot door for young / local brands. */}
          <article className={styles.entryBand}>
            <div className={styles.entryImg} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ENTRY.img} alt="" loading="lazy" />
            </div>
            <div className={styles.entryBody}>
              <span className={styles.entryFlag}>{fr ? 'Porte d’entrée' : 'Entry door'}</span>
              <h3 className={styles.entryName}>
                <span aria-hidden="true">{ENTRY.glyph}</span> {ENTRY.name}
              </h3>
              <p className={styles.entryTagline}>{tr(ENTRY.tagline)} — {tr(ENTRY.best)}</p>
              <ul className={styles.entryList}>
                {ENTRY.includes.map((it) => (
                  <li key={tr(it)}>{tr(it)}</li>
                ))}
              </ul>
            </div>
            <div className={styles.entrySide}>
              <Price eur={ENTRY.eur} from={ENTRY.from} unit={ENTRY.unit} />
              <p className={styles.entryConditions}>{tr(ENTRY.conditions)}</p>
              <a className={styles.entryCta} href={waFor(ENTRY.name)} target="_blank" rel="noreferrer">
                {fr ? 'Commencer ici' : 'Start here'} →
              </a>
            </div>
          </article>

          <p className={styles.tierGroupLabel}>
            {fr
              ? 'Et quand la marque est prête à passer à l’échelle — stratégie + exécution, un seul prix :'
              : 'And when the brand is ready to scale — strategy + execution, one price:'}
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
              ? 'Besoin d’un seul métier ? Prenez-le à la carte. Je tiens la direction ; la production s’appuie au besoin sur La Guilde, le réseau UPgraders (photo, illustration, dev). Chaque prix est un point de départ.'
              : 'Need a single craft? Take it à la carte. I hold the direction; production leans, when needed, on La Guilde — the UPgraders network (photo, illustration, dev). Each price is a starting point.'}
          </p>
          <div className={styles.carteGrid}>
            {CARTE.map((c) => (
              <article className={styles.carteItem} key={tr(c.name)}>
                <div className={styles.carteImg} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt="" loading="lazy" />
                  <span className={styles.carteGlyph}>{c.glyph}</span>
                </div>
                <div className={styles.carteBody}>
                  <h3>{tr(c.name)}</h3>
                  <p>{tr(c.desc)}</p>
                  <p className={styles.carteLivrable}>
                    <span>{fr ? 'Livrable' : 'Deliverable'}</span> {tr(c.livrable)}
                  </p>
                  <div className={styles.cartePrice}>
                    <span className={styles.carteFrom}>{fr ? 'dès' : 'from'}</span>
                    <span className={styles.cartePriceBig}>{cur === 'eur' ? eurStr(c.eur) : fcfaStr(c.eur)}</span>
                    <small>{cur === 'eur' ? fcfaStr(c.eur) : eurStr(c.eur)}</small>
                  </div>
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
              ? 'Pour les marques qui avancent en continu : un directeur créatif dans l’équipe, sans le coût d’un CDI. Production incluse. Plus léger ? Le Sparring (§01) reste l’option mensuelle la plus accessible, conseil seul.'
              : 'For brands moving continuously: a creative director on the team, without the cost of a full hire. Production included. Lighter? Le Sparring (§01) stays the most accessible monthly option, advice only.'}
          </p>
          <div className={styles.tierGrid}>
            {RETAINERS.map((t) => (
              <TierCard tier={t} key={t.name} />
            ))}
          </div>
        </Reveal>

        {/* ======================= §05 — PAIEMENT ===================== */}
        <Reveal as="section" className={styles.section}>
          <SectionHead s={SECTIONS.payment} tr={tr} />
          <p className={styles.sectionLede}>{tr(PAY_COPY.lede)}</p>

          <div className={styles.payGrid}>
            <div className={styles.payInstall}>
              <h3 className={styles.payTitle}>{tr(PAY_COPY.installTitle)}</h3>
              <p className={styles.payBody}>{tr(PAY_COPY.installBody)}</p>
              <ol className={styles.paySteps}>
                {PAY_STEPS.map((s) => (
                  <li key={s.k} className={styles.payStep}>
                    <span className={styles.payStepK}>{s.k}</span>
                    <span className={styles.payStepBody}>
                      <span className={styles.payStepT}>{tr(s.t)}</span>
                      <span className={styles.payStepD}>{tr(s.d)}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className={styles.payNote}>{tr(PAY_COPY.curNote)}</p>
            </div>

            <aside className={styles.payMethods}>
              <h3 className={styles.payTitle}>{tr(PAY_COPY.methodsTitle)}</h3>
              <ul className={styles.payMethodList}>
                {PAY_METHODS.map((m) => (
                  <li key={m.name}>
                    <span className={styles.payMethodName}>{m.name}</span>
                    <span className={styles.payMethodD}>{tr(m.d)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/conditions" className={styles.payConditionsLink}>
                {tr(PAY_COPY.conditionsLink)} →
              </Link>
            </aside>
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
              <Link href="/conditions" className={styles.finalConditions}>
                {fr ? 'Conditions & modalités' : 'Terms & conditions'}
              </Link>
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
