'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import s from '@/styles/studioPages.module.css';

type Entry = { id: string; fr: string; en: string };

/** A compact, keyboard-accessible index for long editorial pages. */
export function PageIndex({
  items,
  english = false,
}: {
  items: Entry[];
  english?: boolean;
}) {
  const { lang } = useLang();
  const en = english || lang === 'en';
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
    );
    for (const item of items) {
      const target = document.getElementById(item.id);
      if (target) observer.observe(target);
    }
    return () => observer.disconnect();
  }, [items]);
  return (
    <nav
      className={s.index}
      aria-label={en ? 'On this page' : 'Dans cette page'}
      lang={en ? 'en' : 'fr'}
    >
      <span>
        {en ? 'Explorer' : 'Explorer'}
        <span aria-hidden="true"> ↓</span>
      </span>
      <div>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'location' : undefined}
            onClick={() => setActive(item.id)}
          >
            {en ? item.en : item.fr}
          </a>
        ))}
      </div>
    </nav>
  );
}
