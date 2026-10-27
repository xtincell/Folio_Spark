import type { Bi } from '@/lib/i18n';

/** Starting prices retained from the portfolio's published catalogue (8d445bb).
 * Scope is confirmed by quote; no availability or turnaround is promised here. */
export const SERVICES: { id: string; name: Bi; eur: number; unit: Bi; includes: Bi; scope: Bi }[] = [
  { id: 'conseil', name: { fr: 'Conseil & stratégie', en: 'Consulting & strategy' }, eur: 500,
    unit: { fr: 'par atelier', en: 'per workshop' },
    includes: { fr: 'Atelier de cadrage et restitution écrite.', en: 'Scoping workshop and written recommendations.' },
    scope: { fr: 'Pour préciser un positionnement, un problème de marque ou les prochaines actions.', en: 'To clarify positioning, a brand problem or the next actions.' } },
  { id: 'identite', name: { fr: 'Branding & identité', en: 'Branding & identity' }, eur: 1200,
    unit: { fr: 'par projet', en: 'per project' },
    includes: { fr: 'Logo, mini-charte et fichiers sources.', en: 'Logo, essential guidelines and source files.' },
    scope: { fr: 'Pour donner à une marque ses repères visuels et leurs règles d’usage.', en: 'To define a brand’s visual identity and how to use it.' } },
  { id: 'direction', name: { fr: 'Direction artistique', en: 'Art direction' }, eur: 900,
    unit: { fr: 'par projet', en: 'per project' },
    includes: { fr: 'Concept, planche de références et visuel principal.', en: 'Concept, moodboard and key visual.' },
    scope: { fr: 'Pour définir le parti pris d’une campagne et orienter sa fabrication.', en: 'To define a campaign’s approach and guide its production.' } },
  { id: 'photo', name: { fr: 'Photographie', en: 'Photography' }, eur: 600,
    unit: { fr: 'la journée', en: 'per day' },
    includes: { fr: 'Prise de vue, sélection et images retouchées.', en: 'Shoot, selection and retouched images.' },
    scope: { fr: 'Portrait, produit, studio ou événement. Nombre d’images et droits précisés au devis.', en: 'Portrait, product, studio or event. Image count and usage rights specified in the quote.' } },
  { id: 'web', name: { fr: 'Web & outils', en: 'Web & tools' }, eur: 1000,
    unit: { fr: 'par projet', en: 'per project' },
    includes: { fr: 'Site responsive livré et mis en ligne.', en: 'Responsive website, delivered and deployed.' },
    scope: { fr: 'Site vitrine ou page de campagne. Applications et outils métier sur devis adapté.', en: 'Showcase site or campaign landing page. Apps and business tools receive a tailored quote.' } },
  { id: 'motion', name: { fr: 'Motion & vidéo', en: 'Motion & video' }, eur: 800,
    unit: { fr: 'par projet', en: 'per project' },
    includes: { fr: 'Vidéo montée et adaptations pour les réseaux.', en: 'Edited video and social formats.' },
    scope: { fr: 'Capsule, film de marque ou habillage animé. Durée et production définies ensemble.', en: 'Short video, brand film or motion graphics. Length and production agreed together.' } },
];

export function servicePrice(eur: number, currency: 'fcfa' | 'eur') {
  const amount = currency === 'fcfa' ? Math.round(eur * 655.957 / 5000) * 5000 : eur;
  return `${new Intl.NumberFormat('fr-FR').format(amount)} ${currency === 'fcfa' ? 'FCFA' : '€'}`;
}
