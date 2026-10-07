# Assets de la refonte du studio

## Typographie locale

Instrument Serif, Space Grotesk, JetBrains Mono, Fraunces et Inter sont hébergées dans `public/fonts` et chargées avec `next/font/local`. Les fichiers WOFF2 proviennent des paquets officiels Fontsource 5.3.0, récupérés depuis le registre npm avec la vérification standard npm. Leurs licences OFL sont conservées avec les polices. La compilation ne dépend plus des serveurs Google Fonts.

## Présentations générées

Quatre présentations supplémentaires ont été produites le 7 octobre 2026 avec
l’outil de génération d’images : Ecobank en vitrine, NSIA sur panneau urbain,
Goodlocs en nature morte et Cap Esterias en magazine. Les fichiers WebP 1672px de large
sont hébergés dans `public/studio` (166 à 311 Ko chacun). Le mapping commun
`src/lib/project-presentations.ts` les raccorde aux cartes, études de cas et
folio Design. Chaque légende signale la génération. Les prompts exacts et
références sont dans `docs/mockups-2026-10.json`.

`public/studio/peak-billboard.webp` et `robuste-packaging.webp` ont été générés avec l’outil de génération d’images à partir des créations existantes : `public/work/cases/friesland-campina/hero.webp` et `public/work/cases/robuste-packaging/hero.webp`. Ce sont des mises en situation de portfolio, pas des photographies de déploiements réels. Les originaux des campagnes restent disponibles dans les études de cas.

## Showreel

`public/studio/showreel.mp4` : composition motion originale de 48 secondes, H.264, 1920 × 1080, 30 images/s, sans piste audio. Encodage `faststart`. Neuf séquences : signature vectorielle authentique, typographie cinétique, campagne Peak en plans opposés, triptyques Goodlocs/Robuste, direction artistique, travelling photographique, workflow La Barre, convergence des 39 projets publics, signature de fin raccordée à la première image.

53 sources locales chargées : les 39 couvertures publiques, huit photographies, la flamme officielle, le portrait, deux présentations générées et deux visuels Goodlocs complémentaires. Les collections masquées sont exclues. Les présentations générées et le schéma conceptuel sont légendés dans le film. Les fichiers source restent intacts.

La composition déterministe se trouve dans `scripts/showreel/composition.js` : masques diagonaux, décalages de plans, accélérations et freinages, animations de typographie et liaisons vectorielles. Le rendu Canvas dans Chromium est encodé image par image avec FFmpeg. Aucune dépendance de rendu n’est embarquée dans le navigateur du visiteur : il lit uniquement le MP4. Les commandes restent sous le film et le cadre 16:9 est conservé sur mobile.

```sh
npm run render:showreel            # rendu final 1080p30 + manifeste + storyboard
npm run render:showreel -- --preview # planche de contrôle et poster
npm run render:showreel -- --serve   # composition interactive locale, port 1010
```

Requiert Node, les dépendances npm du projet, Chromium et FFmpeg avec libx264. `PUPPETEER_EXECUTABLE_PATH` permet de choisir le navigateur. L’ancienne commande Python reste un relais vers ce moteur. Le MP4 n’est remplacé qu’après un encodage réussi. Le manifeste consigne le découpage et les sources ; `showreel-storyboard.jpg` fournit une planche de contrôle. Pas de génération vidéo lors d’un déploiement : les fichiers rendus sont versionnés.

## Navigateur cloud

L’application n’a pas besoin du navigateur téléchargé par Puppeteer. Installer avec `PUPPETEER_SKIP_DOWNLOAD=true npm ci`. Le navigateur Chromium fourni par l’environnement est disponible à `/usr/bin/chromium` ; l’export PDF optionnel peut l’utiliser avec `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium npm run export-pdf`. L’export réécrit `source/` ; ne pas l’exécuter sans vérifier les fichiers existants.

## La Barre

Les captures initialement référencées étaient absentes du dépôt. `public/studio/la-barre.svg` illustre le fonctionnement du produit (brief, pièce, version, responsable, décision et livraison). Il est explicitement légendé comme schéma conceptuel, pas comme capture de l’application. Le manifeste des études de cas conserve cette référence pour les futures régénérations.

## Aperçus photographiques retenus

Les 18 collections disposent d’une couverture locale dans `src/lib/gallery-assets.ts`.
Huit photographies existantes sont conservées dans `public/work/galerie-pixieset`
et intégrées au film. Dix couvertures complémentaires ont été récupérées depuis
les URL publiques `images.pixieset.com` déjà référencées par les métadonnées,
puis optimisées en WebP dans `public/gallery/covers`. Leur provenance figure
dans `docs/gallery-cover-sources.json`. Les métadonnées Pixieset auto-générées
et les liens vers les collections complètes restent intacts.
