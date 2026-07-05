import { AGENCY_INFO } from './data/agencies';

/**
 * Agency credit resolution for campaign visuals.
 *
 * Two sources of truth:
 *  - practices.ts `chain` (curated) for /work campaign thumbnails;
 *  - CASE_AGENCY below for case-driven covers (case pages, /work grid, landing),
 *    because the case data has no reliable agency field.
 *
 * "External agency" = an agency worked *with/for* (employer, relay, talent,
 * client-side) — credited with a macaron. Excludes Alexandre's own ecosystem
 * (UPgraders, Friends Studio), which is signed elsewhere.
 */

const INTERNAL = new Set(['UPgraders', 'Upgraders', 'Friends Studio']);

// Curated with Alexandre — cases produced through the MATANGA employer agency.
export const CASE_AGENCY: Record<string, string> = {
  tradex: 'MATANGA Agency',
  'friesland-campina': 'MATANGA Agency',
  ecobank: 'MATANGA Agency',
  'cadyst-grain': 'MATANGA Agency',
  lapasta: 'MATANGA Agency',
  delys: 'MATANGA Agency',
};

/** Resolve a chain node to its canonical AGENCY_INFO key (tolerates "… Agency"). */
function resolveKey(name: string): string | null {
  if (AGENCY_INFO[name]) return name;
  const trimmed = name.replace(/\s+Agency$/i, '');
  if (AGENCY_INFO[trimmed]) return trimmed;
  return null;
}

export function isExternalAgency(name: string): boolean {
  if (INTERNAL.has(name)) return false;
  const key = resolveKey(name);
  if (!key || INTERNAL.has(key)) return false;
  const entry = AGENCY_INFO[key];
  if (!entry) return false;
  // Agency kinds start with "Agence…" (employeur, relais, de talents, clients);
  // clients ("Marque cliente"), labels, festivals, people are excluded.
  return /^Agences?\b/i.test(entry.kind.fr);
}

/** First external agency credited in a project chain, or null. */
export function externalAgencyFromChain(chain: string[] | undefined): string | null {
  if (!chain) return null;
  for (const node of chain) {
    if (isExternalAgency(node)) return node;
  }
  return null;
}

export function agencyForCase(slug: string): string | null {
  return CASE_AGENCY[slug] ?? null;
}

/** Short badge label, e.g. "MATANGA Agency" → "MATANGA", "Imperial (agence…)" → "Imperial". */
export function agencyLabel(name: string): string {
  return name
    .replace(/\s+Agency$/i, '')
    .replace(/\s*\(.*\)\s*$/, '')
    .trim();
}
