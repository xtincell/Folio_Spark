'use client';

import styles from '@/styles/recrutement.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';

type Camp = {
  brand: string;
  client: string;
  years: string;
  scope: string;
  cadre: string;
  concu: string;
  produit: string;
};

const CAMPAGNES: Camp[] = [
  {
    brand: 'Bonnet Rouge — Ramadan',
    client: 'FrieslandCampina',
    years: '2024 → 2026',
    scope: "Key visuals 4×3, PLV et social · Côte d'Ivoire, Cameroun, Togo, Sénégal, Congo, RDC",
    cadre:
      "Lecture de la plateforme de marque, formatage du brief annonceur, calendrier du temps fort et contraintes propres à chaque marché.",
    concu:
      "Concept « Avec vous, du sahur à l'iftar » : animation des séances, arbitrage des pistes des directeurs artistiques, consolidation de la big idea.",
    produit:
      "Master KV, variantes par marché et par langue, déclinaisons pack générosité +10 g, PLV et social — jusqu'au bon à tirer.",
  },
  {
    brand: 'Bonnet Rouge — « Bien dans son corps, bien dans sa tête »',
    client: 'FrieslandCampina',
    years: '2025 → 2026',
    scope: 'Plateforme de campagne annuelle · danse, sport, musique, étude, gym',
    cadre:
      "Construction d'une plateforme durable plutôt qu'un temps fort ponctuel : territoire, promesse, univers d'usage.",
    concu:
      "Cinq univers déclinables à partir d'un même système visuel, plus une signature secondaire « Le secret pour bien grandir ».",
    produit:
      "Masters par univers, déclinaisons Back to School, adaptation Côte d'Ivoire, exports digitaux et affichage.",
  },
  {
    brand: 'Belle Hollandaise — Congo & RDC',
    client: 'FrieslandCampina',
    years: '2025 → 2026',
    scope: 'Campagne poster et gobelet · marchés Congo et RDC · volet Pâques',
    cadre:
      "Reprise d'une marque distincte de Bonnet Rouge, sur des marchés où les codes et la distribution diffèrent.",
    concu: "Territoire « Ensemble » décliné en poster, gobelet et prise de parole de Pâques.",
    produit:
      'Artboards Congo et RDC, versions gobelet quatre produits, fichiers haute définition prêts pour impression.',
  },
  {
    brand: 'Milk Bar by Bonnet Rouge',
    client: 'FrieslandCampina',
    years: '2025 → 2026',
    scope: "Création d'une marque d'activation, de la plateforme aux supports",
    cadre: "Cadrage d'une marque fille d'activation sans concurrencer la marque mère.",
    concu: 'Système de logo complet, carte, univers de contenus vidéo.',
    produit: "Supports imprimés, habillages vidéo et reporting hebdomadaire d'exploitation.",
  },
  {
    brand: 'La Pasta — rebranding de gamme',
    client: 'Cadyst Group · Panzani Cameroun',
    years: '2025 → 2026',
    scope: 'Identité de gamme First, Gold, Foodies · extension sardine · sous-marque « Mighty »',
    cadre:
      "Diagnostic de l'identité existante, cadrage du territoire d'extension et des règles d'endossement de la marque mère.",
    concu:
      "Système de packaging de gamme, logo « Mighty by La Pasta », propositions sardine et mises en scène produit.",
    produit: 'Déclinaisons par référence, rendus 3D, exports prépresse et bons à tirer packaging.',
  },
  {
    brand: '40 ans, « ellever », carte prépayée',
    client: 'Ecobank · Cameroun & Centrafrique',
    years: '2026',
    scope: 'Institutionnel, retail et digital pour un groupe panafricain',
    cadre: "Formatage de briefs institutionnels sous contrainte de conformité de charte panafricaine.",
    concu:
      'Trois prises de parole distinctes — anniversaire, banque des particuliers, programme femmes — tenues sous une seule signature.',
    produit:
      'Communiqués, visuels agence et social, campagne digitale carte prépayée, contrôle de conformité avant diffusion.',
  },
  {
    brand: 'NSIA Tontines — OOH 4×3',
    client: 'NSIA Assurances',
    years: '2026',
    scope: 'Affichage grand format · versions française et anglaise · call-to-action WhatsApp',
    cadre:
      "Traduction d'une offre d'épargne-assurance technique en promesse lisible en trois secondes sur un panneau.",
    concu:
      'Système de profils d’entrepreneurs — commerçante, artisan, chauffeur, dirigeant — sur un même gabarit.',
    produit:
      'Un master, déclinaisons par profil et par langue, fichiers grand format calibrés pour l’affichage.',
  },
  {
    brand: 'Casting & shooting talents',
    client: 'FrieslandCampina · Bonnet Rouge',
    years: 'août 2025',
    scope: "Direction de casting et séance studio · banque d'images de marque",
    cadre:
      "Définition des profils à partir des univers de campagne à venir : âge, silhouette, registre d'expression.",
    concu:
      'Grille de poses et d’expressions par profil, pour que chaque talent reste détourable et réutilisable sur plusieurs KV.',
    produit: 'Séance dirigée, sélection, post-production et versement dans la banque d’images du compte.',
  },
];

const PARCOURS = [
  {
    when: '2025 → aujourd’hui',
    org: 'MATANGA Agency',
    role: 'Directeur Créatif & Artistique',
    desc:
      'Direction du département création. FrieslandCampina, Cadyst Group, Ecobank Cameroun & Centrafrique, NSIA, La Vache qui rit, Phosphatine, Tradex.',
  },
  {
    when: '2017 → aujourd’hui',
    org: 'UPgraders',
    role: 'Co-fondateur · CEO depuis 2023',
    desc: 'Conseil et stratégie créative. Méthode ADVE-RTIS, OS interne LaFusée, réseau de production La Guilde.',
  },
  {
    when: '2019 → 2023',
    org: 'MOTION19',
    role: 'Chef de projet, dir. marketing, brand manager',
    desc: 'Marque créée de A à Z sur 30 mois : système de vente, équipe de sept personnes, programme communautaire.',
  },
  {
    when: '2018 → 2022',
    org: 'Universal Music Africa',
    role: 'Direction artistique & photographie',
    desc: 'Catalogue Cameroun via Imperial : Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul.',
  },
  {
    when: '2018 → 2020',
    org: 'Bimstr Agency',
    role: 'Directeur Créatif & Artistique',
    desc: 'Production événementielle et photographique pour marques et personnalités publiques.',
  },
  {
    when: '2017 → 2019',
    org: 'Sellkako · Will&Brothers',
    role: 'Lead designer, puis développement business',
    desc: 'Direction du design en agence, puis ouverture commerciale et suivi de comptes.',
  },
];

export function RecrutementClient() {
  return (
    <div className={styles.folioRoot}>
      <FolioTopbar active="recrutement" label="RECRUTEMENT" />

      {/* ══ HERO ══ */}
      <section className={styles.hero}>
        <div className={styles.shell}>
          <p className={styles.eyebrow}>Candidature · CDI · Temps plein · Afrique francophone</p>
          <h1 className={styles.heroTitle}>
            Directeur Artistique,
            <br />
            <em>en charge du département de la création.</em>
          </h1>
          <p className={styles.heroLede}>
            Je cadre, je conçois, je produis. Interlocuteur direct du directeur clientèle,
            je suis <b>le visage de ce que l’agence sait faire</b> : je porte la démonstration
            devant l’annonceur, je défends la piste retenue, et je réponds de ce qui sort
            en fabrication.
          </p>

          <div className={styles.facts}>
            <div>
              <div className={styles.factN}>5</div>
              <div className={styles.factL}>créatifs dirigés, dont 3 directeurs artistiques</div>
            </div>
            <div>
              <div className={styles.factN}>118</div>
              <div className={styles.factL}>projets pilotés sur 2025–2026</div>
            </div>
            <div>
              <div className={styles.factN}>13</div>
              <div className={styles.factL}>marchés · 20 annonceurs · 35+ marques</div>
            </div>
            <div>
              <div className={styles.factN}>7 j</div>
              <div className={styles.factL}>délai médian brief → livraison</div>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="/recrutement/cv.docx" download>
              Télécharger le CV
            </a>
            <a className={styles.btn} href="/recrutement/folio.pptx" download>
              Folio complet (PPTX)
            </a>
            <a className={styles.btn} href={`mailto:${CONTACT.email}`}>
              Écrire à Alexandre
            </a>
          </div>
        </div>
      </section>

      {/* ══ MARCHÉ IVOIRIEN ══ */}
      <section className={styles.section} id="cote-divoire">
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 01 — Marché ivoirien</p>
          <h2 className={styles.secTitle}>Je ne découvre pas la Côte d’Ivoire.</h2>
          <p className={styles.secLede}>
            J’y livre des campagnes validées, dans le cadre de déploiements régionaux.
            Les exécutions ivoiriennes sont produites séparément des versions Cameroun,
            avec leurs propres castings, formats et circuits de distribution.
          </p>

          <ul className={styles.proofs}>
            <li>
              <span>
                <b>Bonnet Rouge — Back to School Côte d’Ivoire 2026.</b> Master KV et jeu complet
                d’exécutions marché : OOH 4×3 m, posters 40×60 cm, bannières 828×315 et formats
                digitaux 1080×1080, en versions fille et garçon.
              </span>
            </li>
            <li>
              <span>
                <b>Bonnet Rouge — Ramadan Côte d’Ivoire 2026, OOH Délice, Goodness of Dairy IVC.</b>{' '}
                KV validés et exécutions dédiées au marché ivoirien.
              </span>
            </li>
            <li>
              <span>
                <b>Phosphatine — key visuals Côte d’Ivoire</b>, dont une version open market adaptée
                aux circuits de distribution locaux.
              </span>
            </li>
            <li>
              <span>
                <b>PLV Noël Côte d’Ivoire &amp; Burkina.</b> Têtes de gondole, posters, wobblers et
                présentoirs livrés pour les deux marchés.
              </span>
            </li>
            <li>
              <span>
                <b>NSIA Assurances, groupe ivoirien.</b> Campagnes Tontines (OOH 4×3, versions
                française et anglaise), Voyages et Auto.
              </span>
            </li>
            <li>
              <span>
                <b>Care Côte d’Ivoire.</b> Annonceur ivoirien servi en direct, hors dispositif régional.
              </span>
            </li>
            <li>
              <span>
                <b>Présence locale.</b> Ligne ivoirienne, clients à Abidjan, et collaboration avec des
                agences relais implantées sur place.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ══ LE RÔLE ══ */}
      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 02 — Le rôle tenu</p>
          <h2 className={styles.secTitle}>Cadrer · Concevoir · Produire.</h2>
          <p className={styles.secLede}>
            La colonne vertébrale du département : trois temps, des entrées et des sorties
            explicites. C’est le process que j’installe et que je tiens.
          </p>

          <div className={styles.triptych}>
            <div className={styles.step}>
              <span className={styles.stepK}>01</span>
              <h3 className={styles.stepT}>Cadrer</h3>
              <ul>
                <li>Identification de l’identité de marque</li>
                <li>Réception et formatage du brief</li>
                <li>Conception ou identification de la plateforme de marque</li>
                <li>Réception et formatage de la stratégie</li>
              </ul>
            </div>
            <div className={`${styles.step} ${styles.stepOn}`}>
              <span className={styles.stepK}>02</span>
              <h3 className={styles.stepT}>Concevoir</h3>
              <ul>
                <li>Animation de la séance de création — brainstorm orienté</li>
                <li>Identification des bonnes idées de mon équipe</li>
                <li>Conception de la big idea</li>
                <li>Arbitrage des big ideas des directeurs artistiques, mes pistes incluses</li>
              </ul>
            </div>
            <div className={styles.step}>
              <span className={styles.stepK}>03</span>
              <h3 className={styles.stepT}>Produire</h3>
              <ul>
                <li>Supervision des masters</li>
                <li>Variantes par marché</li>
                <li>Différentes déclinaisons</li>
                <li>Livrables Ready-To-Print / bon à tirer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPÉTENCES ══ */}
      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 03 — Les compétences du poste</p>
          <h2 className={styles.secTitle}>Quatre compétences de direction.</h2>

          <div className={styles.skills}>
            {[
              [
                'Gestion d’équipe',
                'Animation des séances de création, lecture et critique des propositions, arbitrage assumé. Trois directeurs artistiques et deux collaborateurs en N-2 encadrés, avec un protocole de délégation écrit pour les périodes d’absence. Direction de casting et de shooting.',
              ],
              [
                'Gestion des process',
                'Un chemin unique du brief au bon à tirer, tenu quels que soient la marque, le marché et le délai. J’ai conçu et déployé le système de suivi du département : nomenclature d’identifiants par client et par pays, registre de projets, arbre de décision, et tickets de modification typés — ajustement mineur ou refonte majeure — qui rendent le taux de reprise mesurable au lieu d’être ressenti.',
              ],
              [
                'Conception d’outils',
                'La Barre — poste de travail du directeur de la création. Méthode ADVE-RTIS, référentiels de marque, système master → variantes → déclinaisons, agents IA intégrés à la production.',
              ],
              [
                'Pilotage de projet',
                'Planning, priorités, budget. Coordination des partenaires de production, photographes et imprimeurs. Suivi multi-comptes et multi-marchés.',
              ],
            ].map(([t, d], i) => (
              <div className={styles.skill} key={t}>
                <span className={styles.skillN}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.skillT}>{t}</h3>
                  <p className={styles.skillD}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RÉPARTITION ══ */}
      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 04 — Lecture du folio</p>
          <h2 className={styles.secTitle}>Ce que ce dossier montre, et dans quelle proportion.</h2>
          <p className={styles.secLede}>
            Les pratiques se recouvrent : une campagne d’envergure compte aussi en direction
            artistique et en exécution. La moitié du dossier porte sur les campagnes.
          </p>

          <div className={styles.mix}>
            {[
              ['50 %', 'Campagnes d’envergure', '14 dossiers détaillés : le périmètre, puis ce qui a été cadré, conçu et produit.'],
              ['30 %', 'Direction artistique', 'Key visuals OOH, character design, systèmes de packaging, identités de marque complètes.'],
              ['20 %', 'Exécution', 'Casting et shooting, photographie d’artistes, captation d’événements, vidéo, fichiers Ready-To-Print.'],
              ['15 %', 'Conception d’outils', 'La Barre, ADVE-RTIS, Argos, agents de production, référentiels de marque.'],
            ].map(([p, t, d]) => (
              <div className={styles.mixCard} key={t}>
                <div className={styles.mixPct}>{p}</div>
                <h3 className={styles.mixT}>{t}</h3>
                <p className={styles.mixD}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CAMPAGNES ══ */}
      <section className={styles.section} id="campagnes">
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 05 — Campagnes d’envergure</p>
          <h2 className={styles.secTitle}>Huit dossiers, et ce que j’y ai fait.</h2>
          <p className={styles.secLede}>
            Pour chaque campagne : le périmètre réel, puis ce que j’ai cadré, ce que j’ai conçu,
            ce que j’ai produit. Le dossier complet — quatorze campagnes avec les visuels —
            est dans le folio PPTX.
          </p>

          <div className={styles.camps}>
            {CAMPAGNES.map((c) => (
              <article className={styles.camp} key={c.brand}>
                <div>
                  <h3 className={styles.campBrand}>{c.brand}</h3>
                  <p className={styles.campMeta}>
                    {c.client} · {c.years}
                  </p>
                </div>
                <div>
                  <p className={styles.campScope}>{c.scope}</p>
                  <dl className={styles.acts}>
                    <div className={styles.act}>
                      <dt>Cadré</dt>
                      <dd>{c.cadre}</dd>
                    </div>
                    <div className={styles.act}>
                      <dt>Conçu</dt>
                      <dd>{c.concu}</dd>
                    </div>
                    <div className={styles.act}>
                      <dt>Produit</dt>
                      <dd>{c.produit}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARCOURS ══ */}
      <section className={styles.section}>
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 06 — Parcours</p>
          <h2 className={styles.secTitle}>Une trajectoire construite par responsabilités.</h2>

          <div className={styles.path}>
            {PARCOURS.map((e) => (
              <div className={styles.pathRow} key={e.org + e.when}>
                <span className={styles.pathWhen}>{e.when}</span>
                <div>
                  <h3 className={styles.pathOrg}>{e.org}</h3>
                  <p className={styles.pathRole}>{e.role}</p>
                </div>
                <p className={styles.pathDesc}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className={styles.contact}>
        <div className={styles.shell}>
          <p className={styles.secNum}>§ 07 — Prendre contact</p>
          <h2 className={styles.secTitle}>Vous recrutez un directeur artistique&nbsp;?</h2>
          <p className={styles.secLede}>
            CDI, temps plein. Le folio complet, les références et le détail des campagnes sont
            disponibles pour un entretien.
          </p>

          <div className={styles.contactGrid}>
            <div>
              <p className={styles.cLabel}>E-mail</p>
              <p className={styles.cValue}>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
            </div>
            <div>
              <p className={styles.cLabel}>Téléphone</p>
              <p className={styles.cValue}>
                <a href={CONTACT.whatsappLink}>{CONTACT.whatsappDisplay}</a>
                <br />
                <a href={CONTACT.whatsappSecondaryLink}>{CONTACT.whatsappSecondaryDisplay}</a>
              </p>
            </div>
            <div>
              <p className={styles.cLabel}>LinkedIn</p>
              <p className={styles.cValue}>
                <a href={CONTACT.linkedinLink} target="_blank" rel="noreferrer">
                  {CONTACT.linkedinDisplay}
                </a>
              </p>
            </div>
            <div>
              <p className={styles.cLabel}>Folio</p>
              <p className={styles.cValue}>
                <a href="/work">Études de cas</a>
                <br />
                <a href="/recrutement/folio.pptx" download>
                  Folio PPTX
                </a>
              </p>
            </div>
          </div>

          <div className={styles.foot}>
            <span>Alexandre Djengue · Directeur Artistique</span>
            <span>CDI · Temps plein · Yaoundé · Douala · Abidjan · 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
}
