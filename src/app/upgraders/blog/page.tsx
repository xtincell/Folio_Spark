import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { BlogCard } from '@/components/folio/upgraders/BlogCard';
import { getBlogIndex } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Blog — UPgraders · Méthode ADVE/RTIS, marques cultes, conseil créatif',
  description:
    "Notes de cabinet UPgraders : méthode ADVE/RTIS, OS LaFusée, construction de cultes de marque en Afrique de l'Ouest et Centrale.",
  alternates: { canonical: '/upgraders/blog' },
};

const PER_PAGE = 9;

type SearchParams = { page?: string; cat?: string; tag?: string };

function pageHref(page: number, sp: SearchParams): string {
  const usp = new URLSearchParams();
  if (page > 1) usp.set('page', String(page));
  if (sp.cat) usp.set('cat', sp.cat);
  if (sp.tag) usp.set('tag', sp.tag);
  const q = usp.toString();
  return q ? `/upgraders/blog?${q}` : '/upgraders/blog';
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Math.floor(Number(sp.page ?? 1) || 1));
  const { posts, totalPages, total } = await getBlogIndex({
    page,
    perPage: PER_PAGE,
    category: sp.cat,
    tag: sp.tag,
  });

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="blog" />

      <main id="contenu" lang="fr">
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <div className={styles.pageHeroEyebrow}>Notes de cabinet</div>
          <h1 className={styles.pageHeroTitle}>
            Le <em>blog</em> <b>UP</b>graders.
          </h1>
          <p className={styles.pageHeroLede}>
            Lectures longues sur la <b>méthode ADVE/RTIS</b>, l&apos;OS LaFusée, et la construction de
            marques cultes en Afrique de l&apos;Ouest et Centrale. Pas de listicle, pas de SEO bavard
            — du retour de mission.
          </p>
          <p className={styles.articleCount}>{total} {total === 1 ? 'article' : 'articles'} · en français</p>
          {(sp.cat || sp.tag) && <div className={styles.activeFilter}><span>{sp.cat ? `Catégorie : ${sp.cat}` : `Mot-clé : ${sp.tag}`}</span><Link href="/upgraders/blog">Tous les articles ×</Link></div>}
        </div>
      </section>

      <section className={styles.sec} style={{ paddingTop: 0, borderTop: 0 }}>
        <div className={styles.container}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <h2 className={styles.emptyTitle}>Pas encore d&apos;articles</h2>
              <p className={styles.emptyDesc}>Aucun article ne correspond à cette page ou à ce filtre.</p>
              <Link className={styles.teaserLink} href="/upgraders/blog">Revenir à tous les articles →</Link>
            </div>
          ) : (
            <>
              <div className={styles.blogGrid}>
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav className={styles.blogPagination} aria-label="Pagination">
                  {page > 1 ? <Link
                    href={pageHref(page - 1, sp)}
                    className={styles.blogPageLink}
                  >
                    ← Précédent
                  </Link> : <span className={`${styles.blogPageLink} ${styles.blogPageDisabled}`} aria-disabled="true">← Précédent</span>}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <Link
                      key={n}
                      href={pageHref(n, sp)}
                      className={`${styles.blogPageLink} ${n === page ? styles.blogPageLinkActive : ''}`}
                      aria-current={n === page ? 'page' : undefined}
                    >
                      {n}
                    </Link>
                  ))}
                  {page < totalPages ? <Link
                    href={pageHref(page + 1, sp)}
                    className={styles.blogPageLink}
                  >
                    Suivant →
                  </Link> : <span className={`${styles.blogPageLink} ${styles.blogPageDisabled}`} aria-disabled="true">Suivant →</span>}
                </nav>
              ) : null}
            </>
          )}
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
