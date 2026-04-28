import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--folio-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--folio-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UPgraders — Cabinet de conseil & stratégie · La passion pour propulseur',
  description:
    "UPgraders, page dédiée : conciergerie de l'industrie créative en Afrique de l'Ouest et Centrale. Méthode ADVE/RTIS, OS LaFusée, La Guilde.",
};

export default function UpgradersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${inter.variable}`} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
