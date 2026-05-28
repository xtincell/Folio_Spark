import styles from '@/styles/galerie.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { GALLERIES, galleryUrl } from '@/components/folio/data/galleries';
import { YOUTUBE_VIDEOS, SOCIAL_PROFILES } from '@/components/folio/data/social-feed';

export const metadata = {
  title: 'Galerie — Photographie · Xtincell',
  description:
    "Galerie photo d'Alexandre « Xtincell » Djengue : mariages, festivals (KOF), portraits artistes (Locko, Lydol, H3riQ), corporate (AMMCO, Cabinet BeauSourire), reportages.",
};

const CATEGORIES = Array.from(
  new Set(GALLERIES.map((g) => g.category).filter(Boolean) as string[])
);

export default function GaleriePage() {
  return (
    <div className={styles.folioRoot}>
      <FolioTopbar label="GALERIE" active="galerie" />

      <main id="contenu">
      <section className={styles.head}>
        <div className={styles.eyebrow}>
          GALERIE <span className="sep">·</span> {GALLERIES.length} COLLECTIONS
          <span className="sep">·</span> HOSTED ON PIXIESET
        </div>
        <h1 className={styles.title}>
          La main tient <em>l&apos;outil</em>.
        </h1>
        <p className={styles.lede}>
          Mariages, festivals, portraits artistes, corporate, reportages. Chaque collection
          ouvre sur Pixieset — où les images vivent en pleine résolution, avec le contrôle
          d&apos;accès et de téléchargement que méritent les ayants droit.
        </p>
      </section>

      <div className={styles.filters}>
        {CATEGORIES.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      <section className={styles.grid}>
        {GALLERIES.map((g) => (
          <a
            key={g.slug}
            className={styles.card}
            href={galleryUrl(g)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ouvrir la galerie ${g.title} sur Pixieset`}
          >
            <div
              className={styles.cover}
              style={{
                backgroundImage: `url(${g.cover})`,
                backgroundPosition: g.bgPosition ?? '50% 50%',
              }}
            />
            <div className={styles.coverOverlay} />
            <span className={styles.arrow} aria-hidden="true">↗</span>
            <span className={styles.sourcePatch}>via Pixieset</span>
            {g.locked ? (
              <span className={styles.lockBadge}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="7" width="10" height="7" rx="1" />
                  <path d="M5 7V5a3 3 0 016 0v2" />
                </svg>
                Privée
              </span>
            ) : null}
            <div className={styles.meta}>
              {g.category ? <span className={styles.cat}>{g.category}</span> : null}
              <h3 className={styles.cardTitle}>{g.title}</h3>
              {g.date ? <span className={styles.date}>{g.date}</span> : null}
            </div>
          </a>
        ))}
      </section>

      {/* ============ Section "Aussi sur" — multiplateforme ============ */}
      <section className={styles.altHead}>
        <div className={styles.eyebrow}>
          AUSSI SUR <span className="sep">·</span> MULTIPLATEFORME
          <span className="sep">·</span> {YOUTUBE_VIDEOS.length} VIDÉOS YOUTUBE
        </div>
        <h2 className={styles.altTitle}>
          Au-delà de la <em>photo</em>.
        </h2>
        <p className={styles.lede}>
          Vidéo, motion, capsules, chroniques. Le travail vit aussi sur YouTube, Instagram
          et Facebook — chaque card ouvre la source d&apos;origine en plein écran.
        </p>
      </section>

      <section className={styles.ytGrid}>
        {YOUTUBE_VIDEOS.map((v) => (
          <a
            key={v.id}
            className={styles.ytCard}
            href={v.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Regarder « ${v.title} » sur YouTube`}
          >
            <div
              className={styles.ytCover}
              style={{ backgroundImage: `url(${v.thumb})` }}
            >
              <span className={styles.ytPlay} aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="22" fill="oklch(0.05 0 0 / 0.6)" />
                  <path d="M18 14l12 8-12 8V14z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.coverOverlay} />
            </div>
            <span className={styles.sourcePatch}>via YouTube</span>
            <div className={styles.ytMeta}>
              <h3 className={styles.ytTitle}>{v.title}</h3>
              {v.date ? <span className={styles.date}>{v.date}</span> : null}
            </div>
          </a>
        ))}
      </section>

      <section className={styles.profileRow}>
        <a
          className={styles.profileCard}
          href={SOCIAL_PROFILES.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.profileIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div>
            <div className={styles.profileLabel}>Instagram</div>
            <div className={styles.profileHandle}>@xtincell</div>
          </div>
          <span className={styles.sourcePatch}>via Instagram</span>
          <span className={styles.profileArrow} aria-hidden="true">↗</span>
        </a>

        <a
          className={styles.profileCard}
          href={SOCIAL_PROFILES.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.profileIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10.5H7.5v3h2.8V21h3.2Z" />
            </svg>
          </div>
          <div>
            <div className={styles.profileLabel}>Facebook</div>
            <div className={styles.profileHandle}>/xtincell</div>
          </div>
          <span className={styles.sourcePatch}>via Facebook</span>
          <span className={styles.profileArrow} aria-hidden="true">↗</span>
        </a>

        <a
          className={styles.profileCard}
          href={SOCIAL_PROFILES.youtube}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.profileIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M21.6 7.2a2.5 2.5 0 0 0-1.7-1.8C18.4 5 12 5 12 5s-6.4 0-7.9.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.7 1.8c1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8c.3-1.6.4-3.2.4-4.8 0-1.6-.1-3.2-.4-4.8ZM10 15V9l5 3-5 3Z" />
            </svg>
          </div>
          <div>
            <div className={styles.profileLabel}>YouTube — chaîne complète</div>
            <div className={styles.profileHandle}>@x-tincell</div>
          </div>
          <span className={styles.sourcePatch}>via YouTube</span>
          <span className={styles.profileArrow} aria-hidden="true">↗</span>
        </a>
      </section>

      <section className={styles.foot}>
        <h2>
          Une mission <em>photo</em> ?
        </h2>
        <p>
          Mariage, événement, campagne, portrait. Si l&apos;image doit raconter quelque chose,
          on devrait se parler.
        </p>
        <div className={styles.footRow}>
          <a
            className={styles.btn}
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp — {CONTACT.whatsappDisplay}
          </a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href={`mailto:${CONTACT.email}`}>
            Email — {CONTACT.email}
          </a>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href="https://xtincell.pixieset.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Index Pixieset ↗
          </a>
        </div>
      </section>
      </main>
    </div>
  );
}
