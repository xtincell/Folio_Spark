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
    title: 'Xtincell — Le Signal · Landing',
    description:
      "Le marché est un vacarme ; votre marque sera un signal. L'expérience 3D d'Alexandre « Xtincell » Djengue, ingénieur télécom devenu directeur artistique.",
  }),
  robots: { index: false, follow: false },
};

export default function LandingCosmosPage() {
  return <LandingCosmosClient />;
}
