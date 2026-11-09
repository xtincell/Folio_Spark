# Conventions du wiki

Ces règles assurent que le wiki reste fiable et lisible, et que le script `scripts/wiki-build.mjs` puisse le construire.

## Organisation des dossiers

```
wiki/
  README.md            portail (rédigé à la main)
  CONVENTIONS.md       ce document
  chronologie.md       ⚙ généré
  index.md             ⚙ généré
  maintenance.md       ⚙ généré
  _data/wiki.json      ⚙ généré (lu par le site)
  projets/<slug>.md        une fiche par projet
  organisations/<slug>.md  clients, employeurs, agences relais, écoles
  personnes/<slug>.md      biographie et collaborateurs
```

Les fichiers marqués ⚙ sont réécrits à chaque `npm run wiki`. Ne pas les modifier à la main.

## Règles éditoriales

1. **Ton encyclopédique.** Troisième personne, phrases factuelles, pas de superlatifs. On écrit « Alexandre a dirigé… », pas « j’ai dirigé… ».
2. **Rien d’inventé.** Une information sans source s’écrit « à préciser ». Elle ne se devine pas.
3. **Toute fiche cite ses sources** dans la section `## Sources` (fichier du repo, lien, CV, échange client…).
4. **Les contradictions se signalent.** Si deux sources ne disent pas la même chose, on garde les deux versions, on les note dans `verifier` et on passe `etat` à `a-verifier`.
5. **Les liens internes sont relatifs** (`../organisations/ecobank.md`), pour fonctionner sur GitHub, dans Obsidian et sur le site.
6. **Un slug ne change jamais.** Pour un projet visible sur le folio, le slug du wiki est celui de la page `/work/<slug>`.

## Cycle de vie d’une fiche (`etat`)

| Valeur | Sens |
| --- | --- |
| `ebauche` | Créée, peu de texte. Il manque contexte, rôle ou résultat. |
| `a-verifier` | Contradiction ou hypothèse à trancher (détail dans `verifier`). |
| `standard` | Faits sourcés, contexte, rôle et résultat rédigés. |
| `complet` | Fiche de référence : démarche détaillée, preuves, visuels, enseignements. |

## Frontmatter

Une clé par ligne. Les textes, listes et objets s’écrivent en JSON (`"texte"`, `["a","b"]`, `[{"label":"…","url":"…"}]`). Les années et `true`/`false` s’écrivent nus.

### Projet (`wiki/projets/`)

| Clé | Obligatoire | Valeurs / exemple |
| --- | --- | --- |
| `type` | oui | `"projet"` |
| `titre` | oui | `"Ecobank — 40 ans & ellever"` |
| `categorie` | oui | `campagne` · `identite` · `production` · `photo` · `video` · `collection` · `mission` · `produit` · `outil` · `methode` · `programme` · `edition` · `jeu` · `podcast` · `evenement` · `projet` |
| `casquette` | oui | `strategie` · `direction-artistique` · `execution` |
| `etat` | oui | voir ci-dessus |
| `debut` / `fin` | conseillé | `2025`, `"2023-12-30"` ; `fin` peut valoir `"en cours"` |
| `client` | conseillé | slug d’organisation, ou `"perso"`, ou `"prive"` |
| `chaine` | non | agences intermédiaires, du client vers Alexandre : `["matanga-agency"]` |
| `parent` | non | slug du programme parent : `"shinkiro"` |
| `role` | non | `"Direction artistique"` |
| `disciplines` | non | `["KV-OOH","branding"]` |
| `personnes` | non | slugs de `wiki/personnes/` |
| `folio` | non | chemin de la page sur le site : `"/work/ecobank"` |
| `masque_folio` | non | `true` si la page existe mais est volontairement masquée |
| `repos` | non | noms des dépôts GitHub `xtincell/…` |
| `liens` | non | `[{"label":"Clip YouTube","url":"https://…"}]` |
| `medias` | non | dossiers de visuels dans le repo : `["public/work/cases/ecobank"]` |
| `sources` | non | origine des données : `["folio:cases.spec.json","cv"]` |
| `verifier` | non | points à trancher : `["Année absente des sources."]` |

### Organisation (`wiki/organisations/`)

`type: "organisation"`, `nom`, `nature`, `relation` (`agence-propre` · `employeur` · `client` · `agence-relais` · `partenaire` · `formation`), et selon le cas `role` (le rôle d’Alexandre), `debut`, `fin`, `lieu`, `marques`, `personnes`, `liens`, `medias`, `etat`, `verifier`.

Les organisations dont la relation est `formation`, `employeur`, `agence-propre` ou `partenaire` forment le **parcours** dans la chronologie.

### Personne (`wiki/personnes/`)

`type: "personne"`, `nom`, `role`, `organisations`, `liens`, `etat`.

## Blocs générés

Le script remplit ces blocs. Tout ce qui est en dehors n’est jamais touché.

| Bloc | Contenu |
| --- | --- |
| `<!-- wiki:infobox -->` | La boîte d’informations en tête de fiche, avec les liens résolus. |
| `<!-- wiki:projets -->` | Sur une organisation ou une personne : les projets rattachés. |
| `<!-- wiki:liens-entrants -->` | Les fiches qui pointent vers celle-ci. |
| `<!-- wiki:stats -->` | Les chiffres du portail. |
| `<!-- wiki:archives -->` | Le relevé des dossiers de travail sur les disques (voir ci-dessous). Écrit par `scripts/wiki-disques.py`, pas par `npm run wiki`. |

## Modèle de fiche projet

```markdown
---
type: "projet"
titre: "Nom du projet — sous-titre"
categorie: "campagne"
casquette: "direction-artistique"
debut: 2026
fin: 2026
client: "slug-organisation"
chaine: ["matanga-agency"]
role: "Direction artistique"
disciplines: ["KV-OOH"]
folio: "/work/slug-du-projet"
medias: ["public/work/cases/slug-du-projet"]
sources: ["brief client"]
etat: "ebauche"
---
# Nom du projet — sous-titre

<!-- wiki:infobox -->
<!-- /wiki:infobox -->

**Nom du projet** est une campagne réalisée pour [Client](../organisations/slug-organisation.md) (2026).

## Contexte

## Rôle

## Démarche

## Résultat

## Preuves et médias

## Sources

<!-- wiki:liens-entrants -->
<!-- /wiki:liens-entrants -->
```

Si le client n’a pas encore de fiche, créer `wiki/organisations/<slug>.md` sur le même principe. Le build signale toute référence vers une fiche absente.

## Import des disques de travail

Les dossiers rangés sur les disques C:, E: et P: (`UPGRADERS — EXPORT DU TRAVAIL`, `MATANGA — EXPORT DU TRAVAIL`) alimentent le wiki :

```bash
python scripts/wiki-disques.py --dry   # simulation : affiche ce qui serait créé
python scripts/wiki-disques.py         # scanne les disques (lecture seule) et écrit
npm run wiki                           # puis reconstruit le wiki
```

Le script ne modifie jamais les disques. Côté wiki, il :

- crée une fiche **organisation** par dossier client, avec une section « Archives de travail » (années, sous-dossiers, volumes, opérations repérées dans les notes `PORTEUR.md`) ;
- crée une fiche **« travaux »** pour chaque client qui n’a encore aucun projet, afin qu’il apparaisse dans la chronologie ;
- crée une fiche par **événement couvert** (notes `EVENEMENTS-COUVERTS.md`), datée, avec sa fiabilité ;
- crée une fiche par **projet personnel** repéré dans les dossiers `Xtincell` ;
- ne réécrit jamais une fiche existante : il met seulement à jour les blocs `wiki:archives`.

Par discrétion, il ne publie ni factures, devis, contrats, pièces administratives ou listes de contacts, ni les noms des commandes privées (mariages, anniversaires, obsèques…), qui sont seulement comptées.
