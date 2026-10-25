"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import s from "./character.module.css";

/** Painted cutout parts, with parented pivots in a 700 × 1130 stage. */
function Part({ name, width, height, x, y }: {
  name: string; width: number; height: number; x: number; y: number;
}) {
  return <image href={`/character/xtincell/${name}.webp`} width={width} height={height} x={x} y={y} />;
}

export function XtincellCharacter() {
  const { lang } = useLang();
  const fr = lang === "fr";
  const stage = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reacting, setReacting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const node = stage.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    if (node) observer.observe(node);
    const visibility = () => setPageVisible(document.visibilityState === "visible");
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!reacting) return;
    const timer = window.setTimeout(() => setReacting(false), 2400);
    return () => window.clearTimeout(timer);
  }, [reacting]);

  const running = !paused && visible && pageVisible && !reduced;

  return (
    <div ref={stage} className={s.stage} data-running={running} data-reacting={reacting && running}>
      <button
        className={s.character}
        type="button"
        disabled={!running}
        onClick={() => { if (running && !reacting) setReacting(true); }}
        aria-label={fr ? "Faire réagir le personnage d’Alexandre Xtincell" : "Animate Alexandre Xtincell’s character"}
        title={fr ? "Une idée ?" : "Got an idea?"}
      >
        <svg viewBox="0 0 700 1130" fill="none" aria-hidden="true" focusable="false">
          <g transform="translate(350 450)">
            {/* Feet stay planted; the upper body breathes around the hips. */}
            <g transform="translate(-69 373) rotate(3)">
              <g transform="scale(.6)"><Part name="leg-right" width={301} height={393} x={-198} y={-29} /></g>
            </g>
            <g transform="translate(47 374) rotate(-3)">
              <g transform="scale(.6)"><Part name="leg-left" width={291} height={382} x={-95} y={-27} /></g>
            </g>
            <g className={s.breath}>
              <g transform="translate(-11 246) scale(.6)">
                <Part name="pelvis" width={318} height={291} x={-159} y={-25} />
              </g>
              <g transform="translate(-126 104)">
                <g className={s.armRight}>
                  <g transform="scale(.58)"><Part name="upper-arm-right" width={184} height={372} x={-153} y={-30} /></g>
                </g>
              </g>
              <g transform="translate(112 103)">
                <g className={s.armLeft}>
                  <g transform="scale(.58)"><Part name="upper-arm-left" width={189} height={368} x={-33} y={-26} /></g>
                  <g transform="translate(45 181)">
                    <g className={s.forearmLeft}>
                      <g transform="scale(.58)"><Part name="forearm-left" width={177} height={366} x={-120} y={-26} /></g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="scale(.72)"><Part name="torso" width={374} height={424} x={-203} y={-24} /></g>
              <g transform="translate(0 18)">
                <g className={s.head}>
                  <g transform="scale(1.08)">
                    <Part name="head" width={326} height={437} x={-185} y={-406} />
                    <g transform="translate(-185 -406)">
                      <g className={s.eyelids}>
                        <path d="M144 155Q172 137 199 157Q177 176 144 155Z" fill="#b65b2c" />
                        <path d="M247 157Q270 147 289 173Q268 184 247 157Z" fill="#aa5128" />
                        <path d="M145 156Q173 163 198 157M248 160Q269 174 287 172" stroke="#281a18" strokeWidth="5" strokeLinecap="round" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              {/* Same shoulder transform, front layer for the hand's gesture. */}
              <g transform="translate(-126 104)">
                <g className={s.armRight}>
                  <g transform="translate(-46 183)">
                    <g className={s.forearmRight}>
                      <g transform="scale(.58)"><Part name="forearm-right" width={185} height={376} x={-63} y={-24} /></g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      {!reduced && <button
        className={s.pause}
        type="button"
        aria-pressed={paused}
        aria-label={paused
          ? (fr ? "Reprendre l’animation" : "Resume animation")
          : (fr ? "Mettre l’animation en pause" : "Pause animation")}
        onClick={() => { setPaused(!paused); setReacting(false); }}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {paused ? <path d="M5 3.5 12 8l-7 4.5z" fill="currentColor" /> : <path d="M5.5 4v8m5-8v8" stroke="currentColor" strokeWidth="1.8" />}
        </svg>
      </button>}
    </div>
  );
}
