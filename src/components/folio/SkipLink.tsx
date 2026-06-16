'use client';

import { useT } from '@/lib/i18n';

/** Accessibility skip link — its label follows the active language. */
export function SkipLink() {
  const t = useT();
  return (
    <a href="#contenu" className="skip-link">
      {t.skip}
    </a>
  );
}
