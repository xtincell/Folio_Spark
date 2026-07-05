const DATE_FMT: Record<'fr' | 'en', Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
  en: new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
};

export function formatDate(iso: string, lang: 'fr' | 'en' = 'fr'): string {
  try {
    return DATE_FMT[lang].format(new Date(iso));
  } catch {
    return iso;
  }
}
