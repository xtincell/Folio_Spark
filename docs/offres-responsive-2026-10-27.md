# Offres accessibles et galeries responsives

Demande : corriger le responsive, présenter quatre illustrations par offre et proposer un prix d’appel plus accessible.

## Périmètre livré

La page Tarifs reçoit six galeries de quatre mockups distincts. Les six vues d’ensemble existantes sont conservées, et dix-huit nouvelles images sont générées séparément avec l’outil intégré Imagegen, chacune avec la vue d’ensemble correspondante comme référence de style et de contenu. Les originaux ne sont pas écrasés. Les exports WebP sont dans `public/studio/services/*-v3.webp`, limités à 1280 px de large ; 1 487 786 octets pour les dix-huit nouveaux fichiers.

[Prompts et chemins des originaux générés](qa/gallery-offres-v3-prompts.json). Les images sont des mises en scène illustratives ; les projets originaux et leurs crédits restent accessibles. Les tirages, emballages ou autres applications représentés ne sont pas implicitement vendus dans la formule d’entrée.

Les quatre vues se parcourent dans un rail natif avec arrêt sur chaque image. Le glissement ne dépend pas d’un gestionnaire de déplacement JavaScript. Boutons précédent/suivant, quatre vignettes, compteur et flèches du clavier donnent les mêmes possibilités. Pas de lecture automatique. Les commandes ont au moins 44 px de hauteur, la préférence de mouvement réduit supprime le défilement animé. Le showreel réel reste accessible dans l’offre Motion ; sa fermeture met le lecteur en pause.

La carte entière conserve son état orange au survol sur pointeur précis et au focus clavier. Le mockup reste blanc. Les couleurs des textes et du fond évoluent ensemble. La séparation des cartes et une légère alternance de surface persistent sans survol.

## Formules d’entrée

Le prix baisse avec un périmètre réduit, explicite dans chaque carte. Ces montants sont un choix de catalogue en réponse à la demande, sans prétention de benchmark du marché.

| Offre | Prix de départ | Périmètre essentiel |
| --- | ---: | --- |
| Conseil | 35 000 FCFA | 45 minutes à distance, un support examiné, synthèse d’une page et trois actions |
| Identité | 100 000 FCFA | Une piste de logo, une série de corrections, fiche couleurs/typos et exports SVG/PDF/PNG |
| Direction artistique | 75 000 FCFA | Une planche d’intention et un visuel dans un format, contenus fournis, une série de corrections |
| Photographie | 50 000 FCFA | Une heure, une personne, un lieu à Douala, cinq images retouchées en HD et web |
| Web | 150 000 FCFA | Une page en une langue, cinq sections au plus, contenus fournis, mobile/ordinateur et lien de contact |
| Motion | 75 000 FCFA | Quinze secondes au plus, éléments fournis, titres/transitions simples et un export MP4 |

Les prestations supplémentaires sont détaillées. Le devis confirme les droits, coûts et calendrier avant démarrage. FCFA est la base du catalogue ; l’équivalent EUR utilise 655,957 FCFA et s’arrondit à l’euro. Le formulaire continue de préparer un brouillon et ne transmet rien automatiquement.

## Responsive et inspection

Grille à une colonne sous 700 px, deux colonnes de 700 à 1199 px et trois au-delà. Colonnes à largeur minimale nulle, titre et prix adaptés à l’espace, marges de 16 px sur mobile, formulaire en une colonne dès 850 px et champs de 16 px pour éviter le zoom de saisie. Les retours à la ligne et les colonnes du cadre contractuel sont protégés sur écran étroit.

Inspection de la page entière dans des cadres CSS de 320, 390, 768 et 1024 px : aucun des titres, paragraphes, listes, liens, boutons, articles et champs ne dépasse le cadre horizontal. Les rails de galerie ont volontairement leur propre débordement interne. Inspection visuelle du haut de page et des offres, puis sélection d’offre vers le formulaire : valeur `conseil` bien sélectionnée. Il s’agit de cadres de navigateur, pas d’une validation physique iPhone/Android.

Inspection desktop : la quatrième vue du Conseil s’affiche, compteur 04/04 et vignette active cohérents. Fond de carte `rgb(255,104,47)`, texte `rgb(8,8,8)`, galerie `rgb(255,255,255)`. Les cartes voisines conservent leur surface sombre. Les titres et prix de la rangée sont alignés après réservation d’une ligne pour l’accès au projet.
