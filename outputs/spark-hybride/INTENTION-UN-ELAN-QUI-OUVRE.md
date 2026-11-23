# Spark — Un élan qui ouvre

Direction d’animation fondée sur la philosophie d’Alexandre « Xtincell » Djengue, telle que reproduite dans le brief du 30 septembre 2026.

**Version précédente, remplacée par [L’élan prend position](DIRECTION-WISH-FIGHT-02.md).** Intention et première étude hybride de six poses. L’apparition complète et la boucle finale ne sont pas encore produites. V1 et V2 restent écartées.

## Le centre du propos

La phrase décisive du texte d’Alexandre est : « une aide éphémère, passionnée, une étincelle filante qui donne le meilleur pour ce qu’elle croit juste ».

Les symboles décrivent une même attitude : vivre intensément, rester libre, choisir une direction et mettre cette énergie au service de quelque chose. Sa mission — donner aux créatifs les outils pour vivre de leur art en étant eux-mêmes — donne à l’épée son sens particulier : un outil qui rend capable.

**Mon interprétation pour le mouvement : une énergie brève qui ouvre une possibilité.**

Cette interprétation doit être ressentie dans un geste commun. L’étincelle, l’épée, le X et les flammes gardent une présence simultanée. Aucun pictogramme ne vient illustrer successivement une définition.

## Ce que chaque sens change dans le mouvement

| Sens du signe | Conséquence de direction artistique |
|---|---|
| Étincelle : vie brève, intensité, passion | Un moment de plus forte ouverture, court et lisible, puis un apaisement. Le pic vient du dessin et du rythme ; les halos ne portent pas l’effet. |
| Étoile filante : espoir, désir, liberté | Un élan oblique vers l’ouverture du signe. Les pointes du feu prolongent le mouvement, sans transformer le symbole en objet traversant un décor. |
| Épée : outil pour aider et se dépasser | Une silhouette pleine, stable et lisible très tôt. Elle donne une direction au geste. Éviter le coup violent, l’impact et la lame qui devient un élastique. |
| X : inconnu, vous, moi, variable | Un centre partagé et des directions ouvertes. Le mouvement laisse une lecture plurielle ; aucune lettre supplémentaire ne vient expliquer le X. |
| Lecture du plan de Lorentz | Préserver les rapports d’axes et les espaces concaves du signe. Cette lecture guide la composition ; elle ne devient pas un prétexte à une simulation physique. |
| Liberté et dépassement de soi | Le feu dépasse légèrement sa forme de repos, puis la retrouve sans perdre sa vitalité. Le blanc garde une structure sûre ; les flammes ont une réponse organique. |

## Le geste proposé

Une petite présence apparaît autour du centre. Son orientation est déjà celle d’un élan. L’étoile pivote vers sa position, la lame devient lisible pendant cette ouverture, et les flammes répondent à la même impulsion.

Les trois flammes n’exécutent pas trois mouvements indépendants : elles reçoivent le même élan avec des retards différents. Une flexion se propage de leur base vers leur pointe. La grande flamme garde plus longtemps cette impulsion ; la petite répond plus vite. Elles restent des masses continues, avec de grandes courbes, une épaisseur et une base stables.

Le signe atteint brièvement sa plus grande tension, puis retrouve ses courbes d’origine. Il reste vivant au repos. L’identité ne disparaît pas dans un effet.

Le traitement s’appuie sur le sens de l’anticipation, des poses fortes et du prolongement du geste propre à l’animation 2D. Les dessins doivent fonctionner isolément, puis ensemble. Les valeurs de timing ci-dessous sont un point de départ pour l’animatique.

## Partition proposée — 3,2 secondes

| Temps | État commun | Comportement des éléments |
|---|---|---|
| 0,00–0,25 s | Présence contenue | Quelques formes lisibles près du centre ; petites flammes dessinées spécifiquement pour cette pose, sans écrasement numérique du maître. |
| 0,18–0,80 s | Ouverture | L’étincelle effectue une rotation courte, d’environ 55–70°. La lame se révèle pleine dans le même intervalle. Les aiguilles terminent l’ouverture avec un léger retard. |
| 0,35–1,05 s | Propagation | La vague remonte dans les flammes. F3 réagit le plus vite, F2 prend le relais dans le même geste, F1 prolonge davantage. Leurs actions se chevauchent. |
| 0,80–1,25 s | Liberté maximale | Pointes légèrement prolongées et corps fléchis, en conservant une masse principale et des attaches fixes. Aucun éclat détaché. |
| 1,05–2,15 s | Apaisement | Le corps des flammes revient avant leurs pointes. La structure blanche a déjà retrouvé sa position. |
| 2,15–3,20 s | Présence | Retour au logo exact et tenue suffisante pour le lire. La boucle de repos sera un cycle distinct, plus discret. |

Il ne s’agit pas d’une suite « étoile, puis épée, puis flammes ». Ces intervalles décrivent des actions qui se recouvrent.

## Le travail hybride réellement réalisé

Deux appels à l’outil intégré `image_gen.imagegen` ont produit une planche de six dessins de flammes, puis sa correction en aplats. Le premier résultat comportait des halos ; il est conservé comme essai écarté. Les prompts sont enregistrés dans `generation/PROMPTS.md`.

La planche corrigée a été découpée en six cels. Les trois formes orange ont été isolées, remises dans la couleur de marque et recalées sur leurs bases. Le blanc généré a été retiré et remplacé par les tracés blancs exacts du SVG fourni. Le compositing conserve l’ordre : F2/F3, structure blanche, F1.

**Le test animé montre seulement une vague dans les flammes.** Il permet de juger les dessins et leur relation avec le maître. Il ne montre pas encore la rotation, l’apparition ou le timing complet décrit ci-dessus. Il comporte six dessins tenus, dans une vidéo de 24 images/seconde, répétée trois fois pour l’examen. Ce n’est pas une boucle finale déclarée sans raccord.

## Ce que la génération doit prendre en charge ensuite

1. Dessiner trois poses mères de l’apparition : présence contenue, ouverture, retour.
2. Pour chaque passage, fournir au générateur les deux poses encadrantes et demander uniquement les dessins intermédiaires utiles.
3. Conserver les meilleures silhouettes, corriger les écarts d’attache et de masse, et retirer les formes parasites.
4. Assembler les dessins avec le blanc original, vérifier la continuité à vitesse normale puis au ralenti.
5. Remplacer la pose d’arrivée par le maître exact. Concevoir séparément le cycle de repos et son raccord.

La génération sert à dessiner le mouvement organique ; le compositing garde le contrôle de l’identité. Une augmentation automatique de la cadence n’est pas un critère de réussite.

## Critères de réussite

- Une intention commune perceptible, malgré les décalages entre les éléments.
- Une silhouette lisible à chaque pose importante.
- Un feu vivant qui conserve un corps, une base et des pointes reliées.
- Aucun contour cassé, fragment fractal, scintillement de matière ou variation du dessin blanc.
- L’épée lisible comme partie du signe, sans geste agressif ajouté.
- Le logo original à l’arrivée et une lecture simultanée de ses différents sens.

## Outil d’image et sources

L’outil réellement utilisé est le générateur intégré de la session. Il ne fournit pas de sélecteur ni de métadonnée de variante ; le moteur précis de ces deux résultats ne peut donc pas être certifié.

La documentation officielle consultée le 30 septembre 2026 présente GPT Image 2.5 Sunburst comme son modèle le plus capable pour la génération et l’édition, et le recommande pour les workflows où la précision de l’édition compte particulièrement. Flare est présenté comme l’option rapide de haute qualité. Ces informations vérifient l’existence de la famille 2.5 ; elles ne prouvent pas le routage du générateur intégré.

- [GPT Image 2.5 Sunburst — OpenAI](https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst)
- [Image generation tool — OpenAI](https://developers.openai.com/api/docs/guides/tools-image-generation)
- Philosophie, géométrie et contraintes : brief fourni par Alexandre, section 3 à 7 ; maître `spark-symbole.svg` du dossier joint.
