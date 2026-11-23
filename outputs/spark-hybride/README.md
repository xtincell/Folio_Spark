# Spark — L’élan prend position

Dossier de recherche hybride, 30 septembre 2026. **L’apparition complète et la boucle définitive restent à produire.**

Ouvrir `index.html` pour comparer le geste, l’inbetween A–B et le test de feu assemblé. La page fonctionne hors ligne. Lire `DIRECTION-WISH-FIGHT-02.md` pour la direction actuelle.

## Ce qui est produit

- Une planche de huit poses : sept recherches générées, puis le maître original.
- Un dessin intermédiaire généré avec ses deux poses voisines comme références.
- Un test de six dessins de flammes assemblés sur la structure blanche originale, en GIF et MP4.
- Les générations brutes, les prompts, les références et les scripts de compositing.

L’étude de feu conserve la géométrie blanche, les trois racines recalées, les couleurs et l’ordre des couches. Les premiers dessins du storyboard restent des recherches : ils ne sont pas encore tous recalés et raccordés. La première génération avec halos est conservée uniquement comme essai écarté.

## Reproduire le compositing

Les images générées sont livrées ; aucun appel au générateur n’est nécessaire pour refaire l’assemblage. Python 3 et Pillow sont requis. Depuis ce dossier :

```sh
python3 source/assemble-study.py
```

Pour reconstruire aussi le MP4, fournir le chemin d’un exécutable FFmpeg :

```sh
FFMPEG=/chemin/vers/ffmpeg python3 source/assemble-study.py
```

Les rendus de référence sont inclus. Pour les recalculer directement depuis le SVG d’origine, installer Puppeteer dans l’environnement Node utilisé, puis lancer :

```sh
node source/prepare-master.mjs
```

Ce script n’utilise aucun moteur de V1/V2. Les chemins vectoriels originaux ne sont pas modifiés. Les références sont rendues à 512 × 512, avec un centre `(240,284)` pour le noyau `(722.28,1341.7)` et une échelle de `0.205`.

## Vérifications

La page a été vérifiée sur bureau et mobile : trois modes fonctionnels, aucune erreur JavaScript relevée, aucun débordement horizontal à 390 px. Le rendu direct du SVG a aussi été comparé pixel par pixel aux cinq références utilisées dans l’étude : résultats identiques. Cette vérification n’est pas une validation de l’animation finale.

`REFLEXION-DA.md` et `INTENTION-UN-ELAN-QUI-OUVRE.md` documentent les étapes précédentes. La contribution fournie par Alexandre figure dans `references/`.

Outil de génération : `image_gen.imagegen`, quatre appels. La variante exacte du modèle n’est pas exposée par l’outil.
