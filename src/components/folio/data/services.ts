import type { Bi } from '@/lib/i18n';

/** Starting prices retained from the portfolio's published catalogue (8d445bb).
 * Scope is confirmed by quote; no availability or turnaround is promised here. */
export type ServiceId = 'conseil' | 'identite' | 'direction' | 'photo' | 'web' | 'motion';
export const SERVICES: { id: ServiceId; name: Bi; eur: number; unit: Bi; deliverables: Bi[]; scope: Bi; quote: Bi }[] = [
  { id: 'conseil', name: { fr: 'Conseil & stratégie', en: 'Consulting & strategy' }, eur: 500,
    unit: { fr: 'par atelier', en: 'per workshop' },
    scope: { fr: 'Vous lancez une offre ou votre communication manque de direction. Nous travaillons sur un enjeu précis pour décider quoi dire, à qui et par où commencer.', en: 'You are launching an offer or your communication needs direction. We focus on one challenge to decide what to say, to whom and where to start.' },
    deliverables: [
      { fr: 'Un atelier de cadrage : objectifs, public, offre et contraintes.', en: 'A scoping workshop covering goals, audience, offer and constraints.' },
      { fr: 'Une synthèse écrite du diagnostic et du positionnement recommandé.', en: 'A written summary of the diagnosis and recommended positioning.' },
      { fr: 'Une feuille de route avec les actions à prioriser.', en: 'A roadmap with prioritised next actions.' },
    ],
    quote: { fr: 'Durée, participants et documents à examiner fixés au devis. La création de contenus et les études terrain font l’objet d’un périmètre distinct.', en: 'Duration, participants and materials to review are agreed in the quote. Content creation and field research have a separate scope.' } },
  { id: 'identite', name: { fr: 'Branding & identité', en: 'Branding & identity' }, eur: 1200,
    unit: { fr: 'par projet', en: 'per project' },
    scope: { fr: 'Vous créez une marque ou faites évoluer son image. Le projet pose une identité visuelle que votre équipe pourra utiliser sur ses supports.', en: 'You are creating a brand or updating its image. The project establishes a visual identity your team can use across its materials.' },
    deliverables: [
      { fr: 'Un logo et ses déclinaisons selon les usages retenus.', en: 'A logo and variants for the agreed uses.' },
      { fr: 'Une mini-charte : couleurs, typographies et règles d’utilisation du logo.', en: 'Essential guidelines: colours, typography and rules for using the logo.' },
      { fr: 'Un dossier de fichiers sources et d’exports pour le web et l’impression.', en: 'An organised pack of source files and exports for web and print.' },
    ],
    quote: { fr: 'Pistes, retours et déclinaisons fixés au devis. Naming, packaging, impressions et achat de polices sont chiffrés séparément si nécessaires.', en: 'Concepts, revisions and variants are agreed in the quote. Naming, packaging, printing and font purchases are priced separately when needed.' } },
  { id: 'direction', name: { fr: 'Direction artistique', en: 'Art direction' }, eur: 900,
    unit: { fr: 'par projet', en: 'per project' },
    scope: { fr: 'Vous préparez une campagne, un lancement ou un événement. Je définis le concept visuel et la direction à suivre pour produire les images.', en: 'You are preparing a campaign, launch or event. I define the visual concept and the direction for producing its imagery.' },
    deliverables: [
      { fr: 'Un concept de campagne : idée, message et parti pris visuel.', en: 'A campaign concept: idea, message and visual approach.' },
      { fr: 'Une planche de références pour cadrer composition, lumière et style.', en: 'A reference board defining composition, lighting and style.' },
      { fr: 'Un visuel principal finalisé au format convenu, avec indications de déclinaison.', en: 'A finished key visual in the agreed format, with adaptation guidance.' },
    ],
    quote: { fr: 'Supports et retours fixés au devis. Shooting, casting, achats d’images, fabrication et déclinaisons supplémentaires dépendent de la production retenue.', en: 'Formats and revisions are agreed in the quote. Shoots, casting, image purchases, production and extra adaptations depend on the chosen execution.' } },
  { id: 'photo', name: { fr: 'Photographie', en: 'Photography' }, eur: 600,
    unit: { fr: 'la journée', en: 'per day' },
    scope: { fr: 'Vous avez besoin de portraits, d’images produit ou d’un reportage d’événement. Le tarif de départ correspond à une journée de prise de vue.', en: 'You need portraits, product images or event coverage. The starting price covers a day of shooting.' },
    deliverables: [
      { fr: 'La préparation des prises de vue et la séance selon le brief validé.', en: 'Shoot preparation and photography based on the approved brief.' },
      { fr: 'Une sélection d’images avec traitement colorimétrique et retouche.', en: 'An image selection with colour correction and retouching.' },
      { fr: 'Les photographies retenues livrées en fichiers haute définition et web.', en: 'The agreed photographs delivered as high-resolution and web files.' },
    ],
    quote: { fr: 'Nombre de photos, niveau de retouche et droits d’usage fixés au devis. Studio, déplacement, accessoires et équipe éventuelle sont précisés séparément.', en: 'Image count, retouching level and usage rights are agreed in the quote. Studio, travel, props and any additional crew are listed separately.' } },
  { id: 'web', name: { fr: 'Web & outils', en: 'Web & tools' }, eur: 1000,
    unit: { fr: 'par projet', en: 'per project' },
    scope: { fr: 'Vous présentez votre activité ou une campagne en ligne. Le tarif de départ concerne un site vitrine ou une page de présentation ; les outils métier sont cadrés à part.', en: 'You are presenting your business or a campaign online. The starting price is for a showcase site or landing page; business tools are scoped separately.' },
    deliverables: [
      { fr: 'La structure des pages et leur design à partir de vos contenus.', en: 'Page structure and design built around your content.' },
      { fr: 'Le développement adapté aux écrans mobiles et ordinateurs.', en: 'Development adapted to mobile and desktop screens.' },
      { fr: 'Les vérifications, la mise en ligne et les éléments de prise en main.', en: 'Checks, deployment and handover materials.' },
    ],
    quote: { fr: 'Pages, fonctions, langues et contenus fixés au devis. Domaine, hébergement, licences et maintenance sont précisés ; application et e-commerce sur devis adapté.', en: 'Pages, features, languages and content are agreed in the quote. Domain, hosting, licences and maintenance are specified; apps and e-commerce receive a tailored quote.' } },
  { id: 'motion', name: { fr: 'Motion & vidéo', en: 'Motion & video' }, eur: 800,
    unit: { fr: 'par projet', en: 'per project' },
    scope: { fr: 'Vous souhaitez une capsule, un film de marque ou un habillage animé. Nous construisons la vidéo et ses adaptations à partir des éléments disponibles ou à produire.', en: 'You need a short video, brand film or motion graphics. We build the video and its adaptations from available or newly produced materials.' },
    deliverables: [
      { fr: 'Un déroulé validé avant montage : séquences, messages et intention.', en: 'An approved outline before editing: sequences, messages and intent.' },
      { fr: 'Le montage et l’habillage graphique ou animé prévus au brief.', en: 'Editing and the graphic or motion treatment defined in the brief.' },
      { fr: 'La vidéo finale et les exports adaptés aux réseaux convenus.', en: 'The final video and exports for the agreed social channels.' },
    ],
    quote: { fr: 'Durée, formats, retours et sous-titres fixés au devis. Tournage, voix off, musique sous licence et animation complexe sont chiffrés selon le besoin.', en: 'Length, formats, revisions and subtitles are agreed in the quote. Filming, voice-over, licensed music and complex animation are priced to match the brief.' } },
];

export function servicePrice(eur: number, currency: 'fcfa' | 'eur') {
  const amount = currency === 'fcfa' ? Math.round(eur * 655.957 / 5000) * 5000 : eur;
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${currency === 'fcfa' ? 'FCFA' : '€'}`;
}
