'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/work.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { PRACTICES } from '@/components/folio/data/practices';
import { AgencyChain } from '@/components/folio/AgencyChain';
import { ProofEmbed } from '@/components/folio/ProofEmbed';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { useT, useLang, pick, type Bi } from '@/lib/i18n';

const HAT_IDS = ['strategy', 'art', 'execution'] as const;
type HatId = (typeof HAT_IDS)[number];

type HatMeta = {
  code: string;
  num: Bi;
  titleHead: Bi;
  titleEm: Bi;
  titleTail?: string;
  tagline: Bi;
  tocSub: Bi;
  tocName: Bi;
};

const HAT_META: Record<HatId, HatMeta> = {
  strategy: {
    code: 'P · 01',
    num: { fr: 'P · 01 — Pratique première', en: 'P · 01 — First practice' },
    titleHead: { fr: 'La ', en: 'The ' },
    titleEm: { fr: 'Stratégie', en: 'Strategy' },
    titleTail: '.',
    tagline: {
      fr: "Architecturer la marque comme un système d'exploitation : ADN, signaux, flux, conversion. Quatre dossiers où la stratégie a précédé l'image.",
      en: 'Architecting the brand like an operating system: DNA, signals, flows, conversion. Four cases where strategy preceded the image.',
    },
    tocSub: { fr: 'Brand systems · go-to-market', en: 'Brand systems · go-to-market' },
    tocName: { fr: 'La Stratégie', en: 'The Strategy' },
  },
  art: {
    code: 'P · 02',
    num: { fr: 'P · 02 — Pratique seconde', en: 'P · 02 — Second practice' },
    titleHead: { fr: 'Direction ', en: 'Creative ' },
    titleEm: { fr: 'Créative & Artistique', en: '& Art Direction' },
    titleTail: '.',
    tagline: {
      fr: "Donner un visage, une scène, une atmosphère. La direction artistique au service d'artistes, de marques et d'événements premium.",
      en: 'Giving a face, a stage, an atmosphere. Art direction in the service of premium artists, brands and events.',
    },
    tocSub: { fr: 'Image, scenography, identité', en: 'Image, scenography, identity' },
    tocName: { fr: 'Direction Créative & Artistique', en: 'Creative & Art Direction' },
  },
  execution: {
    code: 'P · 03',
    num: { fr: 'P · 03 — Pratique troisième', en: 'P · 03 — Third practice' },
    titleHead: { fr: "L'", en: 'The ' },
    titleEm: { fr: 'Exécution', en: 'Execution' },
    titleTail: '.',
    tagline: {
      fr: "Tenir l'objectif, livrer. Photographie, vidéo, production : la partie où la stratégie devient image — et l'image, livrable.",
      en: 'Hold the lens, deliver. Photography, video, production: the part where strategy becomes image — and image becomes a deliverable.',
    },
    tocSub: { fr: 'Photo · vidéo · livrables', en: 'Photo · video · deliverables' },
    tocName: { fr: "L'Exécution", en: 'The Execution' },
  },
};

const CODE_TO_ID: Record<string, HatId> = {
  'P·01': 'strategy',
  'P·02': 'art',
  'P·03': 'execution',
};

// Split a project name on the first " — " into head + em (if present)
function splitProjName(name: string): { head: string; em?: string } {
  const m = name.match(/^(.*?)\s+—\s+(.+)$/);
  if (m) {
    const head = m[1] ?? name;
    const em = m[2];
    return em ? { head, em } : { head: name };
  }
  return { head: name };
}

export function WorkClient() {
  const t = useT();
  const { lang } = useLang();
  return (
    <div className={styles.folioRoot}>
      <FolioTopbar active="folio" />

      <main id="contenu">
        <section className={styles.folioHero}>
          <div className={styles.folioEyebrow}>{t.work.eyebrow}</div>
          <h1>
            {t.work.h1a}<em>{t.work.h1em}</em>
            {t.work.h1b}
          </h1>
          <p>{t.work.lede}</p>

          <nav className={styles.toc} aria-label={t.work.toc}>
            {HAT_IDS.map((id) => {
              const m = HAT_META[id];
              return (
                <a key={id} href={`#${id}`}>
                  <span className="num">{m.code}</span>
                  <span className="name">{pick(m.tocName, lang)}</span>
                  <span className="sub">{pick(m.tocSub, lang)}</span>
                  <span className="arrow">↓</span>
                </a>
              );
            })}
          </nav>
        </section>

        {PRACTICES.map((practice) => {
          const id = CODE_TO_ID[practice.code];
          if (!id) return null;
          const meta = HAT_META[id];
          return (
            <section key={id} id={id} className={styles.hat}>
              <div className={styles.hatHead}>
                <div>
                  <div className={styles.hatNum}>{pick(meta.num, lang)}</div>
                  <h2 className={styles.hatH2}>
                    {pick(meta.titleHead, lang)}
                    <em>{pick(meta.titleEm, lang)}</em>
                    {meta.titleTail}
                  </h2>
                </div>
                <p className={styles.hatTagline}>{pick(meta.tagline, lang)}</p>
              </div>

              <div className={styles.projGrid}>
                {practice.projects.map((proj) => {
                  const split = splitProjName(proj.name);
                  const org = proj.chain[0] ?? proj.name;
                  return (
                    <article className={styles.proj} key={proj.name}>
                      <div className={styles.projMeta}>
                        <span className="org">{org}</span>
                        <span>{pick(proj.meta, lang)}</span>
                      </div>
                      <h3 className={styles.projName}>
                        {split.head}
                        {split.em ? (
                          <>
                            {' '}
                            <em>— {split.em}</em>
                          </>
                        ) : null}
                      </h3>
                      <p className={styles.projRole}>{pick(proj.role, lang)}</p>
                      {proj.chain && proj.chain.length > 1 && <AgencyChain chain={proj.chain} />}
                      <p className={styles.projBody}>{pick(proj.body, lang)}</p>
                      <div className={styles.projTags}>
                        {proj.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      {proj.proofs && proj.proofs.length > 0 && (
                        <div className={styles.projProofs}>
                          <div className={styles.proofsLabel}>{t.proof.label}</div>
                          <div className={styles.proofsGrid}>
                            {proj.proofs.map((pr, i) => (
                              <ProofEmbed key={`${pr.url}-${i}`} pr={pr} />
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className={styles.foot}>
          <h2>
            {t.work.footTitleA}<em>{t.work.footTitleEm}</em>
            {t.work.footTitleB}
          </h2>
          <p>{t.work.footLede}</p>
          <div className={styles.footRow}>
            <a
              className={styles.btn}
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp — {CONTACT.whatsappDisplay}
            </a>
            <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${CONTACT.email}`}>
              Email — {CONTACT.email}
            </a>
            <Link className={`${styles.btn} ${styles.btnGhost}`} href="/cv">
              {t.work.cvCta}
            </Link>
          </div>

          <div className={styles.socialRow}>
            <span className={styles.socialLabel}>{t.social.everywhere}</span>
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

          <div className={styles.footBottom}>
            <Image src="/logo-spark-white.png" alt="Xtincell" width={28} height={28} />
            <div className="meta">XTINCELL · ALEXANDRE DJENGUE · © 2026</div>
            <div className="meta">Built with systems, not just art.</div>
          </div>
        </section>
      </main>
    </div>
  );
}
