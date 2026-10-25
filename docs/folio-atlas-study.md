# Étude B — Atlas de pratique

Question : peut-on rendre visibles les liens entre les pratiques sans imposer un récit chronologique ?

Production : `docs/prototypes/atlas.html`, consultation non linéaire à trois stations. Le point de vue sélectionné ouvre une pièce dans le cadre principal ; les deux autres restent visibles comme pièces liées. L’identité et les commandes restent à leur place. Les liens mènent aux dossiers existants.

## Hypothèses et choix

- Hypothèse de lecture : un visiteur professionnel veut comprendre comment le regard photographique, la direction artistique et les outils s’alimentent ; la chronologie détaillée peut rester dans le CV.
- Conviction expressive : une table de travail, faite de repères persistants, de pièces en relation et de typographie incisive, convient à la dimension de concepteur.
- Coût : le parcours passé / présent / devenir est moins explicite que dans une route narrative. Le visiteur doit changer de point de vue pour lire les trois notes.
- La couleur, le symbole Xtincell, les polices locales et le portrait sont ceux du portfolio existant. Aucun nouveau média généré.

## Sources et inspection

- `/work/galerie-pixieset/03-lydol-portrait.jpg` : photo live, inspectée à sa résolution native ; l’ancien nom « portrait » ne doit pas masquer qu’il s’agit de scène.
- `/work/cases/friesland-campina/hero.webp` : création originale campagne Peak Ramadan, inspectée ; aucun mockup physique présenté comme réalisé.
- `/portrait.jpg` : vrai portrait noir et blanc, inspecté.
- `/studio/la-barre.svg` : source SVG examinée ; **schéma conceptuel, pas une capture**, indication conservée dans l’image et la légende de sélection.
- Rôles : `src/components/folio/data/cases.ts`, notamment Friesland / La Barre. Aucune métrique ni résultat commercial ajouté.

## Adaptation et comportement produits

- Desktop : rail à gauche, pièce centrale et deux pièces satellites ; relations exprimées par les liens graphiques et une note explicite.
- Mobile : les trois points de vue deviennent une barre de commandes ; la pièce centrale précède les deux pièces liées. Le portrait secondaire est retiré pour garder le contenu de travail prioritaire.
- Boutons natifs, `aria-pressed`, annonce de l’état, liens explicites, focus visible, absence d’animation essentielle.
- Repli sans JavaScript : photographie initiale et liens texte vers les trois dossiers.

Statut : prototype inspecté dans le navigateur sur ordinateur et en cadre mobile de 390 px ; les trois sélecteurs changent la pièce et leur état actif. La route narrative A a été retenue : elle explicite mieux passé, présent et devenir. Cette étude reste dans les sources, hors des pages publiques. Pour la revoir, servir temporairement le fichier à la racine du site afin de retrouver les chemins de médias absolus.
