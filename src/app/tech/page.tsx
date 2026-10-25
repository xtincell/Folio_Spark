import { pageMeta } from '@/lib/page-meta';
import { TechClient } from './TechClient';

export const metadata = pageMeta({
  path: '/tech',
  title: 'Tech & Produit — Alexandre Djengue · Xtincell',
  description:
    "Produits et outils d’Alexandre « Xtincell » Djengue : sites et applications web, SPAWT, LaFusée et La Barre. Conception, développement assisté par IA et travaux en cours. Projets clé en main à partir de 1000 €. / Products and tools: websites, apps, AI-assisted development and work in progress — turnkey from €1,000.",
});

export default function FolioTechPage() {
  return <TechClient />;
}
