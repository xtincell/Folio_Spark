> **V2 écartée.** Cette version procédurale a été refusée. Les exports V2 ne constituent pas une livraison ; la direction hybride est étudiée dans `../spark-hybride/REFLEXION-DA.md`.

# Spark — Impulsion · V2

Direction de mouvement pour Alexandre « Xtincell » Djengue, 30 septembre 2026.

Ouvrir **index.html** dans un navigateur. Le lecteur propose l’apparition, le feu continu, les trois cadrages, la transparence, le ralenti et la navigation image par image. L’aperçu répète l’apparition avec une pause ; les vidéos exportées se terminent sur le logo. Aucun accès réseau n’est nécessaire.

## Intention

Un instant de tension. Une ouverture franche. Le signe prend sa place, le feu continue de vivre.

Le départ est concentré au centre du signe. Les flammes, d’abord courtes et courbées, se déroulent vers leur emplacement. La lame gagne presque toute sa longueur en une attaque rapide ; sa largeur arrive un peu après. L’étoile pivote en se déployant sur ses deux axes, puis se pose. Les aiguilles prennent leur épaisseur avec leur propre retard, sans créer une seconde étoile parasite. Les formes dépassent légèrement leur position avant de s’apaiser.

Les flammes vivent par la déformation des courbes elles-mêmes. Une onde remonte de la base à la pointe ; deux composantes plus rapides font varier la flexion, la longueur et la largeur. Chaque flamme a sa phase et son amplitude. Le traitement reste net, vectoriel et muet.

Le mouvement reste contenu dans le symbole. Aucun décor ni particule n’est ajouté. La grande flamme reste au-dessus de la garde ; les deux autres restent derrière. Le masque incliné de la lame est conservé.

## Partition

L’ensemble devient lisible en moins d’une seconde. Les entrées se chevauchent, avec une impulsion commune, puis les flammes prolongent le mouvement.

| Élément | Départ | Fin de l’arrivée | Geste |
|---|---:|---:|---|
| Étincelle pleine | 0,08 s | 1,04 s | Ouverture asymétrique et rotation de −132° vers 0° |
| Grande flamme F1 | 0,10 s | 1,19 s | Déroulement depuis le centre, forte flexion de la pointe |
| Lame | 0,17 s | 1,02 s | Attaque en longueur, puis ouverture de sa silhouette |
| Flamme moyenne F2 | 0,19 s | 1,12 s | Déroulement opposé et onde déphasée |
| Aiguilles | 0,23 s | 1,04 s | Rotation liée à l’étoile, épaisseur autonome avec bref dépassement |
| Petite flamme F3 | 0,27 s | 0,99 s | Réponse courte, amplitude plus contenue |
| Apaisement des flammes | 2,02 s | 2,72 s | Retour progressif aux courbes d’origine |
| Tenue du logo exact | 2,72 s | 3,60 s | Dessin d’origine, sans déformation |

**Apparition : 3,6 secondes.** **Feu continu : boucle de 4 secondes.** Dans la boucle, la structure blanche reste stable et les flammes restent actives. Les fonctions sont périodiques et leurs dérivées se raccordent. Le dessin exact est retrouvé à chaque frontière de boucle. L’export ne répète pas l’image terminale, pour éviter un petit arrêt au raccord.

## Livrables

- `index.html` : prévisualisation interactive, utilisable hors ligne.
- `poses-cles.jpg` : huit poses de l’apparition.
- `apercu-apparition.gif` : aperçu rapide ; les vidéos HD restent les références de qualité.
- `exports/` : 18 vidéos muettes, à 60 images/seconde.
- `source/` : projet modifiable en HTML, JavaScript et SVG, avec scripts de rendu et d’encodage.
- `verification/rapport.json` : résultat des contrôles.

Pour l’apparition et le feu continu, chaque combinaison est exportée :

| Format | Dimensions | Fond nuit | Transparent web | Transparent montage |
|---|---|---|---|---|
| 16:9 | 1920 × 1080 | MP4 H.264 | WebM VP9 alpha | MOV ProRes 4444 |
| 1:1 | 1080 × 1080 | MP4 H.264 | WebM VP9 alpha | MOV ProRes 4444 |
| 9:16 | 1080 × 1920 | MP4 H.264 | WebM VP9 alpha | MOV ProRes 4444 |

Le fond nuit utilise `#0A0E1A`. Les films conservent la même taille de signe par rapport au petit côté ; ils sont centrés optiquement. Les images sont rendues depuis le SVG en RGBA 8 bits. Un lecteur qui ne gère pas l’alpha peut afficher un fond noir : dans un logiciel de montage, placer le MOV au-dessus d’un aplat. La prise en charge du WebM alpha dépend du navigateur ; la source vectorielle est l’alternative sans codec.

Le projet source est **un équivalent web déterministe**, et non un fichier After Effects `.aep`. Chaque tracé, courbe de mouvement, amplitude et couleur est modifiable. La variante avec le mot « tincell », optionnelle dans le brief, n’est pas incluse. Aucun fichier du site en production n’est modifié.

## Modifier le mouvement

Dans `source/spark-engine.js` :

- `FLAMES` : départ et fin de l’arrivée, amplitude (`bend`), phase, sens et force du déroulement (`curl`).
- `track()` : interpolation des poses pour contrôler vitesse, dépassement et stabilisation.
- `render()` : poses de la lame, de l’étincelle et des aiguilles ; déformation des flammes.
- `size` dans le constructeur : taille du symbole relative au petit côté.
- `resize(width, height)` : résolution et cadrage.

`source/brand-data.js` conserve les six tracés extraits du SVG fourni. Le maître original est dans `source/brand/01-vectoriel/`. Les polices Ubuntu servent à l’interface uniquement ; leur licence est incluse. Aucun texte n’apparaît dans les vidéos.

## Intégration web

```html
<div id="spark"></div>
<script src="source/brand-data.js"></script>
<script src="source/spark-engine.js"></script>
<script>
const motion = new SparkAnimation(document.querySelector('#spark'), {
  width: 1080, height: 1080, background: 'transparent'
});
motion.svg.style.cssText = 'width:100%;height:auto;display:block';
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  motion.render(3.6, 'apparition');
} else {
  const origin = performance.now();
  function frame(now) {
    const t = (now - origin) / 1000;
    if (t < 3.6) motion.render(t, 'apparition');
    else motion.render((t - 3.6) % 4, 'boucle');
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
</script>
```

Pour un petit logo de navigation, réduire les valeurs `bend` de moitié. En production, suspendre la boucle lorsque le symbole sort du viewport. La transition apparition → boucle conserve la silhouette ; le mouvement reprend après la tenue.

## Reproduire les exports

Node.js et Puppeteer servent au rendu. Python 3 et FFmpeg avec `libx264`, `libvpx-vp9` et `prores_ks` servent à l’encodage. Le contrôle Python utilise Pillow. Les versions sont consignées dans le rapport.

```sh
npm install
npm run render
FFMPEG=/chemin/vers/ffmpeg npm run encode
```

Le rendu est déterministe, à 60 images/seconde. Il ne capture pas une lecture en temps réel. Les images intermédiaires sont créées dans `frames/`, exclu de l’archive. Le master RGBA fait 1080 × 1080 ; les formats paysage et portrait ajoutent de l’espace autour sans agrandir le signe.
