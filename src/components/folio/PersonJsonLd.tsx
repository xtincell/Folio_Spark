import { PRESS } from './data/press';
import { CONTACT } from './data/contact';
import { SOCIAL_PROFILES } from './data/social-feed';

/**
 * Person / ProfilePage structured data (JSON-LD).
 *
 * Server-rendered into the home page so search engines resolve the identity
 * behind the folio — name, alias, role — and connect it to the press coverage
 * (`subjectOf`) and every owned profile (`sameAs`). Rendering from the same
 * data files that drive the UI keeps the schema in sync with the page.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xtincell.com';

export function PersonJsonLd() {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Alexandre Djengue',
    alternateName: 'Xtincell',
    url: SITE_URL,
    image: `${SITE_URL}/portrait.jpg`,
    jobTitle: 'Brand Architect & Storytelling Consultant',
    description:
      "Directeur artistique formé en télécommunications. Brand Architect, Storytelling Consultant et Toolsmith — méthode ADVE/RTIS, OS LaFusée, agence UPgraders.",
    nationality: 'Cameroonian',
    knowsLanguage: ['fr', 'en'],
    worksFor: {
      '@type': 'Organization',
      name: 'UPgraders',
      description: "Conciergerie de l'industrie créative — Afrique de l'Ouest & Centrale.",
    },
    sameAs: [
      SOCIAL_PROFILES.instagram,
      SOCIAL_PROFILES.facebook,
      SOCIAL_PROFILES.youtube,
      CONTACT.linkedinLink,
      CONTACT.behance,
      CONTACT.twitter,
    ],
    subjectOf: PRESS.map((p) => ({
      '@type': p.type === 'podcast' ? 'PodcastSeries' : 'Article',
      name: p.title.fr,
      url: p.url,
      ...(p.iso ? { datePublished: p.iso } : {}),
      publisher: { '@type': 'Organization', name: p.outlet },
    })),
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: 'Xtincell — Alexandre Djengue · Brand Architect',
        inLanguage: 'fr',
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      person,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
