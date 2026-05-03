'use client';

import { useState } from 'react';
import styles from '@/styles/upgraders.module.css';
import { CONTACT } from '@/components/folio/data/contact';

type FormState = {
  name: string;
  email: string;
  org: string;
  service: string;
  budget: string;
  message: string;
};

const SERVICE_OPTIONS = [
  { value: 'audit', label: 'Audit ADVE (porte d\'entrée)' },
  { value: 'rtis', label: 'Accompagnement RTIS (mandat long)' },
  { value: 'whitelabel', label: 'Marque blanche / agence relais' },
  { value: 'unsure', label: 'Pas encore sûr — on en discute' },
];

const BUDGET_OPTIONS = [
  { value: '<5', label: '< 5 M FCFA' },
  { value: '5-15', label: '5 à 15 M FCFA' },
  { value: '15-50', label: '15 à 50 M FCFA' },
  { value: '>50', label: '> 50 M FCFA' },
  { value: 'undef', label: 'À définir avec vous' },
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    org: '',
    service: '',
    budget: '',
    message: '',
  });

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function buildMailtoBody(): string {
    return [
      `Nom : ${form.name}`,
      `Organisation : ${form.org}`,
      `Email : ${form.email}`,
      `Service : ${form.service}`,
      `Budget : ${form.budget}`,
      '',
      'Brief :',
      form.message,
    ].join('\n');
  }

  function buildWaText(): string {
    return [
      `Bonjour UPgraders,`,
      ``,
      `Je suis ${form.name}${form.org ? ` (${form.org})` : ''}.`,
      `Email : ${form.email}`,
      `Service : ${form.service || '—'}`,
      `Budget : ${form.budget || '—'}`,
      ``,
      `Brief : ${form.message}`,
    ].join('\n');
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Brief UPgraders — ${form.name || 'nouveau projet'}`;
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMailtoBody())}`;
    window.location.href = href;
  }

  function onWhatsApp() {
    const url = `${CONTACT.whatsappLink}?text=${encodeURIComponent(buildWaText())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form className={styles.contactForm} onSubmit={onSubmit} noValidate>
      <div className={styles.contactFormRow}>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>
            Nom <b>*</b>
          </span>
          <input
            className={styles.contactInput}
            required
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Prénom Nom"
          />
        </label>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>Organisation</span>
          <input
            className={styles.contactInput}
            type="text"
            value={form.org}
            onChange={(e) => update('org', e.target.value)}
            placeholder="Marque, agence, structure"
          />
        </label>
      </div>

      <label className={styles.contactField}>
        <span className={styles.contactLabel}>
          Email <b>*</b>
        </span>
        <input
          className={styles.contactInput}
          required
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="vous@domaine.com"
        />
      </label>

      <div className={styles.contactFormRow}>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>Service souhaité</span>
          <select
            className={styles.contactSelect}
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
          >
            <option value="">— Sélectionner —</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.contactField}>
          <span className={styles.contactLabel}>Enveloppe budgétaire</span>
          <select
            className={styles.contactSelect}
            value={form.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">— Sélectionner —</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.contactField}>
        <span className={styles.contactLabel}>
          Brief — décrivez votre projet <b>*</b>
        </span>
        <textarea
          className={styles.contactTextarea}
          required
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Contexte, problème, échéance, contraintes — soyez concret."
        />
      </label>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="submit" className={styles.contactSubmit}>
          <span>Envoyer par email</span>
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          className={styles.contactSubmit}
          style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line-2)' }}
        >
          <span>Envoyer sur WhatsApp</span>
          <span aria-hidden>→</span>
        </button>
      </div>

      <p className={styles.contactConsent}>
        En envoyant ce formulaire, vous nous autorisez à vous recontacter sur les coordonnées
        fournies, uniquement à propos de votre demande. Pas de mailing list, pas de revente.
      </p>
    </form>
  );
}
