'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/home.module.css';
import { FlameMark } from './FlameMark';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <a href="#top" className={styles.navBrand}>
        <FlameMark size={28} animated={false} />
        <span>XTINCELL</span>
        <span className={styles.navBrandMeta}>— ALEXANDRE DJENGUE</span>
      </a>
      <div className={styles.navLinks}>
        <a href="#manifeste">Manifeste</a>
        <a href="#travaux">Travaux</a>
        <Link href="/work">Folio ↗</Link>
        <Link href="/cv">CV ↗</Link>
        <a href="#contact" className={styles.navCta}>Contact →</a>
      </div>
    </nav>
  );
}
