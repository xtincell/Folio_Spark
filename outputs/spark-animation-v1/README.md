# Spark — Feu intérieur

Proposition de mouvement pour Alexandre « Xtincell » Djengue, 30 septembre 2026.

Ouvrir **index.html** dans un navigateur : apparition, boucle, trois cadrages, fond nuit ou damier de transparence, pause, déplacement dans le temps et ralenti. Aucun accès réseau n’est nécessaire.

## Intention

Le signe prend force de l’intérieur. La rotation exprime la liberté, la lame qui s’allonge donne une direction, les flammes maintiennent l’élan. Ces lectures arrivent ensemble. Le mouvement reste contenu dans le symbole ; il n’ajoute ni décor, ni particules, ni son.

L’étincelle pleine tourne autour de son véritable centre géométrique. Les aiguilles accompagnent cette rotation avec un très léger retard angulaire ; leur extension et leur arrivée ont leur propre durée. La lame gagne sa longueur sur son axe, pour que sa silhouette soit perçue immédiatement. Les flammes grandissent depuis leur base, puis une onde fait plier les courbes vers leur pointe. La grande flamme reste au-dessus de la garde ; les deux autres restent derrière. Le masque incliné de la lame est conservé.

Le feu est volontairement stylisé : des courbes vectorielles qui se déforment, avec une amplitude et une phase propres à chaque flamme. Les silhouettes restent proches de l’identité d’origine. Il ne s’agit pas d’une simulation de combustion.

## Timing

Toutes les entrées se chevauchent. Les durées ci-dessous concernent la croissance et la rotation, puis les flammes continuent de vivre avant de se poser.

| Élément | Départ | Fin du déploiement | Geste |
|---|---:|---:|---|
| Grande flamme F1 | 0,04 s | 1,98 s | Poussée plus ample, flexion lente, base ancrée |
| Étincelle pleine | 0,06 s | 1,66 s | Rotation de −146° vers sa position d’origine |
| Lame | 0,08 s | 1,52 s | Allongement sur son axe à −67,78°, silhouette pleine |
| Flamme moyenne F2 | 0,12 s | 1,64 s | Poussée et onde déphasée |
| Aiguilles | 0,15 s | 1,89 s | Petit retard angulaire et extension autonome |
| Petite flamme F3 | 0,23 s | 1,42 s | Réponse plus brève, flexion plus courte |
| Apaisement des flammes | 2,70 s | 3,48 s | Retour progressif aux courbes originales |
| Tenue du logo exact | 3,48 s | 4,20 s | Formes, couleurs et superpositions d’origine |

**Boucle : 3 secondes.** Les trois flammes ondulent ; la lame, l’étincelle et les aiguilles sont stables. Les fonctions sont périodiques et leurs dérivées se raccordent. Le dessin exact est retrouvé à chaque frontière de boucle. L’export ne répète pas l’image terminale, pour éviter un petit arrêt au raccord. Les mouvements restent perceptibles, mais peuvent être atténués pour un très petit en-tête.

## Fichiers livrés

- `index.html` : lecteur et feuille de timing.
- `poses-cles.jpg` : huit poses de l’apparition.
- `exports/` : 18 vidéos, muettes, à 60 images/seconde.
- `source/` : projet modifiable en HTML, JavaScript et SVG ; scripts de rendu et d’encodage.
- `verification/rapport.json` : résultats des contrôles effectués.

Pour **l’apparition (4,2 s)** et **la boucle (3 s)**, chaque combinaison est exportée :

| Format | Dimensions | Fond nuit | Fond transparent web | Fond transparent montage |
|---|---|---|---|---|
| 16:9 | 1920 × 1080 | MP4 H.264 | WebM VP9 alpha | MOV ProRes 4444 |
| 1:1 | 1080 × 1080 | MP4 H.264 | WebM VP9 alpha | MOV ProRes 4444 |
| 9:16 | 1080 × 1920 | MP4 H.264 | WebM VP9 alpha | MOV ProRes 4444 |

Le fond nuit utilise `#0A0E1A`. Les films conservent la même taille de signe par rapport au petit côté ; ils sont centrés optiquement. Les masters sont rendus depuis le SVG en RGBA 8 bits ; le ProRes les stocke en 4444 avec alpha. Un lecteur qui ne gère pas l’alpha peut afficher un fond noir : dans un logiciel de montage, placer le MOV au-dessus d’un aplat pour vérifier la transparence. La prise en charge du WebM alpha dépend du navigateur ; le lecteur HTML vectoriel constitue l’alternative sans codec.

Le projet source est **un équivalent web déterministe**, et non un fichier After Effects `.aep`. Chaque tracé, timing, amplitude et couleur est modifiable. La variante avec le mot « tincell », optionnelle dans le brief, n’est pas incluse dans cette proposition. Aucun fichier du site en production n’est modifié.

## Modifier le mouvement

Dans `source/spark-engine.js` :

- `FLAMES` : `begin` et `end` règlent les entrées ; `bend` règle l’amplitude ; `phase` règle le décalage de chaque flamme.
- `render()` : rotation de l’étincelle, extension des aiguilles, axe et durée de la lame, apaisement des flammes.
- `size` dans le constructeur : taille du symbole relative au petit côté de l’image.
- `resize(width, height)` : résolution et cadrage.

`source/brand-data.js` contient les six tracés exacts extraits du SVG fourni. Le fichier maître d’origine est conservé dans `source/brand/01-vectoriel/`. Les polices Ubuntu servent uniquement à l’interface de prévisualisation ; aucun texte n’est ajouté aux vidéos.

## Intégration web minimale

```html
<div id="spark"></div>
<script src="source/brand-data.js"></script>
<script src="source/spark-engine.js"></script>
<script>
const motion = new SparkAnimation(document.querySelector('#spark'), {
  width: 1080, height: 1080, background: 'transparent'
});
motion.svg.style.cssText = 'width:100%;height:auto;display:block';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  motion.render(4.2, 'apparition');
} else {
  const origin = performance.now();
  function frame(now) {
    const t = (now - origin) / 1000;
    if (t < 4.2) motion.render(t, 'apparition');
    else motion.render((t - 4.2) % 3, 'boucle');
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
</script>
```

Pour un petit logo de navigation, diminuer `bend` de moitié. Pour un usage de production, suspendre la boucle lorsque le symbole sort du viewport. La transition apparition → boucle conserve la silhouette ; le mouvement des flammes reprend après la tenue.

## Reproduire les exports

Node.js et Puppeteer sont nécessaires au rendu. Python 3 et FFmpeg avec `libx264`, `libvpx-vp9` et `prores_ks` sont nécessaires à l’encodage. Les versions utilisées sont consignées dans le rapport de contrôle.

```sh
npm install puppeteer
node source/render.mjs
FFMPEG=/chemin/vers/ffmpeg python3 source/encode.py
```

Les images intermédiaires sont créées dans `frames/` (exclu de l’archive de livraison). Les calculs sont déterministes, à 60 images/seconde, sans capture d’une lecture en temps réel. La taille des images est de 1080 × 1080 ; les cadrages paysage et portrait ajoutent de l’espace autour, sans agrandissement ni rééchantillonnage du signe.
