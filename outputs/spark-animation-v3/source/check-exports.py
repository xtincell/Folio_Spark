from pathlib import Path
from PIL import Image
import json,subprocess,os,re
R=Path(__file__).resolve().parent.parent;FF=os.environ['FFMPEG'];report={'headers':[],'transparency':[]}
for item in json.loads((R/'exports/manifest.json').read_text()):
    p=R/'exports'/item['file'];info=subprocess.run([FF,'-hide_banner','-i',str(p)],capture_output=True,text=True).stderr
    dim=f"{item['width']}x{item['height']}";dur=re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)',info)
    seconds=int(dur[1])*3600+int(dur[2])*60+float(dur[3]) if dur else 0
    assert dim in info,(p,'dimensions');assert '60 fps' in info,(p,'fps');assert abs(seconds-item['seconds'])<.04,(p,'duration',seconds)
    report['headers'].append({'file':p.name,'dimensions':dim,'fps':60,'duration':seconds})
for ext,decoder in [('webm',['-c:v','libvpx-vp9']),('mov',[])]:
    p=R/'exports'/f'spark-apparition-1x1-alpha.{ext}';out=R/'verification'/f'decoded-alpha-{ext}.png'
    subprocess.run([FF,'-v','error','-y',*decoder,'-i',str(p),'-ss','0.7','-frames:v','1',str(out)],check=True)
    im=Image.open(out).convert('RGBA');a=im.getchannel('A');assert a.getextrema()==(0,255);assert a.getpixel((0,0))==0
    report['transparency'].append({'file':p.name,'alphaRange':a.getextrema(),'cornerAlpha':a.getpixel((0,0))})
# Decode the complete primary film to catch stream or concatenation errors.
subprocess.run([FF,'-v','error','-i',str(R/'exports/spark-film-16x9-nuit.mp4'),'-f','null','-'],check=True)
report['fullFilmDecoded']=True
(R/'verification/exports.json').write_text(json.dumps(report,indent=2)+'\n')
print(f"{len(report['headers'])} export headers verified; VP9 and ProRes transparency decoded; full film decoded.")
