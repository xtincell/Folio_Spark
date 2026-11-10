# Wiki Xtincell

Ce wiki est l’encyclopédie du travail d’**Alexandre « Xtincell » Djengue**. Chaque projet y a sa fiche datée et sourcée, avec ou sans visuels, montré ou non sur le site.

<!-- wiki:stats -->
**362 projets** · **179 organisations** · 2009–2026 · 40 avec une page sur le folio, 17 cités sur `/work` sans page, 304 encore absents ([maintenance](maintenance.md)).
<!-- /wiki:stats -->

Les fiches viennent du folio (études de cas, pratiques, CV), des dépôts GitHub, des galeries Pixieset et des **archives de travail rangées sur les disques** (dossiers clients UPgraders et MATANGA, journal des événements couverts, projets personnels). Voir [Conventions](CONVENTIONS.md#import-des-disques-de-travail).

## Par où commencer

| Page | Rôle |
| --- | --- |
| [Biographie](personnes/alexandre-djengue.md) | Le récit qui relie tout : formation, postes, agences, méthode. |
| [Chronologie](chronologie.md) | Le parcours et les projets année par année, de 2008 à aujourd’hui. |
| [Index](index.md) | Tous les projets par casquette, catégorie et client, plus les organisations. |
| [Maintenance](maintenance.md) | Ce qui reste à vérifier, à rédiger ou à publier sur le folio. |
| [Conventions](CONVENTIONS.md) | Comment écrire et ajouter une fiche. |

## Wiki et folio : qui fait quoi

| | Wiki (`/wiki`) | Folio (le site) |
| --- | --- | --- |
| **Rôle** | Mémoire et ligne conductrice | Vitrine |
| **Contenu** | Tous les projets, y compris confidentiels, anciens ou sans visuels | Tous les travaux montrables, mis en forme |
| **Unité** | Une fiche Markdown par projet, organisation ou personne | Une page `/work/<slug>` par projet |
| **Lien** | Le champ `folio` pointe vers la page du site | Les pages du site reprennent le même slug |

La règle : **un projet existe d’abord dans le wiki**, puis il passe sur le folio. La page [maintenance](maintenance.md#absents-du-folio) liste les projets historisés qui n’ont pas encore de page sur le site. C’est la liste de travail pour que le folio montre l’intégralité des travaux.

Le build exporte aussi `wiki/_data/wiki.json`, un index que le site Next.js pourra lire pour afficher le wiki et compléter `/work`.

## Programmes et systèmes maison

- [Méthode ADVE/RTIS](projets/methode-adve-rtis.md) : la doctrine de stratégie de marque
- [La Fusée](projets/la-fusee.md) : la plateforme qui outille la méthode
- [Shinkiro](projets/shinkiro.md) : le programme UPgraders (méthode, outils, exécution), avec [La Barre](projets/la-barre.md) et [Argos Studio](projets/argos-studio.md)
- [Galahad](projets/galahad.md) : l’équipe d’agents IA auto-hébergée, avec [Radar](projets/radar.md)

## Structures clés

[UPgraders](organisations/upgraders.md) · [MATANGA Agency](organisations/matanga-agency.md) · [Friends Photography Studio](organisations/friends-studio.md) · [Motion19](organisations/motion19.md) · [Bimstr Agency](organisations/bimstr.md) · [Universal Music Africa](organisations/universal-music-africa.md)

## Mettre à jour le wiki

```bash
npm run wiki         # régénère infobox, pages liées, chronologie, index, maintenance
npm run wiki:check   # vérifie sans écrire (champs, liens, fichiers à jour)
```

Pour ajouter un projet : copier le modèle de [CONVENTIONS.md](CONVENTIONS.md#modèle-de-fiche-projet) dans `wiki/projets/<slug>.md`, remplir le frontmatter, puis lancer `npm run wiki`.
