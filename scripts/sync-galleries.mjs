#!/usr/bin/env node
/**
 * sync-galleries.mjs
 *
 * Scrape https://xtincell.pixieset.com/ and regenerate
 * src/components/folio/data/galleries.ts.
 *
 * - Bypasses Cloudflare's basic bot challenge with browser-like headers + HTTP/1.1.
 * - Preserves manually-curated `category` values per slug across syncs.
 * - Converts Pixieset English dates ("6th September, 2025") to French ("6 sept. 2025").
 *
 * Usage:
 *   node scripts/sync-galleries.mjs              # write the file
 *   node scripts/sync-galleries.mjs --dry        # print result, do not write
 *   node scripts/sync-galleries.mjs --verbose    # show parsed entries
 */
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const OUT = resolve(REPO_ROOT, 'src/components/folio/data/galleries.ts');
const OUT_SOCIAL = resolve(REPO_ROOT, 'src/components/folio/data/social-feed.ts');
const SOURCE_URL = 'https://xtincell.pixieset.com/';
const PIXIESET_BASE = 'https://xtincell.pixieset.com';

const YT_CHANNEL_HANDLE_URL = 'https://www.youtube.com/@x-tincell';
const YT_RSS = (id) => `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
const YT_PROFILE = 'https://youtube.com/@x-tincell';
const IG_PROFILE = 'https://instagram.com/xtincell';
const FB_PROFILE = 'https://facebook.com/xtincell';
const YT_VIDEOS_LIMIT = 8;

const argv = new Set(process.argv.slice(2));
const DRY = argv.has('--dry') || argv.has('-n');
const VERBOSE = argv.has('--verbose') || argv.has('-v');

const log = (...a) => console.log('[sync-galleries]', ...a);
const die = (msg, code = 1) => { console.error(`[sync-galleries] ${msg}`); process.exit(code); };

/* ------------------------------------------------------------------ */
/* 1. Fetch the Pixieset index page with browser-realistic headers.    */
/* ------------------------------------------------------------------ */
function curlGet(url, label = url) {
  // Node's fetch (undici) trips Cloudflare's TLS fingerprint check on Pixieset.
  // Shell out to curl uniformly — works for Pixieset and YouTube.
  let body;
  try {
    body = execFileSync(
      'curl',
      [
        '-sL', '--http1.1', '--compressed',
        '-A', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9',
        '-H', 'Accept-Language: fr-FR,fr;q=0.9,en;q=0.8',
        '-H', 'Sec-Fetch-Dest: document',
        '-H', 'Sec-Fetch-Mode: navigate',
        '-H', 'Sec-Fetch-Site: none',
        '-H', 'Upgrade-Insecure-Requests: 1',
        '--max-time', '30',
        url,
      ],
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
    );
  } catch (e) {
    die(`curl failed for ${label}: ${e.message}`);
  }
  return body || '';
}

function fetchHtml() {
  log(`Fetching ${SOURCE_URL}…`);
  const html = curlGet(SOURCE_URL, 'Pixieset');
  if (!html || html.length < 500) die(`Empty / suspiciously short response (${html?.length ?? 0} bytes).`);
  if (/Just a moment/i.test(html.slice(0, 800))) {
    die('Hit a Cloudflare interstitial. Try again, or run from a different network.');
  }
  return html;
}

/* ------------------------------------------------------------------ */
/* 2. Parse the existing TS file to preserve `category` per slug.      */
/* ------------------------------------------------------------------ */
function readExistingCategories() {
  if (!existsSync(OUT)) return new Map();
  const cur = readFileSync(OUT, 'utf8');
  const map = new Map();
  // Match each entry block of the GALLERIES array, then pluck slug + category.
  const blocks = cur.match(/\{\s*slug:\s*['"][^'"]+['"][^}]*?\}/gs) || [];
  for (const b of blocks) {
    const slug = b.match(/slug:\s*['"]([^'"]+)['"]/)?.[1];
    const cat = b.match(/category:\s*['"]([^'"]+)['"]/)?.[1];
    if (slug && cat) map.set(slug, cat);
  }
  return map;
}

/* ------------------------------------------------------------------ */
/* 3. Parse the Pixieset HTML.                                         */
/* ------------------------------------------------------------------ */
const MONTHS_EN_FR = {
  january: 'janv.', february: 'févr.', march: 'mars', april: 'avr.',
  may: 'mai', june: 'juin', july: 'juill.', august: 'août',
  september: 'sept.', october: 'oct.', november: 'nov.', december: 'déc.',
};

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function fmtDate(raw) {
  if (!raw) return undefined;
  const s = decodeEntities(raw).replace(/\s+/g, ' ').trim();
  const m = s.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+),?\s+(\d{4})/);
  if (!m) return s;
  const [, d, mo, y] = m;
  return `${d} ${MONTHS_EN_FR[mo.toLowerCase()] || mo} ${y}`;
}

function parseGalleries(html) {
  const out = [];
  const itemRe = /<div class="collection-item[^"]*">([\s\S]*?)<\/a>/g;
  let item;
  while ((item = itemRe.exec(html))) {
    const block = item[1];
    const slug = block.match(/href="\/([^"]+?)\/"/)?.[1];
    if (!slug) continue;

    const coverMatch = block.match(/background-image:\s*url\(([^)]+)\)/);
    if (!coverMatch) continue;
    let cover = coverMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (cover.startsWith('//')) cover = `https:${cover}`;

    const bgPos = block.match(/background-position:\s*([^;"]+)/)?.[1]?.trim();

    const nameRaw = block.match(/<p class="name">([\s\S]*?)<\/p>/)?.[1] ?? '';
    // Strip the optional <span class="lock">…</span> from the title.
    const locked = /<span class="lock">/.test(nameRaw);
    const title = decodeEntities(
      nameRaw.replace(/<span class="lock">[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    );

    const dateRaw = block.match(/<p class="date">([\s\S]*?)<\/p>/)?.[1];
    const date = fmtDate(dateRaw);

    out.push({ slug, title, cover, bgPosition: bgPos, date, locked });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 4. Render the TS source file.                                       */
/* ------------------------------------------------------------------ */
function tsString(s) {
  return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function renderFile(entries, categories) {
  const lines = [];
  lines.push(
    '// AUTO-GENERATED by `npm run sync-galleries` from https://xtincell.pixieset.com/',
    '// Manual edits to `category` are preserved across syncs (matched by slug).',
    '// Re-run the sync command to refresh covers, titles, dates, and lock state.',
    '',
    'export type Gallery = {',
    '  slug: string;',
    '  title: string;',
    '  cover: string; // images.pixieset.com URL',
    '  date?: string;',
    '  category?: string;',
    '  locked?: boolean;',
    '  bgPosition?: string; // CSS background-position fine-tune',
    '};',
    '',
    `const PIXIESET_BASE = ${tsString(PIXIESET_BASE)};`,
    '',
    'export const galleryUrl = (g: Gallery) => `${PIXIESET_BASE}/${g.slug}/`;',
    '',
    'export const GALLERIES: Gallery[] = [',
  );

  for (const e of entries) {
    const cat = categories.get(e.slug);
    lines.push('  {');
    lines.push(`    slug: ${tsString(e.slug)},`);
    lines.push(`    title: ${tsString(e.title)},`);
    lines.push(`    cover: ${tsString(e.cover)},`);
    if (e.date) lines.push(`    date: ${tsString(e.date)},`);
    if (cat) lines.push(`    category: ${tsString(cat)},`);
    if (e.locked) lines.push('    locked: true,');
    if (e.bgPosition) lines.push(`    bgPosition: ${tsString(e.bgPosition)},`);
    lines.push('  },');
  }

  lines.push('];', '');
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* 4b. YouTube — fetch latest videos via the public RSS feed.          */
/* ------------------------------------------------------------------ */
function fetchYouTubeVideos() {
  log(`Fetching YouTube channel page…`);
  const html = curlGet(YT_CHANNEL_HANDLE_URL, 'YouTube channel');
  const channelId = html.match(/"externalId":"([^"]+)"/)?.[1] || html.match(/"channelId":"(UC[^"]+)"/)?.[1];
  if (!channelId) {
    log('Could not extract YouTube channel ID — skipping.');
    return { channelId: null, videos: [] };
  }
  log(`YouTube channel ID: ${channelId}`);
  const xml = curlGet(YT_RSS(channelId), 'YouTube RSS');
  if (!xml || xml.length < 200) {
    log('YouTube RSS empty — skipping.');
    return { channelId, videos: [] };
  }
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, YT_VIDEOS_LIMIT);
  const videos = entries.map((e) => {
    const block = e[1];
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = decodeEntities(block.match(/<title>([^<]+)<\/title>/)?.[1] || '').trim();
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1];
    const date = published ? fmtIsoDate(published) : undefined;
    return id && title ? { id, title, date } : null;
  }).filter(Boolean);
  return { channelId, videos };
}

function fmtIsoDate(iso) {
  // "2024-12-09T08:55:50+00:00" → "9 déc. 2024"
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return undefined;
  const [, y, mo, d] = m;
  const monthNames = ['janv.','févr.','mars','avr.','mai','juin','juill.','août','sept.','oct.','nov.','déc.'];
  return `${parseInt(d, 10)} ${monthNames[parseInt(mo, 10) - 1]} ${y}`;
}

function renderSocialFeed({ channelId, videos }) {
  const lines = [
    '// AUTO-GENERATED by `npm run sync-galleries` from YouTube RSS.',
    '// Re-run the sync command to refresh the latest videos.',
    '',
    'export type YouTubeVideo = {',
    '  id: string;',
    '  title: string;',
    '  date?: string;',
    '  thumb: string;',
    '  watchUrl: string;',
    '};',
    '',
    'export const SOCIAL_PROFILES = {',
    `  youtube: ${tsString(YT_PROFILE)},`,
    `  instagram: ${tsString(IG_PROFILE)},`,
    `  facebook: ${tsString(FB_PROFILE)},`,
    `  youtubeChannelId: ${channelId ? tsString(channelId) : 'null'},`,
    '} as const;',
    '',
    'export const YOUTUBE_VIDEOS: YouTubeVideo[] = [',
  ];
  for (const v of videos) {
    lines.push('  {');
    lines.push(`    id: ${tsString(v.id)},`);
    lines.push(`    title: ${tsString(v.title)},`);
    if (v.date) lines.push(`    date: ${tsString(v.date)},`);
    lines.push(`    thumb: ${tsString(`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`)},`);
    lines.push(`    watchUrl: ${tsString(`https://www.youtube.com/watch?v=${v.id}`)},`);
    lines.push('  },');
  }
  lines.push('];', '');
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* 5. Drive everything.                                                */
/* ------------------------------------------------------------------ */
const html = fetchHtml();
const entries = parseGalleries(html);
if (entries.length === 0) die('Parsed 0 galleries — Pixieset HTML structure may have changed.');

const categories = readExistingCategories();
const newSlugs = entries.filter((e) => !categories.has(e.slug)).map((e) => e.slug);
const droppedSlugs = [...categories.keys()].filter((s) => !entries.find((e) => e.slug === s));

log(`Parsed ${entries.length} collections.`);
log(`Preserved ${categories.size} category entries.`);
if (newSlugs.length) log(`New (no category yet): ${newSlugs.join(', ')}`);
if (droppedSlugs.length) log(`Dropped from Pixieset (their categories will be lost): ${droppedSlugs.join(', ')}`);

const fileBody = renderFile(entries, categories);

if (VERBOSE) {
  for (const e of entries) {
    console.log(`  · ${e.slug.padEnd(28)} ${e.title}${e.date ? ` (${e.date})` : ''}${e.locked ? ' [LOCKED]' : ''}`);
  }
}

if (DRY) {
  console.log('\n----- BEGIN GENERATED FILE -----');
  console.log(fileBody);
  console.log('----- END GENERATED FILE -----');
  log('Dry run — file NOT written.');
  process.exit(0);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, fileBody, 'utf8');
log(`Wrote ${OUT}`);

// --- Social feed ---
const yt = fetchYouTubeVideos();
log(`YouTube: ${yt.videos.length} latest videos.`);
if (VERBOSE) {
  for (const v of yt.videos) {
    console.log(`  · ${v.id}  ${v.title}${v.date ? ` (${v.date})` : ''}`);
  }
}
const socialBody = renderSocialFeed(yt);
if (DRY) {
  console.log('\n----- BEGIN SOCIAL FEED -----');
  console.log(socialBody);
  console.log('----- END SOCIAL FEED -----');
} else {
  mkdirSync(dirname(OUT_SOCIAL), { recursive: true });
  writeFileSync(OUT_SOCIAL, socialBody, 'utf8');
  log(`Wrote ${OUT_SOCIAL}`);
}
