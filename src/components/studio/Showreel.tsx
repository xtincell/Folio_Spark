'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import s from '@/styles/studio.module.css';

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intended = useRef(false);
  const visible = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const { lang } = useLang();
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    intended.current = !motion.matches && !connection?.saveData;
    const sync = () => {
      if (
        intended.current &&
        visible.current &&
        document.visibilityState === 'visible'
      )
        void video.play().catch(() => setPlaying(false));
      else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = !!entry?.isIntersecting;
        sync();
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    const reduce = () => {
      if (motion.matches) intended.current = false;
      sync();
    };
    motion.addEventListener('change', reduce);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', reduce);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    intended.current = !playing;
    if (intended.current) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }
  return (
    <section
      className={s.showreel}
      aria-label={
        lang === 'fr'
          ? 'Showreel — sélection de créations'
          : 'Showreel — selected creative work'
      }
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/studio/showreel-poster.jpg?v=motion-2026"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        aria-label={
          lang === 'fr'
            ? 'Film de créations Xtincell : typographie animée, campagnes, packaging, photographie et systèmes de marque. 48 secondes, sans son.'
            : 'Xtincell motion reel: kinetic typography, campaigns, packaging, photography and brand systems. 48 seconds, no audio.'
        }
      >
        <source src="/studio/showreel.mp4?v=motion-2026" type="video/mp4" />
      </video>
      <div className={s.reelControls}>
        <div className={s.reelCaption}>
          <span>XTINCELL — MOTION REEL</span>
          <small>48 S · {lang === 'fr' ? 'SANS SON' : 'NO AUDIO'}</small>
        </div>
        {!failed && (
          <button
            type="button"
            onClick={toggle}
            aria-label={
              lang === 'fr'
                ? playing
                  ? 'Mettre le showreel en pause'
                  : 'Lire le showreel'
                : playing
                  ? 'Pause showreel'
                  : 'Play showreel'
            }
            aria-pressed={playing}
          >
            <span aria-hidden="true">
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {playing ? (
                  <>
                    <rect x="5" y="4" width="3" height="12" />
                    <rect x="12" y="4" width="3" height="12" />
                  </>
                ) : (
                  <path d="M6 3v14l11-7Z" />
                )}
              </svg>
            </span>
            <span>
              {playing ? 'PAUSE' : 'PLAY'}
              <small>
                {lang === 'fr' ? 'LE FILM' : 'THE FILM'}
              </small>
            </span>
          </button>
        )}
        <a
          className={s.reelExpand}
          href="/studio/showreel.mp4?v=motion-2026"
          target="_blank"
          rel="noreferrer"
          aria-label={lang === 'fr' ? 'Ouvrir le film en grand, dans un nouvel onglet' : 'Open the full-size film in a new tab'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
