# Prestations illustrées, 27 octobre 2026

Demande : « chaque tuile de paiment devrait etre illustré afin que le client sache ce qu'il achete. le descriptif de l'item doit etre plus precis egalement. »

Un client doit pouvoir identifier le résultat d'une prestation, lire ses livrables, puis demander un devis. Périmètre : les six tuiles de `/tarifs`, leurs données et leurs illustrations. Conserver les montants, les unités, les deux devises, la version anglaise, les exemples et crédits existants, les interventions et le formulaire de brouillon. Le site reste un portfolio de prestations sur devis. Aucun paiement n'est ajouté.

Position : montrer la nature du travail puis décrire une remise concrète. Chaque tuile présente un aperçu légendé, une situation client, le prix, trois livrables et les paramètres à confirmer au devis. Coût assumé : davantage de hauteur par tuile. Les prix et actions gardent le même ordre. Échec : illustration sans rapport, cadrage qui coupe le sujet, crédit perdu, prix modifié, promesse arbitraire de quantité/délai ou débordement à petite largeur.

## Références examinées et décisions

Les deux recherches Mobbin portent sur des sections de services d'agences. Les images ont été examinées, pas seulement leurs métadonnées. Direction retenue : prestation accompagnée d'un exemple et d'un détail de ses composantes. Les listes générales sans exemple de Mother Design et la photographie d'ambiance de basement.studio sont écartées pour ce besoin.

| Problème | Décision | Appuis et limite |
| --- | --- | --- |
| Aucune tuile ne montre le résultat du service | Un aperçu distinct et légendé dans chacune des six tuiles | [Fiasco](https://mobbin.com/sites/sections/6fbcef4f-e8df-4aa5-a71a-abe9504f619e), [Koto](https://mobbin.com/sites/sections/968754c4-c525-4315-a823-07721be58b1b) associent prestation et image. Les six contenus et les deux schémas sont propres au folio. |
| Intitulés et résumés trop généraux pour savoir ce qui sera remis | Situation client puis liste de livrables et périmètre à confirmer | [Koto](https://mobbin.com/sites/sections/968754c4-c525-4315-a823-07721be58b1b), [Büro](https://mobbin.com/sites/sections/bc636344-6e5b-4b98-9baa-809b622456fb) distinguent une discipline et ses composantes. L'ordre prix/livrables/limites conserve le catalogue et relève du choix éditorial du folio. |

## Médias et contenu

- Conseil : schéma vectoriel bilingue, atelier → synthèse → feuille de route.
- Identité : logo Cosmos Boba existant, affiché entier ; lien vers sa fiche.
- Direction artistique : création Bonnet Rouge existante, affichée entière ; crédit MATANGA Agency et lien vers la fiche conservés.
- Photographie : photographie existante de Lydol sur scène ; lien vers les collections Portrait · Musique.
- Web : illustration vectorielle bilingue d'une page sur ordinateur et téléphone, explicitement légendée comme illustration.
- Motion : showreel Xtincell existant avec commandes natives, sans lecture automatique et sans téléchargement vidéo avant interaction.

Les nouveaux schémas sont des éléments SVG de code, pas des captures de réalisations. Les images ne présentent pas une campagne entière comme le contenu du tarif de départ. Les descriptions précisent les fichiers remis, le travail compris et les facteurs à fixer au devis. Aucun nombre de pistes, retours, pages, photos, secondes ou délai n'est inventé.

## Inspections et verdicts

Premier rendu ample : les marges différentes des colonnes produisaient trois tailles d'images et désalignaient les prix → **réviser**. Marges uniformisées et hauteur minimale des descriptions sur grille ; nouvelle inspection : prix et visuels alignés → **poursuivre**.

Illustration web : le bloc orange de l'ordinateur recouvrait le téléphone → **réviser**. Ordre des couches corrigé ; nouvelle capture avec le téléphone devant l'ordinateur et ses éléments visibles → **poursuivre**.

Rendus FR et EN examinés. À 390 et 320 px, les six tuiles, leurs 18 livrables, légendes et médias restent dans le cadre ; aucune image chargée cassée. Il s'agit de largeurs CSS réelles en iframes, pas d'un essai tactile sur appareil. Lecture du showreel déclenchée au clavier, temps de lecture observé puis pause. Bascule EUR : 500, 1 200, 900, 600, 1 000, 800 €, puis retour FCFA. Action Web & outils : service `web` repris dans le formulaire. Aucun envoi réalisé.

La portée fonctionnelle reste le choix d'une prestation et la préparation d'un échange. Aucun effet commercial ou test avec des clients n'est revendiqué.

[Comparaison avant/après](qa/prestations-illustrees-comparison.html) · [Livrables et seconde rangée](qa/prestations-livrables.jpg).


## Validation et publication

`npm run typecheck`, compilation standalone des 67 routes, contrôle du catalogue (221 médias), contrôle du HTML de Tarifs (un H1, six figures, une vidéo, les deux schémas de prestations, aucun identifiant dupliqué ni cible interne manquante) et `git diff --check` : réussis.

Publication Coolify terminée le 27 octobre 2026 à 16 h 33 (Douala). Commit applicatif `19ef93693e34447753d15768459de4069c1b8246`, déploiement `z3zcdg9l9tsatucfdwsqwspg` : nouveau conteneur sain et bascule terminée. La page publique et son état de santé répondent en HTTP 200. Inspection de la page publique : six prestations, six figures, 18 livrables, aucune image chargée cassée. [Capture de la page publiée](qa/prestations-live.jpg).
