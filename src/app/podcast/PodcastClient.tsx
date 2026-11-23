'use client';

import Link from 'next/link';
import { StudioShell, Arrow } from '@/components/studio/Studio';
import { useLang } from '@/lib/i18n';
import c from '@/styles/collaborations.module.css';
import s from '@/styles/podcast.module.css';

/* Créapreneur — page de la reprise (décembre 2026).
   À publier la semaine de la reprise seulement (plan de mise à jour, étape 1). */

const LISTEN = [
  { name: 'Spotify', href: 'https://open.spotify.com/episode/532RaByYUPr4hyNGwNlm33' },
  { name: 'Apple Podcasts', href: 'https://podcasts.apple.com/us/podcast/creapreneur/id1440424290' },
  { name: 'YouTube', href: 'https://www.youtube.com/@x-tincell' },
];

export function PodcastClient() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);

  return (
    <StudioShell>
      <div className={c.page} lang={lang}>
        <header className={c.hero}>
          <div className={c.heroMeta}>
            <span>{L('Podcast', 'Podcast')}</span>
            <span>{L('Un épisode par mois · le samedi à midi', 'One episode a month · Saturdays at noon')}</span>
          </div>
          <div className={c.heroGrid}>
            <h1>Créapreneur<br /><em>{L('revient.', 'is back.')}</em></h1>
            <div className={c.heroIntro}>
              <p>
                {L(
                  'Le podcast de l’entrepreneuriat créatif en Afrique francophone. Chaque mois, un créatif qui avance et qui bloque, ce qui le bloque vraiment, et la grille de lecture qui peut l’aider à avancer.',
                  'The podcast about creative entrepreneurship in French-speaking Africa. Each month, a creative who is moving forward and stuck, what is really holding them back, and the way of reading it that can help them move on.',
                )}
              </p>
              <a href="#ecouter" className={c.primary}>{L('Écouter', 'Listen')}<Arrow /></a>
              <span className={c.smallNote}>{L('Nouvelle saison à partir de décembre 2026.', 'New season from December 2026.')}</span>
            </div>
          </div>
        </header>

        <section className={s.section} aria-labelledby="format-heading">
          <h2 id="format-heading">{L('Le format', 'The format')}</h2>
          <ol className={s.steps}>
            <li><b>{L('Ce qui bloque', 'What is stuck')}</b>{L('Un créatif raconte où il en est : son travail, ses clients, ce qui ne passe pas.', 'A creative describes where they are: their work, their clients, what is not working.')}</li>
            <li><b>{L('Le diagnostic', 'The diagnosis')}</b>{L('On cherche ensemble la vraie raison, pas le symptôme.', 'Together we look for the real reason, not the symptom.')}</li>
            <li><b>{L('La grille de lecture', 'The way to read it')}</b>{L('Une façon de voir que d’autres créatifs peuvent réutiliser.', 'A way of seeing it that other creatives can reuse.')}</li>
            <li><b>{L('La mise en relation', 'The connection')}</b>{L('Quand c’est utile, une personne ou une ressource vers qui aller.', 'When it helps, a person or a resource to turn to.')}</li>
          </ol>
        </section>

        <section className={s.section} id="ecouter" aria-labelledby="listen-heading">
          <h2 id="listen-heading">{L('Où écouter', 'Where to listen')}</h2>
          <ul className={s.links}>
            {LISTEN.map((l) => (
              <li key={l.name}><a href={l.href} target="_blank" rel="noreferrer">{l.name}<Arrow diagonal /></a></li>
            ))}
          </ul>
          <p className={s.note}>
            {L('Des extraits paraissent aussi sur LinkedIn et Instagram.', 'Clips are also shared on LinkedIn and Instagram.')}{' '}
            <Link href="/wiki/projets/creapreneur-podcast">{L('Les archives (2018–2021)', 'The archive (2018–2021)')}</Link>
          </p>
        </section>

        <section className={s.section} aria-labelledby="micro-heading">
          <h2 id="micro-heading">{L('Passer au micro', 'Join an episode')}</h2>
          <p className={s.lede}>
            {L(
              'Vous êtes créatif et quelque chose vous bloque ? Écrivez-moi : certaines situations deviennent un épisode, avec votre accord.',
              'Are you a creative and something is holding you back? Write to me: some situations become an episode, with your consent.',
            )}
          </p>
          <Link href="/tarifs#point-de-depart" className={c.primary}>{L('Raconter ce qui bloque', 'Tell me what is stuck')}<Arrow /></Link>
        </section>
      </div>
    </StudioShell>
  );
}
