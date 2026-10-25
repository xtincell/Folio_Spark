"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang, pick } from "@/lib/i18n";
import { PRESS } from "@/components/folio/data/press";
import { StudioShell, Arrow } from "./Studio";
import { Showreel } from "./Showreel";
import { MastTitle } from "@/components/folio/MastTitle";
import s from "@/styles/portrait.module.css";

const chapterIds = ["regard", "direction", "fabrique"];

export function StudioHome() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [active, setActive] = useState("regard");
  useEffect(() => {
    const sections = chapterIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = Math.min(window.innerHeight * 0.4, 350);
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= line)
        .at(-1);
      setActive(current?.id ?? "regard");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const chapterLabels = [
    L("Le regard", "The eye"),
    L("La direction", "The direction"),
    L("La fabrique", "The making"),
  ];
  return (
    <StudioShell
      cover={
        <section className={s.cover} id="top" lang={lang}>
          <div className={s.edition}>
            <span>ALEXANDRE DJENGUE · DOUALA</span>
            <span>{L("PRATIQUE DEPUIS 2011", "IN PRACTICE SINCE 2011")}</span>
            <span>
              {L("FOLIO PERSONNEL / 2026", "PERSONAL PORTFOLIO / 2026")}
            </span>
          </div>
          <div className={s.wordmark}>
            <MastTitle />
          </div>
          <div className={s.coverBody}>
            <div className={s.coverText}>
              <p className={s.overline}>
                {L(
                  "Direction créative · Photographie · Outils",
                  "Creative direction · Photography · Tools",
                )}
              </p>
              <h1>
                {L("L’image.", "The image.")}
                <br />
                {L("Et tout ce qui", "And everything")}
                <br />
                <em>{L("la fait tenir.", "behind it.")}</em>
              </h1>
              <div className={s.introduction}>
                <p>
                  {L(
                    "Je conçois des images, dirige leur fabrication et construis les outils dont j’ai besoin pour aller au bout.",
                    "I make images, lead their production and build the tools I need to see the work through.",
                  )}
                </p>
                <a href="#regard" className={s.primary}>
                  {L("Suivre le fil", "Follow the story")}
                  <Arrow />
                </a>
                <Link href="/work" className={s.secondary}>
                  {L("Tous les projets", "All projects")} <Arrow diagonal />
                </Link>
              </div>
            </div>
            <figure className={s.portrait}>
              <Image
                src="/portrait-p2.jpg"
                alt="Alexandre Djengue — Xtincell"
                width={1333}
                height={2000}
                priority
                sizes="(max-width: 680px) 70vw, 30vw"
              />
              <figcaption>
                <span>
                  Alexandre <em>« Xtincell »</em> Djengue
                </span>
                <span>
                  {L(
                    "Créatif. Et curieux du reste.",
                    "Creative. Curious about the rest.",
                  )}
                </span>
              </figcaption>
              <span className={s.portraitRule} aria-hidden="true" />
            </figure>
            <div
              className={s.contactStrip}
              aria-label={L(
                "Trois pratiques, un parcours",
                "Three practices, one story",
              )}
            >
              <a href="#regard">
                <Image
                  src="/work/galerie-pixieset/03-lydol-portrait.jpg"
                  alt={L(
                    "Lydol sur scène, photographie par Xtincell",
                    "Lydol on stage, photographed by Xtincell",
                  )}
                  width={640}
                  height={399}
                  sizes="15vw"
                  priority
                />
                <span>
                  01 / {chapterLabels[0]} <Arrow />
                </span>
              </a>
              <a href="#direction">
                <Image
                  src="/work/cases/friesland-campina/02.webp"
                  alt={L(
                    "Création Bonnet Rouge avec MATANGA",
                    "Bonnet Rouge artwork with MATANGA",
                  )}
                  width={1600}
                  height={1200}
                  sizes="15vw"
                />
                <span>
                  02 / {chapterLabels[1]} <Arrow />
                </span>
              </a>
              <a href="#fabrique">
                <Image
                  src="/studio/la-barre.svg"
                  alt={L(
                    "La Barre, schéma conceptuel d’un outil de direction créative",
                    "La Barre, conceptual diagram of a creative direction tool",
                  )}
                  width={1600}
                  height={1000}
                  sizes="15vw"
                />
                <span>
                  03 / {chapterLabels[2]} <Arrow />
                </span>
              </a>
            </div>
          </div>
          <div className={s.coverBottom}>
            <span>
              {L(
                "Un parcours à travers les œuvres.",
                "A story told through the work.",
              )}
            </span>
            <a href="#showreel">
              {L("Ou commencer par le film", "Or start with the film")}{" "}
              <span>48 s ↗</span>
            </a>
          </div>
        </section>
      }
    >
      <div className={s.story} lang={lang}>
        <aside className={s.storyRail}>
          <span className={s.overline}>{L("Le fil", "The thread")}</span>
          <nav aria-label={L("Chapitres du parcours", "Portfolio chapters")}>
            {chapterIds.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
              >
                <span>0{i + 1}</span>
                {chapterLabels[i]}
                <Arrow />
              </a>
            ))}
          </nav>
          <p>
            {L(
              "Des métiers différents. Une même envie de comprendre et de faire.",
              "Different crafts. The same desire to understand and make.",
            )}
          </p>
        </aside>
        <div className={s.chapters}>
          <section className={s.chapter} id="regard">
            <div className={s.chapterHeading}>
              <span className={s.chapterNumber}>01</span>
              <div>
                <p className={s.overline}>
                  {L(
                    "Le regard / ce qui m’a formé",
                    "The eye / what shaped me",
                  )}
                </p>
                <h2>
                  {L("Avant de diriger,", "Before directing,")}
                  <br />
                  <em>{L("regarder.", "look.")}</em>
                </h2>
              </div>
            </div>
            <div className={s.photoPair}>
              <Link href="/galerie" className={s.livePhoto}>
                <Image
                  src="/work/galerie-pixieset/03-lydol-portrait.jpg"
                  alt={L(
                    "Lydol en concert, au micro, photographiée par Xtincell",
                    "Lydol performing on stage, photographed by Xtincell",
                  )}
                  width={640}
                  height={399}
                  sizes="(max-width: 680px) 92vw, 48vw"
                />
                <span>
                  {L(
                    "Lydol · Photographie de scène",
                    "Lydol · Stage photography",
                  )}
                  <Arrow diagonal />
                </span>
              </Link>
              <Link href="/work/kof-festival" className={s.kofPhoto}>
                <Image
                  src="/work/galerie-pixieset/01-kof-festival-2024.jpg"
                  alt={L(
                    "Participants du Kamer Otaku Festival, photographie de reportage par Xtincell",
                    "Kamer Otaku Festival attendees, documentary photograph by Xtincell",
                  )}
                  width={640}
                  height={427}
                  sizes="(max-width: 680px) 60vw, 22vw"
                />
                <span>
                  KOF · {L("Photographie", "Photography")}
                  <Arrow diagonal />
                </span>
              </Link>
            </div>
            <div className={s.projectStory}>
              <span className={s.overline}>
                {L("Le terrain change le regard.", "The field shapes the eye.")}
              </span>
              <div>
                <h3>
                  {L(
                    "D’abord photographe. Puis directeur artistique.",
                    "Photographer first. Art director next.",
                  )}
                </h3>
                <p>
                  {L(
                    "Au Kamer Otaku Festival, j’ai commencé comme photographe avant de prendre la direction artistique à partir de la deuxième édition. Un même terrain, deux responsabilités : regarder ce qui se passe, puis imaginer comment l’événement se présente.",
                    "At Kamer Otaku Festival, I started as a photographer before taking on art direction from the second edition. The same setting, two responsibilities: observing what happens, then shaping how the event presents itself.",
                  )}
                </p>
                <p className={s.credit}>
                  {L(
                    "Photographie & direction artistique · Avec UPgraders",
                    "Photography & art direction · With UPgraders",
                  )}
                </p>
                <Link className={s.textLink} href="/work/kof-festival">
                  {L("Voir le projet KOF", "Explore KOF")}
                  <Arrow diagonal />
                </Link>
              </div>
            </div>
            <div className={s.marginNote}>
              <span>↳</span>
              <p>
                {L(
                  "Et je photographie toujours. Les personnes, la scène, les instants qu’on ne peut pas recommencer.",
                  "And I still take photographs. People, performances, moments you cannot repeat.",
                )}{" "}
                <Link href="/galerie">
                  {L("Les collections", "The collections")} ↗
                </Link>
              </p>
            </div>
          </section>

          <section className={s.chapter} id="direction">
            <div className={s.chapterHeading}>
              <span className={s.chapterNumber}>02</span>
              <div>
                <p className={s.overline}>
                  {L(
                    "La direction / mon travail aujourd’hui",
                    "The direction / my work today",
                  )}
                </p>
                <h2>
                  {L("Faire tenir", "Hold the whole")}
                  <br />
                  <em>{L("l’ensemble.", "thing together.")}</em>
                </h2>
              </div>
            </div>
            <p className={s.chapterIntro}>
              {L(
                "Une idée, plusieurs formats, des personnes qui la fabriquent. Mon travail de direction consiste à garder une intention lisible à travers tout cela.",
                "One idea, several formats, people bringing it to life. My role in creative direction is to keep that intention clear throughout.",
              )}
            </p>
            <Link
              href="/work/friesland-campina"
              className={s.campaignBoard}
              aria-label={L(
                "Voir les campagnes Peak et Bonnet Rouge",
                "Explore the Peak and Bonnet Rouge campaigns",
              )}
            >
              <div className={s.boardHead}>
                <span>FRIESLANDCAMPINA</span>
                <span>
                  2025 — 2026 <Arrow diagonal />
                </span>
              </div>
              <div className={s.campaignImages}>
                <Image
                  src="/work/cases/friesland-campina/hero.webp"
                  alt={L(
                    "Visuel Peak Ramadan, du sahur à l’iftar",
                    "Peak Ramadan key visual, from sahur to iftar",
                  )}
                  width={2560}
                  height={1920}
                  sizes="(max-width: 680px) 92vw, 43vw"
                />
                <Image
                  src="/work/cases/friesland-campina/02.webp"
                  alt={L(
                    "Visuel Bonnet Rouge, Chez nous tout le monde aime le lait",
                    "Bonnet Rouge key visual, Chez nous tout le monde aime le lait",
                  )}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 680px) 92vw, 30vw"
                />
              </div>
              <div className={s.boardCaption}>
                <h3>Peak & Bonnet Rouge</h3>
                <span>
                  {L(
                    "Direction artistique · MATANGA Agency",
                    "Art direction · MATANGA Agency",
                  )}
                </span>
              </div>
            </Link>
            <div className={s.projectStory}>
              <span className={s.overline}>
                {L(
                  "Une marque. Plusieurs moments.",
                  "One brand. Different moments.",
                )}
              </span>
              <div>
                <p>
                  {L(
                    "Ramadan, Noël, sport : le contexte change et la marque doit rester reconnaissable. Chez MATANGA, je travaille à la direction artistique de ces campagnes, du visuel principal à ses déclinaisons.",
                    "Ramadan, Christmas, sport: the context changes, and the brand needs to remain recognisable. At MATANGA, I work on the art direction of these campaigns, from key visuals to their variations.",
                  )}
                </p>
                <details className={s.scope}>
                  <summary>
                    {L("Mon rôle dans ces images", "My role in these images")}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>
                    {L(
                      "Direction artistique des campagnes saisonnières Peak et Bonnet Rouge pour FrieslandCampina, au sein de MATANGA Agency. Le dossier présente les créations et leurs formats ; les mises en situation générées y sont identifiées.",
                      "Art direction for seasonal Peak and Bonnet Rouge campaigns for FrieslandCampina, within MATANGA Agency. The project presents the artwork and formats; generated presentations are identified.",
                    )}
                  </p>
                  <Link href="/work/friesland-campina">
                    {L(
                      "Ouvrir le dossier et les crédits",
                      "Open the project and credits",
                    )}{" "}
                    ↗
                  </Link>
                </details>
              </div>
            </div>
            <div className={s.motionNote}>
              <div>
                <span className={s.overline}>
                  {L(
                    "Un passage important / Motion19",
                    "A turning point / Motion19",
                  )}
                </span>
                <h3>
                  {L("La marque continue", "The brand continues")}
                  <br />
                  <em>{L("derrière l’image.", "behind the image.")}</em>
                </h3>
              </div>
              <div>
                <p>
                  {L(
                    "Chez Motion19, mon rôle de Brand Manager a touché au branding, au commerce en ligne, à l’équipe digitale et à la production de contenus. J’y ai appris à regarder la marque dans son fonctionnement quotidien.",
                    "As Brand Manager at Motion19, my role spanned branding, e-commerce, the digital team and content production. I learned to look at how a brand works day to day.",
                  )}
                </p>
                <Link href="/cv" className={s.textLink}>
                  {L(
                    "Le parcours et les responsabilités",
                    "Background and responsibilities",
                  )}
                  <Arrow diagonal />
                </Link>
                <Link href="/work/motion19-store" className={s.archiveLink}>
                  {L(
                    "Voir aussi : créations retail de 2025",
                    "Also: retail artwork from 2025",
                  )}{" "}
                  ↗
                </Link>
              </div>
            </div>
          </section>

          <section className={s.chapter} id="fabrique">
            <div className={s.chapterHeading}>
              <span className={s.chapterNumber}>03</span>
              <div>
                <p className={s.overline}>
                  {L(
                    "La fabrique / ce que je construis",
                    "The making / what I am building",
                  )}
                </p>
                <h2>
                  {L("L’idée appelle", "An idea calls for")}
                  <br />
                  <em>{L("son outil.", "its own tools.")}</em>
                </h2>
              </div>
            </div>
            <p className={s.chapterIntro}>
              {L(
                "Je viens des télécoms et des réseaux. Ce réflexe est resté : quand il manque un moyen de faire, j’ai envie de le construire. Aujourd’hui, le produit et le code prolongent mon travail créatif.",
                "My background is in telecommunications and networks. That instinct has stayed: when a way to do something is missing, I want to build it. Today, product design and code extend my creative practice.",
              )}
            </p>
            <div className={s.makingGrid}>
              <article className={s.makingProject}>
                <Link href="/work/spawt" className={s.makingImage}>
                  <Image
                    src="/work/cases/spawt/hero.webp"
                    alt={L(
                      "SPAWT, exploration visuelle La Traque",
                      "SPAWT, La Traque visual exploration",
                    )}
                    width={2048}
                    height={2048}
                    sizes="(max-width: 680px) 92vw, 35vw"
                  />
                  <span>
                    <Arrow diagonal />
                  </span>
                </Link>
                <div className={s.projectLabel}>
                  <h3>SPAWT</h3>
                  <span>{L("En construction", "In progress")}</span>
                </div>
                <p>
                  {L(
                    "Du goût, une marque, un produit. SPAWT réunit la nourriture, la création et la technologie autour d’une question : où manger à Abidjan ? J’y travaille sur l’identité, les contenus et le produit.",
                    "Food, a brand, a product. SPAWT brings food, design and technology together around one question: where should we eat in Abidjan? I work on its identity, content and product.",
                  )}
                </p>
                <p className={s.credit}>
                  {L(
                    "Explorations de marque · Les visuels présentés sont une étape du projet.",
                    "Brand explorations · The visuals shown represent one stage of the project.",
                  )}
                </p>
                <Link className={s.textLink} href="/work/spawt">
                  {L("Voir cette étape", "Explore this stage")}
                  <Arrow diagonal />
                </Link>
              </article>
              <article className={s.makingProject}>
                <Link
                  href="/work/la-barre"
                  className={`${s.makingImage} ${s.diagram}`}
                >
                  <Image
                    src="/studio/la-barre.svg"
                    alt={L(
                      "Schéma conceptuel de La Barre : du brief à la revue et à la livraison",
                      "Conceptual diagram of La Barre: from brief to review and delivery",
                    )}
                    width={1600}
                    height={1000}
                    sizes="(max-width: 680px) 92vw, 35vw"
                  />
                  <span>
                    <Arrow diagonal />
                  </span>
                </Link>
                <div className={s.projectLabel}>
                  <h3>La Barre</h3>
                  <span>Shinkiro / UPgraders</span>
                </div>
                <p>
                  {L(
                    "Un brief, plusieurs versions, des retours et une décision à prendre. La Barre part de ce quotidien de directeur créatif. Je conçois l’outil pour réunir les pièces du travail et rendre la revue plus lisible.",
                    "A brief, several versions, feedback and a decision to make. La Barre starts with the everyday reality of creative direction. I am building the tool to bring the work together and make reviews easier to follow.",
                  )}
                </p>
                <p className={s.credit}>
                  {L(
                    "Conception produit · UX/UI · Développement assisté par IA. Schéma conceptuel.",
                    "Product design · UX/UI · AI-assisted development. Conceptual diagram.",
                  )}
                </p>
                <Link className={s.textLink} href="/work/la-barre">
                  {L("Entrer dans la fabrication", "Inside the making")}
                  <Arrow diagonal />
                </Link>
              </article>
            </div>
            <Link href="/tech" className={s.allTools}>
              {L(
                "Les autres produits et expérimentations",
                "More products and experiments",
              )}
              <Arrow diagonal />
            </Link>
          </section>
        </div>
      </div>

      <section className={s.nextChapter} id="la-suite" lang={lang}>
        <span className={s.overline}>
          {L("Le prochain chapitre", "The next chapter")}
        </span>
        <div>
          <h2>
            {L("Diriger", "Lead,")}
            <br />
            <em>{L("sans perdre la main.", "and stay close to the craft.")}</em>
          </h2>
          <p>
            {L(
              "Je veux rester assez proche de la fabrication pour comprendre ce que je demande aux autres. Donner une direction, construire avec les bonnes personnes, et rendre mes choix assez clairs pour que le travail avance.",
              "I want to stay close enough to the making to understand what I ask of other people. Set a direction, work with the right people and make my choices clear enough for the work to move forward.",
            )}
          </p>
          <p className={s.nextSignature}>
            {L(
              "C’est vers cette façon d’exercer que je vais.",
              "That is the kind of practice I am building.",
            )}
          </p>
          <Link href="/cv">
            {L("Mon parcours complet", "My full background")}
            <Arrow diagonal />
          </Link>
        </div>
      </section>

      <section className={s.film} id="showreel" lang={lang}>
        <div className={s.filmHeading}>
          <span className={s.overline}>
            {L("Les pièces en mouvement", "The work in motion")}
          </span>
          <h2>
            {L("48 secondes", "48 seconds")}
            <br />
            <em>{L("dans mon univers.", "inside my world.")}</em>
          </h2>
          <p>
            {L(
              "Campagnes, images et systèmes. Le film rassemble quelques-unes des pièces de ce parcours.",
              "Campaigns, images and systems. The film brings together a few pieces from this practice.",
            )}
          </p>
        </div>
        <Showreel />
      </section>
      <section className={s.more} lang={lang}>
        <div>
          <span className={s.overline}>
            {L("Il reste à explorer", "More to explore")}
          </span>
          <Link href="/work" className={s.archiveTitle}>
            {L("Tout le travail.", "All the work.")}
            <Arrow diagonal />
          </Link>
          <p>
            {L(
              "Les projets, leurs contextes, leurs crédits. Et les archives qui racontent aussi le chemin.",
              "Projects, context, credits. And the archives that tell the rest of the story.",
            )}
          </p>
        </div>
        <div className={s.conversations} id="presse">
          <h2>
            {L("Publications & conversations", "Publications & conversations")}
          </h2>
          {PRESS.map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
              <span>
                {item.outlet} · {pick(item.date, lang)}
              </span>
              <strong>{pick(item.title, lang)}</strong>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </section>
    </StudioShell>
  );
}
