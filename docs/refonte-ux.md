# Refonte Xtincell — livraison

La refonte conserve la DA Xtincell : encre/noir, orange, symbole spark/flamme authentique, Instrument Serif, Space Grotesk et JetBrains Mono. L’ivoire sert uniquement au texte et aux créations présentées, sans changement de marque. Le positionnement Brand Architect / Storytelling Consultant / Toolsmith, le parcours, les crédits, les collections et les liens de preuve sont conservés.

## Parcours

- Accueil ouvert par la couverture originale : titre Xtincell réactif au curseur, slogan « Je ne crée pas de l’art. Je systémise le succès. », portrait et macarons. Le showreel dispose d’un chapitre distinct juste après, puis viennent les projets, le parcours, la méthode et la presse.
- Navigation principale courte ; menu secondaire donnant accès aux autres pages. WhatsApp reste le contact principal.
- Index de projets : filtres par pratique, recherche par projet/client/tag, comptage, état vide et remise à zéro. Les références historiques restent dans une archive dépliable avec visuels et preuves.
- Études de cas : périmètre et crédits, textes disponibles, images agrandissables au clavier, retour à l’index, projets précédent/suivant et recommandations. Les mockups sont identifiés comme présentations générées.
- Galerie : catégories, collections, vidéos et liens vers leurs plateformes. Huit collections utilisent leurs photographies locales existantes. Les autres aperçus ont un repli lisible en cas d’échec.
- CV, tech, tarifs, recrutement et Design : sommaire de page, hiérarchie harmonisée, navigation et footer partagés. Le folio Design reste en anglais. Les offres, devises, téléchargements et contenus métier sont conservés.
- Animations Motion pour apparitions et filtres, SVG pour les contrôles. Préférence de réduction des animations, économie de données, visibilité du showreel, clavier et focus pris en compte.

## Assets

Le showreel est une composition motion H.264 silencieuse de 48 secondes, neuf séquences, 1920 × 1080, 30 i/s : typographie cinétique, masques, plans opposés, travelling photographique, liaisons vectorielles et convergence des 39 projets vers la flamme. Deux mockups ont été générés à partir des créations existantes. Le schéma vectoriel La Barre remplace des captures absentes et reste explicitement identifié comme illustration conceptuelle. Polices locales et licences conservées. Voir `studio-assets.md` et `public/studio/showreel-manifest.json`.

## Direction et références UX/UI

La DA Xtincell et la couverture existante sont les références de toute amélioration. Préserver leur typographie, palette, composition, contenus et interaction ; ajouter les nouveaux formats en complément. Une recommandation générique de skill ne justifie pas de remplacer cette identité.

Références consultées pour la restauration de la couverture :

- [frontend-design — Anthropic](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) : faire porter l’expression par la typographie et le premier écran ; donner la priorité au brief de marque.
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md) : recherches ciblées « focus not obscured minimum » et « motion sensitivity reduced animation ». Ancrage sous le header fixe, focus visible et adaptation immédiate aux préférences de mouvement.
- [Impeccable](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md) et [craft-floor](https://github.com/pbakaus/impeccable/blob/main/skill/reference/craft-floor.md) : une amélioration préserve le monde visuel existant ; l’œuvre et la personnalité guident un portfolio. Vérifier ensemble la composition, les contrastes, le mouvement et les formats mobile/desktop.

Le titre et le fond étoilé arrêtent leur mouvement lorsque la préférence système change pendant la visite. Le header de l’accueil reste fixe à 72 px ; les autres pages gardent leur navigation existante. Le lien vers le showreel apparaît dans la couverture et mène au film sous celle-ci, avec un décalage de défilement qui garde la section visible sous la navigation.

## Vérification

- Installation reproductible : `PUPPETEER_SKIP_DOWNLOAD=true npm ci --cache /workspace/.npm-cache`.
- TypeScript : `npm run typecheck` passé.
- Build de production : `npm run build` passé ; 67 pages statiques générées.
- Navigateur Chromium : 15 routes en desktop 1440 px et mobile 390 px, soit 30 contrôles, sans erreur JavaScript, débordement horizontal, image locale cassée ni violation axe grave/critique sur les critères testés. L’archive des références est ouverte pendant le contrôle pour exercer ses images.
- Interactions : menu et retour de focus, FR/EN persistant, recherche/état vide/reset, filtre de pratique, lightbox/Échap/retour de focus, vidéo sans autoplay en mouvement réduit puis lecture/pause manuelle, choix de devise. Vérifiées en développement puis en production.
- Dernières modifications galerie/Design : revérification ciblée desktop/mobile et axe en production.
- Healthcheck du serveur de production local : `/api/health` renvoie `{"status":"ok"}`. L’accueil rend bien Xtincell et le showreel.

Les scripts `scripts/check-studio.mjs` et `scripts/check-studio-interactions.mjs` rendent les contrôles reproductibles. Le premier accepte `STUDIO_CHECK_PATHS` pour cibler des routes, `AXE_SCRIPT_PATH` pour une installation locale optionnelle d’axe-core et `STUDIO_SCREENSHOT_DIR` pour les captures. Chromium fourni : `/usr/bin/chromium`.

- Showreel final : 1 440 images H.264, 1920 × 1080, 30 i/s, 48 secondes, 10 738 397 octets. Raccord de boucle contrôlé sur les premières et dernières images décodées (écart quadratique moyen 0,071/255). Raccords intermédiaires examinés image par image ; amorce des scènes sous les masques, sans redémarrage au changement de plan.
- Lecteur final : ratio 16:9 et `contain` en desktop/mobile, commandes sous le cadre, ouverture grand format. Compilation, audit accueil desktop/mobile et interactions navigateur repassés après intégration.
- Restauration de la couverture : build de production et TypeScript passés. Huit routes contrôlées en desktop/mobile ; accueil revérifié après les ajustements finaux, sans violation axe grave/critique sur les critères testés. Captures à 1920 × 1080, 1440 × 900, 1366 × 768, 390 × 844 et 320 × 812 : pas de débordement, couverture complète dans le premier écran desktop, film dans le chapitre suivant et ancrage visible sous le header. Parallaxe, recentrage, arrêt/réactivation du titre et du fond étoilé lors d’un changement de préférence de mouvement validés dans Chromium avec un pointeur desktop émulé ; interactions existantes repassées.

## Limites et environnement

`npm run lint` invite à configurer ESLint : ce contrôle ne passe pas encore et n’a pas été présenté comme réussi. La génération PDF et la synchronisation des galeries n’ont pas été lancées car elles réécrivent des sorties existantes.

Le brouillon cloud contient `install_script`, `start_skill` et les domaines `images.pixieset.com`, `i.ytimg.com`, `images.unsplash.com`, `xtincell.powerupgraders.com`, `api.github.com`. Les accès production et API GitHub ont d’abord renvoyé 403, puis ont permis les contrôles HTTP et GitHub. Le brouillon est enregistré ; sa publication comme configuration réutilisable reste une opération distincte. Les aperçus locaux et les replis restent fonctionnels. Aucun secret supplémentaire n’est requis pour le workflow standard.

Les processus ne sont pas conservés par la publication. Le démarrage et ses contrôles sont enregistrés dans `start_skill`. Arrêter uniquement les serveurs démarrés pour la tâche et vérifier que le port est libéré avant de compiler : dev et production partagent `.next`.

La cible de publication est `main` → application Coolify « Xtincell » → https://xtincell.powerupgraders.com, conformément au README. Le code et le MP4 sont versionnés et ont été poussés sur `main` à la demande de l’utilisateur.

Pour confirmer une livraison en production, contrôler le HTML (source `showreel.mp4?v=motion-2026`), `/api/health`, puis `/studio/showreel-manifest.json` (version 2, 48 secondes, 1920 × 1080, 30 i/s). Comparer l’empreinte SHA-256 du MP4 servi avec celle du fichier versionné. Un healthcheck vert ou un push réussi ne suffisent pas : une ancienne version peut encore être servie pendant un build ou si le webhook n’a pas lancé de déploiement. Si aucun statut GitHub ne remonte, contrôler les logs de l’application dans Coolify.

Les résultats de validation ci-dessus proviennent du serveur de production local. La publication d’un snapshot cloud et la restauration dans une nouvelle tâche ne sont pas revendiquées.
