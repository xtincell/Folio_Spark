import type { Metadata } from 'next';
import { ConditionsClient } from './ConditionsClient';

export const metadata: Metadata = {
  title: 'Conditions & modalités — Xtincell · Alexandre Djengue',
  description:
    "Conditions de prestation d'Alexandre « Xtincell » Djengue : devis, prix, paiement en plusieurs fois, délais, révisions, cession des droits, confidentialité. Conseil & production, remote Afrique · Europe.",
  alternates: { canonical: '/conditions' },
  openGraph: {
    title: 'Conditions & modalités — Xtincell',
    description:
      'Devis, paiement en plusieurs fois, délais, droits & confidentialité. Les règles du jeu, noir sur blanc.',
    url: '/conditions',
    images: [{ url: '/portrait.jpg', width: 610, height: 762, alt: 'Alexandre Djengue — Xtincell' }],
  },
};

export default function ConditionsPage() {
  return <ConditionsClient />;
}
