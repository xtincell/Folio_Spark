'use client';

import Link from 'next/link';
import styles from '@/styles/tech.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { FlameMark } from '@/components/folio/FlameMark';
import { SparkMark } from '@/components/folio/icons/SparkMark';
import { useLang, pick, type Bi } from '@/lib/i18n';

/* ============================================================================
   Tech Folio — Alexandre « Xtincell » Djengue
   ----------------------------------------------------------------------------
   A builder-facing companion to /cv: the engineering & product side of the
   practice. Structured content lives bilingually here (Bi fields) and is
   resolved with pick(value, lang); shared chrome (topbar, lang toggle, social)
   reuses the folio components.
   ========================================================================== */

type BiOrStr = Bi | string;

const T = {
  eyebrowA: { fr: 'Tech Folio', en: 'Tech Folio' },
  eyebrowB: { fr: 'Builder & consultant technique', en: 'Builder & technical consultant' },
  tag: {
    fr: "De l'idée à l'expérience — je conçois, je code, je livre.",
    en: 'From idea to experience — I design it, I build it, I ship it.',
  },
  role: { fr: 'Rôle', en: 'Role' },
  roleV: {
    fr: 'Concepteur produit · Webdesigner · Intégrateur',
    en: 'Product designer · Web designer · Builder',
  },
  base: { fr: 'Base', en: 'Base' },
  baseV: { fr: 'Yaoundé · Douala · Abidjan — remote', en: 'Yaoundé · Douala · Abidjan — remote' },
  rate: { fr: 'À partir de', en: 'From' },
  rateV: { fr: '1 000 € · projet clé en main', en: '€1,000 · turnkey project' },
} satisfies Record<string, Bi>;

type Section = { num: string; a: Bi; b: Bi };
const S = {
  approach: { num: '§ 01', a: { fr: 'Approche', en: 'Approach' }, b: { fr: "l'ingénieur derrière l'écran", en: 'the engineer behind the screen' } },
  process: { num: '§ 02', a: { fr: 'Process', en: 'Process' }, b: { fr: 'idée → expérience', en: 'idea → experience' } },
  builds: { num: '§ 03', a: { fr: 'Réalisations', en: 'Builds' }, b: { fr: 'ce que j’ai livré', en: 'what I have shipped' } },
  stack: { num: '§ 04', a: { fr: 'Stack', en: 'Stack' }, b: { fr: 'le coffre à outils', en: 'the toolbox' } },
  pricing: { num: '§ 05', a: { fr: 'Engagement', en: 'Engagement' }, b: { fr: '& tarifs', en: '& pricing' } },
} satisfies Record<string, Section>;

const APPROACH_LEDE: Bi = {
  fr: "Mes process de conception viennent d'un parcours en <em>télécommunications &amp; réseaux</em>, d'une formation en sécurité, d'une passion pour la maintenance, et d'un amour du design et du webdesign. Je ne vois pas un écran — je vois un système&nbsp;: des flux, des états, des points de défaillance. C'est ce qui me permet d'aller de l'idée jusqu'à l'expérience livrée.",
  en: 'My design process comes from a background in <em>telecommunications &amp; networks</em>, training in security, a passion for maintenance, and a love of design and web design. I don’t see a screen — I see a system: flows, states, failure points. That’s what lets me go from the idea all the way to the shipped experience.',
};

type Pillar = { k: BiOrStr; t: Bi; d: Bi };
const PILLARS: Pillar[] = [
  {
    k: 'T-SHAPED',
    t: { fr: 'Ingénieur × designer', en: 'Engineer × designer' },
    d: {
      fr: "La rigueur d'un réseau, l'œil d'un directeur artistique. Je modélise une marque comme un système d'information.",
      en: 'The rigour of a network, the eye of an art director. I model a brand like an information system.',
    },
  },
  {
    k: { fr: 'SÉCURITÉ', en: 'SECURITY' },
    t: { fr: 'Robustesse par défaut', en: 'Robust by default' },
    d: {
      fr: 'Formation sécurité & maintenance : je conçois pour la durée, pas pour la démo. Ce que je livre tient en production.',
      en: 'Security & maintenance background: I build for the long run, not the demo. What I ship holds up in production.',
    },
  },
  {
    k: 'END-TO-END',
    t: { fr: 'De la stratégie au pixel', en: 'From strategy to pixel' },
    d: {
      fr: 'Direction artistique, design system, écrans, intégration : une seule personne tient toute la chaîne, sans déperdition.',
      en: 'Art direction, design system, screens, integration: one person holds the whole chain, with nothing lost in handoff.',
    },
  },
];

type FlowStep = { t: Bi; d: Bi };
const FLOW: FlowStep[] = [
  {
    t: { fr: 'Idée & brainstorming', en: 'Idea & brainstorming' },
    d: {
      fr: "On part du problème, pas de la solution. Le brainstorming cadre l'intention, les usages, les contraintes.",
      en: 'We start from the problem, not the solution. Brainstorming frames the intent, the use cases, the constraints.',
    },
  },
  {
    t: { fr: 'Cahier des charges', en: 'Specification' },
    d: {
      fr: "Le brainstorming se transforme en cahier des charges : périmètre, parcours, exigences techniques. Tout est écrit avant la première maquette.",
      en: 'The brainstorm becomes a spec: scope, flows, technical requirements. Everything is written before the first mockup.',
    },
  },
  {
    t: { fr: 'Design system', en: 'Design system' },
    d: {
      fr: "Je conçois d'abord le système : couleurs, type, composants, règles. Les écrans en découlent, cohérents par construction.",
      en: 'I design the system first: colour, type, components, rules. Screens follow from it, coherent by construction.',
    },
  },
  {
    t: { fr: 'Écrans', en: 'Screens' },
    d: {
      fr: 'Les écrans sont assemblés depuis le système : maquettes haute-fidélité, états, responsive, micro-interactions.',
      en: 'Screens are assembled from the system: high-fidelity mockups, states, responsive, micro-interactions.',
    },
  },
  {
    t: { fr: 'Intégration & livraison', en: 'Integration & delivery' },
    d: {
      fr: 'Intégration, mise en ligne, et suivi. Je reste consultant technique sur les projets qui le demandent.',
      en: 'Integration, deployment, and follow-up. I stay on as technical consultant for the projects that need it.',
    },
  },
];

type Build = {
  name: BiOrStr;
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
    name: 'BanaHealth',
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
    tone: 'wip',
    status: { fr: 'En cours · Android', en: 'WIP · Android' },
    role: { fr: 'Application mobile · Conception & dev', en: 'Mobile app · Design & build' },
    desc: {
      fr: "Application mobile en cours de développement, bientôt disponible sur Android. Le lien ci-dessous est la landing du quiz de lancement (la « meute »).",
      en: 'Mobile app in active development, coming soon on Android. The link below is the launch-quiz landing page (the “meute”).',
    },
    stack: ['Mobile', 'Android', 'Product', 'Landing'],
    href: 'https://spawt-meute-quiz.pages.dev',
    linkLabel: { fr: 'spawt-meute-quiz.pages.dev', en: 'spawt-meute-quiz.pages.dev' },
    thumb: '/tech/spawt.jpg',
  },
  {
    name: 'Shakazz',
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
    tone: 'wip',
    status: { fr: 'Beta', en: 'Beta' },
    role: { fr: 'SaaS · Agences & freelances', en: 'SaaS · Agencies & freelancers' },
    desc: {
      fr: "Création d'un SaaS pensé pour les agences et les free-lances — l'OS interne d'UPgraders qui automatise la méthode ADVE/RTIS.",
      en: 'A SaaS built for agencies and freelancers — UPgraders’ internal OS that automates the ADVE/RTIS method.',
    },
    stack: ['SaaS', 'Product', 'Automation'],
    href: 'https://lafusee-app.vercel.app',
    linkLabel: { fr: 'lafusee-app.vercel.app', en: 'lafusee-app.vercel.app' },
    thumb: '/tech/lafusee.jpg',
  },
  {
    name: 'MATANGA',
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
      { label: { fr: 'Cahier des charges', en: 'Specs & scoping' }, meta: { fr: 'systématique', en: 'systematic' } },
      { label: { fr: 'Design systems', en: 'Design systems' }, meta: { fr: 'signature', en: 'signature' } },
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
      { label: { fr: 'Landing & micro-apps', en: 'Landing & micro-apps' }, meta: { fr: 'rapide', en: 'fast' } },
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
      { label: { fr: 'ADVE/RTIS', en: 'ADVE/RTIS' }, meta: { fr: 'propriétaire', en: 'proprietary' } },
      { label: { fr: 'Pipelines IA gouvernés', en: 'Governed AI pipelines' }, meta: { fr: 'UPgraders', en: 'UPgraders' } },
      { label: { fr: 'Direction → exécution', en: 'Direction → execution' }, meta: { fr: 'end-to-end', en: 'end-to-end' } },
      { label: { fr: 'Consulting technique', en: 'Technical consulting' }, meta: { fr: 'continu', en: 'ongoing' } },
    ],
  },
];

const PRICE_INCLUDES: Bi[] = [
  { fr: 'Cadrage : brainstorming → cahier des charges écrit.', en: 'Scoping: brainstorm → written specification.' },
  { fr: 'Design system + écrans haute-fidélité.', en: 'Design system + high-fidelity screens.' },
  { fr: 'Intégration, mise en ligne et recette.', en: 'Integration, deployment and QA.' },
  { fr: 'Suivi technique post-livraison sur demande.', en: 'Post-delivery technical follow-up on request.' },
];

export function TechClient() {
  const { lang } = useLang();
  const tr = (v: BiOrStr): string => pick(v, lang);

  return (
    <div className={styles.folioRoot}>
      <div className={styles.backdrop} aria-hidden="true">
        <SparkMark outline animated={false} ariaHidden />
      </div>
      <FolioTopbar active="tech" />

      <main id="contenu" className={styles.page}>
        <section className={styles.head}>
          <div>
            <div className={styles.eyebrow}>
              {tr(T.eyebrowA)} · <b>{tr(T.eyebrowB)}</b> · 2026
            </div>
            <div className={styles.actions} data-print-hide="true">
              <a className={styles.pdfBtn} href="/tech.pdf" download="Alexandre-Djengue-Tech.pdf">
                {lang === 'fr' ? 'Folio tech · PDF' : 'Tech folio · PDF'} ↓
              </a>
              <Link className={styles.ghostBtn} href="/cv">
                {lang === 'fr' ? 'Voir le CV éditorial' : 'See the editorial résumé'} →
              </Link>
            </div>
            <h1 className={styles.name}>
              Alexandre <em>Djengue</em>
            </h1>
            <p className={styles.tag}>{tr(T.tag)}</p>
          </div>
          <dl className={styles.meta}>
            <dt>{tr(T.role)}</dt>
            <dd>{tr(T.roleV)}</dd>
            <dt>{tr(T.base)}</dt>
            <dd>{tr(T.baseV)}</dd>
            <dt>{tr(T.rate)}</dt>
            <dd>
              <b>{tr(T.rateV)}</b>
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

        {/* § 01 — Approach */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{S.approach.num}</span>
            {tr(S.approach.a)}
            <span className="title">{tr(S.approach.b)}</span>
          </div>
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
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{S.process.num}</span>
            {tr(S.process.a)}
            <span className="title">{tr(S.process.b)}</span>
          </div>
          <div className={styles.sectionBody}>
            <ol className={styles.flow}>
              {FLOW.map((step) => (
                <li key={tr(step.t)}>
                  <div>
                    <span className="step-t">{tr(step.t)}</span>
                    <span className="step-d">{tr(step.d)}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* § 03 — Builds */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{S.builds.num}</span>
            {tr(S.builds.a)}
            <span className="title">{tr(S.builds.b)}</span>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.projects}>
              {BUILDS.map((b) => (
                <article className={styles.project} key={tr(b.name)}>
                  <div className={styles.thumb} data-placeholder={b.thumb ? undefined : 'true'}>
                    {b.thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.thumb} alt={`${tr(b.name)} — aperçu`} loading="lazy" />
                    ) : (
                      <span aria-hidden="true">{b.glyph ?? '◆'}</span>
                    )}
                    <span className={styles.badge} data-tone={b.tone}>
                      {tr(b.status)}
                    </span>
                  </div>
                  <div className={styles.projectTop}>
                    <h3 className={styles.projectName}>{tr(b.name)}</h3>
                  </div>
                  <span className={styles.projectRole}>{tr(b.role)}</span>
                  <p className={styles.projectDesc}>{tr(b.desc)}</p>
                  <div className={styles.projectStack}>
                    {b.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  {b.href ? (
                    <a className={styles.projectLink} href={b.href} target="_blank" rel="noreferrer">
                      {tr(b.linkLabel)} ↗
                    </a>
                  ) : (
                    <span className={styles.projectLinkMuted}>{tr(b.linkLabel)}</span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* § 04 — Stack */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{S.stack.num}</span>
            {tr(S.stack.a)}
            <span className="title">{tr(S.stack.b)}</span>
          </div>
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

        {/* § 05 — Engagement / pricing */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{S.pricing.num}</span>
            {tr(S.pricing.a)}
            <span className="title">{tr(S.pricing.b)}</span>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.pricing}>
              <div>
                <div className={styles.priceFrom}>{tr(T.rate)}</div>
                <div className={styles.priceBig}>
                  1 000 <em>€</em>
                </div>
                <div className={styles.priceUnit}>
                  {lang === 'fr' ? 'projet clé en main' : 'turnkey project'}
                </div>
              </div>
              <div>
                <ul className={styles.priceList}>
                  {PRICE_INCLUDES.map((item) => (
                    <li key={tr(item)}>{tr(item)}</li>
                  ))}
                </ul>
                <p className={styles.priceNote}>
                  {lang === 'fr'
                    ? 'Devis ajusté selon le périmètre. Consulting technique au forfait ou en continu.'
                    : 'Quote adjusted to scope. Technical consulting on a flat fee or ongoing basis.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.foot}>
          <FlameMark size={28} white />
          <div className="meta">XTINCELL · ALEXANDRE DJENGUE · © 2026</div>
          <a className="cta" href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
            {lang === 'fr' ? 'Discuter d’un projet' : 'Talk about a project'} — {CONTACT.whatsappDisplay} →
          </a>
        </footer>

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
    </div>
  );
}
