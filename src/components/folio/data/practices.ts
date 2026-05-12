export type ProofHost = 'YouTube' | 'Facebook' | 'Instagram' | string;

export type Proof = {
  label: string;
  host: ProofHost;
  url: string;
};

export type Project = {
  name: string;
  chain: string[];
  meta: string;
  role: string;
  body: string;
  tags: string[];
  proofs?: Proof[];
  images?: string[];
};

export type Practice = {
  code: string;
  title: string;
  sub: string;
  intent: string;
  color: string;
  projects: Project[];
};

export const PRACTICES: Practice[] = [
  {
    code: 'P·01',
    title: 'La Stratégie',
    sub: 'Création de marque, étude de marché, lancement.',
    intent:
      "Là où d'autres voient des couleurs, je vois des flux. Avant de dessiner, je positionne, je nomme, je construis la trajectoire.",
    color: 'oklch(0.78 0.14 55)',
    projects: [
      {
        name: 'MOTION19',
        chain: ['MOTION19', 'Upgraders'],
        meta: '2019 — 2022 · Douala',
        role: 'Chef de projet · Directeur marketing',
        body:
          "Projet créé de A à Z par Upgraders sur 30 mois. Architecture du système de vente (Shopify × Quanta Hive), construction de l'équipe (7 personnes), lancement du programme communautaire « Aventurier » (#feelfreetocreate). Positionnement : leader du matériel audiovisuel en Afrique Centrale.",
        tags: ['Brand build', 'Go-to-market', 'E-commerce', 'Community'],
        images: [
          '/work/historique/07-motion19-historique/07-motion19-historique-01.jpg',
          '/work/historique/07-motion19-historique/07-motion19-historique-02.jpg',
          '/work/historique/07-motion19-historique/07-motion19-historique-03.jpg',
          '/work/historique/07-motion19-historique/07-motion19-historique-04.jpg',
          '/work/historique/07-motion19-historique/07-motion19-historique-05.jpg',
          '/work/historique/07-motion19-historique/07-motion19-historique-06.jpg',
        ],
      },
      {
        name: 'SHAKAZZ',
        chain: ['Shakazz', 'Upgraders'],
        meta: 'Lancement de marque · crypto',
        role: 'Stratégie de marque · DA',
        body:
          "Lancement complet de Shakazz — plateforme crypto — du positionnement à la direction artistique. Naming, identité visuelle, premiers assets de communication, code esthétique adapté à un public web3.",
        tags: ['Crypto', 'Lancement', 'Naming', 'DA'],
      },
      {
        name: 'STUDIO44',
        chain: ['Studio44', 'Upgraders'],
        meta: '2024',
        role: 'Lancement structuré',
        body:
          "Lancement complet d'un nouveau studio en 3 mois — cadre, identité, opérations. Mandat express, livraison contrainte.",
        tags: ['Lancement express', 'Naming', 'Setup'],
      },
      {
        name: 'KEMCARE',
        chain: ['Kemcare', 'Her Media'],
        meta: 'depuis 2021 · Douala',
        role: 'Stratégie de marque & lancement',
        body:
          "Marque haircare 100% Cameroun pour cheveux crépus — « Preserve our HAIRITAGE ». Positionnement produit, mise en marché, identité — opéré via Her Media.",
        tags: ['Lancement', 'DNA', 'FMCG'],
        images: [
          '/work/tier23/kemcare-haircare/kemcare-haircare-01.jpg',
          '/work/tier23/kemcare-haircare/kemcare-haircare-02.jpg',
          '/work/tier23/kemcare-haircare/kemcare-haircare-03.jpg',
          '/work/tier23/kemcare-haircare/kemcare-haircare-04.jpg',
          '/work/tier23/kemcare-haircare/kemcare-haircare-05.jpg',
        ],
      },
      {
        name: 'UPGRADERS',
        chain: ['Upgraders'],
        meta: '2020 — présent',
        role: 'Fondateur · CEO',
        body:
          "Voir le bloc dédié ci-dessus. Mon agence-laboratoire — marketing digital, IA, OS interne. Signature : #ToTheNextLevel · #UPyourBrand.",
        tags: ['Studio', 'OS interne', 'IA'],
        images: [
          '/work/historique/01-upgraders-agency/01-upgraders-agency-01.jpg',
          '/work/historique/01-upgraders-agency/01-upgraders-agency-02.jpg',
          '/work/historique/01-upgraders-agency/01-upgraders-agency-03.jpg',
          '/work/historique/01-upgraders-agency/01-upgraders-agency-04.jpg',
          '/work/historique/01-upgraders-agency/01-upgraders-agency-05.jpg',
          '/work/historique/01-upgraders-agency/01-upgraders-agency-06.jpg',
        ],
      },
    ],
  },
  {
    code: 'P·02',
    title: 'Direction Créative & Artistique',
    sub: 'Management de créatifs & direction artistique.',
    intent:
      "Standardiser un Premium Visual Storytelling. Tenir la cohérence à travers les artistes, les marques, les territoires. Diriger sans étouffer.",
    color: 'oklch(0.86 0.05 80)',
    projects: [
      {
        name: 'MATANGA AGENCY',
        chain: ['MATANGA Agency'],
        meta: 'janvier 2025 — présent',
        role: 'Directeur Créatif & Artistique',
        body:
          "DC&A grands comptes FMCG et institutionnels : Friesland Campina (Bonnet Rouge, Peak, Omela), Ecobank RCA, Cadyst Group (Cadyst Grain / Panzani, LaPasta — First, Foodies, Gold —, Delys & Barka). Vision globale, pilotage des productions, cohérence inter-marques.",
        tags: ['Friesland Campina', 'Ecobank RCA', 'Cadyst', 'LaPasta', 'Delys & Barka'],
        images: [
          '/work/peak/peak-02.jpg',
          '/work/bonnet-rouge/bonnet-rouge-01.jpg',
          '/work/omela/omela-01.jpg',
          '/work/panzani/panzani-01.png',
          '/work/peak/peak-03.jpg',
          '/work/bonnet-rouge/bonnet-rouge-03.jpg',
          '/work/omela/omela-03.jpg',
          '/work/peak/peak-05.jpg',
        ],
      },
      {
        name: 'RETLAW × HoHaaa Music',
        chain: ['HoHaaa Music', 'Friends Studio', 'Upgraders'],
        meta: 'Clip artiste',
        role: 'Réalisation · Direction',
        body:
          "Réalisation du clip de l'artiste Retlaw pour le label HoHaaa Music — production Friends Studio × Upgraders. Direction artistique, mise en scène, image.",
        tags: ['Music video', 'Réalisation', 'Label'],
        proofs: [
          { label: 'Retlaw — clip officiel', host: 'YouTube', url: 'https://www.youtube.com/watch?v=zzDH4OVrUMM' },
        ],
      },
      {
        name: 'UNIVERSAL MUSIC AFRICA',
        chain: ['UMA', 'Imperial (agence de talents)', 'Esther Naah'],
        meta: '2018 — 2022',
        role: 'Photographe principal & DA',
        body:
          "Mission via Imperial — agence de talents dirigée par Esther Naah — pour le catalogue UMA Cameroun : Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul. Direction artistique et portrait : standardiser une iconographie exportable hors du Cameroun.",
        tags: ['Locko', 'Mimie', 'Charlotte Dipanda', 'Singuila', 'Cysoul'],
        images: [
          '/work/tier23/locko-uma/locko-uma-01.jpg',
          '/work/tier23/charlotte-dipanda-uma/charlotte-dipanda-uma-01.jpg',
          '/work/historique/16-music-covers/16-music-covers-01.jpg',
          '/work/historique/16-music-covers/16-music-covers-02.jpg',
          '/work/historique/16-music-covers/16-music-covers-03.jpg',
          '/work/historique/16-music-covers/16-music-covers-04.jpg',
        ],
      },
      {
        name: 'KOF — K-mer Otaku Festival',
        chain: ['KOF', 'Upgraders'],
        meta: '1ʳᵉ → 5ᵉ édition · DA depuis la 2ᵉ · Yaoundé',
        role: 'Photographe (édition 1) · Directeur Artistique (depuis la 2ᵉ)',
        body:
          "Festival pop-culture (manga, cosplay, gaming, BD) — première institution camerounaise du genre. Édition 3 (août 2024) : Musée National + Mairie 6ᵉ, ~5 000 billets, partenaires Infinix, Zebra Comics, Otakutique, Insomnia Game Zone. Direction visuelle continue depuis 2021 : identité festival, communication, scénographie, captation événementielle.",
        tags: ['Festival', 'Identité visuelle', 'Pop culture', 'Scénographie'],
        images: [
          '/work/historique/05-kof-da-historique/05-kof-da-historique-01.jpg',
          '/work/historique/05-kof-da-historique/05-kof-da-historique-02.jpg',
          '/work/historique/05-kof-da-historique/05-kof-da-historique-03.jpg',
          '/work/historique/05-kof-da-historique/05-kof-da-historique-04.jpg',
          '/work/historique/05-kof-da-historique/05-kof-da-historique-05.jpg',
          '/work/historique/06-kof-photographie/06-kof-photographie-01.jpg',
        ],
      },
      {
        name: 'BIMSTR AGENCY',
        chain: ['Bimstr Agency'],
        meta: '2018 — 2020',
        role: 'Directeur Créatif & Artistique',
        body:
          "Direction de la production événementielle et photographique pour personnalités publiques. Premier contact avec Chococam.",
        tags: ['Événementiel', 'Portraits VIP', 'Agence'],
      },
      {
        name: 'TOP — Brasseries du Cameroun (SABC)',
        chain: ['Top', 'Boissons du Cameroun (SABC)'],
        meta: '2020 — 2022 · Douala',
        role: 'Direction Artistique & Production',
        body:
          "Période de la « bataille des limonades » au Cameroun (Top vs Bubble Up vs Spécial limonade) — lancement Top Bitter Lemon (oct. 2020), activations marque, contenus social et événementiel. Travail sur l'écosystème SABC à un moment-clé pour la franchise Top.",
        tags: ['FMCG', 'Boisson', 'Top Bitter Lemon', 'Activation', 'Social'],
        proofs: [
          { label: 'SABC · Boissons du Cameroun', host: 'Facebook', url: 'https://www.facebook.com/boissonsducameroun/' },
          { label: 'SABC · YouTube', host: 'YouTube', url: 'https://www.youtube.com/@BoissonsduCameroun' },
        ],
        images: [
          '/work/top-brasseries/top-brasseries-01.jpg',
          '/work/top-brasseries/top-brasseries-02.jpg',
          '/work/top-brasseries/top-brasseries-03.jpg',
          '/work/top-brasseries/top-brasseries-04.webp',
          '/work/top-brasseries/top-brasseries-05.jpg',
          '/work/top-brasseries/top-brasseries-06.jpg',
        ],
      },
    ],
  },
  {
    code: 'P·03',
    title: "L'Exécution",
    sub: 'Conception graphique, photographie, vidéographie.',
    intent:
      "Au bout du processus, il faut livrer. Image fixe, image en mouvement, design — la main tient toujours l'outil.",
    color: 'oklch(0.78 0.10 250)',
    projects: [
      {
        name: 'AKWA PALACE',
        chain: ['Akwa Palace', 'Friends Studio', 'Upgraders'],
        meta: '2025',
        role: 'Réalisation video advertising',
        body:
          "Campagne vidéo publicitaire pour l'hôtel Akwa Palace (Douala). Direction d'image, captation, montage, livrables multi-formats — production Friends Studio × Upgraders.",
        tags: ['Vidéo', 'Hospitality', 'Advertising'],
        images: [
          '/work/tier23/akwa-palace-2025/akwa-palace-2025-03.jpg',
          '/work/tier23/akwa-palace-2025/akwa-palace-2025-01.jpg',
          '/work/tier23/akwa-palace-2025/akwa-palace-2025-02.jpg',
        ],
      },
      {
        name: 'OCEANIS KRIBI · The Villa',
        chain: ['Oceanis Kribi', 'Friends Studio', 'Upgraders'],
        meta: '2024',
        role: 'Production vidéo & image',
        body:
          "Production de contenus visuels pour Oceanis Kribi — The Villa (resort balnéaire). Direction d'image, vidéo, captation lifestyle.",
        tags: ['Hospitality', 'Lifestyle', 'Vidéo'],
        proofs: [
          { label: 'The Villa — reel', host: 'Instagram', url: 'https://www.instagram.com/oceanis.kribi_thevilla/reel/DCDvHugiZk1/' },
        ],
      },
      {
        name: 'MAISON GIMANE',
        chain: ['Maison Gimane', 'Friends Studio', 'Upgraders'],
        meta: '2024',
        role: 'Production photo & vidéo',
        body:
          "Joaillerie sur mesure — production de contenus visuels pour la marque. Direction d'image produit, captation, déclinaisons social media. Friends Studio × Upgraders.",
        tags: ['Joaillerie', 'Produit', 'Luxe'],
        proofs: [
          { label: 'Maison Gimane — reel 01', host: 'Instagram', url: 'https://www.instagram.com/reel/DCq0JzONAnZ/' },
          { label: 'Maison Gimane — reel 02', host: 'Instagram', url: 'https://www.instagram.com/reel/DCRwIDFNj-C/' },
        ],
        images: [
          '/work/tier23/maison-gimane-2024/maison-gimane-2024-01.jpg',
          '/work/tier23/maison-gimane-2024/maison-gimane-2024-02.jpg',
          '/work/tier23/maison-gimane-2024/maison-gimane-2024-03.jpg',
          '/work/tier23/maison-gimane-2024/maison-gimane-2024-04.jpg',
          '/work/tier23/maison-gimane-2024/maison-gimane-2024-05.jpg',
          '/work/tier23/maison-gimane-2024/maison-gimane-2024-06.jpg',
        ],
      },
      {
        name: 'CHOCOCAM',
        chain: ['Chococam', 'Tiger Brands', 'Upgraders'],
        meta: 'Tiger Brands · multi-marques · multi-projets',
        role: 'Photo · Vidéo · Reportage',
        body:
          "Couverture éditoriale sur l'ensemble du portefeuille Tiger Brands au Cameroun (6 marques) : Benny (Défilé 8 mars, vox pop), Big Gum (2 épisodes pilotes show, reportage journée fun), Tartina (Fête des Mères, descente terrain), Matinal (Fête des Mères), Mambo (Saint-Valentin, shooting produit 3 références), Tiger Brand (1ᵉʳ Mai), Chococam ombrelle (capsules santé). Premier point d'entrée historique via Bimstr Agency (2018-2020), puis continuité directe via UPgraders.",
        images: [
          '/work/chococam/chococam-01.webp',
          '/work/chococam/chococam-02.webp',
          '/work/chococam/chococam-03.webp',
          '/work/chococam/chococam-04.webp',
          '/work/chococam/chococam-05.jpg',
          '/work/chococam/chococam-06.webp',
        ],
        tags: ['Benny', 'Big Gum', 'Tartina', 'Matinal', 'Mambo', 'Tiger Brand'],
        proofs: [
          { label: 'Tartina · Fête des Mères', host: 'Facebook', url: 'https://www.facebook.com/TartinaSpreads/videos/1085336389065869/' },
          { label: 'Chococam · capsule', host: 'YouTube', url: 'https://www.youtube.com/watch?v=kVdl0igH3ws' },
          { label: 'Chococam · capsule', host: 'YouTube', url: 'https://www.youtube.com/watch?v=EcWcME1xddY' },
          { label: 'Benny · Défilé 8 mars', host: 'Facebook', url: 'https://www.facebook.com/BennySeasoning/videos/1501074026953556/' },
        ],
      },
      {
        name: 'ORANGE Cameroun',
        chain: ['Orange Cameroun', 'Publicis / McCann', 'Friends Studio', 'Upgraders'],
        meta: 'Marque blanche',
        role: 'Photographie événementielle',
        body:
          "En binôme avec Stéphane Nounamo (Friends Studio × Upgraders), via Publicis puis McCann. Couverture Orange Excellence (bourses des 30 meilleurs bacheliers), ANAFOOT (académie de foot des jeunes talents), première Indomptable, concert Mimie.",
        tags: ['Orange Excellence', 'ANAFOOT', 'Concerts', 'Cinéma'],
      },
      {
        name: 'CIMENCAM',
        chain: ['Cimencam', 'OmenKart', 'Friends Studio', 'Upgraders'],
        meta: '2023 — 2024',
        role: 'Vidéo corporate',
        body:
          "Discours de début d'année du directeur, vidéo 8 mars 2023 en portrait croisé. Cimenteries du Cameroun — 60 ans d'histoire, 55% de part de marché. Mandat en marque blanche via OmenKart.",
        tags: ['Corporate', 'Portrait croisé', 'Vidéo'],
      },
      {
        name: 'PORT AUTONOME DE KRIBI',
        chain: ['Port Autonome de Kribi', 'Her Media'],
        meta: 'Octobre Rose',
        role: 'DA & Exécution',
        body:
          "Direction artistique et exécution des contenus de la campagne Octobre Rose pour le Port Autonome de Kribi — opéré via Her Media.",
        tags: ['Institutionnel', 'Octobre Rose', 'Campagne'],
        images: [
          '/work/tier23/port-autonome-kribi/port-autonome-kribi-01.jpg',
          '/work/tier23/port-autonome-kribi/port-autonome-kribi-02.jpg',
          '/work/tier23/port-autonome-kribi/port-autonome-kribi-03.jpg',
          '/work/tier23/port-autonome-kribi/port-autonome-kribi-04.jpg',
          '/work/tier23/port-autonome-kribi/port-autonome-kribi-05.jpg',
          '/work/tier23/port-autonome-kribi/port-autonome-kribi-07.jpg',
        ],
      },
      {
        name: 'MAISON MOËT & CHANDON',
        chain: ['Maison Moët & Chandon', 'Her Media (Leila Kigha)'],
        meta: '2024 · Moët Grand Day · volet Cameroun',
        role: 'Gestion des assets visuels & coordination d\'équipe',
        body:
          "Moët Grand Day — toast pan-africain simultané dans 8 pays africains, célébration élégance et champagne. Volet Cameroun coordonné via Her Media (Leila Kigha) : assets visuels, équipe terrain, livrables synchronisés avec les autres territoires. Événement luxe high-stakes (célébrités, dignitaires, influenceurs), délivrables compatibles standards Moët international.",
        tags: ['Luxe', 'Événementiel', 'Pan-Afrique', 'Champagne', 'Coordination'],
      },
      {
        name: 'OMENKART — marque blanche',
        chain: ['OmenKart'],
        meta: '2022 — 2024',
        role: 'DA déléguée',
        body:
          "Collaboration en marque blanche avec l'agence pan-africaine de Diane Audrey Ngako (Douala · Abidjan · Cotonou). Cimencam (8 mars 2023 portrait croisé, mot de nouvel an du Directeur), Riz Même Cassé (film publicitaire), Diaspoassur (plusieurs capsules vidéo), Douala Digital Show, événement Ambitieuse.",
        tags: ['Cimencam', 'Riz Même Cassé', 'Diaspoassur', 'DDS', 'Ambitieuse'],
        images: [
          '/work/tier23/omenkart-clients/omenkart-clients-01.jpg',
          '/work/tier23/omenkart-clients/omenkart-clients-02.jpg',
          '/work/tier23/omenkart-clients/omenkart-clients-03.jpg',
          '/work/tier23/omenkart-clients/omenkart-clients-04.jpg',
          '/work/tier23/omenkart-clients/omenkart-clients-05.jpg',
        ],
      },
      {
        name: 'SELLKAKO · WILL&BROTHERS',
        chain: ['Sellkako / Will&Brothers'],
        meta: '2017 — 2019',
        role: 'Lead Designer · Business Developer',
        body:
          "Premières années en agence : design lead, puis développement business. Fondations méthodiques, blog GeekDeBrousse en parallèle (guides photo, tests matériel).",
        tags: ['Design', 'Agence', 'Fondations'],
      },
    ],
  },
];
