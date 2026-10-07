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
  title: 'Design Folio — Art Direction & Visual Systems · Xtincell',
  description:
    'The English design folio of Alexandre “Xtincell” Djengue — Brand Architect & Art Director. Brand identity, art direction, photography, motion and design systems for premium brands and artists.',
});

const DISCIPLINES = [
  {
    name: 'Brand Identity',
    desc: 'Naming, logo systems, visual language and guidelines built to scale — identity as infrastructure, not decoration.',
  },
  {
    name: 'Art Direction',
    desc: 'Concept, casting, styling and image direction for campaigns, artists and premium brands. Coherence across every frame.',
  },
  {
    name: 'Photography',
    desc: 'Studio, product, portrait and event photography. Fifteen years behind the lens for FMCG, music and hospitality.',
  },
  {
    name: 'Motion & Video',
    desc: 'Music videos, advertising films and social capsules — directing, image and edit, multi-format delivery.',
  },
  {
    name: 'Design Systems',
    desc: 'Componentised brand kits, templates and asset libraries so a brand stays consistent at production speed.',
  },
  {
    name: 'AI-Assisted Studio',
    desc: 'LaFusée — a governed, AI-assisted pipeline that runs the ADVE/RTIS method without diluting direction.',
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
      <PageIndex english items={[{ id: 'disciplines', fr: 'Disciplines', en: 'Disciplines' }, { id: 'work', fr: 'Selected work', en: 'Selected work' }, { id: 'visuals', fr: 'Visual index', en: 'Visual index' }, { id: 'approach', fr: 'Approach', en: 'Approach' }]} />

      <main id="contenu">
        {/* HERO */}
        <section className={styles.hero} id="profile">
          <div className={styles.heroBg} />
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <div className={styles.eyebrow}>
              <span>Design Folio</span>
              <span className={styles.sep}>·</span>
              <span>Art Direction</span>
              <span className={styles.sep}>·</span>
              <span>Visual Systems</span>
            </div>
            <h1 className={styles.heroTitle}>
              Design as <em>infrastructure</em>,<br />not decoration.
            </h1>
            <p className={styles.heroLede}>
              I’m Alexandre “Xtincell” Djengue — a Brand Architect and Art Director trained as
              a telecom engineer. I design identities, campaigns and image systems for premium
              brands and artists across West &amp; Central Africa, treating every brand like an
              operating system: DNA, signals, flows, conversion.
            </p>
            <div className={styles.heroMeta}>
              <span><b>15+ yrs</b> in the craft</span>
              <span><b>25+ brands</b> &amp; artists</span>
              <span><b>3 practices</b> — strategy · direction · execution</span>
              <span><b>Yaoundé · Douala · Abidjan</b></span>
            </div>
            <div className={styles.heroCta}>
              <a href="#work" className={styles.btn}>Selected work</a>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
                Start a project
              </a>
            </div>
          </div>
        </section>

        {/* DISCIPLINES */}
        <section className={styles.section} id="disciplines">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <span className="num">01</span>
              <span>Disciplines</span>
            </div>
            <h2 className={styles.sectionTitle}>
              One studio, the <em>full chain</em>.
            </h2>
            <p className={styles.sectionLede}>
              From the first positioning conversation to the delivered pixel — these are the
              crafts I cover, each a complete discipline rather than an add-on.
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
              A curated set of art-direction and production cases — music, FMCG, hospitality
              and luxury. The full bilingual folio lives on the{' '}
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
              The hand holds <em>the tool</em>.
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
              A method, not a <em>mood board</em>.
            </h2>
            <p className={styles.sectionLede}>
              Every project runs on ADVE/RTIS — an ADVE foundation (the identity) and an RTIS
              propellant (the action). It’s the proprietary method behind UPgraders and LaFusée.
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
            Let’s build a <em>system</em>.
          </h2>
          <p className={styles.ctaLede}>
            Brief, project or plain curiosity. If you have a brand or an image that needs to say
            something, we should talk.
          </p>
          <div className={styles.ctaRow}>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className={styles.btn}>
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
            <span>Brand Architect &amp; Art Director</span>
            <span>·</span>
            <span>© 2026</span>
          </div>
        </section>
      </main>
      <StudioFooter />
    </div>
  );
}
