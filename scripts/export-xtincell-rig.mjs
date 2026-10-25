/** Export the same hierarchy as the React hero as a portable SVG cutout rig. */
import { readFile, writeFile } from 'node:fs/promises';

const base = 'public/character/xtincell';
const source = await readFile('src/components/studio/character/XtincellCharacter.tsx', 'utf8');
let svg = source.match(/<svg viewBox="0 0 700 1130"[\s\S]*?<\/svg>/)?.[0];
if (!svg) throw new Error('Character SVG not found');
const files = [...new Set([...svg.matchAll(/<Part name="([^"]+)"/g)].map(m => m[1]))];
const artwork = {};
for (const name of files) artwork[name] = (await readFile(`${base}/${name}.webp`)).toString('base64');
svg = svg
  .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  .replace(/className=\{s\.(\w+)\}/g, 'class="$1"')
  .replace(/<Part name="([^"]+)" width=\{(\d+)\} height=\{(\d+)\} x=\{(-?\d+)\} y=\{(-?\d+)\} \/>/g,
    (_, name, w, h, x, y) => `<image data-part="${name}" id="part-${name}" href="data:image/webp;base64,${artwork[name]}" width="${w}" height="${h}" x="${x}" y="${y}" />`)
  .replace(/strokeWidth=/g, 'stroke-width=').replace(/strokeLinecap=/g, 'stroke-linecap=')
  .replace('aria-hidden="true" focusable="false"', 'xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title" data-running="true" data-reacting="false"');
if (svg.includes('<Part ') || svg.includes('className=')) throw new Error('Unresolved JSX');
const css = await readFile('src/components/studio/character/character.module.css', 'utf8');
const motion = css.slice(css.indexOf('.breath,')).replace(/@media \(max-width:[\s\S]*?@media \(prefers-reduced-motion/, '@media (prefers-reduced-motion');
svg = svg.replace('><g', '>\n<g');
const firstEnd = svg.indexOf('>') + 1;
svg = svg.slice(0, firstEnd) + '\n<title id="title">Alexandre « Xtincell » Djengue — personnage articulé</title>\n<style>' + motion + '</style>\n' + svg.slice(firstEnd);
svg = svg.replace(/[\t ]+$/gm, '');
await writeFile(`${base}/xtincell-rig.svg`, svg);
console.log(`Portable rig: ${Buffer.byteLength(svg)} bytes, ${files.length} embedded painted parts.`);
