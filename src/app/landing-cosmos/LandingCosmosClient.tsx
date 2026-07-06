'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { StarField } from '@/components/folio/StarField';
import { CONTACT } from '@/components/folio/data/contact';
import styles from '@/styles/landingCosmos.module.css';

/**
 * LE SIGNAL — « le marché est un vacarme ; votre marque sera un signal ».
 * Parti pris : l'ingénieur télécom devenu directeur artistique. Un monde 3D
 * continu traversé au scroll — bruit, onde, chaîne d'émission, protocole,
 * antenne. Les panneaux HTML (SSR, accessibles) s'affichent à l'arrivée de
 * la caméra. Sans WebGL / reduced-motion : mode « flat » empilé.
 */

const WA_HREF = `${CONTACT.whatsappLink}?text=${encodeURIComponent(
  'Bonjour Alexandre — je capte votre signal. Parlons de ma marque.',
)}`;

const SCROLL_VH = 760; // longueur du voyage

const LETTERS: [string, number][] = [
  ['X', 0.0],
  ['T', 0.05],
  ['I', 0.1],
  ['N', 0.15],
  ['C', 0.2],
  ['E', 0.25],
  ['L', 0.3],
  ['L', 0.35],
];

const CHAIN = [
  { n: '01', title: "L'Émetteur", sub: 'Stratégie — le message avant le méga' },
  { n: '02', title: 'Le Modulateur', sub: 'Direction artistique — la forme qui porte loin' },
  { n: '03', title: "L'Antenne", sub: 'Exécution — photo, vidéo, diffusion' },
];

const RAIL = ['Bruit', 'Signal', 'Chaîne', 'Protocole', 'Émission'];

type Mode = 'boot' | '3d' | 'flat';

export function LandingCosmosClient() {
  const [mode, setMode] = useState<Mode>('boot');
  const [chapter, setChapter] = useState(0);
  const [clock, setClock] = useState('--:--');
  const [docked, setDocked] = useState(false);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false); // préloader retiré du DOM

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<number[]>([0.05, 0.29, 0.51, 0.73, 0.94]);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  /* ── Boot 1 : capacité (WebGL + motion) → choix du mode ── */
  const t0Ref = useRef(0);
  const finishLoader = () => {
    const minWait = Math.max(0, 1400 - (performance.now() - t0Ref.current));
    window.setTimeout(() => {
      setPct(100);
      window.setTimeout(() => {
        window.scrollTo(0, 0);
        window.setTimeout(() => setGone(true), 700);
      }, 350);
    }, minWait);
  };

  useEffect(() => {
    t0Ref.current = performance.now();
    let cancelled = false;
    let pctTimer = 0;
    const ramp = () => {
      if (cancelled) return;
      const el = (performance.now() - t0Ref.current) / 1400;
      setPct((p) => Math.max(p, Math.min(92, Math.round(el * 92))));
      pctTimer = window.setTimeout(ramp, 60);
    };
    ramp();
    let capable = false;
    try {
      capable =
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        (() => {
          const c = document.createElement('canvas');
          return !!(c.getContext('webgl2') || c.getContext('webgl'));
        })();
    } catch {
      capable = false;
    }
    setMode(capable ? '3d' : 'flat');
    if (!capable) finishLoader();
    return () => {
      cancelled = true;
      window.clearTimeout(pctTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Boot 2 : moteur, une fois le canvas du portal monté ── */
  useEffect(() => {
    if (mode !== '3d') return;
    let dispose: (() => void) | null = null;
    let cancelled = false;
    let readyFired = false;
    (async () => {
      try {
        const mod = await import('@/components/folio/three/VoyageEngine');
        if (cancelled) return;
        const canvas = canvasRef.current;
        if (!canvas) throw new Error('no canvas');
        const handle = mod.createVoyage({
            canvas,
            getScroll: () => {
              const max = document.documentElement.scrollHeight - window.innerHeight;
              return max > 0 ? window.scrollY / max : 0;
            },
            onChapter: (f) => {
              const idx = Math.min(RAIL.length - 1, Math.round(f));
              setChapter((c) => (c === idx ? c : idx));
            },
            onReady: () => {
              if (!readyFired) {
                readyFired = true;
                finishLoader();
              }
            },
        });
        if (!handle) throw new Error('engine unavailable');
        chaptersRef.current = handle.chapters.slice();
        dispose = handle.dispose;
        window.setTimeout(() => {
          if (!readyFired && !cancelled) {
            readyFired = true;
            finishLoader();
          }
        }, 8000);
      } catch {
        if (!cancelled) {
          setMode('flat');
          finishLoader();
        }
      }
    })();
    return () => {
      cancelled = true;
      dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /* ── Horloge Douala + barre de progression + dock ── */
  useEffect(() => {
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
    const id = window.setInterval(tick, 20000);

    let lastDocked = false;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.width = (p * 100).toFixed(2) + '%';
      const d = p > 0.06;
      if (d !== lastDocked) {
        lastDocked = d;
        setDocked(d);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      clearInterval(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Curseur custom + boutons magnétiques (desktop) ── */
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let over = false;
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot) dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (ring) ring.style.transform = `translate(${rx}px, ${ry}px) scale(${over ? 2.2 : 1})`;
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as Element | null;
      over = !!t?.closest('a, button');
      // magnétisme des CTA
      const magnet = t?.closest('[data-magnet]') as HTMLElement | null;
      document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        if (el === magnet) {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`;
        } else if (el.style.transform) {
          el.style.transform = '';
        }
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const goChapter = (i: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const t = chaptersRef.current[i] ?? 0;
    window.scrollTo({ top: t * max, behavior: 'smooth' });
  };

  const is3d = mode === '3d';
  const flat = mode !== '3d'; // boot + flat : empilé, lisible, SSR
  const rootCls = [styles.root, is3d ? styles.mode3d : '', flat ? styles.modeFlat : ''].join(' ');
  const panelCls = (i: number) =>
    [styles.panel, is3d && chapter === i ? styles.panelActive : '', flat ? styles.panelFlat : ''].join(' ');

  /* L'expérience complète. En 3D elle est portée dans un portal sur
     document.body : le .page-enter global (animation transform, fill both)
     piège position:fixed, et body{overflow-x:hidden} casse sticky — le
     portal échappe aux deux. */
  const experience = (
      <div className={styles.scroller} style={is3d ? { height: `${SCROLL_VH}vh` } : undefined}>
        <div className={styles.stage}>
      {/* Monde 3D */}
      <canvas ref={canvasRef} className={styles.world} aria-hidden="true" />
      {/* Ambiance flat */}
      {flat && <div aria-hidden="true" className={styles.nebula} />}

      <div ref={progressRef} aria-hidden="true" className={styles.progress} />

      {/* ── HUD : ours ── */}
      <header className={styles.ours}>
        <span className={styles.oursItem}>
          <img src="/logos/spark-mark.svg" alt="" style={{ height: 16, width: 'auto' }} />
          <span className={styles.oursLong}>Fréquence&nbsp;·&nbsp;</span>99.9 DLA
        </span>
        <span className={`${styles.oursItem} ${styles.oursLive}`}>
          <span className={styles.liveDot} />
          En direct
        </span>
        <span className={styles.oursItem}>{clock} — DLA</span>
      </header>

      {/* ── HUD : rail de chapitres (3D) ── */}
      {is3d && (
        <nav className={styles.rail} aria-label="Chapitres">
          {RAIL.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`${styles.railItem} ${chapter === i ? styles.railOn : ''}`}
              onClick={() => goChapter(i)}
            >
              <span className={styles.railDot} />
              <span className={styles.railLabel}>{label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ════ CH 1 · LA POUSSIÈRE ════ */}
      <section className={panelCls(0)} aria-label="Le bruit">
        {flat && (
          <div aria-hidden="true" className={styles.flatStars}>
            <StarField density={90} />
          </div>
        )}
        <div className={styles.panelInner}>
          <div className={styles.byline}>
            <span className={styles.bylineRule} />
            <em>Alexandre Djengue</em>
            <span className={styles.bylineRule} />
          </div>
          <div aria-hidden="true" className={styles.masthead}>
            {LETTERS.map(([ch, d], i) => (
              <span key={i} className={styles.mastLetter} style={{ transitionDelay: `${d}s` }}>
                {ch}
              </span>
            ))}
          </div>
          <h1 className={styles.srOnly}>Xtincell — Alexandre Djengue, Brand Architect</h1>
          <div className={styles.tags}>
            <span>Brand Architect</span>
            <span className={styles.sep}>·</span>
            <span>Storytelling Consultant</span>
            <span className={styles.sep}>·</span>
            <span>Toolsmith</span>
          </div>
          <p className={styles.tagline}>
            Le marché est un vacarme.<br />
            Votre marque sera <span className={styles.em}>un signal.</span>
          </p>
          <div className={styles.ctaRow}>
            <a href={WA_HREF} target="_blank" rel="noreferrer" className={styles.ctaPrimary} data-magnet>
              <WhatsAppIcon size={17} />
              Ouvrir le canal — WhatsApp
            </a>
            <Link href="/" className={styles.ctaGhost} data-magnet>
              Visiter la station →
            </Link>
          </div>
          <div className={styles.scrollCue} aria-hidden="true">
            Scroll pour accorder
            <span className={styles.scrollLine} />
          </div>
        </div>
      </section>

      {/* ════ CH 2 · MANIFESTE ════ */}
      <section className={panelCls(1)} aria-label="Le signal">
        <div className={`${styles.panelInner} ${styles.panelLeft}`}>
          <div className={styles.kicker}>— Le signal · 01</div>
          <p className={styles.mLine}>
            Le bruit <span className={styles.emMuted}>se crie.</span>
          </p>
          <p className={styles.mLine}>
            Le signal <span className={styles.em}>se construit.</span>
          </p>
          <p className={styles.sub}>
            Ingénieur télécom devenu directeur artistique — je ne vends pas des images, je règle des
            fréquences : ADN clair, message modulé, diffusion qui convertit. Votre marque devient
            audible. Puis inévitable.
          </p>
          <div className={styles.stats}>
            <span>
              <b>15 ans</b> d&apos;émission
            </span>
            <span>
              <b>25+</b> marques accordées
            </span>
            <span>
              <b>3</b> villes-relais — DLA · YDE · ABJ
            </span>
          </div>
        </div>
      </section>

      {/* ════ CH 3 · TRAJECTOIRE ════ */}
      <section className={panelCls(2)} aria-label="La chaîne">
        <div className={`${styles.panelInner} ${styles.panelLeft}`}>
          <div className={styles.kicker}>— La chaîne d&apos;émission · 02</div>
          {CHAIN.map((h, i) => (
            <Link
              key={h.n}
              href="/#casquettes"
              className={`${styles.hatRow} ${i === CHAIN.length - 1 ? styles.hatRowLast : ''}`}
            >
              <span className={styles.hatNum}>{h.n}</span>
              <span className={styles.hatTitle}>{h.title}</span>
              <span className={styles.hatArrow}>↗</span>
              <span className={styles.hatSub}>{h.sub}</span>
            </Link>
          ))}
          <Link href="/" className={styles.textLink} style={{ justifyContent: 'flex-start', paddingLeft: 0 }}>
            Toute la grille des programmes →
          </Link>
        </div>
      </section>

      {/* ════ CH 4 · CONSTELLATION ════ */}
      <section className={panelCls(3)} aria-label="Le protocole">
        <div className={`${styles.panelInner} ${styles.panelBottom}`}>
          <div className={styles.kicker}>— Protocole propriétaire · UPgraders · 03</div>
          <div className={styles.methodWord}>
            ADVE<span className={styles.em}>/</span>RTIS
          </div>
          <p className={styles.sub} style={{ margin: '12px auto 0', textAlign: 'center' }}>
            Huit lettres pour encoder une marque : quatre fixent l&apos;identité, quatre déclenchent
            l&apos;action. Vous venez de traverser sa constellation — au sens télécom du terme.
          </p>
        </div>
      </section>

      {/* ════ CH 5 · ALLUMAGE ════ */}
      <section className={panelCls(4)} aria-label="L’émission">
        {flat && <div aria-hidden="true" className={styles.flatEmbers} />}
        <div className={styles.panelInner} style={{ textAlign: 'center' }}>
          <img src="/logos/spark-mark.svg" alt="" className={styles.mark} />
          <h2 className={styles.igniteTitle}>
            Votre fréquence <span className={styles.em}>est libre.</span>
          </h2>
          <p className={styles.sub} style={{ margin: '0 auto 28px', maxWidth: '48ch' }}>
            Deux lignes sur votre projet — devis ferme sous 48 h, en euro ou en FCFA. En studio à
            Douala · Yaoundé, en liaison avec Abidjan et toute l&apos;Afrique francophone.
          </p>
          <div className={styles.ctaCol}>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaPrimary}
              data-magnet
              style={{ letterSpacing: '0.14em' }}
            >
              Ouvrir le canal · {CONTACT.whatsappDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={styles.ctaGhost} data-magnet>
              {CONTACT.email}
            </a>
            <Link href="/" className={styles.textLink}>
              Visiter la station complète →
            </Link>
          </div>
          <div className={styles.foot}>
            <span className={styles.footLine}>XTINCELL · ALEXANDRE DJENGUE · ÉMISSION CONTINUE · © 2026</span>
            <span className={styles.footTag}>— Fin de transmission. Ne quittez pas l&apos;écoute.</span>
          </div>
        </div>
      </section>

      {/* ── Dock mobile ── */}
      <div className={`${styles.dock} ${docked ? styles.dockOn : ''}`}>
        <a href={WA_HREF} target="_blank" rel="noreferrer" className={`${styles.dockBtn} ${styles.dockWa}`}>
          <WhatsAppIcon size={14} />
          WhatsApp
        </a>
        <Link href="/" className={`${styles.dockBtn} ${styles.dockSite}`}>
          Le site →
        </Link>
      </div>

      {/* ── Curseur custom (desktop) ── */}
      <div ref={cursorDot} aria-hidden="true" className={styles.cursorDot} />
      <div ref={cursorRing} aria-hidden="true" className={styles.cursorRing} />
        </div>
      </div>
  );

  return (
    <div className={rootCls}>
      {is3d && typeof document !== 'undefined'
        ? createPortal(<div className={rootCls}>{experience}</div>, document.body)
        : experience}

      {/* ── Préloader ── */}
      {!gone && (
        <div className={`${styles.loader} ${mode !== 'boot' ? styles.loaderOut : ''}`} aria-hidden="true">
          <img src="/logos/spark-mark.svg" alt="" className={styles.loaderMark} />
          <div className={styles.loaderPct}>{pct}%</div>
          <div className={styles.loaderLabel}>{pct < 100 ? 'Recherche du signal…' : 'Canal trouvé — 99.9 DLA'}</div>
          <div className={styles.loaderBar}>
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
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
