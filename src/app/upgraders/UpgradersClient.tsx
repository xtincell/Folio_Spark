'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/upgraders.module.css';
import { Terminal } from './Terminal';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { BlogCard } from '@/components/folio/upgraders/BlogCard';
import type { BlogPost } from '@/lib/wordpress';
import { useLang, pick, type Bi } from '@/lib/i18n';

/* ============================================================================
   UPgraders — page agence, contenu bilingue (Bi) résolu côté client.
   Le shell serveur (page.tsx) fournit les derniers posts du blog.
   ========================================================================== */

type AdveLetter = { code: string; name: Bi; desc: Bi };

const ADVE: AdveLetter[] = [
  {
    code: 'A',
    name: { fr: 'Authenticité', en: 'Authenticity' },
    desc: {
      fr: "L'ADN, archéologie de la marque, ce qui ne peut appartenir qu'à elle.",
      en: "The DNA, the brand's archaeology — what can only belong to it.",
    },
  },
  {
    code: 'D',
    name: { fr: 'Distinction', en: 'Distinction' },
    desc: {
      fr: 'La rupture visuelle et conceptuelle qui brise le scroll.',
      en: 'The visual and conceptual rupture that breaks the scroll.',
    },
  },
  {
    code: 'V',
    name: { fr: 'Valeur', en: 'Value' },
    desc: {
      fr: 'L’utilité économique et culturelle. Chaque pixel sert un KPI.',
      en: 'Economic and cultural utility. Every pixel serves a KPI.',
    },
  },
  {
    code: 'E',
    name: { fr: 'Engagement', en: 'Engagement' },
    desc: {
      fr: "Le lien : transformer l'attention en communauté, en croyance.",
      en: 'The bond: turning attention into community, into belief.',
    },
  },
];

const RTIS: AdveLetter[] = [
  {
    code: 'R',
    name: { fr: 'Risk', en: 'Risk' },
    desc: {
      fr: "Le SWOT déduit du socle ADVE — taillé dans l'ADN, pas générique.",
      en: 'The SWOT derived from the ADVE foundation — cut from the DNA, not generic.',
    },
  },
  {
    code: 'T',
    name: { fr: 'Track', en: 'Track' },
    desc: {
      fr: 'Étude de marché vs ADVE + Risk. La piste devient lisible.',
      en: 'Market study vs ADVE + Risk. The track becomes legible.',
    },
  },
  {
    code: 'I',
    name: { fr: 'Innovation', en: 'Innovation' },
    desc: {
      fr: 'Toutes les actions activables — produits, campagnes, formats, rituels.',
      en: 'Every actionable move — products, campaigns, formats, rituals.',
    },
  },
  {
    code: 'S',
    name: { fr: 'Stratégie', en: 'Strategy' },
    desc: {
      fr: 'Roadmap dynamique, hiérarchisée, qui apprend du cycle.',
      en: 'A dynamic, prioritised roadmap that learns from the cycle.',
    },
  },
];

type LafRow = { num: string; name: Bi; desc: Bi };
const LAFUSEE_ROWS: LafRow[] = [
  {
    num: '01',
    name: { fr: 'Brief intelligent', en: 'Smart brief' },
    desc: {
      fr: 'Le brief client devient une fiche ADVE pré-remplie, validée en atelier.',
      en: 'The client brief becomes a pre-filled ADVE sheet, validated in a workshop.',
    },
  },
  {
    num: '02',
    name: { fr: 'Audit de risque', en: 'Risk audit' },
    desc: {
      fr: "Le pilier R génère un SWOT taillé dans l'ADN, pas un copier-coller.",
      en: 'The R pillar generates a SWOT cut from the DNA, not a copy-paste.',
    },
  },
  {
    num: '03',
    name: { fr: 'Cartographie', en: 'Mapping' },
    desc: {
      fr: "Track + Innovation produisent l'éventail d'actions activables, hiérarchisées.",
      en: 'Track + Innovation produce the prioritised range of actionable moves.',
    },
  },
  {
    num: '04',
    name: { fr: 'Roadmap dynamique', en: 'Dynamic roadmap' },
    desc: {
      fr: 'La Stratégie se réajuste à chaque cycle. Pas un plan figé — un système qui apprend.',
      en: 'Strategy readjusts each cycle. Not a frozen plan — a system that learns.',
    },
  },
  {
    num: '05',
    name: { fr: 'Console unique', en: 'Single console' },
    desc: {
      fr: "Brief, arbitrage, livrable. L'humain garde la décision. Toujours.",
      en: 'Brief, arbitration, deliverable. Humans keep the decision. Always.',
    },
  },
];

type DirectionCard = {
  role: Bi;
  roleColor?: 'coral';
  name: Bi | string;
  tag: Bi;
  desc: Bi;
  /** Portrait 4:5 — photo réelle, ou placeholder monogramme à remplacer. */
  img?: string;
  imgAlt?: Bi;
};

const DIRECTION: DirectionCard[] = [
  {
    role: { fr: 'Co-fondateur · CEO', en: 'Co-founder · CEO' },
    roleColor: 'coral',
    name: 'Alexandre « Xtincell » Djengue',
    tag: {
      fr: 'Stratège · Photographe · Vidéaste · Designer',
      en: 'Strategist · Photographer · Filmmaker · Designer',
    },
    desc: {
      fr: "Co-fondateur (2017), CEO depuis 2023. Direction générale et créative : pilote la méthode ADVE/RTIS, l'OS LaFusée, et la Guilde. Opère aussi en mission — l'image, le motion, la DA quand le brief le demande.",
      en: 'Co-founder (2017), CEO since 2023. General and creative direction: steers the ADVE/RTIS method, the LaFusée OS, and the Guild. Also operates in the field — image, motion, art direction when the brief calls for it.',
    },
    img: '/portrait.jpg',
    imgAlt: {
      fr: 'Alexandre « Xtincell » Djengue — portrait',
      en: 'Alexandre “Xtincell” Djengue — portrait',
    },
  },
  {
    role: { fr: 'Co-fondatrice', en: 'Co-founder' },
    name: 'Ingrid Nya Ngatchou',
    tag: { fr: 'Former CEO', en: 'Former CEO' },
    desc: {
      fr: "Co-fondatrice (2017) et ancienne CEO — m'a passé le relais en 2023. Architecte des premières années : positionnement, structuration, premières grandes missions. Éminence stratégique.",
      en: 'Co-founder (2017) and former CEO — handed me the reins in 2023. Architect of the early years: positioning, structuring, first major missions. Strategic éminence grise.',
    },
    img: '/upgraders/direction/ingrid-nya-ngatchou.svg',
    imgAlt: {
      fr: 'Ingrid Nya Ngatchou — portrait à venir',
      en: 'Ingrid Nya Ngatchou — portrait coming soon',
    },
  },
  {
    role: { fr: 'Co-fondateur', en: 'Co-founder' },
    name: 'Jean-Philippe Veigne',
    tag: { fr: 'Former CEO', en: 'Former CEO' },
    desc: {
      fr: "Co-fondateur (2017) et ancien CEO. Pilier des opérations historiques. Reste une référence dans la gouvernance et la trajectoire long terme de l'agence.",
      en: 'Co-founder (2017) and former CEO. Pillar of the historic operations. Remains a reference in the governance and long-term trajectory of the firm.',
    },
    img: '/upgraders/direction/jean-philippe-veigne.svg',
    imgAlt: {
      fr: 'Jean-Philippe Veigne — portrait à venir',
      en: 'Jean-Philippe Veigne — portrait coming soon',
    },
  },
];

const GUILDE: DirectionCard[] = [
  {
    role: {
      fr: 'Photographe · Vidéaste · Designer',
      en: 'Photographer · Filmmaker · Designer',
    },
    name: 'Alexandre « Xtincell » Djengue',
    tag: { fr: 'CEO + actif sur le terrain', en: 'CEO + active in the field' },
    desc: {
      fr: "Quand le brief le demande, je porte aussi l'objectif et les calques. La direction n'est jamais déconnectée du métier.",
      en: 'When the brief calls for it, I also carry the lens and the layers. Direction is never disconnected from the craft.',
    },
  },
  {
    role: { fr: 'Photographe', en: 'Photographer' },
    name: 'Stéphane Nounamo',
    tag: { fr: 'Surnom : « Student Photographer »', en: 'A.k.a. “Student Photographer”' },
    desc: {
      fr: 'Photographe de la Guilde, animé à Friends Studio en binôme avec moi. Notre œil portrait et événementiel : Orange Excellence, ANAFOOT, concerts, cinéma.',
      en: 'Guild photographer, running Friends Studio in a duo with me. Our portrait and event eye: Orange Excellence, ANAFOOT, concerts, cinema.',
    },
  },
  {
    role: { fr: 'Illustration', en: 'Illustration' },
    name: 'Annick',
    tag: { fr: 'Illustratrice', en: 'Illustrator' },
    desc: {
      fr: "Illustration éditoriale et univers de marque. Convoquée quand l'ADVE d'une marque demande un trait, pas une photo.",
      en: 'Editorial illustration and brand worlds. Summoned when a brand’s ADVE calls for a line, not a photo.',
    },
  },
  {
    role: { fr: 'Photographe', en: 'Photographer' },
    name: 'Paulhan',
    tag: { fr: 'Photographe', en: 'Photographer' },
    desc: {
      fr: 'Photographe partenaire — second œil, format complémentaire à Stéphane sur les missions à grosse couverture.',
      en: 'Partner photographer — a second eye, complementary to Stéphane on heavy-coverage missions.',
    },
  },
  {
    role: { fr: 'Cellule production', en: 'Production cell' },
    name: 'Friends Studio',
    tag: { fr: 'Studio audiovisuel', en: 'Audiovisual studio' },
    desc: {
      fr: 'Studio de production audiovisuel. Notre partenaire exécution privilégié — quand UPgraders stratégise, Friends Studio capte. Akwa Palace, Oceanis Kribi, Maison Gimane, Orange.',
      en: 'Audiovisual production studio. Our preferred execution partner — when UPgraders strategises, Friends Studio shoots. Akwa Palace, Oceanis Kribi, Maison Gimane, Orange.',
    },
  },
  {
    role: { fr: 'Network ouvert', en: 'Open network' },
    name: { fr: '+ membres de la Guilde', en: '+ Guild members' },
    tag: { fr: 'Convocation à la mission', en: 'Summoned per mission' },
    desc: {
      fr: "Devs, motion designers, copywriters, sound designers, agences spécialisées. Notre carnet d'adresses se densifie à chaque cycle ADVE/RTIS — une marque, une cellule sur mesure.",
      en: 'Devs, motion designers, copywriters, sound designers, specialist agencies. Our address book gets denser with every ADVE/RTIS cycle — one brand, one bespoke cell.',
    },
  },
];

type TimelineRow = { year: string; eventBefore?: Bi; eventBold?: Bi; eventAfter?: Bi };
const TIMELINE: TimelineRow[] = [
  {
    year: '2017',
    eventBold: { fr: "Fondation d'UPgraders", en: 'UPgraders is founded' },
    eventAfter: {
      fr: ' par Ingrid Nya Ngatchou, Jean-Philippe Veigne et Alexandre « Xtincell » Djengue. Cabinet de conseil & stratégie créative à Douala.',
      en: ' by Ingrid Nya Ngatchou, Jean-Philippe Veigne and Alexandre “Xtincell” Djengue. Creative consulting & strategy firm in Douala.',
    },
  },
  {
    year: '2019',
    eventBefore: { fr: 'Lancement ', en: 'Launch of ' },
    eventBold: { fr: 'Motion19', en: 'Motion19' },
    eventAfter: {
      fr: ' — projet structurant : 30 mois de brand build, e-commerce, programme communautaire « Aventurier ».',
      en: ' — a structuring project: 30 months of brand build, e-commerce, the “Aventurier” community programme.',
    },
  },
  {
    year: '2020',
    eventAfter: {
      fr: 'Premières prestations en marque blanche pour des agences relais (Her Media, OmenKart, Bimstr).',
      en: 'First white-label assignments for relay agencies (Her Media, OmenKart, Bimstr).',
    },
  },
  {
    year: '2022',
    eventBefore: { fr: 'Formalisation de la ', en: 'Formalisation of the ' },
    eventBold: { fr: 'méthode ADVE/RTIS', en: 'ADVE/RTIS method' },
    eventAfter: {
      fr: ' comme IP UPgraders. Socle ADVE + propulseur RTIS.',
      en: ' as UPgraders IP. ADVE foundation + RTIS propellant.',
    },
  },
  {
    year: '2023',
    eventBefore: { fr: 'Ingrid passe le relais : ', en: 'Ingrid hands over: ' },
    eventBold: { fr: 'Alexandre devient CEO', en: 'Alexandre becomes CEO' },
    eventAfter: {
      fr: '. Consolidation du binôme Friends Studio avec Stéphane Nounamo — comptes Orange, Cimencam, Chococam.',
      en: '. Consolidation of the Friends Studio duo with Stéphane Nounamo — Orange, Cimencam, Chococam accounts.',
    },
  },
  {
    year: '2024',
    eventBefore: { fr: 'Premières briques de ', en: 'First building blocks of ' },
    eventBold: { fr: 'LaFusée', en: 'LaFusée' },
    eventAfter: {
      fr: ' — automatisation ADVE/RTIS. KOF, Studio44, Maison Gimane, Oceanis Kribi.',
      en: ' — ADVE/RTIS automation. KOF, Studio44, Maison Gimane, Oceanis Kribi.',
    },
  },
  {
    year: '2025',
    eventBefore: {
      fr: 'Directeur Créatif & Artistique chez ',
      en: 'Creative & Art Director at ',
    },
    eventBold: { fr: 'MATANGA Agency', en: 'MATANGA Agency' },
    eventAfter: {
      fr: ", en parallèle de la direction d'UPgraders. Ingrid et Jean-Philippe restent en éminences.",
      en: ', alongside running UPgraders. Ingrid and Jean-Philippe remain éminences grises.',
    },
  },
  {
    year: '2026',
    eventAfter: {
      fr: "Industrialisation de LaFusée. Ouverture de l'IP ADVE/RTIS aux marques en accompagnement long.",
      en: 'Industrialisation of LaFusée. The ADVE/RTIS IP opens up to brands on long-term engagements.',
    },
  },
];

/* --------------------------------------------------------------- chrome --- */
const T = {
  heroTag: { fr: 'Conseil & stratégie · depuis 2017', en: 'Consulting & strategy · since 2017' },
  heroTagline1: { fr: 'La passion', en: 'Passion' },
  heroTagline2: { fr: ' pour propulseur.', en: ' as the propellant.' },
  heroClaimA: { fr: "Conciergerie de l'industrie créative ", en: 'Concierge of the creative industry — ' },
  heroClaimB: { fr: 'Afrique de l’Ouest & Centrale', en: 'West & Central Africa' },
  heroClaimC: {
    fr: 'Cabinet de conseil & stratégie qui orchestre un réseau de freelances et d’agences partenaires pour bâtir des ',
    en: 'A consulting & strategy firm orchestrating a network of freelancers and partner agencies to build ',
  },
  heroClaimD: { fr: 'cultes de marque', en: 'brand cults' },
  founded: { fr: 'Fondée', en: 'Founded' },
  hq: { fr: 'Siège', en: 'HQ' },
  hqV: { fr: 'Douala · Cameroun', en: 'Douala · Cameroon' },
  ceo: { fr: 'CEO', en: 'CEO' },
  ip: { fr: 'IP', en: 'IP' },
  ipV: { fr: 'Méthode ADVE/RTIS', en: 'ADVE/RTIS method' },
  s01: { fr: 'Méthode propriétaire', en: 'Proprietary method' },
  advLede1: { fr: 'Notre IP. Une méthode en deux temps : un ', en: 'Our IP. A method in two stages: a ' },
  advLedeSocle: { fr: 'socle', en: 'foundation' },
  advLede2: {
    fr: " qui définit l'identité de la marque, un ",
    en: ' that defines the brand’s identity, and a ',
  },
  advLedeProp: { fr: 'propulseur', en: 'propellant' },
  advLede3: {
    fr: ' qui la met en mouvement. Le tout réexécutable, versionnable, automatisable — c’est ce qui permet à LaFusée de tourner.',
    en: ' that sets it in motion. All of it re-runnable, versionable, automatable — that is what keeps LaFusée turning.',
  },
  socleTag: { fr: 'Socle · ADVE', en: 'Foundation · ADVE' },
  socleTitleA: { fr: 'L’', en: 'The ' },
  socleTitleEm: { fr: 'identité', en: 'identity' },
  socleSubA: { fr: 'Ce que la marque ', en: 'What the brand ' },
  socleSubB: { fr: 'est', en: 'is' },
  socleSubC: { fr: ', en propre.', en: ', in its own right.' },
  propTag: { fr: 'Propulseur · RTIS', en: 'Propellant · RTIS' },
  propTitleA: { fr: 'L’', en: 'The ' },
  propTitleEm: { fr: 'action', en: 'action' },
  propSubA: { fr: 'Comment la marque ', en: 'How the brand ' },
  propSubB: { fr: 'se déploie', en: 'deploys' },
  propSubC: { fr: '.', en: '.' },
  advFlowFoot: {
    fr: "SOCLE — L'IDENTITÉ ║ PROPULSEUR — L'ACTION",
    en: 'FOUNDATION — IDENTITY ║ PROPELLANT — ACTION',
  },
  s02: { fr: 'OS interne', en: 'Internal OS' },
  lafLede1: {
    fr: "Le logiciel propriétaire d'UPgraders. Un OS de gestion d'industrie créative qui automatise la méthode ADVE/RTIS — extraction d'ADN, audit de risque, cartographie d'innovations, roadmap dynamique. ",
    en: 'UPgraders’ proprietary software. A creative-industry OS that automates the ADVE/RTIS method — DNA extraction, risk audit, innovation mapping, dynamic roadmap. ',
  },
  lafLedeB: {
    fr: "L'IA booste la méthode ; elle ne la remplace pas.",
    en: 'AI boosts the method; it does not replace it.',
  },
  s03: { fr: 'Direction', en: 'Leadership' },
  dirTitleA: { fr: 'L’équipe ', en: 'The team ' },
  dirTitleEm: { fr: 'derrière', en: 'behind' },
  dirTitleB: { fr: ' UPgraders.', en: ' UPgraders.' },
  dirLede: {
    fr: "Une histoire de passage de relais. UPgraders est née en 2017 d'une vision partagée — aujourd'hui, je porte la suite, avec mes co-fondateurs en éminences toujours présentes.",
    en: 'A story of handing over the baton. UPgraders was born in 2017 from a shared vision — today I carry it forward, with my co-founders as ever-present éminences grises.',
  },
  s04: { fr: 'Le réseau', en: 'The network' },
  guildTitleA: { fr: 'La ', en: 'The ' },
  guildTitleEm: { fr: 'Guilde', en: 'Guild' },
  guildLede1: {
    fr: "UPgraders n'a pas une équipe figée — elle compose la cellule juste pour chaque mission à partir de ",
    en: 'UPgraders has no frozen team — it composes the right cell for each mission from ',
  },
  guildLedeB: { fr: 'La Guilde', en: 'the Guild' },
  guildLede2: {
    fr: " : son réseau de freelances et d'agences partenaires, couvrant tous les métiers de l'industrie créative.",
    en: ': its network of freelancers and partner agencies, covering every craft of the creative industry.',
  },
  s05: { fr: 'Trajectoire', en: 'Trajectory' },
  tlTitleA: { fr: 'Depuis ', en: 'Since ' },
  s06: { fr: 'Travailler avec nous', en: 'Work with us' },
  svcTitleA: { fr: 'Trois ', en: 'Three ' },
  svcTitleEm: { fr: 'portes', en: 'doors' },
  svcTitleB: { fr: ' d’entrée.', en: ' in.' },
  svcAll: { fr: 'Voir tous les services', en: 'See all services' },
  svc1Title: { fr: 'Audit ', en: 'Audit ' },
  svc1Em: 'ADVE',
  svc1Tag: { fr: '2 à 4 semaines', en: '2 to 4 weeks' },
  svc1Desc: {
    fr: "Trois ateliers pour extraire l'ADN. Livrable structuré qui sert de boussole pour 18 mois minimum.",
    en: 'Three workshops to extract the DNA. A structured deliverable that serves as a compass for at least 18 months.',
  },
  svc1Price: { fr: 'Porte d’entrée standard', en: 'Standard entry door' },
  svc2Title: { fr: 'Mandat ', en: 'Mandate ' },
  svc2Em: 'RTIS',
  svc2Tag: { fr: '6 à 24 mois', en: '6 to 24 months' },
  svc2Desc: {
    fr: 'Le cycle complet : ADVE en entrée, propulseur RTIS en exécution. Roadmap dynamique, cellule sur mesure.',
    en: 'The full cycle: ADVE going in, RTIS propellant in execution. Dynamic roadmap, bespoke cell.',
  },
  svc2Price: { fr: 'Marques cultes — formule reine', en: 'Cult brands — the flagship formula' },
  svc3Title: { fr: 'Marque ', en: 'White ' },
  svc3Em: { fr: 'blanche', en: 'label' },
  svc3Tag: { fr: 'Agences relais & studios', en: 'Relay agencies & studios' },
  svc3Desc: {
    fr: 'Vous portez la relation client, nous portons la méthode. Sous-traitance stratégique.',
    en: 'You own the client relationship, we carry the method. Strategic subcontracting.',
  },
  svc3Price: { fr: 'B2B partenaires', en: 'B2B partners' },
  s07: { fr: 'Notes de cabinet', en: 'Field notes' },
  blogTitleA: { fr: 'Le ', en: 'The ' },
  blogTitleEm: { fr: 'blog', en: 'blog' },
  blogAll: { fr: 'Tous les articles', en: 'All articles' },
} satisfies Record<string, Bi | string>;

export function UpgradersClient({ latestPosts }: { latestPosts: BlogPost[] }) {
  const { lang } = useLang();
  const t = (v: Bi | string) => pick(v, lang);

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="home" />

      <main id="contenu">
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroTag}>{t(T.heroTag)}</div>
              <h1 className={styles.heroTitle}>
                <b>UP</b>
                <em>graders</em>
              </h1>
              <p className={styles.heroTagline}>
                <b>{t(T.heroTagline1)}</b>
                {t(T.heroTagline2)}
              </p>
              <p className={styles.heroClaim}>
                {t(T.heroClaimA)}
                <b>{t(T.heroClaimB)}</b>.
                <br />
                {t(T.heroClaimC)}
                <b>{t(T.heroClaimD)}</b>.
              </p>
              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>{t(T.founded)}</span>
                  <span className={styles.heroMetaVal}>2017</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>{t(T.hq)}</span>
                  <span className={styles.heroMetaVal}>{t(T.hqV)}</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>{t(T.ceo)}</span>
                  <span className={styles.heroMetaVal}>Alexandre Djengue</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <span className={styles.heroMetaKey}>{t(T.ip)}</span>
                  <span className={styles.heroMetaVal}>{t(T.ipV)}</span>
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
            <span>{t(T.s01)}</span>
          </div>
          <h2 className={styles.secTitle}>
            ADVE<em>/RTIS</em>
          </h2>
          <p className={styles.secLede}>
            {t(T.advLede1)}
            <b>{t(T.advLedeSocle)}</b>
            {t(T.advLede2)}
            <b>{t(T.advLedeProp)}</b>
            {t(T.advLede3)}
          </p>

          <div className={styles.advCosmo}>
            <div className={`${styles.advHalf} ${styles.advHalfSocle}`}>
              <div className={styles.advHalfTag}>{t(T.socleTag)}</div>
              <h3 className={styles.advHalfTitle}>
                {t(T.socleTitleA)}
                <em>{t(T.socleTitleEm)}</em>
              </h3>
              <div className={styles.advHalfSub}>
                {t(T.socleSubA)}
                <b>{t(T.socleSubB)}</b>
                {t(T.socleSubC)}
              </div>
              <div className={styles.advLetters}>
                {ADVE.map((l) => (
                  <div className={styles.advLetter} key={l.code}>
                    <div className={styles.advLetterCode}>{l.code}</div>
                    <div className={styles.advLetterName}>{t(l.name)}</div>
                    <div className={styles.advLetterDesc}>{t(l.desc)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.advHalf} ${styles.advHalfPropulseur}`}>
              <div className={styles.advHalfTag}>{t(T.propTag)}</div>
              <h3 className={styles.advHalfTitle}>
                {t(T.propTitleA)}
                <em>{t(T.propTitleEm)}</em>
              </h3>
              <div className={styles.advHalfSub}>
                {t(T.propSubA)}
                <b>{t(T.propSubB)}</b>
                {t(T.propSubC)}
              </div>
              <div className={styles.advLetters}>
                {RTIS.map((l) => (
                  <div className={styles.advLetter} key={l.code}>
                    <div className={styles.advLetterCode}>{l.code}</div>
                    <div className={styles.advLetterName}>{t(l.name)}</div>
                    <div className={styles.advLetterDesc}>{t(l.desc)}</div>
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
            {t(T.advFlowFoot)}
          </div>
        </div>
      </section>

      {/* LAFUSÉE */}
      <section className={`${styles.sec} ${styles.lafusee}`}>
        <div className={styles.container}>
          <div className={styles.secHead}>
            <span className={styles.secNum}>02</span>
            <span>{t(T.s02)}</span>
          </div>
          <h2 className={styles.secTitle}>
            La<em>Fusée</em>
          </h2>
          <p className={styles.secLede}>
            {t(T.lafLede1)}
            <b>{t(T.lafLedeB)}</b>
          </p>

          <div className={styles.lafGrid}>
            <div className={styles.lafStack}>
              {LAFUSEE_ROWS.map((row) => (
                <div className={styles.lafRow} key={row.num}>
                  <div className={styles.lafRowNum}>{row.num}</div>
                  <div>
                    <div className={styles.lafRowName}>{t(row.name)}</div>
                    <div className={styles.lafRowDesc}>{t(row.desc)}</div>
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
            <span>{t(T.s03)}</span>
          </div>
          <h2 className={styles.secTitle}>
            {t(T.dirTitleA)}
            <em>{t(T.dirTitleEm)}</em>
            {t(T.dirTitleB)}
          </h2>
          <p className={styles.secLede}>{t(T.dirLede)}</p>

          <div className={styles.reseauGrid}>
            {DIRECTION.map((c, i) => (
              <div className={styles.reseauCard} key={i}>
                {c.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={styles.reseauPortrait}
                    src={c.img}
                    alt={c.imgAlt ? t(c.imgAlt) : t(c.name)}
                    width={640}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <div
                  className={styles.reseauRole}
                  style={c.roleColor === 'coral' ? { color: 'var(--coral)' } : undefined}
                >
                  {t(c.role)}
                </div>
                <h3 className={styles.reseauName}>{t(c.name)}</h3>
                <div className={styles.reseauTag}>{t(c.tag)}</div>
                <p className={styles.reseauDesc}>{t(c.desc)}</p>
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
            <span>{t(T.s04)}</span>
          </div>
          <h2 className={styles.secTitle}>
            {t(T.guildTitleA)}
            <em>{t(T.guildTitleEm)}</em>.
          </h2>
          <p className={styles.secLede}>
            {t(T.guildLede1)}
            <b>{t(T.guildLedeB)}</b>
            {t(T.guildLede2)}
          </p>

          <div className={styles.reseauGrid}>
            {GUILDE.map((c, i) => (
              <div className={styles.reseauCard} key={i}>
                <div className={styles.reseauRole}>{t(c.role)}</div>
                <h3 className={styles.reseauName}>{t(c.name)}</h3>
                <div className={styles.reseauTag}>{t(c.tag)}</div>
                <p className={styles.reseauDesc}>{t(c.desc)}</p>
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
            <span>{t(T.s05)}</span>
          </div>
          <h2 className={styles.secTitle}>
            {t(T.tlTitleA)}
            <em>2017</em>.
          </h2>

          <div className={styles.timeline}>
            {TIMELINE.map((row) => (
              <div className={styles.timelineRow} key={row.year}>
                <div className={styles.timelineYear}>{row.year}</div>
                <div className={styles.timelineEvent}>
                  {row.eventBefore ? t(row.eventBefore) : null}
                  {row.eventBold ? <b>{t(row.eventBold)}</b> : null}
                  {row.eventAfter ? t(row.eventAfter) : null}
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
                <span>{t(T.s06)}</span>
              </div>
              <h2 className={styles.secTitle}>
                {t(T.svcTitleA)}
                <em>{t(T.svcTitleEm)}</em>
                {t(T.svcTitleB)}
              </h2>
            </div>
            <Link href="/upgraders/services" className={styles.teaserLink}>
              <span>{t(T.svcAll)}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className={styles.services}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>01</div>
              <h3 className={styles.serviceTitle}>
                {t(T.svc1Title)}
                <em>{T.svc1Em}</em>
              </h3>
              <div className={styles.serviceTag}>{t(T.svc1Tag)}</div>
              <p className={styles.serviceDesc}>{t(T.svc1Desc)}</p>
              <div className={styles.servicePrice}>
                <b>{t(T.svc1Price)}</b>
              </div>
            </div>
            <div className={`${styles.serviceCard} ${styles.featured}`}>
              <div className={styles.serviceNum}>02</div>
              <h3 className={styles.serviceTitle}>
                {t(T.svc2Title)}
                <em>{T.svc2Em}</em>
              </h3>
              <div className={styles.serviceTag}>{t(T.svc2Tag)}</div>
              <p className={styles.serviceDesc}>{t(T.svc2Desc)}</p>
              <div className={styles.servicePrice}>
                <b>{t(T.svc2Price)}</b>
              </div>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceNum}>03</div>
              <h3 className={styles.serviceTitle}>
                {t(T.svc3Title)}
                <em>{t(T.svc3Em)}</em>
              </h3>
              <div className={styles.serviceTag}>{t(T.svc3Tag)}</div>
              <p className={styles.serviceDesc}>{t(T.svc3Desc)}</p>
              <div className={styles.servicePrice}>
                <b>{t(T.svc3Price)}</b>
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
                  <span>{t(T.s07)}</span>
                </div>
                <h2 className={styles.secTitle}>
                  {t(T.blogTitleA)}
                  <em>{t(T.blogTitleEm)}</em>.
                </h2>
              </div>
              <Link href="/upgraders/blog" className={styles.teaserLink}>
                <span>{t(T.blogAll)}</span>
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

      </main>
      <SiteFooter />
    </div>
  );
}
