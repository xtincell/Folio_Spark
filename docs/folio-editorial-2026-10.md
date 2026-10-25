# Xtincell — note éditoriale

Mise à jour du 25 octobre 2026.

## Intention

Transformer une collection de projets en un parcours lisible : ce qui a formé le regard d’Alexandre Djengue, ce qu’il dirige aujourd’hui et ce qu’il construit. Les images portent le récit ; les textes expliquent les liens entre les pratiques.

L’entrée retenue est **« L’image. Et tout ce qui la fait tenir. »** Le portrait, le nom Xtincell et les créations viennent avant les titres de métier. L’introduction précise le travail : concevoir des images, diriger leur fabrication et construire des outils.

## Parcours de l’accueil

| Chapitre | Matière | Ce qu’il établit |
| --- | --- | --- |
| Le regard | Photographie de scène, Kamer Otaku Festival | La pratique photographique et le passage à la direction artistique du KOF. |
| La direction | Campagnes Peak et Bonnet Rouge ; parcours Motion19 | Le travail de direction chez MATANGA, les déclinaisons de campagne et les responsabilités de Brand Manager. |
| La fabrique | SPAWT et La Barre | La continuité entre création, conception produit et outils de travail. |
| Le prochain chapitre | « Diriger sans perdre la main. » | Une direction de pratique formulée comme intention, sans la présenter comme un résultat acquis. |
| Le film et les archives | Showreel, index des projets, photographie, publications | D’autres portes d’entrée dans le corpus, avec accès aux contextes et aux crédits. |

Cet ordre est thématique. Il ne remplace pas les dates du CV et ne suggère pas que les pratiques précédentes ont été abandonnées.

## Règles de contenu

- Chaque pièce précise ce qu’Alexandre a fait et avec qui. MATANGA, UPgraders et les autres collaborateurs restent crédités selon les données du projet.
- Distinguer la mission de Brand Manager chez Motion19 des créations retail de 2025 présentées dans son étude de cas.
- Distinguer l’histoire des premières éditions du KOF des créations « Miss & Master » présentées dans la sélection de 2025.
- Les images de SPAWT documentent une étape de son univers de marque ; elles ne sont pas présentées comme des captures du produit final.
- Le schéma de La Barre est identifié comme une illustration conceptuelle. Le cas précise le périmètre produit, UX/UI et développement assisté par IA.
- Une mise en situation générée montre une création dans un contexte. Elle ne prouve pas sa diffusion, son installation physique ni ses résultats commerciaux.
- Un résultat désigne un livrable ou un effet documenté. Aucun gain de productivité ou de conversion n’est déduit d’une image.
- Écrire à la première personne, avec des verbes concrets. Éviter les titres accumulés, les comparaisons de supériorité et les promesses de succès.
- Maintenir le même sens en français et en anglais, y compris dans les légendes, les rôles et les états des projets.

## Sources du site et entretien

Les textes de l’accueil sont dans `src/components/studio/StudioHome.tsx`. Le CV et ses traductions se trouvent dans `src/app/cv/CvClient.tsx` et `src/lib/i18n.tsx`. Les cas sont produits depuis `scripts/cases.spec.json` ; les crédits d’agence sont associés dans `src/components/folio/agencyCredit.ts`.

Lors d’un ajout, choisir sa place selon ce qu’il apporte au récit. Le corpus complet reste dans `/work` et `/galerie` : un nouveau projet n’a pas à rejoindre automatiquement la sélection d’accueil. Les intitulés, descriptions de page et données structurées doivent suivre la même présentation du métier.
