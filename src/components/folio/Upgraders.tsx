'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { UPGRADERS_PILLARS } from './data/pillars';
import { useT, useLang, pick } from '@/lib/i18n';

export function Upgraders() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section id="upgraders" className={styles.upgraders}>
      <div className={styles.upgContainer}>
        <div className={styles.upgGrid}>
          <div>
            <div className={styles.upgTag}>{t.upgraders.tag}</div>
            <div className={styles.upgLogoWrap}>
              <Image
                src="/upgraders-logo-full.png"
                alt="UPgraders"
                width={320}
                height={120}
                className={styles.upgLogoImg}
              />
            </div>
            <p className={styles.upgTagline}>
              <em>{t.upgraders.tagline1}</em>
              {t.upgraders.tagline2}
            </p>
            <p
              className={styles.upgClaim}
              dangerouslySetInnerHTML={{ __html: t.upgraders.claim }}
            />
            <p
              className={styles.upgLede}
              dangerouslySetInnerHTML={{ __html: t.upgraders.lede }}
            />
            <Link href="/upgraders" className={styles.upgCta}>
              <span>{t.upgraders.cta}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <div className={styles.upgPillars}>
              {UPGRADERS_PILLARS.map((p) => (
                <div className={styles.upgPillar} key={p.name}>
                  <div className={styles.upgPillarNum}>{pick(p.num, lang)}</div>
                  <h3 className={styles.upgPillarName}>
                    {p.prefix}
                    {p.nameEm ? <em>{p.nameEm}</em> : null}
                  </h3>
                  <p
                    className={styles.upgPillarDesc}
                    dangerouslySetInnerHTML={{ __html: pick(p.desc, lang) }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.upgFooter}>
              <span><b>#ToTheNextLevel</b></span>
              <span><b>#UPyourBrand</b></span>
              <span>upgraders.io</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
