# Xtincell Folio · Folio_Spark

Personal portfolio + UPgraders agency site for Alexandre « Xtincell » Djengue.

Built from a Claude Design HTML/React-CDN prototype, ported to Next.js 15 (App Router) with TypeScript strict and CSS Modules.

## Pages

- `/` — main folio (hero, manifeste, méthode ADVE/RTIS, casquettes, UPgraders, travaux, LaFusée, contact)
- `/cv` — CV éditorial 60 secondes (print-ready)
- `/work` — folio approfondi en 3 sections : Stratégie, Direction Artistique, Exécution
- `/upgraders` — page dédiée à l'agence UPgraders (méthode, OS LaFusée, La Guilde)

## Stack

- Next.js 15 · React 19 · TypeScript strict + `noUncheckedIndexedAccess`
- CSS Modules (scoped sous `.folioRoot`)
- Polices via `next/font/google` : Instrument Serif, Space Grotesk, JetBrains Mono, Fraunces (UPgraders)
- Aucune dépendance externe au-delà de Next/React

## Dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # strict TS check
```

## Structure

```
src/
  app/
    layout.tsx                 # root layout (fonts + globals)
    page.tsx                   # /
    cv/page.tsx                # /cv
    work/page.tsx              # /work
    upgraders/                 # /upgraders + Fraunces font scope
      layout.tsx
      page.tsx
      Terminal.tsx             # client island (terminal animation)
  components/folio/            # 22 components (Hero, Method, Practices, …)
    data/                      # 6 data modules (practices, agencies, method, …)
  styles/
    globals.css                # minimal reset
    home.module.css            # main page styles
    cv.module.css
    work.module.css
    upgraders.module.css
public/                        # portrait, logos, agency assets
```

Server components by default ; les sections interactives (StarField, Method picker, agency tooltips, terminal) sont des `'use client'` islands.
