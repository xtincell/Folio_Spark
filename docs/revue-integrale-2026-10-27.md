# Tarifs et revue du portfolio, 27 octobre 2026

Demande : « je devrais avoir un onglet ou une section tarif non ? et mobbin devrait aider a nettoyer l'intégralité du site pour les endroits qui meritent une retouche (integralement) ».

## Périmètre et engagements

Un client doit pouvoir identifier une prestation, situer son budget et préparer une demande. Un lecteur du folio doit pouvoir examiner les images, comprendre les rôles et retrouver son point de départ. Le travail porte sur les familles de pages existantes, en passes ciblées. Il conserve le portrait, les couleurs, les polices, les dossiers et leurs crédits. La branche contenant le personnage animé est exclue.

Les 13 routes principales sont `/`, `/work`, `/galerie`, `/cv`, `/tech`, `/design`, `/recrutement`, `/tarifs`, `/conditions`, `/upgraders`, `/upgraders/services`, `/upgraders/blog`, `/upgraders/contact`. S'y ajoutent le gabarit des 40 fiches dont 39 publiques, les 6 articles, les anciennes entrées `/landing` et `/landing-cosmos` et l'état 404. Les collections Pixieset restent externes, avec leur statut privé conservé.

Position : garder le folio personnel et son rythme éditorial, rendre les choix commerciaux explicites. Les prix se lisent avec leur unité et leur périmètre. Les ouvertures des pages secondaires laissent davantage de place aux œuvres. Les longs dossiers disposent de repères après leur présentation. Le coût assumé est une page Tarifs plus longue, parcourue par un sommaire.

Critères d'échec : perte de dossier ou crédit, montant inventé, lien vers une action différente de son libellé, texte coupé à petite largeur, formulaire qui prétend avoir envoyé un message, reprise du personnage rejeté.

## Références effectivement examinées

Les recherches Mobbin ont été faites séparément par section. Les résultats trop éloignés (notamment la première recherche de navigation) ont été écartés. Les références d'autres secteurs prêtent leur organisation, pas leur offre ni leur esthétique.

| Passe | Problème observé | Décision appliquée | Références et limite |
| --- | --- | --- | --- |
| Tarifs | `/tarifs` ne présente aucun prix ; le nom « Travailler ensemble » masque sa destination | Six prestations avec prix de départ, unité, livrables et lien de contact ; bascule FCFA/EUR | [Webflow](https://mobbin.com/sites/sections/360dd9aa-1189-4f35-ac4f-f35111cb1ff7), [Melius](https://mobbin.com/sites/sections/0285776d-597f-454c-b1ca-b011cd2d4b42). Structure uniquement, références SaaS |
| Navigation | Tarifs absent des liens principaux ; accès mobile enfoui | Tarifs dans la navigation, raccourci mobile et menu ; contact distinct vers le brief | [Unseen Studio](https://mobbin.com/sites/sections/1bdc4e01-2f7e-4e09-9aa1-27f02c13bcbe). Un exemple de destinations directes et menu complémentaire, pas une preuve d'effet sur l'usage |
| Galerie et index | Grand titre et ouverture repoussent les premières images ; une recherche se perd au retour | Ouverture raccourcie ; filtres conservés dans l'URL ; retour de l'index depuis le bas à ses commandes | [MOUTHWASH Studio](https://mobbin.com/sites/sections/9c2b6408-fce2-44db-9c0b-3def5bddba12), [Vucko](https://mobbin.com/sites/sections/ceab4ab4-d046-4356-bde4-32acd9781fa8). Images et catégories ; persistance de recherche : correction fonctionnelle issue du parcours observé |
| Pages éditoriales | Sommaire avant le titre ; décor de grande taille derrière les textes mobiles ; intitulé de recrutement surdimensionné | Sommaire après la présentation, retrait du décor CV/Outils, sous-titre de poste distinct, coordonnées mieux distribuées | [Pentagram](https://mobbin.com/sites/sections/326ff8e0-1f06-4a08-a915-0e53b4967529), [KOBU](https://mobbin.com/sites/sections/030f064f-689f-46cd-8b1f-64017a2dfa4c). Séparation des titres, de l'information et des actions ; emplacement exact des sommaires : choix propre au folio |
| Blog | Statut WordPress de développement visible ; ouverture repousse les articles ; absence de retour utile d'un filtre vide | Nombre d'articles à la place du statut technique, titre réduit, filtre actif et retour à tous les articles | [Hilos](https://mobbin.com/sites/sections/5dc71b63-3789-48ff-bc16-b515c87bdb08), [Notion](https://mobbin.com/sites/sections/31a0cc05-f391-4605-a66e-dbddf7a4e647). Structure de lecture uniquement |
| Contacts | Les deux boutons UPgraders ouvrent immédiatement une application ; action et préparation ne sont pas distinguées | Validation native et brouillon à relire avant l'ouverture de l'email ou WhatsApp, selon le parcours déjà présent sur Tarifs | [KOBU](https://mobbin.com/sites/sections/030f064f-689f-46cd-8b1f-64017a2dfa4c), [Unseen Studio](https://mobbin.com/sites/sections/5323b0ec-3ed9-4bb0-a5a0-5f575d60333b) pour les destinations de contact séparées. La préparation du brouillon reprend le composant métier du folio |

## Tarifs : provenance des montants

Montants repris de `CARTE` dans `src/app/tarifs/TarifsClient.tsx` au commit `8d445bb`. Ils sont présentés comme départs indicatifs, pas comme une réservation de disponibilité. Aucun délai de réponse ou de production de l'ancien catalogue n'est réintroduit.

| Prestation | Base EUR | Équivalent FCFA affiché |
| --- | ---: | ---: |
| Conseil et stratégie | 500 | 330 000 |
| Branding et identité | 1 200 | 785 000 |
| Direction artistique | 900 | 590 000 |
| Photographie, journée | 600 | 395 000 |
| Web et outils | 1 000 | 655 000 |
| Motion et vidéo | 800 | 525 000 |

Conversion existante conservée : 655,957 FCFA par euro, arrondi à 5 000. Le devis confirme prix, devise, droits et coûts de production. L'accompagnement régulier reste sur devis. Les trois descriptions d'intervention précédentes sont conservées.

## Registre des inspections

- Ouvertures des 13 routes principales inspectées sur ordinateur et en cadres de 390 px ; les textes et champs ont été mesurés également à 320 px. Il s'agit de véritables largeurs CSS dans des iframes, pas d'une simulation matérielle du tactile.
- À 320 px, la grille ADVE/RTIS débordait malgré le masquage du défilement global. Réviser : colonnes réductibles et disposition verticale sur petit écran. Après correction, les titres et paragraphes restent dans la largeur.
- Le CV coupait le numéro ivoirien sur deux lignes. Réviser : largeur des libellés et espacement des coordonnées. Les numéros restent lisibles dans le cadre mobile.
- Tarifs : six valeurs EUR vérifiées, sélection Photographie reprise dans le formulaire, budget et enjeu repris dans le brouillon ; aucun lien d'envoi ouvert. Version anglaise inspectée.
- UPgraders : formulaire vide bloque et place le focus sur le nom ; brouillon obtenu avec des données de test, sans envoi. Contrôle du changement de langue et de la navigation.
- Projets : URL `?vue=index&q=spawt`, une fiche trouvée, ouverture de SPAWT puis retour navigateur avec la recherche conservée.
- Galerie : les 18 collections et leurs destinations sont conservées ; couvertures existantes et repli d'image préservés.
- 404 inspectée : message et deux chemins de retour déjà présents, conservés. Les redirections historiques restent vers l'accueil.
- Le script `scripts/check-content-integrity.mjs` contrôle les 40 fiches, les champs FR/EN, 221 images locales distinctes et les téléchargements. Résultat : aucune image ou pièce manquante, aucun doublon de fiche.
- Les photos d'illustration des articles ne sont plus décrites comme des captures du logiciel ou des productions d'UPgraders. Le partage d'article contient désormais son URL.

Les pages rédigées dans une seule langue le restent : Design en anglais, recrutement et articles en français ; leur langue est explicitement déclarée. Aucune mesure de conversion ou étude utilisateur n'est revendiquée. La facturation et le fonctionnement interne des services externes ne sont pas testés.

## Verdicts

Tarifs trouvables → navigation et grille rendues → prix, unités et contact distincts visibles → poursuivre.

Rythme des pages secondaires → rendus comparés aux captures initiales → images et articles remontent, identité conservée → poursuivre.

Petite largeur → CV et méthode UPgraders initialement trop contraints → corrections et nouvelle mesure → poursuivre.

Catalogue → contrôles de contenu et compilation de production → dossiers et assets conservés → poursuivre vers publication.

Validation finale avant publication : `npm run typecheck`, compilation standalone (67 routes), contrôle des 61 documents HTML générés (un titre principal et aucune cible interne manquante), contrôle du catalogue (221 médias et téléchargements), `git diff --check` : réussis. Les avertissements de console relevés dans le navigateur concernent les attributs de son extension, pas un écart de contenu de l’application.

Comparaisons visuelles autonomes : [Tarifs](qa/tarifs-comparison.html), [Galerie](qa/galerie-comparison.html), [Blog](qa/blog-comparison.html). Les images des pages réellement rendues sont intégrées à chaque fichier.

Publication vérifiée le 27 octobre 2026 à 15 h 33 (Douala). Déploiement Coolify `7bk8kw2sk5pymopao1ihuoru`, commit applicatif `96bbc470d3b7b3714fa2104703d84bfc1e6a5c68` : terminé, nouveau conteneur sain, bascule terminée. La page publique `/tarifs` affiche les six prestations et les montants ; `/cv` et `/api/health` répondent en HTTP 200. [Capture de la version publiée](qa/tarifs-live.jpg).
