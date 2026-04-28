export type Pillar = {
  k: string;
  t: string;
  d: string;
};

export const MANIFESTO_PILLARS: Pillar[] = [
  {
    k: 'TOOLSMITH',
    t: 'Je construis mes outils',
    d: "OS interne piloté par IA pour automatiser la méthode ADVE/RTIS — LaFusée (UPgraders).",
  },
  {
    k: 'STRATÈGE',
    t: 'Je code la conversion',
    d: "Méthode ADVE/RTIS : socle ADVE (Authenticité, Distinction, Valeur, Engagement) + propulseur RTIS (Risk, Track, Innovation, Stratégie).",
  },
  {
    k: 'ARTISAN',
    t: "Je tiens l'objectif",
    d: "Photographie & direction artistique pour artistes et marques premium.",
  },
  {
    k: 'ARCHITECTE',
    t: "Je dessine l'infrastructure",
    d: "Systèmes de vente, hubs audiovisuels, écosystèmes d'engagement.",
  },
];

export type UpgPillar = {
  num: string;
  name: string;
  nameEm?: string;
  prefix?: string;
  suffix?: string;
  desc: string; // may contain HTML
};

export const UPGRADERS_PILLARS: UpgPillar[] = [
  {
    num: 'Méthode',
    prefix: 'ADVE',
    nameEm: '/RTIS',
    name: 'ADVE/RTIS',
    desc:
      "<b>Socle ADVE</b> : Authenticité · Distinction · Valeur · Engagement.<br /><b>Propulseur RTIS</b> : Risk · Track · Innovation · Stratégie.<br />IP UPgraders.",
  },
  {
    num: 'OS interne',
    prefix: 'La',
    nameEm: 'Fusée',
    name: 'LaFusée',
    desc:
      "Logiciel propriétaire qui automatise ADVE/RTIS pour piloter une industrie créative — brief, arbitrage, livrable, roadmap dynamique.",
  },
  {
    num: 'Réseau',
    prefix: 'La ',
    nameEm: 'Guilde',
    name: 'La Guilde',
    desc:
      "Le réseau UPgraders : freelances et agences partenaires. Stephane Nounamo (photographe), Annick (illustratrice), Paulhan (photographe), Xtincell (photo/vidéo/design), Friends Studio (production)… convocation à la mission.",
  },
  {
    num: 'Posture',
    prefix: 'Culte de ',
    nameEm: 'marque',
    name: 'Culte de marque',
    desc:
      "L'IA booste la méthode — elle ne la remplace pas. La passion reste le propulseur. On construit des marques que les gens veulent suivre, pas seulement consommer.",
  },
];
