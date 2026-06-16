'use client';

import styles from '@/styles/langToggle.module.css';
import { useLang, type Lang } from '@/lib/i18n';

/**
 * Two-segment FR / EN switch. Mirrors its state from the language context and
 * persists the choice (handled by the provider). Usable on any folio surface —
 * it inherits colour tokens from the surrounding scope.
 */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  const seg = (value: Lang, label: string) => (
    <button
      type="button"
      className={`${styles.seg} ${lang === value ? styles.segActive : ''}`}
      aria-pressed={lang === value}
      aria-label={value === 'fr' ? 'Français' : 'English'}
      onClick={() => setLang(value)}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`${styles.toggle} ${className ?? ''}`}
      role="group"
      aria-label="Language / Langue"
    >
      {seg('fr', 'FR')}
      <span className={styles.sep} aria-hidden="true" />
      {seg('en', 'EN')}
    </div>
  );
}
