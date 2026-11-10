import type { Bi } from '@/lib/i18n';

/** Entry packages: deliberately limited scope, priced in FCFA. Expanded projects are quoted separately. */
export type ServiceId = 'conseil' | 'identite' | 'direction' | 'photo' | 'web' | 'motion';
export const SERVICES: { id: ServiceId; name: Bi; fcfa: number; unit: Bi; deliverables: Bi[]; scope: Bi; quote: Bi }[] = [
  { id: 'conseil', name: { fr: 'Conseil & stratégie', en: 'Consulting & strategy' }, fcfa: 35000,
    unit: { fr: 'la session de 45 minutes', en: 'per 45-minute session' },
    scope: { fr: 'Un regard extérieur pour débloquer une question de communication, préciser votre offre ou choisir votre prochaine action.', en: 'An outside perspective to resolve one communication question, clarify your offer or choose your next action.' },
    deliverables: [
      { fr: 'Un échange de 45 minutes à distance, consacré à un enjeu.', en: 'A 45-minute remote conversation focused on one challenge.' },
      { fr: 'La lecture préalable d’un brief ou d’un support transmis.', en: 'An advance review of one supplied brief or communication material.' },
      { fr: 'Une synthèse d’une page avec trois actions prioritaires.', en: 'A one-page summary with three priority actions.' },
    ],
    quote: { fr: 'Atelier d’équipe, audit approfondi, étude de marché et création de contenus : devis distinct. La session d’entrée porte sur une seule question.', en: 'Team workshops, in-depth audits, market research and content creation receive a separate quote. The entry session covers one question.' } },
  { id: 'identite', name: { fr: 'Branding & identité', en: 'Branding & identity' }, fcfa: 100000,
    unit: { fr: 'le logo essentiel', en: 'per essential logo package' },
    scope: { fr: 'Pour lancer une petite activité avec un logo utilisable et des repères visuels simples. Une première base pour votre marque.', en: 'Launch a small business with a usable logo and straightforward visual guidelines. A first foundation for your brand.' },
    deliverables: [
      { fr: 'Une piste de logo, puis une série de corrections regroupées.', en: 'One logo concept, followed by one consolidated revision round.' },
      { fr: 'Une fiche de référence : couleurs, typographies et version monochrome.', en: 'A reference sheet covering colours, typography and a monochrome version.' },
      { fr: 'Les fichiers du logo en SVG, PDF et PNG transparent.', en: 'Logo files in SVG, PDF and transparent PNG formats.' },
    ],
    quote: { fr: 'Naming, pistes supplémentaires, charte complète, packaging et déclinaisons sur supports : en complément. Les mockups illustrent des usages possibles ; ils ne sont pas tous inclus.', en: 'Naming, extra concepts, full guidelines, packaging and applications are additional services. Mockups illustrate possible uses; they are not all included.' } },
  { id: 'direction', name: { fr: 'Direction artistique', en: 'Art direction' }, fcfa: 75000,
    unit: { fr: 'le visuel de lancement', en: 'per launch visual' },
    scope: { fr: 'Une direction visuelle et un premier visuel pour annoncer une offre ou un événement, à partir de votre identité et de vos contenus existants.', en: 'A visual direction and one launch image for an offer or event, using your existing identity and content.' },
    deliverables: [
      { fr: 'Une planche d’intention pour valider le style et la composition.', en: 'One visual direction board to approve style and composition.' },
      { fr: 'Un visuel principal finalisé dans un format convenu.', en: 'One finished key visual in an agreed format.' },
      { fr: 'Une série de corrections regroupées et un export prêt à diffuser.', en: 'One consolidated revision round and a publication-ready export.' },
    ],
    quote: { fr: 'Photos et textes fournis par vos soins. Shooting, achats d’images, autres formats, campagne complète et production : sur devis complémentaire.', en: 'You supply photographs and copy. Shoots, image licensing, extra formats, full campaigns and production are quoted additionally.' } },
  { id: 'photo', name: { fr: 'Photographie', en: 'Photography' }, fcfa: 50000,
    unit: { fr: 'la séance portrait d’une heure', en: 'per one-hour portrait session' },
    scope: { fr: 'Une séance courte pour votre portrait professionnel ou votre communication personnelle, dans un seul lieu à Douala.', en: 'A short session for your professional portrait or personal communication, at one location in Douala.' },
    deliverables: [
      { fr: 'Une heure de prise de vue pour une personne, dans un lieu convenu.', en: 'One hour of photography for one person, at an agreed location.' },
      { fr: 'Cinq photographies sélectionnées, corrigées et retouchées.', en: 'Five selected photographs with colour correction and retouching.' },
      { fr: 'Les cinq fichiers livrés en haute définition et au format web.', en: 'The five images delivered in high-resolution and web versions.' },
    ],
    quote: { fr: 'Usage personnel et communication professionnelle propre. Studio, maquillage, déplacement hors Douala, images supplémentaires, publicité et reportage : à chiffrer séparément. Tirages non inclus.', en: 'Personal and own professional communication use. Studio, makeup, travel outside Douala, extra images, advertising and event coverage are priced separately. Prints are not included.' } },
  { id: 'web', name: { fr: 'Web & outils', en: 'Web & tools' }, fcfa: 150000,
    unit: { fr: 'la page vitrine', en: 'per showcase page' },
    scope: { fr: 'Une page pour présenter clairement votre activité et faciliter la prise de contact. Vos textes, votre logo et vos images constituent le point de départ.', en: 'One page to clearly present your business and make contact easier. Your copy, logo and images provide the starting point.' },
    deliverables: [
      { fr: 'Une page en une langue, jusqu’à cinq sections, avec vos contenus fournis.', en: 'One page in one language, up to five sections, using your supplied content.' },
      { fr: 'Un affichage adapté au mobile et à l’ordinateur, avec lien de contact.', en: 'A mobile and desktop layout with a contact link.' },
      { fr: 'Une série de corrections regroupées, vérifications et mise en ligne.', en: 'One consolidated revision round, checks and deployment.' },
    ],
    quote: { fr: 'Domaine, hébergement et maintenance en complément. Rédaction, pages supplémentaires, formulaire connecté, paiement, espace membre, application et outils métier : sur devis.', en: 'Domain, hosting and maintenance are additional. Copywriting, extra pages, connected forms, payments, member areas, apps and business tools receive a separate quote.' } },
  { id: 'motion', name: { fr: 'Motion & vidéo', en: 'Motion & video' }, fcfa: 75000,
    unit: { fr: 'la capsule de 15 secondes', en: 'per 15-second video' },
    scope: { fr: 'Une capsule courte pour les réseaux sociaux, montée à partir de vos images, de vos textes et de votre logo déjà disponibles.', en: 'A short social video edited from your existing images, copy and logo.' },
    deliverables: [
      { fr: 'Un déroulé simple et un montage de 15 secondes maximum.', en: 'A simple outline and an edit up to 15 seconds long.' },
      { fr: 'Un habillage de titres et des transitions simples.', en: 'Title graphics and simple transitions.' },
      { fr: 'Une série de corrections regroupées et un export MP4 dans un format.', en: 'One consolidated revision round and one MP4 export in one format.' },
    ],
    quote: { fr: 'Tournage, voix off, musique sous licence, sous-titrage, autres formats et animation complexe en complément. Le showreel présente des projets de périmètres variés.', en: 'Filming, voice-over, licensed music, subtitles, extra formats and complex animation are additional. The showreel includes projects with varying scopes.' } },
];

export function servicePrice(fcfa: number, currency: 'fcfa' | 'eur') {
  const amount = currency === 'fcfa' ? fcfa : Math.round(fcfa / 655.957);
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${currency === 'fcfa' ? 'FCFA' : '€'}`;
}
