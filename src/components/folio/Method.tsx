'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import styles from '@/styles/home.module.css';
import { STEPS } from './data/method';
import { useT, useLang, pick } from '@/lib/i18n';

export function Method() {
  const t = useT();
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = STEPS.length;
  const current = STEPS[active] ?? STEPS[0];
  if (!current) return null;

  const focusStep = (i: number) => {
    const idx = (i + total) % total;
    setActive(idx);
    btnRefs.current[idx]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        focusStep(i + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        focusStep(i - 1);
        break;
      case 'Home':
        e.preventDefault();
        focusStep(0);
        break;
      case 'End':
        e.preventDefault();
        focusStep(total - 1);
        break;
    }
  };

  const renderTab = (s: (typeof STEPS)[number], realIdx: number) => (
    <button
      key={s.code}
      ref={(el) => {
        btnRefs.current[realIdx] = el;
      }}
      type="button"
      role="tab"
      id={`method-tab-${s.code}`}
      aria-selected={realIdx === active}
      aria-controls="method-panel"
      tabIndex={realIdx === active ? 0 : -1}
      className={`${styles.methodStep} ${realIdx === active ? styles.methodStepActive : ''}`}
      onClick={() => setActive(realIdx)}
      onMouseEnter={() => setActive(realIdx)}
      onKeyDown={(e) => onKeyDown(e, realIdx)}
    >
      <span className={styles.stepCode}>{s.code}</span>
      <span className={styles.stepName}>{pick(s.name, lang)}</span>
      <span className={styles.stepSub}>{pick(s.sub, lang)}</span>
    </button>
  );

  return (
    <section id="methode" className={styles.method}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>02</span>
        <span className={styles.sectionLabel}>{t.method.label}</span>
      </div>

      <h2 className={styles.methodTitle}>
        <span>ADVE</span><span className="slash">/</span><span>RTIS</span>
        <span className={styles.methodSub}>{t.method.sub}</span>
      </h2>

      <div className={styles.methodBody}>
        <div className={styles.methodList}>
          <div className={styles.methodGroupLabel} id="method-group-socle">
            {t.method.groupSocle}
          </div>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby="method-group-socle"
            className={styles.methodTabGroup}
          >
            {STEPS.slice(0, 4).map((s, i) => renderTab(s, i))}
          </div>

          <div className={styles.methodGroupLabelPropulseur} id="method-group-propulseur">
            {t.method.groupPropulseur}
          </div>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby="method-group-propulseur"
            className={styles.methodTabGroup}
          >
            {STEPS.slice(4).map((s, i) => renderTab(s, i + 4))}
          </div>
        </div>

        <div
          className={styles.methodDetail}
          role="tabpanel"
          id="method-panel"
          aria-labelledby={`method-tab-${current.code}`}
          tabIndex={0}
        >
          <div className={styles.detailIndex}>
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <div className={styles.detailGlyph}>{current.code}</div>
          <div className={styles.detailName}>{pick(current.name, lang)}</div>
          <p className={styles.detailBody}>{pick(current.body, lang)}</p>
          <div className={styles.detailTag}>{pick(current.sub, lang)}</div>
        </div>
      </div>
    </section>
  );
}
