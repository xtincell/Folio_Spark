'use client';

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/commandPalette.module.css';
import { CONTACT } from './data/contact';
import { useT, useLang } from '@/lib/i18n';

type Cmd = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const t = useT();
  const { lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const p = t.palette;

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
      { id: 'home', group: p.groupNav, label: p.home, hint: '/', run: go('/') },
      { id: 'work', group: p.groupNav, label: p.folio, hint: '/work', run: go('/work') },
      { id: 'galerie', group: p.groupNav, label: p.gallery, hint: '/galerie', run: go('/galerie') },
      { id: 'design', group: p.groupNav, label: p.design, hint: '/design', run: go('/design') },
      { id: 'tech', group: p.groupNav, label: p.tech, hint: '/tech', run: go('/tech') },
      { id: 'cv', group: p.groupNav, label: p.cv, hint: '/cv', run: go('/cv') },
      { id: 'pricing', group: p.groupNav, label: p.pricing, hint: '/tarifs', run: go('/tarifs') },
      { id: 'upg', group: p.groupNav, label: p.upgraders, hint: '/upgraders', run: go('/upgraders') },
      { id: 'blog', group: p.groupNav, label: p.blog, hint: '/upgraders/blog', run: go('/upgraders/blog') },
      { id: 'manifeste', group: p.groupSections, label: p.manifesto, run: go('/#manifeste') },
      { id: 'methode', group: p.groupSections, label: p.method, run: go('/#methode') },
      { id: 'contact', group: p.groupSections, label: p.contact, run: go('/#contact') },
      { id: 'wa', group: p.groupContact, label: p.whatsapp, hint: CONTACT.whatsappDisplay, run: ext(CONTACT.whatsappLink) },
      { id: 'mail', group: p.groupContact, label: p.email, hint: CONTACT.email, run: ext(`mailto:${CONTACT.email}`) },
      {
        id: 'copy',
        group: p.groupContact,
        label: p.copyEmail,
        run: () => {
          void navigator.clipboard?.writeText(CONTACT.email);
          setOpen(false);
        },
      },
      { id: 'linkedin', group: p.groupContact, label: p.linkedin, hint: CONTACT.linkedinDisplay, run: ext(CONTACT.linkedinLink) },
      {
        id: 'lang',
        group: p.groupLang,
        label: p.switchLang,
        hint: lang === 'fr' ? 'FR → EN' : 'EN → FR',
        run: () => {
          toggle();
          setOpen(false);
        },
      },
    ];
  }, [router, p, lang, toggle]);

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
        aria-label={p.ariaOpen}
        aria-haspopup="dialog"
      >
        <span>{p.trigger}</span>
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div className={styles.overlay} role="presentation" onClick={() => setOpen(false)}>
          <div
            className={styles.palette}
            role="dialog"
            aria-modal="true"
            aria-label={p.ariaDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.inputRow}>
              <span className={styles.prompt} aria-hidden="true">
                ⌘
              </span>
              <input
                ref={inputRef}
                className={styles.input}
                placeholder={p.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                aria-label={p.ariaSearch}
                role="combobox"
                aria-expanded="true"
                aria-controls="cp-list"
                autoComplete="off"
              />
              <kbd className={styles.kbd}>ESC</kbd>
            </div>

            <ul id="cp-list" className={styles.list} role="listbox" aria-label={p.ariaDialog}>
              {filtered.length === 0 && <li className={styles.empty}>{p.empty}</li>}
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
              <span><kbd>↑↓</kbd>{p.navigate}</span>
              <span><kbd>↵</kbd>{p.open}</span>
              <span className={styles.footerBrand}>BRAND OS · XTINCELL</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
