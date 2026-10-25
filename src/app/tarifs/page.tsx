import { TarifsClient } from './TarifsClient';
import { pageMeta, SITE_URL } from '@/lib/page-meta';

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Direction créative & accompagnement de projets — Xtincell',
  description:
    'Cadrage, direction artistique et accompagnement d’équipes ou de projets. Le périmètre, les moyens et le calendrier sont définis avant toute proposition.',
  provider: { '@id': `${SITE_URL}/#person` },
  serviceType: [
    'Cadrage de projet',
    'Direction créative et artistique',
    'Accompagnement d’équipe',
  ],
  url: `${SITE_URL}/tarifs`,
};

export const metadata = pageMeta({
  path: '/tarifs',
  title: 'Travailler ensemble — Alexandre Djengue · Xtincell',
  description:
    'Éclaircir une direction, diriger une création ou accompagner une équipe. Présentez votre projet à Alexandre « Xtincell » Djengue pour définir le bon périmètre de collaboration.',
});

export default function TarifsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <TarifsClient />
    </>
  );
}
