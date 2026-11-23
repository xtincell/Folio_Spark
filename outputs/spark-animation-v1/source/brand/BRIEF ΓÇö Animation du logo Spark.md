# BRIEF — Animation du logo Spark (Xtincell)

**Client** : Alexandre « Xtincell » Djengue — directeur artistique
**Objet** : animation du symbole Spark, muette
**Date** : 30 septembre 2026

---

## 1. En une phrase

Animer le symbole Spark de façon à ce que **l'animation soit elle-même un symbole** : chaque élément du logo travaillé individuellement, avec son propre timing, fidèle au sens du signe et à la direction artistique d'Alexandre.

## 2. À quoi elle servira

- Ouverture et fermeture de son showreel et de ses vidéos
- En-tête de son site (folio.powerupgraders.com) et écran de chargement
- Réseaux sociaux (formats carré et vertical)

## 3. Le logo : ce qu'il raconte

Le Spark est un signe **plurisémiotique** : il est **à la fois** une étoile-étincelle, une épée, la lettre X et un plan de Lorentz. Aucune lecture ne prime, et toutes coexistent en même temps. C'est un symbole de **liberté** et de **dépassement de soi**.

Dans les mots d'Alexandre (juillet 2023) :

> « Le branding est quelque chose de complexe. Ça ne consiste pas à se choisir un joli logo qui va plaire aux yeux, mais c'est surtout définir ce qu'on souhaite raconter, et pourquoi. […]
> Xtincell, c'est une histoire d'étincelle, d'épée, d'étoile filante et de la lettre X.
> **L'étincelle** représente la vie. Son côté éphémère. Et combien nous sommes petits à l'échelle de l'Univers. Mais on brille fort ! (crédit : l'anime *Gurren Lagann*). D'un point de vue métaphorique, c'est également l'origine du feu intérieur, l'essence de notre propre existence et la passion brûlante qui nous anime et nous permet de surmonter l'adversité.
> **L'étoile filante** symbolise l'espoir. Les souhaits que l'on ne formule pas. Les rêves que l'on conçoit et les objectifs que l'on souhaite atteindre ou exaucer. C'est aussi un symbole des choses éphémères et de la liberté (références : *Cloud Atlas*, 2012 / *Kimi no na wa*, 2016).
> **L'épée** est un outil, parce que je me perçois comme tel : je souhaite aider, et servir. Même si je choisis mes combats et que je n'aide que ceux que je juge dignes, le bon outil permet de se dépasser, et de traverser la terre, le ciel et le paradis.
> Et **le X**, c'est l'inconnu, c'est vous, c'est moi. C'est le X dans Alexandre, c'est aussi la variable. C'est tout et c'est rien en même temps car, comme le dit la citation : "Ce sont les humains qui donnent un sens aux symboles" (*V pour Vendetta*, 2005).
> Xtincell est donc une aide éphémère, passionnée, une étincelle filante qui donne le meilleur pour ce qu'elle croit juste. Une personne avec de fortes influences pop culturelles. Un esprit libre. »

**Vision** : une société où les créatifs africains qui galèrent puissent vivre de leur art en étant eux-mêmes.
**Mission** : leur donner les outils nécessaires pour s'en sortir.
**Univers** : pop culture japonaise, storytelling, photographie de concerts.

## 4. Anatomie du fichier

Le symbole (`01-vectoriel/spark-symbole.svg`, viewBox 1658,76 × 2063,98) contient **6 tracés**, dans cet ordre de calques, du fond vers l'avant (voir `04-references/decomposition-des-6-traces.png`) :

| # | Tracé | Couleur | Remarque |
|---|---|---|---|
| 1 | Flamme moyenne (F2), en haut à droite | `#F05A28` | derrière le blanc |
| 2 | Petite flamme (F3), en bas à droite | `#F05A28` | derrière le blanc |
| 3 | **Lame / épée** | blanc | forme plus large, **masquée** par un rectangle incliné à −18,14° (clipPath) : seule la lame est visible |
| 4 | Étincelle pleine | blanc | étoile à 4 branches aux côtés creusés |
| 5 | Aiguilles | blanc, contour de 20 u | même tracé que l'étincelle, en trait : il rend visibles les longs rayons fins |
| 6 | **Grande flamme (F1)**, à gauche | `#F05A28` | **au-dessus** de la garde : l'aiguille passe derrière elle. Étagement voulu, à respecter. |

**Géométrie mesurée**, utile pour construire les mouvements :

- Les deux axes de l'étincelle sont **perpendiculaires (90,0°)** et de **même longueur (1 584 u)**. Ils se croisent en leur milieu, au point **(722,28 ; 1 341,70)**, et l'ensemble est incliné de **25,93°**.
- Chaque côté de l'étoile est une courbe dont les deux points de contrôle sont au centre, donc une hyperbole ayant les axes pour asymptotes. C'est ce qui en fait un **plan de Lorentz** : le X est le cône de lumière, les quatre côtés sont les hyperboles.
- Axe de la lame : du centre vers la pointe (1 183,8 ; 212,1), à −67,78°, longueur 1 220 u.
- Autour du centre, dans le sens antihoraire, les éléments grandissent : petite flamme (−35°) → flamme moyenne (+34°) → lame (+68°) → grande flamme (+141°).

Le logo horizontal (`spark-logo-horizontal.svg`) ajoute le mot « tincell », dont le point du *i* est une petite étoile à quatre branches, et une quatrième flamme sous le mot.

## 5. Direction artistique

- **Couleurs** : orange flamme `#F05A28`, blanc, fond nuit du site (`#0A0E1A`, ou le « Cosmos Blue » de la planche de marque, `03-charte/`)
- **Typographies de la marque** : Ubuntu et Gwen (planche de marque)
- **Rendu** : vectoriel, net, sobre. Pas de texture ni de bord déchiqueté.
- **Existant à respecter** : sur le site, les flammes vacillent déjà en continu. Voici le code actuel, qui donne le rythme de référence :

```css
@keyframes folioFlameFlicker {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25%      { transform: scale(1.04) rotate(-1deg); }
  60%      { transform: scale(0.98) rotate(0.5deg); }
}
/* 3 s, ease-in-out, infini ; transform-origin au centre de chaque flamme */
```

- **Univers visuel du site** : cosmos, particules, « de la poussière à l'étoile ».

## 6. Ce qu'Alexandre attend explicitement

1. **Chaque élément travaillé individuellement, avec son timing** : pas d'effet global appliqué au bloc.
2. **Un vrai effet de flamme sur les flammèches** : un feu qui vit, pas une simple mise à l'échelle.
3. **Une apparition rotationnelle de l'étoile.**
4. **La forme de la lame mise en valeur** : sa silhouette doit être lue.
5. **Une animation qui soit un symbole**, alignée avec sa vision et sa DA. Pas une scène ni un récit illustratif.
6. **Muette.**

## 7. Ce qui a déjà été essayé et écarté

Pour ne pas refaire les mêmes chemins :

- Une mise en scène avec décor (ciel nocturne, poussière d'étoiles), du son et un récit : écartée. Ce n'est pas un symbole, et l'animation doit être muette.
- Une transformation mathématique unique appliquée à tout le logo (la « transformation de Lorentz » : un trait de lumière qui se déploie en logo) : écartée. Les éléments n'avaient pas de vie propre.
- Une chorégraphie en séquence (étoile filante → étincelle qui tourne → X qui s'ouvre → contour de la lame → flammes allumées une à une → tenue) : écartée.

## 8. Livrables

| Livrable | Détail |
|---|---|
| Apparition | durée libre, 3 à 6 s recommandées ; se termine sur le logo **exact** |
| Boucle | le logo « vivant » au repos, raccord parfait, pour le site |
| Formats | 16:9 (1920 × 1080), 1:1 (1080 × 1080), 9:16 (1080 × 1920) |
| Fonds | fond nuit **et** fond transparent (ProRes 4444 `.mov`, WebM alpha pour le web) |
| Option | version avec le logo horizontal (« tincell ») |
| Sources | projet After Effects, ou équivalent, livré |

## 9. Méthode de validation

Alexandre valide **l'intention avant la production** :

1. Une note d'intention : ce que fait chaque élément, et **pourquoi**, en lien avec le sens du logo
2. Une feuille de timing élément par élément et quelques poses clés
3. Après validation : l'animatique, puis l'animation finale

## 10. Contenu du dossier

```
01-vectoriel/   spark-symbole.svg · spark-logo-horizontal.svg   ← fichiers maîtres
02-png/         exports PNG couleur et blancs, symbole et logo complet
03-charte/      planche de marque (JPG + PSD source) : couleurs, typographies
04-references/  décomposition des 6 tracés · symbole et logo horizontal
```
