import { redirect } from 'next/navigation';

// Preserve older contact-card URLs while keeping one current personal portfolio.
export default function LegacyLandingPage() {
  redirect('/');
}
