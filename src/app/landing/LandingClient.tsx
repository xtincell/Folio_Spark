'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { StarField } from '@/components/folio/StarField';
import { Reveal } from '@/components/folio/Reveal';
import { CONTACT } from '@/components/folio/data/contact';
import styles from '@/styles/landing.module.css';
import { agencyForCase } from '@/components/folio/agencyCredit';
import { AgencyMacaron } from '@/components/folio/AgencyMacaron';

const WA_HREF = `${CONTACT.whatsappLink}?text=${encodeURIComponent(
  'Bonjour Alexandre, je viens de votre landing — parlons de ma marque.',
)}`;

const MARQUEE = [
  'Direction Artistique',
  'Brand Systems',
  'Storytelling',
  'Photographie',
  'AI Workflows',
  'Méthode ADVE/RTIS',
  'LaFusée OS',
];

const METHOD_CHIPS = ['A', 'D', 'V', 'E', 'R', 'T', 'I', 'S'];

const LETTERS: [string, number][] = [
  ['X', 0.22],
  ['T', 0.27],
  ['I', 0.32],
  ['N', 0.37],
  ['C', 0.42],
  ['E', 0.47],
  ['L', 0.52],
  ['L', 0.57],
];

type Proof = { name: string; tag: string; meta: string; img: string; slug: string };

const PROOF_CARDS: Proof[] = [
  { name: 'Tradex 2T', tag: 'Campagne', meta: 'Image de marque · FMCG', img: '/work/cases/tradex/hero.webp', slug: 'tradex' },
  { name: 'Musina Festival', tag: 'DA & image', meta: 'Festival · Pop culture', img: '/work/cases/musina-festival/hero.webp', slug: 'musina-festival' },
  { name: 'Peak & Bonnet Rouge', tag: 'Exécution', meta: 'FrieslandCampina', img: '/work/cases/friesland-campina/hero.webp', slug: 'friesland-campina' },
  { name: 'Brasseries du Cameroun', tag: 'Conseil', meta: 'Top · Activation', img: '/work/cases/brasseries-du-cameroun/hero.webp', slug: 'brasseries-du-cameroun' },
  { name: 'KOF Festival', tag: 'Identité', meta: 'Direction artistique', img: '/work/cases/kof-festival/hero.webp', slug: 'kof-festival' },
  { name: 'Cover musical', tag: 'Musique', meta: 'UMA · Artistes', img: '/work/cases/cover-musical/hero.webp', slug: 'cover-musical' },
];

const HATS: { n: string; title: string; sub: string }[] = [
  { n: '01', title: 'Brand Architect', sub: 'Stratégie + systèmes de marque' },
  { n: '02', title: 'Direction Artistique', sub: 'Image, scénographie, identité' },
  { n: '03', title: 'Exécution', sub: 'Photo, vidéo, livrables — hands on' },
];

export function LandingClient() {
  const [docked, setDocked] = useState(false);
  const [clock, setClock] = useState('--:--');

  const mastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const plxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // Horloge Douala (GMT+1)
    let lastClock = '--:--';
    const tick = () => {
      try {
        const t = new Intl.DateTimeFormat('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Africa/Douala',
        }).format(new Date());
        if (t !== lastClock) {
          lastClock = t;
          setClock(t);
        }
      } catch {
        /* noop */
      }
    };
    tick();
    const clockId = window.setInterval(tick, 20000);
    cleanups.push(() => clearInterval(clockId));

    // Scroll : progression + dock + parallaxe
    let plxRaf = 0;
    let lastDocked = false;
    const onScroll = () => {
      const pb = progressRef.current;
      if (pb) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        pb.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0).toFixed(2) + '%';
      }
      const d = window.scrollY > window.innerHeight * 0.7;
      if (d !== lastDocked) {
        lastDocked = d;
        setDocked(d);
      }
      if (!plxRaf) {
        plxRaf = requestAnimationFrame(() => {
          plxRaf = 0;
          const el = plxRef.current;
          if (!el) return;
          const vc = window.innerHeight / 2;
          const r = el.getBoundingClientRect();
          if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
          const dd = (r.top + r.height / 2 - vc) / vc;
          el.style.transform = 'scale(1.06) translateY(' + (dd * 14).toFixed(1) + 'px)';
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    // Tilt masthead (desktop, pointeur fin)
    const mast = mastRef.current;
    if (
      mast &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const zone = mast.closest('section') || document.body;
      let raf = 0;
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      const run = () => {
        cx += (tx - cx) * 0.09;
        cy += (ty - cy) * 0.09;
        mast.style.transform =
          'perspective(900px) rotateX(' + (-cy * 5).toFixed(2) + 'deg) rotateY(' + (cx * 7).toFixed(2) + 'deg)';
        if (Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004) raf = requestAnimationFrame(run);
        else raf = 0;
      };
      const onMove = (e: PointerEvent) => {
        const r = zone.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
        if (!raf) raf = requestAnimationFrame(run);
      };
      const recenter = () => {
        tx = 0;
        ty = 0;
        if (!raf) raf = requestAnimationFrame(run);
      };
      zone.addEventListener('pointermove', onMove as EventListener, { passive: true });
      zone.addEventListener('pointerleave', recenter, { passive: true });
      cleanups.push(() => {
        zone.removeEventListener('pointermove', onMove as EventListener);
        zone.removeEventListener('pointerleave', recenter);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((fn) => fn && fn());
  }, []);

  return (
    <div className={styles.folioRoot}>
      <div ref={progressRef} aria-hidden="true" className={styles.progress} />

      {/* ===== Écran 1 · Cover ===== */}
      <section className={styles.cover}>
        <div aria-hidden="true" className={styles.coverBg}>
          <StarField density={95} />
          <div className={styles.coverVignette} />
        </div>

        <div className={styles.coverInner}>
          {/* Ours magazine */}
          <div className={styles.ours}>
            <span className={styles.oursItem}>
              <img src="/logos/spark-mark.svg" alt="" style={{ height: 16, width: 'auto' }} />
              Vol. 15
            </span>
            <span className={`${styles.oursItem} ${styles.oursLive}`}>
              <span className={styles.dot} />
              Disponible
            </span>
            <span className={styles.oursClock}>{clock} — DLA</span>
          </div>

          <div className={styles.center}>
            <div className={styles.byline}>
              <span className={styles.bylineRule} />
              <em>Alexandre Djengue</em>
              <span className={styles.bylineRule} />
            </div>

            {/* Masthead */}
            <div ref={mastRef} aria-hidden="true" className={styles.masthead}>
              {LETTERS.map(([ch, delay], i) => (
                <span key={i} className={styles.mastLetter} style={{ animationDelay: `${delay}s` }}>
                  {ch}
                </span>
              ))}
            </div>
            <div className={styles.tags}>
              <span>Brand Architect</span>
              <span className={styles.sep}>·</span>
              <span>Storytelling Consultant</span>
              <span className={styles.sep}>·</span>
              <span>Toolsmith</span>
            </div>

            <h1 className={styles.h1}>
              Je ne crée pas <em className={styles.emMuted}>de l&apos;art.</em>
              <br />
              Je systémise <em className={styles.emAccent}>le succès.</em>
            </h1>
            <p className={styles.lede}>
              Directeur artistique formé en télécommunications. Chaque marque est un système d&apos;exploitation : ADN,
              signaux, flux, conversion.
            </p>

            <div className={styles.ctaCol}>
              <a href={WA_HREF} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                <WhatsAppIcon size={17} />
                WhatsApp — réponse rapide
              </a>
              <Link href="/" className={styles.ctaGhost}>
                Explorer le folio complet →
              </Link>
            </div>
          </div>

          <div className={styles.scrollWrap}>
            <span aria-hidden="true" className={styles.scroll}>
              Scroll
              <span className={styles.scrollLine} />
            </span>
          </div>
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div aria-hidden="true" className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[0, 1, 2].map((g) => (
            <div key={g} className={styles.marqueeGroup}>
              {MARQUEE.map((m, i) => (
                <span key={i} className={styles.marqueeItem}>
                  <span>{m}</span>
                  <span className={styles.marqueeDot}>◍</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== Écran 2 · Portrait ===== */}
      <Reveal as="section" className={styles.portrait}>
        <div aria-hidden="true" className={styles.portraitGlow} />
        <div className={styles.portraitInner}>
          <div className={styles.frameWrap}>
            <div aria-hidden="true" className={styles.ring} />
            <div aria-hidden="true" className={styles.orbit}>
              <span className={styles.orbitSat} />
            </div>
            <div className={styles.frame}>
              <img
                ref={plxRef}
                src="/portrait.jpg"
                alt="Alexandre Djengue — portrait"
                className={styles.portraitImg}
              />
              <div aria-hidden="true" className={styles.portraitVeil} />
              <div className={styles.caption}>
                <div className={styles.captionName}>Alexandre Djengue</div>
                <div className={styles.captionMeta}>Xtincell · Vol. 15 — Studio, 2026</div>
              </div>
              <div className={`${styles.macaron} ${styles.macaronCeo}`}>
                <span className={styles.macaronSmall}>Rôle principal</span>
                <span className={styles.macaronBig}>CEO</span>
                <span className={styles.macaronSmall}>UPgraders</span>
              </div>
              <div className={`${styles.macaron} ${styles.macaronMandat}`}>
                <span className={styles.macaronSmall}>Mandat actif</span>
                <span className={`${styles.macaronBig} ${styles.macaronBigAlt}`}>DC&amp;A</span>
                <span className={styles.macaronSmall}>MATANGA Agency</span>
              </div>
            </div>
          </div>
          <div className={styles.stats}>
            <span>
              <b>15 ans</b> de création
            </span>
            <span>
              <b>25+</b> marques
            </span>
            <span>
              <b>21</b> projets
            </span>
          </div>
        </div>
      </Reveal>

      {/* ===== Écran 3 · Casquettes ===== */}
      <Reveal as="section" className={styles.hats}>
        <span aria-hidden="true" className={styles.watermark}>
          03
        </span>
        <div className={styles.sectionInner}>
          <div className={styles.kicker} style={{ marginBottom: 18 }}>
            — Trois casquettes, un système
          </div>
          {HATS.map((h, i) => (
            <Link
              key={h.n}
              href="/#casquettes"
              className={`${styles.hatRow} ${i === HATS.length - 1 ? styles.hatRowLast : ''}`}
            >
              <span className={styles.hatNum}>{h.n}</span>
              <span className={styles.hatTitle}>{h.title}</span>
              <span className={styles.hatArrow}>↗</span>
              <span className={styles.hatSub}>{h.sub}</span>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* ===== Écran 4 · Preuves ===== */}
      <Reveal as="section" className={styles.proofs}>
        <div className={styles.proofsHead}>
          <div className={styles.kicker} style={{ marginBottom: 10 }}>
            — Preuves
          </div>
          <h2 className={styles.proofTitle}>
            Le travail <em className={styles.emAccent}>parle</em>.
          </h2>
          <p className={styles.proofHint}>Glisser pour explorer →</p>
        </div>
        <div className={styles.proofTrack}>
          {PROOF_CARDS.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`} className={styles.proofCard}>
              <span className={styles.proofFig}>
                <img src={c.img} alt={c.name} loading="lazy" className={styles.proofImg} />
                {agencyForCase(c.slug) && (
                  <AgencyMacaron agency={agencyForCase(c.slug)!} lang="fr" corner="tr" />
                )}
                <span aria-hidden="true" className={styles.proofScrim} />
                <span className={styles.proofTag}>{c.tag}</span>
                <span className={styles.proofCaption}>
                  <span className={styles.proofName}>{c.name}</span>
                  <span className={styles.proofMeta}>{c.meta}</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* ===== Écran 5 · Méthode ===== */}
      <Reveal as="section" className={styles.method}>
        <div className={styles.methodInner}>
          <div className={styles.kicker} style={{ marginBottom: 16 }}>
            — La méthode · IP UPgraders
          </div>
          <div className={styles.methodWord}>
            ADVE<span className={styles.methodSlash}>/</span>RTIS
          </div>
          <p className={styles.methodP}>
            Un socle qui fixe l&apos;identité — Authenticité, Distinction, Valeur, Engagement — et un propulseur qui
            déclenche l&apos;action : Risk, Track, Innovation, Stratégie.
          </p>
          <div className={styles.chips}>
            {METHOD_CHIPS.map((c, i) => (
              <span key={i} className={styles.chip}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ===== Final · CTA ===== */}
      <section className={styles.final}>
        <div aria-hidden="true" className={styles.finalBg}>
          <StarField density={65} />
        </div>
        <div className={styles.finalInner}>
          <img src="/logos/spark-mark.svg" alt="" className={styles.finalMark} />
          <h2 className={styles.finalTitle}>
            On fait décoller <em className={styles.emAccent}>votre marque</em> ?
          </h2>
          <p className={styles.finalP}>
            Deux lignes sur votre projet — devis ferme sous 48 h, en euro ou en FCFA. Basé Douala · Yaoundé, mobile
            Afrique de l&apos;Ouest &amp; centrale, remote au-delà.
          </p>
          <div className={styles.finalCol}>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noreferrer"
              className={`${styles.ctaPrimary} ${styles.lsTight}`}
            >
              WhatsApp {CONTACT.whatsappDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={styles.ctaGhostEmail}>
              {CONTACT.email}
            </a>
            <Link href="/" className={styles.textLink}>
              Visiter le site complet →
            </Link>
          </div>
          <div className={styles.finalFoot}>
            <span className={styles.footLine}>XTINCELL · ALEXANDRE DJENGUE · © 2026</span>
            <span className={styles.footTag}>« De la poussière à l&apos;étoile. »</span>
          </div>
        </div>
      </section>

      {/* ===== Dock CTA (mobile) ===== */}
      <div className={`${styles.dock} ${docked ? styles.dockOn : ''}`}>
        <a href={WA_HREF} target="_blank" rel="noreferrer" className={`${styles.dockBtn} ${styles.dockWa}`}>
          <WhatsAppIcon size={14} />
          WhatsApp
        </a>
        <Link href="/" className={`${styles.dockBtn} ${styles.dockSite}`}>
          Le site →
        </Link>
      </div>
    </div>
  );
}

function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.7.9-.5 1.2.7 1.2 1.6 2 2.8 2.6.3.2.5.1.7-.1l.8-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.2Z" />
    </svg>
  );
}
