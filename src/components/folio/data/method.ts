import type { Bi } from '@/lib/i18n';

export type StepGroup = 'Socle' | 'Propulseur';

export type Step = {
  code: string;
  name: Bi;
  sub: Bi;
  body: Bi;
  group: StepGroup;
};

export const STEPS: Step[] = [
  // SOCLE : ADVE
  {
    code: 'A',
    name: { fr: 'AUTHENTICITÉ', en: 'AUTHENTICITY' },
    sub: { fr: "On extrait l'ADN, on n'imite pas.", en: 'We extract the DNA, we don’t imitate.' },
    body: {
      fr: "Pas de copier-coller de tendances. Une plongée dans l'archéologie de la marque pour révéler ce qui ne peut appartenir qu'à elle.",
      en: 'No copy-pasting of trends. A dive into the brand’s archaeology to reveal what can only belong to it.',
    },
    group: 'Socle',
  },
  {
    code: 'D',
    name: { fr: 'DISTINCTION', en: 'DISTINCTION' },
    sub: { fr: 'Rupture visuelle immédiate.', en: 'Immediate visual rupture.' },
    body: {
      fr: "Chaque sortie doit briser le scroll. La distinction n'est pas un bonus : c'est la condition d'existence dans le bruit numérique.",
      en: 'Every output must break the scroll. Distinction isn’t a bonus: it’s the condition for existing in the digital noise.',
    },
    group: 'Socle',
  },
  {
    code: 'V',
    name: { fr: 'VALEUR', en: 'VALUE' },
    sub: { fr: 'Chaque pixel sert un KPI.', en: 'Every pixel serves a KPI.' },
    body: {
      fr: "L'esthétique sans utilité est une dépense. On lie chaque décision créative à un objectif business mesurable.",
      en: 'Aesthetics without utility is an expense. We tie every creative decision to a measurable business goal.',
    },
    group: 'Socle',
  },
  {
    code: 'E',
    name: { fr: 'ENGAGEMENT', en: 'ENGAGEMENT' },
    sub: { fr: 'Du spectateur au croyant.', en: 'From spectator to believer.' },
    body: {
      fr: "Transformer l'attention volatile en communauté. Rituels, codes internes, moments de bascule. La marque devient un mouvement.",
      en: 'Turn volatile attention into community. Rituals, insider codes, tipping points. The brand becomes a movement.',
    },
    group: 'Socle',
  },
  // PROPULSEUR : RTIS
  {
    code: 'R',
    name: { fr: 'RISK', en: 'RISK' },
    sub: { fr: "Le SWOT déduit de l'ADVE.", en: 'The SWOT derived from ADVE.' },
    body: {
      fr: "On extrait du socle les forces, faiblesses, menaces et opportunités spécifiques à cette marque — pas un SWOT générique, un SWOT taillé dans son ADN.",
      en: 'From the foundation we extract the strengths, weaknesses, threats and opportunities specific to this brand — not a generic SWOT, a SWOT cut from its DNA.',
    },
    group: 'Propulseur',
  },
  {
    code: 'T',
    name: { fr: 'TRACK', en: 'TRACK' },
    sub: { fr: 'Étude de marché vs ADVE + Risk.', en: 'Market study vs ADVE + Risk.' },
    body: {
      fr: "On confronte l'identité et son risque au paysage réel : concurrence, signaux faibles, données comportementales. La piste devient lisible.",
      en: 'We confront the identity and its risk with the real landscape: competition, weak signals, behavioural data. The track becomes legible.',
    },
    group: 'Propulseur',
  },
  {
    code: 'I',
    name: { fr: 'INNOVATION', en: 'INNOVATION' },
    sub: { fr: 'Toutes les actions activables.', en: 'Every actionable move.' },
    body: {
      fr: "À partir des informations précédentes, on cartographie l'éventail complet d'actions que la marque peut poser — produits, campagnes, formats, rituels.",
      en: 'From the previous information, we map the full range of moves the brand can make — products, campaigns, formats, rituals.',
    },
    group: 'Propulseur',
  },
  {
    code: 'S',
    name: { fr: 'STRATÉGIE', en: 'STRATEGY' },
    sub: { fr: 'Roadmap dynamique.', en: 'Dynamic roadmap.' },
    body: {
      fr: "Une feuille de route vivante, hiérarchisée, ajustée au cycle. Pas un plan figé — un système qui apprend et se réorganise.",
      en: 'A living roadmap, prioritised, tuned to the cycle. Not a frozen plan — a system that learns and reorganises itself.',
    },
    group: 'Propulseur',
  },
];
