import { pageMeta } from '@/lib/page-meta';
import { CvClient } from './CvClient';

export const metadata = pageMeta({
  title: 'CV / Résumé — Alexandre Djengue · Xtincell',
  description:
    "Le parcours d’Alexandre « Xtincell » Djengue : des télécommunications à la direction créative, la photographie et la conception d’outils. Expériences, responsabilités et collaborations. / Background in creative direction, photography and tool design.",
  path: '/cv',
});

export default function FolioCVPage() {
  return <CvClient />;
}
