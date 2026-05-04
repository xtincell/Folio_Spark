/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '@/styles/upgraders.module.css';
import { SiteNav } from '@/components/folio/upgraders/SiteNav';
import { SiteFooter } from '@/components/folio/upgraders/SiteFooter';
import { BlogCard, formatDate } from '@/components/folio/upgraders/BlogCard';
import { getPost, getRelatedPosts, getAllPostSlugs } from '@/lib/wordpress';

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Article introuvable — UPgraders' };
  return {
    title: `${post.title} — UPgraders`,
    description: post.excerpt,
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: post.cover ? [{ url: post.cover.src, alt: post.cover.alt }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);
  const cat = post.categories[0];

  return (
    <div className={styles.folioRoot}>
      <SiteNav active="blog" />

      <article className={styles.pageHero}>
        <div className={styles.container}>
          <Link
            href="/upgraders/blog"
            className={styles.topnavBack}
            style={{ marginBottom: 24, display: 'inline-flex' }}
          >
            <span className="arrow">←</span>
            <span>Retour au blog</span>
          </Link>
          <div className={styles.postArticle}>
            <div className={styles.postMeta}>
              {cat ? <b>{cat.name}</b> : null}
              <span>{formatDate(post.publishedAt)}</span>
              <span>{post.readingMinutes} min de lecture</span>
              {post.author ? <span>par {post.author.name}</span> : null}
            </div>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <p className={styles.postExcerpt}>{post.excerpt}</p>
          </div>
        </div>
      </article>

      <section className={styles.sec} style={{ paddingTop: 0, borderTop: 0 }}>
        <div className={styles.container}>
          <div className={styles.postArticle}>
            {post.cover ? (
              <div className={styles.postCover}>
                <img src={post.cover.src} alt={post.cover.alt} />
              </div>
            ) : null}

            <div
              className={styles.postBody}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {post.tags.length > 0 ? (
              <div className={styles.postTags}>
                {post.tags.map((t) => (
                  <Link key={t.slug} href={`/upgraders/blog?tag=${t.slug}`} className={styles.postTag}>
                    #{t.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <ShareRow title={post.title} />

            <div className={styles.postNav}>
              <Link href="/upgraders/blog">← Tous les articles</Link>
              <Link href="/upgraders/contact">Démarrer un projet →</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className={`${styles.sec} ${styles.advertis}`}>
          <div className={styles.container}>
            <div className={styles.secHead}>
              <span className={styles.secNum}>↳</span>
              <span>À lire ensuite</span>
            </div>
            <h2 className={styles.secTitle}>
              Continuer la <em>lecture</em>.
            </h2>
            <div className={styles.blogGrid}>
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </div>
  );
}

function ShareRow({ title }: { title: string }) {
  const text = encodeURIComponent(title);
  return (
    <div className={styles.postShare}>
      <span className={styles.postShareLabel}>Partager</span>
      <a
        className={styles.postShareLink}
        href={`https://wa.me/?text=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a
        className={styles.postShareLink}
        href={`https://www.linkedin.com/sharing/share-offsite/?text=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
      <a
        className={styles.postShareLink}
        href={`https://x.com/intent/tweet?text=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
    </div>
  );
}
