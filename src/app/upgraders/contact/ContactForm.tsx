'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/upgraders.module.css';
import { CONTACT } from '@/components/folio/data/contact';
import { useLang, pick, type Bi } from '@/lib/i18n';

type FormState = {
  name: string;
  email: string;
  org: string;
  service: string;
  budget: string;
  message: string;
};

type Option = { value: string; label: Bi };

const SERVICE_OPTIONS: Option[] = [
  { value: 'audit', label: { fr: "Audit ADVE (porte d'entrée)", en: 'ADVE audit (entry door)' } },
  { value: 'rtis', label: { fr: 'Accompagnement RTIS (mandat long)', en: 'RTIS engagement (long mandate)' } },
  { value: 'whitelabel', label: { fr: 'Marque blanche / agence relais', en: 'White label / relay agency' } },
  { value: 'unsure', label: { fr: 'Pas encore sûr — on en discute', en: 'Not sure yet — let’s talk' } },
];

const BUDGET_OPTIONS: Option[] = [
  { value: '<5', label: { fr: '< 5 millions FCFA', en: '< 5 million FCFA' } },
  { value: '5-15', label: { fr: '5 à 15 millions FCFA', en: '5 to 15 million FCFA' } },
  { value: '15-50', label: { fr: '15 à 50 millions FCFA', en: '15 to 50 million FCFA' } },
  { value: '>50', label: { fr: '> 50 millions FCFA', en: '> 50 million FCFA' } },
  { value: 'undef', label: { fr: 'À définir avec vous', en: 'To be defined together' } },
];

const T = {
  name: { fr: 'Nom', en: 'Name' },
  namePh: { fr: 'Prénom Nom', en: 'First Last' },
  org: { fr: 'Organisation', en: 'Organisation' },
  orgPh: { fr: 'Marque, agence, structure', en: 'Brand, agency, structure' },
  email: { fr: 'Email', en: 'Email' },
  emailPh: { fr: 'vous@domaine.com', en: 'you@domain.com' },
  service: { fr: 'Service souhaité', en: 'Desired service' },
  budget: { fr: 'Enveloppe budgétaire', en: 'Budget envelope' },
  select: { fr: '— Sélectionner —', en: '— Select —' },
  brief: { fr: 'Brief — décrivez votre projet', en: 'Brief — describe your project' },
  briefPh: {
    fr: 'Contexte, problème, échéance, contraintes — soyez concret.',
    en: 'Context, problem, deadline, constraints — be concrete.',
  },
  sendMail: { fr: 'Ouvrir un email', en: 'Open an email' },
  sendWa: { fr: 'Ouvrir WhatsApp', en: 'Open WhatsApp' },
  missing: {
    fr: 'Indiquez au moins votre nom, votre email et un brief.',
    en: 'Please provide at least your name, email and a brief.',
  },
  consent: {
    fr: 'En envoyant ce formulaire, vous nous autorisez à vous recontacter sur les coordonnées fournies, uniquement à propos de votre demande. Pas de mailing list, pas de revente.',
    en: 'By sending this form you allow us to contact you back on the details provided, solely about your request. No mailing list, no resale.',
  },
} satisfies Record<string, Bi>;

export function ContactForm() {
  const { lang } = useLang();
  const t = (v: Bi) => pick(v, lang);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    org: '',
    service: '',
    budget: '',
    message: '',
  });
  const [error, setError] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  useEffect(() => { if (prepared) preview.current?.focus(); }, [prepared]);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
    if (error) setError(false);
    setPrepared(false);
  }

  function isComplete(): boolean {
    return Boolean(form.name.trim() && form.email.trim() && form.message.trim());
  }

  function serviceLabel(): string {
    const o = SERVICE_OPTIONS.find((s) => s.value === form.service);
    return o ? pick(o.label, lang) : '—';
  }

  function budgetLabel(): string {
    const o = BUDGET_OPTIONS.find((b) => b.value === form.budget);
    return o ? pick(o.label, lang) : '—';
  }

  function buildMailtoBody(): string {
    return [
      `Nom / Name : ${form.name}`,
      `Organisation : ${form.org}`,
      `Email : ${form.email}`,
      `Service : ${serviceLabel()}`,
      `Budget : ${budgetLabel()}`,
      '',
      'Brief :',
      form.message,
    ].join('\n');
  }

  function buildWaText(): string {
    return [
      lang === 'en' ? 'Hello UPgraders,' : 'Bonjour UPgraders,',
      ``,
      lang === 'en'
        ? `I am ${form.name}${form.org ? ` (${form.org})` : ''}.`
        : `Je suis ${form.name}${form.org ? ` (${form.org})` : ''}.`,
      `Email : ${form.email}`,
      `Service : ${serviceLabel()}`,
      `Budget : ${budgetLabel()}`,
      ``,
      `Brief : ${form.message}`,
    ].join('\n');
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isComplete()) {
      setError(true);
      return;
    }
    setPrepared(true);
  }
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Brief UPgraders — ${form.name}`)}&body=${encodeURIComponent(buildMailtoBody())}`;
  const whatsapp = `${CONTACT.whatsappLink}?text=${encodeURIComponent(buildWaText())}`;

  return (
    <form className={styles.contactForm} onSubmit={onSubmit}>
      <div className={styles.contactFormRow}>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>
            {t(T.name)} <b>*</b>
          </span>
          <input
            className={styles.contactInput}
            required
            type="text"
            name="name"
            autoComplete="name"
            maxLength={120}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder={t(T.namePh)}
          />
        </label>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>{t(T.org)}</span>
          <input
            className={styles.contactInput}
            type="text"
            name="organisation"
            autoComplete="organization"
            maxLength={160}
            value={form.org}
            onChange={(e) => update('org', e.target.value)}
            placeholder={t(T.orgPh)}
          />
        </label>
      </div>

      <label className={styles.contactField}>
        <span className={styles.contactLabel}>
          {t(T.email)} <b>*</b>
        </span>
        <input
          className={styles.contactInput}
          required
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder={t(T.emailPh)}
        />
      </label>

      <div className={styles.contactFormRow}>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>{t(T.service)}</span>
          <select
            className={styles.contactSelect}
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
          >
            <option value="">{t(T.select)}</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {pick(o.label, lang)}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>{t(T.budget)}</span>
          <select
            className={styles.contactSelect}
            value={form.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">{t(T.select)}</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {pick(o.label, lang)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.contactField}>
        <span className={styles.contactLabel}>
          {t(T.brief)} <b>*</b>
        </span>
        <textarea
          className={styles.contactTextarea}
          required
          minLength={10}
          maxLength={2500}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder={t(T.briefPh)}
        />
      </label>

      {error ? (
        <p className={styles.contactConsent} role="alert" style={{ color: 'var(--coral)' }}>
          {t(T.missing)}
        </p>
      ) : null}

      <button type="submit" className={styles.contactSubmit}>{lang === 'fr' ? 'Préparer le message' : 'Prepare the message'} <span aria-hidden>→</span></button>
      <p className={styles.contactConsent}>{lang === 'fr' ? 'Un brouillon à relire avant de l’ouvrir dans votre messagerie. Cette étape n’envoie rien.' : 'Review a draft before opening it in your messaging app. This step sends nothing.'}</p>
      {prepared && <div ref={preview} tabIndex={-1} className={styles.draftPreview} aria-labelledby="upgraders-draft-title">
        <h3 id="upgraders-draft-title">{lang === 'fr' ? 'Votre brouillon est prêt.' : 'Your draft is ready.'}</h3>
        <pre>{buildMailtoBody()}</pre>
        <div className={styles.draftActions}><a href={mailto} className={styles.contactSubmit}>{t(T.sendMail)} →</a><a href={whatsapp} className={styles.contactSubmit} target="_blank" rel="noreferrer">{t(T.sendWa)} ↗</a></div>
        <p className={styles.contactConsent}>{t(T.consent)}</p>
      </div>}
    </form>
  );
}
