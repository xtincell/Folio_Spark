import { SITE_URL } from '@/lib/page-meta';

/** Schéma WebSite global — publié sur toutes les pages via le layout racine. */
export function SiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Xtincell — Alexandre Djengue',
    inLanguage: 'fr',
    publisher: { '@id': `${SITE_URL}/#person` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
