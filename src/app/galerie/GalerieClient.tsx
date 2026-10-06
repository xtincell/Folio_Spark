'use client';
import { useState } from 'react';
import { LOCAL_GALLERY_COVERS } from '@/lib/gallery-assets';
import { GALLERIES, galleryUrl } from '@/components/folio/data/galleries';
import {
  YOUTUBE_VIDEOS,
  SOCIAL_PROFILES,
} from '@/components/folio/data/social-feed';
import { useLang } from '@/lib/i18n';
import {
  StudioShell,
  Arrow,
  Spark,
  SectionHeading,
} from '@/components/studio/Studio';
import s from '@/styles/studio.module.css';
const CATEGORY_EN: Record<string, string> = {
  Événement: 'Event',
  'Festival · Pop culture': 'Festival · Pop culture',
  Corporate: 'Corporate',
  Mariage: 'Wedding',
  'Portrait · Musique': 'Portrait · Music',
  Portrait: 'Portrait',
  Reportage: 'Documentary',
};
function RemoteImage({
  src,
  alt,
  position,
}: {
  src: string;
  alt: string;
  position?: string;
}) {
  const [failed, setFailed] = useState(false);
  const { lang } = useLang();
  return failed ? (
    <div className={s.galleryUnavailable}>
      <Spark />
      <span>{alt}</span>
      <small>
        {lang === 'fr'
          ? 'Voir la collection sur sa plateforme ↗'
          : 'View the collection on its platform ↗'}
      </small>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: position }}
      onError={() => setFailed(true)}
    />
  );
}
export function GalerieClient() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  const [category, setCategory] = useState('all');
  const categories = Array.from(
    new Set(GALLERIES.map((g) => g.category).filter(Boolean))
  ) as string[];
  const selectedCollections = [...GALLERIES].sort((a, b) => Number(!!LOCAL_GALLERY_COVERS[b.slug]) - Number(!!LOCAL_GALLERY_COVERS[a.slug]));
  const shown = category === 'all' ? selectedCollections : selectedCollections.filter(g => g.category === category);
  return (
    <StudioShell>
      <header className={s.pageHead}>
        <span className={s.eyebrow}>
          {L('Photographie / Collections', 'Photography / Collections')} —{' '}
          {GALLERIES.length}
        </span>
        <h1>
          {L('L’œil.', 'The eye.')}
          <br />
          <em>{L('Et ce qui reste.', 'And what stays.')}</em>
        </h1>
        <div className={s.pageIntro}>
          <p>
            {L(
              'Un regard sur les gens, les lieux, les moments. Portraits, mariages, festivals et reportages : les collections complètes vous attendent sur Pixieset.',
              'An eye for people, places, moments. Portraits, weddings, festivals and documentary work: explore the complete collections on Pixieset.'
            )}
          </p>
          <a
            className={s.pillLink}
            href="https://xtincell.pixieset.com"
            target="_blank"
            rel="noreferrer"
          >
            Pixieset
            <Arrow diagonal />
          </a>
        </div>
      </header>
      <div className={s.filterBar}>
        <div
          className={s.filters}
          role="group"
          aria-label={L('Filtrer les collections', 'Filter collections')}
        >
          {['all', ...categories].map((cat) => (
            <button
              type="button"
              key={cat}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat === 'all'
                ? L('Tout voir', 'View all')
                : lang === 'en'
                  ? CATEGORY_EN[cat] || cat
                  : cat}
            </button>
          ))}
        </div>
      </div>
      <div className={s.results}>
        <span role="status" aria-live="polite">
          {shown.length} {L('collections', 'collections')}
        </span>
        <span>PIXIESET ↗</span>
      </div>
      <section
        className={s.workContent}
        aria-label={L('Collections photographiques', 'Photography collections')}
      >
        <div className={s.galleryGrid}>
          {shown.map((g) => (
            <a
              className={s.galleryCard}
              key={g.slug}
              href={galleryUrl(g)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${g.title} — Pixieset (${L('nouvel onglet', 'new tab')})`}
            >
              <div className={s.galleryImage}>
                <RemoteImage
                  src={LOCAL_GALLERY_COVERS[g.slug] || g.cover}
                  alt={g.title}
                  position={g.bgPosition}
                />
                {g.locked && (
                  <span>{L('Collection privée', 'Private collection')} ◇</span>
                )}
              </div>
              <h2>{g.title} ↗</h2>
              <p>
                {lang === 'en'
                  ? CATEGORY_EN[g.category || ''] || g.category
                  : g.category}
              </p>
            </a>
          ))}
        </div>
      </section>
      <section className={s.section}>
        <SectionHeading
          number="02"
          title={L('L’image en mouvement.', 'The moving image.')}
        >
          <p>
            {L(
              'Films, capsules et récits visuels. À retrouver sur les plateformes d’origine.',
              'Films, short stories and visual narratives. Watch on their original platforms.'
            )}
          </p>
        </SectionHeading>
        <div className={s.mediaGrid}>
          {YOUTUBE_VIDEOS.map((v) => (
            <a
              key={v.id}
              href={v.watchUrl}
              target="_blank"
              rel="noreferrer"
              className={s.mediaCard}
            >
              <div>
                <RemoteImage src={v.thumb} alt={v.title} />
                <span aria-hidden="true">▶</span>
              </div>
              <h3>{v.title} ↗</h3>
            </a>
          ))}
        </div>
        <div className={s.sectionEnd}>
          <span>
            {L('Les images continuent ici.', 'The stories continue here.')}
          </span>
          <a
            href={SOCIAL_PROFILES.youtube}
            target="_blank"
            rel="noreferrer"
            className={s.pillLink}
          >
            YouTube
            <Arrow diagonal />
          </a>
        </div>
      </section>
    </StudioShell>
  );
}
