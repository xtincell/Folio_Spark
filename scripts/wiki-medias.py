#!/usr/bin/env python3
# =============================================================================
# wiki-medias — extrait une sélection d'images des disques pour chaque fiche.
#
#   python scripts/wiki-medias.py            # extrait ce qui manque
#   python scripts/wiki-medias.py --force    # refait toutes les sélections
#   python scripts/wiki-medias.py --dry      # liste sans écrire
#   puis : npm run wiki
#
# LECTURE SEULE sur les disques C:, E:, P:. Pour chaque fiche liée à un dossier
# de travail (événements, « travaux », projets personnels…), choisit jusqu'à
# N images réparties sur tout le dossier, les redresse, les réduit (1 200 px)
# et les écrit en WebP dans public/medias-wiki/<projets|organisations>/<slug>/.
# Les RAW (CR2/CR3/NEF/ARW/DNG) passent par leur aperçu JPEG intégré
# (exiftool) ; un dossier sans photo donne une image clé de vidéo (ffmpeg).
# Jamais de pièces administratives ni de commandes privées.
# =============================================================================
import importlib.util, io, os, re, shutil, subprocess, sys
from PIL import Image, ImageOps

sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
WIKI = os.path.join(REPO, 'wiki')
OUT = os.path.join(REPO, 'public', 'medias-wiki')
FORCE, DRY = '--force' in sys.argv, '--dry' in sys.argv
MAX_SIDE, QUALITY = 1200, 64
PER = {'evt': 6, 'travaux': 6, 'perso': 4, 'autre': 6}

spec = importlib.util.spec_from_file_location('disques', os.path.join(HERE, 'wiki-disques.py'))
D = importlib.util.module_from_spec(spec)
spec.loader.exec_module(D)

IMG = {'.jpg', '.jpeg', '.png', '.webp'}
RAW = {'.cr2', '.cr3', '.nef', '.arw', '.dng', '.raf'}
VID = {'.mp4', '.mov', '.m4v', '.mts'}
PSD = {'.psd'}
DOC = {'.pdf', '.ai'}
# PDF : seulement les documents de création (jamais factures, devis, contrats, briefs).
DOC_OK = re.compile(r'présentation|presentation|charte|brand|logo|brochure|plaquette|catalogue|affiche|poster|flyer|menu|kv|visuel|portfolio|book|guide|identit|packaging|étiquette|mockup', re.I)
DOC_NO = re.compile(r'factur|invoice|devis|quote|contrat|contract|reçu|receipt|proforma|bon de commande|cahier des charges|brief|cv|rib|statuts|attestation', re.I)
SKIP_DIR = re.compile(D.PRIVE.pattern + r'|commandes privées|lightroom|previews|auto-save|node_modules|\.git|captures? d.écran|screenshots?|copies reçues|documents?|téléchargements?|downloads?|reçus?|scans?|whatsapp|telegram|_à identifier|à identifier', re.I)
PREFER = re.compile(r'export|sélection|selection|select|jpg|final|livr|best', re.I)

def tool(name):
    return shutil.which(name) or next((p for p in (
        os.path.expandvars(rf'%LOCALAPPDATA%\Microsoft\WinGet\Links\{name}.exe'),
        os.path.expandvars(rf'%LOCALAPPDATA%\Programs\ExifTool\{name}.exe'),
    ) if os.path.exists(p)), None)
EXIFTOOL, FFMPEG = tool('exiftool'), tool('ffmpeg')

# ----------------------------------------------------------------- fiche → dossiers
def targets():
    """Retourne {clé de fiche: [dossiers]} pour toutes les fiches reliées aux disques."""
    t = {}
    def add(key, path, kind):
        if os.path.exists(os.path.join(WIKI, key + '.md')) and os.path.isdir(path):
            t.setdefault(key, {'paths': [], 'kind': kind})['paths'].append(path)
    for disk, root, struct in D.ROOTS:
        if not os.path.isdir(root):
            continue
        for cl in sorted(os.scandir(root), key=lambda e: e.name):
            if not cl.is_dir() or cl.name in D.SKIP_CLIENTS:
                continue
            name = cl.name
            if name == 'Xtincell':
                for key, (slug, *_r) in D.PERSO.items():
                    add(f'projets/{slug}', os.path.join(cl.path, *key.split('/')), 'perso')
                continue
            if name == 'Friends Photography Studio':
                add('projets/orange-evenements-2025-2026', os.path.join(cl.path, 'Orange Cameroun'), 'travaux')
                continue
            if name.startswith('_'):
                continue
            if name in D.AS_PROJECT:
                add(f'projets/{D.AS_PROJECT[name]}', cl.path, 'travaux'); continue
            slug = D.ALIAS.get(name, D.slugify(re.sub(r'\s*\((?:nom à confirmer)\)', '', name)))
            add(f'projets/{slug}-travaux', cl.path, 'travaux')
    # événements : dossiers cités dans la section « Archives » de chaque fiche
    for f in os.listdir(os.path.join(WIKI, 'projets')):
        if not f.startswith('evt-'):
            continue
        src = open(os.path.join(WIKI, 'projets', f), encoding='utf-8').read()
        for rel, disk in re.findall(r'- `([^`]+)` \([\d  ]+ fichiers, disque ([A-Z]):\)', src):
            add(f'projets/{f[:-3]}', rf'{disk}:\UPGRADERS — EXPORT DU TRAVAIL\{rel}', 'evt')
    return t

# ----------------------------------------------------------------- sélection
def candidates(paths):
    """Fichiers image / RAW / vidéo, groupés par sous-dossier de premier niveau."""
    groups = {}
    for base in paths:
        for dirpath, dirnames, files in os.walk(base):
            rel = os.path.relpath(dirpath, base)
            if SKIP_DIR.search(rel if rel != '.' else ''):
                dirnames[:] = []; continue
            dirnames[:] = [d for d in dirnames if not SKIP_DIR.search(d)]
            top = rel.split(os.sep)[0] if rel != '.' else ''
            for fn in files:
                ext = os.path.splitext(fn)[1].lower()
                if ext in IMG or ext in RAW or ext in VID or ext in PSD or (ext in DOC and not DOC_NO.search(fn) and (ext == '.ai' or DOC_OK.search(fn))):
                    groups.setdefault((base, top), []).append(os.path.join(dirpath, fn))
    return groups

def pick(groups, n):
    """Répartit le choix entre sous-dossiers ; préfère les exports JPEG aux RAW."""
    def score(p):
        ext = os.path.splitext(p)[1].lower()
        try:
            size = os.path.getsize(p)
        except OSError:
            return None
        if ext in IMG and size < 40_000:
            return None  # icônes, vignettes
        return (0 if ext in IMG else 1 if ext in RAW else 2 if ext in PSD else 3 if ext in DOC else 4, 0 if PREFER.search(p) else 1)
    pools = []
    for key in sorted(groups):
        files = [(score(p), p) for p in sorted(groups[key])]
        files = [x for x in files if x[0] is not None]
        if not files:
            continue
        best = min(s for s, _ in files)
        pool = [p for s, p in files if s == best]
        step = max(1, len(pool) // (n + 1))
        pools.append(pool[step // 2::step] or pool)
    chosen, i = [], 0
    while len(chosen) < n and any(pools):
        pool = pools[i % len(pools)]
        if pool:
            chosen.append(pool.pop(len(pool) // 2 if len(chosen) < len(pools) else 0))
        i += 1
        if i > 10_000:
            break
    return chosen

# ----------------------------------------------------------------- conversion
def load(path):
    ext = os.path.splitext(path)[1].lower()
    if ext in IMG or ext in PSD:
        return Image.open(path)
    if ext in DOC:
        import fitz  # PyMuPDF
        with fitz.open(path) as doc:
            pix = doc[0].get_pixmap(dpi=110)
            return Image.open(io.BytesIO(pix.tobytes('png')))
    if ext in RAW and EXIFTOOL:
        raw = open(path, 'rb').read()  # par l'entrée standard : chemins Unicode (« → ») sans souci sous Windows
        orient = subprocess.run([EXIFTOOL, '-n', '-s3', '-Orientation', '-'], input=raw, capture_output=True, timeout=60).stdout.strip()
        for tag in ('-JpgFromRaw', '-PreviewImage', '-ThumbnailImage'):
            data = subprocess.run([EXIFTOOL, '-b', tag, '-'], input=raw, capture_output=True, timeout=60).stdout
            if len(data) > 20_000:
                img = Image.open(io.BytesIO(data))
                if img.getexif().get(0x0112, 1) != 1:
                    return ImageOps.exif_transpose(img)  # l'aperçu porte déjà son orientation
                # sinon, l'aperçu n'est pas redressé : on applique l'orientation du boîtier
                turn = {b'3': Image.Transpose.ROTATE_180, b'6': Image.Transpose.ROTATE_270, b'8': Image.Transpose.ROTATE_90}.get(orient)
                return img.transpose(turn) if turn else img
    if ext in VID and FFMPEG:
        at = 3.0
        probe = shutil.which('ffprobe') or (FFMPEG and os.path.join(os.path.dirname(FFMPEG), 'ffprobe.exe'))
        if probe and os.path.exists(probe):
            out = subprocess.run([probe, '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, timeout=60).stdout
            try:
                at = max(1.0, float(out.strip()) * 0.2)
            except ValueError:
                pass
        data = subprocess.run([FFMPEG, '-v', 'quiet', '-ss', f'{at:.1f}', '-i', path, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-'],
                              capture_output=True, timeout=120).stdout
        if data:
            return Image.open(io.BytesIO(data))
    return None

def usable(img):
    """Écarte les images presque noires ou unies (fondus vidéo, sous-expositions, aplats)."""
    from PIL import ImageStat
    probe = img.convert('L')
    probe.thumbnail((96, 96))
    st = ImageStat.Stat(probe)
    return st.mean[0] > 18 and st.stddev[0] > 6

def save(img, dst):
    img = ImageOps.exif_transpose(img)
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGBA' if 'A' in img.getbands() else 'RGB')
    img.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    img.save(dst, 'WEBP', quality=QUALITY, method=6)

def main():
    t = targets()
    print(f'{len(t)} fiches reliées à des dossiers de travail')
    made = skipped = empty = 0
    for key, info in sorted(t.items()):
        out_dir = os.path.join(OUT, *key.split('/'))
        if os.path.isdir(out_dir) and os.listdir(out_dir) and not FORCE:
            skipped += 1; continue
        want = PER.get(info['kind'], 6)
        chosen = pick(candidates(info['paths']), want * 2)
        if not chosen:
            empty += 1; print(f'  — {key} : aucune image'); continue
        if DRY:
            print(f'  {key} : {len(chosen)} images'); continue
        if FORCE and os.path.isdir(out_dir):
            shutil.rmtree(out_dir)
        os.makedirs(out_dir, exist_ok=True)
        n = 0
        for src in chosen:
            if n >= want:
                break
            try:
                img = load(src)
                if img is None or not usable(img):
                    continue
                n += 1
                save(img, os.path.join(out_dir, f'{n:02d}.webp'))
            except Exception as e:  # fichier illisible : on passe au suivant
                print(f'    ! {os.path.basename(src)} : {e.__class__.__name__}')
        made += 1 if n else 0
        print(f'  {key} : {n} images', flush=True)
    print(f'Terminé : {made} fiches illustrées, {skipped} déjà faites, {empty} sans image.' + (' (simulation)' if DRY else ''))

if __name__ == '__main__':
    main()
