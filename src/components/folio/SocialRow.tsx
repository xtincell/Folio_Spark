import styles from '@/styles/home.module.css';
import { CONTACT } from './data/contact';

const Icons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 3h3.2l-7 8 8.2 10h-6.4l-5-6.4L4.8 21H1.6l7.5-8.5L1.2 3h6.6l4.5 5.9L17.6 3Zm-1.1 16h1.8L7.6 5H5.7l10.8 14Z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10.5H7.5v3h2.8V21h3.2Z" />
    </svg>
  ),
  Behance: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 5h6.4c1.4 0 2.5.3 3.2.9.7.6 1 1.5 1 2.5 0 .7-.2 1.3-.5 1.7-.3.5-.8.8-1.4 1.1.8.2 1.5.6 1.9 1.2.4.6.7 1.3.7 2.2 0 1.3-.5 2.4-1.4 3.1-.9.7-2.1 1.1-3.7 1.1H2V5Zm2.5 5.6h3.2c.7 0 1.2-.1 1.6-.4.3-.3.5-.7.5-1.2 0-.6-.2-1-.5-1.2-.3-.3-.9-.4-1.6-.4H4.5v3.2Zm0 6.1h3.6c.7 0 1.3-.1 1.7-.4.4-.3.6-.8.6-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-1-.5-1.7-.5H4.5v3.7ZM18.3 17c.5 0 .9-.1 1.2-.4.3-.2.6-.6.7-1h2.3c-.2 1-.7 1.8-1.5 2.4-.8.6-1.7.9-2.8.9-1.4 0-2.5-.5-3.4-1.4-.9-.9-1.3-2.1-1.3-3.5 0-1.5.4-2.6 1.3-3.5.9-.9 2-1.4 3.4-1.4 1.4 0 2.5.5 3.3 1.4.8.9 1.2 2.1 1.2 3.6v.6h-6.6c.1.7.3 1.2.7 1.6.4.4.9.7 1.5.7Zm1.6-4.7c-.4-.4-.9-.6-1.5-.6-.6 0-1.1.2-1.4.6-.4.4-.6.9-.7 1.5h4.2c-.1-.6-.3-1.1-.6-1.5ZM15 6.5h5.4v1.7H15V6.5Z" />
    </svg>
  ),
};

const LINKS = [
  { name: 'Instagram', href: CONTACT.instagram, I: Icons.Instagram },
  { name: 'X / Twitter', href: CONTACT.twitter, I: Icons.X },
  { name: 'Facebook', href: CONTACT.facebook, I: Icons.Facebook },
  { name: 'Behance', href: CONTACT.behance, I: Icons.Behance },
];

export function SocialRow() {
  return (
    <div className={styles.contactSocial}>
      <div className={styles.csLabel}>
        Social <span style={{ color: 'var(--accent)' }}>—</span> @xtincell partout
      </div>
      {LINKS.map(({ name, href, I }) => (
        <a key={name} className={styles.csLink} href={href} target="_blank" rel="noreferrer">
          <I />
          <span>{name}</span>
        </a>
      ))}
    </div>
  );
}
