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

export const metadata: Metadata = {
  title: 'Xtincell — Alexandre Djengue · Brand Architect',
  description:
    "Portfolio d'Alexandre « Xtincell » Djengue : Brand Architect, Storytelling Consultant, Toolsmith. Méthode ADVE/RTIS, OS LaFusée, agence UPgraders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
