'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import {
  CASE_STUDIES,
  HAT_LABEL,
  type CaseHat,
} from '@/components/folio/data/cases';
import { PRACTICES } from '@/components/folio/data/practices';
import { useLang, pick } from '@/lib/i18n';
import { StudioShell, ProjectCard, Arrow } from '@/components/studio/Studio';
import s from '@/styles/studio.module.css';
import { SELECTED_PROJECTS } from '@/components/folio/data/project-editorial';
import e from '@/styles/project-editorial.module.css';

export function WorkClient() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  const [view, setView] = useState<'selection' | 'all'>('selection');
  const [filter, setFilter] = useState<CaseHat | 'all'>('all');
  const [query, setQuery] = useState('');
  const reduce = useReducedMotion();
  const projects = CASE_STUDIES.filter((p) => !p.hidden);
  const shown = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === 'all' || p.hat === filter) &&
          `${pick(p.name, lang)} ${pick(p.client, lang)} ${p.tags.join(' ')}`
            .toLocaleLowerCase(lang)
            .includes(query.toLocaleLowerCase(lang).trim())
      ),
    [projects, filter, query, lang]
  );
  const selected = SELECTED_PROJECTS.flatMap(reading => {
    const project = projects.find(p => p.slug === reading.slug);
    return project ? [{ project, reading }] : [];
  });
  return (
    <StudioShell>
      <header className={`${s.pageHead} ${e.workHead}`}>
        <span className={s.eyebrow}>
          {L('Folio / Sélection & index', 'Portfolio / Selection & index')} —{' '}
          {projects.length} {L('dossiers', 'projects')}
        </span>
        <h1>
          {L('L’idée.', 'The idea.')}
          <br />
          <em>{L('Et ce qu’on en fait.', 'And what we make of it.')}</em>
        </h1>
        <div className={s.pageIntro}>
          <p>
            {L(
              'Cinq projets pour entrer dans ma pratique. Les campagnes, le terrain, le commerce, la marque et l’outil. L’index complet reste à portée de main.',
              'Five projects to explore my practice: campaigns, the field, retail, brand and tools. The full index is always within reach.'
            )}
          </p>
          <div className={s.downloads}>
            <a href="/folio.pdf" download>
              Folio PDF ↓
            </a>
            <a href="/folio.pptx" download>
              Folio PPTX ↓
            </a>
          </div>
        </div>
      </header>
      <nav className={e.views} aria-label={L('Choisir le parcours des projets', 'Choose a way to explore')}>
        <button type="button" aria-pressed={view === 'selection'} onClick={() => setView('selection')}>
          {L('La sélection', 'Selected work')} <sup>{selected.length}</sup>
        </button>
        <button type="button" aria-pressed={view === 'all'} onClick={() => setView('all')}>
          {L('Tous les projets', 'All projects')} <sup>{projects.length}</sup>
        </button>
      </nav>
      {view === 'selection' ? (
        <section className={e.selection} aria-label={L('La sélection', 'Selected work')}>
          <h2 className={s.srOnly}>{L('Cinq projets choisis', 'Five selected projects')}</h2>
          <div className={e.selectionGrid}>
            {selected.map(({project, reading}, i) => (
              <article key={project.slug}>
                <ProjectCard project={project} index={i} />
                <p className={e.readingReason}>{pick(reading.reason, lang)}</p>
              </article>
            ))}
          </div>
          <button className={s.textLink} type="button" onClick={() => setView('all')}>
            {L('Ouvrir l’index complet', 'Open the full index')} <span>{projects.length}</span> <Arrow />
          </button>
        </section>
      ) : <>
      <div className={s.filterBar}>
        <div
          className={s.filters}
          role="group"
          aria-label={L('Filtrer les projets', 'Filter projects')}
        >
          {(['all', 'strategy', 'art', 'execution'] as const).map((key) => (
            <button
              type="button"
              key={key}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {key === 'all'
                ? L('Tout voir', 'All work')
                : pick(HAT_LABEL[key], lang)}
              <sup>
                {key === 'all'
                  ? projects.length
                  : projects.filter((p) => p.hat === key).length}
              </sup>
            </button>
          ))}
        </div>
        <label className={s.search}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="6.5" stroke="currentColor" />
            <path d="m15 15 6 6" stroke="currentColor" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L('Rechercher un projet', 'Search projects')}
            aria-label={L('Rechercher un projet', 'Search projects')}
          />
        </label>
      </div>
      <div className={s.results}>
        <span role="status" aria-live="polite">
          {shown.length} {shown.length === 1 ? L('projet à explorer', 'project to explore') : L('projets à explorer', 'projects to explore')}
        </span>
        <span>2017 — 2026</span>
      </div>
      <section
        className={s.workContent}
        aria-label={L('Les projets', 'Projects')}
      >
        <h2 className={s.srOnly}>{L('Les projets', 'Projects')}</h2>
        <motion.div
          key={`${filter}-${query}-${lang}`}
          initial={false}
          animate={reduce ? undefined : { opacity: [0.6, 1], y: [8, 0] }}
          transition={{ duration: 0.3 }}
          className={s.projectGrid}
        >
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </motion.div>
        {!shown.length && (
          <div className={s.empty}>
            <p>
              {L(
                'Aucun projet ne correspond à cette recherche.',
                'No projects match your search.'
              )}
            </p>
            <button
              className={s.pillLink}
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              type="button"
            >
              {L('Voir tous les projets', 'Show all projects')}
            </button>
          </div>
        )}
      </section>
      </>}
      <section className={e.referenceNotebook}>
        <details className={s.archive}>
          <summary>
            {L(
              'Carnet de références — parcours & collaborations',
              'Reference notebook — background & collaborations'
            )}
          </summary>
          <div className={s.archiveBody}>
            {PRACTICES.map((practice) => (
              <section className={s.archivePractice} key={practice.code}>
                <h2>{pick(practice.title, lang)}</h2>
                {practice.projects.map((project) => (
                  <article className={s.archiveProject} key={project.name}>
                    <div>
                      <h3>{project.name}</h3>
                      <small>{pick(project.meta, lang)}</small>
                      <small>{project.chain.join(' → ')}</small>
                    </div>
                    <div>
                      <p>
                        <strong>{pick(project.role, lang)}</strong>
                        <br />
                        {pick(project.body, lang)}
                      </p>
                      {project.images && (
                        <div className={s.archiveImages}>
                          {project.images.map((src, i) => (
                            <a
                              key={src}
                              href={src}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${project.name} — ${L('ouvrir le visuel', 'open image')} ${i + 1}`}
                            >
                              <Image
                                src={src}
                                width={480}
                                height={340}
                                alt={`${project.name} — ${i + 1}`}
                                loading="lazy"
                                sizes="(max-width: 760px) 40vw, 20vw"
                              />
                            </a>
                          ))}
                        </div>
                      )}
                      {project.proofs?.map((proof) => (
                        <a
                          key={proof.url}
                          href={proof.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {pick(proof.label, lang)} <Arrow diagonal />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </section>
            ))}
          </div>
        </details>
      </section>
    </StudioShell>
  );
}
