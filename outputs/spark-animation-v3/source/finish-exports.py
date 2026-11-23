from pathlib import Path
from PIL import Image
import subprocess,os,json
R=Path(__file__).resolve().parent.parent;OUT=R/'exports';FF=os.environ['FFMPEG']
manifest=json.loads((OUT/'manifest.json').read_text())
for aspect,(w,h) in {'16x9':(1920,1080),'1x1':(1080,1080),'9x16':(1080,1920)}.items():
    name=f'spark-film-{aspect}-nuit.mp4';lst=R/'verification'/f'concat-{aspect}.txt'
    lst.write_text(''.join(f"file '{(OUT/f'spark-{mode}-{aspect}-nuit.mp4').resolve()}'\n" for mode in ['apparition','boucle']))
    subprocess.run([FF,'-v','error','-y','-f','concat','-safe','0','-i',str(lst),'-c','copy','-movflags','+faststart',str(OUT/name)],check=True)
    manifest=[x for x in manifest if x['file']!=name]+[{'file':name,'width':w,'height':h,'fps':60,'seconds':7.2,'frames':432,'alpha':False,'bytes':(OUT/name).stat().st_size}]
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
# A compact preview is derived from the final frames, without an extra generation.
frames=[]
for mode in ['apparition','boucle']:
    for p in sorted((R/'frames'/mode).glob('*.png'))[::3]:
        im=Image.open(p).convert('RGBA');bg=Image.new('RGBA',im.size,(10,14,26,255));bg.alpha_composite(im);frames.append(bg.resize((540,540),Image.Resampling.LANCZOS).convert('RGB'))
frames[0].save(R/'apercu.gif',save_all=True,append_images=frames[1:],duration=50,loop=0,optimize=True)
print('Three full films and a 7.2-second preview created.')
