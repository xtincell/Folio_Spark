'use client';

import styles from '@/styles/home.module.css';
import { PRESS, PRESS_TYPE_LABEL } from './data/press';
import { useT, useLang, pick } from '@/lib/i18n';

/**
 * « Ce qu'ils disent de moi » — editorial list of third-party coverage,
 * interviews and media presence about Xtincell. Data-driven from data/press.ts;
 * each row links out to the live source.
 */
export function Press() {
  const t = useT();
  const { lang } = useLang();

  const cta = (type: string) =>
    type === 'podcast' ? t.press.listen : type === 'portfolio' ? t.press.visit : t.press.read;

  return (
    <section id="presse" className={styles.press}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>{t.press.num}</span>
        <span className={styles.sectionLabel}>{t.press.label}</span>
      </div>

      <div className={styles.pressGrid}>
        <div className={styles.pressIntro}>
          <h2 className={styles.pressTitle}>
            {t.press.title1}
            <em>{t.press.titleEm}</em>.
          </h2>
          <p className={styles.pressLede}>{t.press.lede}</p>
        </div>

        <ol className={styles.pressList} aria-label={t.press.ariaList}>
          {PRESS.map((item, i) => (
            <li key={item.url} className={styles.pressItem}>
              <a
                className={styles.pressLink}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.pressIndex}>{String(i + 1).padStart(2, '0')}</span>

                <span className={styles.pressBody}>
                  <span className={styles.pressMeta}>
                    <span className={styles.pressOutlet}>{item.outlet}</span>
                    {item.series && <span className={styles.pressSeries}>{item.series}</span>}
                    <span className={styles.pressType}>{pick(PRESS_TYPE_LABEL[item.type], lang)}</span>
                    <time className={styles.pressDate} dateTime={item.iso}>
                      {pick(item.date, lang)}
                    </time>
                  </span>

                  <span className={styles.pressHeadline}>{pick(item.title, lang)}</span>
                  <span className={styles.pressExcerpt}>{pick(item.excerpt, lang)}</span>
                </span>

                <span className={styles.pressCta} aria-hidden="true">
                  {cta(item.type)} <span className={styles.pressArrow}>↗</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
