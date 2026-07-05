'use client';

import { useState } from 'react';
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
  sendMail: { fr: 'Envoyer par email', en: 'Send by email' },
  sendWa: { fr: 'Envoyer sur WhatsApp', en: 'Send on WhatsApp' },
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

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
    if (error) setError(false);
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
    const subject = `Brief UPgraders — ${form.name || 'nouveau projet'}`;
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailtoBody())}`;
    window.location.href = href;
  }

  function onWhatsApp() {
    if (!isComplete()) {
      setError(true);
      return;
    }
    const url = `${CONTACT.whatsappLink}?text=${encodeURIComponent(buildWaText())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form className={styles.contactForm} onSubmit={onSubmit} noValidate>
      <div className={styles.contactFormRow}>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>
            {t(T.name)} <b>*</b>
          </span>
          <input
            className={styles.contactInput}
            required
            type="text"
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

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="submit" className={styles.contactSubmit}>
          <span>{t(T.sendMail)}</span>
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          className={styles.contactSubmit}
          style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-2)' }}
        >
          <span>{t(T.sendWa)}</span>
          <span aria-hidden>→</span>
        </button>
      </div>

      <p className={styles.contactConsent}>{t(T.consent)}</p>
    </form>
  );
}
