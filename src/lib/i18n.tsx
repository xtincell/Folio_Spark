'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

/* ============================================================================
   Folio i18n — FR / EN
   ----------------------------------------------------------------------------
   A lightweight, dependency-free language layer:
     • LanguageProvider holds the active language in React state, persisted to
       localStorage + a cookie, and mirrored onto <html lang="…">.
     • useLang()  → { lang, setLang, toggle } for the toggle control.
     • useT()     → the dictionary slice for the active language (static prose).
     • pick()/Bi  → helper + type for bilingual fields living in data files.

   SSR renders the default (fr); the stored preference is applied on mount, so
   returning EN visitors see at most a single-frame swap. The personal folio's
   primary indexed language stays French; English is a first-class client view.
   ========================================================================== */

export type Lang = 'fr' | 'en';

/** A translatable value carried by data files. */
export type Bi = { fr: string; en: string };

/** Resolve a bilingual (or already-plain) value for a language. */
export const pick = (value: Bi | string, lang: Lang): string =>
  typeof value === 'string' ? value : value[lang];

const STORAGE_KEY = 'folio-lang';

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  // Hydrate the stored preference after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'fr') {
        setLangState(stored);
        document.documentElement.lang = stored;
      }
    } catch {
      /* storage unavailable — keep default */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.cookie = `${STORAGE_KEY}=${l};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* ignore persistence failures */
    }
  };

  const toggle = () => setLang(lang === 'fr' ? 'en' : 'fr');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LangCtx {
  const ctx = useContext(LanguageContext);
  // Safe fallback so components render even outside a provider (e.g. tests).
  return ctx ?? { lang: 'fr', setLang: () => {}, toggle: () => {} };
}

/** Dictionary slice for the active language. */
export function useT(): Dict {
  const { lang } = useLang();
  return DICT[lang];
}

/* ============================================================================
   DICTIONARY — static UI prose. Structured content (projects, méthode steps,
   pillars, agencies, edito quotes) lives bilingually in the data files.
   ========================================================================== */

const fr = {
    skip: 'Aller au contenu',
    langToggle: { label: 'Langue', to: 'EN', aria: 'Switch to English' },

    nav: {
      manifesto: 'Manifeste',
      method: 'Méthode',
      folio: 'Folio',
      gallery: 'Galerie',
      tech: 'Tech',
      cv: 'CV',
      tarifs: 'Tarifs',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Fermer',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      home: 'Accueil',
      design: 'Design',
    },

    hero: {
      vol: 'Vol. 15',
      status: 'Disponible · Mandat 2026',
      edition: 'Folio · Édition 2026',
      titleL1: 'Je ne crée pas',
      titleL2a: "de l'",
      titleL2b: 'art',
      titleL3: 'Je systémise',
      titleL4a: 'le',
      titleL4b: 'succès',
      sub: "Directeur artistique formé en télécommunications. Je traite chaque marque comme un système d'exploitation : ADN, signaux, flux, conversion.",
      ctaFolio: 'Voir le folio complet',
      ctaCv: 'Lire le CV — 60 sec',
      macaronRole: 'Rôle principal',
      macaronMandate: 'Mandat actif',
      tagName: 'NOM',
      tagAlias: 'ALIAS',
      tagBase: 'BASE',
      tagVer: 'VER',
      caption: 'Studio, 2026',
      scroll: 'Scroll',
    },

    manifesto: {
      label: 'Manifeste',
      title1: 'Le profil ',
      titleEm: 'T-shaped',
      title2: " — l'ingénieur derrière l'image.",
      p1: "Mon passé en <strong>Télécommunications &amp; Réseaux</strong> n'est pas un accident. C'est l'avantage. Là où d'autres voient des couleurs, je vois des flux. Là où ils voient du design, je vois un <em>système d'exploitation de marque</em>.",
      p2: "Je conçois des identités qui se déploient comme des infrastructures&nbsp;: chaque pixel a une fonction, chaque campagne s'inscrit dans un protocole. Le résultat n'est pas une image — c'est un mouvement.",
      signature: '— Xtincell',
    },

    hats: {
      eyebrow: '§ 02 — Trois casquettes, un système',
      title1: 'Je porte trois ',
      titleEm: 'casquettes',
      title2: ' selon le brief.',
      lede: 'Chacune est un métier complet, pas un add-on. Mais elles partagent la même matière première : un point de vue de système sur la marque.',
      cta: 'Folio complet',
      ariaList: 'Trois pratiques',
    },

    method: {
      label: 'Méthode',
      sub: '— socle + propulseur. IP UPgraders.',
      groupSocle: "SOCLE · ADVE — l'identité",
      groupPropulseur: "PROPULSEUR · RTIS — l'action",
    },

    upgraders: {
      tag: 'Mon agence · fondée en 2017',
      tagline1: 'La passion',
      tagline2: ' pour propulseur.',
      claim: "Conciergerie de l'industrie créative — <b>Afrique de l'Ouest &amp; Centrale</b>.",
      lede: "UPgraders n'est pas une agence comme les autres : c'est un cabinet de <b>conseil &amp; stratégie</b> qui orchestre un réseau de freelances et d'agences partenaires (production, photo, illustration, dev). On apporte la vision et le système ; le réseau apporte les mains.",
      cta: 'Page dédiée UPgraders',
    },

    practices: {
      label: 'Travaux — trois pratiques',
      title1: 'Stratégie. Direction. ',
      titleEm: 'Exécution',
      lede: "Profil T-shaped : je couvre la chaîne complète, du positionnement jusqu'au pixel livré. Voici comment 19 ans de pratique se répartissent.",
      legendTitle: 'Lecture des fiches — chaîne de collaboration',
      legendChain: 'Chaque fiche montre la',
      legendChainBold: 'chaîne de filiation',
      chainClient: 'Client final',
      chainRelay: 'Agence relais',
      chainSelf: "Cellule d'exécution",
      legendBody:
        "<b>Upgraders</b> — mon agence-laboratoire (voir bloc dédié). <b>MATANGA Agency</b> — agence marketing où je suis Directeur Créatif depuis 2025. <b>Friends Studio</b> — cellule de production en binôme avec Stéphane Nounamo. <b>Imperial</b> — agence de talents (artistes), dirigée par Esther Naah, qui me missionnait pour UMA. <b>Her Media</b>, <b>OmenKart</b>, <b>Bimstr</b> — agences relais (souvent en marque blanche). On distingue donc : <i>agences-clients</i>, <i>agences de talents</i>, <i>cellules de production</i>, <i>agences-employeur</i>.",
      projectsCounted: 'projets référencés',
    },

    stats: [
      { v: '13', l: 'Projets référencés' },
      { v: '3', l: 'Pratiques · Stratégie · DA · Exécution' },
      { v: '12+', l: 'Marques & artistes accompagnés' },
      { v: '17+', l: 'Années dans la création' },
    ],

    system: {
      label: 'LaFusée · OS UPgraders',
      title1: "L'IA n'est pas l'artiste.",
      titleEm: 'Elle est le studio.',
      body: "<b>LaFusée</b> — l'OS interne d'UPgraders pour la gestion de l'industrie créative. Il automatise la méthode <b>ADVE/RTIS</b> : extraction d'ADN, audit de risque, cartographie d'innovations, roadmap dynamique. Ce qui prenait deux semaines tient en deux jours — sans concession sur la direction.",
      list: [
        'Pipelines calibrés par marque, pas génériques.',
        'Socle ADVE versionné, propulseur RTIS ré-exécutable.',
        'Console unique : brief → arbitrage → livrable.',
        "L'humain garde la décision. La passion reste le propulseur.",
      ],
      cta: 'Voir UPgraders en détail',
    },

    contact: {
      label: 'Disponibilité',
      title1: 'Direction :',
      titleEm: 'Abidjan',
      lede: "Je quitte le Cameroun pour porter cette vision systémique à la capitale créative de l'Afrique francophone. Prêt pour les ADICOM, prêt pour les briefs qui font peur.",
      whatsapp: 'WhatsApp — réponse rapide',
      email: 'Email',
      linkedin: 'LinkedIn',
      status: 'Status',
      statusValue: 'Open to opportunities',
    },

    social: { label: 'Social', everywhere: '@xtincell partout' },

    proof: { label: 'Preuves vidéo', open: 'Ouvrir' },

    agency: { discover: 'Découvrir →', chainAria: 'Chaîne de collaboration' },

    palette: {
      trigger: 'Commandes',
      placeholder: 'Naviguer, contacter…',
      empty: 'Aucune commande',
      navigate: 'naviguer',
      open: 'ouvrir',
      groupNav: 'Naviguer',
      groupSections: 'Sections',
      groupContact: 'Contact',
      groupLang: 'Langue',
      home: 'Accueil',
      folio: 'Folio',
      gallery: 'Galerie',
      design: 'Design Folio (EN)',
      tech: 'Folio Tech',
      cv: 'CV',
      pricing: 'Tarifs',
      upgraders: 'UPgraders',
      blog: 'Blog UPgraders',
      manifesto: 'Manifeste',
      method: 'Méthode ADVE/RTIS',
      contact: 'Contact',
      whatsapp: 'WhatsApp',
      email: 'Email',
      copyEmail: "Copier l'email",
      linkedin: 'LinkedIn',
      switchLang: 'Switch to English',
      ariaOpen: 'Ouvrir la palette de commandes',
      ariaDialog: 'Palette de commandes',
      ariaSearch: 'Rechercher une commande',
    },

    notFound: {
      title: '404 — page introuvable · Xtincell',
      eyebrow: 'Erreur 404 · page introuvable',
      h1a: 'Cette page ',
      h1em: "n'existe pas",
      lede: "Le lien a peut-être changé, ou la page a été déplacée. Revenons à l'essentiel.",
      home: "Retour à l'accueil",
      folio: 'Voir le folio',
    },

    topbar: { back: 'Folio Xtincell', principal: 'Navigation principale' },

    work: {
      eyebrow: 'FOLIO · 20 PROJETS · 15 ANS · 25+ MARQUES',
      h1a: 'Trois ',
      h1em: 'casquettes',
      h1b: ', un même système.',
      lede: 'Stratégie, direction artistique, exécution. Chacune est un métier complet — ensemble, elles transforment une marque en système qui se reproduit.',
      toc: 'Sommaire',
      footTitleA: 'On ',
      footTitleEm: 'discute',
      footTitleB: " d'un système ?",
      footLede: "Brief, projet, simple curiosité. Si vous avez une marque qui mérite plus qu'un beau logo, on devrait se parler.",
      cvCta: 'Lire le CV →',
    },

    gallery: {
      collections: 'COLLECTIONS',
      hosted: 'HOSTED ON PIXIESET',
      h1a: 'La main tient ',
      h1em: "l'outil",
      lede: "Mariages, festivals, portraits artistes, corporate, reportages. Chaque collection ouvre sur Pixieset — où les images vivent en pleine résolution, avec le contrôle d'accès et de téléchargement que méritent les ayants droit.",
      private: 'Privée',
      altEyebrow: 'AUSSI SUR · MULTIPLATEFORME',
      videos: 'VIDÉOS YOUTUBE',
      altTitleA: 'Au-delà de la ',
      altTitleEm: 'photo',
      altLede: "Vidéo, motion, capsules, chroniques. Le travail vit aussi sur YouTube, Instagram et Facebook — chaque card ouvre la source d'origine en plein écran.",
      ytFull: 'YouTube — chaîne complète',
      footTitleA: 'Une mission ',
      footTitleEm: 'photo',
      footTitleB: ' ?',
      footLede: "Mariage, événement, campagne, portrait. Si l'image doit raconter quelque chose, on devrait se parler.",
      indexCta: 'Index Pixieset ↗',
      openGallery: (t: string) => `Ouvrir la galerie ${t} sur Pixieset`,
      watch: (t: string) => `Regarder « ${t} » sur YouTube`,
    },

    cv: {
      title: 'CV — Alexandre Djengue · Xtincell',
      eyebrow: 'Curriculum Vitae · v15.0 · 2026 · 15 ans de pratique',
      tag: 'Brand Architect & Storytelling Consultant.',
      born: 'Né',
      bornV: '1991 · Cameroun',
      base: 'Base',
      baseV: 'Yaoundé → Abidjan',
      igweb: 'IG / Web',
      igwebV: '@xtincell · partout',
      s1num: '§ 01',
      s1a: 'Profil',
      s1b: 'en bref',
      s1lede:
        "15 ans en marketing &amp; design. Ingénieur télécom de formation, directeur artistique de pratique. Je travaille les marques comme des <em>systèmes d'exploitation</em> : ADN, signaux, flux, conversion.",
      tShaped: 'Profil rare',
      tShapedD:
        "Ingénieur × DA × stratège : la profondeur technique d'un dev, l'œil d'un photographe, la lecture culturelle d'un planneur.",
      sectors: 'Music · FMCG · Tech',
      sectorsD:
        "Universal Music Africa, Chococam (Tiger Brands), Orange (via McCann), CIMENCAM, agences premium d'Afrique centrale.",
      founder: 'UPgraders',
      founderD:
        "Studio créatif basé sur l'IA souveraine — pipelines calibrés, gouvernés, sous décision humaine.",
      founderK: 'FONDATEUR',
      sectorsK: 'SECTEURS',
      s2num: '§ 02',
      s2a: 'Parcours',
      s2b: 'condensé',
      s3num: '§ 03',
      s3a: 'Compétences',
      s3b: 'le coffre à outils',
      s4num: '§ 04',
      s4a: 'Clients',
      s4b: 'avec qui',
      s5num: '§ 05',
      s5a: 'Langues',
      s5b: '& mobilité',
      langFr: 'Français — natif / bilingue',
      langEn: 'Anglais — intermédiaire pro',
      langEnD: 'Brief, mission, rédaction courante.',
      langJa: 'Japonais — notions élémentaires',
      geo: 'Yaoundé · Douala · Abidjan',
      geoD: "Disponible mobilité Afrique de l'Ouest et centrale, remote France / Europe.",
    },
};

/** The dictionary shape, inferred from the French source-of-truth. */
export type Dict = typeof fr;

const en: Dict = {
    skip: 'Skip to content',
    langToggle: { label: 'Language', to: 'FR', aria: 'Passer en français' },

    nav: {
      manifesto: 'Manifesto',
      method: 'Method',
      folio: 'Folio',
      gallery: 'Gallery',
      tech: 'Tech',
      cv: 'Résumé',
      tarifs: 'Pricing',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      home: 'Home',
      design: 'Design',
    },

    hero: {
      vol: 'Vol. 15',
      status: 'Available · 2026 mandate',
      edition: 'Folio · 2026 Edition',
      titleL1: "I don't make",
      titleL2a: '',
      titleL2b: 'art',
      titleL3: 'I systemise',
      titleL4a: '',
      titleL4b: 'success',
      sub: 'Art director trained as a telecom engineer. I treat every brand like an operating system: DNA, signals, flows, conversion.',
      ctaFolio: 'See the full folio',
      ctaCv: 'Read the résumé — 60 sec',
      macaronRole: 'Primary role',
      macaronMandate: 'Active mandate',
      tagName: 'NAME',
      tagAlias: 'ALIAS',
      tagBase: 'BASE',
      tagVer: 'VER',
      caption: 'Studio, 2026',
      scroll: 'Scroll',
    },

    manifesto: {
      label: 'Manifesto',
      title1: 'The ',
      titleEm: 'T-shaped',
      title2: ' profile — the engineer behind the image.',
      p1: "My background in <strong>Telecommunications &amp; Networks</strong> isn't an accident. It's the edge. Where others see colours, I see flows. Where they see design, I see a <em>brand operating system</em>.",
      p2: 'I build identities that deploy like infrastructure: every pixel has a function, every campaign follows a protocol. The result isn’t an image — it’s a movement.',
      signature: '— Xtincell',
    },

    hats: {
      eyebrow: '§ 02 — Three hats, one system',
      title1: 'I wear three ',
      titleEm: 'hats',
      title2: ', depending on the brief.',
      lede: 'Each is a full craft, not an add-on. But they share the same raw material: a systems view of the brand.',
      cta: 'Full folio',
      ariaList: 'Three practices',
    },

    method: {
      label: 'Method',
      sub: '— foundation + propellant. UPgraders IP.',
      groupSocle: 'FOUNDATION · ADVE — the identity',
      groupPropulseur: 'PROPELLANT · RTIS — the action',
    },

    upgraders: {
      tag: 'My agency · founded 2017',
      tagline1: 'Passion',
      tagline2: ' as the propellant.',
      claim: "Creative-industry concierge — <b>West &amp; Central Africa</b>.",
      lede: "UPgraders isn't an agency like the others: it's a <b>consulting &amp; strategy</b> firm that orchestrates a network of freelancers and partner agencies (production, photo, illustration, dev). We bring the vision and the system; the network brings the hands.",
      cta: 'Dedicated UPgraders page',
    },

    practices: {
      label: 'Work — three practices',
      title1: 'Strategy. Direction. ',
      titleEm: 'Execution',
      lede: 'T-shaped profile: I cover the full chain, from positioning to the delivered pixel. Here is how 19 years of practice break down.',
      legendTitle: 'Reading the cards — collaboration chain',
      legendChain: 'Each card shows the',
      legendChainBold: 'chain of attribution',
      chainClient: 'End client',
      chainRelay: 'Relay agency',
      chainSelf: 'Execution cell',
      legendBody:
        "<b>Upgraders</b> — my lab-agency (see dedicated block). <b>MATANGA Agency</b> — the marketing agency where I have been Creative Director since 2025. <b>Friends Studio</b> — production cell co-run with Stéphane Nounamo. <b>Imperial</b> — talent agency (artists), led by Esther Naah, which commissioned me for UMA. <b>Her Media</b>, <b>OmenKart</b>, <b>Bimstr</b> — relay agencies (often white-label). So we distinguish: <i>client agencies</i>, <i>talent agencies</i>, <i>production cells</i>, <i>employer agencies</i>.",
      projectsCounted: 'referenced projects',
    },

    stats: [
      { v: '13', l: 'Referenced projects' },
      { v: '3', l: 'Practices · Strategy · AD · Execution' },
      { v: '12+', l: 'Brands & artists supported' },
      { v: '17+', l: 'Years in the craft' },
    ],

    system: {
      label: 'LaFusée · UPgraders OS',
      title1: "AI isn't the artist.",
      titleEm: "It's the studio.",
      body: "<b>LaFusée</b> — UPgraders' internal OS for running a creative industry. It automates the <b>ADVE/RTIS</b> method: DNA extraction, risk audit, innovation mapping, dynamic roadmap. What took two weeks fits into two days — with no compromise on direction.",
      list: [
        'Pipelines calibrated per brand, not generic.',
        'Versioned ADVE foundation, re-runnable RTIS propellant.',
        'One console: brief → arbitration → deliverable.',
        'The human keeps the decision. Passion stays the propellant.',
      ],
      cta: 'See UPgraders in detail',
    },

    contact: {
      label: 'Availability',
      title1: 'Heading:',
      titleEm: 'Abidjan',
      lede: "I'm leaving Cameroon to carry this systemic vision to the creative capital of French-speaking Africa. Ready for the ADICOM, ready for the briefs that scare people.",
      whatsapp: 'WhatsApp — fast reply',
      email: 'Email',
      linkedin: 'LinkedIn',
      status: 'Status',
      statusValue: 'Open to opportunities',
    },

    social: { label: 'Social', everywhere: '@xtincell everywhere' },

    proof: { label: 'Video proof', open: 'Open' },

    agency: { discover: 'Discover →', chainAria: 'Collaboration chain' },

    palette: {
      trigger: 'Commands',
      placeholder: 'Navigate, get in touch…',
      empty: 'No command',
      navigate: 'navigate',
      open: 'open',
      groupNav: 'Navigate',
      groupSections: 'Sections',
      groupContact: 'Contact',
      groupLang: 'Language',
      home: 'Home',
      folio: 'Folio',
      gallery: 'Gallery',
      design: 'Design Folio (EN)',
      tech: 'Tech Folio',
      cv: 'Résumé',
      pricing: 'Pricing',
      upgraders: 'UPgraders',
      blog: 'UPgraders Blog',
      manifesto: 'Manifesto',
      method: 'ADVE/RTIS Method',
      contact: 'Contact',
      whatsapp: 'WhatsApp',
      email: 'Email',
      copyEmail: 'Copy email',
      linkedin: 'LinkedIn',
      switchLang: 'Passer en français',
      ariaOpen: 'Open command palette',
      ariaDialog: 'Command palette',
      ariaSearch: 'Search for a command',
    },

    notFound: {
      title: '404 — page not found · Xtincell',
      eyebrow: 'Error 404 · page not found',
      h1a: 'This page ',
      h1em: "doesn't exist",
      lede: 'The link may have changed, or the page was moved. Let’s get back to the essentials.',
      home: 'Back to home',
      folio: 'See the folio',
    },

    topbar: { back: 'Xtincell Folio', principal: 'Main navigation' },

    work: {
      eyebrow: 'FOLIO · 20 PROJECTS · 15 YEARS · 25+ BRANDS',
      h1a: 'Three ',
      h1em: 'hats',
      h1b: ', one and the same system.',
      lede: 'Strategy, art direction, execution. Each is a full craft — together, they turn a brand into a system that reproduces itself.',
      toc: 'Contents',
      footTitleA: 'Shall we ',
      footTitleEm: 'talk',
      footTitleB: ' about a system?',
      footLede: 'Brief, project, plain curiosity. If you have a brand that deserves more than a pretty logo, we should talk.',
      cvCta: 'Read the résumé →',
    },

    gallery: {
      collections: 'COLLECTIONS',
      hosted: 'HOSTED ON PIXIESET',
      h1a: 'The hand holds ',
      h1em: 'the tool',
      lede: 'Weddings, festivals, artist portraits, corporate, reportage. Each collection opens on Pixieset — where the images live at full resolution, with the access and download control rights-holders deserve.',
      private: 'Private',
      altEyebrow: 'ALSO ON · MULTI-PLATFORM',
      videos: 'YOUTUBE VIDEOS',
      altTitleA: 'Beyond ',
      altTitleEm: 'photography',
      altLede: 'Video, motion, capsules, columns. The work also lives on YouTube, Instagram and Facebook — each card opens the original source full-screen.',
      ytFull: 'YouTube — full channel',
      footTitleA: 'A ',
      footTitleEm: 'photo',
      footTitleB: ' brief?',
      footLede: 'Wedding, event, campaign, portrait. If the image has to say something, we should talk.',
      indexCta: 'Pixieset index ↗',
      openGallery: (t: string) => `Open the ${t} gallery on Pixieset`,
      watch: (t: string) => `Watch “${t}” on YouTube`,
    },

    cv: {
      title: 'Résumé — Alexandre Djengue · Xtincell',
      eyebrow: 'Résumé · v15.0 · 2026 · 15 years of practice',
      tag: 'Brand Architect & Storytelling Consultant.',
      born: 'Born',
      bornV: '1991 · Cameroon',
      base: 'Base',
      baseV: 'Yaoundé → Abidjan',
      igweb: 'IG / Web',
      igwebV: '@xtincell · everywhere',
      s1num: '§ 01',
      s1a: 'Profile',
      s1b: 'in brief',
      s1lede:
        '15 years in marketing &amp; design. Telecom engineer by training, art director by practice. I work brands like <em>operating systems</em>: DNA, signals, flows, conversion.',
      tShaped: 'A rare profile',
      tShapedD:
        "Engineer × art director × strategist: a developer's technical depth, a photographer's eye, a planner's cultural read.",
      sectors: 'Music · FMCG · Tech',
      sectorsD:
        'Universal Music Africa, Chococam (Tiger Brands), Orange (via McCann), CIMENCAM, premium Central-African agencies.',
      founder: 'UPgraders',
      founderD:
        'Creative studio built on sovereign AI — calibrated, governed pipelines, under human decision.',
      founderK: 'FOUNDER',
      sectorsK: 'SECTORS',
      s2num: '§ 02',
      s2a: 'Career',
      s2b: 'condensed',
      s3num: '§ 03',
      s3a: 'Skills',
      s3b: 'the toolbox',
      s4num: '§ 04',
      s4a: 'Clients',
      s4b: 'with whom',
      s5num: '§ 05',
      s5a: 'Languages',
      s5b: '& mobility',
      langFr: 'French — native / bilingual',
      langEn: 'English — professional working',
      langEnD: 'Briefs, missions, everyday writing.',
      langJa: 'Japanese — elementary notions',
      geo: 'Yaoundé · Douala · Abidjan',
      geoD: 'Open to mobility across West and Central Africa, remote France / Europe.',
    },
};

export const DICT = { fr, en };
