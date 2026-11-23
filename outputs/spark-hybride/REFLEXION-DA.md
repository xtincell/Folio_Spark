# Spark — réflexion pour une production hybride

**Archive de la réflexion initiale, avant génération.** V1 et V2 écartées. La direction actuelle et les essais produits sont décrits dans [DIRECTION-WISH-FIGHT-02.md](DIRECTION-WISH-FIGHT-02.md).

## Diagnostic

Les deux versions reposaient sur des déformations de points de contrôle et des transformations séparées des morceaux du signe. Une fonction non linéaire appliquée aux poignées de Bézier ne préserve pas automatiquement la qualité du contour : certaines courbes se pincent, se replient ou créent des pointes involontaires. La relation entre étincelle pleine, aiguilles et lame peut aussi faire apparaître des raccords parasites. Un résultat exact en fin d’animation ne valide pas les images qui précèdent.

Le défaut est d’abord un défaut de dessin intermédiaire et de logique de mouvement. Accélérer le mouvement, ajouter un dépassement et changer les amplitudes ne le corrige pas. L’export de nombreux formats est arrivé trop tôt.

## Direction retenue

Du feu dessiné en aplats, contenu dans le signe. Une matière stylisée, continue, avec une base stable, un corps qui se courbe et une pointe qui prolonge le geste. Préserver l’orange, le blanc, la silhouette générale et la netteté. Ne pas substituer des flammes photographiques au langage du logo.

La lame et l’étoile forment une structure qui s’oriente et se révèle. Les flammes répondent au même mouvement, avec des retards différents. Leur unité vient de cette cause commune ; leur personnalité vient de leur réponse. Éviter les éléments qui semblent arriver de directions arbitraires ou flotter indépendamment.

## Répartition des responsabilités

| Partie | Méthode | Raison |
|---|---|---|
| Dessin de référence et dernière image | SVG fourni | Identité exacte, proportions et courbes maîtrisées |
| Lame, étincelle, aiguilles | Animation déterministe de transformations rigides et révélations composées | Préserver leurs raccords et leur structure, éviter l’élasticité accidentelle |
| Poses des trois flammes | Dessins générés sous contraintes, sélectionnés et corrigés | Chercher des silhouettes naturelles et expressives |
| Intervalles entre poses | Génération guidée par les deux poses voisines | Éviter une suite de variantes indépendantes |
| Continuité, alignement, nettoyage, montage | Compositing contrôlé | Conserver les attaches, l’épaisseur, les couleurs et l’ordre des plans |
| Boucle | Cycle conçu comme un ensemble, avec mêmes poses aux frontières | Ne pas essayer de raccorder deux images arbitraires après coup |

La génération n’est pas considérée comme un interpolateu​r géométrique exact. Sa cohérence doit être observée et vérifiée ; elle ne se déduit pas d’un prompt.

## Contrat des flammes

- Une masse principale lisible par flamme ; aucune île ni branche sans intention.
- Même base et même zone d’attache entre les poses.
- Sens d’écoulement commun ; onde qui se propage le long du corps.
- La pointe peut se prolonger, mais le corps doit conserver une épaisseur plausible.
- La grande flamme reste devant la garde ; les deux autres restent derrière le blanc.
- Déformations expressives autorisées seulement si elles donnent une silhouette construite.
- Le blanc n’est pas confié à une nouvelle réinterprétation générative à chaque image.

## Premier essai à produire

Un fragment d’environ une seconde, sur une seule flamme, avec la structure blanche originale comme repère. Cela isole la difficulté réellement non résolue : un feu naturel, continu et fidèle au signe.

1. Trois poses mères : retenue, extension, retour. Chaque pose doit fonctionner isolément en silhouette.
2. Quelques intervalles conditionnés par les deux poses voisines. Les images refusées sont redessinées ou régénérées ; la cadence ne sert pas à les masquer.
3. Compositing sur la structure blanche exacte, bases et cadrage verrouillés.
4. Essai à 12 dessins par seconde dans un conteneur de 24 images/seconde. Ajuster la cadence selon le mouvement obtenu. L’interpolation supplémentaire vient seulement après la validation des dessins.
5. Vérification à vitesse normale, au ralenti et par superposition des images adjacentes.

Critères : silhouette continue ; absence de cassure, de scintillement et de saut d’attache ; progression compréhensible de l’onde ; pas d’épaississement aléatoire ; fidélité de la dernière pose.

Une fois cette preuve convaincante, étendre aux deux autres flammes, puis à l’apparition complète et à la boucle. Les formats et codecs sont la dernière étape.

## Modèle demandé

L’utilisateur propose « GPT Image 2.5 Flare ». Le générateur intégré présent dans cette session accepte un prompt et des références, mais n’expose pas de sélecteur portant ce nom. Ne pas prétendre avoir utilisé cette variante sans confirmation de l’outil. Le choix effectif du moteur doit être consigné avec les images.
