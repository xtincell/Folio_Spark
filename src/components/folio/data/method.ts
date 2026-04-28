export type StepGroup = 'Socle' | 'Propulseur';

export type Step = {
  code: string;
  name: string;
  sub: string;
  body: string;
  group: StepGroup;
};

export const STEPS: Step[] = [
  // SOCLE : ADVE
  {
    code: 'A',
    name: 'AUTHENTICITÉ',
    sub: "On extrait l'ADN, on n'imite pas.",
    body: "Pas de copier-coller de tendances. Une plongée dans l'archéologie de la marque pour révéler ce qui ne peut appartenir qu'à elle.",
    group: 'Socle',
  },
  {
    code: 'D',
    name: 'DISTINCTION',
    sub: 'Rupture visuelle immédiate.',
    body: "Chaque sortie doit briser le scroll. La distinction n'est pas un bonus : c'est la condition d'existence dans le bruit numérique.",
    group: 'Socle',
  },
  {
    code: 'V',
    name: 'VALEUR',
    sub: 'Chaque pixel sert un KPI.',
    body: "L'esthétique sans utilité est une dépense. On lie chaque décision créative à un objectif business mesurable.",
    group: 'Socle',
  },
  {
    code: 'E',
    name: 'ENGAGEMENT',
    sub: 'Du spectateur au croyant.',
    body: "Transformer l'attention volatile en communauté. Rituels, codes internes, moments de bascule. La marque devient un mouvement.",
    group: 'Socle',
  },
  // PROPULSEUR : RTIS
  {
    code: 'R',
    name: 'RISK',
    sub: "Le SWOT déduit de l'ADVE.",
    body: "On extrait du socle les forces, faiblesses, menaces et opportunités spécifiques à cette marque — pas un SWOT générique, un SWOT taillé dans son ADN.",
    group: 'Propulseur',
  },
  {
    code: 'T',
    name: 'TRACK',
    sub: "Étude de marché vs ADVE + Risk.",
    body: "On confronte l'identité et son risque au paysage réel : concurrence, signaux faibles, données comportementales. La piste devient lisible.",
    group: 'Propulseur',
  },
  {
    code: 'I',
    name: 'INNOVATION',
    sub: 'Toutes les actions activables.',
    body: "À partir des informations précédentes, on cartographie l'éventail complet d'actions que la marque peut poser — produits, campagnes, formats, rituels.",
    group: 'Propulseur',
  },
  {
    code: 'S',
    name: 'STRATÉGIE',
    sub: 'Roadmap dynamique.',
    body: "Une feuille de route vivante, hiérarchisée, ajustée au cycle. Pas un plan figé — un système qui apprend et se réorganise.",
    group: 'Propulseur',
  },
];
