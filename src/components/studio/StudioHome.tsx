'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLang, pick } from '@/lib/i18n';
import { CASE_STUDIES } from '@/components/folio/data/cases';
import { PRESS } from '@/components/folio/data/press';
import { STEPS } from '@/components/folio/data/method';
import { StudioShell, Arrow, ProjectCard, SectionHeading } from './Studio';
import { Showreel } from './Showreel';
import { Hero } from '@/components/folio/Hero';
import home from '@/styles/home.module.css';
import s from '@/styles/studio.module.css';

const selected = ['friesland-campina', 'goodlocs', 'robuste-packaging', 'ecobank', 'cap-esterias', 'la-barre']
  .map(slug => CASE_STUDIES.find(project => project.slug === slug)!)
  .filter(Boolean);

export function StudioHome() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => lang === 'fr' ? fr : en;
  return (
    <StudioShell cover={<div className={home.folioRoot}><Hero /></div>}>
      <section className={s.reelChapter} id="showreel" aria-labelledby="showreel-heading">
        <div className={s.reelChapterHeading}>
          <h2 id="showreel-heading">{L('L’étincelle', 'The spark')}<br />{L('prend vie.', 'comes alive.')}</h2>
          <div className={s.reelIntroduction}>
            <p>{L('Des marques, des images, des systèmes. Traversez mon univers en 48 secondes.', 'Brands, images, systems. Step into my world in 48 seconds.')}</p>
            <span>{L('Showreel 2026 · Film sans son', 'Showreel 2026 · Silent film')}</span>
          </div>
        </div>
        <Showreel />
      </section>

      <section className={`${s.section} ${s.workSelection}`} id="selected">
        <SectionHeading number="" title={L('Des idées qui prennent forme.', 'Ideas, taking shape.')}>
          <p>{L('Campagnes, identités, produits. Chaque projet commence par une intention et se construit jusque dans les détails.', 'Campaigns, identities, products. Every project starts with an intention, carried through to the smallest details.')}</p>
        </SectionHeading>
        <div className={s.campaigns}>
          {selected.map((project, i) => {
            const lead = i === 0 || i === 3;
            const detail = project.gallery.find(img => img.src !== project.hero);
            return <article key={project.slug} className={lead ? s.campaignLead : s.campaignPair}>
              <ProjectCard project={project} index={i} featured={lead} />
              {lead && <div className={s.campaignNote}>
                <p>{pick(project.context, lang)}</p>
                {detail && <figure><Image src={detail.src} alt={detail.alt ? pick(detail.alt, lang) : `${pick(project.name, lang)} — ${L('détail de la campagne', 'campaign detail')}`} width={680} height={680} sizes="(max-width: 760px) 80vw, 26vw" loading="lazy" /><figcaption>{L('Une campagne, plusieurs expressions.', 'One campaign, many expressions.')}</figcaption></figure>}
              </div>}
            </article>;
          })}
        </div>
        <div className={s.sectionEnd}>
          <p>{L('Le fil continue.', 'There’s more to the story.')}</p>
          <Link href="/work" className={s.pillLink}>{L('Explorer tous les projets', 'Explore all projects')}<Arrow diagonal /></Link>
        </div>
      </section>

      <section className={s.about} id="manifeste">
        <div className={s.aboutPortrait}>
          <Image src="/portrait-p2.jpg" alt="Alexandre Djengue — Xtincell" width={610} height={762} sizes="(max-width: 760px) 100vw, 40vw" />
          <span>Alexandre Djengue · Xtincell</span>
        </div>
        <div className={s.aboutCopy}>
          <h2>{L('Créer des images.', 'Create images.')}<br />{L('Construire des systèmes.', 'Build systems.')}</h2>
          <p>{L('Formé en télécommunications, façonné par 15 ans de création. Je navigue entre stratégie, direction artistique et production pour construire des marques qui ont du sens — et qui le gardent.', 'Trained in telecommunications, shaped by 15 years of creative practice. I work across strategy, art direction and production to build brands with meaning — and staying power.')}</p>
          <p className={s.muted}>{L('Basé entre Douala et Yaoundé. Fondateur d’UPgraders, directeur créatif & artistique chez MATANGA Agency. Un ancrage africain, un terrain de jeu sans frontières.', 'Based between Douala and Yaoundé. Founder of UPgraders, creative & art director at MATANGA Agency. African roots, a practice without borders.')}</p>
          <Link href="/cv" className={s.textLink}>{L('Découvrir mon parcours', 'Explore my background')}<Arrow diagonal /></Link>
          <div className={s.aboutFacts}>
            <div><strong>Brand Architect</strong><span>{L('Du positionnement à l’identité.', 'From positioning to identity.')}</span></div>
            <div><strong>Storytelling Consultant</strong><span>{L('De l’intention au récit.', 'From intention to narrative.')}</span></div>
            <div><strong>Toolsmith</strong><span>{L('De la méthode aux outils.', 'From method to tools.')}</span></div>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.methodSection}`} id="methode">
        <SectionHeading number="" title={L('L’intuition a une méthode.', 'Instinct has a method.')}>
          <p>{L('ADVE / RTIS. Une méthode développée au sein d’UPgraders pour relier ce qu’une marque est à ce qu’elle fait.', 'ADVE / RTIS. A method developed at UPgraders to connect what a brand is with what it does.')}</p>
        </SectionHeading>
        <div className={s.methodPanels}>
          {(['Socle', 'Propulseur'] as const).map((group, index) => <div className={s.methodPanel} key={group}>
            <div className={s.methodPanelHead}><h3>{index === 0 ? 'ADVE' : 'RTIS'}</h3><p>{index === 0 ? L('Définir le socle.', 'Define the foundation.') : L('Construire la trajectoire.', 'Build the trajectory.')}</p><Arrow diagonal /></div>
            <div>{STEPS.filter(step => step.group === group).map(step => <details key={step.code} name={`studio-method-${group}`} className={s.methodStep}><summary><span>{step.code}</span><h4>{pick(step.name, lang)}</h4><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3v14" stroke="currentColor" strokeWidth="1.2" /></svg></summary><p>{pick(step.body, lang)}</p></details>)}</div>
          </div>)}
        </div>
        <div className={s.sectionEnd}><p>{L('Un projet à cadrer, une marque à faire grandir.', 'A project to shape, a brand to grow.')}</p><Link href="/tarifs" className={s.pillLink}>{L('Voir les accompagnements', 'Explore services')}<Arrow diagonal /></Link></div>
      </section>

      <section className={s.exploreBand}>
        <Link href="/galerie" className={s.photoInvitation}>
          <div><Image src="/work/galerie-pixieset/03-lydol-portrait.jpg" alt="Lydol, portrait photographique par Xtincell" width={1200} height={800} sizes="(max-width: 760px) 100vw, 65vw" loading="lazy" /></div>
          <div className={s.photoInvitationTitle}><h2>{L('Saisir le vivant.', 'Capture the living.')}</h2><span>{L('Explorer les collections photo', 'Explore the photography')}<Arrow diagonal /></span></div>
        </Link>
        <div className={s.exploreLinks}>
          <Link href="/tech"><h2>{L('L’idée devient outil.', 'Ideas become tools.')}</h2><p>{L('Produits numériques, IA et systèmes créatifs.', 'Digital products, AI and creative systems.')}</p><Arrow diagonal /></Link>
          <Link href="/upgraders"><h2>{L('La force du collectif.', 'Creative, together.')}</h2><p>{L('UPgraders. La passion pour propulseur.', 'UPgraders. Powered by passion.')}</p><Arrow diagonal /></Link>
        </div>
      </section>

      <section className={`${s.section} ${s.pressSection}`} id="presse">
        <SectionHeading number="" title={L('La conversation continue.', 'The conversation continues.')} />
        <div className={s.pressList}>{PRESS.map(item => <a key={item.url} href={item.url} target="_blank" rel="noreferrer"><small>{item.outlet} · {pick(item.date, lang)}</small><h3>{pick(item.title, lang)}</h3><Arrow diagonal /></a>)}</div>
      </section>
    </StudioShell>
  );
}
