'use client';

import Image from 'next/image';
import styles from '@/styles/cv.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { useT, useLang, pick, type Bi } from '@/lib/i18n';

type TLEntry = {
  when: string;
  org: Bi;
  rolePrefix?: Bi;
  roleEm?: Bi;
  roleSuffix?: Bi;
  desc: Bi;
  tags?: string[];
};

const PARCOURS: TLEntry[] = [
  {
    when: '2025 — …',
    org: { fr: 'MATANGA Agency · Douala', en: 'MATANGA Agency · Douala' },
    rolePrefix: { fr: 'Directeur ', en: 'Creative & ' },
    roleEm: { fr: 'Créatif & Artistique', en: 'Art Director' },
    desc: {
      fr: "Responsable de la narration et de la cohérence des opérations clients. Coordination de l'équipe créative sur la production.",
      en: 'Responsible for the narrative and the coherence of client operations. Coordinating the creative team across production.',
    },
    tags: ['Creative direction', 'Brand narrative', 'Agency'],
  },
  {
    when: '2017 — …',
    org: { fr: 'UPgraders · Co-fondateur', en: 'UPgraders · Co-founder' },
    rolePrefix: { fr: 'Creative Group Head — ', en: 'Creative Group Head — ' },
    roleEm: { fr: 'CEO depuis 2023', en: 'CEO since 2023' },
    desc: {
      fr: "Studio créatif IA-first. Pipelines calibrés par marque, prompts-systèmes versionnés, console unique brief → arbitrage → livrable. Conseil + production pour marques premium d'Afrique centrale.",
      en: 'AI-first creative studio. Pipelines calibrated per brand, versioned system prompts, a single brief → arbitration → deliverable console. Consulting + production for premium Central-African brands.',
    },
    tags: ['Strategy', 'AI workflows', 'Brand systems'],
  },
  {
    when: '2023 — …',
    org: { fr: 'Friends Photography Studio · Douala', en: 'Friends Photography Studio · Douala' },
    rolePrefix: { fr: 'Responsable ', en: 'Head of ' },
    roleEm: { fr: "du développement d'activité", en: 'business development' },
    desc: {
      fr: "Pilotage commercial et créatif du studio : direction artistique, partenariats, prises de vue corporate et événementielles.",
      en: 'Commercial and creative steering of the studio: art direction, partnerships, corporate and event shoots.',
    },
    tags: ['Photo', 'Studio', 'Business dev'],
  },
  {
    when: '2021 — 2023',
    org: { fr: 'Motion19', en: 'Motion19' },
    rolePrefix: { fr: 'Brand Manager — ', en: 'Brand Manager — ' },
    roleEm: { fr: 'architecture branding', en: 'branding architecture' },
    desc: {
      fr: "Identification des besoins branding / comm / marketing, recrutement de l'équipe digitale (designer, community manager, social media, webdev), management de la production de contenu, suivi performance, respect planning et budget.",
      en: 'Identifying branding / comms / marketing needs, recruiting the digital team (designer, community manager, social media, web dev), managing content production, tracking performance, respecting schedule and budget.',
    },
    tags: ['Brand build', 'Go-to-market', 'E-commerce'],
  },
  {
    when: '2019 — 2021',
    org: { fr: 'Bimstr · Bimstr Agency', en: 'Bimstr · Bimstr Agency' },
    rolePrefix: { fr: 'Directeur artistique assistant & ', en: 'Assistant art director & ' },
    roleEm: { fr: 'graphiste', en: 'graphic designer' },
    desc: {
      fr: "Photographe événementiel, designer (visuels d'agence + identités clients : logo, charte, web), motion designer (vidéos pub, lyrics videos). Clients notables : IFC, Cible RH, SABC, Chococam (Tartina).",
      en: 'Event photographer, designer (agency visuals + client identities: logo, guidelines, web), motion designer (ad videos, lyric videos). Notable clients: IFC, Cible RH, SABC, Chococam (Tartina).',
    },
    tags: ['DA', 'Photo', 'Motion'],
  },
  {
    when: '2016 — 2022',
    org: { fr: 'Universal Music Africa · freelance', en: 'Universal Music Africa · freelance' },
    rolePrefix: { fr: 'Direction artistique & ', en: 'Art direction & ' },
    roleEm: { fr: "image d'artistes", en: 'artist imagery' },
    desc: {
      fr: 'DA & photo pour Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul. Covers, campagnes de sortie, contenus tournée.',
      en: 'Art direction & photography for Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul. Covers, release campaigns, tour content.',
    },
    tags: ['Music DA', 'Photo', 'Campaign'],
  },
  {
    when: '2014 — 2020',
    org: { fr: 'Chococam (Tiger Brands) · freelance', en: 'Chococam (Tiger Brands) · freelance' },
    rolePrefix: { fr: 'Production & ', en: 'Production & ' },
    roleEm: { fr: 'image de marque', en: 'brand imagery' },
    roleSuffix: { fr: ' — multi-références', en: ' — multi-reference' },
    desc: {
      fr: "Benny, Big Gum, Tartina, Matinal, Mambo. Photo produit, KV campagnes, gestion d'agence créative côté annonceur.",
      en: 'Benny, Big Gum, Tartina, Matinal, Mambo. Product photography, campaign key visuals, creative-agency management on the advertiser side.',
    },
    tags: ['FMCG', 'Photo produit', 'Campaign'],
  },
  {
    when: '2013 — 2018',
    org: { fr: 'Orange — via McCann', en: 'Orange — via McCann' },
    rolePrefix: { fr: 'Photographie campagnes — ', en: 'Campaign photography — ' },
    roleEm: { fr: 'binôme Friends Photography', en: 'Friends Photography duo' },
    desc: {
      fr: "Avec Stéphane Nounamo. Direction photo de campagnes locales et régionales pour l'opérateur télécom.",
      en: 'With Stéphane Nounamo. Photo direction for local and regional campaigns for the telecom operator.',
    },
    tags: ['Photo', 'Telco', 'Agency'],
  },
  {
    when: '2018',
    org: { fr: 'Studio Graphique 44 · Will & Brothers', en: 'Studio Graphique 44 · Will & Brothers' },
    rolePrefix: { fr: 'Creative Business Consultant + ', en: 'Creative Business Consultant + ' },
    roleEm: { fr: 'Business Developer', en: 'Business Developer' },
    desc: {
      fr: "Implémentation Studio44 (identité graphique, plan comptable, templates juridiques). Chez W&B : prospection, visuels de communication, contenus vidéo.",
      en: 'Standing up Studio44 (visual identity, chart of accounts, legal templates). At W&B: prospecting, communication visuals, video content.',
    },
    tags: ['Identity', 'Consulting', 'BD'],
  },
  {
    when: '2011 — 2016',
    org: { fr: 'Freelance · Graphiste / Webdesigner', en: 'Freelance · Graphic / Web designer' },
    rolePrefix: { fr: 'Activité ', en: 'Main ' },
    roleEm: { fr: 'principale', en: 'activity' },
    desc: {
      fr: "Approche associant culture, diversité et standards internationaux, dans des délais serrés. Cinq ans pour consolider les trois pratiques avant l'agence.",
      en: 'An approach blending culture, diversity and international standards, on tight deadlines. Five years to consolidate the three practices before the agency.',
    },
    tags: ['DA', 'Web', 'Freelance'],
  },
  {
    when: '2008 — 2013',
    org: { fr: 'Iftic-Sup · Yaoundé', en: 'Iftic-Sup · Yaoundé' },
    rolePrefix: { fr: 'Ingénieur des Travaux — ', en: 'Works Engineer — ' },
    roleEm: { fr: 'télécommunications & réseaux', en: 'telecommunications & networks' },
    desc: {
      fr: "Formation initiale qui informe encore aujourd'hui ma manière de modéliser une marque comme un système d'information. Bac D — Sciences (Collège Saint-Michel, 2008).",
      en: 'The foundational training that still shapes how I model a brand as an information system. Science baccalaureate (Collège Saint-Michel, 2008).',
    },
  },
];

type SkillRow = { label: Bi; meta: Bi };
type SkillBlock = { title: Bi; rows: SkillRow[] };

const yrs = (n: string): Bi => ({ fr: `${n} ans`, en: `${n} yrs` });

const SKILLS: SkillBlock[] = [
  {
    title: { fr: 'Stratégie & Marque', en: 'Strategy & Brand' },
    rows: [
      { label: { fr: 'Brand systems', en: 'Brand systems' }, meta: yrs('15') },
      { label: { fr: 'Méthode ADVE/RTIS', en: 'ADVE/RTIS method' }, meta: { fr: 'propriétaire', en: 'proprietary' } },
      { label: { fr: 'Go-to-market FMCG / DTC', en: 'Go-to-market FMCG / DTC' }, meta: yrs('12') },
      { label: { fr: 'Storytelling éditorial', en: 'Editorial storytelling' }, meta: yrs('8') },
    ],
  },
  {
    title: { fr: 'Direction artistique', en: 'Art direction' },
    rows: [
      { label: { fr: 'Direction photo & vidéo', en: 'Photo & video direction' }, meta: yrs('15') },
      { label: { fr: 'Identités visuelles', en: 'Visual identities' }, meta: yrs('15') },
      { label: { fr: "Direction d'image (musique)", en: 'Image direction (music)' }, meta: yrs('9') },
      { label: { fr: 'Scenography & events', en: 'Scenography & events' }, meta: yrs('6') },
    ],
  },
  {
    title: { fr: 'Exécution', en: 'Execution' },
    rows: [
      { label: { fr: 'Photographie', en: 'Photography' }, meta: { fr: 'natif', en: 'native' } },
      { label: { fr: 'Vidéo / motion', en: 'Video / motion' }, meta: yrs('12') },
      { label: { fr: 'Suite Adobe + Figma', en: 'Adobe Suite + Figma' }, meta: { fr: 'quotidien', en: 'daily' } },
      { label: { fr: "Direction d'équipe créa", en: 'Creative team leadership' }, meta: { fr: '7+ pers', en: '7+ people' } },
    ],
  },
  {
    title: { fr: 'Tech & IA', en: 'Tech & AI' },
    rows: [
      { label: { fr: 'Pipelines IA gouvernés', en: 'Governed AI pipelines' }, meta: { fr: 'UPgraders', en: 'UPgraders' } },
      { label: { fr: 'Shopify · Quanta Hive', en: 'Shopify · Quanta Hive' }, meta: { fr: 'opérationnel', en: 'operational' } },
      { label: { fr: 'Prompts-systèmes versionnés', en: 'Versioned system prompts' }, meta: { fr: 'signature', en: 'signature' } },
      { label: { fr: 'Notion · Linear · Git', en: 'Notion · Linear · Git' }, meta: { fr: 'quotidien', en: 'daily' } },
    ],
  },
];

const CLIENTS = [
  'Universal Music Africa',
  'Chococam · Tiger Brands',
  'Orange (via McCann)',
  'CIMENCAM',
  'IFC',
  'SABC',
  'Cible RH',
  'Her Media · Maison Moët',
  'Sellkako',
  'Will & Brothers',
  'KOF Festival',
  'Motion19',
  'KEMCARE',
  'Studio Graphique 44',
  'Bimstr',
  'Organiz Agency',
  'Omenkart',
];

export function CvClient() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className={styles.folioRoot}>
      <FolioTopbar active="cv" />

      <main id="contenu" className={styles.page}>
        <section className={styles.cvHead}>
          <div>
            <div className={styles.cvEyebrow}>{t.cv.eyebrow}</div>
            <div className={styles.cvDownloads} data-print-hide="true">
              <a className={styles.pdfBtn} href="/cv.pdf" download="Alexandre-Djengue-CV.pdf">
                CV · PDF ↓
              </a>
              <a className={styles.pdfBtn} href="/cv.pptx" download="Alexandre-Djengue-CV.pptx">
                CV · PPTX ↓
              </a>
            </div>
            <h1 className={styles.cvName}>
              Alexandre <em>Djengue</em>
            </h1>
            <p className={styles.cvTag}>{t.cv.tag}</p>
          </div>
          <dl className={styles.cvMeta}>
            <dt>{t.cv.born}</dt>
            <dd>{t.cv.bornV}</dd>
            <dt>{t.cv.base}</dt>
            <dd>{t.cv.baseV}</dd>
            <dt>WhatsApp {CONTACT.whatsappLabel}</dt>
            <dd>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
                {CONTACT.whatsappDisplay}
              </a>
            </dd>
            <dt>WhatsApp {CONTACT.whatsappSecondaryLabel}</dt>
            <dd>
              <a href={CONTACT.whatsappSecondaryLink} target="_blank" rel="noreferrer">
                {CONTACT.whatsappSecondaryDisplay}
              </a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
            <dt>LinkedIn</dt>
            <dd>{CONTACT.linkedinDisplay}</dd>
            <dt>{t.cv.igweb}</dt>
            <dd>{t.cv.igwebV}</dd>
          </dl>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{t.cv.s1num}</span>
            {t.cv.s1a}
            <span className="title">{t.cv.s1b}</span>
          </div>
          <div className={styles.sectionBody}>
            <p className={styles.lede} dangerouslySetInnerHTML={{ __html: t.cv.s1lede }} />
            <ul className={styles.pillars}>
              <li>
                <span className="k">T-SHAPED</span>
                <span>
                  <span className="t">{t.cv.tShaped}</span>
                  <span className="d">{t.cv.tShapedD}</span>
                </span>
              </li>
              <li>
                <span className="k">{t.cv.sectorsK}</span>
                <span>
                  <span className="t">{t.cv.sectors}</span>
                  <span className="d">{t.cv.sectorsD}</span>
                </span>
              </li>
              <li>
                <span className="k">{t.cv.founderK}</span>
                <span>
                  <span className="t">{t.cv.founder}</span>
                  <span className="d">{t.cv.founderD}</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{t.cv.s2num}</span>
            {t.cv.s2a}
            <span className="title">{t.cv.s2b}</span>
          </div>
          <div className={styles.sectionBody}>
            <ul className={styles.tl}>
              {PARCOURS.map((entry) => (
                <li key={`${entry.when}-${pick(entry.org, lang)}`}>
                  <div className="when">{entry.when}</div>
                  <div className="what">
                    <span className="org">{pick(entry.org, lang)}</span>
                    <span className="role">
                      {entry.rolePrefix ? pick(entry.rolePrefix, lang) : null}
                      {entry.roleEm ? <em>{pick(entry.roleEm, lang)}</em> : null}
                      {entry.roleSuffix ? pick(entry.roleSuffix, lang) : null}
                    </span>
                    <span className="desc">{pick(entry.desc, lang)}</span>
                    {entry.tags && entry.tags.length > 0 ? (
                      <div className="tags">
                        {entry.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{t.cv.s3num}</span>
            {t.cv.s3a}
            <span className="title">{t.cv.s3b}</span>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.skills}>
              {SKILLS.map((block) => (
                <div className={styles.skillBlock} key={pick(block.title, lang)}>
                  <h4>{pick(block.title, lang)}</h4>
                  <ul>
                    {block.rows.map((row) => (
                      <li key={pick(row.label, lang)}>
                        <b>{pick(row.label, lang)}</b>
                        <span>{pick(row.meta, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{t.cv.s4num}</span>
            {t.cv.s4a}
            <span className="title">{t.cv.s4b}</span>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.clients}>
              {CLIENTS.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">{t.cv.s5num}</span>
            {t.cv.s5a}
            <span className="title">{t.cv.s5b}</span>
          </div>
          <div className={styles.sectionBody}>
            <ul className={styles.pillars}>
              <li>
                <span className="k">FR</span>
                <span>
                  <span className="t">{t.cv.langFr}</span>
                </span>
              </li>
              <li>
                <span className="k">EN</span>
                <span>
                  <span className="t">{t.cv.langEn}</span>
                  <span className="d">{t.cv.langEnD}</span>
                </span>
              </li>
              <li>
                <span className="k">JA</span>
                <span>
                  <span className="t">{t.cv.langJa}</span>
                </span>
              </li>
              <li>
                <span className="k">GEO</span>
                <span>
                  <span className="t">{t.cv.geo}</span>
                  <span className="d">{t.cv.geoD}</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <footer className={styles.cvFoot}>
          <Image src="/logo-spark-white.png" alt="Xtincell" width={28} height={28} />
          <div className="meta">XTINCELL · ALEXANDRE DJENGUE · © 2026</div>
          <a className="cta" href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
            WhatsApp {CONTACT.whatsappLabel} — {CONTACT.whatsappDisplay} →
          </a>
          <a className="cta" href={CONTACT.whatsappSecondaryLink} target="_blank" rel="noreferrer">
            WhatsApp {CONTACT.whatsappSecondaryLabel} — {CONTACT.whatsappSecondaryDisplay} →
          </a>
        </footer>

        <div className={styles.socialRow}>
          <span className={styles.slLabel}>{t.social.everywhere}</span>
          <a className={styles.sbtn} href={CONTACT.instagram} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="16" height="16">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>Instagram</span>
          </a>
          <a className={styles.sbtn} href={CONTACT.twitter} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17.6 3h3.2l-7 8 8.2 10h-6.4l-5-6.4L4.8 21H1.6l7.5-8.5L1.2 3h6.6l4.5 5.9L17.6 3Zm-1.1 16h1.8L7.6 5H5.7l10.8 14Z" />
            </svg>
            <span>X</span>
          </a>
          <a className={styles.sbtn} href={CONTACT.facebook} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10.5H7.5v3h2.8V21h3.2Z" />
            </svg>
            <span>Facebook</span>
          </a>
          <a className={styles.sbtn} href={CONTACT.behance} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M2 5h6.4c1.4 0 2.5.3 3.2.9.7.6 1 1.5 1 2.5 0 .7-.2 1.3-.5 1.7-.3.5-.8.8-1.4 1.1.8.2 1.5.6 1.9 1.2.4.6.7 1.3.7 2.2 0 1.3-.5 2.4-1.4 3.1-.9.7-2.1 1.1-3.7 1.1H2V5Zm2.5 5.6h3.2c.7 0 1.2-.1 1.6-.4.3-.3.5-.7.5-1.2 0-.6-.2-1-.5-1.2-.3-.3-.9-.4-1.6-.4H4.5v3.2Zm0 6.1h3.6c.7 0 1.3-.1 1.7-.4.4-.3.6-.8.6-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-1-.5-1.7-.5H4.5v3.7ZM18.3 17c.5 0 .9-.1 1.2-.4.3-.2.6-.6.7-1h2.3c-.2 1-.7 1.8-1.5 2.4-.8.6-1.7.9-2.8.9-1.4 0-2.5-.5-3.4-1.4-.9-.9-1.3-2.1-1.3-3.5 0-1.5.4-2.6 1.3-3.5.9-.9 2-1.4 3.4-1.4 1.4 0 2.5.5 3.3 1.4.8.9 1.2 2.1 1.2 3.6v.6h-6.6c.1.7.3 1.2.7 1.6.4.4.9.7 1.5.7Zm1.6-4.7c-.4-.4-.9-.6-1.5-.6-.6 0-1.1.2-1.4.6-.4.4-.6.9-.7 1.5h4.2c-.1-.6-.3-1.1-.6-1.5ZM15 6.5h5.4v1.7H15V6.5Z" />
            </svg>
            <span>Behance</span>
          </a>
        </div>
      </main>
    </div>
  );
}
