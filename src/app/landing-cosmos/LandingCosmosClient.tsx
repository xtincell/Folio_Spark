'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { StarField } from '@/components/folio/StarField';
import { Reveal } from '@/components/folio/Reveal';
import { CONTACT } from '@/components/folio/data/contact';
import styles from '@/styles/landingCosmos.module.css';

// Univers 3D — chunk séparé, jamais bloquant ; fallback = starfield 2D + nébuleuse.
const CosmicScene = dynamic(
  () => import('@/components/folio/three/CosmicScene').then((m) => m.CosmicScene),
  { ssr: false },
);

const WA_HREF = `${CONTACT.whatsappLink}?text=${encodeURIComponent(
  'Bonjour Alexandre — je viens de votre landing cosmos. Parlons de ma marque.',
)}`;

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

const HATS: { n: string; title: string; sub: string }[] = [
  { n: '01', title: 'Brand Architect', sub: 'Stratégie + systèmes de marque' },
  { n: '02', title: 'Direction Artistique', sub: 'Image, scénographie, identité' },
  { n: '03', title: 'Exécution', sub: 'Photo, vidéo, livrables — hands on' },
];

const METHOD_CHIPS = ['A', 'D', 'V', 'E', 'R', 'T', 'I', 'S'];

export function LandingCosmosClient() {
  const [cosmic, setCosmic] = useState(false);
  const [docked, setDocked] = useState(false);
  const [clock, setClock] = useState('--:--');

  const mastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

    // Scroll : progression + dock
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
    <div className={styles.root}>
      {/* Nébuleuse générée — ambiance permanente, WebGL ou pas */}
      <div aria-hidden="true" className={styles.nebula} />

      <CosmicScene
        plan={[
          { cls: styles.signal ?? '', state: 'galaxy' },
          { cls: styles.manifesto ?? '', state: 'veil' },
          { cls: styles.orbits ?? '', state: 'orbit' },
          { cls: styles.method ?? '', state: 'spark' },
          { cls: styles.ignition ?? '', state: 'plume' },
        ]}
        onReady={() => setCosmic(true)}
      />

      <div ref={progressRef} aria-hidden="true" className={styles.progress} />

      {/* ===== Acte I · Signal ===== */}
      <section className={styles.signal}>
        <div aria-hidden="true" className={styles.signalGlow}>
          {!cosmic && <StarField density={95} />}
        </div>
        <div className={styles.signalInner}>
          <div className={styles.ours}>
            <span className={styles.oursItem}>
              <img src="/logos/spark-mark.svg" alt="" style={{ height: 16, width: 'auto' }} />
              <span className={styles.oursLong}>Transmission&nbsp;·&nbsp;</span>Vol. 15
            </span>
            <span className={`${styles.oursItem} ${styles.oursLive}`}>
              <span className={styles.liveDot} />
              Disponible
            </span>
            <span className={styles.oursItem}>{clock} — DLA</span>
          </div>

          <div className={styles.center}>
            <div className={styles.byline}>
              <span className={styles.bylineRule} />
              <em>Alexandre Djengue</em>
              <span className={styles.bylineRule} />
            </div>

            <div ref={mastRef} aria-hidden="true" className={styles.masthead}>
              {LETTERS.map(([ch, delay], i) => (
                <span key={i} className={styles.mastLetter} style={{ animationDelay: `${delay}s` }}>
                  {ch}
                </span>
              ))}
            </div>
            <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', margin: -1 }}>
              Xtincell — Alexandre Djengue, Brand Architect
            </h1>
            <div className={styles.tags}>
              <span>Brand Architect</span>
              <span className={styles.sep}>·</span>
              <span>Storytelling Consultant</span>
              <span className={styles.sep}>·</span>
              <span>Toolsmith</span>
            </div>

            <p className={styles.tagline}>
              De la poussière <span className={styles.taglineEm}>à l&apos;étoile.</span>
            </p>
            <p className={styles.lede}>
              Les marques sont des systèmes d&apos;exploitation. Je conçois le vôtre — ADN, signaux, flux,
              conversion — puis je l&apos;allume.
            </p>

            <div className={styles.ctaCol}>
              <a href={WA_HREF} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
                <WhatsAppIcon size={17} />
                WhatsApp — réponse rapide
              </a>
              <Link href="/" className={styles.ctaGhost}>
                Entrer dans le folio →
              </Link>
            </div>
          </div>

          <div className={styles.coords}>
            <span className={styles.coordsRow}>
              <span>4.05°N 9.71°E</span>
              <span className={styles.sep}>·</span>
              <span>DLA — YDE — ABJ</span>
            </span>
            <span className={styles.scrollCue} aria-hidden="true">
              Scroll
              <span className={styles.scrollLine} />
            </span>
          </div>
        </div>
      </section>

      {/* ===== Acte II · Manifeste ===== */}
      <Reveal as="section" className={styles.manifesto}>
        <div className={styles.manifestoInner}>
          <div className={styles.kicker}>— Manifeste</div>
          <p className={styles.mLine}>
            Je ne crée pas <span className={styles.mMuted}>de l&apos;art.</span>
          </p>
          <p className={styles.mLine}>
            Je systémise <span className={styles.mAccent}>le succès.</span>
          </p>
          <p className={styles.mSub}>
            Directeur artistique formé en télécommunications. Quinze ans à transformer des marques
            d&apos;Afrique francophone en systèmes qui convertissent — de la stratégie au shooting.
          </p>
          <div className={styles.stats}>
            <span>
              <b>15 ans</b> de création
            </span>
            <span>
              <b>25+</b> marques
            </span>
            <span>
              <b>21</b> projets publiés
            </span>
          </div>
        </div>
      </Reveal>

      {/* ===== Acte III · Trajectoire ===== */}
      <Reveal as="section" className={styles.orbits}>
        <div className={styles.orbitsInner}>
          <div className={styles.kicker}>— Trois casquettes, une trajectoire</div>
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
          <Link href="/" className={styles.orbitsCta}>
            Le travail complet vit dans le folio →
          </Link>
        </div>
      </Reveal>

      {/* ===== Acte IV · Constellation ===== */}
      <section className={styles.method}>
        <Reveal className={styles.methodInner}>
          <div className={styles.kicker}>— La méthode · IP UPgraders</div>
          <div className={styles.methodWord}>
            ADVE<span className={styles.methodSlash}>/</span>RTIS
          </div>
          <p className={styles.methodP}>
            Un socle qui fixe l&apos;identité — Authenticité, Distinction, Valeur, Engagement — et un
            propulseur qui déclenche l&apos;action : Risk, Track, Innovation, Stratégie.
          </p>
          <div className={styles.chips}>
            {METHOD_CHIPS.map((c, i) => (
              <span key={i} className={styles.chip}>
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Acte V · Allumage ===== */}
      <section className={styles.ignition}>
        <div aria-hidden="true" className={styles.embers} />
        {!cosmic && (
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <StarField density={60} />
          </div>
        )}
        <div className={styles.ignitionInner}>
          <img src="/logos/spark-mark.svg" alt="" className={styles.ignitionMark} />
          <h2 className={styles.ignitionTitle}>
            On allume <span className={styles.ignitionEm}>votre marque</span> ?
          </h2>
          <p className={styles.ignitionP}>
            Deux lignes sur votre projet — devis ferme sous 48 h, en euro ou en FCFA. Basé Douala ·
            Yaoundé, mobile à Abidjan et dans toute l&apos;Afrique francophone pour le conseil.
          </p>
          <div className={styles.ignitionCol}>
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
          <div className={styles.foot}>
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
