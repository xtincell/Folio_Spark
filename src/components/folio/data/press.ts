import type { Bi } from '@/lib/i18n';

/* ============================================================================
   PRESS — Publications, conversations & regards extérieurs
   ----------------------------------------------------------------------------
   External coverage and Alexandre « Xtincell » Djengue's own publications.
   `type` distinguishes a feature, an authored podcast and a portfolio.
   Each entry is rendered in the
   editorial press list on the home page and surfaced to search engines through
   the Person JSON-LD (`subjectOf` / `sameAs`) in the root layout.

   To add a mention: append an item below. Keep `url` an absolute link to the
   live source, `iso` a machine date ("YYYY" or "YYYY-MM"), and write `excerpt`
   as a short, faithful pull-quote — never invent quotes or outlets.
   ========================================================================== */

export type PressType = 'feature' | 'interview' | 'podcast' | 'portfolio';

export type PressItem = {
  /** Publication / platform name, shown as the outlet kicker. */
  outlet: string;
  /** Optional series or rubric the piece ran under (e.g. "Pixels Hunters"). */
  series?: string;
  title: Bi;
  /** Absolute, canonical link to the live source. */
  url: string;
  /** Human-readable date for display. */
  date: Bi;
  /** Machine date for <time datetime> + structured data. */
  iso: string;
  type: PressType;
  /** Faithful pull-quote or summary of what the source says. */
  excerpt: Bi;
};

export const PRESS_TYPE_LABEL: Record<PressType, Bi> = {
  feature: { fr: 'Portrait', en: 'Feature' },
  interview: { fr: 'Interview', en: 'Interview' },
  podcast: { fr: 'Podcast', en: 'Podcast' },
  portfolio: { fr: 'Portfolio', en: 'Portfolio' },
};

export const PRESS: PressItem[] = [
  {
    outlet: 'Iwaria',
    series: 'Pixels Hunters',
    title: {
      fr: 'Xtincell, une étoile qui brille dans la photographie',
      en: 'Xtincell, a star shining in photography',
    },
    url: 'https://blog.iwaria.com/pixels-hunters-xtincell-une-etoile-qui-brille-dans-la-photographie/',
    date: { fr: 'Avr. 2022', en: 'Apr. 2022' },
    iso: '2022-04',
    type: 'feature',
    excerpt: {
      fr: 'Ingénieur en réseaux & télécommunications de formation, passé par le design en agence avant de basculer vers la photographie événementielle et la direction artistique de marques — un portrait de sa passion et des obstacles de son ascension.',
      en: 'A network & telecom engineer by training who came up through agency design before turning to event photography and brand art direction — a portrait of his passion and the hurdles of his rise.',
    },
  },
  {
    outlet: 'Digressions',
    title: {
      fr: 'Être créatif en Afrique avec Alexandre Djengue',
      en: 'Being a creative in Africa, with Alexandre Djengue',
    },
    url: 'https://mesdigressions.com/comment-gagnger-argent-creatif-afrique/',
    date: { fr: '2021', en: '2021' },
    iso: '2021',
    type: 'interview',
    excerpt: {
      fr: 'Entretien dans le podcast d’Anne-Marie C. Befoune, qui le présente comme blogueur, youtubeur, podcasteur et photographe : le marché créatif en Afrique, la méfiance des clients envers les créatifs locaux, le manque d’infrastructures.',
      en: 'Interview on Anne-Marie C. Befoune’s podcast, which introduces him as a blogger, YouTuber, podcaster and photographer: the creative market in Africa, clients’ distrust of local creatives, the lack of infrastructure.',
    },
  },
  {
    outlet: 'Nkowa&Co',
    title: {
      fr: 'Mon top 15 des blogs camerounais à suivre',
      en: 'My top 15 Cameroonian blogs to follow',
    },
    url: 'https://nkowa.com/mon-top-15-des-blogueurs-camerounais-a-suivre/',
    date: { fr: 'Oct. 2020', en: 'Oct. 2020' },
    iso: '2020-10',
    type: 'feature',
    excerpt: {
      fr: 'René Nkowa le classe parmi les blogueurs camerounais à suivre et le présente comme « un infographiste de talent ».',
      en: 'René Nkowa lists him among the Cameroonian bloggers to follow and calls him “a talented graphic designer”.',
    },
  },
  {
    outlet: 'Le blog du disrupteur',
    title: {
      fr: 'Mon expérience de designer graphique free-lance au Cameroun',
      en: 'My experience as a freelance graphic designer in Cameroon',
    },
    url: 'https://leblogdudisrupteur.com/2018/10/08/mon-experience-de-designer-graphique-free-lance-au-cameroun-par-alexandre-djengue/',
    date: { fr: 'Oct. 2018', en: 'Oct. 2018' },
    iso: '2018-10',
    type: 'feature',
    excerpt: {
      fr: 'Témoignage signé, publié par Ace : des télécoms au centre d’appels, puis au graphisme indépendant, au blog Geek de brousse et au pseudonyme Xtincell.',
      en: 'A first-person account, published by Ace: from telecoms to a call centre, then to freelance graphic design, the Geek de brousse blog and the Xtincell pseudonym.',
    },
  },
  {
    outlet: 'Créapreneur',
    title: {
      fr: 'Créapreneur — archives du podcast sur l’entrepreneuriat créatif',
      en: 'Creapreneur — creative-entrepreneurship podcast archive',
    },
    url: 'https://podcasts.apple.com/us/podcast/creapreneur/id1440424290',
    // Apple Podcasts lists 2018–2021 as the archived show's active years.
    date: { fr: 'Archives 2018–2021', en: 'Archive 2018–2021' },
    iso: '2018',
    type: 'podcast',
    excerpt: {
      fr: 'Le podcast présenté par Xtincell autour de l’entrepreneuriat créatif en Afrique francophone : quotidien de créateur, gestion de clients, tarifs, droits d’auteur et échanges avec d’autres créatifs. Épisodes archivés de 2018 à 2021.',
      en: 'A podcast hosted by Xtincell about creative entrepreneurship in French-speaking Africa: creative work, client management, pricing, copyright and conversations with fellow creatives. Archived episodes from 2018 to 2021.',
    },
  },
  {
    outlet: 'Behance',
    title: {
      fr: 'Alexandre « Xtincell » Djengue — Directeur Artistique (Design & Photo)',
      en: 'Alexandre “Xtincell” Djengue — Art Director (Design & Photo)',
    },
    url: 'https://www.behance.net/xtincell',
    date: { fr: 'Portfolio', en: 'Portfolio' },
    iso: '2024',
    type: 'portfolio',
    excerpt: {
      fr: 'Le portfolio Behance référencé — campagnes, identités et direction artistique pour des marques d’Afrique centrale et de l’Ouest.',
      en: 'The referenced Behance portfolio — campaigns, identities and art direction for Central and West African brands.',
    },
  },
];
