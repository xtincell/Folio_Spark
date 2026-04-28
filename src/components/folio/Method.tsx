'use client';

import { useState } from 'react';
import styles from '@/styles/home.module.css';
import { STEPS } from './data/method';

export function Method() {
  const [active, setActive] = useState(0);
  const current = STEPS[active] ?? STEPS[0];
  if (!current) return null;
  const total = STEPS.length;

  return (
    <section id="methode" className={styles.method}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>02</span>
        <span className={styles.sectionLabel}>Méthode</span>
      </div>

      <h2 className={styles.methodTitle}>
        <span>ADVE</span><span className="slash">/</span><span>RTIS</span>
        <span className={styles.methodSub}>— socle + propulseur. IP UPgraders.</span>
      </h2>

      <div className={styles.methodBody}>
        <div className={styles.methodList}>
          <div className={styles.methodGroupLabel}>SOCLE · ADVE — l&apos;identité</div>
          {STEPS.slice(0, 4).map((s, i) => (
            <button
              key={s.code}
              type="button"
              className={`${styles.methodStep} ${i === active ? styles.methodStepActive : ''}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.stepCode}>{s.code}</span>
              <span className={styles.stepName}>{s.name}</span>
              <span className={styles.stepSub}>{s.sub}</span>
            </button>
          ))}
          <div className={styles.methodGroupLabelPropulseur}>PROPULSEUR · RTIS — l&apos;action</div>
          {STEPS.slice(4).map((s, i) => {
            const realIdx = i + 4;
            return (
              <button
                key={s.code}
                type="button"
                className={`${styles.methodStep} ${realIdx === active ? styles.methodStepActive : ''}`}
                onClick={() => setActive(realIdx)}
                onMouseEnter={() => setActive(realIdx)}
              >
                <span className={styles.stepCode}>{s.code}</span>
                <span className={styles.stepName}>{s.name}</span>
                <span className={styles.stepSub}>{s.sub}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.methodDetail}>
          <div className={styles.detailIndex}>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div className={styles.detailGlyph}>{current.code}</div>
          <div className={styles.detailName}>{current.name}</div>
          <p className={styles.detailBody}>{current.body}</p>
          <div className={styles.detailTag}>{current.sub}</div>
        </div>
      </div>
    </section>
  );
}
