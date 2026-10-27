import Image from 'next/image';
import Link from 'next/link';
import type { ServiceId } from './data/services';
import s from '@/styles/collaborations.module.css';

/** Generated presentation mockups; original artwork remains in the linked cases. */
export function ServiceIllustration({ id, lang }: { id: ServiceId; lang: 'fr' | 'en' }) {
  const L = (fr: string, en: string) => lang === 'fr' ? fr : en;
  const examples = {
    conseil: { alt: L('Mockup sur fond blanc : dossier stratégique, synthèse et cartes de feuille de route.', 'Mockup on white: strategy booklet, summary and roadmap cards.'), caption: L('Mockup · dossier stratégique & feuille de route', 'Mockup · strategy pack & roadmap'), href: undefined },
    identite: { alt: L('Mockup sur fond blanc : logo Cosmos Boba, guide de marque ouvert et cartes d’application.', 'Mockup on white: Cosmos Boba logo, open brand guidelines and application cards.'), caption: L('Mockup · identité Cosmos Boba', 'Mockup · Cosmos Boba identity'), href: '/work/cosmo-boba' },
    direction: { alt: L('Mockup sur fond blanc : campagne Bonnet Rouge sur affiche et planche de direction artistique.', 'Mockup on white: Bonnet Rouge campaign poster and art direction board.'), caption: L('Mockup · Bonnet Rouge, avec MATANGA Agency', 'Mockup · Bonnet Rouge, with MATANGA Agency'), href: '/work/friesland-campina' },
    photo: { alt: L('Mockup sur fond blanc : photographie de Lydol présentée en tirages et pochette de livraison.', 'Mockup on white: Lydol photograph presented as prints with a delivery sleeve.'), caption: L('Mockup · présentation de photographies', 'Mockup · photography presentation'), href: '/galerie?categorie=Portrait%20%C2%B7%20Musique' },
    web: { alt: L('Mockup sur fond blanc : le site Xtincell présenté sur ordinateur et téléphone.', 'Mockup on white: the Xtincell website on desktop and phone.'), caption: L('Mockup · interface sur ordinateur & mobile', 'Mockup · desktop & mobile interface'), href: '/tech' },
    motion: { alt: L('Mockup sur fond blanc : film Peak en formats horizontal et vertical, accompagné d’une timeline de montage.', 'Mockup on white: a Peak film in landscape and portrait formats, with an editing timeline.'), caption: L('Mockup · montage, animation & formats vidéo', 'Mockup · editing, animation & video formats'), href: undefined },
  };
  const example = examples[id];
  const visual = <Image src={`/studio/services/${id}-mockup-v2.webp`} alt={example.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw" />;
  return <figure className={s.serviceFigure}>
    {id === 'motion' ? <details className={s.serviceFilm} onToggle={event => { const detail = event.currentTarget; if (!detail.open) detail.querySelector('video')?.pause(); }}>
      <summary className={s.serviceVisual} aria-label="Showreel Xtincell">
        {visual}<span className={s.filmPrompt}><span className={s.filmClosedOnly}>{L('Voir le film', 'Watch the film')} ↗</span><span className={s.filmOpenOnly}>{L('Fermer le film', 'Close the film')} ×</span></span>
      </summary>
      <div className={s.servicePlayer}><video controls preload="none" playsInline poster="/studio/showreel-poster.jpg" aria-label={L('Showreel Xtincell : montage et animation', 'Xtincell showreel: editing and animation')}>
        <source src="/studio/showreel.mp4" type="video/mp4" />
        <a href="/studio/showreel.mp4">{L('Ouvrir le showreel', 'Open the showreel')}</a>
      </video></div>
    </details> : example.href ? <Link href={example.href} className={s.serviceVisual} aria-label={`${L('Explorer :', 'Explore:')} ${example.caption}`}>{visual}</Link> : <div className={s.serviceVisual}>{visual}</div>}
    <figcaption>{example.caption}</figcaption>
  </figure>;
}
