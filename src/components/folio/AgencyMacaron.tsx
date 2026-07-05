import styles from '@/styles/agencyMacaron.module.css';
import { agencyLabel } from './agencyCredit';

/**
 * Agency-credit macaron for a campaign visual (e.g. "◍ MATANGA").
 * Presentational only — drop it inside a position:relative image container.
 */
export function AgencyMacaron({
  agency,
  lang = 'fr',
  corner = 'tl',
}: {
  agency: string;
  lang?: 'fr' | 'en';
  corner?: 'tl' | 'tr';
}) {
  const title = lang === 'en' ? `Produced with ${agency}` : `Réalisé avec ${agency}`;
  return (
    <span className={`${styles.macaron} ${corner === 'tr' ? styles.tr : ''}`} title={title} aria-label={title}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.name}>{agencyLabel(agency)}</span>
    </span>
  );
}
