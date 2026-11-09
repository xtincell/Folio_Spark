#!/usr/bin/env python3
# =============================================================================
# wiki-disques — verse les archives de travail des disques dans le wiki.
#
#   python scripts/wiki-disques.py                  # scanne C:, E:, P: puis écrit
#   python scripts/wiki-disques.py --inventaire x.json   # réutilise un scan
#   python scripts/wiki-disques.py --dry            # n'écrit rien, résume
#   puis : npm run wiki
#
# LECTURE SEULE sur les disques. Côté wiki :
#   - crée les fiches manquantes (organisations, « travaux », événements,
#     projets personnels) ; une fiche existante n'est jamais réécrite ;
#   - met à jour uniquement les blocs <!-- wiki:archives --> … <!-- /wiki:archives -->.
# Discrétion : factures, devis, contrats, pièces administratives et noms des
# commandes privées (mariages, anniversaires, obsèques…) ne sont jamais publiés.
# =============================================================================
import json, os, re, sys, unicodedata
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
WIKI = os.path.join(os.path.dirname(HERE), 'wiki')
DATE_RELEVE = '2026-11-09'

ROOTS = [
    ('C', r'C:\UPGRADERS — EXPORT DU TRAVAIL', 'upgraders'),
    ('C', r'C:\MATANGA — EXPORT DU TRAVAIL', 'matanga'),
    ('E', r'E:\UPGRADERS — EXPORT DU TRAVAIL', 'upgraders'),
    ('P', r'P:\UPGRADERS — EXPORT DU TRAVAIL', 'upgraders'),
    ('P', r'P:\MATANGA — EXPORT DU TRAVAIL', 'matanga'),
]

# ----------------------------------------------------------------- règles
SKIP_CLIENTS = {'_Prospects (non gagnés)', '_À identifier', '_À identifier — vidéos'}
PRIVE = re.compile(r'factur|devis|contrat|reçus? de paiement|administratif|juridique|candidature|ressources humaines|recrutement|privé|commandes privées|obsèques|mariage|anniv|passport|achats de matériel|fiches et contacts|management|statuts|^folio [A-Z]|contacts|inscrits|coordonnées', re.I)
GENERIQUE = re.compile(r'^(documents?|documents reçus.*|copies reçues.*|fichiers de travail.*|visuels et documents|visuels|divers|archives( reçues)?|exe|png|1x|projet|nouveau dossier.*|lightroom|montages finaux|captures vidéo|tutoriels|briefs|références visuelles|modèles|google drive.*|outils|contenus|gestion du studio|identité)$', re.I)
EVT_PRIVE = re.compile(r'privé|mariage|anniversaire|obsèques|veillée|baptême|fiançailles|\bdot\b', re.I)

# Dossier disque → slug d'organisation existante (le reste est créé).
ALIAS = {
    'Kem Care': 'kemcare', 'MOTION19': 'motion19', 'KOF - Kamer Otaku Fest': 'kamer-otaku-festival',
    'Universal Music - artistes': 'universal-music-africa', 'Océanis Kribi': 'oceanis-kribi', 'Omenkart': 'omenkart',
    'Hohaaa Music': 'hohaaa-music', 'McCann (agence)': 'publicis-mccann', 'Friends Photography Studio': 'friends-studio',
    'Friends Food': 'friendsfood-225', 'Cosmos Bubble Tea': 'cosmos-boba', 'Clinique dentaire (nom à confirmer)': 'cabinet-dentaire-beausourire',
    'JPN ADVISOR': 'jpn-advisors', 'GIMAC': 'gimacpay', 'Ambassade du Japon': 'ambassade-du-japon', 'Shakazz': 'shakazz',
    'BanaHealth': 'banahealth', 'Goodlocs': 'goodlocs', 'Spawt': 'spawt', 'SABC': 'brasseries-du-cameroun', 'Chococam': 'chococam',
    'Tiger Brands': 'chococam', 'Mambo': 'chococam', 'Musina': 'festival-musina', 'AMMCO': 'ammco', 'Akwa Palace': 'akwa-palace',
    'Her Media & Co': 'her-media', 'Bel': 'groupe-bel', 'Cadyst Group': 'groupe-cadyst', 'Cap Esterias': 'cap-esterias',
    'Ecobank': 'ecobank', 'FrieslandCampina': 'frieslandcampina', 'NSIA': 'nsia-assurances', 'Tradex': 'tradex',
    'BAMS & BTP': 'bams-btp', 'Podcast H3riq': 'h3riq', 'Confiotes': 'les-confiotes', 'Les Confiotes': 'les-confiotes',
    '_UPgraders — la structure': 'upgraders', '_Clients ponctuels et prospects': 'upgraders', '_Matanga — sans marque': 'matanga-agency',
}
# Dossiers qui documentent un projet (pas une organisation).
AS_PROJECT = {'Kinara': 'neo-kinara', 'Shinkiro': 'shinkiro', 'StreetWhale': 'street-whale', 'The BFF Club': 'bff-club'}
NOMS = {'h3riq': 'H3riQ', 'les-confiotes': 'Les Confiotes', 'ammco': 'AMMCO'}
NATURES = {
    'ammco': 'ONG de conservation (African Marine Mammal Conservation Organization)', 'unesco': 'Organisation internationale',
    'mtn-cameroon': 'Opérateur télécom', 'mtn-zik': 'Programme musical de MTN Cameroon', 'domaf-conseil-camerounais-de-la-musique': 'Institution culturelle',
    'ambassade-des-etats-unis': 'Institution diplomatique', 'canalolympia-canal': 'Salles de cinéma et de spectacle', 'singleton-diageo': 'Spiritueux',
    'artistry-hennessy': 'Programme culturel de la marque Hennessy', 'talk-paix-cfi': 'Programme médias de CFI (Talk Paix)', 'locko': 'Artiste musical',
    'cysoul': 'Artiste musical', 'mimie-x-nakuin': 'Artistes musicaux', 'dena-mwana-2021': 'Artiste musicale', 'ful': 'Artiste musical',
    'babatunde': 'Artiste musical', 'mounpoubeyi': 'Artiste musicale', 'indira-artiste': 'Artiste musicale', 'isabella-groupe-de-rock': 'Groupe de rock',
    'madiba-eau-minerale': 'Eau minérale', 'galerie-mam': "Galerie d'art", 'douala-art-fair': "Foire d'art", 'mboa-bd': 'Festival de bande dessinée',
    'ifc-douala': 'Institut français du Cameroun (Douala)', 'h3riq': 'Artiste musical', 'timing-agency': 'Agence événementielle', 'k-hotel': 'Hôtellerie',
    'student-photographer-stephane-nounamo': 'Marque de formation photo de Stéphane Nounamo', 'cocktailors': 'À préciser',
}
# Rattachement d'un événement à un projet existant (mot-clé dans le titre ou le client).
EVT_PARENT = [
    (r'Otaku|KOF|Cosplay Land', lambda y: 'kof-festival' if y and y >= 2025 else 'kof-2022-2024' if y and y >= 2022 else None),
    (r'Street Whale|pêche|golfe de Guinée', lambda y: 'street-whale'),
    (r'Cimencam', lambda y: 'cimencam-video-corporate'),
    (r'Universal Music|Singuila|Charlotte Dipanda|Mimie|Locko|TayC', lambda y: 'uma-artistes'),
    (r'Apéro Masterclass', lambda y: 'apero-masterclass'),
    (r'Créapreneur', lambda y: 'creapreneur-podcast'),
]

# Projets personnels repérés dans les dossiers « Xtincell » (chemin relatif → fiche).
PERSO = {
    'Captain Lion': ('captain-lion', 'Captain Lion', 'projet', 'direction-artistique'),
    'Darkroom': ('darkroom', 'Darkroom', 'projet', 'direction-artistique'),
    'Forgemonde': ('forgemonde', 'Forgemonde', 'projet', 'direction-artistique'),
    'Darkling Stories': ('darkling-stories', 'Darkling Stories', 'edition', 'direction-artistique'),
    'Praline': ('praline', 'Praline', 'projet', 'direction-artistique'),
    'Podcast « Frontières de l\'innovation »': ('podcast-frontieres-de-l-innovation', 'Frontières de l’innovation (podcast)', 'podcast', 'strategie'),
    'Podcast « Geek de brousse » (tests 2024)': ('podcast-geek-de-brousse', 'Geek de brousse (podcast, tests)', 'podcast', 'strategie'),
    'Audio Reel « Des routines, des rituels »': ('audio-reel-routines-rituels', 'Des routines, des rituels (audio reel)', 'production', 'execution'),
    'Outils IA': ('experimentations-ia-generative', 'Expérimentations en IA générative', 'outil', 'direction-artistique'),
    'Portfolio photo': ('portfolio-photo-personnel', 'Portfolio photo personnel', 'collection', 'execution'),
    'Concepts d\'événements/Festival du Masque': ('festival-du-masque', 'Festival du Masque (concept)', 'evenement', 'strategie'),
    'Concepts d\'événements/Festival « Ultime » (Riot Games × Japan Expo)': ('festival-ultime', 'Festival « Ultime » (concept, Riot Games × Japan Expo)', 'evenement', 'strategie'),
    'Créations graphiques/Couvertures « Vogue » (juin 2020)': ('couvertures-vogue-2020', 'Couvertures « Vogue » (exercice, 2020)', 'collection', 'direction-artistique'),
    'Créations graphiques/Branding « Kanbe » (2020)': ('branding-kanbe', 'Kanbe — branding', 'identite', 'direction-artistique'),
    'Créations graphiques/Charadesign challenge (2024)': ('charadesign-challenge-2024', 'Charadesign Challenge (2024)', 'collection', 'direction-artistique'),
    'Créations graphiques/Logo « Le Passionné » (2020)': ('logo-le-passionne', 'Le Passionné — logo', 'identite', 'direction-artistique'),
    'Créations graphiques/Logos Rue Joss et H3riQ (2022)': ('logos-rue-joss-h3riq', 'Rue Joss et H3riQ — logos', 'identite', 'direction-artistique'),
    'Créations graphiques/3D — galerie d\'art (Blend4Web)': ('galerie-3d-blend4web', 'Galerie d’art 3D (Blend4Web)', 'projet', 'execution'),
    'Créations graphiques/Kadji by Spark': ('kadji-by-spark', 'Kadji by Spark', 'campagne', 'direction-artistique'),
    'Créations graphiques/Salatiel': ('salatiel', 'Salatiel — visuels', 'campagne', 'direction-artistique'),
    'Créations graphiques/Sons of the Lions': ('sons-of-the-lions', 'Sons of the Lions', 'campagne', 'direction-artistique'),
    'Créations graphiques/The Battle of the Baddest': ('battle-of-the-baddest', 'The Battle of the Baddest', 'evenement', 'direction-artistique'),
    'Créations graphiques/Call the Ambulance': ('call-the-ambulance', 'Call the Ambulance', 'campagne', 'direction-artistique'),
    'Créations graphiques/DJ EQ 1er': ('dj-eq-1er', 'DJ EQ 1er — visuels', 'campagne', 'direction-artistique'),
    'Projets/Creative Next': ('creative-next', 'Creative Next', 'projet', 'strategie'),
    'Projets/Human Mind OS': ('human-mind-os', 'Human Mind OS', 'projet', 'strategie'),
    'Projets/Ngoin Kollektiv': ('ngoin-kollektiv', 'Ngoin Kollektiv', 'projet', 'strategie'),
    'Projets/Résidence mode (up-cycling)': ('residence-mode-upcycling', 'Résidence mode (up-cycling)', 'projet', 'strategie'),
    'Projets/Sitcom « My Crazy Life »': ('sitcom-my-crazy-life', 'My Crazy Life (sitcom)', 'production', 'direction-artistique'),
    'Projets/Tu tires je tiens': ('tu-tires-je-tiens', 'Tu tires je tiens', 'projet', 'strategie'),
    'Projets/Whatever Maid Café et lectures': ('whatever-maid-cafe', 'Whatever Maid Café et lectures', 'evenement', 'strategie'),
    'Projets/Spark — agence de talents': ('spark-agence-de-talents', 'Spark — agence de talents', 'projet', 'strategie'),
    'Projets/Storyboard « 916 web talk Lust » (2024-06)': ('storyboard-916-web-talk', '916 Web Talk « Lust » — storyboard', 'production', 'direction-artistique'),
    'Écriture/République de Mbengola': ('republique-de-mbengola', 'République de Mbengola', 'edition', 'direction-artistique'),
    'Créations graphiques/Inktober augmented (2023)': ('ai-inktober', None, None, None),  # fiche existante
    'POPCORNMAN': ('popcorn-man', None, None, None),
    'Projets/Créapreneur V2': ('creapreneur-podcast', None, None, None),
}

# ----------------------------------------------------------------- utilitaires
def slugify(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    return re.sub(r'-{2,}', '-', s)

def fm_line(k, v):
    if v is None or v == [] or v == '':
        return None
    if isinstance(v, bool):
        return f'{k}: {"true" if v else "false"}'
    if isinstance(v, int):
        return f'{k}: {v}'
    return f'{k}: {json.dumps(v, ensure_ascii=False)}'

def frontmatter(d):
    return '---\n' + '\n'.join(x for x in (fm_line(k, v) for k, v in d.items()) if x) + '\n---\n'

def fmt_go(b):
    g = b / 1e9
    if g < 0.1:
        return f'{max(1, round(b / 1e6))} Mo'
    return (fmt_n(round(g)) if g >= 10 else f'{g:.1f}'.replace('.', ',')) + ' Go'

def fmt_n(n):
    return f'{n:,}'.replace(',', '\u202f')

TYPE_FR = {'photo': 'photos', 'video': 'vidéos', 'design': 'fichiers de création', 'document': 'documents', 'audio': 'sons', 'autre': 'autres'}
def fmt_types(t):
    return ' · '.join(f'{fmt_n(v)} {TYPE_FR.get(k, k)}' for k, v in sorted(t.items(), key=lambda x: -x[1]) if v)

def read(p):
    try:
        with open(p, encoding='utf-8') as f:
            return f.read()
    except OSError:
        return None

# ----------------------------------------------------------------- scan (lecture seule)
def scan():
    EXT = {
        'photo': {'.jpg', '.jpeg', '.png', '.cr2', '.cr3', '.nef', '.arw', '.dng', '.heic', '.tif', '.tiff', '.webp', '.raf'},
        'video': {'.mp4', '.mov', '.mts', '.m4v', '.avi', '.mkv', '.mxf', '.lrv'},
        'design': {'.psd', '.ai', '.indd', '.eps', '.svg', '.xd', '.fig', '.afdesign', '.cdr', '.aep', '.prproj', '.drp', '.mogrt'},
        'document': {'.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.txt', '.md', '.odt', '.key', '.csv'},
        'audio': {'.mp3', '.wav', '.aac', '.m4a', '.flac', '.aif', '.aiff'},
    }
    def kind(name):
        e = os.path.splitext(name)[1].lower()
        return next((k for k, s in EXT.items() if e in s), 'autre')
    def merge(*cs):
        m = {'n': 0, 'size': 0, 'types': {}}
        for c in cs:
            m['n'] += c['n']; m['size'] += c['size']
            for k, v in c['types'].items(): m['types'][k] = m['types'].get(k, 0) + v
        return m
    def walk(path, recursive=True):
        c = {'n': 0, 'size': 0, 'types': {}}
        stack = [path]
        while stack:
            p = stack.pop()
            try:
                it = os.scandir(p)
            except OSError:
                continue
            with it:
                for e in it:
                    try:
                        if e.is_dir(follow_symlinks=False):
                            if recursive: stack.append(e.path)
                        elif e.is_file(follow_symlinks=False) and not e.name.startswith(('_MANIFESTE', '_ANNULER', 'PORTEUR.md')):
                            c['n'] += 1; c['size'] += e.stat(follow_symlinks=False).st_size
                            k = kind(e.name); c['types'][k] = c['types'].get(k, 0) + 1
                    except OSError:
                        pass
        return c
    def subdirs(p):
        try:
            return sorted((e for e in os.scandir(p) if e.is_dir(follow_symlinks=False)), key=lambda e: e.name)
        except OSError:
            return []
    out = {'clients': [], 'notes': {}}
    for disk, root, struct in ROOTS:
        if not os.path.isdir(root):
            print('  absent :', root); continue
        for md in ('EVENEMENTS-COUVERTS.md',):
            t = read(os.path.join(root, md))
            if t: out['notes'][f'{disk}:{struct}:{md}'] = t
        for cl in subdirs(root):
            entry = {'disk': disk, 'structure': struct, 'client': cl.name, 'porteur': read(os.path.join(cl.path, 'PORTEUR.md')), 'children': []}
            for l1 in subdirs(cl.path):
                c1 = {'name': l1.name, 'children': []}
                for l2 in subdirs(l1.path):
                    c1['children'].append({'name': l2.name, **walk(l2.path)})
                c1['total'] = merge(walk(l1.path, False), *[{k: x[k] for k in ('n', 'size', 'types')} for x in c1['children']])
                entry['children'].append(c1)
            entry['total'] = merge(walk(cl.path, False), *[x['total'] for x in entry['children']])
            out['clients'].append(entry)
            print(f'  {disk}: {cl.name} ({entry["total"]["n"]})', flush=True)
    return out

# ----------------------------------------------------------------- analyse
def clean_operations(porteur):
    """Garde les opérations descriptives des notes PORTEUR.md, sans noms de fichiers ni pièces sensibles."""
    if not porteur:
        return []
    m = re.search(r'## Opérations trouvées\n(.*?)(\n## |\Z)', porteur, re.S)
    if not m:
        return []
    ops = []
    for line in m.group(1).splitlines():
        if not line.startswith('- '):
            continue
        t = line[2:].strip()
        t = re.sub(r'\s*;\s*récupéré de found\.\d+.*$', '', t)
        t = re.sub(r'\s*\((?:D|C|E|P):\\[^)]*\)', '', t)
        if re.search(r'fichier «|planche contact|prise de vue EXIF|BILL TO|nom du client|découpe du lot|même jour qu|lot P\d|found\.\d+|^reçu ou téléchargé|\(nom : «|chèque|paiement|\.vcf', t, re.I):
            continue
        if PRIVE.search(t):
            continue
        if len(t) < 6:
            continue
        ops.append(t[0].upper() + t[1:])
    seen, res = set(), []
    for o in ops:
        k = o.lower()
        if k not in seen:
            seen.add(k); res.append(o)
    return res

def years_of(children):
    ys = set()
    for c in children:
        m = re.match(r'^(20\d\d|19\d\d)', c['name'])
        if m: ys.add(int(m.group(1)))
        for x in c['children']:
            m = re.match(r'^(20\d\d)', x['name'])
            if m: ys.add(int(m.group(1)))
    return sorted(ys)

def visible(name):
    return not PRIVE.search(name) and not GENERIQUE.match(name.strip())

def archives_block(entries, extra_lines=()):
    """Bloc Markdown « archives » pour un ensemble de dossiers (plusieurs disques)."""
    disks = sorted({e['disk'] for e in entries})
    total = {'n': 0, 'size': 0, 'types': defaultdict(int)}
    rubriques = defaultdict(lambda: {'n': 0, 'sub': {}})
    prive_n = 0
    for e in entries:
        total['n'] += e['total']['n']; total['size'] += e['total']['size']
        for k, v in e['total']['types'].items(): total['types'][k] += v
        for c in e['children']:
            if c['name'] == 'Commandes privées':
                prive_n += c['total']['n']; continue
            if not visible(c['name']) and not re.match(r'^20\d\d$', c['name']):
                continue
            r = rubriques[c['name']]
            r['n'] += c['total']['n']
            for x in c['children']:
                if visible(x['name']) and x['n'] > 0:
                    r['sub'][x['name']] = r['sub'].get(x['name'], 0) + x['n']
    ys = years_of([c for e in entries for c in e['children']])
    lines = [f'_Relevé en lecture seule des disques de travail, {DATE_RELEVE}. Les pièces administratives et les commandes privées ne sont pas détaillées._', '']
    lines += ['| | |', '| --- | --- |', f'| Structure | {", ".join(sorted({ "UPgraders" if e["structure"] == "upgraders" else "MATANGA" for e in entries}))} |',
              f'| Disques | {", ".join(d + ":" for d in disks)} |', f'| Fichiers | {fmt_n(total["n"])} ({fmt_go(total["size"])}) |']
    if total['types']:
        lines.append(f'| Contenu | {fmt_types(total["types"])} |')
    if ys:
        lines.append(f'| Années | {ys[0]}–{ys[-1]} |' if len(ys) > 1 else f'| Année | {ys[0]} |')
    lines.append('')
    keys = sorted(rubriques, key=lambda k: (not re.match(r'^20\d\d$', k), k))
    if keys:
        lines += ['**Dossiers**', '']
        for k in keys:
            r = rubriques[k]
            subs = sorted(r['sub'].items(), key=lambda x: x[0])
            sub_txt = ' · '.join(f'{name} ({fmt_n(n)})' for name, n in subs[:25])
            more = f' · … ({len(subs) - 25} autres)' if len(subs) > 25 else ''
            lines.append(f'- **{k}** ({fmt_n(r["n"])} fichiers){" : " + sub_txt + more if sub_txt else ""}')
        lines.append('')
    if prive_n:
        lines += [f'Commandes privées : {fmt_n(prive_n)} fichiers (séances et événements de particuliers, non détaillés ici).', '']
    ops = []
    for e in entries:
        ops += clean_operations(e.get('porteur'))
    ops = list(dict.fromkeys(ops))
    if ops:
        lines += ['**Opérations repérées lors du rangement**', ''] + [f'- {o}' for o in ops[:20]]
        if len(ops) > 20:
            lines.append(f'- … et {len(ops) - 20} autres')
        lines.append('')
    lines += list(extra_lines)
    return '\n'.join(lines).strip()

# ----------------------------------------------------------------- événements
MOIS = {'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6, 'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12}
def parse_events(text):
    evs = []
    for b in re.split(r'\n(?=### )', text)[1:]:
        head = b.split('\n', 1)[0][4:].strip()
        date_part, _, title = head.partition(' — ')
        field = lambda name: (re.search(rf'\*\*{re.escape(name)}\*\* : (.*)', b) or [None, ''])[1].strip()
        m = re.match(r'(\d{1,2})(?:er)?(?:[-–]\d{1,2})?\s+(\w+)(?:\s+(\d{4}))?', date_part)
        year = re.search(r'(\d{4})', date_part)
        iso = None
        if m and m.group(2) in MOIS and year:
            y = int(m.group(3) or year.group(1))
            iso = f'{y}-{MOIS[m.group(2)]:02d}-{int(m.group(1)):02d}'
        dossiers = re.findall(r'`([A-Z]:\\[^`]+)` \((\d+) fichiers?\)', b)
        evs.append({
            'date_txt': date_part, 'iso': iso, 'year': int(year.group(1)) if year else None, 'titre': title or head,
            'lieu': field('Lieu'), 'client': field('Organisateur / client'), 'photos': field('Ce que montrent les photos'),
            'aussi': [a.strip() for a in re.findall(r'\n  - aussi : (.*)', b)], 'identification': field('Comment c\'est identifié'),
            'fiabilite': field('Fiabilité'), 'dossiers': dossiers,
        })
    return evs

# ----------------------------------------------------------------- écriture
def load_existing():
    arts = {}
    for d in ('projets', 'organisations', 'personnes'):
        for f in os.listdir(os.path.join(WIKI, d)):
            if f.endswith('.md'):
                src = read(os.path.join(WIKI, d, f))
                fm = {}
                m = re.match(r'^---\n(.*?)\n---', src, re.S)
                for line in (m.group(1).splitlines() if m else []):
                    k, _, v = line.partition(':')
                    v = v.strip()
                    try:
                        fm[k.strip()] = json.loads(v) if v[:1] in '"[{' else (int(v) if v.isdigit() else v)
                    except ValueError:
                        fm[k.strip()] = v
                arts[f'{d}/{f[:-3]}'] = fm
    return arts

def set_archives(path, block, before=('## Projets', '## Sources', '<!-- wiki:liens-entrants -->')):
    src = read(path)
    if src is None:  # fiche pas encore écrite (simulation)
        return True
    content = f'<!-- wiki:archives -->\n{block}\n<!-- /wiki:archives -->'
    if '<!-- wiki:archives -->' in src:
        new = re.sub(r'<!-- wiki:archives -->[\s\S]*?<!-- /wiki:archives -->', lambda _: content, src)
    else:
        section = f'## Archives de travail\n\n{content}\n\n'
        idx = next((src.find(b) for b in before if src.find(b) >= 0), len(src))
        new = src[:idx] + section + src[idx:]
    if new != src and not DRY:
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new)
    return new != src

def create(rel, fm, body):
    path = os.path.join(WIKI, rel + '.md')
    if os.path.exists(path):
        return False
    if not DRY:
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(frontmatter(fm) + body.rstrip() + '\n\n<!-- wiki:liens-entrants -->\n<!-- /wiki:liens-entrants -->\n')
    return True

def patch_fm(rel, updates):
    """Complète des champs vides du frontmatter d'une fiche existante (ne remplace jamais une valeur)."""
    path = os.path.join(WIKI, rel + '.md')
    src = read(path)
    if src is None:
        return
    m = re.match(r'^---\n(.*?)\n---', src, re.S)
    lines = m.group(1).splitlines()
    keys = {l.partition(':')[0].strip() for l in lines}
    add = [fm_line(k, v) for k, v in updates.items() if k not in keys]
    add = [a for a in add if a]
    if add and not DRY:
        new = '---\n' + '\n'.join(lines[:-1] + add + lines[-1:]) + '\n---' + src[m.end():]
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(new)

INFOBOX = '<!-- wiki:infobox -->\n<!-- /wiki:infobox -->'

def main():
    global DRY
    args = sys.argv[1:]
    DRY = '--dry' in args
    if '--inventaire' in args:
        with open(args[args.index('--inventaire') + 1], encoding='utf-8') as f:
            inv = json.load(f)
    else:
        print('Scan des disques (lecture seule)…')
        inv = scan()
    existing = load_existing()
    stats = defaultdict(int)

    # Regroupe les dossiers par fiche cible
    groups = defaultdict(list)  # (kind, slug) → entries
    names = {}
    structures = defaultdict(set)
    for e in inv['clients']:
        name = e['client']
        if name in SKIP_CLIENTS or name == 'Xtincell':
            continue
        if name in ('_Autres comptes',):
            for c in e['children']:  # comptes MATANGA secondaires → une organisation chacun
                sub = {**e, 'client': c['name'], 'children': c['children'] and [c] or [], 'total': c['total'], 'porteur': None}
                slug = ALIAS.get(c['name'], slugify(c['name']))
                groups[('organisations', slug)].append(sub); names[slug] = c['name']; structures[slug].add('matanga')
            continue
        if name in AS_PROJECT:
            groups[('projets', AS_PROJECT[name])].append(e); continue
        if name == 'Friends Photography Studio':
            for c in e['children']:
                if c['name'] == 'Orange Cameroun':
                    groups[('projets', 'orange-evenements-2025-2026')].append({**e, 'children': [c], 'total': c['total'], 'porteur': None})
            groups[('organisations', 'friends-studio')].append({**e, 'children': [c for c in e['children'] if c['name'] != 'Orange Cameroun']})
            continue
        slug = ALIAS.get(name, slugify(re.sub(r'\s*\((?:nom à confirmer)\)', '', name)))
        groups[('organisations', slug)].append(e)
        names.setdefault(slug, name)
        structures[slug].add(e['structure'])

    org_has_project = defaultdict(bool)
    for key, fm in existing.items():
        if key.startswith('projets/'):
            if fm.get('client'): org_has_project[fm['client']] = True
            for o in fm.get('chaine') or []: org_has_project[o] = True

    # Organisations + fiches « travaux »
    for (kind, slug), entries in sorted(groups.items()):
        if kind == 'projets':
            continue
        rel = f'organisations/{slug}'
        nom = NOMS.get(slug, names.get(slug, slug))
        struct = 'matanga' if structures[slug] == {'matanga'} else 'upgraders'
        if rel not in existing:
            ok = create(rel, {'type': 'organisation', 'nom': nom, 'nature': NATURES.get(slug, 'À préciser'), 'relation': 'client',
                              'sources': [f'disques:{struct}'], 'etat': 'ebauche'},
                        f'# {nom}\n\n{INFOBOX}\n\n**{nom}** est un client d’Alexandre « Xtincell » Djengue{" via MATANGA Agency" if struct == "matanga" else ", suivi avec UPgraders"}.\n\n'
                        f'## Présentation\n\n_À documenter._\n\n## Projets\n\n<!-- wiki:projets -->\n<!-- /wiki:projets -->\n')
            stats['organisations créées'] += ok
            existing[rel] = {'nom': nom}
        extra = []
        if slug == 'upgraders':
            ponct = [c['name'] for e in entries if e['client'] == '_Clients ponctuels et prospects' for c in e['children'] if visible(c['name'])]
            if ponct:
                extra = ['**Clients ponctuels et prospects** (à départager) : ' + ' · '.join(sorted(set(ponct))), '']
            entries = [e for e in entries if e['client'] != '_Clients ponctuels et prospects']
        stats['blocs archives mis à jour'] += set_archives(os.path.join(WIKI, rel + '.md'), archives_block(entries, extra))
        # Fiche « travaux » si l'organisation n'a encore aucun projet
        if not org_has_project[slug] and slug not in ('upgraders', 'matanga-agency', 'friends-studio', 'publicis-mccann', 'her-media'):
            ys = years_of([c for e in entries for c in e['children']])
            types = defaultdict(int)
            for e in entries:
                for k, v in e['total']['types'].items(): types[k] += v
            media = types['photo'] + types['video']
            casq = 'execution' if media >= types['design'] else 'direction-artistique'
            pslug = f'{slug}-travaux'
            titre = f'{nom} — travaux{" (MATANGA)" if struct == "matanga" else ""}'
            fm = {'type': 'projet', 'titre': titre, 'categorie': 'production' if casq == 'execution' else 'campagne', 'casquette': casq,
                  'debut': ys[0] if ys else None, 'fin': ys[-1] if ys and ys[-1] != ys[0] else (ys[0] if ys else None), 'client': slug,
                  'chaine': ['matanga-agency'] if struct == 'matanga' else ['upgraders'], 'sources': [f'disques:{struct}'], 'etat': 'ebauche',
                  'verifier': ['Fiche créée depuis les archives des disques : nature exacte de la mission, rôle et résultat à documenter.' + ('' if ys else ' Années absentes des dossiers.')]}
            body = (f'# {titre}\n\n{INFOBOX}\n\n**{titre}** regroupe le travail réalisé pour [{nom}](../organisations/{slug}.md)'
                    f'{" via [MATANGA Agency](../organisations/matanga-agency.md)" if struct == "matanga" else " avec [UPgraders](../organisations/upgraders.md)"}'
                    f'{f" ({ys[0]}–{ys[-1]})" if len(ys) > 1 else f" ({ys[0]})" if ys else ""}.\n\n'
                    f'## Description\n\n_À documenter : demande, rôle, livrables._ Les dossiers et opérations retrouvés sur les disques sont détaillés sur la fiche [{nom}](../organisations/{slug}.md#archives-de-travail).\n\n'
                    f'## Sources\n\n- Archives de travail rangées sur les disques ({DATE_RELEVE})\n')
            stats['fiches travaux créées'] += create(f'projets/{pslug}', fm, body)

    # Dossiers qui documentent un projet existant ou dédié
    for (kind, slug), entries in groups.items():
        if kind != 'projets':
            continue
        rel = f'projets/{slug}'
        if slug == 'orange-evenements-2025-2026':
            create(rel, {'type': 'projet', 'titre': 'Orange Cameroun — événements 2025–2026', 'categorie': 'evenement', 'casquette': 'execution',
                         'debut': 2025, 'fin': 2026, 'client': 'orange-cameroun', 'chaine': ['publicis-mccann', 'friends-studio'],
                         'role': 'Couverture photo et vidéo', 'sources': ['disques:upgraders'], 'etat': 'ebauche',
                         'verifier': ['Passage par McCann indiqué sur la plupart des dossiers, pas sur tous.']},
                   f'# Orange Cameroun — événements 2025–2026\n\n{INFOBOX}\n\n**Orange Cameroun — événements 2025–2026** regroupe les couvertures photo et vidéo d’événements Orange réalisées avec [Friends Photography Studio](../organisations/friends-studio.md), le plus souvent via [McCann](../organisations/publicis-mccann.md) (2025–2026).\n\n'
                   '## Description\n\n_À documenter._ Liste des opérations dans la section archives ci-dessous.\n\n## Sources\n\n- Archives de travail rangées sur les disques\n')
        if os.path.exists(os.path.join(WIKI, rel + '.md')):
            stats['blocs archives mis à jour'] += set_archives(os.path.join(WIKI, rel + '.md'), archives_block(entries))
    patch_fm('projets/street-whale', {'client': 'ammco'})
    create('organisations/the-bff-club', {'type': 'organisation', 'nom': 'The BFF Club', 'nature': 'À préciser', 'relation': 'client', 'sources': ['disques:upgraders'], 'etat': 'ebauche'},
           f'# The BFF Club\n\n{INFOBOX}\n\n**The BFF Club** est un client d’Alexandre « Xtincell » Djengue, suivi avec UPgraders.\n\n## Présentation\n\n_À documenter._\n\n## Projets\n\n<!-- wiki:projets -->\n<!-- /wiki:projets -->\n')
    patch_fm('projets/bff-club', {'client': 'the-bff-club'})
    patch_fm('projets/apero-masterclass', {'client': 'student-photographer-stephane-nounamo', 'debut': 2022})
    patch_fm('projets/photo-afrobit', {'client': 'afrobit'})
    patch_fm('projets/photo-mounpoubeyi', {'client': 'mounpoubeyi'})
    patch_fm('projets/photo-h3riq', {'client': 'h3riq'})

    # Projets personnels (dossiers « Xtincell »)
    perso_entries = [e for e in inv['clients'] if e['client'] == 'Xtincell']
    found = defaultdict(lambda: {'n': 0, 'types': defaultdict(int), 'years': set()})
    for e in perso_entries:
        for c in e['children']:
            for key, node in [(c['name'], c['total'])] + [(f"{c['name']}/{x['name']}", x) for x in c['children']]:
                if key in PERSO:
                    f = found[key]; f['n'] += node['n']
                    for k, v in node['types'].items(): f['types'][k] += v
                    for y in re.findall(r'(20\d\d)', key): f['years'].add(int(y))
                    if key == c['name']:
                        for x in c['children']:
                            m = re.match(r'^(20\d\d)', x['name'])
                            if m: f['years'].add(int(m.group(1)))
    for key, f in found.items():
        slug, titre, cat, casq = PERSO[key]
        if titre is None:
            continue
        ys = sorted(f['years'])
        fm = {'type': 'projet', 'titre': titre, 'categorie': cat, 'casquette': casq, 'debut': ys[0] if ys else None,
              'fin': ys[-1] if len(ys) > 1 else (ys[0] if ys else None), 'client': 'perso', 'sources': ['disques:xtincell'], 'etat': 'ebauche',
              'verifier': ['Projet repéré dans les archives personnelles : objet, dates et état à documenter.']}
        body = (f'# {titre}\n\n{INFOBOX}\n\n**{titre}** est un projet personnel d’Alexandre « Xtincell » Djengue{f" ({ys[0]}–{ys[-1]})" if len(ys) > 1 else f" ({ys[0]})" if ys else ""}.\n\n'
                f'## Description\n\n_À documenter._\n\n## Archives\n\n- {fmt_n(f["n"])} fichiers dans les dossiers « Xtincell » des disques de travail ({fmt_types(f["types"])}).\n\n'
                f'## Sources\n\n- Archives personnelles rangées sur les disques ({DATE_RELEVE}), dossier « {key} »\n')
        stats['projets personnels créés'] += create(f'projets/{slug}', fm, body)

    # Événements couverts
    text = next((v for k, v in inv['notes'].items() if k.startswith('P:') and k.endswith('EVENEMENTS-COUVERTS.md')), None) \
        or next((v for k, v in inv['notes'].items() if k.endswith('EVENEMENTS-COUVERTS.md')), '')
    org_aliases = []
    for rel, fm in existing.items():
        if rel.startswith('organisations/'):
            slug = rel.split('/')[1]
            org_aliases.append((fm.get('nom', slug), slug))
    for name, slug in list(ALIAS.items()) + [(n, s) for s, n in names.items()]:
        if not name.startswith('_'):
            base = re.sub(r'\s*\(.*?\)', '', name)
            org_aliases.append((base, slug))
            org_aliases.append((base.split(' — ')[0].strip(), slug))      # « DOMAF — Conseil… » → « DOMAF »
            org_aliases.append((re.sub(r'\s+\d{4}$', '', base), slug))   # « Dena Mwana 2021 » → « Dena Mwana »
    org_aliases += [('CFI', 'talk-paix-cfi'), ('Talk Paix', 'talk-paix-cfi'), ('KOF', 'kamer-otaku-festival'), ('Kamer Otaku', 'kamer-otaku-festival'),
                    ('Universal Music', 'universal-music-africa'), ('MTN', 'mtn-cameroon'), ('Stéphane Nounamo', 'student-photographer-stephane-nounamo'),
                    ('Hennessy', 'artistry-hennessy'), ('Singleton', 'singleton-diageo'), ('Omenkart', 'omenkart'), ('Street Whale', 'ammco')]
    org_aliases = sorted({(a, s) for a, s in org_aliases if len(a) >= 3 and os.path.exists(os.path.join(WIKI, 'organisations', s + '.md')) or DRY}, key=lambda x: (-len(x[0]), x[0]))
    for ev in parse_events(text):
        if EVT_PRIVE.search(ev['titre'] + ' ' + ev['client']):
            stats['événements privés ignorés'] += 1; continue
        client = None
        if not re.match(r'^(non identifié|non lu|non lisible|privé)', ev['client'], re.I):
            for alias, slug in org_aliases:
                if re.search(rf'(?<!\w){re.escape(alias)}(?!\w)', ev['client'], re.I):
                    client = slug; break
        parent = None
        for pat, fn in EVT_PARENT:
            if re.search(pat, ev['titre'] + ' ' + ev['client']):
                parent = fn(ev['year']); break
        if parent and not os.path.exists(os.path.join(WIKI, 'projets', parent + '.md')):
            parent = None
        if not parent and client and os.path.exists(os.path.join(WIKI, 'projets', f'{client}-travaux.md')):
            parent = f'{client}-travaux'
        confirme = ev['fiabilite'].lower().startswith('confirmé') and client
        pslug = f"evt-{(ev['iso'] or str(ev['year'] or 'sans-date'))}-{slugify(ev['titre'])}"[:72].rstrip('-')
        fm = {'type': 'projet', 'titre': ev['titre'], 'categorie': 'evenement', 'casquette': 'execution', 'debut': ev['iso'] or ev['year'],
              'date': ev['date_txt'], 'client': client, 'chaine': ['upgraders'] if client else None, 'parent': parent, 'role': 'Couverture photo et vidéo',
              'sources': ['disques:evenements-couverts'], 'etat': 'standard' if confirme else 'a-verifier',
              'verifier': None if confirme else [f'Fiabilité selon les notes de rangement : {ev["fiabilite"] or "non précisée"}.' + ('' if client else f' Organisateur : {ev["client"] or "inconnu"}.')]}
        lines = [f'# {ev["titre"]}', '', INFOBOX, '',
                 f'**{ev["titre"]}** est un événement couvert en photo et en vidéo par Alexandre « Xtincell » Djengue ({ev["date_txt"]}).', '', '## Description', '']
        for label, val in (('Lieu', ev['lieu']), ('Organisateur ou client', ev['client']), ('Ce que montrent les images', ev['photos'])):
            if val: lines.append(f'- **{label}** : {val}')
        lines += [f'  - {a}' for a in ev['aussi']]
        if ev['identification']: lines.append(f'- **Identification** : {ev["identification"]}')
        if ev['fiabilite']: lines.append(f'- **Fiabilité** : {ev["fiabilite"]}')
        if ev['dossiers']:
            lines += ['', '## Archives', ''] + [f'- `{p.split(chr(92), 2)[-1]}` ({fmt_n(int(n))} fichiers, disque {p[0]}:)' for p, n in ev['dossiers'] if not PRIVE.search(p)]
        lines += ['', '## Sources', '', f'- Notes « Événements couverts » établies lors du rangement des disques (28/10/2026), à partir des images, des dates de prise de vue et des livrables']
        stats['événements créés'] += create(f'projets/{pslug}', fm, '\n'.join(lines) + '\n')

    for k, v in sorted(stats.items()):
        print(f'{k} : {v}')
    print('Terminé.' + (' (simulation : rien écrit)' if DRY else ' Lancer maintenant : npm run wiki'))

DRY = False
if __name__ == '__main__':
    main()
