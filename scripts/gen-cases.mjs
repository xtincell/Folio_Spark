#!/usr/bin/env node
/**
 * gen-cases.mjs — génère src/components/folio/data/cases.ts ET MOCKUPS-HERO.md
 * à partir de scripts/cases.spec.json + public/work/cases/_manifest.json.
 *
 * - hero = manifest.hero (image provisoire compressée)
 * - gallery = manifest.gallery en sautant 01.webp (doublon du hero)
 * - heroMockup = spec Nano Banana (type + dimensions + prompt FR + références)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SPEC = path.join(ROOT, 'scripts/cases.spec.json');
const MANIFEST = path.join(ROOT, 'public/work/cases/_manifest.json');
const OUT_TS = path.join(ROOT, 'src/components/folio/data/cases.ts');
const OUT_MD = path.join(ROOT, 'MOCKUPS-HERO.md');

/** Déduit type de mockup + dimensions à partir de l'idée + media. */
function mockupType(idea, medium) {
  const s = (idea + ' ' + medium.join(' ')).toLowerCase();
  const has = (...ks) => ks.some((k) => s.includes(k));
  if (has('billboard', '4×3', '4x3', 'ooh', 'avenue', 'rue ', 'roadside'))
    return { type: 'Billboard 4×3 (OOH)', dimensions: '2560×1440', orient: 'paysage' };
  if (has('enseigne', 'architectural', 'façade', 'storefront', 'vitrine', 'rooftop'))
    return { type: 'Mockup environnemental / enseigne', dimensions: '2560×1440', orient: 'paysage' };
  if (has('apparel', 'tee', 't-shirt', 'polo', 'merch', 'cintre', 'hoodie'))
    return { type: 'Mockup apparel / merch', dimensions: '1600×2000', orient: 'portrait' };
  if (has('packshot', 'bouteille', 'sac', 'packaging', 'cup', 'brique', 'rayon', 'product'))
    return { type: 'Packshot produit', dimensions: '1600×2000', orient: 'portrait' };
  if (has('magazine', 'spread', 'cover', 'couverture', 'kiosque', 'newsstand', 'gq', 'vanity'))
    return { type: 'Couverture / spread magazine', dimensions: '1654×2126', orient: 'portrait' };
  if (has('vinyle', 'pochette', 'sleeve', 'streaming', 'album'))
    return { type: 'Pochette / cover', dimensions: '2000×2000', orient: 'carré' };
  if (has('poster', 'affiche', 'model-sheet', 'planche', 'gallery', 'art-print', 'framed', 'encadré', 'mur'))
    return { type: 'Affiche / planche', dimensions: '1654×2339', orient: 'portrait' };
  if (has('flat-lay', 'papeterie', 'stationery', 'médaillon', 'pin', 'carte'))
    return { type: 'Flat-lay packaging / papeterie', dimensions: '2000×1500', orient: 'paysage' };
  if (has('mobile', 'phone', 'social', 'feed', 'story', 'app', 'instagram', 'flyer'))
    return { type: 'Mockup mobile / social', dimensions: '1242×2208', orient: 'portrait' };
  return { type: 'Hero éditorial plein cadre', dimensions: '2560×1440', orient: 'paysage' };
}

/** Compose un prompt Nano Banana FR exploitable. */
function buildPrompt(s, mt) {
  return (
    `Crée un mockup ${mt.type.toLowerCase()} photoréaliste, cadrage ${mt.orient} ${mt.dimensions}, ` +
    `pour le projet « ${s.name_fr} » (${s.client_fr}). ${s.mockupIdea} ` +
    `Reprends fidèlement le visuel de la marque depuis l'image de référence jointe (couleurs, typographie, composition). ` +
    `Lumière naturelle premium, contraste maîtrisé, rendu commercial haut de gamme, profondeur de champ réaliste, ` +
    `aucun texte inventé. Sortie nette haute résolution ${mt.dimensions}.`
  );
}

const J = (v) => JSON.stringify(v);
const bi = (fr, en) => `{ fr: ${J(fr)}, en: ${J(en)} }`;

async function main() {
  const spec = JSON.parse(await fs.readFile(SPEC, 'utf8'));
  const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  const mById = new Map(manifest.map((m) => [m.slug, m]));

  const entries = [];
  const mdBlocks = [];

  for (const s of spec) {
    const m = mById.get(s.slug);
    if (!m || !m.hero) {
      console.warn(`⚠ pas de manifeste/hero pour ${s.slug} — ignoré`);
      continue;
    }
    const mt = mockupType(s.mockupIdea, s.medium || []);
    const prompt = buildPrompt(s, mt);
    // galerie = tout sauf 01.webp (doublon du hero)
    const gallery = (m.gallery || []).filter((g) => !/\/01\.(webp|jpg)$/.test(g));
    const refs = [s.heroFile, ...(s.files || []).slice(1, 3)].filter(Boolean);

    const galleryTs = gallery
      .map((src, i) => `    { src: ${J(src)}${i === 0 ? ", span: 'full' as const" : ''} },`)
      .join('\n');

    const hiddenLine = s.hidden ? `\n    hidden: true,` : '';

    entries.push(
      `  {
    slug: ${J(s.slug)},
    kind: ${J(s.kind)},${hiddenLine}
    name: ${bi(s.name_fr, s.name_en)},
    client: ${bi(s.client_fr, s.client_en)},
    year: ${J(s.year)},
    hat: ${J(s.hat)},
    tags: ${J(s.medium || [])},
    hero: ${J(m.hero)},
    context: ${bi(s.context_fr, s.context_en)},
    gallery: [
${galleryTs}
    ],
    heroMockup: {
      type: ${J(mt.type)},
      dimensions: ${J(mt.dimensions)},
      prompt: ${J(prompt)},
      references: ${J(refs)},
    },
  },`
    );

    mdBlocks.push(
      `### ${s.name_fr} — \`${s.slug}\`\n` +
        `- **Client** : ${s.client_fr} · **Année** : ${s.year} · **Casquette** : ${s.hat}\n` +
        `- **Type de mockup** : ${mt.type} — **Dimensions** : \`${mt.dimensions}\` (${mt.orient})\n` +
        `- **Images de référence à joindre** : ${refs.map((r) => `\`${r}\``).join(', ')}\n` +
        `- **Hero provisoire** : \`${m.hero}\`\n\n` +
        `**Prompt Nano Banana :**\n\n> ${prompt}\n`
    );
  }

  const ts =
    `import type { Bi } from '@/lib/i18n';\n\n` +
    `// ⚠ Généré par scripts/gen-cases.mjs depuis cases.spec.json + _manifest.json.\n` +
    `// Éditer la spec/le script puis régénérer plutôt que ce fichier à la main.\n\n` +
    `export type CaseHat = 'strategy' | 'art' | 'execution';\n\n` +
    `export type CaseProof = { label: Bi; host: string; url: string };\n\n` +
    `export type CaseImage = { src: string; alt?: Bi; span?: 'full' | 'half' };\n\n` +
    `export type HeroMockupSpec = {\n  type: string;\n  dimensions: string;\n  prompt: string;\n  references: string[];\n};\n\n` +
    `export type CaseStudy = {\n  slug: string;\n  kind: 'case' | 'collection';\n  hidden?: boolean;\n  name: Bi;\n  client: Bi;\n  year: string;\n  hat: CaseHat;\n  tags: string[];\n  hero: string;\n  context: Bi;\n  role?: Bi;\n  process?: Bi;\n  result?: Bi;\n  gallery: CaseImage[];\n  proofs?: CaseProof[];\n  heroMockup?: HeroMockupSpec;\n};\n\n` +
    `export const HAT_LABEL: Record<CaseHat, Bi> = {\n  strategy: { fr: 'Stratégie', en: 'Strategy' },\n  art: { fr: 'Direction Artistique', en: 'Art Direction' },\n  execution: { fr: 'Exécution', en: 'Execution' },\n};\n\n` +
    `export const HAT_CODE: Record<CaseHat, string> = {\n  strategy: 'P · 01',\n  art: 'P · 02',\n  execution: 'P · 03',\n};\n\n` +
    `export const CASE_STUDIES: CaseStudy[] = [\n${entries.join('\n')}\n];\n\n` +
    `export const getCase = (slug: string): CaseStudy | undefined =>\n  CASE_STUDIES.find((c) => c.slug === slug);\n`;

  await fs.writeFile(OUT_TS, ts);
  console.log(`✓ ${path.relative(ROOT, OUT_TS)} — ${entries.length} cases`);

  const md =
    `# Mockups hero — prompts Nano Banana\n\n` +
    `Hero **provisoire** par projet (image du dossier, compressée) + **mockup définitif** à générer.\n` +
    `Pour chaque projet : joins l'image de référence indiquée à Nano Banana avec le prompt ci-dessous, ` +
    `génère à la dimension donnée, puis remplace \`public/work/cases/<slug>/hero.webp\`.\n\n` +
    `---\n\n` +
    mdBlocks.join('\n---\n\n');
  await fs.writeFile(OUT_MD, md);
  console.log(`✓ ${path.relative(ROOT, OUT_MD)} — ${mdBlocks.length} blocs`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
