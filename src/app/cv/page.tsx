import { pageMeta } from '@/lib/page-meta';
import { CvClient } from './CvClient';

export const metadata = pageMeta({
  title: 'CV / Résumé — Alexandre Djengue · Xtincell',
  description:
    "Curriculum Vitae éditorial d'Alexandre « Xtincell » Djengue : 15 ans en marketing & design, méthode ADVE/RTIS, co-fondateur & CEO d'UPgraders. / Editorial résumé: 15 years in marketing & design.",
  path: '/cv',
});

export default function FolioCVPage() {
  return <CvClient />;
}
