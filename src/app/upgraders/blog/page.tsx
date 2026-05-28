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
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const { posts, totalPages, source, total } = await getBlogIndex({
    page,
    perPage: PER_PAGE,
    category: sp.cat,
    tag: sp.tag,
  });

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="blog" />

      <main id="contenu">
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
          <div style={{ marginTop: 32 }}>
            <span className={styles.blogStatus}>
              <span
                className={`${styles.blogStatusDot} ${source === 'wordpress' ? styles.live : ''}`}
                aria-hidden
              />
              {source === 'wordpress'
                ? `Connecté · ${total} articles publiés`
                : `Mode local · prêt à se connecter à WordPress`}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.sec} style={{ paddingTop: 0, borderTop: 0 }}>
        <div className={styles.container}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <h2 className={styles.emptyTitle}>Pas encore d&apos;articles</h2>
              <p className={styles.emptyDesc}>
                Le flux est vide pour le moment. Configurez{' '}
                <code>WORDPRESS_API_URL</code> ou ajoutez des articles dans la liste locale.
              </p>
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
                  <Link
                    href={pageHref(page - 1, sp)}
                    className={`${styles.blogPageLink} ${page === 1 ? styles.blogPageDisabled : ''}`}
                    aria-disabled={page === 1}
                  >
                    ← Précédent
                  </Link>
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
                  <Link
                    href={pageHref(page + 1, sp)}
                    className={`${styles.blogPageLink} ${page >= totalPages ? styles.blogPageDisabled : ''}`}
                    aria-disabled={page >= totalPages}
                  >
                    Suivant →
                  </Link>
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
