import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';

export default function NotFound() {
  return (
    <div className={styles.folioRoot}>
      <SiteNav active="blog" />
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>404 · article</div>
          <h1 className={styles.pageHeroTitle}>
            Cet <em>article</em> n&apos;existe <b>plus</b>.
          </h1>
          <p className={styles.pageHeroLede}>
            Soit le slug a changé, soit l&apos;article a été dépublié côté WordPress.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link href="/upgraders/blog" className={styles.footerCta}>
              <span>Retour au blog</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
