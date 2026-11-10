import { pageMeta } from '@/lib/page-meta';
import { RecrutementClient } from './RecrutementClient';

export const metadata = {
  ...pageMeta({
  path: '/recrutement',
  title: 'Recrutement — Alexandre Djengue · Directeur Artistique',
  description:
    "Candidature d'Alexandre Djengue au poste de Directeur Artistique en charge du département de la création. CDI, temps plein, Abidjan. 5 créatifs dirigés, 118 projets, 13 marchés. CV et folio à jour. / Application for Art Director leading the creative department.",
  }),
  // Page de candidature : gardée pour les liens déjà envoyés, retirée de la navigation et des moteurs.
  robots: { index: false, follow: false },
};

export default function RecrutementPage() {
  return <RecrutementClient />;
}
