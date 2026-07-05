import { pageMeta } from '@/lib/page-meta';
import { GalerieClient } from './GalerieClient';

export const metadata = pageMeta({
  path: '/galerie',
  title: 'Galerie / Gallery — Photographie · Xtincell',
  description:
    "Galerie photo d'Alexandre « Xtincell » Djengue : mariages, festivals (KOF), portraits artistes (Locko, Lydol, H3riQ), corporate, reportages. / Photo gallery: weddings, festivals, artist portraits, corporate, reportage.",
});

export default function GaleriePage() {
  return <GalerieClient />;
}
