# Xtincell — L’image. Et tout ce qui la fait tenir.

Direction mise à jour le 25 octobre 2026.

## Contrat de conception

Le portfolio relie les photographies, la direction créative et les outils conçus par Alexandre Djengue. La couverture présente son vrai portrait, le titre XTINCELL sensible au curseur et la phrase **« L’image. Et tout ce qui la fait tenir. »** Une introduction courte précise son intervention ; deux actions ouvrent le parcours choisi et l’ensemble des projets.

Conserver l’identité existante : noir, orange, flamme, typographies locales et photographies réelles. La refonte organise les œuvres et leurs relations. Elle n’installe pas une nouvelle marque d’agence autour de la personne.

## Couleurs et typographie

| Rôle | Valeur | Usage |
| --- | --- | --- |
| Noir | `#080808` | Fond et ancrage de la marque |
| Graphite | `#191918` | Surfaces secondaires |
| Papier | `#f5f0e8` | Texte principal et contraste clair |
| Flamme | `#ff682f` | Actions, accents, chapitre « Diriger sans perdre la main » |
| Secondaire | `#b6b0a6` | Métadonnées et légendes |
| Trait | `#393631` | Structure et séparateurs |

Les tokens globaux `--xt-*` vivent dans `src/styles/globals.css`. La composition narrative de l’accueil utilise `portrait.module.css` ; le cadre partagé utilise `studio.module.css` et les pages secondaires `studioPages.module.css`. UPgraders conserve son identité d’agence distincte.

- **Instrument Serif** : signature et titres, avec variation d’échelle et d’italique.
- **Space Grotesk** : lecture, explication, navigation et contrôles.
- **JetBrains Mono** : dates, numérotation et métadonnées courtes.
- Polices locales et licences conservées dans `public/fonts`.
- Espacements fluides ; les changements de composition suivent le contenu et la largeur disponible.
- Icônes fonctionnelles en SVG, accompagnées de libellés explicites.

## Composition et lecture

L’accueil suit trois actes : **le regard**, **la direction**, **la fabrique**. Un index indique le chapitre en cours et permet de passer directement à un autre.

Le regard associe photographie et création de festival. La direction rapproche les campagnes et leurs déclinaisons, puis le parcours Motion19. La fabrique met en relation SPAWT et La Barre. Ces compositions diffèrent parce que les pièces ne racontent pas la même chose.

Le chapitre orange « Diriger sans perdre la main » formule la direction souhaitée de la pratique. Le showreel reste un chapitre distinct, accessible dès la couverture. L’index complet, les publications et le contact prolongent la visite.

Sur mobile, le texte d’entrée précède le portrait ; l’index latéral devient une barre de chapitres sous le header. Les planches et diptyques se recomposent sans modifier l’ordre de lecture. Les métadonnées restent auprès des pièces qu’elles expliquent. Le film conserve son cadre 16:9 et ses commandes visibles.

## Images et preuves

Chaque photographie, création graphique, composition et schéma doit être désigné selon sa nature. Les mises en situation générées restent identifiées comme telles ; elles ne prouvent pas une installation physique. `src/lib/project-presentations.ts` choisit les présentations de projet, tandis que les études de cas conservent les créations originales et leurs crédits.

Les couvertures des collections photo sont les photographies locales existantes. Ne pas substituer des images générées aux œuvres ou aux portraits. Ne pas inventer de biographie, de responsabilité, de résultat, de tarif ou de collaboration pour compléter une mise en page.

## Mouvement et accès

Le mouvement est concentré sur le titre, les retours d’interaction et le film. Aucun contenu important ne dépend d’une animation d’entrée. Respecter `prefers-reduced-motion`, les préférences d’économie de données et la visibilité de la page.

Conserver des liens natifs pour la navigation, les focus visibles, les libellés bilingues, la fermeture des menus et lightboxes avec Échap et le retour du focus. L’index de chapitre ne doit pas masquer le titre ciblé. Le film reste contrôlable manuellement.

## Vérification et maintenance

Inspecter la couverture, une planche de campagne, un projet long et l’index de chapitre en largeur ample et contrainte. Vérifier les ancres, la langue, les ouvertures de projet et les commandes du film. Les captures décrivent un état observé ; la compilation seule ne démontre pas la qualité de lecture ou d’interaction.

Les évolutions éditoriales suivent `docs/folio-editorial-2026-10.md`. Préserver les routes existantes, les sources des cas et leurs crédits. Un ajout doit enrichir le parcours sans obliger l’accueil à devenir l’inventaire de tout le site.
