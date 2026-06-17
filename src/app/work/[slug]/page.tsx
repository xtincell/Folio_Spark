import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCase } from '@/components/folio/data/cases';
import { CaseStudyClient } from './CaseStudyClient';

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
    openGraph: {
      title: `${c.name.fr} — ${c.client.fr}`,
      description: c.context.fr,
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
  return <CaseStudyClient caseStudy={c} />;
}
