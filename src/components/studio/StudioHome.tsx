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
  const [noteIndex, setNoteIndex] = useState(0);
  const notes = [
    {
      label: L("Le jeu", "Play"),
      title: L(
        "Au départ, je voulais faire un jeu.",
        "It started with a game.",
      ),
      body: L(
        "Il y a presque vingt ans, je voulais créer un jeu avec un ami. Il fallait coder, dessiner, composer, écrire. Alors j’ai commencé à apprendre. Le jeu reste un fil dans ce que je fais : essayer, comprendre les règles, voir ce qu’on peut inventer avec.",
        "Almost twenty years ago, I wanted to make a game with a friend. We needed code, drawings, music and writing. So I started learning. Play still runs through what I do: trying things, understanding the rules and seeing what we can invent with them.",
      ),
      aside: L(
        "Une idée de jeu m’a donné beaucoup de choses à apprendre.",
        "One game idea gave me a lot to learn.",
      ),
    },
    {
      label: L("Le joker", "Behind the scenes"),
      title: L(
        "J’aime trouver la pièce qui manque.",
        "I like finding the missing piece.",
      ),
      body: L(
        "Parfois, c’est une idée ; parfois, une image, une question ou un outil. Je me reconnais dans Q, MacGyver, Géo Trouvetou : ceux qui équipent les autres. Le travail devient intéressant quand quelqu’un peut s’en saisir et avancer à son tour. C’est ce que j’aime dans le rôle du joker.",
        "Sometimes it’s an idea; sometimes an image, a question or a tool. I relate to Q, MacGyver and Gyro Gearloose: the people who equip others. The work becomes interesting when someone else can pick it up and move forward. That is the role I like to play.",
      ),
      aside: L(
        "L’étincelle, je l’ai reçue aussi. J’aimerais en transmettre.",
        "I received that spark from others, too. I’d like to pass it on.",
      ),
    },
    {
      label: L("Hors commande", "Off the clock"),
      title: L(
        "Tout ne finit pas en projet.",
        "Some things stay just for the joy of it.",
      ),
      body: L(
        "J’aime les jeux, les animés, la musique, les idées absurdes et cuisiner pour les autres. Je peux prendre une recette aussi au sérieux qu’une image. Il me faut cette place pour essayer quelque chose, rire, apprendre — sans qu’un livrable m’attende au bout.",
        "I enjoy games, anime, music, absurd ideas and cooking for other people. I can take a recipe as seriously as an image. I need room to try something, laugh and learn, with no deliverable waiting at the end.",
      ),
      aside: L(
        "Le porc au four ne figure pas dans les prestations.",
        "The roast pork is not on the services list.",
      ),
    },
  ] as const;
  const currentNote = notes[noteIndex] ?? notes[0];
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
                  "Directeur créatif · Photographe · Curieux",
                  "Creative director · Photographer · Curious",
                )}
              </p>
              <h1>
                {L("Parce qu’il", "Because")}
                <br />
                {L("y a toujours", "there’s always")}
                <br />
                <em>{L("un moyen.", "a way.")}</em>
              </h1>
              <div className={s.introduction}>
                <p>
                  {L(
                    "J’aime comprendre ce qui bloque, trouver une direction et fabriquer, avec d’autres, de quoi avancer. Une image, une idée, ou parfois l’outil qui manque.",
                    "I like understanding what stands in the way, finding a direction and working with others to make the next step possible. An image, an idea, or sometimes the missing tool.",
                  )}
                </p>
                <a href="#regard" className={s.primary}>
                  {L("Suivre le fil", "Follow the story")}
                  <Arrow />
                </a>
                <Link href="/work" className={s.secondary}>
                  {L("Voir les projets", "View projects")} <Arrow diagonal />
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
                    "Un regard. Et l’envie d’être utile.",
                    "An eye for things. A wish to be useful.",
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
              "Comprendre ce qui se joue. Choisir une direction. Donner de quoi avancer.",
              "Understand what matters. Find a direction. Make the next step possible.",
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
                  {L("Fabriquer ce", "Build what")}
                  <br />
                  <em>{L("qui manque.", "is missing.")}</em>
                </h2>
              </div>
            </div>
            <p className={s.chapterIntro}>
              {L(
                "Je viens des télécoms et des réseaux. Quand un problème revient dans le travail, j’ai envie de comprendre ce qui le crée. Parfois, la réponse est un outil. Sa place se vérifie ensuite dans l’usage.",
                "My background is in telecommunications and networks. When a problem keeps coming up at work, I want to understand what causes it. Sometimes, a tool is the answer. Its place in the work still has to be tested through use.",
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
                <details className={s.scope}>
                  <summary>
                    {L("Un choix de conception", "One design decision")}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>
                    {L(
                      "Examiner une création et suivre les engagements sont deux activités différentes. La refonte les sépare. La revue rassemble la pièce, sa version, son responsable et le brief ; les retours client restent attachés aux livrables concernés.",
                      "Reviewing creative work and tracking commitments are different activities. The redesign separates them. The review brings together the asset, its version, owner and brief; client feedback stays attached to the relevant deliverables.",
                    )}
                  </p>
                </details>
                <Link className={s.textLink} href="/work/la-barre">
                  {L("Entrer dans la fabrication", "Inside the making")}
                  <Arrow diagonal />
                </Link>
              </article>
            </div>
            <Link href="/tech" className={s.allTools}>
              {L(
                "Outils, prototypes et expériences",
                "Tools, prototypes and experiments",
              )}
              <Arrow diagonal />
            </Link>
          </section>
        </div>
      </div>

      <section
        className={s.notebook}
        id="carnet"
        lang={lang}
        aria-labelledby="carnet-title"
      >
        <div className={s.notebookIndex}>
          <span className={s.overline}>
            {L("Quelques notes personnelles", "A few personal notes")}
          </span>
          <h2 id="carnet-title">
            {L("Ce qui me met", "What sets me")}
            <br />
            <em>{L("en mouvement.", "in motion.")}</em>
          </h2>
          <div
            className={s.noteChoices}
            aria-label={L("Choisir une note", "Choose a note")}
          >
            {notes.map((note, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={noteIndex === i}
                aria-controls="personal-note"
                onClick={() => setNoteIndex(i)}
              >
                <span>0{i + 1}</span>
                {note.label}
                <Arrow />
              </button>
            ))}
          </div>
        </div>
        <div
          id="personal-note"
          className={s.notePage}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={s.noteNumber} aria-hidden="true">
            0{noteIndex + 1}
          </span>
          <h3>{currentNote.title}</h3>
          <p>{currentNote.body}</p>
          <p className={s.noteAside}>{currentNote.aside}</p>
          <span className={s.noteSignature}>
            Alexandre « Xtincell » Djengue
          </span>
        </div>
      </section>

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
              "Je veux rester assez proche de la fabrication pour comprendre ce que je demande aux autres. Donner une direction, rendre mes choix compréhensibles et laisser à chacun la place de faire son métier. Ma polyvalence m’aide à relier les pièces ; le travail se construit à plusieurs.",
              "I want to stay close enough to the making to understand what I ask of other people. Set a direction, make my choices clear and give people room to practise their craft. My range helps me connect the pieces; the work is built together.",
            )}
          </p>
          <p className={s.nextSignature}>
            {L(
              "Choisir les engagements que je peux tenir. Garder de la place pour créer, apprendre et vivre.",
              "Choose commitments I can keep. Leave room to create, learn and live.",
            )}
          </p>
          <Link href="/tarifs">
            {L("Travailler ensemble", "Working together")}
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
