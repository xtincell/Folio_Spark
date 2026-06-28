import styles from '@/styles/home.module.css';
import { Nav } from '@/components/folio/Nav';
import { Hero } from '@/components/folio/Hero';
import { EditoPic } from '@/components/folio/EditoPic';
import { Manifesto } from '@/components/folio/Manifesto';
import { HatsIntro } from '@/components/folio/HatsIntro';
import { Method } from '@/components/folio/Method';
import { Upgraders } from '@/components/folio/Upgraders';
import { Practices } from '@/components/folio/Practices';
import { Stats } from '@/components/folio/Stats';
import { System } from '@/components/folio/System';
import { Press } from '@/components/folio/Press';
import { Contact } from '@/components/folio/Contact';
import { Reveal } from '@/components/folio/Reveal';
import { PersonJsonLd } from '@/components/folio/PersonJsonLd';

export const metadata = {
  alternates: { canonical: '/' },
};

export default function FolioPage() {
  return (
    <div className={styles.folioRoot}>
      <PersonJsonLd />
      <Nav />
      <main id="contenu">
        <Hero />
        <EditoPic n={1} />
        <Reveal><Manifesto /></Reveal>
        <EditoPic n={2} />
        <Reveal><HatsIntro /></Reveal>
        <Reveal><Method /></Reveal>
        <Reveal><Upgraders /></Reveal>
        <Reveal><Practices /></Reveal>
        <EditoPic n={3} />
        <Reveal><Stats /></Reveal>
        <Reveal><System /></Reveal>
        <Reveal><Press /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
    </div>
  );
}
