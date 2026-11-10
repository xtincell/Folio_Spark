'use client';

import { PageIndex } from '@/components/studio/PageIndex';
import { StudioFooter } from '@/components/studio/Studio';
import pageStudio from '@/styles/studioPages.module.css';

import Link from 'next/link';
import styles from '@/styles/tech.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { useLang, pick, type Bi } from '@/lib/i18n';

/* ============================================================================
   Tech Folio — Alexandre « Xtincell » Djengue
   ----------------------------------------------------------------------------
   A companion to /cv: the product-design and tool-building side of the
   practice. Structured content lives bilingually here (Bi fields) and is
   resolved with pick(value, lang); shared chrome (topbar, lang toggle, social)
   reuses the folio components.
   ========================================================================== */

type BiOrStr = Bi | string;

const T = {
  eyebrowA: { fr: 'Outils & expériences', en: 'Tools & experiments' },
  eyebrowB: { fr: 'Alexandre Djengue · Xtincell', en: 'Alexandre Djengue · Xtincell' },
  tag: {
    fr: "Quand le travail demande un outil, j’aime comprendre comment le construire.",
    en: 'When the work calls for a tool, I like understanding how to build it.',
  },
  role: { fr: 'Pratique', en: 'Practice' },
  roleV: {
    fr: 'Conception produit · UX/UI · Développement assisté par IA',
    en: 'Product conception · UX/UI · AI-assisted development',
  },
  base: { fr: 'Base', en: 'Based in' },
  baseV: { fr: 'Douala · à distance', en: 'Douala · remote' },
  scope: { fr: 'Terrain', en: 'Scope' },
  scopeV: { fr: 'Sites, produits & outils de travail', en: 'Websites, products & working tools' },
} satisfies Record<string, Bi>;

type Section = { num: string; a: Bi; b: Bi };
const S = {
  approach: { num: '§ 01', a: { fr: 'Approche', en: 'Approach' }, b: { fr: 'partir du travail réel', en: 'start with the work' } },
  process: { num: '§ 02', a: { fr: 'Questions', en: 'Questions' }, b: { fr: 'avant de construire', en: 'before building' } },
  builds: { num: '§ 03', a: { fr: 'Projets', en: 'Projects' }, b: { fr: 'des états différents', en: 'at different stages' } },
  stack: { num: '§ 04', a: { fr: 'Moyens', en: 'Tools' }, b: { fr: 'ce que je mobilise', en: 'what I work with' } },
  collaboration: { num: '§ 05', a: { fr: 'Collaboration', en: 'Collaboration' }, b: { fr: 'travailler ensemble', en: 'working together' } },
} satisfies Record<string, Section>;

const APPROACH_LEDE: Bi = {
  fr: "Je viens des <em>télécommunications &amp; réseaux</em>. Ce réflexe est resté : comprendre les flux, les dépendances et ce qui bloque. La conception produit et le développement assisté par IA prolongent aujourd’hui mon travail de directeur créatif. Certains projets répondent à un besoin professionnel ; d’autres me servent à explorer une idée.",
  en: 'My background is in <em>telecommunications &amp; networks</em>. That habit stayed with me: understanding flows, dependencies and what gets in the way. Product design and AI-assisted development now extend my creative practice. Some projects address a professional need; others let me explore an idea.',
};

type Pillar = { k: BiOrStr; t: Bi; d: Bi };
const PILLARS: Pillar[] = [
  {
    k: { fr: 'LE BESOIN', en: 'THE NEED' },
    t: { fr: 'Un problème que je peux nommer', en: 'A problem I can name' },
    d: {
      fr: 'Briefs dispersés, versions à comparer, décisions à retrouver : La Barre part de situations rencontrées dans le travail créatif. Le besoin doit rester lisible derrière l’outil.',
      en: 'Scattered briefs, versions to compare, decisions to find: La Barre starts from situations encountered in creative work. The need should remain visible behind the tool.',
    },
  },
  {
    k: { fr: 'LE PÉRIMÈTRE', en: 'THE SCOPE' },
    t: { fr: 'Comprendre la chaîne, partager le travail', en: 'Understand the chain, share the work' },
    d: {
      fr: 'Je peux relier conception, interface et réalisation. Selon le projet, mon rôle est de concevoir, d’intégrer ou de superviser ; les parties qui demandent une expertise complémentaire se construisent avec des spécialistes.',
      en: 'I can connect conception, interface and implementation. Depending on the project, I design, integrate or supervise; parts that need complementary expertise are built with specialists.',
    },
  },
  {
    k: { fr: 'LA SUITE', en: 'WHAT FOLLOWS' },
    t: { fr: 'Compter aussi l’entretien', en: 'Account for maintenance too' },
    d: {
      fr: 'Une interface qui fonctionne demande encore des vérifications, du suivi et parfois une reprise. Je distingue ce qui est en ligne, ce qui est interne et ce qui reste en construction.',
      en: 'A functioning interface still needs checks, follow-up and sometimes rework. I distinguish what is online, what is internal and what remains under construction.',
    },
  },
];

type Decision = { k: Bi; t: Bi; d: Bi; href?: string; linkLabel?: Bi };
const DECISIONS: Decision[] = [
  {
    k: { fr: 'USAGE', en: 'USE' },
    t: { fr: 'Quel geste doit devenir plus simple ?', en: 'What should become easier to do?' },
    d: {
      fr: 'Dans La Barre, le point de départ est la revue d’une création avec son brief, sa version et ses retours. C’est ce geste que l’interface doit rendre plus lisible.',
      en: 'For La Barre, the starting point is reviewing an asset with its brief, version and feedback. That is the action the interface needs to make clearer.',
    },
    href: '/work/la-barre',
    linkLabel: { fr: 'Le cas La Barre', en: 'The La Barre case study' },
  },
  {
    k: { fr: 'CHOIX', en: 'CHOICE' },
    t: { fr: 'Faut-il vraiment créer un nouvel outil ?', en: 'Does this need a new tool?' },
    d: {
      fr: 'Un outil existant, une règle de travail ou une petite automatisation peuvent suffire. Un produit supplémentaire a un coût de fabrication et d’entretien ; il doit répondre à un besoin assez précis pour le justifier.',
      en: 'An existing tool, a working rule or a small automation may be enough. Another product adds building and maintenance work; the need should be specific enough to justify it.',
    },
  },
  {
    k: { fr: 'RÔLE', en: 'ROLE' },
    t: { fr: 'Quelle partie du travail est la mienne ?', en: 'Which part of the work is mine?' },
    d: {
      fr: 'Superviser une plateforme, concevoir une interface et développer un produit sont des responsabilités différentes. Les fiches ci-dessous précisent mon intervention, notamment la supervision du e-commerce Motion19 et de Shakazz.',
      en: 'Supervising a platform, designing an interface and developing a product are different responsibilities. The entries below state my contribution, including supervision of the Motion19 e-commerce platform and Shakazz.',
    },
    href: '#projets',
    linkLabel: { fr: 'Voir les périmètres', en: 'See the contributions' },
  },
  {
    k: { fr: 'CONTINUITÉ', en: 'CONTINUITY' },
    t: { fr: 'Que reste-t-il à faire fonctionner ensemble ?', en: 'What still needs to work together?' },
    d: {
      fr: 'Shinkiro relie une méthode et plusieurs outils. Les échanges automatiques entre ses produits restent à construire. Une refonte ou une mise en ligne est une étape ; elle ne prouve pas encore un usage durable.',
      en: 'Shinkiro connects a method and several tools. Automated exchanges between its products remain to be built. A redesign or a launch is a stage; it does not yet prove sustained use.',
    },
  },
];

type BuildGroup = 'online' | 'ongoing' | 'internal';
const BUILD_GROUPS: { id: BuildGroup; title: Bi; description: Bi }[] = [
  { id: 'online', title: { fr: 'Sites & outils en ligne', en: 'Websites & tools online' }, description: { fr: 'Des projets présentés en ligne, avec des rôles de conception, de réalisation ou de supervision distincts.', en: 'Projects presented online, with distinct design, implementation or supervision roles.' } },
  { id: 'ongoing', title: { fr: 'Prototypes & travaux en cours', en: 'Prototypes & work in progress' }, description: { fr: 'Refonte, Android en cours, Preview ou Beta : le statut de chaque projet indique l’étape présentée.', en: 'Redesign, Android in progress, Preview or Beta: each project’s status identifies the stage shown.' } },
  { id: 'internal', title: { fr: 'Outils internes & expériences', en: 'Internal tools & experiments' }, description: { fr: 'Outils de suivi, automatisations et petites applications conçus au fil de mes activités.', en: 'Tracking tools, automations and small applications that grew out of my work.' } },
];

type Build = {
  name: BiOrStr;
  group: BuildGroup;
  tone: 'live' | 'wip' | 'internal';
  status: Bi;
  role: Bi;
  desc: Bi;
  stack: string[];
  href?: string;
  linkLabel: Bi;
  thumb?: string;
  /** Single glyph used when no screenshot exists (internal tools). */
  glyph?: string;
};

const BUILDS: Build[] = [
  {
    name: 'La Barre / Shinkiro',
    group: 'ongoing',
    tone: 'wip',
    status: { fr: 'Refonte UX/UI · 2026', en: 'UX/UI redesign · 2026' },
    role: { fr: 'Conception produit · UX/UI · Développement assisté par IA', en: 'Product conception · UX/UI · AI-assisted development' },
    desc: {
      fr: 'Un outil conçu à partir du suivi des briefs, des versions et des retours dans mon travail de directeur créatif. La refonte organise la revue par pièce. La Barre appartient à Shinkiro ; les échanges automatiques entre ses produits restent à construire. L’illustration présente un schéma conceptuel, pas une capture.',
      en: 'A tool built around briefs, versions and feedback in my creative-direction work. The redesign organises asset-by-asset review. La Barre is part of Shinkiro; automated exchanges between its products remain to be built. The illustration is a conceptual diagram, not a screenshot.',
    },
    stack: ['Product design', 'UX/UI', 'JavaScript', 'CSS', 'Local-first'],
    href: '/work/la-barre',
    linkLabel: { fr: 'Lire le cas La Barre', en: 'Read the La Barre case study' },
    thumb: '/studio/la-barre.svg',
  },
  {
    name: 'Galahad',
    group: 'online',
    tone: 'live',
    status: { fr: 'En ligne · 2026', en: 'Live · 2026' },
    role: { fr: 'Framework multi-agent IA · Architecture & dev', en: 'Multi-agent AI framework · Architecture & build' },
    desc: {
      fr: "Framework multi-agent IA auto-hébergé. Quatre rôles — orchestration, protection, recherche et développement — partagent une mémoire et délèguent du code via un bridge Claude. Le projet comprend une configuration Docker Compose, un script d’installation et une interface Telegram.",
      en: 'A self-hosted multi-agent AI framework. Four roles — orchestration, protection, research and development — share memory and delegate code through a Claude bridge. The project includes a Docker Compose configuration, an installation script and a Telegram interface.',
    },
    stack: ['AI Agents', 'Multi-agent', 'Self-hosted', 'Docker', 'Framework'],
    href: 'https://galahad.powerupgraders.com',
    linkLabel: { fr: 'galahad.powerupgraders.com', en: 'galahad.powerupgraders.com' },
    glyph: '⬡',
  },
  {
    name: 'BanaHealth',
    group: 'online',
    tone: 'live',
    status: { fr: 'En ligne', en: 'Live' },
    role: { fr: 'Site web · Direction artistique · Visuels', en: 'Website · Art direction · Visuals' },
    desc: {
      fr: "Conception et développement du site de l'entreprise sud-africaine BanaHealth, avec la direction artistique et les visuels pour leur communication.",
      en: 'Design and development of the website for South-African company BanaHealth, plus the art direction and visuals for their communications.',
    },
    stack: ['Web', 'Design', 'DA', 'Healthcare'],
    href: 'https://banahealth.care',
    linkLabel: { fr: 'banahealth.care', en: 'banahealth.care' },
    thumb: '/tech/banahealth.jpg',
  },
  {
    name: 'Motion19',
    group: 'online',
    tone: 'live',
    status: { fr: 'En ligne · suivi', en: 'Live · ongoing' },
    role: { fr: 'E-commerce · Identité de marque · Consultant', en: 'E-commerce · Brand identity · Consultant' },
    desc: {
      fr: "Supervision de la création de la plateforme e-commerce, création de toute l'identité de marque et pilotage de la vie de la marque pendant plusieurs années. Toujours consultant technique aujourd'hui.",
      en: 'Supervised the build of the e-commerce platform, created the entire brand identity and steered the brand for several years. Still acting as technical consultant today.',
    },
    stack: ['E-commerce', 'Branding', 'Consulting'],
    href: 'https://motion19.com',
    linkLabel: { fr: 'motion19.com', en: 'motion19.com' },
    thumb: '/tech/motion19.jpg',
  },
  {
    name: 'Spawt',
    group: 'ongoing',
    tone: 'wip',
    status: { fr: 'En cours · Android', en: 'WIP · Android' },
    role: { fr: 'Application mobile · Conception & dev', en: 'Mobile app · Design & build' },
    desc: {
      fr: "Application de découverte culinaire en cours de développement sur Android. Le lien ci-dessous mène à la page du quiz de lancement (la « meute »), distincte de l’application.",
      en: 'A food-discovery app in development for Android. The link below leads to the launch-quiz page (the “meute”), separate from the app.',
    },
    stack: ['Mobile', 'Android', 'Product', 'Landing'],
    href: 'https://spawt-meute-quiz.pages.dev',
    linkLabel: { fr: 'spawt-meute-quiz.pages.dev', en: 'spawt-meute-quiz.pages.dev' },
    thumb: '/tech/spawt.jpg',
  },
  {
    name: 'Shakazz',
    group: 'ongoing',
    tone: 'live',
    status: { fr: 'Preview', en: 'Preview' },
    role: { fr: 'Plateforme web · Supervision technique', en: 'Web platform · Technical supervision' },
    desc: {
      fr: 'Supervision du développement de la plateforme web Shakazz, de la conception au déploiement.',
      en: 'Supervised the development of the Shakazz web platform, from design through to deployment.',
    },
    stack: ['Web app', 'Platform', 'Supervision'],
    href: 'https://shakazz-web-app.vercel.app',
    linkLabel: { fr: 'shakazz-web-app.vercel.app', en: 'shakazz-web-app.vercel.app' },
    thumb: '/tech/shakazz.jpg',
  },
  {
    name: 'LaFusée',
    group: 'ongoing',
    tone: 'wip',
    status: { fr: 'Beta', en: 'Beta' },
    role: { fr: 'SaaS · Agences & freelances', en: 'SaaS · Agencies & freelancers' },
    desc: {
      fr: "Produit en Beta pensé pour les agences et les free-lances, issu des besoins d’UPgraders et de la méthode ADVE/RTIS.",
      en: 'A product in Beta for agencies and freelancers, originating in UPgraders’ needs and the ADVE/RTIS method.',
    },
    stack: ['SaaS', 'Product', 'Automation'],
    href: 'https://lafusee-app.vercel.app',
    linkLabel: { fr: 'lafusee-app.vercel.app', en: 'lafusee-app.vercel.app' },
    thumb: '/tech/lafusee.jpg',
  },
  {
    name: 'MATANGA',
    group: 'internal',
    tone: 'internal',
    status: { fr: 'Interne', en: 'Internal' },
    role: { fr: 'Suivi de projet · Outil sur-mesure', en: 'Project tracking · Bespoke tool' },
    desc: {
      fr: "Création d'une plateforme de suivi de projet pour MATANGA Agency (siège Cameroun), conçue pour les besoins de mon rôle de directeur créatif.",
      en: 'Built a project-tracking platform for MATANGA Agency (HQ Cameroon), tailored to the needs of my creative-director role.',
    },
    stack: ['Internal tool', 'Project mgmt', 'Agency'],
    linkLabel: { fr: 'Outil interne', en: 'Internal tool' },
    glyph: '◑',
  },
  {
    name: { fr: 'Outils digitaux', en: 'Digital tools' },
    group: 'internal',
    tone: 'internal',
    status: { fr: 'Divers', en: 'Various' },
    role: { fr: 'Petits outils sur-mesure', en: 'Bespoke micro-tools' },
    desc: {
      fr: "Des petits outils digitaux en tout genre, conçus au fil des besoins de mes activités — automatisations, calculateurs, micro-apps.",
      en: 'All kinds of small digital tools, built as my work demanded them — automations, calculators, micro-apps.',
    },
    stack: ['Tooling', 'Automation', 'Micro-apps'],
    linkLabel: { fr: 'Sur demande', en: 'On request' },
    glyph: '⋯',
  },
];

type SkillRow = { label: Bi; meta: Bi };
type SkillBlock = { title: Bi; rows: SkillRow[] };
const STACK: SkillBlock[] = [
  {
    title: { fr: 'Conception', en: 'Design' },
    rows: [
      { label: { fr: 'Cahier des charges', en: 'Specs & scoping' }, meta: { fr: 'périmètre', en: 'scope' } },
      { label: { fr: 'Design systems', en: 'Design systems' }, meta: { fr: 'cohérence', en: 'consistency' } },
      { label: { fr: 'UI / UX & webdesign', en: 'UI / UX & web design' }, meta: { fr: 'quotidien', en: 'daily' } },
      { label: { fr: 'Figma · Suite Adobe', en: 'Figma · Adobe Suite' }, meta: { fr: 'quotidien', en: 'daily' } },
    ],
  },
  {
    title: { fr: 'Build & web', en: 'Build & web' },
    rows: [
      { label: { fr: 'Sites & web apps', en: 'Sites & web apps' }, meta: { fr: 'livré', en: 'shipped' } },
      { label: { fr: 'E-commerce', en: 'E-commerce' }, meta: { fr: 'Motion19', en: 'Motion19' } },
      { label: { fr: 'Apps mobiles', en: 'Mobile apps' }, meta: { fr: 'Android', en: 'Android' } },
      { label: { fr: 'Landing & micro-apps', en: 'Landing & micro-apps' }, meta: { fr: 'selon le besoin', en: 'as needed' } },
    ],
  },
  {
    title: { fr: 'Infra & ops', en: 'Infra & ops' },
    rows: [
      { label: { fr: 'Vercel · Cloudflare Pages', en: 'Vercel · Cloudflare Pages' }, meta: { fr: 'déploiement', en: 'deploy' } },
      { label: { fr: 'Télécom & réseaux', en: 'Telecom & networks' }, meta: { fr: 'formation', en: 'trained' } },
      { label: { fr: 'Sécurité & maintenance', en: 'Security & maintenance' }, meta: { fr: 'socle', en: 'foundation' } },
      { label: { fr: 'Git · suivi de projet', en: 'Git · project tracking' }, meta: { fr: 'quotidien', en: 'daily' } },
    ],
  },
  {
    title: { fr: 'Méthode & IA', en: 'Method & AI' },
    rows: [
      { label: { fr: 'ADVE/RTIS', en: 'ADVE/RTIS' }, meta: { fr: 'UPgraders', en: 'UPgraders' } },
      { label: { fr: 'Développement assisté par IA', en: 'AI-assisted development' }, meta: { fr: 'UPgraders', en: 'UPgraders' } },
      { label: { fr: 'Direction → exécution', en: 'Direction → execution' }, meta: { fr: 'continuité', en: 'continuity' } },
      { label: { fr: 'Consulting technique', en: 'Technical consulting' }, meta: { fr: 'continu', en: 'ongoing' } },
    ],
  },
];

export function TechClient() {
  const { lang } = useLang();
  const tr = (v: BiOrStr): string => pick(v, lang);

  return (
    <div className={`${styles.folioRoot} ${pageStudio.root}`}>
      <FolioTopbar active="tech" />

      <main id="contenu" className={styles.page}>
        <section className={styles.head} id="profil">
          <div>
            <div className={styles.eyebrow}>
              {tr(T.eyebrowA)} · <b>{tr(T.eyebrowB)}</b> · 2026
            </div>
            <div className={styles.actions} data-print-hide="true">
              <a className={styles.pdfBtn} href="/tech.pdf" download="Alexandre-Djengue-Tech.pdf">
                {lang === 'fr' ? 'Archive tech · PDF' : 'Tech archive · PDF'} ↓
              </a>
              <Link className={styles.ghostBtn} href="/cv">
                {lang === 'fr' ? 'Voir le CV éditorial' : 'See the editorial résumé'} →
              </Link>
            </div>
            <h1 className={styles.name}>
              {lang === 'fr' ? 'Outils' : 'Tools'} <em>{lang === 'fr' ? '& expériences.' : '& experiments.'}</em>
            </h1>
            <p className={styles.tag}>{tr(T.tag)}</p>
          </div>
          <dl className={styles.meta}>
            <dt>{tr(T.role)}</dt>
            <dd>{tr(T.roleV)}</dd>
            <dt>{tr(T.base)}</dt>
            <dd>{tr(T.baseV)}</dd>
            <dt>{tr(T.scope)}</dt>
            <dd>
              <b>{tr(T.scopeV)}</b>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
            <dt>WhatsApp</dt>
            <dd>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
                {CONTACT.whatsappDisplay}
              </a>
            </dd>
            <dt>Web</dt>
            <dd>{CONTACT.handle} · {lang === 'fr' ? 'partout' : 'everywhere'}</dd>
          </dl>
        </section>
        <PageIndex items={[{ id: 'approche', fr: 'Approche', en: 'Approach' }, { id: 'processus', fr: 'Questions', en: 'Questions' }, { id: 'projets', fr: 'Projets & statuts', en: 'Projects & status' }, { id: 'stack', fr: 'Outils', en: 'Tools' }, { id: 'offre', fr: 'Travailler ensemble', en: 'Working together' }]} />

        {/* § 01 — Approach */}
        <section className={styles.section} id="approche">
          <h2 className={styles.sectionHead} style={{ margin: 0, fontWeight: 400 }}>
            <span className="num">{S.approach.num}</span>
            {tr(S.approach.a)}
            <span className="title">{tr(S.approach.b)}</span>
          </h2>
          <div className={styles.sectionBody}>
            <p className={styles.lede} dangerouslySetInnerHTML={{ __html: tr(APPROACH_LEDE) }} />
            <ul className={styles.pillars}>
              {PILLARS.map((p) => (
                <li key={tr(p.k)}>
                  <span className="k">{tr(p.k)}</span>
                  <span>
                    <span className="t">{tr(p.t)}</span>
                    <span className="d">{tr(p.d)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* § 02 — Process */}
        <section className={styles.section} id="processus">
          <h2 className={styles.sectionHead} style={{ margin: 0, fontWeight: 400 }}>
            <span className="num">{S.process.num}</span>
            {tr(S.process.a)}
            <span className="title">{tr(S.process.b)}</span>
          </h2>
          <div className={styles.sectionBody}>
            <ul className={styles.pillars}>
              {DECISIONS.map((question) => (
                <li key={tr(question.k)}>
                  <span className="k">{tr(question.k)}</span>
                  <span>
                    <span className="t">{tr(question.t)}</span>
                    <span className="d">{tr(question.d)}</span>
                    {question.href && question.linkLabel && (
                      <Link className={styles.projectLink} href={question.href}>
                        {tr(question.linkLabel)} →
                      </Link>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* § 03 — Builds */}
        <section className={styles.section} id="projets">
          <h2 className={styles.sectionHead} style={{ margin: 0, fontWeight: 400 }}>
            <span className="num">{S.builds.num}</span>
            {tr(S.builds.a)}
            <span className="title">{tr(S.builds.b)}</span>
          </h2>
          <div className={styles.sectionBody}>
            {BUILD_GROUPS.map((group) => (
              <section key={group.id} aria-labelledby={`group-${group.id}`} style={{ marginBottom: 48 }}>
                <h3 id={`group-${group.id}`} className={styles.projectName}>{tr(group.title)}</h3>
                <p className={styles.projectDesc} style={{ margin: '14px 0 24px' }}>{tr(group.description)}</p>
                <div className={styles.projects}>
                  {BUILDS.filter((b) => b.group === group.id).map((b) => (
                    <article className={styles.project} key={tr(b.name)}>
                      <div className={styles.thumb} data-placeholder={b.thumb ? undefined : 'true'}>
                        {b.thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={b.thumb}
                            alt={b.name === 'La Barre / Shinkiro' ? (lang === 'fr' ? 'La Barre — schéma conceptuel, pas une capture du logiciel' : 'La Barre — conceptual diagram, not a software screenshot') : `${tr(b.name)} — ${lang === 'en' ? 'preview' : 'aperçu'}`}
                            loading="lazy"
                          />
                        ) : (
                          <span aria-hidden="true">{b.glyph ?? '◆'}</span>
                        )}
                        <span className={styles.badge} data-tone={b.tone}>
                          {tr(b.status)}
                        </span>
                      </div>
                      <div className={styles.projectTop}>
                        <h4 className={styles.projectName}>{tr(b.name)}</h4>
                      </div>
                      <span className={styles.projectRole}>{tr(b.role)}</span>
                      <p className={styles.projectDesc}>{tr(b.desc)}</p>
                      <div className={styles.projectStack}>
                        {b.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                      {b.href ? (
                        <a className={styles.projectLink} href={b.href} target={b.href.startsWith('/') ? undefined : '_blank'} rel={b.href.startsWith('/') ? undefined : 'noreferrer'}>
                          {tr(b.linkLabel)} ↗
                        </a>
                      ) : (
                        <span className={styles.projectLinkMuted}>{tr(b.linkLabel)}</span>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {/* § 04 — Stack */}
        <section className={styles.section} id="stack">
          <h2 className={styles.sectionHead} style={{ margin: 0, fontWeight: 400 }}>
            <span className="num">{S.stack.num}</span>
            {tr(S.stack.a)}
            <span className="title">{tr(S.stack.b)}</span>
          </h2>
          <div className={styles.sectionBody}>
            <div className={styles.skills}>
              {STACK.map((block) => (
                <div className={styles.skillBlock} key={tr(block.title)}>
                  <h4>{tr(block.title)}</h4>
                  <ul>
                    {block.rows.map((row) => (
                      <li key={tr(row.label)}>
                        <b>{tr(row.label)}</b>
                        <span>{tr(row.meta)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* § 05 — Collaboration */}
        <section className={styles.section} id="offre">
          <h2 className={styles.sectionHead} style={{ margin: 0, fontWeight: 400 }}>
            <span className="num">{S.collaboration.num}</span>
            {tr(S.collaboration.a)}
            <span className="title">{tr(S.collaboration.b)}</span>
          </h2>
          <div className={styles.sectionBody}>
            <p className={styles.lede}>
              {lang === 'fr'
                ? 'Un besoin à éclaircir, une interface à reprendre ou un projet à faire avancer ? On commence par le travail attendu et les moyens disponibles.'
                : 'A need to clarify, an interface to revisit or a project to move forward? We start with the work required and the resources available.'}
            </p>
            <p className={styles.projectDesc}>
              {lang === 'fr'
                ? 'Nous précisons mon rôle, les personnes à associer, le périmètre de réalisation et le suivi nécessaire. Le cadre de collaboration sert à rendre ces engagements explicites.'
                : 'We clarify my role, who else needs to be involved, the implementation scope and the follow-up required. The collaboration framework makes those commitments explicit.'}
            </p>
            <Link className={styles.pdfBtn} href="/tarifs" style={{ marginTop: 24 }}>
              {lang === 'fr' ? 'Travailler ensemble' : 'Working together'} →
            </Link>
          </div>
        </section>

        <div className={styles.socialRow}>
          <span className={styles.slLabel}>
            {CONTACT.handle} · {lang === 'fr' ? 'partout' : 'everywhere'}
          </span>
          <a className={styles.sbtn} href={CONTACT.instagram} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>Instagram</span>
          </a>
          <a className={styles.sbtn} href={CONTACT.behance} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M2 5h6.4c1.4 0 2.5.3 3.2.9.7.6 1 1.5 1 2.5 0 .7-.2 1.3-.5 1.7-.3.5-.8.8-1.4 1.1.8.2 1.5.6 1.9 1.2.4.6.7 1.3.7 2.2 0 1.3-.5 2.4-1.4 3.1-.9.7-2.1 1.1-3.7 1.1H2V5Zm2.5 5.6h3.2c.7 0 1.2-.1 1.6-.4.3-.3.5-.7.5-1.2 0-.6-.2-1-.5-1.2-.3-.3-.9-.4-1.6-.4H4.5v3.2Zm0 6.1h3.6c.7 0 1.3-.1 1.7-.4.4-.3.6-.8.6-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-1-.5-1.7-.5H4.5v3.7ZM18.3 17c.5 0 .9-.1 1.2-.4.3-.2.6-.6.7-1h2.3c-.2 1-.7 1.8-1.5 2.4-.8.6-1.7.9-2.8.9-1.4 0-2.5-.5-3.4-1.4-.9-.9-1.3-2.1-1.3-3.5 0-1.5.4-2.6 1.3-3.5.9-.9 2-1.4 3.4-1.4 1.4 0 2.5.5 3.3 1.4.8.9 1.2 2.1 1.2 3.6v.6h-6.6c.1.7.3 1.2.7 1.6.4.4.9.7 1.5.7Zm1.6-4.7c-.4-.4-.9-.6-1.5-.6-.6 0-1.1.2-1.4.6-.4.4-.6.9-.7 1.5h4.2c-.1-.6-.3-1.1-.6-1.5ZM15 6.5h5.4v1.7H15V6.5Z" />
            </svg>
            <span>Behance</span>
          </a>
          <a className={styles.sbtn} href={CONTACT.linkedinLink} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4V9Z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </main>
      <StudioFooter />
    </div>
  );
}
