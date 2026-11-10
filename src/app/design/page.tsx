import { PageIndex } from '@/components/studio/PageIndex';
import { StudioFooter } from '@/components/studio/Studio';
import { PROJECT_PRESENTATIONS } from '@/lib/project-presentations';
import pageStudio from '@/styles/studioPages.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { LOCAL_GALLERY_COVERS } from '@/lib/gallery-assets';
import { CASE_STUDIES } from '@/components/folio/data/cases';
import { agencyForCase } from '@/components/folio/agencyCredit';
import { pageMeta } from '@/lib/page-meta';
import styles from '@/styles/design.module.css';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { CONTACT } from '@/components/folio/data/contact';
import { STEPS } from '@/components/folio/data/method';
import { GALLERIES, galleryUrl } from '@/components/folio/data/galleries';

export const metadata = pageMeta({
  path: '/design',
  title: 'Design Folio — Creative Direction, Photography & Tools · Xtincell',
  description:
    'Alexandre “Xtincell” Djengue: creative direction, photography and tool design. Selected work, personal experiments, project roles and collaborations.',
});

const DISCIPLINES = [
  {
    name: 'Brand Identity',
    desc: 'Naming, visual identity and guidelines, with a scope defined around the project and the people who will use them.',
  },
  {
    name: 'Art Direction',
    desc: 'Concepts and image direction for campaigns and artists. Choosing an approach, briefing collaborators and reviewing what we make.',
  },
  {
    name: 'Photography',
    desc: 'Studio, product, portrait and event photography. Looking, composing and working with the person or scene in front of the camera.',
  },
  {
    name: 'Motion & Video',
    desc: 'Music videos, advertising films and short social formats. Direction, shooting or editing, with responsibilities defined for each production.',
  },
  {
    name: 'Design Systems',
    desc: 'Brand kits, templates and asset libraries that give collaborators shared material and clear rules to work with.',
  },
  {
    name: 'AI-Assisted Tools',
    desc: 'Product and interface design, experiments and tools such as LaFusée. Built around recurring tasks in creative work.',
  },
];

const ENGLISH_CATEGORY: Record<string, string> = {
  'Événement': 'Event',
  'Festival · Pop culture': 'Festival · Pop culture',
  'Corporate': 'Corporate',
  'Mariage': 'Wedding',
  'Portrait · Musique': 'Portrait · Music',
  'Portrait': 'Portrait',
  'Reportage': 'Reportage',
};

export default function DesignFolioPage() {
  const cases = CASE_STUDIES.filter(p => !p.hidden && ['friesland-campina', 'goodlocs', 'hero-shot', 'robuste-packaging', 'lapasta', 'villa-corso', 'frutas', 'cosmo-boba'].includes(p.slug));
  const visuals = GALLERIES.filter(g => LOCAL_GALLERY_COVERS[g.slug]).slice(0, 8);

  return (
    // Page rédigée en anglais : lang="en" pour les lecteurs d'écran et le SEO,
    // le reste du site restant lang="fr".
    <div className={`${styles.designRoot} ${pageStudio.root}`} lang="en">
      <FolioTopbar active="design" />

      <main id="contenu">
        {/* HERO */}
        <section className={styles.hero} id="profile">
          <div className={styles.heroBg} />
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <div className={styles.eyebrow}>
              <span>Design Folio</span>
              <span className={styles.sep}>·</span>
              <span>Creative Direction</span>
              <span className={styles.sep}>·</span>
              <span>Photography &amp; Tools</span>
            </div>
            <h1 className={styles.heroTitle}>
              Because there’s always<br /><em>a way.</em>
            </h1>
            <p className={styles.heroLede}>
              I’m Alexandre “Xtincell” Djengue, a creative director, photographer and toolmaker.
              My background is in telecommunications and networks. I like understanding what
              stands in the way, finding a direction and working with others to make the next
              step possible.
            </p>
            <div className={styles.heroMeta}>
              <span><b>Since 2011</b> in creative practice</span>
              <span><b>Creative direction</b> &amp; photography</span>
              <span><b>Tools</b> for the work</span>
              <span><b>Based in Douala</b></span>
            </div>
            <div className={styles.heroCta}>
              <a href="#work" className={styles.btn}>Selected work</a>
              <Link href="/tarifs" className={`${styles.btn} ${styles.btnGhost}`}>Pricing & services</Link>
            </div>
          </div>
        </section>
        <PageIndex english items={[{ id: 'disciplines', fr: 'Disciplines', en: 'Disciplines' }, { id: 'work', fr: 'Selected work', en: 'Selected work' }, { id: 'visuals', fr: 'Visual index', en: 'Visual index' }, { id: 'approach', fr: 'Approach', en: 'Approach' }]} />

        {/* DISCIPLINES */}
        <section className={styles.section} id="disciplines">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className="num">01</span>
              <span>Disciplines</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Different crafts, <em>shared work</em>.
            </h2>
            <p className={styles.sectionLede}>
              Sometimes I make the image. Sometimes I help choose a direction or work with
              specialists to produce it. The scope depends on what the project needs.
            </p>
            <div className={styles.disciplines}>
              {DISCIPLINES.map((d, i) => (
                <article className={styles.discipline} key={d.name}>
                  <div className={styles.disciplineNum}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className={styles.disciplineName}>{d.name}</h3>
                  <p className={styles.disciplineDesc}>{d.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section className={styles.section} id="work">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className="num">02</span>
              <span>Selected work</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Art direction &amp; <em>execution</em>.
            </h2>
            <p className={styles.sectionLede}>
              Campaigns, identities and personal experiments. Each project gives its context,
              the work produced and the relevant credits. The full bilingual folio lives on the{' '}
              <Link href="/work" style={{ color: 'var(--accent)' }}>work page</Link>.
            </p>
            <div className={styles.work}>
              {cases.map(p => <Link className={styles.designProject} href={`/work/${p.slug}`} key={p.slug}>
                <div className={styles.designProjectImage}><Image src={PROJECT_PRESENTATIONS[p.slug] || p.hero} alt={p.name.en} fill sizes="(max-width:430px) 100vw, 50vw" /></div>
                {PROJECT_PRESENTATIONS[p.slug] && <small className={pageStudio.presentationCaption}>Generated presentation · original artwork inside</small>}
                <h3>{p.name.en}</h3><p>{p.tags.join(' · ')} / {p.year}</p>
                {agencyForCase(p.slug) && <small>With {agencyForCase(p.slug)}</small>}
              </Link>)}
            </div>
          </div>
        </section>

        {/* VISUAL INDEX */}
        <section className={styles.section} id="visuals">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className="num">03</span>
              <span>Visual index</span>
            </div>
            <h2 className={styles.sectionTitle}>
              And I still <em>take photographs</em>.
            </h2>
            <p className={styles.sectionLede}>
              Selected photographic collections — weddings, festivals, artist portraits and
              corporate. Each tile opens the full collection on Pixieset.
            </p>
            <div className={styles.visualGrid}>
              {visuals.map((g) => (
                <a
                  key={g.slug}
                  className={styles.tile}
                  href={galleryUrl(g)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${g.title} collection on Pixieset`}
                >
                  <div
                    className={styles.tileCover}
                    style={{
                      backgroundImage: `url(${LOCAL_GALLERY_COVERS[g.slug] || g.cover})`,
                      backgroundPosition: g.bgPosition ?? '50% 50%',
                    }}
                  />
                  <div className={styles.tileOverlay} />
                  <span className={styles.tileArrow} aria-hidden="true">↗</span>
                  <div className={styles.tileMeta}>
                    {g.category ? (
                      <span className={styles.tileCat}>
                        {ENGLISH_CATEGORY[g.category] ?? g.category}
                      </span>
                    ) : null}
                    <h3 className={styles.tileTitle}>{g.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section className={styles.section} id="approach">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className="num">04</span>
              <span>Approach — ADVE/RTIS</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Make the choices <em>clear</em>.
            </h2>
            <p className={styles.sectionLede}>
              ADVE/RTIS is a framework I use at UPgraders to connect identity and action.
              It gives us questions to work through, choices to discuss and a basis for the
              next step. Its use depends on the scope of the project.
            </p>
            <div className={styles.approach}>
              {STEPS.map((s) => (
                <article className={styles.step} key={s.code}>
                  <div className={styles.stepCode}>{s.code}</div>
                  <div className={styles.stepName}>{s.name.en}</div>
                  <p className={styles.stepSub}>{s.sub.en}</p>
                </article>
              ))}
            </div>
            <p className={styles.approachNote}>
              ADVE — Authenticity · Distinction · Value · Engagement · RTIS — Risk · Track · Innovation · Strategy
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className={`${styles.wrap} ${styles.cta}`} id="project">
          <h2 className={styles.ctaTitle}>
            Let’s find <em>the next step</em>.
          </h2>
          <p className={styles.ctaLede}>
            Tell me what you want to make and what is getting in the way. We can clarify the
            work, the people it needs and where I can contribute.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/tarifs" className={styles.btn}>Working together</Link>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
              WhatsApp — {CONTACT.whatsappDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={`${styles.btn} ${styles.btnGhost}`}>
              {CONTACT.email}
            </a>
            <a href={CONTACT.behance} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
              Behance ↗
            </a>
          </div>
          <div className={styles.footStrip}>
            <span>XTINCELL · Alexandre Djengue</span>
            <span>·</span>
            <span>Creative direction · Photography · Tools</span>
            <span>·</span>
            <span>© 2026</span>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
