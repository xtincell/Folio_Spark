import { pageMeta } from '@/lib/page-meta';
import { LandingClient } from './LandingClient';

export const metadata = pageMeta({
  path: '/landing',
  title: 'Xtincell — Brand Architect · Landing',
  description:
    "Carte de visite cosmique d'Alexandre « Xtincell » Djengue — Brand Architect. WhatsApp direct sous 48 h ou explorez le folio complet.",
});

export default function LandingPage() {
  return <LandingClient />;
}
