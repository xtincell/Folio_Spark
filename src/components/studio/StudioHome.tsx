'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, pick } from '@/lib/i18n';
import { CASE_STUDIES } from '@/components/folio/data/cases';
import { PRESS } from '@/components/folio/data/press';
import { STEPS } from '@/components/folio/data/method';
import {
  StudioShell,
  Arrow,
  Spark,
  ProjectCard,
  SectionHeading,
  StudioReveal,
} from './Studio';
import { Showreel } from './Showreel';
import { Hero } from '@/components/folio/Hero';
import home from '@/styles/home.module.css';
import s from '@/styles/studio.module.css';

const selected = [
  'friesland-campina',
  'goodlocs',
  'la-barre',
  'hero-shot',
  'cosmo-boba',
  'robuste-packaging',
]
  .map((slug) => CASE_STUDIES.find((p) => p.slug === slug)!)
  .filter(Boolean);
export function StudioHome() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  return (
    <StudioShell cover={<div className={home.folioRoot}><Hero /></div>}>
      <section className={s.reelChapter} id="showreel" aria-labelledby="showreel-heading">
        <div className={s.reelChapterHeading}>
          <div>
            <span className={s.eyebrow}>PLAY / SHOWREEL 2026</span>
            <h2 id="showreel-heading">{L('L’univers, en mouvement.', 'The world, in motion.')}</h2>
          </div>
          <p>{L(
            '48 secondes pour traverser les marques, les images et les systèmes. Une autre façon d’entrer dans mon travail.',
            '48 seconds through brands, images and systems. Another way into my work.'
          )}</p>
        </div>
        <Showreel />
      </section>
      <section className={s.section} id="selected">
        <SectionHeading
          number="01"
          title={L('La preuve par l’image.', 'The work speaks.')}
        >
          <p>
            {L(
              'Des marques, des histoires, des systèmes. Une sélection de projets qui relient le fond et la forme.',
              'Brands, stories, systems. Selected projects that connect meaning and form.'
            )}
          </p>
        </SectionHeading>
        <div className={s.selectedGrid}>
          {selected.map((p, i) => (
            <StudioReveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} index={i} />
            </StudioReveal>
          ))}
        </div>
        <div className={s.sectionEnd}>
          <span>
            {L(
              'Une sélection. Bien d’autres histoires.',
              'A selection. Many more stories.'
            )}
          </span>
          <Link href="/work" className={s.pillLink}>
            {L('Tous les projets', 'All projects')}
            <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section className={s.about} id="manifeste">
        <div className={s.aboutPortrait}>
          <Image
            src="/portrait.jpg"
            alt="Alexandre Djengue — Xtincell"
            width={610}
            height={762}
            sizes="(max-width: 700px) 100vw, 40vw"
          />
          <span>FIG. 01 — ALEXANDRE « XTINCELL » DJENGUE</span>
          <Spark />
        </div>
        <div className={s.aboutCopy}>
          <span className={s.eyebrow}>
            02 /{' '}
            {L('L’humain derrière le système', 'The human behind the system')}
          </span>
          <h2>
            {L('Un regard créatif.', 'A creative eye.')}
            <br />
            <em>{L('Un esprit d’ingénieur.', 'An engineer’s mind.')}</em>
          </h2>
          <p>
            {L(
              'Formé en télécommunications, façonné par 15 ans de création. Je navigue entre stratégie, direction artistique et production pour construire des marques qui ont du sens — et qui le gardent.',
              'Trained in telecommunications, shaped by 15 years of creative practice. I work across strategy, art direction and production to build brands with meaning — and staying power.'
            )}
          </p>
          <p className={s.muted}>
            {L(
              'Basé entre Douala et Yaoundé. Fondateur d’UPgraders, directeur créatif & artistique chez MATANGA Agency. Un ancrage africain, un terrain de jeu sans frontières.',
              'Based between Douala and Yaoundé. Founder of UPgraders, creative & art director at MATANGA Agency. African roots, a practice without borders.'
            )}
          </p>
          <Link href="/cv" className={s.textLink}>
            {L('Mon parcours, en détail', 'Explore my background')}
            <Arrow diagonal />
          </Link>
          <div className={s.aboutFacts}>
            <div>
              <strong>15</strong>
              <span>{L('années de pratique', 'years of practice')}</span>
            </div>
            <div>
              <strong>03</strong>
              <span>
                {L('disciplines, une vision', 'disciplines, one vision')}
              </span>
            </div>
            <div>
              <strong>∞</strong>
              <span>{L('curiosité intacte', 'endless curiosity')}</span>
            </div>
          </div>
        </div>
      </section>
      <section className={s.section} id="methode">
        <SectionHeading
          number="03"
          title={L('Du sens. Puis de l’impact.', 'Meaning. Then impact.')}
        >
          <p>
            {L(
              'ADVE / RTIS. Ma méthode pour relier l’identité d’une marque à sa trajectoire. Développée au sein d’UPgraders.',
              'ADVE / RTIS. My framework for connecting a brand’s identity to its trajectory. Developed at UPgraders.'
            )}
          </p>
        </SectionHeading>
        <div className={s.methodGrid}>
          <div className={s.methodIntro}>
            <span className={s.methodCode}>
              ADVE<span>↗</span>RTIS
            </span>
            <p>
              {L(
                'Le socle définit qui vous êtes. Le propulseur décide où vous allez.',
                'The foundation defines who you are. The engine decides where you go.'
              )}
            </p>
            <Link href="/tarifs" className={s.textLink}>
              {L(
                'Trouver le bon accompagnement',
                'Find the right collaboration'
              )}
              <Arrow />
            </Link>
          </div>
          <div className={s.methodSteps}>
            {STEPS.map((step, i) => (
              <details
                key={step.code}
                name="studio-method"
                className={s.methodStep}
              >
                <summary>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{pick(step.name, lang)}</h3>
                  <b aria-hidden="true">+</b>
                </summary>
                <p>{pick(step.body, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className={s.section} id="presse">
        <SectionHeading
          number="04"
          title={L('Hors du cadre.', 'Beyond the frame.')}
        >
          <p>
            {L(
              'Portraits, conversations et regards extérieurs sur le travail.',
              'Profiles, conversations and outside perspectives on the work.'
            )}
          </p>
        </SectionHeading>
        <div className={s.pressList}>
          {PRESS.map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
              <small>
                {item.outlet} · {pick(item.date, lang)}
              </small>
              <h3>{pick(item.title, lang)}</h3>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </section>
      <section className={s.exploreBand}>
        <span className={s.eyebrow}>
          {L('Un peu plus loin', 'Keep exploring')}
        </span>
        <div>
          <Link href="/galerie">
            <span>01</span>
            <h2>{L('L’œil & l’instant', 'The eye & the moment')}</h2>
            <p>
              {L(
                'Photographie, portraits, histoires vécues.',
                'Photography, portraits, lived stories.'
              )}
            </p>
            <Arrow diagonal />
          </Link>
          <Link href="/tech">
            <span>02</span>
            <h2>{L('L’idée & l’outil', 'The idea & the tool')}</h2>
            <p>
              {L(
                'Produits numériques, IA et systèmes créatifs.',
                'Digital products, AI and creative systems.'
              )}
            </p>
            <Arrow diagonal />
          </Link>
          <Link href="/upgraders">
            <span>03</span>
            <h2>{L('La force du collectif', 'Creative, together')}</h2>
            <p>
              {L(
                'UPgraders. La passion pour propulseur.',
                'UPgraders. Powered by passion.'
              )}
            </p>
            <Arrow diagonal />
          </Link>
        </div>
      </section>
    </StudioShell>
  );
}
