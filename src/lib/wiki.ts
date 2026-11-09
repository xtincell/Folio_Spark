import fs from 'node:fs';
import path from 'node:path';

/* ============================================================================
   WIKI — lecture des fiches Markdown de /wiki et rendu HTML sans dépendance.
   ----------------------------------------------------------------------------
   Source : wiki/**.md (rédigés à la main + blocs générés par
   scripts/wiki-build.mjs) et wiki/_data/wiki.json (index des métadonnées).
   Lu uniquement au build (pages statiques), jamais côté client.
   ========================================================================== */

const WIKI_DIR = path.join(process.cwd(), 'wiki');

export type WikiType = 'projet' | 'organisation' | 'personne';
export type WikiLink = { label: string; url: string };
export type WikiArticle = {
  key: string; // ex. "projets/ecobank"
  type: WikiType;
  slug: string;
  titre: string;
  resume: string;
  etat?: 'ebauche' | 'a-verifier' | 'standard' | 'complet';
  folio?: string;
  masque_folio?: boolean;
  practice?: string;
  categorie?: string;
  casquette?: string;
  debut?: number | string;
  fin?: number | string;
  client?: string;
  parent?: string;
  verifier?: string[];
  liens?: WikiLink[];
  image?: WikiImage | null;
  galerie?: WikiImage[];
};
export type WikiImage = { src: string; alt: string; href?: string; video?: boolean };

/** Pages hors articles : slug d'URL → fichier Markdown. */
const SPECIAL_PAGES: Record<string, { file: string; titre: string; index: boolean }> = {
  '': { file: 'README.md', titre: 'Wiki', index: true },
  chronologie: { file: 'chronologie.md', titre: 'Chronologie', index: true },
  index: { file: 'index.md', titre: 'Index', index: true },
  maintenance: { file: 'maintenance.md', titre: 'Maintenance', index: false },
  conventions: { file: 'CONVENTIONS.md', titre: 'Conventions', index: false },
  sources: { file: 'sources.md', titre: 'Sources du parcours', index: true },
};
const FILE_TO_ROUTE: Record<string, string> = Object.fromEntries(
  Object.entries(SPECIAL_PAGES).map(([route, p]) => [p.file, route]),
);

let cache: WikiArticle[] | null = null;
export function getArticles(): WikiArticle[] {
  if (cache) return cache;
  const file = path.join(WIKI_DIR, '_data', 'wiki.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as { articles: WikiArticle[] };
  cache = data.articles;
  return cache;
}
export const getArticle = (key: string) => getArticles().find((a) => a.key === key);

/** Chemin d'URL d'une fiche wiki à partir de sa clé. */
export const wikiHref = (key: string) => `/wiki/${key}`;

/** Fiche wiki d'un projet du folio (même slug). */
export function wikiForCase(slug: string): string | undefined {
  return getArticle(`projets/${slug}`) ? wikiHref(`projets/${slug}`) : undefined;
}

/** Fiches wiki des entrées « pratiques » de /work, indexées par leur nom. */
export function wikiForPractices(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const a of getArticles()) if (a.practice) map[a.practice] = wikiHref(a.key);
  return map;
}

export const projectCount = () => getArticles().filter((a) => a.type === 'projet').length;

// ---------------------------------------------------------------- routage
export type WikiPage = {
  route: string; // "" | "chronologie" | "projets/ecobank" …
  file: string; // relatif à wiki/
  titre: string;
  article?: WikiArticle;
  indexable: boolean;
};

export function listPages(): WikiPage[] {
  const special = Object.entries(SPECIAL_PAGES).map(([route, p]) => ({
    route,
    file: p.file,
    titre: p.titre,
    indexable: p.index,
  }));
  const articles = getArticles().map((a) => ({
    route: a.key,
    file: `${a.key}.md`,
    titre: a.titre,
    article: a,
    // Les ébauches restent accessibles mais hors index des moteurs.
    indexable: a.etat !== 'ebauche',
  }));
  return [...special, ...articles];
}
export const getPage = (route: string) => listPages().find((p) => p.route === route);

// ---------------------------------------------------------------- Markdown
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Ancre façon GitHub : minuscules, lettres/chiffres/espaces/tirets, espaces → tirets. */
export const slugifyHeading = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s/g, '-');

/** Réécrit un lien relatif « ../organisations/x.md#ancre » en route /wiki. */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xtincell.powerupgraders.com').replace(/\/$/, '');
const SITE_ORIGINS = [SITE_URL, 'https://xtincell.powerupgraders.com'];

function resolveHref(href: string, fromFile: string): { url: string; external: boolean } {
  // Liens absolus vers le site lui-même → liens internes (marchent aussi en local).
  const own = SITE_ORIGINS.find((o) => href === o || href.startsWith(`${o}/`));
  if (own) return { url: href.slice(own.length) || '/', external: false };
  if (/^(https?:|mailto:)/.test(href)) return { url: href, external: true };
  if (href.startsWith('#')) return { url: href, external: false };
  const [target = '', hash] = href.split('#');
  if (!target.endsWith('.md')) return { url: href, external: false };
  const rel = path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), target));
  const route = FILE_TO_ROUTE[rel] ?? rel.replace(/\.md$/, '');
  return { url: `/wiki${route ? `/${route}` : ''}${hash ? `#${hash}` : ''}`, external: false };
}

/** « ../../public/medias-wiki/x/01.webp » (relatif à la fiche) → « /medias-wiki/x/01.webp ». */
function assetUrl(src: string, fromFile: string): string {
  if (/^https?:/.test(src)) return src;
  const rel = path.posix.normalize(path.posix.join('wiki', path.posix.dirname(fromFile), src));
  return rel.startsWith('public/') ? rel.slice('public'.length) : `/${rel}`;
}

/** Galerie HTML d'une fiche (images issues de wiki/_data/wiki.json). */
function galleryHtml(images: WikiImage[]): string {
  if (!images.length) return '';
  const items = images.map((im) => {
    const external = /^https?:/.test(im.href ?? '') ;
    const href = im.href ?? im.src;
    const attrs = external || !im.href ? ' target="_blank" rel="noopener noreferrer"' : '';
    const caption = im.href && !external ? `<figcaption>${escapeHtml(im.alt)}</figcaption>` : im.video ? `<figcaption>▶ ${escapeHtml(im.alt)}</figcaption>` : '';
    return `<figure><a href="${escapeHtml(href)}"${attrs}><img src="${escapeHtml(im.src)}" alt="${escapeHtml(im.alt)}" loading="lazy" decoding="async" /></a>${caption}</figure>`;
  });
  return `<div class="wiki-galerie">${items.join('')}</div>`;
}

function inline(src: string, fromFile: string): string {
  const codes: string[] = [];
  let s = src.replace(/`([^`]+)`/g, (_, c: string) => {
    codes.push(`<code>${escapeHtml(c)}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  const links: string[] = [];
  // Images ![alt](chemin) : chemins relatifs au fichier → URL publique du site.
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt: string, src: string) => {
    links.push(`<img src="${escapeHtml(assetUrl(src, fromFile))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />`);
    return `\u0001${links.length - 1}\u0001`;
  });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text: string, href: string) => {
    const { url, external } = resolveHref(href, fromFile);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    links.push(`<a href="${escapeHtml(url)}"${attrs}>${inline(text, fromFile)}</a>`);
    return `\u0001${links.length - 1}\u0001`;
  });
  s = escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(«])_([^_]+)_(?=[\s).,;:!?»]|$)/g, '$1<em>$2</em>')
    .replace(/(^|[\s(«])\*([^*]+)\*(?=[\s).,;:!?»]|$)/g, '$1<em>$2</em>')
    .replace(/\\\|/g, '|');
  return s
    .replace(/\u0001(\d+)\u0001/g, (_, i: string) => links[Number(i)] ?? '')
    .replace(/\u0000(\d+)\u0000/g, (_, i: string) => codes[Number(i)] ?? '');
}

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((c) => c.trim());

export type Heading = { id: string; text: string; level: number };

/** Rendu Markdown (sous-ensemble utilisé par le wiki) → HTML + sommaire. */
export function renderMarkdown(md: string, fromFile: string): { html: string; headings: Heading[] } {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  let i = 0;
  const isBlockStart = (l: string) =>
    /^(#{1,6}\s|\s*[-*]\s|\s*\d+\.\s|>|\||```|---\s*$)/.test(l) || l.trim() === '';

  while (i < lines.length) {
    const line = lines[i]!;
    if (line.trim() === '') { i++; continue; }

    if (line.startsWith('```')) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith('```')) buf.push(lines[i++]!);
      i++;
      out.push(`<pre><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1]!.length;
      const text = h[2]!.trim();
      let id = slugifyHeading(text);
      const n = used.get(id) ?? 0;
      used.set(id, n + 1);
      if (n) id = `${id}-${n}`;
      headings.push({ id, text: text.replace(/[*_`]/g, ''), level });
      out.push(`<h${level} id="${escapeHtml(id)}">${inline(text, fromFile)}</h${level}>`);
      i++;
      continue;
    }
    if (/^---\s*$/.test(line)) { out.push('<hr />'); i++; continue; }
    if (line.startsWith('|')) {
      const rows: string[] = [];
      while (i < lines.length && lines[i]!.startsWith('|')) rows.push(lines[i++]!);
      const [head, sep, ...body] = rows;
      const hasSep = !!sep && /^\|?\s*:?-{3,}/.test(sep);
      const th = splitRow(head ?? '').map((c) => `<th>${inline(c, fromFile)}</th>`).join('');
      const trs = (hasSep ? body : rows.slice(1))
        .map((r) => `<tr>${splitRow(r).map((c) => `<td>${inline(c, fromFile)}</td>`).join('')}</tr>`)
        .join('');
      out.push(`<div class="wiki-table"><table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table></div>`);
      continue;
    }
    if (line.startsWith('>')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i]!.startsWith('>')) buf.push(lines[i++]!.replace(/^>\s?/, ''));
      out.push(`<blockquote>${renderMarkdown(buf.join('\n'), fromFile).html}</blockquote>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: { text: string; sub: string[] }[] = [];
      while (i < lines.length && (/^\s*([-*]|\d+\.)\s/.test(lines[i]!) || /^\s{2,}\S/.test(lines[i]!))) {
        const l = lines[i]!;
        if (/^\s{2,}/.test(l) && items.length) items[items.length - 1]!.sub.push(l.replace(/^\s{2}/, ''));
        else items.push({ text: l.replace(/^\s*([-*]|\d+\.)\s+/, ''), sub: [] });
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(
        `<${tag}>${items
          .map((it) => `<li>${inline(it.text, fromFile)}${it.sub.length ? renderMarkdown(it.sub.join('\n'), fromFile).html : ''}</li>`)
          .join('')}</${tag}>`,
      );
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && !(buf.length && isBlockStart(lines[i]!))) buf.push(lines[i++]!);
    out.push(`<p>${inline(buf.join(' '), fromFile)}</p>`);
  }
  return { html: out.join('\n'), headings };
}

// ---------------------------------------------------------------- lecture d'une page
export type RenderedPage = WikiPage & {
  html: string;
  infobox?: string;
  headings: Heading[];
};

export function renderPage(route: string): RenderedPage | undefined {
  const page = getPage(route);
  if (!page) return undefined;
  let src = fs.readFileSync(path.join(WIKI_DIR, page.file), 'utf8');
  src = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, ''); // frontmatter
  let infobox: string | undefined;
  src = src.replace(/<!-- wiki:infobox -->([\s\S]*?)<!-- \/wiki:infobox -->/, (_, box: string) => {
    if (box.trim()) infobox = renderMarkdown(box.trim(), page.file).html;
    return '';
  });
  // La galerie Markdown (HTML pour GitHub) est remplacée par celle du site.
  src = src.replace(/<!-- wiki:galerie -->[\s\S]*?<!-- \/wiki:galerie -->/, '\n\u0002GALERIE\u0002\n');
  src = src
    .replace(/<!--[\s\S]*?-->/g, '') // marqueurs de blocs et commentaires
    .replace(/^# .*\n/, ''); // le titre est rendu par la page
  const rendered = renderMarkdown(src, page.file);
  const html = rendered.html.replace(/<p>\u0002GALERIE\u0002<\/p>/, galleryHtml(page.article?.galerie ?? []));
  return { ...page, html, infobox, headings: rendered.headings };
}
