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
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80&auto=format&fit=crop',
    cap: { fr: '§ Image — échantillon 01', en: '§ Image — sample 01' },
    quote: {
      fr: "Une marque, c'est d'abord une <em>circuiterie</em> — puis une histoire qui passe dedans.",
      en: 'A brand is first a piece of <em>circuitry</em> — then a story that runs through it.',
    },
    attrib: { fr: 'Photo · Unsplash (libre)', en: 'Photo · Unsplash (free)' },
  },
  {
    src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80&auto=format&fit=crop',
    cap: { fr: '§ Image — atelier', en: '§ Image — workshop' },
    quote: {
      fr: "Tradition × futur. Local × global. Artisanat × IA. Les marques fortes habitent les <em>tensions</em>.",
      en: 'Tradition × future. Local × global. Craft × AI. Strong brands live in the <em>tensions</em>.',
    },
    attrib: { fr: 'Photo · Unsplash (libre)', en: 'Photo · Unsplash (free)' },
    flip: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=1600&q=80&auto=format&fit=crop',
    cap: { fr: '§ Image — exécution', en: '§ Image — execution' },
    quote: {
      fr: "Là où d'autres voient des <em>couleurs</em>, je vois des flux. Là où ils voient du design, je vois un système d'exploitation.",
      en: 'Where others see <em>colours</em>, I see flows. Where they see design, I see an operating system.',
    },
    attrib: { fr: 'Photo · Unsplash (libre)', en: 'Photo · Unsplash (free)' },
  },
];
