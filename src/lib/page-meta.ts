import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xtincell.powerupgraders.com';

/**
 * Metadata par page : title/description + canonical + OpenGraph/Twitter
 * dédiés (sans lui, les pages héritent de l'OG générique du layout racine).
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const { title, description, path, image = '/portrait.jpg' } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Xtincell · Alexandre Djengue',
      url: path,
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
