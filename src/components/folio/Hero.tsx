import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { StarField } from './StarField';
import { Marquee } from './Marquee';
import { MastTitle } from './MastTitle';

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroBg}>
        <StarField density={80} />
        <div className={styles.heroGlow} />
      </div>

      <div className={styles.heroGrid}>
        <header className={styles.heroMasthead}>
          <div className={styles.mastRule}>
            <span>Vol. 15</span>
            <span className={styles.mastStatus}>
              <span className="dot" aria-hidden="true" />
              Disponible · Mandat 2026
            </span>
            <span>Folio · Édition 2026</span>
          </div>

          <div className={styles.mastKicker}>
            <span>—</span>
            <em>Alexandre Djengue</em>
            <span>—</span>
          </div>

          <MastTitle />

          <div className={styles.mastRule}>
            <span>Brand Architect</span>
            <span>Storytelling Consultant</span>
            <span>Toolsmith</span>
          </div>
        </header>

        <div>
          <h1 className={styles.heroTitle}>
            <span className="line">Je ne crée pas</span>
            <span className="line"><em>de l&apos;</em>art<em>.</em></span>
            <span className="line accent">Je systémise</span>
            <span className="line accent"><em>le</em> succès<em>.</em></span>
          </h1>

          <p className={styles.heroSub}>
            Directeur artistique formé en télécommunications. Je traite chaque marque
            comme un système d&apos;exploitation : ADN, signaux, flux, conversion.
          </p>

          <div className={styles.heroCta}>
            <Link href="/work" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>Voir le folio complet</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </Link>
            <Link href="/cv" className={`${styles.btn} ${styles.btnGhost}`}>
              <span>Lire le CV — 60 sec</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroPortrait}>
          <div className={styles.portraitFrame}>
            <Image
              src="/portrait.jpg"
              width={610}
              height={762}
              alt="Alexandre Djengue — portrait"
              priority
            />

            <div className={`${styles.portraitMacaron} ${styles.macaronPrimary}`}>
              <span className={styles.macaronEyebrow}>Rôle principal</span>
              <span className={styles.macaronTitle}>CEO</span>
              <span className={styles.macaronOrg}>UPgraders</span>
            </div>

            <div className={`${styles.portraitMacaron} ${styles.macaronSecondary}`}>
              <span className={styles.macaronEyebrow}>Mandat actif</span>
              <span className={styles.macaronTitle}>DC&amp;A</span>
              <span className={styles.macaronOrg}>MATANGA Agency</span>
            </div>

            <div className={styles.portraitTag}>
              <div className={styles.tagRow}><span>NOM</span><span>Djengue, Alexandre</span></div>
              <div className={styles.tagRow}><span>ALIAS</span><span>Xtincell</span></div>
              <div className={styles.tagRow}><span>BASE</span><span>YDE → ABJ</span></div>
              <div className={styles.tagRow}><span>VER</span><span>15.0 — 2026</span></div>
            </div>
          </div>
          <div className={styles.portraitCaption}>
            <em>Frame 001</em> — Studio, 2026
          </div>
        </div>
      </div>

      <Marquee />

      <a href="#manifeste" className={styles.heroScroll}>
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
