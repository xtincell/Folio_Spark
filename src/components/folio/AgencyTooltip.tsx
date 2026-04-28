'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { AGENCY_INFO } from './data/agencies';

type AgencyTooltipProps = {
  name: string;
  children: ReactNode;
};

export function AgencyTooltip({ name, children }: AgencyTooltipProps) {
  const info = AGENCY_INFO[name];
  const [open, setOpen] = useState(false);
  if (!info) return <>{children}</>;
  return (
    <span
      className={styles.agencyTipWrap}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
      }}
    >
      {children}
      {open && (
        <span className={styles.agencyTip} role="tooltip">
          <span className={styles.agencyTipKind}>{info.kind}</span>
          <span className={styles.agencyTipName}>{name}</span>
          <span
            className={styles.agencyTipDesc}
            dangerouslySetInnerHTML={{ __html: info.desc }}
          />
          {info.link && (
            <Link className={styles.agencyTipLink} href={info.link}>
              Découvrir →
            </Link>
          )}
        </span>
      )}
    </span>
  );
}
