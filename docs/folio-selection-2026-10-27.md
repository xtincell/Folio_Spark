# Sélection, études de cas et accès aux outils

## Périmètre

Évolution ciblée de la production `7a4de23`, avant les commits du personnage animé. Un visiteur doit pouvoir choisir une entrée dans la pratique d’Alexandre, examiner un choix dans des images puis accéder aux collaborations. Conserver le portrait, les couleurs, les polices locales, les crédits, les sources, les 39 projets et le formulaire de contact.

## Mouvements et références examinées

| Problème observé | Mouvement | Référence visuelle | Limite |
| --- | --- | --- | --- |
| L’index présente 39 dossiers au même niveau | Une sélection de cinq projets, puis un accès explicite à l’index filtrable | MOUTHWASH Studio, « Selected Work » et « View all » ; Fiasco, « Selected works » et légendes par projet | Le choix des cinq projets et les phrases de lecture relèvent de notre jugement éditorial |
| Les fiches répètent surtout le périmètre et les livrables | Quatre passages « Un choix, dans les images », avec enjeu, parti pris et images commentées | ClickUp, structure Challenge / Solution / Outcome ; Framer, description d’un cas accompagnée du produit | Références hors portfolio personnel : structure seulement. Les textes décrivent les visuels fournis, sans chiffres de performance |
| Le nom occupe une large bande avant le portrait et les œuvres | Signature XTINCELL réduite, contenus de couverture remontés | Unseen Studio : marque compacte et introduction accompagnée de la scène visuelle | Le dimensionnement exact est un choix local, le paysage 3D n’est pas repris |
| Les outils sont accessibles seulement par le menu secondaire | Lien Outils dans la navigation principale et troisième entrée du menu mobile | Unseen Studio : catégories accessibles dans la navigation principale | Le libellé et la destination viennent du portfolio ; changement partagé explicitement demandé |

Références Mobbin vues :
- https://mobbin.com/sites/sections/e2bc218a-3568-43c0-a95e-b95b0d829e6c
- https://mobbin.com/sites/sections/4ed7c118-a866-41fa-824c-32a24323c927
- https://mobbin.com/sites/sections/a83266aa-57d8-4877-9a0a-c830a6488d9b
- https://mobbin.com/sites/sections/a6f4802c-d454-47b2-a4b8-840ced5045b6
- https://mobbin.com/sites/sections/1bdc4e01-2f7e-4e09-9aa1-27f02c13bcbe

## Sources des commentaires

La couche éditoriale est isolée dans `project-editorial.ts` pour ne pas modifier le catalogue généré. Peak/Bonnet Rouge : visuels 02 et 03, scène familiale et sport, logo, pack et vague. KOF : planche des pass 05. Motion19 : publication Black Friday 03, appareils/références/prix. SPAWT : planche social 03, chat et couleurs ; cette étape est distinguée de l’application actuelle. La Barre conserve son dossier déjà détaillé et ses liens produit/code.

Les images commentées sont déplacées depuis la galerie vers le passage correspondant et conservent leur agrandissement. Les autres images, les crédits et les résultats existants restent accessibles. Aucun résultat commercial ni processus client non documenté n’est ajouté.

## Arbitrages

- Index → sélection et archive exercées → cinq entrées lisibles, accès aux 39 dossiers et recherche conservés → poursuivre.
- Fiches → commentaires placés avec leurs preuves → deux scènes Bonnet Rouge comparables, un billet KOF, une grille retail et un système de contenus → poursuivre ; ne pas étendre aux dossiers sans matière suffisante.
- Navigation → essai large et cadre de 320 px → Outils était encore septième dans le menu mobile → réviser : troisième entrée, puis lien exercé.
- Couverture → comparaison de la même scène → davantage de portrait et trois extraits visibles dans le premier écran large → poursuivre.

## Vérification

Compilation de production réussie : 67 pages, contrôle TypeScript. Inspection navigateur locale sur écran ample et cadres de 390 et 320 px (largeur de mise en page, pas un appareil tactile). Sélection/index, recherche SPAWT, recherche sans résultat et retour, traduction anglaise, menu mobile, ouverture d’une preuve dans la visionneuse. Aucune étude avec participants ni mesure de conversion.

Le serveur de développement utilise un répertoire de compilation distinct de la production. Le lanceur traduit les paramètres du service d’aperçu vers Next.js ; aucune dépendance n’est ajoutée. Le personnage animé n’appartient pas à cette branche de production.
