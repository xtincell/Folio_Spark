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
