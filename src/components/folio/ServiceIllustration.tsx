import Image from 'next/image';
import Link from 'next/link';
import type { ServiceId } from './data/services';
import s from '@/styles/collaborations.module.css';

/** Illustrations describe the deliverable; example work keeps its project credits. */
export function ServiceIllustration({ id, lang }: { id: ServiceId; lang: 'fr' | 'en' }) {
  const L = (fr: string, en: string) => lang === 'fr' ? fr : en;
  if (id === 'conseil') return <figure className={s.serviceFigure}>
    <div className={`${s.serviceVisual} ${s.serviceDiagram}`}>
      <svg viewBox="0 0 480 300" role="img" aria-label={L('Illustration : un atelier transforme les questions de cible, message et priorités en une feuille de route écrite.', 'Illustration: a workshop turns audience, message and priorities into a written roadmap.')}>
        <g fill="none" stroke="currentColor" strokeWidth="1"><rect x="28" y="40" width="188" height="220"/><path d="M216 150H256m-10-10 10 10-10 10"/><rect x="270" y="58" width="182" height="184"/></g>
        <g fill="currentColor"><text x="46" y="72" fontSize="13">01 / {L('L’ATELIER', 'WORKSHOP')}</text><text x="46" y="117" fontSize="24">{L('La cible.', 'Audience.')}</text><text x="46" y="156" fontSize="24">{L('Le message.', 'Message.')}</text><text x="46" y="195" fontSize="24">{L('Les priorités.', 'Priorities.')}</text><text x="288" y="91" fontSize="13">02 / {L('LA SYNTHÈSE', 'SUMMARY')}</text><text x="288" y="135" fontSize="23">{L('Feuille', 'Your')}</text><text x="288" y="163" fontSize="23">{L('de route.', 'roadmap.')}</text></g>
        <g stroke="var(--orange)" strokeWidth="3"><path d="M47 227H116M289 193H424M289 207H392M289 221H410"/></g>
      </svg>
    </div>
    <figcaption>{L('Illustration · de l’atelier au plan d’action', 'Illustration · from workshop to action plan')}</figcaption>
  </figure>;

  if (id === 'web') return <figure className={s.serviceFigure}>
    <div className={`${s.serviceVisual} ${s.serviceDiagram}`}>
      <svg viewBox="0 0 480 300" role="img" aria-label={L('Illustration d’une même page web adaptée à un ordinateur et à un téléphone.', 'Illustration of the same web page adapted to desktop and phone screens.')}>
        <g fill="var(--paper)" stroke="currentColor"><rect x="28" y="36" width="345" height="220" rx="4"/><path d="M28 64H373"/></g>
        <g fill="currentColor"><text x="44" y="55" fontSize="11">{L('VOTRE SITE', 'YOUR WEBSITE')}</text><text x="48" y="107" fontSize="26">{L('Votre marque.', 'Your brand.')}</text></g>
        <g stroke="currentColor" strokeWidth="2"><path d="M49 126H194M49 139H174M49 152H186M49 217H308M49 230H270"/></g>
        <g fill="var(--orange)"><rect x="49" y="174" width="92" height="20"/><rect x="219" y="87" width="133" height="107"/></g>
        <path d="M236 173 271 118 310 173M271 118 330 157" fill="none" stroke="var(--paper)" strokeWidth="2"/>
        <rect x="330" y="102" width="121" height="174" rx="9" fill="var(--paper)" stroke="currentColor"/>
        <text x="344" y="129" fontSize="11" fill="currentColor">{L('VOTRE SITE', 'YOUR WEBSITE')}</text>
        <path d="M344 146H425M344 156H408M344 248H426M344 259H407" stroke="currentColor" strokeWidth="2"/>
        <rect x="344" y="175" width="94" height="59" fill="var(--orange)"/>
        <path d="M354 222 377 186 409 222" fill="none" stroke="var(--paper)" strokeWidth="2"/>
      </svg>
    </div>
    <figcaption>{L('Illustration · une interface, plusieurs écrans', 'Illustration · one interface, multiple screens')}</figcaption>
  </figure>;

  if (id === 'motion') return <figure className={s.serviceFigure}>
    <div className={s.serviceVisual}>
      <video controls preload="none" playsInline poster="/studio/showreel-poster.jpg" aria-label={L('Lire le showreel Xtincell, exemple de montage et d’animation', 'Play the Xtincell showreel, an editing and animation example')}>
        <source src="/studio/showreel.mp4" type="video/mp4" />
        <a href="/studio/showreel.mp4">{L('Ouvrir le showreel', 'Open the showreel')}</a>
      </video>
    </div>
    <figcaption>{L('Exemple · showreel Xtincell, montage & animation', 'Example · Xtincell showreel, editing & animation')}</figcaption>
  </figure>;

  const example = id === 'identite' ? {
    src: '/work/cases/cosmo-boba/04.webp', href: '/work/cosmo-boba', contain: true,
    alt: L('Logo illustré Cosmos Boba : lettrage, cup et perles de bubble tea.', 'Illustrated Cosmos Boba logo: lettering, cup and bubble tea pearls.'),
    caption: L('Exemple · identité Cosmos Boba', 'Example · Cosmos Boba identity'),
  } : id === 'direction' ? {
    src: '/work/cases/friesland-campina/02.webp', href: '/work/friesland-campina', contain: true,
    alt: L('Visuel de campagne Bonnet Rouge : message, scène familiale, produit et repères de marque.', 'Bonnet Rouge campaign visual: message, family scene, product and brand cues.'),
    caption: L('Exemple · Bonnet Rouge, avec MATANGA Agency', 'Example · Bonnet Rouge, with MATANGA Agency'),
  } : {
    src: '/work/galerie-pixieset/03-lydol-portrait.jpg', href: '/galerie?categorie=Portrait%20%C2%B7%20Musique', contain: false,
    alt: L('Photographie de Lydol sur scène, chantant au micro.', 'Photograph of Lydol on stage, singing into a microphone.'),
    caption: L('Exemple · Lydol, photographie de scène', 'Example · Lydol, stage photography'),
  };
  return <figure className={s.serviceFigure}>
    <Link href={example.href} className={`${s.serviceVisual} ${example.contain ? s.serviceContain : ''}`} aria-label={`${L('Voir l’exemple :', 'View example:')} ${example.caption}`}>
      <Image src={example.src} alt={example.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw" />
    </Link>
    <figcaption>{example.caption}</figcaption>
  </figure>;
}
