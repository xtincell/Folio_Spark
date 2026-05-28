import type { Metadata } from 'next';
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--folio-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--folio-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--folio-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xtincell.com';
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
    icon: '/logo-spark.png',
    shortcut: '/logo-spark.png',
    apple: '/logo-spark-white.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'Xtincell · Alexandre Djengue',
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [{ url: '/logo-banner.png', alt: 'Xtincell — Alexandre Djengue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
    creator: '@xtincell',
    images: ['/logo-banner.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
