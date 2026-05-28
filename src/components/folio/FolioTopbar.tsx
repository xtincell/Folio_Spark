'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/folioTopbar.module.css';
import { CONTACT } from './data/contact';

type Active = 'accueil' | 'folio' | 'galerie' | 'cv';

const LINKS: { key: Active; href: string; label: string }[] = [
  { key: 'accueil', href: '/', label: 'Accueil' },
  { key: 'folio', href: '/work', label: 'Folio' },
  { key: 'galerie', href: '/galerie', label: 'Galerie' },
  { key: 'cv', href: '/cv', label: 'CV' },
];

export function FolioTopbar({ label, active }: { label: string; active: Active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.topbar}>
      <Link href="/" className={styles.brand} onClick={close}>
        <Image src="/logo-spark-white.png" alt="Xtincell" width={22} height={22} />
        <span>XTINCELL — {label}</span>
      </Link>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="folio-topnav"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? 'Fermer' : 'Menu'}</span>
        <span className={`${styles.bars} ${open ? styles.barsOpen : ''}`} aria-hidden="true">
          <i /><i />
        </span>
      </button>

      <nav
        id="folio-topnav"
        className={`${styles.nav} ${open ? styles.navOpen : ''}`}
        aria-label="Navigation principale"
      >
        {LINKS.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            onClick={close}
            {...(l.key === active ? { 'aria-current': 'page' as const } : {})}
          >
            {l.label}
          </Link>
        ))}
        <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" onClick={close}>
          Contact
        </a>
      </nav>
    </header>
  );
}
