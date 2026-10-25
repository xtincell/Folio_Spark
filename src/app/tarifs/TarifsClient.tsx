'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StudioShell, Arrow } from '@/components/studio/Studio';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang } from '@/lib/i18n';
import s from '@/styles/collaborations.module.css';

type Brief = { challenge: string; existing: string; team: string; timing: string };
const emptyBrief: Brief = { challenge: '', existing: '', team: '', timing: '' };

export function TarifsClient() {
  const { lang } = useLang();
  const L = (fr: string, en: string) => (lang === 'fr' ? fr : en);
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [prepared, setPrepared] = useState(false);
  const [invalidChallenge, setInvalidChallenge] = useState(false);
  const challengeRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prepared) previewRef.current?.focus();
  }, [prepared]);

  const interventions = [
    {
      number: '01',
      title: L('Éclaircir une direction.', 'Clarify a direction.'),
      situation: L('Un projet à préciser. Une décision à prendre.', 'A project to define. A decision to make.'),
      body: L(
        'Mettre à plat le problème, les usages et les contraintes. Examiner ce qui existe, puis formuler les choix qui permettront au projet d’avancer.',
        'Make the problem, uses and constraints explicit. Examine what already exists, then frame the choices that will move the project forward.',
      ),
      link: '/work/la-barre',
      linkLabel: L('La Barre — partir d’un besoin métier', 'La Barre — starting with a working need'),
      image: '/studio/la-barre.svg',
      alt: L('Schéma conceptuel de La Barre, outil de direction créative', 'Conceptual diagram of La Barre, a creative direction tool'),
      diagram: true,
    },
    {
      number: '02',
      title: L('Diriger une création.', 'Direct the creative work.'),
      situation: L('Une intention à faire vivre dans les images.', 'An intention to carry through the images.'),
      body: L(
        'Définir une direction artistique et la tenir à travers les formats. Développer les pistes, orienter la fabrication et examiner les livrables avec les personnes qui les produisent.',
        'Set an art direction and carry it across formats. Develop concepts, guide production and review the work with the people making it.',
      ),
      link: '/work/friesland-campina',
      linkLabel: L('Peak & Bonnet Rouge — avec MATANGA', 'Peak & Bonnet Rouge — with MATANGA'),
      image: '/work/cases/friesland-campina/02.webp',
      alt: L('Création Bonnet Rouge réalisée avec MATANGA Agency', 'Bonnet Rouge artwork created with MATANGA Agency'),
      diagram: false,
    },
    {
      number: '03',
      title: L('Accompagner une équipe.', 'Work alongside a team.'),
      situation: L('Un chantier à conduire. Des choix à partager.', 'Work to steer. Choices to share.'),
      body: L(
        'Apporter un regard de direction à un projet ou à une équipe : clarifier les briefs, rendre les retours utiles et expliciter les arbitrages. Le rôle de chacun et les relais font partie du cadrage.',
        'Bring a creative director’s perspective to a project or team: clarify briefs, make feedback useful and explain decisions. Roles and handovers are part of the scope we define.',
      ),
      link: '/work/kof-festival',
      linkLabel: L('KOF — photographie & direction artistique', 'KOF — photography & art direction'),
      image: '/work/galerie-pixieset/01-kof-festival-2024.jpg',
      alt: L('Reportage photographique au Kamer Otaku Festival', 'Documentary photography at Kamer Otaku Festival'),
      diagram: false,
    },
  ];

  const agreement = [
    [L('L’enjeu', 'The challenge'), L('Ce qui doit changer, et pour qui.', 'What needs to change, and for whom.')],
    [L('Le périmètre', 'The scope'), L('Les décisions, les livrables et les limites de l’intervention.', 'The decisions, deliverables and limits of the engagement.')],
    [L('Les moyens', 'The resources'), L('L’équipe, les éléments disponibles et le budget.', 'The team, available materials and budget.')],
    [L('Le calendrier', 'The timing'), L('Les échéances, les validations et les disponibilités de chacun.', 'Deadlines, approvals and everyone’s availability.')],
  ];

  const draft = [
    L('Bonjour Alexandre,', 'Hello Alexandre,'),
    L('Je souhaite discuter d’une collaboration. Voici mon point de départ :', 'I would like to discuss a collaboration. Here is my starting point:'),
    `${L('Enjeu', 'Challenge')}\n${brief.challenge.trim()}`,
    ...(brief.existing.trim() ? [`${L('Ce qui existe déjà', 'What already exists')}\n${brief.existing.trim()}`] : []),
    ...(brief.team.trim() ? [`${L('Équipe', 'Team')}\n${brief.team.trim()}`] : []),
    ...(brief.timing.trim() ? [`${L('Échéance', 'Timing')}\n${brief.timing.trim()}`] : []),
  ].join('\n\n');
  const whatsappDraft = `${CONTACT.whatsappLink}?text=${encodeURIComponent(draft)}`;
  const emailDraft = `mailto:${CONTACT.email}?subject=${encodeURIComponent(L('Discuter d’une collaboration', 'Discuss a collaboration'))}&body=${encodeURIComponent(draft)}`;

  function update(field: keyof Brief, value: string) {
    setBrief((current) => ({ ...current, [field]: value }));
    setPrepared(false);
    if (field === 'challenge') setInvalidChallenge(false);
  }

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (brief.challenge.trim().length < 10) {
      setInvalidChallenge(true);
      challengeRef.current?.focus();
      return;
    }
    setInvalidChallenge(false);
    setPrepared(true);
  }

  return (
    <StudioShell>
      <div className={s.page} lang={lang}>
        <header className={s.hero}>
          <div className={s.heroMeta}>
            <span>{L('Collaborations', 'Collaborations')}</span>
            <span>Alexandre Djengue · Xtincell</span>
          </div>
          <div className={s.heroGrid}>
            <h1>{L('Travailler', 'Working')}<br /><em>{L('ensemble.', 'together.')}</em></h1>
            <div className={s.heroIntro}>
              <p>{L('Vous avez un projet, une équipe ou une direction à éclaircir. Commençons par ce qui doit changer et ce qui existe déjà.', 'You have a project, a team or a direction to clarify. Let’s start with what needs to change and what already exists.')}</p>
              <a href="#point-de-depart" className={s.primary}>{L('Poser le point de départ', 'Share a starting point')}<Arrow /></a>
              <span className={s.smallNote}>{L('Le cadre se définit avant la production.', 'The scope comes before production.')}</span>
            </div>
          </div>
        </header>

        <section className={s.interventions} aria-labelledby="interventions-heading">
          <div className={s.sectionTop}>
            <h2 id="interventions-heading">{L('Là où je peux intervenir.', 'Where I can contribute.')}</h2>
            <p>{L('Trois points d’entrée, à adapter au projet.', 'Three starting points, shaped around the project.')}</p>
          </div>
          {interventions.map((item) => (
            <article key={item.number} className={s.intervention}>
              <span className={s.number}>{item.number}</span>
              <div className={s.interventionCopy}>
                <h3>{item.title}</h3>
                <p className={s.situation}>{item.situation}</p>
                <p className={s.body}>{item.body}</p>
                <Link href={item.link} className={s.caseLink}>{item.linkLabel}<Arrow diagonal /></Link>
              </div>
              <Link href={item.link} className={`${s.caseImage} ${item.diagram ? s.diagram : ''}`} aria-label={item.linkLabel}>
                <Image src={item.image} alt={item.alt} width={800} height={600} sizes="(max-width: 700px) 92vw, 28vw" />
                <span aria-hidden="true"><Arrow diagonal /></span>
              </Link>
            </article>
          ))}
        </section>

        <section className={s.agreement} aria-labelledby="agreement-heading">
          <div className={s.agreementLead}>
            <span className={s.eyebrow}>{L('Avant de commencer', 'Before we begin')}</span>
            <h2 id="agreement-heading">{L('Se mettre d’accord', 'Agree on')}<br /><em>{L('sur le travail.', 'the work.')}</em></h2>
            <p>{L('Un premier échange sert à comprendre la situation et à voir si mon intervention est pertinente.', 'An initial conversation helps us understand the situation and whether my involvement makes sense.')}</p>
          </div>
          <div className={s.agreementDetails}>
            <dl>{agreement.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
            <p className={s.agreementClose}>{L('Le rôle, le budget et les dates sont confirmés dans une proposition adaptée, selon le périmètre, les moyens et mes disponibilités.', 'The role, budget and dates are confirmed in a tailored proposal, based on the scope, resources and my availability.')}</p>
          </div>
        </section>

        <section className={s.briefSection} id="point-de-depart" aria-labelledby="brief-heading">
          <div className={s.briefIntro}>
            <span className={s.eyebrow}>{L('Votre point de départ', 'Your starting point')}</span>
            <h2 id="brief-heading">{L('Ce que vous avez', 'What you have')}<br /><em>{L('en tête.', 'in mind.')}</em></h2>
            <p>{L('Quelques lignes suffisent pour ouvrir la discussion. Vous pourrez relire le message avant de l’ouvrir dans WhatsApp ou votre messagerie.', 'A few lines are enough to start a conversation. You can review the message before opening it in WhatsApp or your email app.')}</p>
            <div className={s.directContact}>
              <span>{L('Vous préférez écrire directement ?', 'Prefer to write directly?')}</span>
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">WhatsApp <Arrow diagonal /></a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}<Arrow diagonal /></a>
            </div>
          </div>
          <div className={s.briefBody}>
            <form onSubmit={prepare}>
              <div className={s.field}>
                <label htmlFor="brief-challenge">{L('01 / Quel est l’enjeu ?', '01 / What is the challenge?')} <span>{L('requis', 'required')}</span></label>
                <p id="challenge-hint">{L('Le problème à résoudre, le public concerné ou la décision à prendre.', 'The problem to solve, the people concerned or the decision to make.')}</p>
                <textarea ref={challengeRef} id="brief-challenge" name="challenge" value={brief.challenge} onChange={(event) => update('challenge', event.target.value)} rows={4} required minLength={10} maxLength={900} aria-invalid={invalidChallenge || undefined} aria-describedby={`challenge-hint${invalidChallenge ? ' challenge-error' : ''}`} />
                {invalidChallenge && <p className={s.error} id="challenge-error" role="alert">{L('Précisez l’enjeu en quelques mots (10 caractères minimum).', 'Describe the challenge in a few words (at least 10 characters).')}</p>}
              </div>
              <div className={s.field}>
                <label htmlFor="brief-existing">{L('02 / Qu’est-ce qui existe déjà ?', '02 / What already exists?')} <span>{L('facultatif', 'optional')}</span></label>
                <p id="existing-hint">{L('Une marque, un brief, des contenus, un produit ou un lien à consulter.', 'A brand, a brief, content, a product or a link to look at.')}</p>
                <textarea id="brief-existing" name="existing" value={brief.existing} onChange={(event) => update('existing', event.target.value)} rows={3} maxLength={700} aria-describedby="existing-hint" />
              </div>
              <div className={s.fieldPair}>
                <div className={s.field}>
                  <label htmlFor="brief-team">{L('03 / Avec qui ?', '03 / With whom?')} <span>{L('facultatif', 'optional')}</span></label>
                  <p id="team-hint">{L('Votre équipe et les personnes impliquées.', 'Your team and the people involved.')}</p>
                  <textarea id="brief-team" name="team" value={brief.team} onChange={(event) => update('team', event.target.value)} rows={3} maxLength={500} aria-describedby="team-hint" />
                </div>
                <div className={s.field}>
                  <label htmlFor="brief-timing">{L('04 / À quel horizon ?', '04 / What timing?')} <span>{L('facultatif', 'optional')}</span></label>
                  <p id="timing-hint">{L('Une échéance, une contrainte ou un calendrier ouvert.', 'A deadline, a constraint or an open schedule.')}</p>
                  <textarea id="brief-timing" name="timing" value={brief.timing} onChange={(event) => update('timing', event.target.value)} rows={3} maxLength={350} aria-describedby="timing-hint" />
                </div>
              </div>
              <button type="submit" className={s.primary}>{L('Préparer le message', 'Prepare the message')}<Arrow /></button>
              <p className={s.formNote}>{L('Cette étape prépare un brouillon. Elle n’envoie rien et ne réserve pas de créneau.', 'This step prepares a draft. It sends nothing and does not book a slot.')}</p>
            </form>
            {prepared && <div ref={previewRef} tabIndex={-1} className={s.preview} role="region" aria-labelledby="draft-heading">
              <p className={s.eyebrow} role="status">{L('Le brouillon est prêt', 'Your draft is ready')}</p>
              <h3 id="draft-heading">{L('Relisez, puis ouvrez le message.', 'Review it, then open your message.')}</h3>
              <pre>{draft}</pre>
              <div className={s.draftActions}>
                <a href={whatsappDraft} className={s.primary} target="_blank" rel="noreferrer">{L('Ouvrir WhatsApp', 'Open WhatsApp')}<Arrow diagonal /></a>
                <a href={emailDraft} className={s.emailLink}>{L('Ouvrir un email', 'Open an email')}<Arrow diagonal /></a>
              </div>
              <p className={s.formNote}>{L('Vous gardez la main sur l’envoi dans l’application choisie. Pour modifier le brouillon, ajustez les champs ci-dessus.', 'You decide when to send it in your chosen app. To edit the draft, update the fields above.')}</p>
            </div>}
          </div>
        </section>
      </div>
    </StudioShell>
  );
}
