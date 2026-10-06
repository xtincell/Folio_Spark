'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { FlameMark } from '@/components/folio/FlameMark';
import { useLang, pick } from '@/lib/i18n';
import { CONTACT } from '@/components/folio/data/contact';
import { type CaseStudy, HAT_LABEL } from '@/components/folio/data/cases';
import { agencyForCase } from '@/components/folio/agencyCredit';
import s from '@/styles/studio.module.css';

export function Arrow({
  diagonal = false,
  className = '',
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-7-7 7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Spark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 0v100M0 50h100M14.6 14.6l70.8 70.8M14.6 85.4l70.8-70.8"
        stroke="currentColor"
        strokeWidth="12"
      />
    </svg>
  );
}
export function StudioHeader() {
  const { lang, setLang } = useLang();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const outside = (event: MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !toggleRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('mousedown', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('mousedown', outside);
    };
  }, [open]);
  const links = [
    ['/', L('Accueil', 'Home')],
    ['/work', L('Projets', 'Work')],
    ['/galerie', L('Galerie', 'Gallery')],
    ['/cv', L('À propos / CV', 'About / Résumé')],
    ['/design', 'Design folio · EN'],
    ['/tech', L('Produits & tech', 'Products & tech')],
    ['/tarifs', L('Services & tarifs', 'Services & pricing')],
    ['/recrutement', L('Recrutement', 'Hiring')],
    ['/upgraders', 'UPgraders ↗'],
  ];
  return (
    <header className={s.header} lang={lang}>
      <Link
        href="/"
        className={s.brand}
        aria-label={L('Xtincell — accueil', 'Xtincell — home')}
      >
        <FlameMark size={30} animated={false} />
        xtincell
      </Link>
      <span className={s.headerDescriptor}>
        {L('Direction créative', 'Creative direction')}
        <br />
        {L('& systèmes de marque', '& brand systems')}
      </span>
      <nav
        className={s.desktopNav}
        aria-label={L('Navigation principale', 'Main navigation')}
      >
        {links.slice(1, 4).map(([href, label]) => (
          <Link
            key={href}
            href={href!}
            aria-current={
              (href === '/' ? path === '/' : path.startsWith(href!))
                ? 'page'
                : undefined
            }
          >
            {label!.split(' / ')[0]}
          </Link>
        ))}
      </nav>
      <div className={s.headerActions}>
        <button
          className={s.language}
          type="button"
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          aria-label={
            lang === 'fr' ? 'Switch to English' : 'Passer en français'
          }
        >
          {lang.toUpperCase()}
          <span aria-hidden="true">⌄</span>
        </button>
        <a
          className={s.headerContact}
          href={CONTACT.whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          {L('Parlons projet', 'Let’s talk')}
          <Arrow diagonal />
        </a>
        <button
          ref={toggleRef}
          type="button"
          className={s.menuToggle}
          aria-expanded={open}
          aria-controls="studio-menu"
          aria-label={L(
            open ? 'Fermer le menu' : 'Ouvrir le menu',
            open ? 'Close menu' : 'Open menu'
          )}
          onClick={() => setOpen(!open)}
        >
          <span /> <span className={open ? s.menuCross : ''} />
        </button>
      </div>
      {open && (
        <div ref={menuRef} id="studio-menu" className={s.menuPanel}>
          <span className={s.eyebrow}>
            {L('Explorer le studio', 'Explore the studio')}
          </span>
          <nav aria-label={L('Toutes les pages', 'All pages')}>
            {links.map(([href, label], i) => (
              <Link
                href={href!}
                key={href}
                onClick={() => setOpen(false)}
                aria-current={
                  (href === '/' ? path === '/' : path.startsWith(href!))
                    ? 'page'
                    : undefined
                }
              >
                <small>{String(i + 1).padStart(2, '0')}</small>
                {label}
                <Arrow diagonal />
              </Link>
            ))}
          </nav>
          <a className={s.menuEmail} href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
            <Arrow />
          </a>
        </div>
      )}
    </header>
  );
}
export function StudioFooter() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  return (
    <footer className={s.footer} id="contact" lang={lang}>
      <div className={s.footerTop}>
        <span className={s.eyebrow}>
          <span className={s.statusDot} />
          {L(
            'Ouvert aux belles collaborations',
            'Open to meaningful collaborations'
          )}
        </span>
        <span>DOUALA · YAOUNDÉ · ABIDJAN</span>
      </div>
      <a
        className={s.footerHeadline}
        href={CONTACT.whatsappLink}
        target="_blank"
        rel="noreferrer"
      >
        {L('Et si on créait', 'Let’s create')}
        <br />
        <span>
          {L('la suite', 'what’s next')}
          <i>?</i>
        </span>
        <Arrow diagonal />
      </a>
      <div className={s.footerContact}>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
          WhatsApp <Arrow diagonal />
        </a>
        <a href={CONTACT.linkedinLink} target="_blank" rel="noreferrer">
          LinkedIn <Arrow diagonal />
        </a>
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
          Instagram <Arrow diagonal />
        </a>
      </div>
      <div className={s.footerBottom}>
        <span>© 2026 Alexandre Djengue — Xtincell</span>
        <div>
          <Link href="/tarifs">
            {L('Services & tarifs', 'Services & pricing')}
          </Link>
          <Link href="/conditions">{L('Conditions', 'Terms')}</Link>
          <a href="#contenu">{L('Retour en haut', 'Back to top')} ↑</a>
        </div>
        <span>
          {L('De l’instinct. Et de la méthode.', 'Instinct. With a method.')}
        </span>
      </div>
    </footer>
  );
}
export function StudioReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduce ? undefined : { y: [18, 0], opacity: [0.75, 1] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function StudioShell({ children }: { children: ReactNode }) {
  return (
    <div className={s.root}>
      <StudioHeader />
      <main id="contenu">{children}</main>
      <StudioFooter />
    </div>
  );
}

export function ProjectCard({
  project: p,
  index = 0,
  featured = false,
}: {
  project: CaseStudy;
  index?: number;
  featured?: boolean;
}) {
  const { lang } = useLang();
  const agency = agencyForCase(p.slug);
  const name = pick(p.name, lang);
  const [title, ...rest] = name.split(' — ');
  return (
    <Link
      href={`/work/${p.slug}`}
      className={`${s.projectCard} ${featured ? s.projectFeatured : ''}`}
    >
      <div className={s.projectImage}>
        <Image
          src={p.hero}
          alt={name}
          fill
          sizes={
            featured
              ? '(max-width: 700px) 100vw, 65vw'
              : '(max-width: 700px) 100vw, 50vw'
          }
          quality={85}
          priority={index < 2}
        />
        <span className={s.projectIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={s.projectOpen}>
          <Arrow diagonal />
        </span>
        <span className={s.projectYear}>{p.year}</span>
      </div>
      <div className={s.projectInfo}>
        <div>
          <h3>{title}</h3>
          <p>{rest.join(' — ') || pick(p.client, lang)}</p>
        </div>
        <span>{pick(HAT_LABEL[p.hat], lang)}</span>
      </div>
      {agency && (
        <span className={s.projectCredit}>
          {lang === 'fr' ? 'Avec' : 'With'} {agency}
        </span>
      )}
    </Link>
  );
}
export function SectionHeading({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={s.sectionHeading}>
      <div>
        <span className={s.eyebrow}>{number} /</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
