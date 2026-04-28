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
      },
      {
        name: 'UPGRADERS',
        chain: ['Upgraders'],
        meta: '2020 — présent',
        role: 'Fondateur · CEO',
        body:
          "Voir le bloc dédié ci-dessus. Mon agence-laboratoire — marketing digital, IA, OS interne. Signature : #ToTheNextLevel · #UPyourBrand.",
        tags: ['Studio', 'OS interne', 'IA'],
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
      },
      {
        name: 'KOF — K-mer Otaku Festival',
        chain: ['KOF', 'Upgraders'],
        meta: '1ʳᵉ → 3ᵉ édition (août 2024)',
        role: 'Directeur Artistique (depuis la 2ᵉ)',
        body:
          "Festival pop-culture (manga, cosplay, gaming, BD) — Yaoundé. Photo de la 1ʳᵉ édition, puis DA à partir de la 2ᵉ. 3ᵉ édition : Musée National + Mairie 6ᵉ, 5 000 billets, partenaires Infinix, Zebra Comics.",
        tags: ['Festival', 'Identité visuelle', 'Pop culture'],
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
      },
      {
        name: 'CHOCOCAM',
        chain: ['Chococam', 'Upgraders'],
        meta: 'multi-projets',
        role: 'Photo · Vidéo · Reportage',
        body:
          "Couverture Défilé 8 mars (Benny), interviews vox pop, 2 épisodes pilotes & reportage journée fun (Big Gum), Fête des Mères (Tartina, Matinal), capsules santé Chococam, 1ᵉʳ Mai (Tiger Brand), Saint-Valentin & shooting produit (Mambo).",
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
      },
      {
        name: 'MAISON MOËT & CHANDON',
        chain: ['Maison Moët & Chandon', 'Her Media'],
        meta: '2024',
        role: 'Assets visuels & coordination',
        body:
          "Maison Moët & Moët Grand Day — toast pan-africain simultané dans 8 pays. Gestion des assets visuels et coordination d'équipe pour le volet Cameroun, sous Leila Kigha (Her Media).",
        tags: ['Luxe', 'Événementiel', 'Pan-Afrique'],
      },
      {
        name: 'OMENKART — marque blanche',
        chain: ['OmenKart'],
        meta: '2022 — 2024',
        role: 'DA déléguée',
        body:
          "Collaboration en marque blanche avec l'agence pan-africaine de Diane Audrey Ngako (Douala · Abidjan · Cotonou). Capsules Diaspoassur, Douala Digital Show, événement Ambitieuse.",
        tags: ['Diaspoassur', 'DDS', 'Ambitieuse'],
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
