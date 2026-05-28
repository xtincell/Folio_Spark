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

export default function FolioPage() {
  return (
    <div className={styles.folioRoot}>
      <Nav />
      <main id="contenu">
        <Hero />
        <EditoPic n={1} />
        <Manifesto />
        <EditoPic n={2} />
        <HatsIntro />
        <Method />
        <Upgraders />
        <Practices />
        <EditoPic n={3} />
        <Stats />
        <System />
        <Contact />
      </main>
    </div>
  );
}
