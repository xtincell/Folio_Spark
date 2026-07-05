import type { Metadata } from 'next';
import { TarifsClient } from './TarifsClient';
import { SITE_URL } from '@/lib/page-meta';

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Conseil en marque, direction artistique & production',
  provider: { '@id': `${SITE_URL}/#person` },
  areaServed: ['Cameroun', "Côte d'Ivoire", 'Afrique de l’Ouest & Centrale', 'Europe (remote)'],
  url: `${SITE_URL}/tarifs`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Offres Xtincell',
    itemListElement: [
      { '@type': 'Offer', name: 'Audit de marque express (Le Flash)' },
      { '@type': 'Offer', name: 'Forfaits one-shot — identité, campagne, image' },
      { '@type': 'Offer', name: 'Accompagnements retainer — stratège embarqué' },
    ],
  },
};

export const metadata: Metadata = {
  title: 'Tarifs — Alexandre « Xtincell » Djengue · Brand Architect',
  description:
    "Tarifs d'Alexandre « Xtincell » Djengue — Brand Architect & Art Director. Forfaits one-shot et accompagnements retainer, en euro et en FCFA. Remote Afrique · Europe. De la poussière à l'étoile.",
  alternates: { canonical: '/tarifs' },
  openGraph: {
    title: 'Tarifs — Xtincell · Brand Architect',
    description:
      "Forfaits one-shot et retainers, en euro et en FCFA. De la poussière à l'étoile.",
    url: '/tarifs',
    images: [{ url: '/portrait.jpg', width: 610, height: 762, alt: 'Alexandre Djengue — Xtincell' }],
  },
};

export default function TarifsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <TarifsClient />
    </>
  );
}
