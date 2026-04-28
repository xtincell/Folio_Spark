import styles from '@/styles/home.module.css';
import { EDITOPICS } from './data/editopics';

export function EditoPic({ n }: { n: 1 | 2 | 3 }) {
  const data = EDITOPICS[n - 1];
  if (!data) return null;
  return (
    <section className={`${styles.editopic} ${data.flip ? styles.editopicFlip : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={data.src} className={styles.editopicImg} alt="" loading="lazy" />
      <div>
        <div className={styles.editopicCap}>{data.cap}</div>
        <p className={styles.editopicQuote} dangerouslySetInnerHTML={{ __html: data.quote }} />
        {data.attrib && <div className={styles.editopicAttrib}>{data.attrib}</div>}
      </div>
    </section>
  );
}
