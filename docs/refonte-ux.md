# Refonte Xtincell — livraison

La refonte conserve la DA Xtincell : encre/noir, orange, symbole spark/flamme authentique, Instrument Serif, Space Grotesk et JetBrains Mono. L’ivoire sert uniquement au texte et aux créations présentées, sans changement de marque. Le positionnement Brand Architect / Storytelling Consultant / Toolsmith, le parcours, les crédits, les collections et les liens de preuve sont conservés.

## Parcours

- Accueil reconstruit autour du masthead Xtincell, du showreel, des projets, du parcours, de la méthode et de la presse.
- Navigation principale courte ; menu secondaire donnant accès aux autres pages. WhatsApp reste le contact principal.
- Index de projets : filtres par pratique, recherche par projet/client/tag, comptage, état vide et remise à zéro. Les références historiques restent dans une archive dépliable avec visuels et preuves.
- Études de cas : périmètre et crédits, textes disponibles, images agrandissables au clavier, retour à l’index, projets précédent/suivant et recommandations. Les mockups sont identifiés comme présentations générées.
- Galerie : catégories, collections, vidéos et liens vers leurs plateformes. Huit collections utilisent leurs photographies locales existantes. Les autres aperçus ont un repli lisible en cas d’échec.
- CV, tech, tarifs, recrutement et Design : sommaire de page, hiérarchie harmonisée, navigation et footer partagés. Le folio Design reste en anglais. Les offres, devises, téléchargements et contenus métier sont conservés.
- Animations Motion pour apparitions et filtres, SVG pour les contrôles. Préférence de réduction des animations, économie de données, visibilité du showreel, clavier et focus pris en compte.

## Assets

Le showreel est une composition motion H.264 silencieuse de 48 secondes, neuf séquences, 1920 × 1080, 30 i/s : typographie cinétique, masques, plans opposés, travelling photographique, liaisons vectorielles et convergence des 39 projets vers la flamme. Deux mockups ont été générés à partir des créations existantes. Le schéma vectoriel La Barre remplace des captures absentes et reste explicitement identifié comme illustration conceptuelle. Polices locales et licences conservées. Voir `studio-assets.md` et `public/studio/showreel-manifest.json`.

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

## Limites et environnement

`npm run lint` invite à configurer ESLint : ce contrôle ne passe pas encore et n’a pas été présenté comme réussi. La génération PDF et la synchronisation des galeries n’ont pas été lancées car elles réécrivent des sorties existantes.

Le brouillon cloud contient `install_script`, `start_skill` et les domaines `images.pixieset.com`, `i.ytimg.com`, `images.unsplash.com`, `xtincell.powerupgraders.com`. Ces destinations externes restent bloquées dans l’instance observée ; leur application nécessite l’enregistrement des réglages dans l’interface de l’environnement. Les aperçus locaux et les replis restent fonctionnels. Aucun secret supplémentaire n’est requis pour le workflow standard.

Les processus ne sont pas conservés par la publication. Le démarrage et ses contrôles sont enregistrés dans `start_skill`. Arrêter uniquement les serveurs démarrés pour la tâche et vérifier que le port est libéré avant de compiler : dev et production partagent `.next`.

La cible de publication est `main` → application Coolify « Xtincell » → https://xtincell.powerupgraders.com, conformément au README. La validation HTTP distante est bloquée dans l’environnement cloud observé (proxy CONNECT 403), y compris après tentative avec approbation réseau. Le domaine est ajouté au brouillon réseau, qui doit encore être enregistré et publié dans les réglages pour activer cet accès. Les résultats de validation ci-dessus proviennent du serveur de production local. Aucune publication de snapshot ni restauration dans une nouvelle tâche n’est revendiquée.
