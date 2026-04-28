import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

export function Upgraders() {
  return (
    <section id="upgraders" className={styles.upgraders}>
      <div className={styles.upgContainer}>
        <div className={styles.upgGrid}>
          <div>
            <div className={styles.upgTag}>Mon agence · fondée en 2017</div>
            <div className={styles.upgLogoWrap}>
              <Image
                src="/upgraders-logo-full.png"
                alt="UPgraders"
                width={320}
                height={120}
                className={styles.upgLogoImg}
              />
            </div>
            <p className={styles.upgTagline}>
              <em>La passion</em> pour propulseur.
            </p>
            <p className={styles.upgClaim}>
              Conciergerie de l&apos;industrie créative — <b>Afrique de l&apos;Ouest &amp; Centrale</b>.
            </p>
            <p className={styles.upgLede}>
              UPgraders n&apos;est pas une agence comme les autres : c&apos;est un cabinet de
              <b> conseil &amp; stratégie</b> qui orchestre un réseau de freelances et
              d&apos;agences partenaires (production, photo, illustration, dev). On apporte
              la vision et le système ; le réseau apporte les mains.
            </p>
            <Link href="/upgraders" className={styles.upgCta}>
              <span>Page dédiée UPgraders</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <div className={styles.upgPillars}>
              <div className={styles.upgPillar}>
                <div className={styles.upgPillarNum}>Méthode</div>
                <h3 className={styles.upgPillarName}>ADVE<em>/RTIS</em></h3>
                <p className={styles.upgPillarDesc}>
                  <b>Socle ADVE</b> : Authenticité · Distinction · Valeur · Engagement.
                  <br /><b>Propulseur RTIS</b> : Risk · Track · Innovation · Stratégie.
                  <br />IP UPgraders.
                </p>
              </div>
              <div className={styles.upgPillar}>
                <div className={styles.upgPillarNum}>OS interne</div>
                <h3 className={styles.upgPillarName}>La<em>Fusée</em></h3>
                <p className={styles.upgPillarDesc}>
                  Logiciel propriétaire qui automatise ADVE/RTIS pour piloter une industrie
                  créative — brief, arbitrage, livrable, roadmap dynamique.
                </p>
              </div>
              <div className={styles.upgPillar}>
                <div className={styles.upgPillarNum}>Réseau</div>
                <h3 className={styles.upgPillarName}>La <em>Guilde</em></h3>
                <p className={styles.upgPillarDesc}>
                  Le réseau UPgraders : freelances et agences partenaires. Stephane Nounamo (photographe),
                  Annick (illustratrice), Paulhan (photographe), Xtincell (photo/vidéo/design),
                  Friends Studio (production)… convocation à la mission.
                </p>
              </div>
              <div className={styles.upgPillar}>
                <div className={styles.upgPillarNum}>Posture</div>
                <h3 className={styles.upgPillarName}>Culte de <em>marque</em></h3>
                <p className={styles.upgPillarDesc}>
                  L&apos;IA booste la méthode — elle ne la remplace pas. La passion reste le propulseur.
                  On construit des marques que les gens veulent suivre, pas seulement consommer.
                </p>
              </div>
            </div>
            <div className={styles.upgFooter}>
              <span><b>#ToTheNextLevel</b></span>
              <span><b>#UPyourBrand</b></span>
              <span>upgraders.io</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
