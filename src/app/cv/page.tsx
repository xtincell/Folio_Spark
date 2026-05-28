import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/cv.module.css';
import { CONTACT } from '@/components/folio/data/contact';

type TLEntry = {
  when: string;
  org: string;
  rolePrefix?: string;
  roleEm?: string;
  roleSuffix?: string;
  desc: string;
  tags?: string[];
};

const PARCOURS: TLEntry[] = [
  {
    when: '2025 — auj.',
    org: 'MATANGA Agency · Douala',
    rolePrefix: 'Directeur ',
    roleEm: 'Créatif & Artistique',
    desc:
      "Responsable de la narration et de la cohérence des opérations clients. Coordination de l'équipe créative sur la production.",
    tags: ['Creative direction', 'Brand narrative', 'Agency'],
  },
  {
    when: '2017 — auj.',
    org: 'UPgraders · Co-fondateur',
    rolePrefix: 'Creative Group Head — ',
    roleEm: 'CEO depuis 2023',
    desc:
      "Studio créatif IA-first. Pipelines calibrés par marque, prompts-systèmes versionnés, console unique brief → arbitrage → livrable. Conseil + production pour marques premium d'Afrique centrale.",
    tags: ['Strategy', 'AI workflows', 'Brand systems'],
  },
  {
    when: '2023 — auj.',
    org: 'Friends Photography Studio · Douala',
    rolePrefix: 'Responsable ',
    roleEm: "du développement d'activité",
    desc:
      "Pilotage commercial et créatif du studio : direction artistique, partenariats, prises de vue corporate et événementielles.",
    tags: ['Photo', 'Studio', 'Business dev'],
  },
  {
    when: '2021 — 2023',
    org: 'Motion19',
    rolePrefix: 'Brand Manager — ',
    roleEm: 'architecture branding',
    desc:
      "Identification des besoins branding / comm / marketing, recrutement de l'équipe digitale (designer, community manager, social media, webdev), management de la production de contenu, suivi performance, respect planning et budget.",
    tags: ['Brand build', 'Go-to-market', 'E-commerce'],
  },
  {
    when: '2019 — 2021',
    org: 'Bimstr · Bimstr Agency',
    rolePrefix: 'Directeur artistique assistant & ',
    roleEm: 'graphiste',
    desc:
      "Photographe événementiel, designer (visuels d'agence + identités clients : logo, charte, web), motion designer (vidéos pub, lyrics videos). Clients notables : IFC, Cible RH, SABC, Chococam (Tartina).",
    tags: ['DA', 'Photo', 'Motion'],
  },
  {
    when: '2016 — 2022',
    org: 'Universal Music Africa · freelance',
    rolePrefix: 'Direction artistique & ',
    roleEm: "image d'artistes",
    desc:
      'DA & photo pour Locko, Mimie, Charlotte Dipanda, Singuila, Cysoul. Covers, campagnes de sortie, contenus tournée.',
    tags: ['Music DA', 'Photo', 'Campaign'],
  },
  {
    when: '2014 — 2020',
    org: 'Chococam (Tiger Brands) · freelance',
    rolePrefix: 'Production & ',
    roleEm: 'image de marque',
    roleSuffix: ' — multi-références',
    desc:
      "Benny, Big Gum, Tartina, Matinal, Mambo. Photo produit, KV campagnes, gestion d'agence créative côté annonceur.",
    tags: ['FMCG', 'Photo produit', 'Campaign'],
  },
  {
    when: '2013 — 2018',
    org: 'Orange — via McCann',
    rolePrefix: 'Photographie campagnes — ',
    roleEm: 'binôme Friends Photography',
    desc:
      "Avec Stéphane Nounamo. Direction photo de campagnes locales et régionales pour l'opérateur télécom.",
    tags: ['Photo', 'Telco', 'Agency'],
  },
  {
    when: '2018',
    org: 'Studio Graphique 44 · Will & Brothers',
    rolePrefix: 'Creative Business Consultant + ',
    roleEm: 'Business Developer',
    desc:
      "Implémentation Studio44 (identité graphique, plan comptable, templates juridiques). Chez W&B : prospection, visuels de communication, contenus vidéo.",
    tags: ['Identity', 'Consulting', 'BD'],
  },
  {
    when: '2011 — 2016',
    org: 'Freelance · Graphiste / Webdesigner',
    rolePrefix: 'Activité ',
    roleEm: 'principale',
    desc:
      "Approche associant culture, diversité et standards internationaux, dans des délais serrés. Cinq ans pour consolider les trois pratiques avant l'agence.",
    tags: ['DA', 'Web', 'Freelance'],
  },
  {
    when: '2008 — 2013',
    org: 'Iftic-Sup · Yaoundé',
    rolePrefix: 'Ingénieur des Travaux — ',
    roleEm: 'télécommunications & réseaux',
    desc:
      "Formation initiale qui informe encore aujourd'hui ma manière de modéliser une marque comme un système d'information. Bac D — Sciences (Collège Saint-Michel, 2008).",
  },
];

type SkillRow = { label: string; meta: string };
type SkillBlock = { title: string; rows: SkillRow[] };

const SKILLS: SkillBlock[] = [
  {
    title: 'Stratégie & Marque',
    rows: [
      { label: 'Brand systems', meta: '15 ans' },
      { label: 'Méthode ADVE/RTIS', meta: 'propriétaire' },
      { label: 'Go-to-market FMCG / DTC', meta: '12 ans' },
      { label: 'Storytelling éditorial', meta: '8 ans' },
    ],
  },
  {
    title: 'Direction artistique',
    rows: [
      { label: 'Direction photo & vidéo', meta: '15 ans' },
      { label: 'Identités visuelles', meta: '15 ans' },
      { label: "Direction d'image (musique)", meta: '9 ans' },
      { label: 'Scenography & events', meta: '6 ans' },
    ],
  },
  {
    title: 'Exécution',
    rows: [
      { label: 'Photographie', meta: 'natif' },
      { label: 'Vidéo / motion', meta: '12 ans' },
      { label: 'Suite Adobe + Figma', meta: 'quotidien' },
      { label: "Direction d'équipe créa", meta: '7+ pers' },
    ],
  },
  {
    title: 'Tech & IA',
    rows: [
      { label: 'Pipelines IA gouvernés', meta: 'UPgraders' },
      { label: 'Shopify · Quanta Hive', meta: 'opérationnel' },
      { label: 'Prompts-systèmes versionnés', meta: 'signature' },
      { label: 'Notion · Linear · Git', meta: 'quotidien' },
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

export const metadata = {
  title: 'CV — Alexandre Djengue · Xtincell',
  description:
    "Curriculum Vitae éditorial d'Alexandre « Xtincell » Djengue : 17 ans en marketing & design, méthode ADVE/RTIS, fondateur UPgraders.",
};

export default function FolioCVPage() {
  return (
    <div className={styles.folioRoot}>
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}>
          <Image src="/logo-spark-white.png" alt="Xtincell" width={22} height={22} />
          <span>XTINCELL — CV</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Accueil</Link>
          <Link href="/work">Folio</Link>
          <Link href="/galerie">Galerie</Link>
          <Link href="/cv" aria-current="page">CV</Link>
          <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">Contact</a>
        </nav>
      </header>

      <main id="contenu" className={styles.page}>
        <section className={styles.cvHead}>
          <div>
            <div className={styles.cvEyebrow}>Curriculum Vitae · v15.0 · 2026 · 15 ans de pratique</div>
            <h1 className={styles.cvName}>
              Alexandre <em>Djengue</em>
            </h1>
            <p className={styles.cvTag}>Brand Architect &amp; Storytelling Consultant.</p>
          </div>
          <dl className={styles.cvMeta}>
            <dt>Né</dt>
            <dd>1991 · Cameroun</dd>
            <dt>Base</dt>
            <dd>Yaoundé → Abidjan</dd>
            <dt>WhatsApp</dt>
            <dd>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
                {CONTACT.whatsappDisplay}
              </a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </dd>
            <dt>LinkedIn</dt>
            <dd>{CONTACT.linkedinDisplay}</dd>
            <dt>IG / Web</dt>
            <dd>@xtincell · partout</dd>
          </dl>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">§ 01</span>
            Profil
            <span className="title">en bref</span>
          </div>
          <div className={styles.sectionBody}>
            <p className={styles.lede}>
              15 ans en marketing &amp; design. Ingénieur télécom de formation, directeur
              artistique de pratique. Je travaille les marques comme des{' '}
              <em>systèmes d&apos;exploitation</em> : ADN, signaux, flux, conversion.
            </p>
            <ul className={styles.pillars}>
              <li>
                <span className="k">T-SHAPED</span>
                <span>
                  <span className="t">Profil rare</span>
                  <span className="d">
                    Ingénieur × DA × stratège : la profondeur technique d&apos;un dev,
                    l&apos;œil d&apos;un photographe, la lecture culturelle d&apos;un planneur.
                  </span>
                </span>
              </li>
              <li>
                <span className="k">SECTEURS</span>
                <span>
                  <span className="t">Music · FMCG · Tech</span>
                  <span className="d">
                    Universal Music Africa, Chococam (Tiger Brands), Orange (via McCann), CIMENCAM,
                    agences premium d&apos;Afrique centrale.
                  </span>
                </span>
              </li>
              <li>
                <span className="k">FONDATEUR</span>
                <span>
                  <span className="t">UPgraders</span>
                  <span className="d">
                    Studio créatif basé sur l&apos;IA souveraine — pipelines calibrés, gouvernés,
                    sous décision humaine.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="num">§ 02</span>
            Parcours
            <span className="title">condensé</span>
          </div>
          <div className={styles.sectionBody}>
            <ul className={styles.tl}>
              {PARCOURS.map((entry) => (
                <li key={`${entry.when}-${entry.org}`}>
                  <div className="when">{entry.when}</div>
                  <div className="what">
                    <span className="org">{entry.org}</span>
                    <span className="role">
                      {entry.rolePrefix}
                      {entry.roleEm ? <em>{entry.roleEm}</em> : null}
                      {entry.roleSuffix}
                    </span>
                    <span className="desc">{entry.desc}</span>
                    {entry.tags && entry.tags.length > 0 ? (
                      <div className="tags">
                        {entry.tags.map((t) => (
                          <span key={t}>{t}</span>
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
            <span className="num">§ 03</span>
            Compétences
            <span className="title">le coffre à outils</span>
          </div>
          <div className={styles.sectionBody}>
            <div className={styles.skills}>
              {SKILLS.map((block) => (
                <div className={styles.skillBlock} key={block.title}>
                  <h4>{block.title}</h4>
                  <ul>
                    {block.rows.map((row) => (
                      <li key={row.label}>
                        <b>{row.label}</b>
                        <span>{row.meta}</span>
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
            <span className="num">§ 04</span>
            Clients
            <span className="title">avec qui</span>
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
            <span className="num">§ 05</span>
            Langues
            <span className="title">&amp; mobilité</span>
          </div>
          <div className={styles.sectionBody}>
            <ul className={styles.pillars}>
              <li>
                <span className="k">FR</span>
                <span>
                  <span className="t">Français — natif / bilingue</span>
                </span>
              </li>
              <li>
                <span className="k">EN</span>
                <span>
                  <span className="t">Anglais — intermédiaire pro</span>
                  <span className="d">Brief, mission, rédaction courante.</span>
                </span>
              </li>
              <li>
                <span className="k">JA</span>
                <span>
                  <span className="t">Japonais — notions élémentaires</span>
                </span>
              </li>
              <li>
                <span className="k">GEO</span>
                <span>
                  <span className="t">Yaoundé · Douala · Abidjan</span>
                  <span className="d">
                    Disponible mobilité Afrique de l&apos;Ouest et centrale, remote France / Europe.
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <footer className={styles.cvFoot}>
          <Image src="/logo-spark-white.png" alt="Xtincell" width={28} height={28} />
          <div className="meta">XTINCELL · ALEXANDRE DJENGUE · © 2026</div>
          <a
            className="cta"
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp — {CONTACT.whatsappDisplay} →
          </a>
        </footer>

        <div className={styles.socialRow}>
          <span className={styles.slLabel}>@xtincell partout</span>
          <a
            className={styles.sbtn}
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
          >
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
