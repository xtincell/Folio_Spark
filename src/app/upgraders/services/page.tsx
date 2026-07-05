import type { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services — UPgraders · Audit ADVE, accompagnement long, marque blanche',
  description:
    "Trois portes d'entrée chez UPgraders : audit ADVE, accompagnement RTIS long terme, marque blanche pour agences relais. Tarifs indicatifs et processus.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
