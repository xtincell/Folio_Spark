'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { FlameMark } from './FlameMark';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and whenever the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false);
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
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#top" className={styles.navBrand} onClick={close}>
        <FlameMark size={28} animated={false} />
        <span>XTINCELL</span>
        <span className={styles.navBrandMeta}>— ALEXANDRE DJENGUE</span>
      </a>

      <button
        type="button"
        className={styles.navToggle}
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{open ? 'Fermer' : 'Menu'}</span>
        <span className={`${styles.navToggleBars} ${open ? styles.navToggleBarsOpen : ''}`} aria-hidden="true">
          <i /><i />
        </span>
      </button>

      <div
        id="nav-menu"
        className={`${styles.navLinks} ${open ? styles.navLinksOpen : ''}`}
      >
        <a href="#manifeste" onClick={close}>Manifeste</a>
        <a href="#methode" onClick={close}>Méthode</a>
        <Link href="/work" onClick={close}>Folio ↗</Link>
        <Link href="/galerie" onClick={close}>Galerie ↗</Link>
        <Link href="/cv" onClick={close}>CV ↗</Link>
        <a href="#contact" className={styles.navCta} onClick={close}>Contact →</a>
      </div>
    </nav>
  );
}
