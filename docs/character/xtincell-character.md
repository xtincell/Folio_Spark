# Xtincell — personnage de la hero

## Demande et direction

Remplacer le portrait de l’accueil par une illustration 2D cartoon à proportions exagérées, couleurs plates et fond transparent, puis découper les pièces, construire un rig et l’animer dans la hero. La photographie publique `public/portrait-p2.jpg` fournit les traits de référence : lunettes rondes et chaîne, locks, barbe, septum, hoodie sans manches et tatouage du bras.

Le personnage reste calme et curieux. La grande tête, les mains et les chaussures amplifiées rendent la silhouette cartoon. Le noir, la peau chaude, le crème et l’orange répondent à la page existante.

## Productions et décisions

- **Premier dessin → réviser.** La ressemblance et les neuf pièces sont présentes ; les détails de peau, de barbe et de chaussures restent trop réalistes.
- **Dessin simplifié → poursuivre.** Cheveux et barbe deviennent des silhouettes, le visage est caricaturé et les ombres sont simplifiées. Production avec l’outil image intégré, fond réellement transparent.
- **Premier montage → réviser.** Les disques de préparation apparaissent aux épaules, coudes, taille et genoux. Le nettoyage des calques, les recouvrements et le placement des pivots sont corrigés.
- **Geste au clic → réviser puis poursuivre.** La main disparaissait derrière le buste. L’avant-bras est placé devant le personnage en conservant le même mouvement d’épaule que le bras arrière. La pose arrêtée permet d’inspecter le raccord.
- **Mobile → réviser puis poursuivre.** Le personnage entier était trop petit dans l’ancienne colonne de photo. La hero le cadre maintenant en buste, avec la légende dessous ; le corps entier reste présent sur ordinateur et dans l’atelier.

## Sources et montage

- `src/components/studio/character/XtincellCharacter.tsx` : hiérarchie des articulations et commandes React.
- `src/components/studio/character/character.module.css` : respiration, tête, épaules, coudes et paupières ; geste de 2,4 s au clic.
- `public/character/xtincell/` : neuf pièces WebP détourées, planche, dimensions, pose PNG transparente et SVG autonome contenant les calques et le mouvement.
- `public/character/xtincell/atelier.html` : animation, pause, poses arrêtées, décomposition en neuf pièces et téléchargements.
- `scripts/prepare-xtincell-character.py` : extraction et nettoyage des neuf composants isolés du master RGBA généré. Pillow, NumPy et SciPy servent à la préparation uniquement.
- `scripts/export-xtincell-rig.mjs` : export du même SVG et des mêmes animations que la hero, avec les images embarquées. Aucune bibliothèque ajoutée au site.

Le SVG est un montage de calques peints, pas une conversion du dessin en tracés vectoriels natifs. Le rig est un rig web SVG/CSS ; aucun projet After Effects n’est annoncé.

Repère de scène : 700 × 1130. Racine (350,450). Positions exprimées relativement à cette racine :

| Pièce | Point d’attache | Échelle | Pivot local du calque |
| --- | --- | --- | --- |
| Tête | (0,18) | 1,08 | (185,406) |
| Buste | (0,0) | 0,72 | (203,24) |
| Bassin | (-11,246) | 0,60 | (159,25) |
| Bras droit | (-126,104) | 0,58 | (153,30) |
| Avant-bras droit | (-46,183) depuis l’épaule | 0,58 | (63,24) |
| Bras gauche | (112,103) | 0,58 | (33,26) |
| Avant-bras gauche | (45,181) depuis l’épaule | 0,58 | (120,26) |
| Jambe droite | (-69,373) | 0,60 | (198,29) |
| Jambe gauche | (47,374) | 0,60 | (95,27) |

Les libellés droit/gauche désignent le personnage. L’avant-bras droit reprend le transform de son épaule sur un calque de premier plan ; il ne constitue pas une dixième pièce.

## Comportement et limites

Le personnage réagit au clic, au toucher ou à l’activation clavier. Une commande indépendante met le mouvement en pause. Les animations s’arrêtent hors écran et lorsque l’onglet est masqué. La préférence système de réduction du mouvement donne une pose fixe. Aucun son, lecture vidéo ou appel de génération n’est effectué à l’exécution.

Le domaine public reste dépendant du déploiement Coolify déjà identifié ; la fusion GitHub ne prouve pas sa mise à jour. L’atelier est un outil de consultation des sources, distinct de la navigation du folio.

## Prompts d’illustration

1. **Master de découpe.** À partir du portrait, créer un personnage 2D cartoon contemporain reconnaissable, tête et mains amplifiées, lunettes rondes argentées avec chaîne, locks tirées en arrière, barbe arrondie, septum, hoodie sans manches noir et petit signe orange, pantalon noir et chaussures crème. Neuf pièces séparées sur une grille invisible 3 × 3 : tête / buste / bassin ; bras droit / avant-bras et main droite / jambe droite ; bras gauche / avant-bras et main gauche / jambe gauche. Pièces non superposées, même échelle d’assemblage, extrémités recouvrables, couleurs plates, aucun texte, véritable alpha transparent.
2. **Révision graphique.** Conserver exactement les neuf pièces et leurs positions. Pousser le dessin vers un cartoon éditorial 2D en aplats, conçu pour une animation Illustrator/After Effects : grandes lunettes, nez et joues simplifiés, barbe en silhouette, six à huit formes larges pour les locks, vêtements et chaussures simplifiés, ombres franches, aucun détail photographique ni rendu 3D, pas de disques mécaniques gris aux articulations, fond transparent.

## Vérifications de livraison

- Compilation de production Next.js réussie, vérification des types réussie, 67 pages générées ; `git diff --check` sans erreur.
- Hero inspectée sur ordinateur ; pause et reprise exercées dans la page. Le geste au clic, sa pose arrêtée et le clignement sont inspectés dans l’atelier.
- Hero inspectée dans des cadres de 390 et 320 px. Le cadrage en buste est contrôlé après clic sur pause. Un défilement interne déclenché par la prise de focus a été corrigé avec un bouton limité au cadre visible et `overflow: clip` ; après correction, le haut du bouton correspond au haut du cadre et `scrollTop` reste à zéro.
- Les neuf calques chargés par la hero totalisent 192 432 octets. La pose PNG est RGBA, 700 × 1130, avec alpha réel ; le SVG exporté est un XML valide avec ses neuf images embarquées.
- La règle de réduction du mouvement est vérifiée dans les sources ; aucune émulation de préférence système ni session de test utilisateur n’est revendiquée.
