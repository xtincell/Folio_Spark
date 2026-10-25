import { pageMeta } from '@/lib/page-meta';
import { CASE_STUDIES } from '@/components/folio/data/cases';
import { WorkClient } from './WorkClient';

const projectCount = CASE_STUDIES.filter((project) => !project.hidden).length;

export const metadata = pageMeta({
  path: '/work',
  title: 'Projets — Direction artistique, marques & produits · Xtincell',
  description:
    `Les ${projectCount} dossiers du portfolio d'Alexandre « Xtincell » Djengue : direction artistique, identités, photographie et produits numériques. / ${projectCount} portfolio projects across art direction, brand identity, photography and digital products.`,
});

export default function FolioWorkPage() {
  return <WorkClient />;
}
