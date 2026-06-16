import type { Bi } from '@/lib/i18n';

export type Pillar = {
  k: string;
  t: Bi;
  d: Bi;
};

export const MANIFESTO_PILLARS: Pillar[] = [
  {
    k: 'TOOLSMITH',
    t: { fr: 'Je construis mes outils', en: 'I build my own tools' },
    d: {
      fr: "OS interne piloté par IA pour automatiser la méthode ADVE/RTIS — LaFusée (UPgraders).",
      en: 'AI-driven internal OS that automates the ADVE/RTIS method — LaFusée (UPgraders).',
    },
  },
  {
    k: 'STRATÈGE',
    t: { fr: 'Je code la conversion', en: 'I code conversion' },
    d: {
      fr: "Méthode ADVE/RTIS : socle ADVE (Authenticité, Distinction, Valeur, Engagement) + propulseur RTIS (Risk, Track, Innovation, Stratégie).",
      en: 'ADVE/RTIS method: an ADVE foundation (Authenticity, Distinction, Value, Engagement) + an RTIS propellant (Risk, Track, Innovation, Strategy).',
    },
  },
  {
    k: 'ARTISAN',
    t: { fr: "Je tiens l'objectif", en: 'I hold the lens' },
    d: {
      fr: "Photographie & direction artistique pour artistes et marques premium.",
      en: 'Photography & art direction for artists and premium brands.',
    },
  },
  {
    k: 'ARCHITECTE',
    t: { fr: "Je dessine l'infrastructure", en: 'I draw the infrastructure' },
    d: {
      fr: "Systèmes de vente, hubs audiovisuels, écosystèmes d'engagement.",
      en: 'Sales systems, audiovisual hubs, engagement ecosystems.',
    },
  },
];

export type UpgPillar = {
  num: Bi;
  name: string;
  prefix?: string;
  nameEm?: string;
  desc: Bi; // may contain HTML
};

export const UPGRADERS_PILLARS: UpgPillar[] = [
  {
    num: { fr: 'Méthode', en: 'Method' },
    prefix: 'ADVE',
    nameEm: '/RTIS',
    name: 'ADVE/RTIS',
    desc: {
      fr: "<b>Socle ADVE</b> : Authenticité · Distinction · Valeur · Engagement.<br /><b>Propulseur RTIS</b> : Risk · Track · Innovation · Stratégie.<br />IP UPgraders.",
      en: '<b>ADVE foundation</b>: Authenticity · Distinction · Value · Engagement.<br /><b>RTIS propellant</b>: Risk · Track · Innovation · Strategy.<br />UPgraders IP.',
    },
  },
  {
    num: { fr: 'OS interne', en: 'Internal OS' },
    prefix: 'La',
    nameEm: 'Fusée',
    name: 'LaFusée',
    desc: {
      fr: "Logiciel propriétaire qui automatise ADVE/RTIS pour piloter une industrie créative — brief, arbitrage, livrable, roadmap dynamique.",
      en: 'Proprietary software that automates ADVE/RTIS to run a creative industry — brief, arbitration, deliverable, dynamic roadmap.',
    },
  },
  {
    num: { fr: 'Réseau', en: 'Network' },
    prefix: 'La ',
    nameEm: 'Guilde',
    name: 'La Guilde',
    desc: {
      fr: "Le réseau UPgraders : freelances et agences partenaires. Stephane Nounamo (photographe), Annick (illustratrice), Paulhan (photographe), Xtincell (photo/vidéo/design), Friends Studio (production)… convocation à la mission.",
      en: 'The UPgraders network: freelancers and partner agencies. Stephane Nounamo (photographer), Annick (illustrator), Paulhan (photographer), Xtincell (photo/video/design), Friends Studio (production)… summoned per mission.',
    },
  },
  {
    num: { fr: 'Posture', en: 'Stance' },
    prefix: 'Culte de ',
    nameEm: 'marque',
    name: 'Culte de marque',
    desc: {
      fr: "L'IA booste la méthode — elle ne la remplace pas. La passion reste le propulseur. On construit des marques que les gens veulent suivre, pas seulement consommer.",
      en: 'AI boosts the method — it doesn’t replace it. Passion stays the propellant. We build brands people want to follow, not just consume.',
    },
  },
];
