export type AgencyEntry = {
  kind: string;
  desc: string;
  link?: string;
};

export const AGENCY_INFO: Record<string, AgencyEntry> = {
  // Agences de l'écosystème Xtincell
  'Upgraders': {
    kind: 'Mon agence',
    desc:
      "Cabinet de conseil &amp; stratégie créative fondé en 2017. Je suis CEO depuis le passage de relais d'Ingrid Nya Ngatchou et Jean-Philippe Veigne (co-fondateurs &amp; former CEOs).",
    link: '/upgraders',
  },
  'UPgraders': {
    kind: 'Mon agence',
    desc:
      "Cabinet de conseil &amp; stratégie créative fondé en 2017. Je suis CEO depuis le passage de relais d'Ingrid Nya Ngatchou et Jean-Philippe Veigne (co-fondateurs &amp; former CEOs).",
    link: '/upgraders',
  },
  'Friends Studio': {
    kind: 'Cellule de production (La Guilde)',
    desc:
      "Studio de production audiovisuel co-animé avec Stéphane Nounamo (photographe). Partenaire exécution privilégié d'UPgraders.",
  },
  'MATANGA Agency': {
    kind: 'Agence-employeur',
    desc:
      "Agence marketing où je suis Directeur Créatif &amp; Artistique depuis janvier 2025. Portefeuille : Friesland Campina, Ecobank RCA, Cadyst Group, LaPasta, Delys&Barka.",
  },
  'Imperial': {
    kind: 'Agence de talents',
    desc:
      "Agence de talents (artistes) dirigée par Esther Naah, qui me missionnait pour le catalogue Universal Music Africa Cameroun.",
  },
  'Imperial (agence de talents)': {
    kind: 'Agence de talents',
    desc:
      "Agence de talents (artistes) dirigée par Esther Naah, qui me missionnait pour le catalogue Universal Music Africa Cameroun.",
  },
  'Esther Naah': {
    kind: 'Directrice (Imperial)',
    desc:
      "Dirigeante de l'agence de talents Imperial, point d'entrée historique sur les missions UMA.",
  },
  'Her Media': {
    kind: 'Agence relais',
    desc:
      "Agence-relais qui me sous-traitait des prestations — souvent en marque blanche — pour ses clients (Moet, Port de Kribi, Kemcare…).",
  },
  'OmenKart': {
    kind: 'Agence relais',
    desc:
      "Agence-relais qui me sous-traitait la production vidéo pour Cimencam et autres comptes corpo.",
  },
  'Bimstr': {
    kind: 'Agence relais',
    desc:
      "Agence-relais qui m'a confié plusieurs prestations en marque blanche.",
  },
  'HoHaaa Music': {
    kind: 'Label',
    desc:
      "Label musical pour lequel j'ai réalisé le clip de l'artiste Retlaw — production Friends Studio × UPgraders.",
  },
  'Publicis / McCann': {
    kind: 'Agences-clients',
    desc:
      "Réseaux internationaux qui pilotaient le compte Orange Cameroun — ils nous missionnaient pour la couverture photo en marque blanche.",
  },

  // Marques / clients finaux
  'MOTION19': {
    kind: 'Marque cliente',
    desc:
      "Distributeur de matériel audiovisuel en Afrique Centrale. Marque créée de A à Z par UPgraders sur 30 mois (2019–22).",
  },
  'Shakazz': {
    kind: 'Marque cliente',
    desc:
      "Plateforme crypto. UPgraders a piloté le lancement complet — naming, identité visuelle, premiers assets.",
  },
  'Studio44': {
    kind: 'Marque cliente',
    desc: "Lancement structuré d'un studio créatif (2024).",
  },
  'KOF': {
    kind: 'Festival',
    desc:
      "K-mer Otaku Festival — festival pop culture / mangas. Direction artistique depuis la 2ᵉ édition.",
  },
  'Akwa Palace': {
    kind: 'Marque cliente',
    desc:
      "Hôtel à Douala. Campagne vidéo publicitaire 2025 en production Friends Studio × UPgraders.",
  },
  'Oceanis Kribi': {
    kind: 'Marque cliente',
    desc:
      "Résidence hôtelière à Kribi. Production de contenus vidéo pour The Villa.",
  },
  'Maison Gimane': {
    kind: 'Marque cliente',
    desc:
      "Joaillerie sur mesure. Production photo et vidéo produit, déclinaisons social media.",
  },
  'Chococam': {
    kind: 'Marque cliente',
    desc:
      "Confiserie majeure du Cameroun (Mambo, Tartina). Multi-projets photo / vidéo / reportage.",
  },
  'Orange Cameroun': {
    kind: 'Marque cliente',
    desc:
      "Opérateur télécom. Couvertures photo de programmes : Orange Excellence, ANAFOOT, concerts, cinéma — via Publicis puis McCann.",
  },
  'Cimencam': {
    kind: 'Marque cliente',
    desc:
      "Cimentier référence du Cameroun. Vidéos corporate via OmenKart × Friends Studio.",
  },
  'UMA': {
    kind: 'Marque cliente',
    desc:
      "Universal Music Africa — catalogue Cameroun (Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul). Photo principale et DA via Imperial.",
  },
  'Retlaw': {
    kind: 'Artiste',
    desc:
      "Artiste musical pour qui j'ai réalisé un clip via HoHaaa Music × Friends Studio × UPgraders.",
  },
  'Kemcare': {
    kind: 'Marque cliente',
    desc: "Marque servie via Her Media.",
  },
};
