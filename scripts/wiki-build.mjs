#!/usr/bin/env node
// =============================================================================
// wiki-build — construit le wiki à partir des articles Markdown de /wiki.
//
//   npm run wiki          → valide, régénère les blocs et les pages d'index
//   npm run wiki:check    → valide seulement (exit 1 si erreur) — pour la CI
//
// Source de vérité : le frontmatter de chaque article (wiki/projets,
// wiki/organisations, wiki/personnes). Le script ne touche qu'aux blocs
// <!-- wiki:xxx --> … <!-- /wiki:xxx --> et aux fichiers marqués « généré ».
// Tout le reste du texte est écrit à la main et n'est jamais modifié.
// Zéro dépendance (politique du repo).
// =============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WIKI = path.join(ROOT, 'wiki');
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://xtincell.powerupgraders.com').replace(/\/$/, '');
const CHECK_ONLY = process.argv.includes('--check');
const DIRS = { projet: 'projets', organisation: 'organisations', personne: 'personnes' };
const GENERATED = new Set(['chronologie.md', 'index.md', 'maintenance.md']);

export const ENUMS = {
  categorie: ['campagne', 'identite', 'production', 'photo', 'video', 'collection', 'mission', 'produit', 'outil', 'methode', 'programme', 'edition', 'jeu', 'podcast', 'evenement', 'projet'],
  casquette: ['strategie', 'direction-artistique', 'execution'],
  etat: ['ebauche', 'a-verifier', 'standard', 'complet'],
  relation: ['agence-propre', 'employeur', 'client', 'agence-relais', 'partenaire', 'formation'],
};
const LABEL = {
  casquette: { strategie: 'Stratégie', 'direction-artistique': 'Direction créative & artistique', execution: 'Exécution' },
  categorie: { campagne: 'Campagne', identite: 'Identité', production: 'Production', photo: 'Photographie', video: 'Vidéo', collection: 'Collection', mission: 'Mission', produit: 'Produit logiciel', outil: 'Outil', methode: 'Méthode', programme: 'Programme', edition: 'Édition', jeu: 'Jeu', podcast: 'Podcast', evenement: 'Événement', projet: 'Projet' },
  etat: { ebauche: 'Ébauche', 'a-verifier': 'À vérifier', standard: 'Standard', complet: 'Complet' },
  relation: { 'agence-propre': 'Agence co-fondée', employeur: 'Employeur', client: 'Client', 'agence-relais': 'Agence relais', partenaire: 'Partenaire', formation: 'Formation' },
};

// ---------------------------------------------------------------- lecture
/** Frontmatter : une clé par ligne ; valeurs JSON (chaînes, tableaux, objets) ou scalaires nus. */
function parseFrontmatter(src, file) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: src, errors: [`${file} : frontmatter absent`] };
  const data = {}; const errors = [];
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 0) { errors.push(`${file} : ligne illisible « ${line} »`); continue; }
    const key = line.slice(0, i).trim(); const v = line.slice(i + 1).trim();
    if (v === '') data[key] = null;
    else if (/^["[{]/.test(v)) { try { data[key] = JSON.parse(v); } catch { errors.push(`${file} : valeur invalide pour « ${key} » (JSON attendu)`); } }
    else if (/^-?\d+(\.\d+)?$/.test(v)) data[key] = Number(v);
    else if (v === 'true' || v === 'false') data[key] = v === 'true';
    else data[key] = v;
  }
  return { data, body: src.slice(m[0].length), errors };
}

function load() {
  const arts = new Map(); const errors = [];
  for (const [type, dir] of Object.entries(DIRS)) {
    const abs = path.join(WIKI, dir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter((x) => x.endsWith('.md')).sort()) {
      const rel = `${dir}/${f}`;
      const src = fs.readFileSync(path.join(abs, f), 'utf8');
      const { data, body, errors: e } = parseFrontmatter(src, rel);
      errors.push(...e);
      if (data.type && data.type !== type) errors.push(`${rel} : type « ${data.type} » rangé dans ${dir}/`);
      const slug = f.replace(/\.md$/, '');
      arts.set(`${dir}/${slug}`, { key: `${dir}/${slug}`, rel, type, slug, data, body, src });
    }
  }
  return { arts, errors };
}

// ---------------------------------------------------------------- helpers
const titleOf = (a) => a.data.titre || a.data.nom || a.slug;
const relLink = (fromRel, toKey) => path.posix.relative(path.posix.dirname(fromRel), `${toKey}.md`);
const mdLink = (fromRel, a) => `[${titleOf(a)}](${relLink(fromRel, a.key)})`;
const asArr = (v) => (Array.isArray(v) ? v : v == null || v === '' ? [] : [v]);
const yr = (d) => (typeof d === 'number' ? d : typeof d === 'string' && /^\d{4}/.test(d) ? Number(d.slice(0, 4)) : null);
function periode(d) {
  const a = yr(d.debut); if (!a) return null;
  const f = d.fin === 'en cours' ? '…' : yr(d.fin);
  return f && f !== a ? `${a}–${f}` : `${a}`;
}
function replaceBlock(src, name, content) {
  const re = new RegExp(`<!-- wiki:${name} -->[\\s\\S]*?<!-- /wiki:${name} -->`);
  if (!re.test(src)) return src;
  return src.replace(re, `<!-- wiki:${name} -->\n${content.trim() ? content.trim() + '\n' : ''}<!-- /wiki:${name} -->`);
}
const GEN = (cmd = 'npm run wiki') => `<!-- Fichier généré par scripts/wiki-build.mjs (${cmd}). Ne pas éditer à la main : modifier les articles. -->\n`;
const stripGen = (s) => s.replace(/<!-- wiki:([a-z-]+) -->[\s\S]*?<!-- \/wiki:\1 -->/g, '');
const esc = (s) => String(s).replace(/\|/g, '\\|');

// ---------------------------------------------------------------- validation
function validate(arts) {
  const errors = []; const warns = [];
  const has = (k) => arts.has(k);
  for (const a of arts.values()) {
    const d = a.data; const at = a.rel;
    if (a.type === 'projet') {
      if (!d.titre) errors.push(`${at} : « titre » manquant`);
      for (const k of ['categorie', 'casquette', 'etat']) {
        if (!d[k]) errors.push(`${at} : « ${k} » manquant`);
        else if (!ENUMS[k].includes(d[k])) errors.push(`${at} : ${k} « ${d[k]} » inconnu (${ENUMS[k].join(', ')})`);
      }
      if (d.client && !['perso', 'prive'].includes(d.client) && !has(`organisations/${d.client}`)) errors.push(`${at} : client « ${d.client} » sans fiche organisations/`);
      for (const o of asArr(d.chaine)) if (!has(`organisations/${o}`)) errors.push(`${at} : chaîne « ${o} » sans fiche organisations/`);
      if (d.parent && !has(`projets/${d.parent}`)) errors.push(`${at} : parent « ${d.parent} » introuvable`);
      for (const p of asArr(d.personnes)) if (!has(`personnes/${p}`)) errors.push(`${at} : personne « ${p} » introuvable`);
      if (!d.client && !d.client_libelle) warns.push(`${at} : pas de client (mettre « perso », « prive » ou un slug d'organisation)`);
    } else {
      if (!d.nom) errors.push(`${at} : « nom » manquant`);
      if (d.etat && !ENUMS.etat.includes(d.etat)) errors.push(`${at} : etat « ${d.etat} » inconnu`);
      if (a.type === 'organisation' && d.relation && !ENUMS.relation.includes(d.relation)) errors.push(`${at} : relation « ${d.relation} » inconnue`);
      for (const p of asArr(d.personnes)) if (!has(`personnes/${p}`)) errors.push(`${at} : personne « ${p} » introuvable`);
      for (const o of asArr(d.organisations)) if (!has(`organisations/${o}`)) errors.push(`${at} : organisation « ${o} » introuvable`);
    }
    if (d.debut != null && !yr(d.debut)) errors.push(`${at} : debut « ${d.debut} » invalide (année ou AAAA-MM-JJ)`);
    if (d.fin != null && d.fin !== 'en cours' && !yr(d.fin)) errors.push(`${at} : fin « ${d.fin} » invalide (année ou « en cours »)`);
    if (yr(d.debut) && yr(d.fin) && yr(d.fin) < yr(d.debut)) errors.push(`${at} : fin antérieure au début`);
    // liens Markdown internes
    for (const [, target] of a.body.matchAll(/\]\((?!https?:|mailto:|#)([^)\s]+\.md)(?:#[^)]*)?\)/g)) {
      const abs = path.posix.normalize(path.posix.join(path.posix.dirname(at), target));
      if (!GENERATED.has(abs) && !fs.existsSync(path.join(WIKI, abs))) errors.push(`${at} : lien cassé vers ${target}`);
    }
  }
  return { errors, warns };
}

// ---------------------------------------------------------------- relations
function relations(arts) {
  const projets = [...arts.values()].filter((a) => a.type === 'projet');
  const byOrg = new Map(); const byPers = new Map(); const children = new Map(); const backlinks = new Map();
  const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
  for (const p of projets) {
    const d = p.data;
    if (d.client && arts.has(`organisations/${d.client}`)) push(byOrg, `organisations/${d.client}`, { p, how: 'client' });
    for (const o of asArr(d.chaine)) push(byOrg, `organisations/${o}`, { p, how: 'via' });
    for (const x of asArr(d.personnes)) push(byPers, `personnes/${x}`, { p, how: 'équipe' });
    if (d.parent) push(children, `projets/${d.parent}`, p);
  }
  for (const o of [...arts.values()].filter((a) => a.type === 'organisation'))
    for (const x of asArr(o.data.personnes)) push(byPers, `personnes/${x}`, { p: o, how: 'organisation' });
  for (const a of arts.values()) {
    const targets = new Set();
    for (const [, t] of stripGen(a.body).matchAll(/\]\((?!https?:)([^)\s#]+)\.md/g)) targets.add(path.posix.normalize(path.posix.join(path.posix.dirname(a.rel), t)));
    const d = a.data;
    if (d.client) targets.add(`organisations/${d.client}`);
    asArr(d.chaine).forEach((o) => targets.add(`organisations/${o}`));
    if (d.parent) targets.add(`projets/${d.parent}`);
    asArr(d.personnes).forEach((x) => targets.add(`personnes/${x}`));
    asArr(d.organisations).forEach((x) => targets.add(`organisations/${x}`));
    for (const t of targets) if (t !== a.key && arts.has(t)) push(backlinks, t, a);
  }
  return { projets, byOrg, byPers, children, backlinks };
}
const sortProj = (a, b) => (yr(b.data.debut) ?? 0) - (yr(a.data.debut) ?? 0) || titleOf(a).localeCompare(titleOf(b), 'fr');

// ---------------------------------------------------------------- blocs
function infobox(a, arts, rel) {
  const d = a.data; const rows = [];
  const L = (k) => (arts.has(k) ? mdLink(a.rel, arts.get(k)) : null);
  const row = (k, v) => { if (v != null && v !== '' && !(Array.isArray(v) && !v.length)) rows.push(`| ${k} | ${Array.isArray(v) ? v.join(' · ') : v} |`); };
  if (a.type === 'projet') {
    row('Client', d.client === 'perso' ? 'Projet personnel' : d.client === 'prive' ? 'Commande privée' : d.client ? L(`organisations/${d.client}`) ?? esc(d.client) : d.client_libelle ? `${esc(d.client_libelle)} _(sans fiche)_` : null);
    row('Via', asArr(d.chaine).map((o) => L(`organisations/${o}`) ?? o));
    row('Période', d.date ? `${d.date}` : periode(d));
    row('Casquette', LABEL.casquette[d.casquette]);
    row('Catégorie', LABEL.categorie[d.categorie]);
    row('Rôle', d.role && esc(d.role));
    row('Disciplines', asArr(d.disciplines).map(esc));
    row('Fait partie de', d.parent ? L(`projets/${d.parent}`) : null);
    row('Sous-projets', [...(rel.children.get(a.key) || [])].sort(sortProj).map((c) => mdLink(a.rel, c)));
    row('Personnes', asArr(d.personnes).map((x) => L(`personnes/${x}`) ?? x));
    row('Folio', d.folio ? `[${d.folio === '/work' ? 'Folio' : 'Étude de cas'} ↗](${SITE}${d.folio})${d.folio === '/work' ? ' _(cité, sans page dédiée)_' : ''}` : d.masque_folio ? '_masqué sur le site_' : '_pas encore sur le site_');
    row('Code', asArr(d.repos).map((r) => `\`${r}\``));
  } else if (a.type === 'organisation') {
    row('Nature', d.nature && esc(d.nature));
    row('Relation', LABEL.relation[d.relation]);
    row('Rôle d’Alexandre', d.role && esc(d.role));
    row('Période', periode(d));
    row('Lieu', d.lieu);
    row('Marques', asArr(d.marques));
    row('Personnes', asArr(d.personnes).map((x) => L(`personnes/${x}`) ?? x));
    row('Projets liés', String((rel.byOrg.get(a.key) || []).length));
  } else {
    row('Rôle', d.role && esc(d.role));
    row('Naissance', d.naissance);
    row('Lieu', d.lieu);
    row('Organisations', asArr(d.organisations).map((x) => L(`organisations/${x}`) ?? x));
  }
  row('Liens', asArr(d.liens).map((l) => `[${esc(l.label)}](${l.url})`));
  row('État de la fiche', LABEL.etat[d.etat] ?? d.etat);
  return `| ${titleOf(a).replace(/\|/g, '\\|')} | |\n| --- | --- |\n${rows.join('\n')}`;
}
function projetsBlock(a, rel) {
  const list = (a.type === 'organisation' ? rel.byOrg : rel.byPers).get(a.key) || [];
  if (!list.length) return '_Aucun projet rattaché pour l’instant._';
  return [...list].sort((x, y) => sortProj(x.p, y.p)).map(({ p, how }) =>
    `- ${periode(p.data) ? `**${periode(p.data)}** — ` : ''}${mdLink(a.rel, p)}${how === 'via' ? ' _(en tant qu’agence relais)_' : how === 'organisation' ? '' : ''}`).join('\n');
}
function backlinksBlock(a, rel) {
  const list = [...new Set(rel.backlinks.get(a.key) || [])].sort((x, y) => titleOf(x).localeCompare(titleOf(y), 'fr'));
  if (!list.length) return '';
  return `---\n**Pages liées** : ${list.map((x) => mdLink(a.rel, x)).join(' · ')}`;
}

// ---------------------------------------------------------------- pages générées
function chronologie(arts, rel) {
  const R = 'chronologie.md';
  const parcours = [...arts.values()].filter((a) => a.type === 'organisation' && ['formation', 'employeur', 'agence-propre', 'partenaire'].includes(a.data.relation) && yr(a.data.debut));
  const years = new Map(); const sansDate = [];
  const add = (y, line) => { if (!years.has(y)) years.set(y, { parcours: [], projets: [] }); years.get(y)[line.kind].push(line); };
  for (const o of parcours) add(yr(o.data.debut), { kind: 'parcours', t: `${mdLink(R, o)} — ${esc(o.data.role || LABEL.relation[o.data.relation])} (${periode(o.data)})` });
  for (const p of rel.projets) {
    const y = yr(p.data.debut);
    const client = p.data.client && arts.get(`organisations/${p.data.client}`);
    const meta = [periode(p.data), client ? titleOf(client) : p.data.client === 'perso' ? 'perso' : null, LABEL.casquette[p.data.casquette]].filter(Boolean).join(' · ');
    const line = `${mdLink(R, p)} — ${meta}${p.data.folio ? '' : ' · _hors folio_'}`;
    if (y) add(y, { kind: 'projets', t: line }); else sansDate.push(`- ${line}`);
  }
  const out = [GEN(), '# Chronologie', '',
    'La ligne de temps du travail d’Alexandre « Xtincell » Djengue, de la formation à aujourd’hui. Chaque année liste les étapes de parcours (postes, structures) puis les projets **commencés** cette année-là. Le récit qui relie ces années est dans la [biographie](personnes/alexandre-djengue.md).', ''];
  for (const y of [...years.keys()].sort((a, b) => a - b)) {
    const { parcours: pa, projets: pr } = years.get(y);
    out.push(`## ${y}`, '');
    if (pa.length) out.push(...pa.map((l) => `- **Parcours** · ${l.t}`));
    if (pr.length) out.push(...pr.sort((a, b) => a.t.localeCompare(b.t, 'fr')).map((l) => `- ${l.t}`));
    out.push('');
  }
  if (sansDate.length) out.push('## Sans date', '', '_Projets à dater — voir [maintenance](maintenance.md)._', '', ...sansDate.sort(), '');
  return out.join('\n');
}
function index(arts, rel) {
  const R = 'index.md';
  const P = rel.projets;
  const grp = (keyFn, labelFn, order) => {
    const m = new Map();
    for (const p of P) for (const k of [].concat(keyFn(p))) { if (!m.has(k)) m.set(k, []); m.get(k).push(p); }
    const keys = order ? order.filter((k) => m.has(k)).concat([...m.keys()].filter((k) => !order.includes(k))) : [...m.keys()].sort((a, b) => String(labelFn(a)).localeCompare(String(labelFn(b)), 'fr'));
    return keys.map((k) => [`### ${labelFn(k)} (${m.get(k).length})`, '', ...m.get(k).sort(sortProj).map((p) => `- ${mdLink(R, p)}${periode(p.data) ? ` — ${periode(p.data)}` : ''}`), ''].join('\n')).join('\n');
  };
  const clientLabel = (k) => (k === 'perso' ? 'Projets personnels' : k === 'prive' ? 'Commandes privées' : k === '?' ? 'Client non renseigné' : arts.has(`organisations/${k}`) ? titleOf(arts.get(`organisations/${k}`)) : k);
  const orgs = [...arts.values()].filter((a) => a.type === 'organisation');
  return [GEN(), '# Index', '',
    `${P.length} projets · ${orgs.length} organisations · ${[...arts.values()].filter((a) => a.type === 'personne').length} personnes.`, '',
    '- [Par casquette](#par-casquette) · [Par catégorie](#par-catégorie) · [Par client](#par-client) · [Organisations](#organisations)', '',
    '## Par casquette', '', grp((p) => p.data.casquette, (k) => LABEL.casquette[k] ?? k, ENUMS.casquette),
    '## Par catégorie', '', grp((p) => p.data.categorie, (k) => LABEL.categorie[k] ?? k),
    '## Par client', '', grp((p) => p.data.client || '?', clientLabel),
    '## Organisations', '',
    ...ENUMS.relation.map((r) => {
      const l = orgs.filter((o) => o.data.relation === r).sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'fr'));
      return l.length ? `### ${LABEL.relation[r]} (${l.length})\n\n${l.map((o) => `- ${mdLink(R, o)}${periode(o.data) ? ` — ${periode(o.data)}` : ''} · ${(rel.byOrg.get(o.key) || []).length} projet(s)`).join('\n')}\n` : '';
    }),
  ].join('\n');
}
function maintenance(arts, rel, warns) {
  const R = 'maintenance.md';
  const all = [...arts.values()];
  const aVerifier = all.filter((a) => a.data.etat === 'a-verifier');
  const ebauches = all.filter((a) => a.data.etat === 'ebauche');
  const horsFolio = rel.projets.filter((p) => !p.data.folio && !p.data.masque_folio);
  const sansPage = rel.projets.filter((p) => p.data.folio === '/work');
  const sansDate = rel.projets.filter((p) => !yr(p.data.debut));
  const total = all.length; const complets = all.filter((a) => ['standard', 'complet'].includes(a.data.etat)).length;
  return [GEN(), '# Maintenance du wiki', '',
    `**Avancement** : ${complets}/${total} fiches au niveau « standard » ou « complet » (${Math.round((100 * complets) / total)} %).`, '',
    `- [À vérifier](#à-vérifier) (${aVerifier.length}) · [Absents du folio](#absents-du-folio) (${horsFolio.length}) · [Sans page dédiée](#sans-page-dédiée) (${sansPage.length}) · [Sans date](#sans-date) (${sansDate.length}) · [Ébauches](#ébauches) (${ebauches.length})`, '',
    '## À vérifier', '', 'Contradictions entre sources ou hypothèses de rattachement. Une fois tranché : corriger la fiche, vider `verifier` et passer `etat` à `standard`.', '',
    ...aVerifier.sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'fr')).map((a) => `- ${mdLink(R, a)}\n${asArr(a.data.verifier).map((v) => `  - ${v}`).join('\n')}`), '',
    '## Absents du folio', '', 'Projets historisés ici mais sans page sur le site. Le folio doit à terme montrer l’intégralité des travaux : chaque ligne est une page `/work/…` à créer (ou un `masque_folio: true` assumé).', '',
    ...ENUMS.casquette.map((c) => {
      const l = horsFolio.filter((p) => p.data.casquette === c).sort(sortProj);
      return l.length ? `### ${LABEL.casquette[c]} (${l.length})\n\n${l.map((p) => `- ${mdLink(R, p)}${periode(p.data) ? ` — ${periode(p.data)}` : ''}${asArr(p.data.medias).length ? ' · visuels disponibles' : ''}`).join('\n')}\n` : '';
    }),
    '## Sans page dédiée', '', 'Projets cités dans la liste des pratiques de `/work`, sans page `/work/<slug>` à eux.', '',
    ...sansPage.sort(sortProj).map((p) => `- ${mdLink(R, p)}${periode(p.data) ? ` — ${periode(p.data)}` : ''}${asArr(p.data.medias).length ? ' · visuels disponibles' : ''}`), '',
    '## Sans date', '', ...sansDate.map((p) => `- ${mdLink(R, p)}`), '',
    '## Ébauches', '', 'Fiches créées automatiquement, à rédiger (contexte, rôle, démarche, résultat).', '',
    ...ebauches.sort((a, b) => titleOf(a).localeCompare(titleOf(b), 'fr')).map((a) => `- ${mdLink(R, a)}`), '',
    ...(warns.length ? ['## Avertissements du build', '', ...warns.map((w) => `- ${w}`), ''] : []),
  ].join('\n');
}
function dataJson(arts, rel) {
  const plain = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
  const lead = (a) => plain(a.body.replace(/^#.*$/m, '').replace(/<!-- wiki:infobox -->[\s\S]*?<!-- \/wiki:infobox -->/, '')).split(/\n\s*\n/).map((x) => x.trim()).find((x) => x && !x.startsWith('#') && !x.startsWith('|')) ?? '';
  return JSON.stringify({
    site: SITE,
    articles: [...arts.values()].map((a) => ({ key: a.key, type: a.type, slug: a.slug, path: `wiki/${a.rel}`, titre: titleOf(a), resume: lead(a), ...a.data, enfants: [...(rel.children.get(a.key) || [])].sort(sortProj).map((c) => c.slug) })),
  }, null, 2) + '\n';
}

// ---------------------------------------------------------------- main
const { arts, errors: parseErrors } = load();
const { errors, warns } = validate(arts);
errors.unshift(...parseErrors);
const rel = relations(arts);

if (CHECK_ONLY) {
  // vérifie aussi que les fichiers générés sont à jour
  const stale = [];
  const expect = { 'chronologie.md': chronologie(arts, rel), 'index.md': index(arts, rel), 'maintenance.md': maintenance(arts, rel, warns), '_data/wiki.json': dataJson(arts, rel) };
  for (const [f, c] of Object.entries(expect)) { const p = path.join(WIKI, f); if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== c) stale.push(f); }
  for (const a of arts.values()) if (render(a) !== a.src) stale.push(a.rel);
  if (stale.length) errors.push(`Fichiers à régénérer avec « npm run wiki » : ${stale.slice(0, 8).join(', ')}${stale.length > 8 ? '…' : ''}`);
} else {
  let changed = 0;
  for (const a of arts.values()) { const out = render(a); if (out !== a.src) { fs.writeFileSync(path.join(WIKI, a.rel), out); changed++; } }
  fs.mkdirSync(path.join(WIKI, '_data'), { recursive: true });
  fs.writeFileSync(path.join(WIKI, 'chronologie.md'), chronologie(arts, rel));
  fs.writeFileSync(path.join(WIKI, 'index.md'), index(arts, rel));
  fs.writeFileSync(path.join(WIKI, 'maintenance.md'), maintenance(arts, rel, warns));
  fs.writeFileSync(path.join(WIKI, '_data/wiki.json'), dataJson(arts, rel));
  const readme = path.join(WIKI, 'README.md');
  if (fs.existsSync(readme)) {
    const P = rel.projets;
    const ys = P.map((p) => yr(p.data.debut)).filter(Boolean);
    const stats = `**${P.length} projets** · **${[...arts.values()].filter((a) => a.type === 'organisation').length} organisations** · ${Math.min(...ys)}–${Math.max(...ys)} · ${P.filter((p) => p.data.folio && p.data.folio !== '/work').length} avec une page sur le folio, ${P.filter((p) => p.data.folio === '/work').length} cités sur \`/work\` sans page, ${P.filter((p) => !p.data.folio && !p.data.masque_folio).length} encore absents ([maintenance](maintenance.md)).`;
    const src = fs.readFileSync(readme, 'utf8'); const out = replaceBlock(src, 'stats', stats);
    if (out !== src) fs.writeFileSync(readme, out);
  }
  console.log(`wiki : ${arts.size} articles, ${changed} mis à jour, index/chronologie/maintenance régénérés.`);
}
function render(a) {
  let s = a.src;
  s = replaceBlock(s, 'infobox', infobox(a, arts, rel));
  if (a.type !== 'projet') s = replaceBlock(s, 'projets', projetsBlock(a, rel));
  s = replaceBlock(s, 'liens-entrants', backlinksBlock(a, rel));
  return s;
}

for (const w of warns) console.warn(`  ⚠ ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.error(`wiki : ${errors.length} erreur(s).`);
  process.exit(1);
}
if (CHECK_ONLY) console.log(`wiki : ${arts.size} articles valides, fichiers générés à jour.`);
