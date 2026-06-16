import type { Bi } from '@/lib/i18n';

export type ProofHost = 'YouTube' | 'Facebook' | 'Instagram' | string;

export type Proof = {
  label: Bi;
  host: ProofHost;
  url: string;
};

export type Project = {
  name: string;
  chain: string[];
  meta: Bi;
  role: Bi;
  body: Bi;
  tags: string[];
  proofs?: Proof[];
};

export type Practice = {
  code: string;
  title: Bi;
  sub: Bi;
  intent: Bi;
  color: string;
  projects: Project[];
};

export const PRACTICES: Practice[] = [
  {
    code: 'P·01',
    title: { fr: 'La Stratégie', en: 'The Strategy' },
    sub: {
      fr: 'Création de marque, étude de marché, lancement.',
      en: 'Brand creation, market study, launch.',
    },
    intent: {
      fr: "Là où d'autres voient des couleurs, je vois des flux. Avant de dessiner, je positionne, je nomme, je construis la trajectoire.",
      en: 'Where others see colours, I see flows. Before drawing, I position, I name, I build the trajectory.',
    },
    color: 'oklch(0.78 0.14 55)',
    projects: [
      {
        name: 'MOTION19',
        chain: ['MOTION19', 'Upgraders'],
        meta: { fr: '2019 — 2022 · Douala', en: '2019 — 2022 · Douala' },
        role: {
          fr: 'Chef de projet · Directeur marketing',
          en: 'Project lead · Marketing director',
        },
        body: {
          fr: "Projet créé de A à Z par Upgraders sur 30 mois. Architecture du système de vente (Shopify × Quanta Hive), construction de l'équipe (7 personnes), lancement du programme communautaire « Aventurier » (#feelfreetocreate). Positionnement : leader du matériel audiovisuel en Afrique Centrale.",
          en: 'Project built end-to-end by Upgraders over 30 months. Architecture of the sales system (Shopify × Quanta Hive), team build (7 people), launch of the “Aventurier” community programme (#feelfreetocreate). Positioning: leader in audiovisual gear in Central Africa.',
        },
        tags: ['Brand build', 'Go-to-market', 'E-commerce', 'Community'],
      },
      {
        name: 'SHAKAZZ',
        chain: ['Shakazz', 'Upgraders'],
        meta: { fr: 'Lancement de marque · crypto', en: 'Brand launch · crypto' },
        role: { fr: 'Stratégie de marque · DA', en: 'Brand strategy · art direction' },
        body: {
          fr: "Lancement complet de Shakazz — plateforme crypto — du positionnement à la direction artistique. Naming, identité visuelle, premiers assets de communication, code esthétique adapté à un public web3.",
          en: 'Full launch of Shakazz — a crypto platform — from positioning to art direction. Naming, visual identity, first communication assets, an aesthetic code tuned to a web3 audience.',
        },
        tags: ['Crypto', 'Lancement', 'Naming', 'DA'],
      },
      {
        name: 'STUDIO44',
        chain: ['Studio44', 'Upgraders'],
        meta: { fr: '2024', en: '2024' },
        role: { fr: 'Lancement structuré', en: 'Structured launch' },
        body: {
          fr: "Lancement complet d'un nouveau studio en 3 mois — cadre, identité, opérations. Mandat express, livraison contrainte.",
          en: 'Full launch of a new studio in 3 months — framework, identity, operations. Express mandate, tight delivery.',
        },
        tags: ['Lancement express', 'Naming', 'Setup'],
      },
      {
        name: 'KEMCARE',
        chain: ['Kemcare', 'Her Media'],
        meta: { fr: 'depuis 2021 · Douala', en: 'since 2021 · Douala' },
        role: { fr: 'Stratégie de marque & lancement', en: 'Brand strategy & launch' },
        body: {
          fr: "Marque haircare 100% Cameroun pour cheveux crépus — « Preserve our HAIRITAGE ». Positionnement produit, mise en marché, identité — opéré via Her Media.",
          en: 'A 100% Cameroonian haircare brand for kinky hair — “Preserve our HAIRITAGE”. Product positioning, go-to-market, identity — operated via Her Media.',
        },
        tags: ['Lancement', 'DNA', 'FMCG'],
      },
      {
        name: 'UPGRADERS',
        chain: ['Upgraders'],
        meta: { fr: '2020 — présent', en: '2020 — present' },
        role: { fr: 'Fondateur · CEO', en: 'Founder · CEO' },
        body: {
          fr: "Voir le bloc dédié ci-dessus. Mon agence-laboratoire — marketing digital, IA, OS interne. Signature : #ToTheNextLevel · #UPyourBrand.",
          en: 'See the dedicated block above. My lab-agency — digital marketing, AI, internal OS. Signature: #ToTheNextLevel · #UPyourBrand.',
        },
        tags: ['Studio', 'OS interne', 'IA'],
      },
    ],
  },
  {
    code: 'P·02',
    title: { fr: 'Direction Créative & Artistique', en: 'Creative & Art Direction' },
    sub: {
      fr: 'Management de créatifs & direction artistique.',
      en: 'Creative management & art direction.',
    },
    intent: {
      fr: "Standardiser un Premium Visual Storytelling. Tenir la cohérence à travers les artistes, les marques, les territoires. Diriger sans étouffer.",
      en: 'Standardise a Premium Visual Storytelling. Hold coherence across artists, brands and territories. Direct without smothering.',
    },
    color: 'oklch(0.86 0.05 80)',
    projects: [
      {
        name: 'MATANGA AGENCY',
        chain: ['MATANGA Agency'],
        meta: { fr: 'janvier 2025 — présent', en: 'January 2025 — present' },
        role: { fr: 'Directeur Créatif & Artistique', en: 'Creative & Art Director' },
        body: {
          fr: "DC&A grands comptes FMCG et institutionnels : Friesland Campina (Bonnet Rouge, Peak, Omela), Ecobank RCA, Cadyst Group (Cadyst Grain / Panzani, LaPasta — First, Foodies, Gold —, Delys & Barka). Vision globale, pilotage des productions, cohérence inter-marques.",
          en: 'Creative & art direction for major FMCG and institutional accounts: Friesland Campina (Bonnet Rouge, Peak, Omela), Ecobank CAR, Cadyst Group (Cadyst Grain / Panzani, LaPasta — First, Foodies, Gold —, Delys & Barka). Global vision, production oversight, cross-brand coherence.',
        },
        tags: ['Friesland Campina', 'Ecobank RCA', 'Cadyst', 'LaPasta', 'Delys & Barka'],
      },
      {
        name: 'RETLAW × HoHaaa Music',
        chain: ['HoHaaa Music', 'Friends Studio', 'Upgraders'],
        meta: { fr: 'Clip artiste', en: 'Artist music video' },
        role: { fr: 'Réalisation · Direction', en: 'Directing · Direction' },
        body: {
          fr: "Réalisation du clip de l'artiste Retlaw pour le label HoHaaa Music — production Friends Studio × Upgraders. Direction artistique, mise en scène, image.",
          en: 'Directing the music video for artist Retlaw for the HoHaaa Music label — production Friends Studio × Upgraders. Art direction, staging, image.',
        },
        tags: ['Music video', 'Réalisation', 'Label'],
        proofs: [
          {
            label: { fr: 'Retlaw — clip officiel', en: 'Retlaw — official video' },
            host: 'YouTube',
            url: 'https://www.youtube.com/watch?v=zzDH4OVrUMM',
          },
        ],
      },
      {
        name: 'UNIVERSAL MUSIC AFRICA',
        chain: ['UMA', 'Imperial (agence de talents)', 'Esther Naah'],
        meta: { fr: '2018 — 2022', en: '2018 — 2022' },
        role: { fr: 'Photographe principal & DA', en: 'Lead photographer & art director' },
        body: {
          fr: "Mission via Imperial — agence de talents dirigée par Esther Naah — pour le catalogue UMA Cameroun : Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul. Direction artistique et portrait : standardiser une iconographie exportable hors du Cameroun.",
          en: 'Commissioned via Imperial — the talent agency led by Esther Naah — for the UMA Cameroon roster: Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul. Art direction and portraiture: standardising an iconography exportable beyond Cameroon.',
        },
        tags: ['Locko', 'Mimie', 'Charlotte Dipanda', 'Singuila', 'Cysoul'],
      },
      {
        name: 'KOF — K-mer Otaku Festival',
        chain: ['KOF', 'Upgraders'],
        meta: { fr: '1ʳᵉ → 3ᵉ édition (août 2024)', en: '1st → 3rd edition (Aug. 2024)' },
        role: { fr: 'Directeur Artistique (depuis la 2ᵉ)', en: 'Art Director (since the 2nd)' },
        body: {
          fr: "Festival pop-culture (manga, cosplay, gaming, BD) — Yaoundé. Photo de la 1ʳᵉ édition, puis DA à partir de la 2ᵉ. 3ᵉ édition : Musée National + Mairie 6ᵉ, 5 000 billets, partenaires Infinix, Zebra Comics.",
          en: 'Pop-culture festival (manga, cosplay, gaming, comics) — Yaoundé. Photography for the 1st edition, then art direction from the 2nd. 3rd edition: National Museum + 6th District Hall, 5,000 tickets, partners Infinix, Zebra Comics.',
        },
        tags: ['Festival', 'Identité visuelle', 'Pop culture'],
      },
      {
        name: 'BIMSTR AGENCY',
        chain: ['Bimstr Agency'],
        meta: { fr: '2018 — 2020', en: '2018 — 2020' },
        role: { fr: 'Directeur Créatif & Artistique', en: 'Creative & Art Director' },
        body: {
          fr: "Direction de la production événementielle et photographique pour personnalités publiques. Premier contact avec Chococam.",
          en: 'Directing event and photographic production for public figures. First contact with Chococam.',
        },
        tags: ['Événementiel', 'Portraits VIP', 'Agence'],
      },
    ],
  },
  {
    code: 'P·03',
    title: { fr: "L'Exécution", en: 'The Execution' },
    sub: {
      fr: 'Conception graphique, photographie, vidéographie.',
      en: 'Graphic design, photography, videography.',
    },
    intent: {
      fr: "Au bout du processus, il faut livrer. Image fixe, image en mouvement, design — la main tient toujours l'outil.",
      en: 'At the end of the process, you have to deliver. Still image, moving image, design — the hand always holds the tool.',
    },
    color: 'oklch(0.78 0.10 250)',
    projects: [
      {
        name: 'AKWA PALACE',
        chain: ['Akwa Palace', 'Friends Studio', 'Upgraders'],
        meta: { fr: '2025', en: '2025' },
        role: { fr: 'Réalisation video advertising', en: 'Video advertising direction' },
        body: {
          fr: "Campagne vidéo publicitaire pour l'hôtel Akwa Palace (Douala). Direction d'image, captation, montage, livrables multi-formats — production Friends Studio × Upgraders.",
          en: 'Video advertising campaign for the Akwa Palace hotel (Douala). Image direction, shooting, editing, multi-format deliverables — production Friends Studio × Upgraders.',
        },
        tags: ['Vidéo', 'Hospitality', 'Advertising'],
      },
      {
        name: 'OCEANIS KRIBI · The Villa',
        chain: ['Oceanis Kribi', 'Friends Studio', 'Upgraders'],
        meta: { fr: '2024', en: '2024' },
        role: { fr: 'Production vidéo & image', en: 'Video & image production' },
        body: {
          fr: "Production de contenus visuels pour Oceanis Kribi — The Villa (resort balnéaire). Direction d'image, vidéo, captation lifestyle.",
          en: 'Visual content production for Oceanis Kribi — The Villa (seaside resort). Image direction, video, lifestyle shooting.',
        },
        tags: ['Hospitality', 'Lifestyle', 'Vidéo'],
        proofs: [
          {
            label: { fr: 'The Villa — reel', en: 'The Villa — reel' },
            host: 'Instagram',
            url: 'https://www.instagram.com/oceanis.kribi_thevilla/reel/DCDvHugiZk1/',
          },
        ],
      },
      {
        name: 'MAISON GIMANE',
        chain: ['Maison Gimane', 'Friends Studio', 'Upgraders'],
        meta: { fr: '2024', en: '2024' },
        role: { fr: 'Production photo & vidéo', en: 'Photo & video production' },
        body: {
          fr: "Joaillerie sur mesure — production de contenus visuels pour la marque. Direction d'image produit, captation, déclinaisons social media. Friends Studio × Upgraders.",
          en: 'Bespoke jewellery — visual content production for the brand. Product image direction, shooting, social-media variations. Friends Studio × Upgraders.',
        },
        tags: ['Joaillerie', 'Produit', 'Luxe'],
        proofs: [
          {
            label: { fr: 'Maison Gimane — reel 01', en: 'Maison Gimane — reel 01' },
            host: 'Instagram',
            url: 'https://www.instagram.com/reel/DCq0JzONAnZ/',
          },
          {
            label: { fr: 'Maison Gimane — reel 02', en: 'Maison Gimane — reel 02' },
            host: 'Instagram',
            url: 'https://www.instagram.com/reel/DCRwIDFNj-C/',
          },
        ],
      },
      {
        name: 'CHOCOCAM',
        chain: ['Chococam', 'Upgraders'],
        meta: { fr: 'multi-projets', en: 'multi-project' },
        role: { fr: 'Photo · Vidéo · Reportage', en: 'Photo · Video · Reportage' },
        body: {
          fr: "Couverture Défilé 8 mars (Benny), interviews vox pop, 2 épisodes pilotes & reportage journée fun (Big Gum), Fête des Mères (Tartina, Matinal), capsules santé Chococam, 1ᵉʳ Mai (Tiger Brand), Saint-Valentin & shooting produit (Mambo).",
          en: 'Coverage of the March 8 parade (Benny), vox-pop interviews, 2 pilot episodes & fun-day reportage (Big Gum), Mother’s Day (Tartina, Matinal), Chococam health capsules, May 1 (Tiger Brand), Valentine’s Day & product shoot (Mambo).',
        },
        tags: ['Benny', 'Big Gum', 'Tartina', 'Matinal', 'Mambo', 'Tiger Brand'],
        proofs: [
          {
            label: { fr: 'Tartina · Fête des Mères', en: 'Tartina · Mother’s Day' },
            host: 'Facebook',
            url: 'https://www.facebook.com/TartinaSpreads/videos/1085336389065869/',
          },
          {
            label: { fr: 'Chococam · capsule', en: 'Chococam · capsule' },
            host: 'YouTube',
            url: 'https://www.youtube.com/watch?v=kVdl0igH3ws',
          },
          {
            label: { fr: 'Chococam · capsule', en: 'Chococam · capsule' },
            host: 'YouTube',
            url: 'https://www.youtube.com/watch?v=EcWcME1xddY',
          },
          {
            label: { fr: 'Benny · Défilé 8 mars', en: 'Benny · March 8 parade' },
            host: 'Facebook',
            url: 'https://www.facebook.com/BennySeasoning/videos/1501074026953556/',
          },
        ],
      },
      {
        name: 'ORANGE Cameroun',
        chain: ['Orange Cameroun', 'Publicis / McCann', 'Friends Studio', 'Upgraders'],
        meta: { fr: 'Marque blanche', en: 'White-label' },
        role: { fr: 'Photographie événementielle', en: 'Event photography' },
        body: {
          fr: "En binôme avec Stéphane Nounamo (Friends Studio × Upgraders), via Publicis puis McCann. Couverture Orange Excellence (bourses des 30 meilleurs bacheliers), ANAFOOT (académie de foot des jeunes talents), première Indomptable, concert Mimie.",
          en: 'In a duo with Stéphane Nounamo (Friends Studio × Upgraders), via Publicis then McCann. Coverage of Orange Excellence (scholarships for the top 30 graduates), ANAFOOT (youth football academy), the first Indomptable, Mimie concert.',
        },
        tags: ['Orange Excellence', 'ANAFOOT', 'Concerts', 'Cinéma'],
      },
      {
        name: 'CIMENCAM',
        chain: ['Cimencam', 'OmenKart', 'Friends Studio', 'Upgraders'],
        meta: { fr: '2023 — 2024', en: '2023 — 2024' },
        role: { fr: 'Vidéo corporate', en: 'Corporate video' },
        body: {
          fr: "Discours de début d'année du directeur, vidéo 8 mars 2023 en portrait croisé. Cimenteries du Cameroun — 60 ans d'histoire, 55% de part de marché. Mandat en marque blanche via OmenKart.",
          en: 'The director’s new-year address, an 8 March 2023 cross-portrait video. Cimenteries du Cameroun — 60 years of history, 55% market share. White-label mandate via OmenKart.',
        },
        tags: ['Corporate', 'Portrait croisé', 'Vidéo'],
      },
      {
        name: 'PORT AUTONOME DE KRIBI',
        chain: ['Port Autonome de Kribi', 'Her Media'],
        meta: { fr: 'Octobre Rose', en: 'Pink October' },
        role: { fr: 'DA & Exécution', en: 'Art direction & execution' },
        body: {
          fr: "Direction artistique et exécution des contenus de la campagne Octobre Rose pour le Port Autonome de Kribi — opéré via Her Media.",
          en: 'Art direction and execution of the Pink October campaign content for the Port Autonome de Kribi — operated via Her Media.',
        },
        tags: ['Institutionnel', 'Octobre Rose', 'Campagne'],
      },
      {
        name: 'MAISON MOËT & CHANDON',
        chain: ['Maison Moët & Chandon', 'Her Media'],
        meta: { fr: '2024', en: '2024' },
        role: { fr: 'Assets visuels & coordination', en: 'Visual assets & coordination' },
        body: {
          fr: "Maison Moët & Moët Grand Day — toast pan-africain simultané dans 8 pays. Gestion des assets visuels et coordination d'équipe pour le volet Cameroun, sous Leila Kigha (Her Media).",
          en: 'Maison Moët & Moët Grand Day — a simultaneous pan-African toast across 8 countries. Visual-asset management and team coordination for the Cameroon leg, under Leila Kigha (Her Media).',
        },
        tags: ['Luxe', 'Événementiel', 'Pan-Afrique'],
      },
      {
        name: 'OMENKART — marque blanche',
        chain: ['OmenKart'],
        meta: { fr: '2022 — 2024', en: '2022 — 2024' },
        role: { fr: 'DA déléguée', en: 'Delegated art direction' },
        body: {
          fr: "Collaboration en marque blanche avec l'agence pan-africaine de Diane Audrey Ngako (Douala · Abidjan · Cotonou). Capsules Diaspoassur, Douala Digital Show, événement Ambitieuse.",
          en: 'White-label collaboration with Diane Audrey Ngako’s pan-African agency (Douala · Abidjan · Cotonou). Diaspoassur capsules, Douala Digital Show, Ambitieuse event.',
        },
        tags: ['Diaspoassur', 'DDS', 'Ambitieuse'],
      },
      {
        name: 'SELLKAKO · WILL&BROTHERS',
        chain: ['Sellkako / Will&Brothers'],
        meta: { fr: '2017 — 2019', en: '2017 — 2019' },
        role: { fr: 'Lead Designer · Business Developer', en: 'Lead Designer · Business Developer' },
        body: {
          fr: "Premières années en agence : design lead, puis développement business. Fondations méthodiques, blog GeekDeBrousse en parallèle (guides photo, tests matériel).",
          en: 'Early agency years: design lead, then business development. Methodical foundations, GeekDeBrousse blog on the side (photo guides, gear reviews).',
        },
        tags: ['Design', 'Agence', 'Fondations'],
      },
    ],
  },
];
