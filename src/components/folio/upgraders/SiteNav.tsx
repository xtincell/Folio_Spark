'use client';

import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang, pick, type Bi } from '@/lib/i18n';

type Props = { active?: 'home' | 'services' | 'blog' | 'contact' };

const ITEMS: { key: NonNullable<Props['active']>; label: Bi; href: string }[] = [
  { key: 'home', label: { fr: 'Accueil', en: 'Home' }, href: '/upgraders' },
  { key: 'services', label: { fr: 'Services', en: 'Services' }, href: '/upgraders/services' },
  { key: 'blog', label: { fr: 'Blog', en: 'Blog' }, href: '/upgraders/blog' },
  { key: 'contact', label: { fr: 'Contact', en: 'Contact' }, href: '/upgraders/contact' },
];

const BACK: Bi = { fr: 'Folio Xtincell', en: 'Xtincell folio' };
const BRAND_SUB: Bi = { fr: 'conseil & stratégie', en: 'consulting & strategy' };

export function SiteNav({ active }: Props) {
  const { lang } = useLang();
  return (
    <nav className={styles.topnav}>
      <div className={styles.container}>
        <div className={styles.topnavRow}>
          <Link className={styles.topnavBack} href="/">
            <span className="arrow">←</span>
            <span>{pick(BACK, lang)}</span>
          </Link>
          <div className={styles.topnavLinks}>
            {ITEMS.map((it) => (
              <Link
                key={it.key}
                href={it.href}
                aria-current={active === it.key ? 'page' : undefined}
                className={active === it.key ? styles.topnavLinkActive : undefined}
              >
                {pick(it.label, lang)}
              </Link>
            ))}
            <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
          <div className={styles.topnavBrand}>
            UPgraders <b>·</b> {pick(BRAND_SUB, lang)}
          </div>
        </div>
      </div>
    </nav>
  );
}
