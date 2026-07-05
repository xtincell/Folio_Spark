'use client';

import { useId, useState, type ReactNode } from 'react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { AGENCY_INFO } from './data/agencies';
import { useT, useLang, pick } from '@/lib/i18n';

type AgencyTooltipProps = {
  name: string;
  children: ReactNode;
};

export function AgencyTooltip({ name, children }: AgencyTooltipProps) {
  const t = useT();
  const { lang } = useLang();
  const tipId = useId();
  const info = AGENCY_INFO[name];
  const [open, setOpen] = useState(false);
  if (!info) return <>{children}</>;
  return (
    <span
      className={styles.agencyTipWrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Bouton réel : activable à la souris, au clavier (Entrée/Espace) et au focus. */}
      <button
        type="button"
        className={styles.agencyTipBtn}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        {children}
      </button>
      {open && (
        <span className={styles.agencyTip} role="tooltip" id={tipId}>
          <span className={styles.agencyTipKind}>{pick(info.kind, lang)}</span>
          <span className={styles.agencyTipName}>{name}</span>
          <span
            className={styles.agencyTipDesc}
            dangerouslySetInnerHTML={{ __html: pick(info.desc, lang) }}
          />
          {info.link && (
            <Link className={styles.agencyTipLink} href={info.link}>
              {t.agency.discover}
            </Link>
          )}
        </span>
      )}
    </span>
  );
}
