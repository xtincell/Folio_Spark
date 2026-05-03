/**
 * UPgraders blog — WordPress REST API client.
 *
 * Reads `WORDPRESS_API_URL`. When unset (local dev / preview without WP),
 * returns the bundled fallback posts so the site keeps shipping.
 *
 * The mapping below normalizes WP REST `_embed` payloads into a small,
 * UI-shaped `BlogPost` type so the React layer never touches WP shapes.
 */
import { FALLBACK_POSTS, type BlogPost } from '@/components/folio/upgraders/data/posts';

export type { BlogPost };

export type BlogIndex = {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  source: 'wordpress' | 'fallback';
};

const REVALIDATE = Number(process.env.WORDPRESS_REVALIDATE ?? 600);

function getApiRoot(): string | null {
  const raw = process.env.WORDPRESS_API_URL?.trim();
  if (!raw) return null;
  const trimmed = raw.replace(/\/+$/, '');
  if (trimmed.includes('/wp-json/')) return trimmed;
  return `${trimmed}/wp-json/wp/v2`;
}

type WpRendered = { rendered: string };
type WpTerm = { id: number; name: string; slug: string; taxonomy: string };
type WpAuthor = { id: number; name: string; slug: string; avatar_urls?: Record<string, string> };
type WpMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: { width?: number; height?: number };
};

type WpPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  status: string;
  title: WpRendered;
  content: WpRendered;
  excerpt: WpRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WpAuthor[];
    'wp:featuredmedia'?: WpMedia[];
    'wp:term'?: WpTerm[][];
  };
};

function stripTags(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function readingMinutes(html: string): number {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function mapWpPost(p: WpPost): BlogPost {
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  const author = p._embedded?.author?.[0];
  const flatTerms = (p._embedded?.['wp:term'] ?? []).flat();
  const categories = flatTerms.filter((t) => t.taxonomy === 'category');
  const tags = flatTerms.filter((t) => t.taxonomy === 'post_tag');

  return {
    id: String(p.id),
    slug: p.slug,
    title: stripTags(p.title.rendered),
    excerpt: stripTags(p.excerpt.rendered),
    contentHtml: p.content.rendered,
    publishedAt: p.date,
    updatedAt: p.modified,
    readingMinutes: readingMinutes(p.content.rendered),
    cover: media?.source_url
      ? {
          src: media.source_url,
          alt: media.alt_text || stripTags(p.title.rendered),
          width: media.media_details?.width,
          height: media.media_details?.height,
        }
      : undefined,
    author: author
      ? {
          name: author.name,
          slug: author.slug,
          avatar: author.avatar_urls?.['96'] ?? author.avatar_urls?.['48'],
        }
      : undefined,
    categories: categories.map((c) => ({ name: c.name, slug: c.slug })),
    tags: tags.map((t) => ({ name: t.name, slug: t.slug })),
    canonical: p.link,
  };
}

async function fetchWp<T>(path: string): Promise<{ data: T; headers: Headers } | null> {
  const root = getApiRoot();
  if (!root) return null;
  const url = `${root}${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE, tags: ['upgraders-blog'] },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as T;
    return { data, headers: res.headers };
  } catch {
    return null;
  }
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '') continue;
    usp.set(k, String(v));
  }
  const s = usp.toString();
  return s ? `?${s}` : '';
}

function paginate(posts: BlogPost[], page: number, perPage: number): BlogPost[] {
  const start = (page - 1) * perPage;
  return posts.slice(start, start + perPage);
}

export async function getBlogIndex(opts: { page?: number; perPage?: number; category?: string; tag?: string } = {}): Promise<BlogIndex> {
  const page = Math.max(1, opts.page ?? 1);
  const perPage = Math.max(1, Math.min(50, opts.perPage ?? 9));
  const category = opts.category ?? process.env.WORDPRESS_FILTER_CATEGORY ?? undefined;
  const tag = opts.tag ?? process.env.WORDPRESS_FILTER_TAG ?? undefined;

  const wp = await fetchWp<WpPost[]>(
    `/posts${buildQuery({
      _embed: 1,
      per_page: perPage,
      page,
      categories_slug: category,
      tags_slug: tag,
      orderby: 'date',
      order: 'desc',
    })}`,
  );

  if (wp) {
    const total = Number(wp.headers.get('x-wp-total') ?? wp.data.length);
    const totalPages = Number(wp.headers.get('x-wp-totalpages') ?? 1);
    return { posts: wp.data.map(mapWpPost), total, totalPages, source: 'wordpress' };
  }

  let pool = FALLBACK_POSTS;
  if (category) pool = pool.filter((p) => p.categories.some((c) => c.slug === category));
  if (tag) pool = pool.filter((p) => p.tags.some((t) => t.slug === tag));
  return {
    posts: paginate(pool, page, perPage),
    total: pool.length,
    totalPages: Math.max(1, Math.ceil(pool.length / perPage)),
    source: 'fallback',
  };
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const wp = await fetchWp<WpPost[]>(`/posts${buildQuery({ slug, _embed: 1 })}`);
  if (wp && wp.data.length > 0 && wp.data[0]) return mapWpPost(wp.data[0]);
  return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const idx = await getBlogIndex({ perPage: 12 });
  return idx.posts.filter((p) => p.slug !== slug).slice(0, limit);
}

export async function getAllPostSlugs(): Promise<string[]> {
  const idx = await getBlogIndex({ perPage: 50 });
  return idx.posts.map((p) => p.slug);
}
