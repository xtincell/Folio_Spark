# Mockups et états des offres

Demande : « generes un mockup adequat pour chaque bloc. l'illustration doit donner envie. sur fond blanc. et un hover qui change toute l'offre : genre fond orange au lieu du fond noir sur l'offre qui est survolé. ou une alternance entre les bloc pour ameliorer la lisibimité. la meilleure approche. »

## Position et périmètre

Les six prestations conservent leurs prix, unités, descriptions, livrables, conditions de devis et actions. Le nouveau traitement doit donner une représentation tangible du résultat proposé. Les visuels partagent un fond blanc, une lumière de studio douce et une mise en situation des livrables. Le périmètre reste les images et les cartes Tarifs. Le thème du reste du portfolio est conservé.

Choix : cartes sombres au repos, espaces et bordures explicites, légère alternance de surface neutre. Une offre entière devient orange au survol sur pointeur précis ou au focus clavier. Tous ses textes, prix, puces et liens deviennent sombres. Le blanc du mockup reste blanc. L'orange permanent une carte sur deux est écarté : dans cette composition il donnerait à certaines offres une importance arbitraire. Il s'agit d'un arbitrage de direction artistique, pas d'un résultat d'étude utilisateur.

Critères d'échec : fond du mockup sombre, livrable non identifiable, texte orange sur orange, retour clavier invisible, contenu coupé à 320 px, changement de prix ou de périmètre, perte d'accès au film, décalage de carte à l'ouverture du lecteur.

## Série générée

Six générations distinctes par l'outil intégré `image_gen`, avec le premier mockup comme référence de lumière, matière et cadrage pour les cinq autres. Les références de contenu sont les pièces existantes du folio. Les PNG originaux sont conservés par le générateur ; les fichiers utilisés par le site sont des exports WebP optimisés, sans recadrage créatif.

| Offre | Objet montré | Fichier livré au site |
| --- | --- | --- |
| Conseil | Dossier stratégique, synthèse et cartes de feuille de route | `public/studio/services/conseil-mockup-v2.webp` |
| Identité | Logo Cosmos Boba, mini-charte et applications imprimées | `public/studio/services/identite-mockup-v2.webp` |
| Direction artistique | Campagne Bonnet Rouge sur affiche et planche de références | `public/studio/services/direction-mockup-v2.webp` |
| Photographie | Tirages de la photographie de scène de Lydol et pochette | `public/studio/services/photo-mockup-v2.webp` |
| Web | Présentation du site Xtincell sur écran et téléphone | `public/studio/services/web-mockup-v2.webp` |
| Motion | Vidéo Peak en formats horizontal et vertical et timeline | `public/studio/services/motion-mockup-v2.webp` |

Les légendes annoncent des mockups. Les pièces originales et leurs crédits restent accessibles. Ces mises en scène ne documentent pas une fabrication physique réelle ou un nouveau tournage. Le lecteur ouvre le vrai showreel de 48 secondes, distinct des commandes représentées dans le mockup. La génération peut réinterpréter des détails fins de l'image source ; les références originales ne sont pas écrasées.

[Jeu de prompts complet et méthode](qa/mockups-offres-prompts.json).

## Inspections et arbitrages

Première composition : six mockups dans un cadre blanc et trois colonnes de cartes, légendes et prix lisibles → **poursuivre**. Les fonds noirs et neutres gardent les mêmes rôles dans toute la famille.

Survol de Branding : fond mesuré `rgb(255,104,47)` et titres, corps, légende, prix, listes et liens mesurés `rgb(8,8,8)` ; les cartes voisines gardent leur fond sombre → **poursuivre**. Sortie du pointeur et focus clavier exercés. Le focus de la première offre déclenche le même orange et son contour est sombre.

Premier essai du film : le lecteur s'ajoutait sous le mockup et décalait le titre vidéo par rapport aux deux autres cartes → **réviser**. Le lecteur remplace désormais l'image dans le même cadre, avec une commande de fermeture. Nouvelle mesure : les trois figures de la rangée ont la même hauteur à l'arrondi près et les titres restent alignés → **poursuivre**. La fermeture met la vidéo en pause.

Petits écrans : vrais cadres CSS de 390 et 320 px, six cartes et leurs éléments mesurés, aucun débordement ; premières cartes inspectées visuellement. Il ne s'agit pas d'un essai tactile sur appareil. Sur pointeur sans survol, la séparation des cartes et l'alternance neutre persistent ; l'information n'exige aucun survol. Les animations de couleur sont supprimées en préférence de mouvement réduit.

Les montants et descriptions de prestation n'ont pas été modifiés. Aucun gain de conversion ou test avec des clients n'est revendiqué.


Validation locale : compilation standalone des 67 routes réussie, contrôle du catalogue (221 médias), six exports WebP vérifiés, un H1 et six figures dans le HTML Tarifs, aucun identifiant dupliqué, `git diff --check` réussi. Lecture du film puis fermeture exercées : le lecteur est mis en pause. [Aperçu de l'état orange inspecté](qa/mockups-hover-preview.jpg).


## Publication vérifiée

Déploiement Coolify `yccj9xervewu2uburw4qzirv` terminé le 27 octobre 2026 à 17 h 44 (Douala). Commit applicatif `3539cd3e4467992200ed91271d9e3b0255475381`. Bascule terminée, ancienne version retirée. `/tarifs` et `/api/health` répondent en HTTP 200.

Le navigateur public confirme six mockups chargés, aucune image cassée, le blanc du visuel conservé et la carte survolée orange `rgb(255,104,47)` avec texte sombre `rgb(8,8,8)`. Une déconnexion temporaire du navigateur pendant ce contrôle a été résolue ; la capture finale a ensuite été inspectée. [Capture de la version publiée](qa/mockups-offres-live.jpg).
