# Xtincell Folio · Folio_Spark

Personal portfolio + UPgraders agency site for Alexandre « Xtincell » Djengue.

Built from a Claude Design HTML/React-CDN prototype, ported to Next.js 15 (App Router) with TypeScript strict and CSS Modules.

---

## Stack

- **Next.js 15** · React 19 · TypeScript strict + `noUncheckedIndexedAccess`
- **CSS Modules** scopés sous `.folioRoot`
- **Polices** via `next/font/google` : Instrument Serif (display), Space Grotesk (UI), JetBrains Mono (meta), Fraunces (UPgraders only)
- **Zéro dépendance externe** au-delà de Next/React
- **Node 22+** requis (utilise `fetch` natif et `child_process` pour les scripts de sync)

---

## Dev

```bash
npm install
npm run dev               # http://localhost:1009
npm run build             # production build
npm run typecheck         # strict TS check
npm run lint              # next lint
```

> Le port est forcé à **1009** (depuis `package.json`) au lieu du 3000 par défaut.

---

## Routes

| Route | Description |
| --- | --- |
| `/` | Folio principal — masthead éditorial, manifeste, méthode ADVE/RTIS, trois casquettes, UPgraders teaser, Travaux, LaFusée, contact |
| `/cv` | CV éditorial v15.0 — 60 secondes, print-ready |
| `/work` | Folio approfondi en 3 pratiques : Stratégie · Direction Créative & Artistique · Exécution. Avec chaînes de filiation (AgencyChain) et preuves vidéo embed |
| `/galerie` | Galerie photo — 18 collections Pixieset + 8 dernières vidéos YouTube + cards Instagram/Facebook |
| `/upgraders` | Page dédiée à l'agence UPgraders (méthode, OS LaFusée, La Guilde, terminal interactif) |

---

## Structure

```
src/
  app/
    layout.tsx              # root layout (fonts + globals)
    page.tsx                # /
    cv/page.tsx             # /cv
    work/page.tsx           # /work
    galerie/page.tsx        # /galerie
    upgraders/
      layout.tsx            # /upgraders + Fraunces font scope
      page.tsx
      Terminal.tsx          # 'use client' island
  components/folio/         # 22 components (Hero, Method, Practices, …)
    data/                   # data modules
      contact.ts            # email, WhatsApp, socials
      practices.ts          # 20 projets (3 pratiques)
      method.ts             # ADVE/RTIS framework
      agencies.ts           # MATANGA, Bimstr, Her Media, …
      pillars.ts
      editopics.ts
      galleries.ts          # ⚙️  AUTO-GENERATED (Pixieset)
      social-feed.ts        # ⚙️  AUTO-GENERATED (YouTube)
  styles/
    globals.css
    home.module.css
    cv.module.css
    work.module.css
    galerie.module.css
    upgraders.module.css
scripts/
  sync-galleries.mjs        # Pixieset + YouTube auto-sync
public/                     # portrait, logos, agency assets
```

Server components par défaut ; les sections interactives (StarField, Method picker, AgencyTooltip, Terminal) sont des `'use client'` islands.

---

## ⚙️ Sync auto Pixieset + YouTube

La galerie photo et le feed YouTube sont régénérés à la commande depuis les sources publiques. Aucune clé API requise.

```bash
npm run sync-galleries        # fetch + write les deux fichiers
npm run sync-galleries:dry    # preview verbose, n'écrit rien
```

### Ce que fait le script

`scripts/sync-galleries.mjs` :

1. **Fetch `xtincell.pixieset.com`** via `curl --http1.1` avec headers browser (bypass du Cloudflare TLS-fingerprint check qu'`undici` de Node ne passe pas).
2. **Parse les 18+ collections** : slug, titre, cover (`images.pixieset.com`), date FR, lock state, `bgPosition` éventuel.
3. **Préserve les `category`** que tu as édités manuellement, matchées par `slug`. Re-sync = covers/titres/dates rafraîchis sans écraser tes overrides.
4. **Détecte le channel ID YouTube** depuis `youtube.com/@x-tincell` (regex sur `"externalId"`).
5. **Fetch le RSS public** `feeds/videos.xml?channel_id=…` → 8 dernières vidéos avec titre, date, ID. Thumbnails stables sur `i.ytimg.com/vi/{ID}/hqdefault.jpg`.
6. **Écrit deux fichiers** :
   - `src/components/folio/data/galleries.ts`
   - `src/components/folio/data/social-feed.ts`

### Logs

Le script imprime :
- nombre de collections parsées
- nombre de catégories préservées
- slugs nouveaux (sans catégorie pour l'instant)
- slugs disparus de Pixieset (leurs catégories seront perdues)
- titres + dates des vidéos YouTube

### Workflow

| Action | Commande |
| --- | --- |
| Tu publies une nouvelle galerie Pixieset | `npm run sync-galleries` |
| Tu publies une vidéo YouTube | `npm run sync-galleries` |
| Tu veux changer la catégorie d'une galerie | Édite `galleries.ts` à la main, sync respecte ton override |
| Tu veux preview avant d'écrire | `npm run sync-galleries:dry` |

### Si le script casse

- **Cloudflare interstitial** : Pixieset peut renforcer son challenge. Re-tente, change de réseau, ou debug les headers `curl` dans le script.
- **0 collections parsées** : Pixieset a probablement changé sa structure HTML (`class="collection-item"`). Inspecte le HTML brut et adapte les regex de `parseGalleries()`.
- **YouTube channel ID introuvable** : YouTube a changé son markup. Le script fallback sur `null` et n'écrit pas de vidéos — ajuste la regex dans `fetchYouTubeVideos()`.

### Limites connues

- **Instagram & Facebook** ne sont pas scrapables sans auth — la galerie n'affiche que des cards de profil link-out, pas les posts. Si tu veux des posts spécifiques, ajoute-les manuellement dans une nouvelle structure de données.

---

## CTA — priorité WhatsApp partout

L'ordre des canaux de contact est figé site-wide : **WhatsApp en primaire, Email en secondaire**.

| Endroit | Primaire | Secondaire |
| --- | --- | --- |
| Section Contact landing (`Contact.tsx`) | Card WhatsApp (orange, `contactMain`) | Card Email |
| Topbars `/work`, `/galerie`, `/cv` | Lien "Contact" → `wa.me` | — |
| Footers CTA `/work`, `/galerie`, `/cv` | Bouton orange WhatsApp | Bouton ghost Email |
| Footer `/upgraders` | CTA WhatsApp | CTA Email (opacity 0.85) |
| CV `<dl>` meta | WhatsApp en haut | Email en dessous |

**Source unique de vérité** : `src/components/folio/data/contact.ts` (`whatsappLink`, `whatsappDisplay`, `email`).

---

## Données du CV — alignement LinkedIn

Le CV (`/cv`) est aligné avec le profil LinkedIn `/in/dmalexandre` :

- **Né** : 1991 · Cameroun
- **Diplôme** : Ingénieur des Travaux — télécommunications & réseaux · **Iftic-Sup** (2008–2013). Bac D Sciences (Collège Saint-Michel, 2008).
- **Parcours** : MATANGA Agency (2025+, DC&A) · UPgraders (2017+, CEO depuis 2023) · Friends Photography Studio (2023+) · Motion19 Brand Manager (2021–2023) · Bimstr Agency (2019–2021) · Studio44 + W&B (2018) · Universal Music Africa freelance (2016–2022) · Chococam freelance (2014–2020) · Orange / McCann (2013–2018) · Freelance graphiste/webdesigner (2011–2016).
- **Langues** : Français natif · Anglais intermédiaire pro · Japonais notions élémentaires.

UMA, Chococam direct, Orange/McCann, KEMCARE, Omenkart sont **off-LinkedIn** car missions en marque blanche / via UPgraders. Conservés dans le parcours volontairement.

**Brand vanity assumée** :
- "Ingénieur télécom" en shorthand prose ([cv/page.tsx §01](src/app/cv/page.tsx)) — au Cameroun, bac+3 pro = Ingénieur des Travaux, titre officiel.
- **"Vol. 15" / "VER 15.0"** sur le masthead = **15 ans de pratique professionnelle** (2011 → 2026, depuis le premier statut freelance Graphiste/Webdesigner per LinkedIn). Ancré factuellement, défendable, harmonisé avec le CV §01 ("15 ans en marketing & design"). Aucun nombre vanity arbitraire.
- "15 ans" sur le CV §01 et eyebrow `/work` = compte réel depuis le début freelance 2011.

---

## Page `/galerie` — 4 sections

1. **Masthead éditorial** — eyebrow `GALERIE · 18 COLLECTIONS · HOSTED ON PIXIESET`, h1 *« La main tient l'outil. »*, lede contexte.
2. **Filtres catégories** — chips mono caps (Mariage, Festival, Portrait Musique, Corporate, Reportage, Événement).
3. **Grid Pixieset** — 18 cards, 3 colonnes desktop. Cover hot-linkée (CDN cache 1 an), patch `via Pixieset` top-left, badge `Privée` si galerie verrouillée par mot de passe Pixieset, click → ouvre Pixieset en nouvel onglet.
4. **Aussi sur — multiplateforme**
   - h2 *« Au-delà de la photo. »*
   - Grid YouTube 4 colonnes : 8 dernières vidéos, thumbnails HD, play overlay, click → YouTube.
   - 3 profile cards : Instagram (`@xtincell`), Facebook (`/xtincell`), YouTube channel (`@x-tincell`).
   - Patch `via YouTube/Instagram/Facebook` sur chaque card.

**Pourquoi pas d'iframe Pixieset** : Pixieset envoie `X-Frame-Options: SAMEORIGIN` — embed iframe impossible. La stratégie hot-link cover + redirect préserve le contrôle d'accès Pixieset (mots de passe, statistiques, téléchargements).

**Pourquoi pas d'iframe Instagram/Facebook** : nécessite des post URLs spécifiques + JS embed lourd. Les link-out cards profil sont plus rapides et propres pour de l'audience-builder.

**Whitelist images** : `next.config.ts` autorise `images.pixieset.com` dans `images.remotePatterns`. YouTube thumbnails (`i.ytimg.com`) ne passent pas par `next/image` actuellement (background-image CSS pour le contrôle bgPosition).

---

## Page `/work` — parité avec landing

`/work` rend exactement les mêmes données que la section `Practices` de la landing :

- **`AgencyChain`** : chaîne complète de filiation (Client ← Agence relais ← Cellule d'exécution) avec tooltips.
- **`ProofEmbed`** : embeds vidéo YouTube/Facebook/Instagram pour les projets qui en ont (Retlaw, Tartina, Maison Gimane, Oceanis Kribi, Chococam capsules…).
- **Eyebrow** : `20 PROJETS · 15 ANS · 25+ MARQUES` (compte réel des entries de `practices.ts`).

---

## Décisions design

- **Masthead éditorial** sur le hero (`Hero.tsx`) : ligne d'ours `Vol. 15 · DISPONIBLE · FOLIO ÉDITION 2026`, kicker italique *« — Alexandre Djengue — »*, titre `XTINCELL` lettres justifiées edge-to-edge (Instrument Serif), bottom rule `BRAND ARCHITECT · STORYTELLING CONSULTANT · TOOLSMITH`.
- **Macarons portrait** : deux disques circulaires (orange + crème) sur le portrait — *Rôle principal · CEO · UPgraders* + *Mandat actif · DC&A · MATANGA Agency*.
- **Nav cohérence** :
  - **Landing** : `Manifeste · Méthode · Folio ↗ · Galerie ↗ · CV ↗ · Contact` (les 2 premiers sont des hash-anchors in-page, les 3 suivants sortent vers les pages internes, "Contact" scroll vers la section #contact riche).
  - **Pages internes** (/work, /galerie, /cv, /upgraders) : strictement le **même set 5 items** `Accueil · Folio · Galerie · CV · Contact`. Page active marquée `aria-current="page"` (highlight orange).
  - **Contact** : sur la landing → ancre `#contact` (qui contient déjà la card WhatsApp primaire). Sur pages internes → lien direct `wa.me` (WhatsApp prioritaire partout).
- **Patch source** : pastille mono caps avec point pulsé orange, top-left de chaque card galerie. Cohérence cross-plateforme (Pixieset, YouTube, Instagram, Facebook).

---

## Conventions de code

- **CSS Modules** : tokens (`--bg`, `--ink`, `--accent`, `--serif`, etc.) déclarés dans `.folioRoot` de chaque module ; pas de `@import` cross-module (CSS Modules ne le gère pas proprement).
- **Polices** : `var(--folio-serif)`, `var(--folio-grotesk)`, `var(--folio-mono)` exposées par le root layout via `next/font`.
- **Aria-hidden** : utilisé sur le masthead et les patches décoratifs.
- **Liens externes** : toujours `target="_blank" rel="noopener noreferrer"` (ou `noreferrer` seul pour les contextes internes).
