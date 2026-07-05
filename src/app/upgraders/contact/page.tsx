import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — UPgraders · Démarrer un projet · WhatsApp & email',
  description:
    "Contacter UPgraders : appel cadrage 45 min, WhatsApp ou email. Brief structuré recommandé.",
};

export default function ContactPage() {
  return <ContactClient />;
}
