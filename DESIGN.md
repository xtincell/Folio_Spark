# Xtincell — L’étincelle prend forme

Direction mise à jour le 7 octobre 2026 à la demande d’Alexandre Djengue.

## Engagements de marque

Xtincell est le portfolio personnel d’un Brand Architect, directeur artistique,
photographe et créateur d’outils. Garder sa signature noire et orange, sa flamme,
son vrai portrait, son titre XTINCELL sensible au curseur et son manifeste
« Je ne crée pas de l’art. Je systémise le succès. ».

Le showreel prolonge le hero dans un chapitre indépendant. Il ne remplace ni
le titre ni la présence d’Alexandre. L’ivoire sert à la lecture et aux contrastes,
pas de nouveau positionnement « studio ivoire ».

## Système

| Rôle | Valeur | Usage |
| --- | --- | --- |
| Noir | `#080808` | Fond, ancrage de la marque |
| Graphite | `#191918` | Surfaces et cadre du portrait |
| Papier | `#f5f0e8` | Texte principal, contrepoint clair |
| Flamme | `#ff682f` | Actions, titre accentué, chapitre cinéma |
| Secondaire | `#b6b0a6` | Métadonnées et légendes |
| Trait | `#393631` | Structure et séparateurs |

Les tokens globaux `--xt-*` sont déclarés dans `src/styles/globals.css`.
Les surfaces studio utilisent `studio.module.css`; les pages de service
héritent des mêmes rôles via `studioPages.module.css`. UPgraders conserve
son identité d’agence, distincte de la marque personnelle.

- Instrument Serif : signature et grandes idées. Hiérarchie par l’échelle,
  le rythme et l’italique, sans gras artificiel.
- Space Grotesk : lecture, explication, navigation et contrôles.
- JetBrains Mono : données réelles, dates et métadonnées courtes.
- Polices locales, avec leurs licences dans `public/fonts`.
- Gouttière fluide : `clamp(22px, 4vw, 80px)`. Espacement de chapitre :
  `clamp(72px, 8vw, 140px)`. Coins discrets de 4px pour les actions.
- SVG pour les icônes fonctionnelles. Texte explicite dans les boutons.

## Composition

L’accueil suit une progression : couverture typographique en triptyque,
chapitre cinéma orange, projets en planches puis diptyques, manifeste et
portrait, méthode ADVE/RTIS, photographie, presse, contact. La variation
de densité accompagne le contenu ; les sections ne répètent pas une grille
de cartes identiques.

Sur mobile, la couverture déroule titre, manifeste, portrait puis actions.
Le film conserve son cadre 16:9 et ses commandes visibles. Les filtres restent
accessibles ; les projets passent en une colonne. Aucun texte important ne
dépend d’une animation d’entrée.

## Images et preuves

Les mises en situation sont de vraies productions visuelles générées à partir
des créations existantes, toujours légendées comme telles. Elles ne prouvent
pas une installation physique. `src/lib/project-presentations.ts` choisit
la couverture ; chaque étude de cas conserve ses visuels originaux et crédits.
Ne pas remplacer les sources originales lors d’une future synchronisation.

Les collections photographiques utilisent leurs véritables couvertures locales.
Les biographies, clients, résultats, tarifs et informations juridiques ne
s’inventent pas. Sans photo autorisée d’un membre d’équipe, utiliser une
signature typographique volontaire, pas un faux portrait.

## Mouvement et accès

Le mouvement signé est concentré sur le titre, le champ d’étoiles et le film
composé hors ligne. Les actions ont des transitions brèves. Pas de fade-up
automatique répété sur toute la page. Respecter `prefers-reduced-motion`,
le mode économie de données et la visibilité de la page. Le film est manuel
quand la réduction des animations est activée et se met en pause hors écran.

Conserver les focus visibles, libellés bilingues, retours de focus, fermeture
des menus et lightboxes avec Échap. Les preuves de livraison sont la compilation,
les contrôles navigateur et les captures desktop/mobile, pas la seule lecture
du CSS.

## Références de travail

- [Frontend Design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md)
- [Impeccable](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md)

Leurs principes de composition, narration, accessibilité et vérification sont
appliqués dans le respect des choix explicites d’Alexandre. Le lanceur Impeccable
n’est pas installé dans cet environnement : revue et captures sont réalisées
directement, sans prétendre avoir exécuté ses commandes.
