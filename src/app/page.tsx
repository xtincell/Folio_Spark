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
import { Contact } from '@/components/folio/Contact';
import { Reveal } from '@/components/folio/Reveal';

export default function FolioPage() {
  return (
    <div className={styles.folioRoot}>
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
        <Reveal><Contact /></Reveal>
      </main>
    </div>
  );
}
