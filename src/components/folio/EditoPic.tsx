'use client';

import styles from '@/styles/home.module.css';
import { EDITOPICS } from './data/editopics';
import { useLang, pick } from '@/lib/i18n';

export function EditoPic({ n }: { n: 1 | 2 | 3 }) {
  const { lang } = useLang();
  const data = EDITOPICS[n - 1];
  if (!data) return null;
  return (
    <section className={`${styles.editopic} ${data.flip ? styles.editopicFlip : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data.src} className={styles.editopicImg} alt="" loading="lazy" />
      <div>
        <div className={styles.editopicCap}>{pick(data.cap, lang)}</div>
        <p
          className={styles.editopicQuote}
          dangerouslySetInnerHTML={{ __html: pick(data.quote, lang) }}
        />
        <div className={styles.editopicAttrib}>{pick(data.attrib, lang)}</div>
      </div>
    </section>
  );
}
