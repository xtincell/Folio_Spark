import styles from '@/styles/home.module.css';
import type { Proof } from './data/practices';

function buildEmbed(url: string): { src: string; aspect: string } | null {
  // YouTube
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (yt && yt[1]) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0&modestbranding=1`,
      aspect: '16/9',
    };
  }
  // Facebook video
  if (/facebook\.com\/.+\/videos\/\d+/.test(url)) {
    return {
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`,
      aspect: '16/9',
    };
  }
  // Instagram /reel/ID or /p/ID
  const ig = url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);
  if (ig && ig[1]) {
    return { src: `https://www.instagram.com/p/${ig[1]}/embed`, aspect: '9/16' };
  }
  // Instagram /username/reel/ID
  const ig2 = url.match(/instagram\.com\/[^/]+\/reel\/([\w-]+)/);
  if (ig2 && ig2[1]) {
    return { src: `https://www.instagram.com/reel/${ig2[1]}/embed`, aspect: '9/16' };
  }
  return null;
}

export function ProofEmbed({ pr }: { pr: Proof }) {
  const embed = buildEmbed(pr.url);

  if (!embed) {
    return (
      <a
        className={styles.proofLink}
        href={pr.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.proofHost}>{pr.host}</span>
        <span className={styles.proofLabel}>{pr.label}</span>
        <span className={styles.proofArrow} aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <figure className={styles.proofEmbed} style={{ aspectRatio: embed.aspect }}>
      <iframe
        src={embed.src}
        title={pr.label}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <figcaption className={styles.proofCap}>
        <span className={styles.proofHost}>{pr.host}</span>
        <span className={styles.proofLabel}>{pr.label}</span>
        <a
          className={styles.proofOpen}
          href={pr.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ouvrir ↗
        </a>
      </figcaption>
    </figure>
  );
}
