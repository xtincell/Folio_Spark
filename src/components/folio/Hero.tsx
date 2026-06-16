'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { StarField } from './StarField';
import { Marquee } from './Marquee';
import { MastTitle } from './MastTitle';
import { useT } from '@/lib/i18n';

export function Hero() {
  const t = useT();
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroBg}>
        <StarField density={80} />
        <div className={styles.heroGlow} />
      </div>

      <div className={styles.heroGrid}>
        <header className={styles.heroMasthead}>
          <div className={styles.mastRule}>
            <span>{t.hero.vol}</span>
            <span className={styles.mastStatus}>
              <span className="dot" aria-hidden="true" />
              {t.hero.status}
            </span>
            <span>{t.hero.edition}</span>
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
            <span className="line">{t.hero.titleL1}</span>
            <span className="line">
              {t.hero.titleL2a ? <em>{t.hero.titleL2a}</em> : null}
              {t.hero.titleL2b}
              <em>.</em>
            </span>
            <span className="line accent">{t.hero.titleL3}</span>
            <span className="line accent">
              {t.hero.titleL4a ? (
                <>
                  <em>{t.hero.titleL4a}</em>{' '}
                </>
              ) : null}
              {t.hero.titleL4b}
              <em>.</em>
            </span>
          </h1>

          <p className={styles.heroSub}>{t.hero.sub}</p>

          <div className={styles.heroCta}>
            <Link href="/work" className={`${styles.btn} ${styles.btnPrimary}`}>
              <span>{t.hero.ctaFolio}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </Link>
            <Link href="/cv" className={`${styles.btn} ${styles.btnGhost}`}>
              <span>{t.hero.ctaCv}</span>
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
              <span className={styles.macaronEyebrow}>{t.hero.macaronRole}</span>
              <span className={styles.macaronTitle}>CEO</span>
              <span className={styles.macaronOrg}>UPgraders</span>
            </div>

            <div className={`${styles.portraitMacaron} ${styles.macaronSecondary}`}>
              <span className={styles.macaronEyebrow}>{t.hero.macaronMandate}</span>
              <span className={styles.macaronTitle}>DC&amp;A</span>
              <span className={styles.macaronOrg}>MATANGA Agency</span>
            </div>

            <div className={styles.portraitTag}>
              <div className={styles.tagRow}><span>{t.hero.tagName}</span><span>Djengue, Alexandre</span></div>
              <div className={styles.tagRow}><span>{t.hero.tagAlias}</span><span>Xtincell</span></div>
              <div className={styles.tagRow}><span>{t.hero.tagBase}</span><span>YDE → ABJ</span></div>
              <div className={styles.tagRow}><span>{t.hero.tagVer}</span><span>15.0 — 2026</span></div>
            </div>
          </div>
          <div className={styles.portraitCaption}>
            <em>Frame 001</em> — {t.hero.caption}
          </div>
        </div>
      </div>

      <Marquee />

      <a href="#manifeste" className={styles.heroScroll}>
        <span>{t.hero.scroll}</span>
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
