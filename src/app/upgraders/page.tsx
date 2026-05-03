import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/upgraders.module.css';
import { Terminal } from './Terminal';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { BlogCard } from '@/components/folio/upgraders/BlogCard';
import { getBlogIndex } from '@/lib/wordpress';

type AdveLetter = { code: string; name: string; desc: string };

const ADVE: AdveLetter[] = [
  {
    code: 'A',
    name: 'Authenticité',
    desc: "L'ADN, archéologie de la marque, ce qui ne peut appartenir qu'à elle.",
  },
  {
    code: 'D',
    name: 'Distinction',
    desc: 'La rupture visuelle et conceptuelle qui brise le scroll.',
  },
  {
    code: 'V',
    name: 'Valeur',
    desc: 'L’utilité économique et culturelle. Chaque pixel sert un KPI.',
  },
  {
    code: 'E',
    name: 'Engagement',
    desc: "Le lien : transformer l'attention en communauté, en croyance.",
  },
];

const RTIS: AdveLetter[] = [
  {
    code: 'R',
    name: 'Risk',
    desc: "Le SWOT déduit du socle ADVE — taillé dans l'ADN, pas générique.",
  },
  {
    code: 'T',
    name: 'Track',
    desc: 'Étude de marché vs ADVE + Risk. La piste devient lisible.',
  },
  {
    code: 'I',
    name: 'Innovation',
    desc: 'Toutes les actions activables — produits, campagnes, formats, rituels.',
  },
  {
    code: 'S',
    name: 'Stratégie',
    desc: "Roadmap dynamique, hiérarchisée, qui apprend du cycle.",
  },
];

type LafRow = { num: string; name: string; desc: string };
const LAFUSEE_ROWS: LafRow[] = [
  {
    num: '01',
    name: 'Brief intelligent',
    desc: 'Le brief client devient une fiche ADVE pré-remplie, validée en atelier.',
  },
  {
    num: '02',
    name: 'Audit de risque',
    desc: "Le pilier R génère un SWOT taillé dans l'ADN, pas un copier-coller.",
  },
  {
    num: '03',
    name: 'Cartographie',
    desc: "Track + Innovation produisent l'éventail d'actions activables, hiérarchisées.",
  },
  {
    num: '04',
    name: 'Roadmap dynamique',
    desc: 'La Stratégie se réajuste à chaque cycle. Pas un plan figé — un système qui apprend.',
  },
  {
    num: '05',
    name: 'Console unique',
    desc: "Brief, arbitrage, livrable. L'humain garde la décision. Toujours.",
  },
];

type DirectionCard = {
  role: string;
  roleColor?: 'coral';
  name: string;
  tag: string;
  desc: string;
};

const DIRECTION: DirectionCard[] = [
  {
    role: 'CEO actuel',
    roleColor: 'coral',
    name: 'Alexandre « Xtincell » Djengue',
    tag: 'Stratège · Photographe · Vidéaste · Designer',
    desc:
      "Direction générale et créative. Pilote la méthode ADVE/RTIS, l'OS LaFusée, et la Guilde. Opère aussi en mission — l'image, le motion, la DA quand le brief le demande.",
  },
  {
    role: 'Co-fondatrice',
    name: 'Ingrid Nya Ngatchou',
    tag: 'Former CEO',
    desc:
      'Co-fondatrice (2017) et ancienne CEO. Architecte des premières années : positionnement, structuration, premières grandes missions. Éminence stratégique.',
  },
  {
    role: 'Co-fondateur',
    name: 'Jean-Philippe Veigne',
    tag: 'Former CEO',
    desc:
      "Co-fondateur (2017) et ancien CEO. Pilier des opérations historiques. Reste une référence dans la gouvernance et la trajectoire long terme de l'agence.",
  },
];

const GUILDE: DirectionCard[] = [
  {
    role: 'Photographe · Vidéaste · Designer',
    name: 'Alexandre « Xtincell » Djengue',
    tag: 'CEO + actif sur le terrain',
    desc:
      "Quand le brief le demande, je porte aussi l'objectif et les calques. La direction n'est jamais déconnectée du métier.",
  },
  {
    role: 'Photographe',
    name: 'Stéphane Nounamo',
    tag: 'Surnom : « Student Photographer »',
    desc:
      'Photographe de la Guilde, animé à Friends Studio en binôme avec moi. Notre œil portrait et événementiel : Orange Excellence, ANAFOOT, concerts, cinéma.',
  },
  {
    role: 'Illustration',
    name: 'Annick',
    tag: 'Illustratrice',
    desc:
      "Illustration éditoriale et univers de marque. Convoquée quand l'ADVE d'une marque demande un trait, pas une photo.",
  },
  {
    role: 'Photographe',
    name: 'Paulhan',
    tag: 'Photographe',
    desc:
      'Photographe partenaire — second œil, format complémentaire à Stéphane sur les missions à grosse couverture.',
  },
  {
    role: 'Cellule production',
    name: 'Friends Studio',
    tag: 'Studio audiovisuel',
    desc:
      'Studio de production audiovisuel. Notre partenaire exécution privilégié — quand UPgraders stratégise, Friends Studio capte. Akwa Palace, Oceanis Kribi, Maison Gimane, Orange.',
  },
  {
    role: 'Network ouvert',
    name: '+ membres de la Guilde',
    tag: 'Convocation à la mission',
    desc:
      "Devs, motion designers, copywriters, sound designers, agences spécialisées. Notre carnet d'adresses se densifie à chaque cycle ADVE/RTIS — une marque, une cellule sur mesure.",
  },
];

type TimelineRow = { year: string; eventBefore?: string; eventBold?: string; eventAfter?: string };
const TIMELINE: TimelineRow[] = [
  {
    year: '2017',
    eventBold: "Fondation d'UPgraders",
    eventAfter:
      ' par Ingrid Nya Ngatchou et Jean-Philippe Veigne. Cabinet de conseil & stratégie créative à Douala.',
  },
  {
    year: '2019',
    eventBefore: 'Lancement ',
    eventBold: 'Motion19',
    eventAfter:
      ' — projet structurant : 30 mois de brand build, e-commerce, programme communautaire « Aventurier ».',
  },
  {
    year: '2020',
    eventAfter:
      'Premières prestations en marque blanche pour des agences relais (Her Media, OmenKart, Bimstr).',
  },
  {
    year: '2022',
    eventBefore: 'Formalisation de la ',
    eventBold: 'méthode ADVE/RTIS',
    eventAfter: ' comme IP UPgraders. Socle ADVE + propulseur RTIS.',
  },
  {
    year: '2023',
    eventBefore: 'Consolidation du ',
    eventBold: 'binôme Friends Studio',
    eventAfter: ' avec Stéphane Nounamo. Comptes Orange, Cimencam, Chococam.',
  },
  {
    year: '2024',
    eventBefore: 'Premières briques de ',
    eventBold: 'LaFusée',
    eventAfter: ' — automatisation ADVE/RTIS. KOF, Studio44, Maison Gimane, Oceanis Kribi.',
  },
  {
    year: '2025',
    eventBold: 'Alexandre « Xtincell » Djengue',
    eventAfter:
      ' prend le relais comme CEO. Ingrid et Jean-Philippe restent en éminences. En parallèle : Directeur Créatif chez MATANGA Agency.',
  },
  {
    year: '2026',
    eventAfter:
      "Industrialisation de LaFusée. Ouverture de l'IP ADVE/RTIS aux marques en accompagnement long.",
  },
];

export default async function UpgradersPage() {
  const { posts: latestPosts } = await getBlogIndex({ perPage: 3 });

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="home" />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroTag}>Conseil &amp; stratégie · depuis 2017</div>
              <h1 className={styles.heroTitle}>
                <b>UP</b>
                <em>graders</em>
              </h1>
              <p className={styles.heroTagline}>
                <b>La passion</b> pour propulseur.
              </p>
              <p className={styles.heroClaim}>
                Conciergerie de l&apos;industrie créative <b>Afrique de l&apos;Ouest &amp; Centrale</b>.
                <br />
                Cabinet de conseil &amp; stratégie qui orchestre un réseau de freelances et
                d&apos;agences partenaires pour bâtir des <b>cultes de marque</b>.
              </p>
              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>Fondée</span>
                  <span className={styles.heroMetaVal}>2017</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>Siège</span>
                  <span className={styles.heroMetaVal}>Douala · Cameroun</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>CEO</span>
                  <span className={styles.heroMetaVal}>Alexandre Djengue</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>IP</span>
                  <span className={styles.heroMetaVal}>Méthode ADVE/RTIS</span>
                </div>
              </div>
            </div>
            <div className={styles.heroLogo}>
              <Image
                src="/upgraders-logo-full.png"
                alt="UPgraders — La passion pour propulseur"
                width={420}
                height={420}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ADVE/RTIS */}
      <section className={`${styles.sec} ${styles.advertis}`}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>01</span>
            <span>Méthode propriétaire</span>
          </div>
          <h2 className={styles.secTitle}>
            ADVE<em>/RTIS</em>
          </h2>
          <p className={styles.secLede}>
            Notre IP. Une méthode en deux temps : un <b>socle</b> qui définit l&apos;identité de la
            marque, un <b>propulseur</b> qui la met en mouvement. Le tout réexécutable,
            versionnable, automatisable — c&apos;est ce qui permet à LaFusée de tourner.
          </p>

          <div className={styles.advCosmo}>
            <div className={`${styles.advHalf} ${styles.advHalfSocle}`}>
              <div className={styles.advHalfTag}>Socle · ADVE</div>
              <h3 className={styles.advHalfTitle}>
                L&apos;<em>identité</em>
              </h3>
              <div className={styles.advHalfSub}>
                Ce que la marque <b>est</b>, en propre.
              </div>
              <div className={styles.advLetters}>
                {ADVE.map((l) => (
                  <div className={styles.advLetter} key={l.code}>
                    <div className={styles.advLetterCode}>{l.code}</div>
                    <div className={styles.advLetterName}>{l.name}</div>
                    <div className={styles.advLetterDesc}>{l.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.advHalf} ${styles.advHalfPropulseur}`}>
              <div className={styles.advHalfTag}>Propulseur · RTIS</div>
              <h3 className={styles.advHalfTitle}>
                L&apos;<em>action</em>
              </h3>
              <div className={styles.advHalfSub}>
                Comment la marque <b>se déploie</b>.
              </div>
              <div className={styles.advLetters}>
                {RTIS.map((l) => (
                  <div className={styles.advLetter} key={l.code}>
                    <div className={styles.advLetterCode}>{l.code}</div>
                    <div className={styles.advLetterName}>{l.name}</div>
                    <div className={styles.advLetterDesc}>{l.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.advFlow}>
            <b>A</b>
            <span className="arr">→</span>
            <b>D</b>
            <span className="arr">→</span>
            <b>V</b>
            <span className="arr">→</span>
            <b>E</b>
            <span className="arr"> ║ </span>
            <b>R</b>
            <span className="arr">→</span>
            <b>T</b>
            <span className="arr">→</span>
            <b>I</b>
            <span className="arr">→</span>
            <b>S</b>
            <br />
            SOCLE — L&apos;IDENTITÉ <span className="arr">║</span> PROPULSEUR — L&apos;ACTION
          </div>
        </div>
      </section>

      {/* LAFUSÉE */}
      <section className={`${styles.sec} ${styles.lafusee}`}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>02</span>
            <span>OS interne</span>
          </div>
          <h2 className={styles.secTitle}>
            La<em>Fusée</em>
          </h2>
          <p className={styles.secLede}>
            Le logiciel propriétaire d&apos;UPgraders. Un OS de gestion d&apos;industrie créative
            qui automatise la méthode ADVE/RTIS — extraction d&apos;ADN, audit de risque,
            cartographie d&apos;innovations, roadmap dynamique.{' '}
            <b>L&apos;IA booste la méthode ; elle ne la remplace pas.</b>
          </p>

          <div className={styles.lafGrid}>
            <div className={styles.lafStack}>
              {LAFUSEE_ROWS.map((row) => (
                <div className={styles.lafRow} key={row.num}>
                  <div className={styles.lafRowNum}>{row.num}</div>
                  <div>
                    <div className={styles.lafRowName}>{row.name}</div>
                    <div className={styles.lafRowDesc}>{row.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.lafTerminal}>
              <div className={styles.lafTermBar}>
                <span className={`${styles.lafTermDot} ${styles.lafTermDotR}`} />
                <span className={`${styles.lafTermDot} ${styles.lafTermDotY}`} />
                <span className={`${styles.lafTermDot} ${styles.lafTermDotG}`} />
                <span className={styles.lafTermTitle}>lafusee.os — session.live</span>
              </div>
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTION */}
      <section className={styles.sec}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>03</span>
            <span>Direction</span>
          </div>
          <h2 className={styles.secTitle}>
            L&apos;équipe <em>derrière</em> UPgraders.
          </h2>
          <p className={styles.secLede}>
            Une histoire de passage de relais. UPgraders est née en 2017 d&apos;une vision partagée
            — aujourd&apos;hui, je porte la suite, avec mes co-fondateurs en éminences toujours
            présentes.
          </p>

          <div className={styles.reseauGrid}>
            {DIRECTION.map((c) => (
              <div className={styles.reseauCard} key={c.name}>
                <div
                  className={styles.reseauRole}
                  style={c.roleColor === 'coral' ? { color: 'var(--coral)' } : undefined}
                >
                  {c.role}
                </div>
                <h3 className={styles.reseauName}>{c.name}</h3>
                <div className={styles.reseauTag}>{c.tag}</div>
                <p className={styles.reseauDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LA GUILDE */}
      <section className={`${styles.sec} ${styles.advertis}`}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>04</span>
            <span>Le réseau</span>
          </div>
          <h2 className={styles.secTitle}>
            La <em>Guilde</em>.
          </h2>
          <p className={styles.secLede}>
            UPgraders n&apos;a pas une équipe figée — elle compose la cellule juste pour chaque
            mission à partir de <b>La Guilde</b> : son réseau de freelances et d&apos;agences
            partenaires, couvrant tous les métiers de l&apos;industrie créative.
          </p>

          <div className={styles.reseauGrid}>
            {GUILDE.map((c) => (
              <div className={styles.reseauCard} key={c.name}>
                <div className={styles.reseauRole}>{c.role}</div>
                <h3 className={styles.reseauName}>{c.name}</h3>
                <div className={styles.reseauTag}>{c.tag}</div>
                <p className={styles.reseauDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className={styles.sec}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>05</span>
            <span>Trajectoire</span>
          </div>
          <h2 className={styles.secTitle}>
            Depuis <em>2017</em>.
          </h2>

          <div className={styles.timeline}>
            {TIMELINE.map((row) => (
              <div className={styles.timelineRow} key={row.year}>
                <div className={styles.timelineYear}>{row.year}</div>
                <div className={styles.timelineEvent}>
                  {row.eventBefore}
                  {row.eventBold ? <b>{row.eventBold}</b> : null}
                  {row.eventAfter}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className={`${styles.sec} ${styles.advertis}`}>
        <div className={styles.container}>
          <div className={styles.teaserHead}>
            <div>
              <div className={styles.secHead}>
                <span className={styles.secNum}>06</span>
                <span>Travailler avec nous</span>
              </div>
              <h2 className={styles.secTitle}>
                Trois <em>portes</em> d&apos;entrée.
              </h2>
            </div>
            <Link href="/upgraders/services" className={styles.teaserLink}>
              <span>Voir tous les services</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className={styles.services}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>01</div>
              <h3 className={styles.serviceTitle}>
                Audit <em>ADVE</em>
              </h3>
              <div className={styles.serviceTag}>2 à 4 semaines</div>
              <p className={styles.serviceDesc}>
                Trois ateliers pour extraire l&apos;ADN. Livrable structuré qui sert de boussole pour
                18 mois minimum.
              </p>
              <div className={styles.servicePrice}>
                <b>Porte d&apos;entrée standard</b>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.featured}`}>
              <div className={styles.serviceNum}>02</div>
              <h3 className={styles.serviceTitle}>
                Mandat <em>RTIS</em>
              </h3>
              <div className={styles.serviceTag}>6 à 24 mois</div>
              <p className={styles.serviceDesc}>
                Le cycle complet : ADVE en entrée, propulseur RTIS en exécution. Roadmap dynamique,
                cellule sur mesure.
              </p>
              <div className={styles.servicePrice}>
                <b>Marques cultes — formule reine</b>
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>03</div>
              <h3 className={styles.serviceTitle}>
                Marque <em>blanche</em>
              </h3>
              <div className={styles.serviceTag}>Agences relais &amp; studios</div>
              <p className={styles.serviceDesc}>
                Vous portez la relation client, nous portons la méthode. Sous-traitance stratégique.
              </p>
              <div className={styles.servicePrice}>
                <b>B2B partenaires</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG TEASER */}
      {latestPosts.length > 0 ? (
        <section className={styles.sec}>
          <div className={styles.container}>
            <div className={styles.teaserHead}>
              <div>
                <div className={styles.secHead}>
                  <span className={styles.secNum}>07</span>
                  <span>Notes de cabinet</span>
                </div>
                <h2 className={styles.secTitle}>
                  Le <em>blog</em>.
                </h2>
              </div>
              <Link href="/upgraders/blog" className={styles.teaserLink}>
                <span>Tous les articles</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className={styles.blogGrid}>
              {latestPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </div>
  );
}
