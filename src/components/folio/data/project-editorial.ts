import type { Bi } from '@/lib/i18n';

/** Editorial layer, separate from the generated project catalogue.
 * The notes describe decisions visible in the supplied artwork, not campaign performance.
 */
export type ProjectReading = {
  slug: string;
  reason: Bi;
  title?: Bi;
  challenge?: Bi;
  choice?: Bi;
  evidence?: { src: string; caption: Bi }[];
};

export const SELECTED_PROJECTS: ProjectReading[] = [
  {
    slug: 'friesland-campina',
    reason: { fr: 'Tenir une marque à travers des moments de vie différents.', en: 'Keeping a brand recognisable across different moments in life.' },
    title: { fr: 'Changer de scène. Garder la marque.', en: 'A different scene. The same brand.' },
    challenge: { fr: 'Le partage en famille et la performance sportive ne racontent pas la même chose. Les deux visuels doivent pourtant se lire comme du Bonnet Rouge.', en: 'Family time and sports performance tell different stories. Both visuals still need to read as Bonnet Rouge.' },
    choice: { fr: 'La scène et l’accroche changent. Le logo en haut à gauche, la boîte mise en avant et la vague rouge et jaune en pied gardent leur place. Ces repères relient les créations sans répéter la même image.', en: 'The scene and headline change. The logo at the top left, the prominent tin and the red-and-yellow wave at the bottom keep their place. These cues connect the pieces without repeating the same image.' },
    evidence: [
      { src: '/work/cases/friesland-campina/02.webp', caption: { fr: 'Le partage : la famille et le lait occupent la scène.', en: 'Sharing: family and milk take centre stage.' } },
      { src: '/work/cases/friesland-campina/03.webp', caption: { fr: 'La performance : les mêmes repères de marque dans un autre contexte.', en: 'Performance: the same brand cues in a different setting.' } },
    ],
  },
  {
    slug: 'kof-festival',
    reason: { fr: 'Passer du regard de photographe à la direction d’un festival.', en: 'Moving from photographing a festival to directing its visual identity.' },
    title: { fr: 'Une identité qui sert aussi à se repérer.', en: 'An identity that also helps people find their way.' },
    challenge: { fr: 'Le festival rassemble plusieurs activités et plusieurs niveaux de pass. L’identité doit aussi porter ces informations pratiques.', en: 'The festival brings together several activities and pass tiers. The identity also has to carry practical information.' },
    choice: { fr: 'Sur cette planche de pass, le logo et la structure du billet se répètent. Les couleurs et les illustrations distinguent les versions, tandis que les informations d’accès gardent leur propre zone.', en: 'On this pass presentation, the logo and ticket structure repeat. Colours and illustrations distinguish the versions, while access information has its own area.' },
    evidence: [{ src: '/work/cases/kof-festival/05.webp', caption: { fr: 'Présentation des pass du cinquième anniversaire : un cadre commun, plusieurs versions.', en: 'Fifth-anniversary pass presentation: a shared structure with several versions.' } }],
  },
  {
    slug: 'motion19-store',
    reason: { fr: 'Rendre une offre technique lisible dans les contenus retail.', en: 'Making a technical offer legible in retail content.' },
    title: { fr: 'Le produit et son prix, dans le même regard.', en: 'Product and price, seen together.' },
    challenge: { fr: 'Dans une publication commerciale, le matériel doit être identifiable et l’offre consultable sans chercher ailleurs dans le visuel.', en: 'In a retail post, the equipment needs to be identifiable and the offer readable without searching elsewhere in the image.' },
    choice: { fr: 'Chaque appareil est associé à son nom et à son prix. Le bleu isole l’information tarifaire ; la marque et les coordonnées restent sur les bords du visuel. La composition fait tenir plusieurs références sans les séparer de leur offre.', en: 'Each camera is paired with its name and price. Blue separates pricing from the rest; the brand and contact information stay at the edges. Several models share one composition without losing their offers.' },
    evidence: [{ src: '/work/cases/motion19-store/03.webp', caption: { fr: 'Black Friday 2025 : quatre appareils, chacun avec sa référence et son prix.', en: 'Black Friday 2025: four cameras, each with its model and price.' } }],
  },
  {
    slug: 'spawt',
    reason: { fr: 'Relier une marque, ses contenus et un produit en construction.', en: 'Connecting a brand, its content and a product in progress.' },
    title: { fr: 'Le chat comme fil conducteur.', en: 'The cat as a connecting thread.' },
    challenge: { fr: 'Les contenus alternent plats, réactions et situations du quotidien. Il leur faut des repères communs au-delà du logo.', en: 'The content alternates between food, reactions and everyday situations. It needs shared cues beyond the logo.' },
    choice: { fr: 'Dans cette exploration, le chat revient entre les images de plats et les messages. Le crème, l’or, le rouge et le vert passent d’une publication à l’autre. La répétition se fait par le personnage et les couleurs, avec des compositions différentes.', en: 'In this exploration, the cat returns between food images and messages. Cream, gold, red and green carry across posts. The character and colours repeat while the compositions change.' },
    evidence: [{ src: '/work/cases/spawt/03.webp', caption: { fr: 'Exploration de contenus de marque. Cette planche documente une étape, pas l’interface actuelle de l’application.', en: 'Brand-content exploration. This board records a stage of the project, not the current app interface.' } }],
  },
  {
    slug: 'la-barre',
    reason: { fr: 'Transformer les gestes du directeur créatif en outil de travail.', en: 'Turning the creative director’s workflow into a working tool.' },
  },
];

export const readingForProject = (slug: string) => SELECTED_PROJECTS.find(project => project.slug === slug);
