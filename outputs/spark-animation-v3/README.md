# Spark — L’élan prend position

Animation hybride V3 — 30 septembre 2026.

**À regarder : `exports/spark-film-16x9-nuit.mp4`.** Le film de 7,2 secondes réunit l’apparition de 3,2 secondes et une boucle de feu de 4 secondes. Tous les fichiers sont muets, à 60 images par seconde.

`node source/serve.mjs` démarre un lecteur local sur http://127.0.0.1:8766/ avec la prise en charge des recherches temporelles.

`index.html` propose un lecteur avec les trois séquences, le choix du format, le ralenti et les téléchargements. `apercu.gif` est un aperçu compact à 20 images par seconde.

## Direction

Le premier passage porte simultanément la lame, l’étincelle et le X. Le blanc se précise pendant une courte décélération diagonale. Les trois rémanences orange accompagnent déjà cette action ; leur masse se développe et leurs pointes poursuivent le mouvement après la stabilisation du blanc. La pose finale retient l’énergie du passage.

Cette lecture s’appuie sur la philosophie initiale d’Alexandre : liberté, passion, dépassement et capacité d’agir au service de ce qu’il croit juste. L’épée garde son sens d’outil. WISH / FIGHT reste une lecture possible parmi celles du signe.

## Fichiers livrés

| Séquence | Durée | Formats | Fichiers |
|---|---:|---|---|
| Film complet | 7,2 s | 1920 × 1080, 1080 × 1080, 1080 × 1920 | MP4 sur fond nuit |
| Apparition | 3,2 s | Les trois formats | MP4 nuit, WebM VP9 alpha, MOV ProRes 4444 alpha |
| Boucle | 4 s | Les trois formats | MP4 nuit, WebM VP9 alpha, MOV ProRes 4444 alpha |

21 fichiers vidéo. Couleurs : blanc, orange `#F05A28`, nuit `#0A0E1A`. Les fichiers alpha permettent de choisir un autre fond au montage. Le manifeste des exports se trouve dans `exports/manifest.json`.

## Ce qui a changé depuis les versions écartées

- Les flammes partent de dessins générés : huit poses de déploiement nouvelles et six poses de l’étude précédente pour la boucle.
- Les dessins sont extraits, nettoyés, remis en aplats et recalés sur les trois racines du SVG. Le blanc généré est écarté : seuls les tracés blancs originaux sont utilisés.
- Les deux bords de chaque flamme sont mis en correspondance. L’interpolation conserve une largeur positive et la continuité de chaque masse. Les contours sont reconstruits en courbes, sans fondus entre images ni bruit aléatoire.
- Le passage initial emploie un déplacement diagonal et une mise en tension affine du blanc. À 0,5 seconde, sa géométrie est exactement stabilisée. Aucun point de contrôle du SVG blanc n’est déformé individuellement.
- La petite, la moyenne et la grande flamme suivent des retards différents. Le dernier raccord rejoint les tracés orange originaux, avant une tenue exacte à partir de 1,935 seconde.
- La boucle suit les poses générées avec une amplitude réduite et revient à la géométrie du maître avec une vitesse nulle à la jonction.

C’est une animation hybride : le générateur fournit les dessins de feu ; le code assure leur raccord, la cadence, les attaches, la composition et la fidélité à l’original. Ce n’est pas une vidéo intégralement produite par un modèle vidéo.

## Vérifications

- 866 instants échantillonnés : contours finis, hauteurs positives et largeurs non négatives ; attaches conservées.
- Dernier photogramme comparé au rendu direct du SVG, avec la même caméra : **aucune différence de pixel**.
- Pose de boucle à 0 et 4 secondes identique ; contrôle du déplacement près de la jonction.
- Dimensions, cadence et durée des exports vérifiées ; décodage de la transparence VP9 et ProRes et du film complet.

Les MP4 portent une fonction de transfert sRGB explicite pour conserver le rendu des couleurs de marque dans le navigateur.

Les rapports sont enregistrés dans `verification/`. Le jugement du mouvement et du style reste à apprécier en lecture : les contrôles techniques garantissent les propriétés mesurées ci-dessus.

## Sources et reproduction

Les dessins sont inclus : aucun nouvel appel au générateur n’est nécessaire pour refaire les exports. Outils utilisés : Node avec Puppeteer 24.42.0, Python 3 avec Pillow 12.1.1, FFmpeg 7.1 avec libx264, libvpx-vp9 et prores_ks.

Depuis ce dossier :

```sh
npm install
node source/extract.mjs
python3 source/extract-cels.py
node source/render.mjs
node source/verify.mjs
FFMPEG=/chemin/vers/ffmpeg python3 source/encode.py
FFMPEG=/chemin/vers/ffmpeg python3 source/finish-exports.py
FFMPEG=/chemin/vers/ffmpeg python3 source/check-exports.py
```

Les images sources intermédiaires sont recréées dans `frames/`, volontairement exclu de l’archive pour éviter les doublons volumineux. `source/spark-symbole.svg` est le maître fourni. La police Ubuntu est accompagnée de sa licence.

Génération de cette version : outil intégré `image_gen.imagegen`, un nouvel appel pour les huit poses ; variante exacte du modèle non exposée. Le prompt et les prompts de l’étude réutilisée figurent dans `generation/`.
