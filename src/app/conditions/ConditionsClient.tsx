'use client';

import Link from 'next/link';
import styles from '@/styles/conditions.module.css';
import { FolioTopbar } from '@/components/folio/FolioTopbar';
import { FlameMark } from '@/components/folio/FlameMark';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang, pick, type Bi } from '@/lib/i18n';

/* ============================================================================
   Conditions & modalités — pragmatic terms for freelance / studio engagements.
   ----------------------------------------------------------------------------
   NOTE (à compléter) : ceci n'est pas un avis juridique. Les mentions légales
   formelles (raison sociale, RCCM/SIRET, TVA, adresse) sont à renseigner dans
   le bloc LEGAL ci-dessous quand l'entité sera arrêtée.
   ========================================================================== */

type Clause = { h: Bi; body: Bi[] };

const INTRO: Bi = {
  fr: 'Ces conditions encadrent les prestations de conseil, de direction artistique et de production fournies par Alexandre « Xtincell » Djengue. Elles complètent — sans le remplacer — le devis signé pour chaque mission, qui prévaut en cas de divergence.',
  en: 'These terms govern the consulting, art direction and production services provided by Alexandre “Xtincell” Djengue. They complement — without replacing — the signed quote for each engagement, which prevails in case of discrepancy.',
};

const CLAUSES: Clause[] = [
  {
    h: { fr: '1 · Devis & commande', en: '1 · Quote & order' },
    body: [
      {
        fr: 'Chaque mission démarre par un devis ferme, détaillant le périmètre, les livrables, le calendrier et le prix. La commande est réputée passée à la signature du devis et au versement de l’acompte.',
        en: 'Every engagement starts with a firm quote detailing scope, deliverables, schedule and price. The order is deemed placed upon signing the quote and paying the deposit.',
      },
      {
        fr: 'Toute demande sortant du périmètre validé fait l’objet d’un avenant chiffré avant exécution.',
        en: 'Any request outside the validated scope is subject to a priced amendment before execution.',
      },
    ],
  },
  {
    h: { fr: '2 · Prix & devises', en: '2 · Prices & currencies' },
    body: [
      {
        fr: 'Les prix affichés sur la page Tarifs sont des points de départ hors taxes, en euro (€) et en FCFA (parité fixe 1 € = 655,957 FCFA). Le devis fixe le prix définitif et la devise de facturation.',
        en: 'Prices shown on the Pricing page are starting points, before tax, in euro (€) and FCFA (fixed peg €1 = 655.957 FCFA). The quote sets the final price and billing currency.',
      },
    ],
  },
  {
    h: { fr: '3 · Paiement & paiement en plusieurs fois', en: '3 · Payment & installments' },
    body: [
      {
        fr: 'Un acompte réserve le créneau et lance la mission ; le solde est dû à la livraison. Sur les forfaits one-shot, le règlement peut être échelonné jusqu’à 3× sans frais, réparti sur les jalons du projet (par défaut 40 % au lancement, 30 % au jalon intermédiaire, 30 % à la livraison). Les gros périmètres font l’objet d’un échéancier dédié.',
        en: 'A deposit books the slot and kicks off the engagement; the balance is due on delivery. On one-shot packages, payment may be spread up to 3× with no fees, split across project milestones (by default 40% at launch, 30% at the mid-milestone, 30% on delivery). Larger scopes get a dedicated schedule.',
      },
      {
        fr: 'Moyens acceptés : Mobile Money (MTN MoMo, Orange Money, Wave), virement bancaire local (FCFA) ou SEPA (€), Wise / PayPal pour l’international, espèces en main propre. Les retainers sont facturés mensuellement, en début de mois.',
        en: 'Accepted methods: Mobile Money (MTN MoMo, Orange Money, Wave), local bank transfer (FCFA) or SEPA (€), Wise / PayPal for international, cash in person. Retainers are billed monthly, at the start of the month.',
      },
      {
        fr: 'En cas de paiement échelonné, les livrables finaux (fichiers sources, mise en ligne) sont remis une fois le solde réglé.',
        en: 'For installment payments, final deliverables (source files, go-live) are handed over once the balance is settled.',
      },
    ],
  },
  {
    h: { fr: '4 · Délais & révisions', en: '4 · Timelines & revisions' },
    body: [
      {
        fr: 'Les délais courent à compter de la réception de l’acompte et des éléments nécessaires (brief, contenus, accès). Chaque forfait inclut un nombre d’allers-retours précisé au devis (généralement 1 à 3), portant sur la direction validée au cadrage. Les révisions supplémentaires sont facturées en sus.',
        en: 'Timelines start upon receipt of the deposit and the necessary inputs (brief, content, access). Each package includes a number of revision rounds stated in the quote (usually 1 to 3), on the direction validated at scoping. Additional revisions are billed separately.',
      },
    ],
  },
  {
    h: { fr: '5 · Propriété intellectuelle & cession', en: '5 · Intellectual property & assignment' },
    body: [
      {
        fr: 'Les droits d’exploitation des livrables validés sont cédés au client après paiement intégral. Tant que le solde n’est pas réglé, les créations restent la propriété de l’auteur. Sauf mention contraire au devis, les fichiers de travail intermédiaires et les méthodes propriétaires (ADVE/RTIS, OS LaFusée) ne sont pas cédés.',
        en: 'Exploitation rights to the approved deliverables are assigned to the client after full payment. Until the balance is settled, the works remain the author’s property. Unless stated otherwise in the quote, intermediate working files and proprietary methods (ADVE/RTIS, the LaFusée OS) are not assigned.',
      },
      {
        fr: 'Sauf demande de confidentialité, l’auteur se réserve le droit de présenter le travail livré dans son portfolio et ses supports de communication.',
        en: 'Unless confidentiality is requested, the author reserves the right to feature the delivered work in their portfolio and communication materials.',
      },
    ],
  },
  {
    h: { fr: '6 · Confidentialité', en: '6 · Confidentiality' },
    body: [
      {
        fr: 'Les informations sensibles échangées dans le cadre d’une mission restent confidentielles. Un accord de confidentialité (NDA) dédié peut être signé sur demande.',
        en: 'Sensitive information exchanged during an engagement remains confidential. A dedicated non-disclosure agreement (NDA) can be signed on request.',
      },
    ],
  },
  {
    h: { fr: '7 · Annulation', en: '7 · Cancellation' },
    body: [
      {
        fr: 'En cas d’annulation par le client après lancement, l’acompte reste acquis pour couvrir le travail déjà engagé, et les prestations réalisées au-delà sont dues au prorata. Pour les retainers, un préavis d’un mois s’applique.',
        en: 'If the client cancels after kickoff, the deposit is retained to cover work already committed, and any work performed beyond it is due pro rata. For retainers, a one-month notice applies.',
      },
    ],
  },
  {
    h: { fr: '8 · Remote & responsabilités', en: '8 · Remote & liability' },
    body: [
      {
        fr: 'Les missions sont réalisées principalement à distance (remote), entre l’Afrique de l’Ouest/Centrale et l’Europe. La responsabilité de l’auteur est limitée au montant de la prestation concernée. Le client garantit détenir les droits sur les éléments qu’il fournit (logos, textes, images).',
        en: 'Engagements are carried out mainly remotely, between West/Central Africa and Europe. The author’s liability is limited to the amount of the relevant service. The client warrants that they hold the rights to the materials they provide (logos, copy, images).',
      },
    ],
  },
  {
    h: { fr: '9 · Droit applicable & litiges', en: '9 · Governing law & disputes' },
    body: [
      {
        fr: 'À défaut d’accord amiable, tout litige sera porté devant la juridiction compétente du lieu d’établissement de l’auteur. Le droit applicable est précisé au devis selon le pays de facturation.',
        en: 'Failing an amicable settlement, any dispute will be brought before the competent court of the author’s place of establishment. The applicable law is specified in the quote depending on the billing country.',
      },
    ],
  },
];

const LEGAL: Bi = {
  fr: 'Mentions légales — Alexandre Djengue (« Xtincell »), prestataire indépendant. Coordonnées : ' +
    CONTACT.email +
    '. Les informations d’enregistrement (raison sociale, RCCM / numéro d’identifiant, TVA le cas échéant, adresse) seront précisées sur le devis et complétées ici prochainement.',
  en: 'Legal notice — Alexandre Djengue (“Xtincell”), independent contractor. Contact: ' +
    CONTACT.email +
    '. Registration details (legal name, business ID, VAT where applicable, address) are specified on the quote and will be completed here shortly.',
};

export function ConditionsClient() {
  const { lang } = useLang();
  const tr = (v: Bi): string => pick(v, lang);
  const fr = lang === 'fr';

  return (
    <div className={styles.folioRoot}>
      <FolioTopbar active="tarifs" label={fr ? 'CONDITIONS' : 'TERMS'} />

      <main id="contenu" className={styles.page}>
        <header className={styles.head}>
          <div className={styles.kicker}>{fr ? 'Conditions & modalités' : 'Terms & conditions'}</div>
          <h1 className={styles.h1}>
            {fr ? 'Les règles du jeu, ' : 'The rules of the game, '}
            <em>{fr ? 'noir sur blanc' : 'in black and white'}</em>.
          </h1>
          <p className={styles.intro}>{tr(INTRO)}</p>
          <p className={styles.updated}>
            {fr ? 'Dernière mise à jour : juin 2026' : 'Last updated: June 2026'} ·{' '}
            <Link href="/tarifs" className={styles.backLink}>
              {fr ? 'Retour aux tarifs' : 'Back to pricing'} →
            </Link>
          </p>
        </header>

        <div className={styles.clauses}>
          {CLAUSES.map((c) => (
            <section className={styles.clause} key={tr(c.h)}>
              <h2 className={styles.clauseH}>{tr(c.h)}</h2>
              {c.body.map((p, i) => (
                <p className={styles.clauseP} key={i}>
                  {tr(p)}
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className={styles.legal}>
          <FlameMark size={28} />
          <p>{tr(LEGAL)}</p>
          <a className={styles.legalCta} href={CONTACT.whatsappLink} target="_blank" rel="noreferrer">
            {fr ? 'Une question ? WhatsApp' : 'A question? WhatsApp'} →
          </a>
        </footer>
      </main>
    </div>
  );
}
