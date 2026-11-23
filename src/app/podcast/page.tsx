import { pageMeta } from '@/lib/page-meta';
import { PodcastClient } from './PodcastClient';

export const metadata = pageMeta({
  title: 'Créapreneur — le podcast d’Alexandre « Xtincell » Djengue',
  description:
    "Créapreneur, le podcast de l’entrepreneuriat créatif en Afrique francophone : chaque mois, un créatif qui bloque, le diagnostic et la grille de lecture pour avancer. / A monthly podcast on creative entrepreneurship in French-speaking Africa.",
  path: '/podcast',
});

export default function PodcastPage() {
  return <PodcastClient />;
}
