import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

// Check the actual published content catalogue, not a duplicate list of cases.
const root = process.cwd();
function data(file, name) {
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(source, { module, exports: module.exports });
  return module.exports[name];
}
const cases = data('src/components/folio/data/cases.ts', 'CASE_STUDIES');
const presentations = data('src/lib/project-presentations.ts', 'PROJECT_PRESENTATIONS');
const galleries = data('src/components/folio/data/galleries.ts', 'GALLERIES');
const covers = data('src/lib/gallery-assets.ts', 'LOCAL_GALLERY_COVERS');
const posts = data('src/components/folio/upgraders/data/posts.ts', 'FALLBACK_POSTS');
const problems = [];
const assets = new Set();
const slugs = new Set();
for (const item of cases) {
  if (slugs.has(item.slug)) problems.push(`Duplicate project: ${item.slug}`);
  slugs.add(item.slug);
  for (const field of ['name', 'client', 'context']) {
    if (!item[field]?.fr?.trim() || !item[field]?.en?.trim()) problems.push(`Missing FR/EN ${field}: ${item.slug}`);
  }
  assets.add(item.hero);
  for (const image of item.gallery) assets.add(image.src);
  if (presentations[item.slug]) assets.add(presentations[item.slug]);
}
for (const gallery of galleries) if (covers[gallery.slug]) assets.add(covers[gallery.slug]);
for (const asset of assets) if (asset.startsWith('/') && !fs.existsSync(path.join(root, 'public', asset))) problems.push(`Missing image: ${asset}`);
for (const file of ['cv.pdf', 'cv.pptx', 'folio.pdf', 'folio.pptx', 'tech.pdf', 'recrutement/cv.docx', 'recrutement/folio.pptx', 'studio/showreel.mp4']) {
  const local = path.join(root, 'public', file);
  if (!fs.existsSync(local) || !fs.statSync(local).size) problems.push(`Missing download: ${file}`);
}
console.log(JSON.stringify({ projects: cases.length, listed: cases.filter(p => !p.hidden).length, galleries: galleries.length, articles: posts.length, checkedAssets: assets.size, problems }, null, 2));
if (problems.length) process.exitCode = 1;
