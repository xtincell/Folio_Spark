import styles from '@/styles/agencyMacaron.module.css';
import { agencyLabel } from './agencyCredit';

type Corner = 'tl' | 'tr' | 'bl' | 'br';

/**
 * Agency-credit badge for a campaign visual.
 *  - variant "macaron": full pill for covers/heroes;
 *  - variant "sticker": mini badge for dense/small visuals (thumbnails, shots).
 * Presentational only — drop inside a position:relative image container.
 */
export function AgencyMacaron({
  agency,
  lang = 'fr',
  corner = 'tl',
  variant = 'macaron',
}: {
  agency: string;
  lang?: 'fr' | 'en';
  corner?: Corner;
  variant?: 'macaron' | 'sticker';
}) {
  const title = lang === 'en' ? `Produced with ${agency}` : `Réalisé avec ${agency}`;
  const cls = [
    styles.badge,
    variant === 'sticker' ? styles.sticker : styles.macaron,
    styles[corner],
  ].join(' ');
  return (
    <span className={cls} title={title} aria-label={title}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.name}>{agencyLabel(agency)}</span>
    </span>
  );
}
