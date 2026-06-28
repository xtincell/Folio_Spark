import type { Bi } from '@/lib/i18n';

/* ============================================================================
   PRESS — « Ce qu'ils disent de moi » / « What they say about me »
   ----------------------------------------------------------------------------
   Third-party coverage, features, interviews and media presence about
   Alexandre « Xtincell » Djengue across the web. Each entry is rendered in the
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
    outlet: 'Creapreneur',
    title: {
      fr: 'Créapreneur — le podcast de l’entrepreneuriat créatif en Afrique francophone',
      en: 'Creapreneur — the podcast on creative entrepreneurship in French-speaking Africa',
    },
    url: 'https://podcasts.apple.com/us/podcast/creapreneur/id1440424290',
    date: { fr: 'Depuis 2018', en: 'Since 2018' },
    iso: '2018',
    type: 'podcast',
    excerpt: {
      fr: 'Le micro hebdomadaire où Xtincell déconstruit l’entrepreneuriat créatif en Afrique francophone — quotidien de créateur, gestion de clients, tarifs, droits d’auteur — et reçoit d’autres créatifs.',
      en: 'The weekly mic where Xtincell unpacks creative entrepreneurship in French-speaking Africa — the maker’s daily life, client management, pricing, copyright — and hosts fellow creatives.',
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
