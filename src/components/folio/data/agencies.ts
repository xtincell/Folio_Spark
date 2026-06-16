import type { Bi } from '@/lib/i18n';

export type AgencyEntry = {
  kind: Bi;
  desc: Bi;
  link?: string;
};

const upgradersEntry: AgencyEntry = {
  kind: { fr: 'Mon agence', en: 'My agency' },
  desc: {
    fr: "Cabinet de conseil &amp; stratégie créative fondé en 2017. Je suis CEO depuis le passage de relais d'Ingrid Nya Ngatchou et Jean-Philippe Veigne (co-fondateurs &amp; former CEOs).",
    en: 'Creative consulting &amp; strategy firm founded in 2017. I have been CEO since the handover from Ingrid Nya Ngatchou and Jean-Philippe Veigne (co-founders &amp; former CEOs).',
  },
  link: '/upgraders',
};

const imperialEntry: AgencyEntry = {
  kind: { fr: 'Agence de talents', en: 'Talent agency' },
  desc: {
    fr: "Agence de talents (artistes) dirigée par Esther Naah, qui me missionnait pour le catalogue Universal Music Africa Cameroun.",
    en: 'Talent agency (artists) led by Esther Naah, which commissioned me for the Universal Music Africa Cameroon roster.',
  },
};

export const AGENCY_INFO: Record<string, AgencyEntry> = {
  // Agences de l'écosystème Xtincell
  'Upgraders': upgradersEntry,
  'UPgraders': upgradersEntry,
  'Friends Studio': {
    kind: { fr: 'Cellule de production (La Guilde)', en: 'Production cell (La Guilde)' },
    desc: {
      fr: "Studio de production audiovisuel co-animé avec Stéphane Nounamo (photographe). Partenaire exécution privilégié d'UPgraders.",
      en: 'Audiovisual production studio co-run with Stéphane Nounamo (photographer). UPgraders’ preferred execution partner.',
    },
  },
  'MATANGA Agency': {
    kind: { fr: 'Agence-employeur', en: 'Employer agency' },
    desc: {
      fr: "Agence marketing où je suis Directeur Créatif &amp; Artistique depuis janvier 2025. Portefeuille : Friesland Campina, Ecobank RCA, Cadyst Group, LaPasta, Delys&Barka.",
      en: 'Marketing agency where I have been Creative &amp; Art Director since January 2025. Portfolio: Friesland Campina, Ecobank CAR, Cadyst Group, LaPasta, Delys&Barka.',
    },
  },
  'Imperial': imperialEntry,
  'Imperial (agence de talents)': imperialEntry,
  'Esther Naah': {
    kind: { fr: 'Directrice (Imperial)', en: 'Director (Imperial)' },
    desc: {
      fr: "Dirigeante de l'agence de talents Imperial, point d'entrée historique sur les missions UMA.",
      en: 'Head of the Imperial talent agency, the historical entry point to the UMA missions.',
    },
  },
  'Her Media': {
    kind: { fr: 'Agence relais', en: 'Relay agency' },
    desc: {
      fr: "Agence-relais qui me sous-traitait des prestations — souvent en marque blanche — pour ses clients (Moet, Port de Kribi, Kemcare…).",
      en: 'Relay agency that subcontracted work to me — often white-label — for its clients (Moët, Port of Kribi, Kemcare…).',
    },
  },
  'OmenKart': {
    kind: { fr: 'Agence relais', en: 'Relay agency' },
    desc: {
      fr: "Agence-relais qui me sous-traitait la production vidéo pour Cimencam et autres comptes corpo.",
      en: 'Relay agency that subcontracted video production to me for Cimencam and other corporate accounts.',
    },
  },
  'Bimstr': {
    kind: { fr: 'Agence relais', en: 'Relay agency' },
    desc: {
      fr: "Agence-relais qui m'a confié plusieurs prestations en marque blanche.",
      en: 'Relay agency that entrusted me with several white-label assignments.',
    },
  },
  'HoHaaa Music': {
    kind: { fr: 'Label', en: 'Label' },
    desc: {
      fr: "Label musical pour lequel j'ai réalisé le clip de l'artiste Retlaw — production Friends Studio × UPgraders.",
      en: 'Music label for which I directed artist Retlaw’s video — production Friends Studio × UPgraders.',
    },
  },
  'Publicis / McCann': {
    kind: { fr: 'Agences-clients', en: 'Client agencies' },
    desc: {
      fr: "Réseaux internationaux qui pilotaient le compte Orange Cameroun — ils nous missionnaient pour la couverture photo en marque blanche.",
      en: 'International networks running the Orange Cameroon account — they commissioned us for white-label photo coverage.',
    },
  },

  // Marques / clients finaux
  'MOTION19': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Distributeur de matériel audiovisuel en Afrique Centrale. Marque créée de A à Z par UPgraders sur 30 mois (2019–22).",
      en: 'Audiovisual gear distributor in Central Africa. Brand built end-to-end by UPgraders over 30 months (2019–22).',
    },
  },
  'Shakazz': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Plateforme crypto. UPgraders a piloté le lancement complet — naming, identité visuelle, premiers assets.",
      en: 'Crypto platform. UPgraders led the full launch — naming, visual identity, first assets.',
    },
  },
  'Studio44': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Lancement structuré d'un studio créatif (2024).",
      en: 'Structured launch of a creative studio (2024).',
    },
  },
  'KOF': {
    kind: { fr: 'Festival', en: 'Festival' },
    desc: {
      fr: "K-mer Otaku Festival — festival pop culture / mangas. Direction artistique depuis la 2ᵉ édition.",
      en: 'K-mer Otaku Festival — pop-culture / manga festival. Art direction since the 2nd edition.',
    },
  },
  'Akwa Palace': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Hôtel à Douala. Campagne vidéo publicitaire 2025 en production Friends Studio × UPgraders.",
      en: 'Hotel in Douala. 2025 video advertising campaign, produced by Friends Studio × UPgraders.',
    },
  },
  'Oceanis Kribi': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Résidence hôtelière à Kribi. Production de contenus vidéo pour The Villa.",
      en: 'Hotel residence in Kribi. Video content production for The Villa.',
    },
  },
  'Maison Gimane': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Joaillerie sur mesure. Production photo et vidéo produit, déclinaisons social media.",
      en: 'Bespoke jewellery. Product photo and video production, social-media variations.',
    },
  },
  'Chococam': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Confiserie majeure du Cameroun (Mambo, Tartina). Multi-projets photo / vidéo / reportage.",
      en: 'Major Cameroonian confectioner (Mambo, Tartina). Multi-project photo / video / reportage.',
    },
  },
  'Orange Cameroun': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Opérateur télécom. Couvertures photo de programmes : Orange Excellence, ANAFOOT, concerts, cinéma — via Publicis puis McCann.",
      en: 'Telecom operator. Photo coverage of programmes: Orange Excellence, ANAFOOT, concerts, cinema — via Publicis then McCann.',
    },
  },
  'Cimencam': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Cimentier référence du Cameroun. Vidéos corporate via OmenKart × Friends Studio.",
      en: 'Cameroon’s reference cement maker. Corporate videos via OmenKart × Friends Studio.',
    },
  },
  'UMA': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Universal Music Africa — catalogue Cameroun (Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul). Photo principale et DA via Imperial.",
      en: 'Universal Music Africa — Cameroon roster (Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul). Lead photography and art direction via Imperial.',
    },
  },
  'Retlaw': {
    kind: { fr: 'Artiste', en: 'Artist' },
    desc: {
      fr: "Artiste musical pour qui j'ai réalisé un clip via HoHaaa Music × Friends Studio × UPgraders.",
      en: 'Music artist for whom I directed a video via HoHaaa Music × Friends Studio × UPgraders.',
    },
  },
  'Kemcare': {
    kind: { fr: 'Marque cliente', en: 'Client brand' },
    desc: {
      fr: "Marque servie via Her Media.",
      en: 'Brand served via Her Media.',
    },
  },
};
