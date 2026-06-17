'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/caseStudy.module.css';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { ProofEmbed } from '@/components/folio/ProofEmbed';
import { CONTACT } from '@/components/folio/data/contact';
import { type CaseStudy, HAT_CODE, HAT_LABEL } from '@/components/folio/data/cases';
import { useLang, useT, pick } from '@/lib/i18n';

export function CaseStudyClient({ caseStudy: c }: { caseStudy: CaseStudy }) {
  const { lang } = useLang();
  const t = useT();
  const L = (fr: string, en: string) => (lang === 'en' ? en : fr);

  // Context is promoted to the lede; only the optional deep-dive blocks live here.
  const sections: Array<{ k: string; label: string; body: string }> = [];
  if (c.role) sections.push({ k: 'role', label: L('Rôle', 'Role'), body: pick(c.role, lang) });
  if (c.process) sections.push({ k: 'process', label: L('Process', 'Process'), body: pick(c.process, lang) });
  if (c.result) sections.push({ k: 'result', label: L('Résultat', 'Result'), body: pick(c.result, lang) });

  return (
    <div className={styles.caseRoot}>
      <FolioTopbar active="folio" />

      {/* Always-visible return affordance */}
      <Link href="/work" className={styles.backFab}>
        <span aria-hidden="true">←</span>
        <span>{L('Folio', 'Folio')}</span>
      </Link>

      <main id="contenu">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <Image
            src={c.hero}
            alt={pick(c.name, lang)}
            fill
            priority
            sizes="100vw"
            quality={70}
            className={styles.heroImg}
          />
          <div className={styles.heroVignette} aria-hidden="true" />
          <div className={styles.heroMast}>
            <div className={styles.heroCode}>
              {HAT_CODE[c.hat]} — {pick(HAT_LABEL[c.hat], lang)}
            </div>
            <h1 className={styles.heroTitle}>{pick(c.name, lang)}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.heroClient}>{pick(c.client, lang)}</span>
              <span className={styles.dot}>·</span>
              <span>{c.year}</span>
            </div>
          </div>
        </header>

        {/* ── INTRO : lede + meta rail ─────────────────────────── */}
        <section className={styles.intro}>
          <div className={styles.introLede}>
            <div className={styles.kicker}>{L('Le projet', 'The brief')}</div>
            <p className={styles.lede}>{pick(c.context, lang)}</p>
          </div>

          <dl className={styles.metaRail}>
            <div className={styles.metaRow}>
              <dt>{L('Client', 'Client')}</dt>
              <dd>{pick(c.client, lang)}</dd>
            </div>
            <div className={styles.metaRow}>
              <dt>{L('Année', 'Year')}</dt>
              <dd>{c.year}</dd>
            </div>
            <div className={styles.metaRow}>
              <dt>{L('Discipline', 'Discipline')}</dt>
              <dd>{pick(HAT_LABEL[c.hat], lang)}</dd>
            </div>
            {c.tags.length > 0 && (
              <div className={styles.metaRow}>
                <dt>{L('Périmètre', 'Scope')}</dt>
                <dd className={styles.metaTags}>
                  {c.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </dd>
              </div>
            )}
            <div className={styles.metaRow}>
              <dt>{L('Crédits', 'Credits')}</dt>
              <dd>Alexandre Djengue · Xtincell</dd>
            </div>
          </dl>
        </section>

        {/* ── NARRATIVE (optional deep-dive) ───────────────────── */}
        {sections.length > 0 && (
          <section className={styles.narrative}>
            {sections.map((s) => (
              <article key={s.k} className={styles.block}>
                <div className={styles.blockLabel}>{s.label}</div>
                <p className={styles.blockBody}>{s.body}</p>
              </article>
            ))}
          </section>
        )}

        {/* ── GALLERY ──────────────────────────────────────────── */}
        {c.gallery.length > 0 && (
          <section className={styles.gallery}>
            <div className={styles.galleryLabel}>{L('Visuels', 'Visuals')}</div>
            <div className={styles.galleryGrid}>
              {c.gallery.map((img, i) => (
                <figure
                  key={img.src}
                  className={`${styles.shot} ${img.span === 'full' ? styles.shotFull : ''}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt ? pick(img.alt, lang) : `${pick(c.name, lang)} — ${i + 1}`}
                    width={1600}
                    height={1100}
                    loading="lazy"
                    quality={72}
                    sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 760px"
                    className={styles.shotImg}
                  />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── PROOFS ───────────────────────────────────────────── */}
        {c.proofs && c.proofs.length > 0 && (
          <section className={styles.proofs}>
            <div className={styles.galleryLabel}>{t.proof.label}</div>
            <div className={styles.proofsGrid}>
              {c.proofs.map((pr, i) => (
                <ProofEmbed key={`${pr.url}-${i}`} pr={pr} />
              ))}
            </div>
          </section>
        )}

        {/* ── FOOT ─────────────────────────────────────────────── */}
        <section className={styles.foot}>
          <div className={styles.footTitle}>
            {L('On discute d’un projet ?', 'Shall we talk about a project?')}
          </div>
          <div className={styles.footRow}>
            <Link className={styles.btn} href="/work">
              {L('← Retour au folio', '← Back to the folio')}
            </Link>
            <a
              className={`${styles.btn} ${styles.btnGhost}`}
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp — {CONTACT.whatsappDisplay}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
