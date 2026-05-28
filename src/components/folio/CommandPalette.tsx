'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/commandPalette.module.css';
import { CONTACT } from './data/contact';

type Cmd = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const go = (href: string) => () => {
      setOpen(false);
      router.push(href);
    };
    const ext = (href: string) => () => {
      setOpen(false);
      window.open(href, '_blank', 'noopener,noreferrer');
    };
    return [
      { id: 'home', group: 'Naviguer', label: 'Accueil', hint: '/', run: go('/') },
      { id: 'work', group: 'Naviguer', label: 'Folio', hint: '/work', run: go('/work') },
      { id: 'galerie', group: 'Naviguer', label: 'Galerie', hint: '/galerie', run: go('/galerie') },
      { id: 'cv', group: 'Naviguer', label: 'CV', hint: '/cv', run: go('/cv') },
      { id: 'upg', group: 'Naviguer', label: 'UPgraders', hint: '/upgraders', run: go('/upgraders') },
      { id: 'blog', group: 'Naviguer', label: 'Blog UPgraders', hint: '/upgraders/blog', run: go('/upgraders/blog') },
      { id: 'manifeste', group: 'Sections', label: 'Manifeste', run: go('/#manifeste') },
      { id: 'methode', group: 'Sections', label: 'Méthode ADVE/RTIS', run: go('/#methode') },
      { id: 'contact', group: 'Sections', label: 'Contact', run: go('/#contact') },
      { id: 'wa', group: 'Contact', label: 'WhatsApp', hint: CONTACT.whatsappDisplay, run: ext(CONTACT.whatsappLink) },
      { id: 'mail', group: 'Contact', label: 'Email', hint: CONTACT.email, run: ext(`mailto:${CONTACT.email}`) },
      {
        id: 'copy',
        group: 'Contact',
        label: "Copier l'email",
        run: () => {
          void navigator.clipboard?.writeText(CONTACT.email);
          setOpen(false);
        },
      },
      { id: 'linkedin', group: 'Contact', label: 'LinkedIn', hint: CONTACT.linkedinDisplay, run: ext(CONTACT.linkedinLink) },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q),
    );
  }, [query, commands]);

  // Global ⌘K / Ctrl+K toggle + Escape
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // On open: reset, focus, lock body scroll
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIdx(0);
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Reset highlight whenever the result set changes
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIdx]?.run();
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la palette de commandes"
        aria-haspopup="dialog"
      >
        <span>Commandes</span>
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div className={styles.overlay} role="presentation" onClick={() => setOpen(false)}>
          <div
            className={styles.palette}
            role="dialog"
            aria-modal="true"
            aria-label="Palette de commandes"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.inputRow}>
              <span className={styles.prompt} aria-hidden="true">
                ⌘
              </span>
              <input
                ref={inputRef}
                className={styles.input}
                placeholder="Naviguer, contacter…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                aria-label="Rechercher une commande"
                role="combobox"
                aria-expanded="true"
                aria-controls="cp-list"
                autoComplete="off"
              />
              <kbd className={styles.kbd}>ESC</kbd>
            </div>

            <ul id="cp-list" className={styles.list} role="listbox" aria-label="Commandes">
              {filtered.length === 0 && <li className={styles.empty}>Aucune commande</li>}
              {filtered.map((c, i) => (
                <li
                  key={c.id}
                  role="option"
                  aria-selected={i === activeIdx}
                  className={`${styles.item} ${i === activeIdx ? styles.itemActive : ''}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => c.run()}
                >
                  <span className={styles.itemGroup}>{c.group}</span>
                  <span className={styles.itemLabel}>{c.label}</span>
                  {c.hint && <span className={styles.itemHint}>{c.hint}</span>}
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <span><kbd>↑↓</kbd>naviguer</span>
              <span><kbd>↵</kbd>ouvrir</span>
              <span className={styles.footerBrand}>BRAND OS · XTINCELL</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
