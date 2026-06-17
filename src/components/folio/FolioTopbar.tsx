'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/folioTopbar.module.css';
import { CONTACT } from './data/contact';
import { FlameMark } from './FlameMark';
import { LangToggle } from './LangToggle';
import { useT } from '@/lib/i18n';

type Active = 'accueil' | 'folio' | 'galerie' | 'cv' | 'design';

export function FolioTopbar({ label, active }: { label?: string; active: Active }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  const links: { key: Active; href: string; label: string }[] = [
    { key: 'accueil', href: '/', label: t.nav.home },
    { key: 'folio', href: '/work', label: t.nav.folio },
    { key: 'galerie', href: '/galerie', label: t.nav.gallery },
    { key: 'design', href: '/design', label: t.nav.design },
    { key: 'cv', href: '/cv', label: t.nav.cv },
  ];

  // Brand suffix: an explicit label wins, otherwise derive from the active page.
  const activeLabel =
    label ?? (links.find((l) => l.key === active)?.label ?? '').toUpperCase();

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
        <FlameMark size={22} white animated={false} />
        <span>XTINCELL — {activeLabel}</span>
      </Link>

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="folio-topnav"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? t.nav.close : t.nav.menu}</span>
        <span className={`${styles.bars} ${open ? styles.barsOpen : ''}`} aria-hidden="true">
          <i /><i />
        </span>
      </button>

      <nav
        id="folio-topnav"
        className={`${styles.nav} ${open ? styles.navOpen : ''}`}
        aria-label={t.topbar.principal}
      >
        {links.map((l) => (
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
          {t.nav.contact}
        </a>
        <LangToggle />
      </nav>
    </header>
  );
}
