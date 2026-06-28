import type { Metadata } from 'next';
import { TarifsClient } from './TarifsClient';

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
  return <TarifsClient />;
}
