export type EditoPicData = {
  src: string;
  cap: string;
  quote: string; // may contain HTML (<em>)
  attrib: string;
  flip?: boolean;
};

export const EDITOPICS: EditoPicData[] = [
  {
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80&auto=format&fit=crop',
    cap: '§ Image — échantillon 01',
    quote:
      "Une marque, c'est d'abord une <em>circuiterie</em> — puis une histoire qui passe dedans.",
    attrib: 'Photo · Unsplash (libre)',
  },
  {
    src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&q=80&auto=format&fit=crop',
    cap: '§ Image — atelier',
    quote:
      "Tradition × futur. Local × global. Artisanat × IA. Les marques fortes habitent les <em>tensions</em>.",
    attrib: 'Photo · Unsplash (libre)',
    flip: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=1600&q=80&auto=format&fit=crop',
    cap: '§ Image — exécution',
    quote:
      "Là où d'autres voient des <em>couleurs</em>, je vois des flux. Là où ils voient du design, je vois un système d'exploitation.",
    attrib: 'Photo · Unsplash (libre)',
  },
];
