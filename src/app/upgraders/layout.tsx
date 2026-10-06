import type { Metadata } from 'next';
import localFont from 'next/font/local';

const fraunces = localFont({
  src: [
    { path: '../../../public/fonts/fraunces-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../../../public/fonts/fraunces-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/fraunces-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../../../public/fonts/fraunces-latin-300-italic.woff2', weight: '300', style: 'italic' },
    { path: '../../../public/fonts/fraunces-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../../../public/fonts/fraunces-latin-600-italic.woff2', weight: '600', style: 'italic' },
  ], variable: '--folio-fraunces', display: 'swap',
});
const inter = localFont({
  src: [
    { path: '../../../public/fonts/inter-latin-400-normal.woff2', weight: '400' },
    { path: '../../../public/fonts/inter-latin-500-normal.woff2', weight: '500' },
    { path: '../../../public/fonts/inter-latin-600-normal.woff2', weight: '600' },
  ], variable: '--folio-grotesk', display: 'swap',
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
