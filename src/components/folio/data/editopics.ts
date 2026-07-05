import type { Bi } from '@/lib/i18n';

export type EditoPicData = {
  src: string;
  cap: Bi;
  quote: Bi; // may contain HTML (<em>)
  attrib: Bi;
  flip?: boolean;
};

export const EDITOPICS: EditoPicData[] = [
  {
    src: '/work/cases/tradex/hero.webp',
    cap: { fr: '§ Image — échantillon 01', en: '§ Image — sample 01' },
    quote: {
      fr: "Une marque, c'est d'abord une <em>circuiterie</em> — puis une histoire qui passe dedans.",
      en: 'A brand is first a piece of <em>circuitry</em> — then a story that runs through it.',
    },
    attrib: { fr: 'Campagne · Tradex 2T — image de marque', en: 'Campaign · Tradex 2T — brand imagery' },
  },
  {
    src: '/work/cases/musina-festival/hero.webp',
    cap: { fr: '§ Image — atelier', en: '§ Image — workshop' },
    quote: {
      fr: "Tradition × futur. Local × global. Artisanat × IA. Les marques fortes habitent les <em>tensions</em>.",
      en: 'Tradition × future. Local × global. Craft × AI. Strong brands live in the <em>tensions</em>.',
    },
    attrib: { fr: 'Campagne · Musina Festival — DA & image', en: 'Campaign · Musina Festival — AD & image' },
    flip: true,
  },
  {
    src: '/work/cases/friesland-campina/hero.webp',
    cap: { fr: '§ Image — exécution', en: '§ Image — execution' },
    quote: {
      fr: "Là où d'autres voient des <em>couleurs</em>, je vois des flux. Là où ils voient du design, je vois un système d'exploitation.",
      en: 'Where others see <em>colours</em>, I see flows. Where they see design, I see an operating system.',
    },
    attrib: { fr: 'Campagne · Peak & Bonnet Rouge (FrieslandCampina)', en: 'Campaign · Peak & Bonnet Rouge (FrieslandCampina)' },
  },
];
