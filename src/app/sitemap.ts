import type { MetadataRoute } from 'next';
import { CASE_STUDIES } from '@/components/folio/data/cases';
import { getBlogIndex } from '@/lib/wordpress';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xtincell.powerupgraders.com';

/**
 * Site-wide sitemap. Static folio routes + the dynamic work cases and
 * UPgraders blog posts, so every indexable URL is discoverable by crawlers.
 * Hidden/unlisted cases (e.g. the personal sketchbook) are excluded — they
 * carry `robots: noindex` on their own pages and shouldn't be advertised here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${SITE_URL}${path}`;

  const staticRoutes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/', priority: 1.0, freq: 'monthly' },
    { path: '/work', priority: 0.9, freq: 'monthly' },
    { path: '/galerie', priority: 0.8, freq: 'monthly' },
    { path: '/tech', priority: 0.8, freq: 'monthly' },
    { path: '/design', priority: 0.7, freq: 'monthly' },
    { path: '/cv', priority: 0.8, freq: 'monthly' },
    { path: '/recrutement', priority: 0.9, freq: 'monthly' },
    { path: '/tarifs', priority: 0.7, freq: 'monthly' },
    { path: '/conditions', priority: 0.3, freq: 'yearly' },
    { path: '/upgraders', priority: 0.7, freq: 'monthly' },
    { path: '/upgraders/services', priority: 0.6, freq: 'monthly' },
    { path: '/upgraders/blog', priority: 0.6, freq: 'weekly' },
    { path: '/upgraders/contact', priority: 0.5, freq: 'yearly' },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: url(r.path),
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASE_STUDIES.filter((c) => !c.hidden).map((c) => ({
    url: url(`/work/${c.slug}`),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // Posts réellement servis (WordPress si configuré, sinon fallback local).
  const { posts } = await getBlogIndex({ perPage: 100 });
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: url(`/upgraders/blog/${p.slug}`),
    lastModified: p.updatedAt || p.publishedAt || undefined,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...caseEntries, ...blogEntries];
}
