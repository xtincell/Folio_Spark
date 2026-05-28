import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/work.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { PRACTICES } from '@/components/folio/data/practices';
import { AgencyChain } from '@/components/folio/AgencyChain';
import { ProofEmbed } from '@/components/folio/ProofEmbed';
import { FolioTopbar } from '@/components/folio/FolioTopbar';

const HAT_IDS = ['strategy', 'art', 'execution'] as const;
type HatId = (typeof HAT_IDS)[number];

const HAT_META: Record<
  HatId,
  {
    code: string;
    num: string;
    titleHead: string; // before em
    titleEm: string; // italic word
    titleTail?: string; // after em (e.g. " & Artistique")
    tagline: string;
    tocSub: string;
    tocName: React.ReactNode;
  }
> = {
  strategy: {
    code: 'P · 01',
    num: 'P · 01 — Pratique première',
    titleHead: 'La ',
    titleEm: 'Stratégie',
    titleTail: '.',
    tagline:
      "Architecturer la marque comme un système d'exploitation : ADN, signaux, flux, conversion. Quatre dossiers où la stratégie a précédé l'image.",
    tocSub: 'Brand systems · go-to-market',
    tocName: 'La Stratégie',
  },
  art: {
    code: 'P · 02',
    num: 'P · 02 — Pratique seconde',
    titleHead: 'Direction ',
    titleEm: 'Créative & Artistique',
    titleTail: '.',
    tagline:
      "Donner un visage, une scène, une atmosphère. La direction artistique au service d'artistes, de marques et d'événements premium.",
    tocSub: 'Image, scenography, identité',
    tocName: (
      <>
        Direction Créative
        <br />
        &amp; Artistique
      </>
    ),
  },
  execution: {
    code: 'P · 03',
    num: 'P · 03 — Pratique troisième',
    titleHead: "L'",
    titleEm: 'Exécution',
    titleTail: '.',
    tagline:
      "Tenir l'objectif, livrer. Photographie, vidéo, production : la partie où la stratégie devient image — et l'image, livrable.",
    tocSub: 'Photo · vidéo · livrables',
    tocName: "L'Exécution",
  },
};

// Map practice code to anchor id
const CODE_TO_ID: Record<string, HatId> = {
  'P·01': 'strategy',
  'P·02': 'art',
  'P·03': 'execution',
};

// Split a project name on the last " — " or " · " into head + em (if present)
function splitProjName(name: string): { head: string; em?: string } {
  const m = name.match(/^(.*?)\s+—\s+(.+)$/);
  if (m) {
    const head = m[1] ?? name;
    const em = m[2];
    return em ? { head, em } : { head: name };
  }
  return { head: name };
}

export const metadata = {
  title: 'Folio — Trois casquettes · Xtincell',
  description:
    "Le folio complet d'Alexandre « Xtincell » Djengue : Stratégie, Direction Créative & Artistique, Exécution. 20 projets, 15 ans, 25+ marques.",
};

export default function FolioWorkPage() {
  return (
    <div className={styles.folioRoot}>
      <FolioTopbar label="FOLIO" active="folio" />

      <main id="contenu">
      <section className={styles.folioHero}>
        <div className={styles.folioEyebrow}>
          FOLIO <span className="sep">·</span> 20 PROJETS <span className="sep">·</span> 15 ANS{' '}
          <span className="sep">·</span> 25+ MARQUES
        </div>
        <h1>
          Trois <em>casquettes</em>,
          <br />
          un même système.
        </h1>
        <p>
          Stratégie, direction artistique, exécution. Chacune est un métier complet — ensemble,
          elles transforment une marque en système qui se reproduit.
        </p>

        <nav className={styles.toc} aria-label="Sommaire">
          {HAT_IDS.map((id) => {
            const m = HAT_META[id];
            return (
              <a key={id} href={`#${id}`}>
                <span className="num">{m.code}</span>
                <span className="name">{m.tocName}</span>
                <span className="sub">{m.tocSub}</span>
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
                <div className={styles.hatNum}>{meta.num}</div>
                <h2 className={styles.hatH2}>
                  {meta.titleHead}
                  <em>{meta.titleEm}</em>
                  {meta.titleTail}
                </h2>
              </div>
              <p className={styles.hatTagline}>{meta.tagline}</p>
            </div>

            <div className={styles.projGrid}>
              {practice.projects.map((p) => {
                const split = splitProjName(p.name);
                const org = p.chain[0] ?? p.name;
                return (
                  <article className={styles.proj} key={p.name}>
                    <div className={styles.projMeta}>
                      <span className="org">{org}</span>
                      <span>{p.meta}</span>
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
                    <p className={styles.projRole}>{p.role}</p>
                    {p.chain && p.chain.length > 1 && <AgencyChain chain={p.chain} />}
                    <p className={styles.projBody}>{p.body}</p>
                    <div className={styles.projTags}>
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    {p.proofs && p.proofs.length > 0 && (
                      <div className={styles.projProofs}>
                        <div className={styles.proofsLabel}>Preuves vidéo</div>
                        <div className={styles.proofsGrid}>
                          {p.proofs.map((pr, i) => (
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
          On <em>discute</em>
          <br />
          d&apos;un système ?
        </h2>
        <p>
          Brief, projet, simple curiosité. Si vous avez une marque qui mérite plus qu&apos;un beau
          logo, on devrait se parler.
        </p>
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
            Lire le CV →
          </Link>
        </div>

        <div className={styles.socialRow}>
          <span className={styles.socialLabel}>@xtincell partout</span>
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
