import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { CommandPalette } from '@/components/folio/CommandPalette';
import { PageTransition } from '@/components/folio/PageTransition';
import { LanguageProvider } from '@/lib/i18n';
import { SkipLink } from '@/components/folio/SkipLink';
import { SiteJsonLd } from '@/components/folio/SiteJsonLd';

const instrumentSerif = localFont({
  src: [
    { path: '../../public/fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ], variable: '--folio-serif', display: 'swap',
});
const spaceGrotesk = localFont({
  src: [
    { path: '../../public/fonts/space-grotesk-latin-300-normal.woff2', weight: '300' },
    { path: '../../public/fonts/space-grotesk-latin-400-normal.woff2', weight: '400' },
    { path: '../../public/fonts/space-grotesk-latin-500-normal.woff2', weight: '500' },
    { path: '../../public/fonts/space-grotesk-latin-600-normal.woff2', weight: '600' },
    { path: '../../public/fonts/space-grotesk-latin-700-normal.woff2', weight: '700' },
  ], variable: '--folio-grotesk', display: 'swap',
});
const jetbrainsMono = localFont({
  src: [
    { path: '../../public/fonts/jetbrains-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../../public/fonts/jetbrains-mono-latin-500-normal.woff2', weight: '500' },
  ], variable: '--folio-mono', display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xtincell.powerupgraders.com';
const SITE_TITLE = 'Xtincell — Alexandre Djengue · Brand Architect';
const SITE_DESC =
  "Portfolio d'Alexandre « Xtincell » Djengue : Brand Architect, Storytelling Consultant, Toolsmith. Méthode ADVE/RTIS, OS LaFusée, agence UPgraders.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  applicationName: 'Xtincell Folio',
  authors: [{ name: 'Alexandre Djengue' }],
  creator: 'Alexandre « Xtincell » Djengue',
  icons: {
    // Symbole seul sur carré sombre — lisible en onglet clair comme sombre.
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-96.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'Xtincell · Alexandre Djengue',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: '/portrait.jpg', width: 610, height: 762, alt: 'Alexandre Djengue — Xtincell' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    creator: '@xtincell',
    images: ['/portrait.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SiteJsonLd />
        <LanguageProvider>
          <SkipLink />
          <PageTransition>{children}</PageTransition>
          <CommandPalette />
        </LanguageProvider>
      </body>
    </html>
  );
}
