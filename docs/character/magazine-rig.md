# Hero magazine — Alexandre Djengue

Le hero conserve un personnage SVG articulé pendant les changements de slide. La tête, le torse, les bras, avant-bras et mains viennent de la même planche transparente ; trois expressions assurent la continuité du visage. Les locs et le chignon font partie de chaque tête.

## Animation

Les articulations sont imbriquées épaule → coude → poignet. `poses.ts` définit les angles et les cadrages desktop/mobile. Les rotations empruntent le trajet le plus court et les ressorts amortis décalent légèrement tête et membres. Le personnage ne se démonte pas entre les vues. L'appareil photo est un accessoire avec ses mains dédiées ; les autres mains disparaissent dans cette pose. La quatrième vue place une main au premier plan du panneau et masque le bras opposé.

Navigation : boutons, flèches lorsque la zone a le focus, et balayage horizontal. Le bouton pause suspend les mouvements ; la préférence système de réduction des animations est respectée. Hors écran et dans un onglet masqué, les mouvements s'arrêtent. Quitter le hero vers le bas déclenche l'animation du logo. Le pseudo est révélé au survol ou au focus du logo ; le nom complet reste présent dans chaque vue.

## Sources

- `public/character/magazine-rig/master.webp` : planche source.
- `parts.json` : rectangles de découpe de la source originale 1536 × 1024.
- `rig.json` : squelette et poses exportables.
- Les quatre SVG sont à conserver avec leurs WebP voisins.
- `scripts/prepare-magazine-rig.py` : extraction reproductible depuis la planche PNG.
- `scripts/export-magazine-rig.mjs` : export des poses et paramètres.

Les illustrations sont des images découpées dans une hiérarchie SVG ; elles ne sont pas vectorisées. Il ne s'agit pas d'un fichier After Effects. Les pièces et les pivots sont disponibles pour une reprise ultérieure.

Les visuels de projets proviennent du portfolio existant : photographie de Lydol, campagne Bonnet Rouge avec MATANGA et schéma conceptuel de La Barre.

## Vérifications

TypeScript et build Next.js : 67 routes produites. Inspection des quatre poses au navigateur en desktop, mobile 390 px et tablette 768 px. Navigation clavier, pause et révélation du pseudo au focus vérifiées. Le déclencheur de sortie du hero est implémenté via IntersectionObserver.
