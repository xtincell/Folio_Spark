import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StudioShell } from '@/components/studio/Studio';
import { listPages, renderPage, projectCount, getArticle } from '@/lib/wiki';
import w from '@/styles/wiki.module.css';

/* /wiki — l'encyclopédie des projets, rendue depuis les fiches Markdown de
   /wiki (voir wiki/CONVENTIONS.md). Toutes les pages sont générées au build. */

export const dynamicParams = false;

export function generateStaticParams() {
  return listPages().map((p) => ({ slug: p.route ? p.route.split('/') : [] }));
}

type Props = { params: Promise<{ slug?: string[] }> };
const routeOf = async (params: Props['params']) => ((await params).slug ?? []).join('/');

const TYPE_LABEL = { projet: 'Projet', organisation: 'Organisation', personne: 'Personne' } as const;
const SECTION_LABEL: Record<string, string> = { projets: 'Projets', organisations: 'Organisations', personnes: 'Personnes' };
const ETAT_NOTE: Record<string, string> = {
  ebauche: 'Fiche en ébauche : les informations sont partielles et restent à compléter.',
  'a-verifier': 'Certaines informations de cette fiche restent à vérifier.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await routeOf(params);
  const page = renderPage(route);
  if (!page) return {};
  const title = route === ''
    ? 'Wiki — tous les projets d’Alexandre « Xtincell » Djengue'
    : `${page.titre} — Wiki Xtincell`;
  const description = (page.article?.resume ||
    `L’encyclopédie du travail d’Alexandre « Xtincell » Djengue : ${projectCount()} projets datés et sourcés, de 2008 à aujourd’hui.`)
    .replace(/\s+/g, ' ')
    .slice(0, 180);
  const path = `/wiki${route ? `/${route}` : ''}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(page.indexable ? {} : { robots: { index: false, follow: true } }),
    openGraph: { type: 'article', locale: 'fr_FR', url: path, title, description, images: [{ url: '/portrait.jpg' }] },
  };
}

export default async function WikiPage({ params }: Props) {
  const route = await routeOf(params);
  const page = renderPage(route);
  if (!page) notFound();
  const a = page.article;
  const section = a ? a.key.split('/')[0]! : null;
  const verifier = a?.verifier ?? [];
  const sommaire = page.headings.filter((h) => h.level === 2);
  const parent = a?.parent ? getArticle(`projets/${a.parent}`) : undefined;

  return (
    <StudioShell>
      <div className={w.root} lang="fr">
        <nav className={w.bar} aria-label="Wiki">
          <ol className={w.crumbs}>
            <li><Link href="/wiki">Wiki</Link></li>
            {section && <li><Link href="/wiki/index">{SECTION_LABEL[section]}</Link></li>}
            {parent && <li><Link href={`/wiki/${parent.key}`}>{parent.titre}</Link></li>}
            {route && <li aria-current="page">{page.titre}</li>}
          </ol>
          <div className={w.links}>
            <Link href="/wiki/personnes/alexandre-djengue">Biographie</Link>
            <Link href="/wiki/chronologie">Chronologie</Link>
            <Link href="/wiki/index">Index</Link>
            <Link href="/work">Folio ↗</Link>
          </div>
        </nav>

        <header className={w.head}>
          <span className={w.eyebrow}>
            {a ? TYPE_LABEL[a.type] : route === '' ? `Encyclopédie · ${projectCount()} projets` : 'Wiki'}
          </span>
          <h1>{route === '' ? 'Le wiki.' : page.titre}</h1>
          {a?.folio && !a.masque_folio && (
            <Link className={w.cta} href={a.folio}>
              {a.folio === '/work' ? 'Cité dans le folio' : 'Voir l’étude de cas'} <span aria-hidden="true">→</span>
            </Link>
          )}
        </header>

        {a?.etat && ETAT_NOTE[a.etat] && (
          <div className={w.notice} role="note">
            <p>{ETAT_NOTE[a.etat]}</p>
            {verifier.length > 0 && (
              <ul>{verifier.map((v) => <li key={v}>{v}</li>)}</ul>
            )}
          </div>
        )}

        <div className={`${w.layout} ${page.infobox ? w.withBox : ''}`}>
          {page.infobox && (
            <aside className={w.infobox} aria-label={`Infobox — ${page.titre}`}>
              <p className={w.boxTitle} aria-hidden="true">{page.titre}</p>
              <div dangerouslySetInnerHTML={{ __html: page.infobox }} />
            </aside>
          )}
          <div className={w.main}>
            {sommaire.length > 3 && (
              <nav className={w.toc} aria-label="Sommaire">
                <span>Sommaire</span>
                <ol>{sommaire.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
              </nav>
            )}
            <article className={w.prose} dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        </div>
      </div>
    </StudioShell>
  );
}
