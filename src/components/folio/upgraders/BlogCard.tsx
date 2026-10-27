'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import type { BlogPost } from '@/lib/wordpress';
import { formatDate } from './format';
import { useLang } from '@/lib/i18n';
import { useState } from 'react';

export function BlogCard({ post }: { post: BlogPost }) {
  const { lang } = useLang();
  const cat = post.categories[0];
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <Link href={`/upgraders/blog/${post.slug}`} className={styles.blogCard}>
      <div className={styles.blogCardCover}>
        {post.cover && !imageFailed ? (
          <img src={post.cover.src} alt={post.cover.alt} loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <div className={styles.blogCardCoverFallback} aria-hidden>
            UP
          </div>
        )}
      </div>
      <div className={styles.blogCardBody}>
        <div className={styles.blogCardMeta}>
          {cat ? <span className={styles.blogCardCat}>{cat.name}</span> : null}
          <span>{formatDate(post.publishedAt, lang)}</span>
          <span>{post.readingMinutes} min</span>
        </div>
        <h3 className={styles.blogCardTitle} lang="fr">{post.title}</h3>
        <p className={styles.blogCardExcerpt} lang="fr">{post.excerpt}</p>
        <span className={styles.blogCardCta}>
          {lang === 'en' ? 'Read the article' : 'Lire l’article'} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
