'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/caseStudy.module.css';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { ProofEmbed } from '@/components/folio/ProofEmbed';
import { CONTACT } from '@/components/folio/data/contact';
import {
  type CaseStudy,
  HAT_CODE,
  HAT_LABEL,
} from '@/components/folio/data/cases';
import { useLang, useT, pick } from '@/lib/i18n';

export function CaseStudyClient({ caseStudy: c }: { caseStudy: CaseStudy }) {
  const { lang } = useLang();
  const t = useT();

  const sections: Array<{ k: string; label: string; body: string }> = [];
  const add = (k: string, label: { fr: string; en: string }, v?: { fr: string; en: string }) => {
    if (v) sections.push({ k, label: pick(label, lang), body: pick(v, lang) });
  };
  add('context', { fr: 'Contexte', en: 'Context' }, c.context);
  add('role', { fr: 'Rôle', en: 'Role' }, c.role);
  add('process', { fr: 'Process', en: 'Process' }, c.process);
  add('result', { fr: 'Résultat', en: 'Result' }, c.result);

  return (
    <div className={styles.caseRoot}>
      <FolioTopbar active="folio" />

      <main id="contenu">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <header className={styles.hero}>
          <Image
            src={c.hero}
            alt={pick(c.name, lang)}
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
          <div className={styles.heroVignette} aria-hidden="true" />
          <div className={styles.heroMast}>
            <Link href="/work" className={styles.backLink}>
              ← {pick({ fr: 'Tous les projets', en: 'All projects' }, lang)}
            </Link>
            <div className={styles.heroCode}>
              {HAT_CODE[c.hat]} — {pick(HAT_LABEL[c.hat], lang)}
            </div>
            <h1 className={styles.heroTitle}>{pick(c.name, lang)}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.heroClient}>{pick(c.client, lang)}</span>
              <span className={styles.dot}>·</span>
              <span>{c.year}</span>
            </div>
            <div className={styles.heroTags}>
              {c.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* ── NARRATIVE ────────────────────────────────────────── */}
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
            <div className={styles.galleryLabel}>
              {pick({ fr: 'Visuels', en: 'Visuals' }, lang)}
            </div>
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
          <Link className={styles.btn} href="/work">
            {pick({ fr: '← Retour au folio', en: '← Back to the folio' }, lang)}
          </Link>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp {CONTACT.whatsappLabel} — {CONTACT.whatsappDisplay}
          </a>
        </section>
      </main>
    </div>
  );
}
