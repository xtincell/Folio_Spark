import { pageMeta } from '@/lib/page-meta';
import { TechClient } from './TechClient';

export const metadata = pageMeta({
  path: '/tech',
  title: 'Outils & expériences — Alexandre Djengue · Xtincell',
  description:
    "Outils et expériences d’Alexandre « Xtincell » Djengue : conception produit, UX/UI et développement assisté par IA. Sites en ligne, prototypes et outils internes, avec leurs rôles et statuts. / Product design, UX/UI and AI-assisted development: online projects, prototypes and internal tools, with their roles and status.",
});

export default function FolioTechPage() {
  return <TechClient />;
}
