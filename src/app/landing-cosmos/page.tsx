import type { Metadata } from 'next';
import { pageMeta } from '@/lib/page-meta';
import { LandingCosmosClient } from './LandingCosmosClient';

/**
 * Landing alternative « Cosmos » — même contenu que /landing, mais portée par
 * l'univers three.js (particules GPU morphées au scroll). Sert à comparer les
 * expériences de visite ; noindex pour éviter le duplicate SEO pendant le test.
 */
export const metadata: Metadata = {
  ...pageMeta({
    path: '/landing-cosmos',
    title: 'Xtincell — Brand Architect · Landing Cosmos',
    description:
      "Variante cosmique de la landing d'Alexandre « Xtincell » Djengue — un univers de particules qui s'assemble au scroll, de la poussière à l'étoile.",
  }),
  robots: { index: false, follow: false },
};

export default function LandingCosmosPage() {
  return <LandingCosmosClient />;
}
