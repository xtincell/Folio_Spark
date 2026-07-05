import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCase, type CaseStudy } from '@/components/folio/data/cases';
import { CaseStudyClient, type CaseLite } from './CaseStudyClient';

/** Projection légère d'une case pour la nav prev/next et les cas liés. */
const lite = (c: CaseStudy): CaseLite => ({
  slug: c.slug,
  name: c.name,
  client: c.client,
  year: c.year,
  hero: c.hero,
  hat: c.hat,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: `${c.name.fr} — ${c.client.fr} · Xtincell`,
    description: c.context.fr,
    alternates: { canonical: `/work/${c.slug}` },
    // Unlisted cases stay reachable by direct link but are kept out of search.
    ...(c.hidden ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: `${c.name.fr} — ${c.client.fr}`,
      description: c.context.fr,
      url: `/work/${c.slug}`,
      images: [{ url: c.hero }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  // Prev/next dans l'ordre éditorial (cases visibles), avec bouclage.
  const visible = CASE_STUDIES.filter((x) => !x.hidden);
  const idx = visible.findIndex((x) => x.slug === slug);
  const prev = idx >= 0 ? lite(visible[(idx - 1 + visible.length) % visible.length]!) : undefined;
  const next = idx >= 0 ? lite(visible[(idx + 1) % visible.length]!) : undefined;

  // Cas liés : même client d'abord, puis même pratique.
  const sameClient = visible.filter((x) => x.slug !== slug && x.client.fr === c.client.fr);
  const sameHat = visible.filter(
    (x) => x.slug !== slug && x.hat === c.hat && !sameClient.some((s) => s.slug === x.slug),
  );
  const related = [...sameClient, ...sameHat].slice(0, 3).map(lite);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Folio', item: '/work' },
      { '@type': 'ListItem', position: 3, name: c.name.fr, item: `/work/${c.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <CaseStudyClient caseStudy={c} prev={prev} next={next} related={related} />
    </>
  );
}
