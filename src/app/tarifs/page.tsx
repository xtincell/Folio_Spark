import { TarifsClient } from './TarifsClient';
import { pageMeta, SITE_URL } from '@/lib/page-meta';

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tarifs & prestations — Xtincell',
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
  title: 'Tarifs & prestations — Alexandre Djengue · Xtincell',
  description:
    'Tarifs de départ en FCFA et en euros : conseil, identité, direction artistique, photographie, web et vidéo. Définissez votre projet avec Alexandre « Xtincell » Djengue.',
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
