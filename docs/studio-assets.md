# Assets de la refonte du studio

## Typographie locale

Instrument Serif, Space Grotesk, JetBrains Mono, Fraunces et Inter sont hébergées dans `public/fonts` et chargées avec `next/font/local`. Les fichiers WOFF2 proviennent des paquets officiels Fontsource 5.3.0, récupérés depuis le registre npm avec la vérification standard npm. Leurs licences OFL sont conservées avec les polices. La compilation ne dépend plus des serveurs Google Fonts.

## Présentations générées

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

Huit photographies existantes dans `public/work/galerie-pixieset` sont associées à leurs collections correspondantes par `src/lib/gallery-assets.ts`. Elles sont utilisées en priorité dans la galerie et dans le folio Design, et intégrées au showreel. Les métadonnées Pixieset auto-générées restent intactes. Les autres aperçus externes conservent un repli textuel si leur chargement échoue.
