#!/usr/bin/env node
/**
 * import-cases.mjs — importe + compresse les visuels des dossiers source
 * (~/Downloads/Mes travaux) vers public/work/cases/<slug>/ en WebP responsive.
 *
 * Piloté par scripts/cases.config.json :
 *   [{ "slug": "...", "source": "<dossier dans SRC_ROOT>",
 *      "hero": "<fichier hero>", "files": ["f1","f2", ...] }]
 *
 * - hero      → hero.webp (max 2560px, q≈82)
 * - files[i]  → NN.webp   (max 1600px, q≈80), NN = 01,02,...
 * - EXIF strippé, agrandissement interdit.
 * - PSD/TIFF : convertis en PNG via `sips` puis recompressés.
 *
 * Usage:  node scripts/import-cases.mjs [--only slug1,slug2] [--dry]
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);
const ROOT = process.cwd();
const SRC_ROOT = '/Users/imacmatanga1/Downloads/Mes travaux';
const DEST_ROOT = path.join(ROOT, 'public/work/cases');
const CONFIG = path.join(ROOT, 'scripts/cases.spec.json');

const HERO_W = 2560;
const GALLERY_W = 1600;
const HERO_Q = 82;
const GALLERY_Q = 80;

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const onlyArg = args.indexOf('--only');
const ONLY = onlyArg !== -1 ? (args[onlyArg + 1] || '').split(',').filter(Boolean) : null;

let sharp = null;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('⚠  sharp introuvable. Lance `npm i -D sharp` (fallback sips pour resize seulement).');
}

const pad = (n) => String(n).padStart(2, '0');
const isRaster = (f) => /\.(jpe?g|png|webp|gif|tiff?)$/i.test(f);
const needsSips = (f) => /\.(psd|tiff?|heic)$/i.test(f);

/** Convertit un fichier non lisible par sharp (PSD/HEIC) en PNG temporaire via sips. */
async function toPngViaSips(srcPath) {
  const tmp = path.join(os.tmpdir(), `xc-${Date.now()}-${Math.abs(hashStr(srcPath))}.png`);
  await execFileP('sips', ['-s', 'format', 'png', srcPath, '--out', tmp]);
  return tmp;
}
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

async function compress(srcPath, destPath, maxW, quality) {
  if (DRY) {
    console.log(`   [dry] ${path.basename(srcPath)} → ${path.relative(ROOT, destPath)}`);
    return;
  }
  let input = srcPath;
  let tmp = null;
  if (sharp && needsSips(srcPath)) {
    tmp = await toPngViaSips(srcPath);
    input = tmp;
  }
  if (sharp) {
    await sharp(input)
      .rotate()
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality })
      .toFile(destPath);
  } else {
    // Fallback sips : pas de WebP fiable → JPEG haute qualité, même nom en .jpg
    const jpg = destPath.replace(/\.webp$/, '.jpg');
    await execFileP('sips', ['-Z', String(maxW), '-s', 'format', 'jpeg', '-s', 'formatOptions', String(quality), srcPath, '--out', jpg]);
  }
  if (tmp) await fs.rm(tmp, { force: true });
}

async function run() {
  const raw = await fs.readFile(CONFIG, 'utf8');
  /** @type {Array<{slug:string,source:string,hero:string,files:string[]}>} */
  const cases = JSON.parse(raw);
  const summary = [];

  for (const c of cases) {
    if (ONLY && !ONLY.includes(c.slug)) continue;
    const srcDir = path.join(SRC_ROOT, c.source);
    const destDir = path.join(DEST_ROOT, c.slug);
    if (!DRY) await fs.mkdir(destDir, { recursive: true });
    console.log(`\n▶ ${c.slug}  (${c.source})`);

    // hero
    let heroOut = null;
    const heroName = c.heroFile || c.hero;
    if (heroName) {
      const heroSrc = path.join(srcDir, heroName);
      try {
        await fs.access(heroSrc);
        heroOut = path.join(destDir, sharp ? 'hero.webp' : 'hero.jpg');
        await compress(heroSrc, heroOut, HERO_W, HERO_Q);
        console.log(`   hero ✓ ${heroName}`);
      } catch (e) {
        console.warn(`   ⚠ hero manquant: ${heroName} (${e.code || e.message})`);
      }
    }

    // gallery
    let i = 0;
    const galleryOut = [];
    for (const f of c.files || []) {
      const fsrc = path.join(srcDir, f);
      try {
        await fs.access(fsrc);
        if (!isRaster(f) && !needsSips(f)) {
          console.warn(`   ⚠ ignoré (format): ${f}`);
          continue;
        }
        i += 1;
        const out = path.join(destDir, `${pad(i)}.${sharp ? 'webp' : 'jpg'}`);
        await compress(fsrc, out, GALLERY_W, GALLERY_Q);
        galleryOut.push(`/work/cases/${c.slug}/${pad(i)}.${sharp ? 'webp' : 'jpg'}`);
        console.log(`   ${pad(i)} ✓ ${f}`);
      } catch (e) {
        console.warn(`   ⚠ manquant: ${f} (${e.code || e.message})`);
      }
    }
    summary.push({
      slug: c.slug,
      hero: heroOut ? `/work/cases/${c.slug}/${path.basename(heroOut)}` : null,
      gallery: galleryOut,
    });
  }

  // Écrit un manifeste pour aider à remplir cases.ts
  if (!DRY) {
    const manifestPath = path.join(DEST_ROOT, '_manifest.json');
    await fs.mkdir(DEST_ROOT, { recursive: true });
    await fs.writeFile(manifestPath, JSON.stringify(summary, null, 2));
    console.log(`\n✓ Manifeste écrit: ${path.relative(ROOT, manifestPath)}`);
  }
  console.log('\n✓ Import terminé.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
