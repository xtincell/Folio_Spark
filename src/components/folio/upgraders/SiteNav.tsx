import Link from 'next/link';
import styles from '@/styles/upgraders.module.css';
import { CONTACT } from '@/components/folio/data/contact';

type Props = { active?: 'home' | 'services' | 'blog' | 'contact' };

const ITEMS: { key: NonNullable<Props['active']>; label: string; href: string }[] = [
  { key: 'home', label: 'Accueil', href: '/upgraders' },
  { key: 'services', label: 'Services', href: '/upgraders/services' },
  { key: 'blog', label: 'Blog', href: '/upgraders/blog' },
  { key: 'contact', label: 'Contact', href: '/upgraders/contact' },
];

export function SiteNav({ active }: Props) {
  return (
    <nav className={styles.topnav}>
      <div className={styles.container}>
        <div className={styles.topnavRow}>
          <Link className={styles.topnavBack} href="/">
            <span className="arrow">←</span>
            <span>Folio Xtincell</span>
          </Link>
          <div className={styles.topnavLinks}>
            {ITEMS.map((it) => (
              <Link
                key={it.key}
                href={it.href}
                aria-current={active === it.key ? 'page' : undefined}
                className={active === it.key ? styles.topnavLinkActive : undefined}
              >
                {it.label}
              </Link>
            ))}
            <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
          <div className={styles.topnavBrand}>
            UPgraders <b>·</b> conseil &amp; stratégie
          </div>
        </div>
      </div>
    </nav>
  );
}
