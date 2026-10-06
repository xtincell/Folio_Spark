'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type CaseStudy,
  type CaseHat,
  HAT_LABEL,
} from '@/components/folio/data/cases';
import { useLang, pick, type Bi } from '@/lib/i18n';
import { agencyForCase } from '@/components/folio/agencyCredit';
import {
  StudioShell,
  Arrow,
  SectionHeading,
  ProjectCard,
} from '@/components/studio/Studio';
import s from '@/styles/studio.module.css';
export type CaseLite = {
  slug: string;
  name: Bi;
  client: Bi;
  year: string;
  hero: string;
  hat: CaseHat;
};
const MOCKUPS: Record<string, string> = {
  'friesland-campina': '/studio/peak-billboard.webp',
  'robuste-packaging': '/studio/robuste-packaging.webp',
};
export function CaseStudyClient({
  caseStudy: c,
  prev,
  next,
  related = [],
}: {
  caseStudy: CaseStudy;
  prev?: CaseLite;
  next?: CaseLite;
  related?: CaseLite[];
}) {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const title = pick(c.name, lang);
  const gallery = c.gallery.filter((img) => img.src !== c.hero);
  const agency = agencyForCase(c.slug);
  const mockup = MOCKUPS[c.slug];
  const narrative = [
    { key: 'role', title: L('Le rôle', 'The role'), body: c.role },
    { key: 'process', title: L('La démarche', 'The process'), body: c.process },
    { key: 'result', title: L('Le résultat', 'The result'), body: c.result },
  ].filter((block) => block.body);
  return (
    <StudioShell>
      <header className={s.caseHeader}>
        <nav
          className={s.breadcrumb}
          aria-label={L('Fil d’Ariane', 'Breadcrumb')}
        >
          <Link href="/work">← {L('Tous les projets', 'All projects')}</Link>
          <span>/</span>
          <span>{pick(HAT_LABEL[c.hat], lang)}</span>
        </nav>
        <div className={s.caseHeading}>
          <h1>{title}</h1>
          <span>{c.year} ↗</span>
        </div>
      </header>
      <figure className={s.caseHero}>
        <Image
          src={mockup || c.hero}
          width={1800}
          height={1100}
          priority
          sizes="92vw"
          quality={88}
          alt={
            mockup
              ? `${title} — ${L('visualisation de présentation', 'presentation visualization')}`
              : title
          }
        />
        {(c.slug === 'la-barre' || agency) && (
          <figcaption>
            {c.slug === 'la-barre' && (
              <>
                {L(
                  'Schéma de fonctionnement — illustration conceptuelle',
                  'Workflow diagram — conceptual illustration'
                )}
                {agency && ' · '}
              </>
            )}
            {agency && (
              <>
                {L('Avec', 'With')} {agency}
              </>
            )}
          </figcaption>
        )}
      </figure>
      {mockup && (
        <p className={s.generatedCaption}>
          {L(
            'Visualisation de présentation générée par IA à partir de la création originale.',
            'AI-generated presentation visualization based on the original artwork.'
          )}
        </p>
      )}
      <section className={s.caseIntro}>
        <div>
          <h2>{L('Le projet', 'The project')}</h2>
          <p>{pick(c.context, lang)}</p>
        </div>
        <dl className={s.caseMeta}>
          <div>
            <dt>Client</dt>
            <dd>{pick(c.client, lang)}</dd>
          </div>
          <div>
            <dt>{L('Année', 'Year')}</dt>
            <dd>{c.year}</dd>
          </div>
          <div>
            <dt>{L('Pratique', 'Practice')}</dt>
            <dd>{pick(HAT_LABEL[c.hat], lang)}</dd>
          </div>
          <div>
            <dt>{L('Périmètre', 'Scope')}</dt>
            <dd>{c.tags.join(' · ')}</dd>
          </div>
          <div>
            <dt>{L('Crédits', 'Credits')}</dt>
            <dd>
              Alexandre Djengue · Xtincell
              {agency && (
                <>
                  <br />
                  {agency}
                </>
              )}
            </dd>
          </div>
        </dl>
      </section>
      {!!narrative.length && (
        <section className={s.caseNarrative}>
          {narrative.map((block) => (
            <article key={block.key}>
              <h2>{block.title}</h2>
              <p>{pick(block.body!, lang)}</p>
            </article>
          ))}
        </section>
      )}
      <section
        className={s.caseGallery}
        aria-label={L('Visuels du projet', 'Project visuals')}
      >
        {(mockup
          ? [{ src: c.hero, span: 'full' as const }, ...gallery]
          : gallery
        ).map((img, i) => {
          const alt =
            'alt' in img && img.alt
              ? pick(img.alt, lang)
              : `${title} — ${i + 1}`;
          return (
            <figure
              key={`${img.src}-${i}`}
              className={`${s.caseShot} ${img.span === 'full' ? s.caseShotFull : ''}`}
            >
              <button
                type="button"
                onClick={() => {
                  setZoom({ src: img.src, alt });
                  dialog.current?.showModal();
                }}
                aria-label={`${L('Agrandir', 'Enlarge')} : ${alt}`}
              >
                <Image
                  src={img.src}
                  alt={alt}
                  width={1600}
                  height={1100}
                  sizes={
                    img.span === 'full'
                      ? '92vw'
                      : '(max-width:430px) 90vw, 46vw'
                  }
                  quality={85}
                  loading="lazy"
                />
                <span aria-hidden="true">+</span>
              </button>
              <figcaption>
                {String(i + 1).padStart(2, '0')} / {title}
              </figcaption>
            </figure>
          );
        })}
      </section>
      {c.proofs && c.proofs.length > 0 && (
        <section className={s.caseProofs}>
          <h2>
            {L('Le projet, en situation.', 'The project, out in the world.')}
          </h2>
          <div>
            {c.proofs.map((proof) => (
              <a
                key={proof.url}
                className={s.pillLink}
                href={proof.url}
                target="_blank"
                rel="noreferrer"
              >
                {pick(proof.label, lang)}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </section>
      )}
      {(prev || next) && (
        <nav
          className={s.caseNavigation}
          aria-label={L('Parcourir les études de cas', 'Browse case studies')}
        >
          {prev ? (
            <Link href={`/work/${prev.slug}`} rel="prev">
              <span>← {L('Projet précédent', 'Previous project')}</span>
              <h2>{pick(prev.name, lang)}</h2>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`} rel="next">
              <span>{L('Projet suivant', 'Next project')} →</span>
              <h2>{pick(next.name, lang)}</h2>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
      {!!related.length && (
        <section className={s.section}>
          <SectionHeading
            number="+"
            title={L('Prolonger le regard.', 'Keep looking.')}
          />
          <div className={s.relatedGrid}>
            {related.slice(0, 3).map((r, i) => (
              <ProjectCard
                key={r.slug}
                project={{
                  ...r,
                  kind: 'case',
                  context: { fr: '', en: '' },
                  tags: [],
                  gallery: [],
                }}
                index={i}
              />
            ))}
          </div>
        </section>
      )}
      <dialog
        ref={dialog}
        className={s.lightbox}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-label={L('Visuel agrandi', 'Enlarged image')}
      >
        <button type="button" onClick={() => dialog.current?.close()} autoFocus>
          {L('Fermer', 'Close')} ×
        </button>
        {zoom && <img src={zoom.src} alt={zoom.alt} />}
      </dialog>
    </StudioShell>
  );
}
