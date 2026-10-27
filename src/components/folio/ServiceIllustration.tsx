'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ServiceId } from './data/services';
import s from '@/styles/collaborations.module.css';

const GALLERIES: Record<ServiceId, { views: [string, string, string][]; href: string | undefined }> = {
  conseil: { views: [['ensemble', 'Vue d’ensemble', 'Overview'], ['diagnostic', 'Le diagnostic', 'The diagnosis'], ['positionnement', 'Le positionnement', 'Positioning'], ['feuille-de-route', 'La feuille de route', 'The roadmap']], href: undefined },
  identite: { views: [['ensemble', 'L’identité Cosmos Boba', 'Cosmos Boba identity'], ['logo', 'Le logo', 'The logo'], ['charte', 'La mini-charte', 'Essential guidelines'], ['applications', 'Exemple d’application', 'Application example']], href: '/work/cosmo-boba' },
  direction: { views: [['ensemble', 'Bonnet Rouge · avec MATANGA', 'Bonnet Rouge · with MATANGA'], ['concept', 'L’intention visuelle', 'Visual intent'], ['affiche', 'Le visuel principal', 'The key visual'], ['formats', 'Exemple de déclinaison', 'Adaptation example']], href: '/work/friesland-campina' },
  photo: { views: [['ensemble', 'La présentation des images', 'Image presentation'], ['tirage', 'Le regard photographique', 'The photographic eye'], ['selection', 'La sélection', 'The selection'], ['livraison', 'La livraison numérique', 'Digital delivery']], href: '/galerie?categorie=Portrait%20%C2%B7%20Musique' },
  web: { views: [['ensemble', 'Ordinateur & mobile', 'Desktop & mobile'], ['desktop', 'L’écran d’ordinateur', 'Desktop screen'], ['mobile', 'L’expérience mobile', 'Mobile experience'], ['structure', 'La structure de la page', 'Page structure']], href: '/tech' },
  motion: { views: [['ensemble', 'Montage & formats vidéo', 'Editing & video formats'], ['storyboard', 'Le déroulé', 'The outline'], ['vertical', 'Le format vertical', 'Portrait format'], ['montage', 'Le montage', 'The edit']], href: undefined },
};

/** Four distinct generated presentation mockups, not the entry package contents. */
export function ServiceIllustration({ id, lang }: { id: ServiceId; lang: 'fr' | 'en' }) {
  const L = (fr: string, en: string) => lang === 'fr' ? fr : en;
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const example = GALLERIES[id];
  const src = (slug: string) => `/studio/services/${id}-${slug === 'ensemble' ? 'mockup-v2' : slug + '-v3'}.webp`;
  function show(index: number) {
    const element = rail.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollTo({ left: index * element.clientWidth, behavior: reduced ? 'instant' : 'smooth' });
  }
  return <figure className={s.serviceFigure}>
    <div className={s.galleryRail} id={`gallery-${id}`} ref={rail} role="region"
      aria-roledescription={L('carrousel', 'carousel')} aria-label={L('Exemples illustrés', 'Illustrated examples')}
      tabIndex={0} onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault(); show(Math.max(0, Math.min(3, active + (event.key === 'ArrowRight' ? 1 : -1))));
        }
      }} onScroll={event => {
        const element = event.currentTarget;
        setActive(Math.max(0, Math.min(3, Math.round(element.scrollLeft / element.clientWidth))));
      }}>
      {example.views.map(([slug, fr, en], index) => <div key={slug} className={s.gallerySlide}
        role="group" aria-roledescription={L('vue', 'slide')} aria-label={`${index + 1} / 4`}>
        <Image src={src(slug)} alt={`${L(fr, en)} — ${L('mockup sur fond blanc', 'mockup on white')}`}
          fill sizes="(max-width: 699px) calc(100vw - 64px), (max-width: 1199px) 44vw, 30vw" />
      </div>)}
    </div>
    <div className={s.galleryControls}>
      <button type="button" onClick={() => show(active - 1)} disabled={active === 0}
        aria-label={L('Vue précédente', 'Previous view')} aria-controls={`gallery-${id}`}>←</button>
      <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / 04 · {example.views[active]![lang === 'fr' ? 1 : 2]}</span>
      <button type="button" onClick={() => show(active + 1)} disabled={active === 3}
        aria-label={L('Vue suivante', 'Next view')} aria-controls={`gallery-${id}`}>→</button>
    </div>
    <div className={s.galleryThumbs} aria-label={L('Choisir une vue', 'Choose a view')}>
      {example.views.map(([slug, fr, en], index) => <button key={slug} type="button" onClick={() => show(index)}
        aria-label={`${L('Afficher', 'Show')} ${index + 1} / 4 : ${L(fr, en)}`} aria-pressed={active === index}
        aria-controls={`gallery-${id}`}><Image src={src(slug)} alt="" fill sizes="(max-width: 699px) 20vw, 8vw" /></button>)}
    </div>
    <figcaption>{L('Mockups de présentation. Le contenu de la formule est détaillé ci-dessous.', 'Presentation mockups. Package contents are listed below.')}
    </figcaption>
    <div className={s.galleryAction}>{example.href && <Link href={example.href}>{L('Voir le projet', 'View the project')} ↗</Link>}
    {id === 'motion' && <details className={s.galleryFilm} onToggle={event => {
      const detail = event.currentTarget; if (!detail.open) detail.querySelector('video')?.pause();
    }}><summary>{L('Voir le showreel', 'Watch the showreel')} ↗</summary>
      <video controls preload="none" playsInline poster="/studio/showreel-poster.jpg" aria-label="Showreel Xtincell">
        <source src="/studio/showreel.mp4" type="video/mp4" /><a href="/studio/showreel.mp4">Showreel Xtincell</a>
      </video>
    </details>}</div>
  </figure>;
}
