/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import type { BlogPost } from '@/lib/wordpress';

const FR_DATE = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(iso: string): string {
  try {
    return FR_DATE.format(new Date(iso));
  } catch {
    return iso;
  }
}

export function BlogCard({ post }: { post: BlogPost }) {
  const cat = post.categories[0];
  return (
    <Link href={`/upgraders/blog/${post.slug}`} className={styles.blogCard}>
      <div className={styles.blogCardCover}>
        {post.cover ? (
          <img src={post.cover.src} alt={post.cover.alt} loading="lazy" />
        ) : (
          <div className={styles.blogCardCoverFallback} aria-hidden>
            UP
          </div>
        )}
      </div>
      <div className={styles.blogCardBody}>
        <div className={styles.blogCardMeta}>
          {cat ? <span className={styles.blogCardCat}>{cat.name}</span> : null}
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingMinutes} min</span>
        </div>
        <h3 className={styles.blogCardTitle}>{post.title}</h3>
        <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
        <span className={styles.blogCardCta}>
          Lire l&apos;article <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
