"""Verify exports, transparency, original silhouette and the periodic seam."""
from pathlib import Path
from PIL import Image,ImageChops
from collections import Counter
import subprocess,os,io,re,json,platform

ROOT=Path(__file__).resolve().parent.parent
FFMPEG=os.environ['FFMPEG'];V=ROOT/'verification'
def identical(a,b):
    return not any(c.getbbox() for c in ImageChops.difference(Image.open(a).convert('RGBA'),Image.open(b).convert('RGBA')).split())

report={'final_pixel_identical_to_original_svg':identical(V/'end-alpha.png',V/'original-reference.png'),
        'loop_0_and_4_seconds_pixel_identical':identical(V/'loop-0.00.png',V/'loop-4.00.png'),
        'ui':json.loads((V/'ui.json').read_text()),'exports':[]}
assert report['final_pixel_identical_to_original_svg']
assert report['loop_0_and_4_seconds_pixel_identical']
manifest=json.loads((ROOT/'exports/manifest.json').read_text());assert len(manifest)==18
for item in manifest:
    file=ROOT/'exports'/item['file']
    raw=subprocess.run([FFMPEG,'-hide_banner','-i',str(file)],capture_output=True,text=True)
    metadata=raw.stderr
    assert f"{item['width']}x{item['height']}" in metadata,(file,metadata)
    assert '60 fps' in metadata,(file,metadata)
    assert 'Audio:' not in metadata,(file,metadata)
    # Decode the entire stream to catch truncation and corrupt packets, and count frames.
    count=subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-i',str(file),'-map','0:v:0','-progress','pipe:1','-f','null','-'],capture_output=True,text=True,check=True)
    decoded=int(re.findall(r'frame=(\d+)',count.stdout)[-1]);assert decoded==item['frames'],(file,decoded)
    record={**item,'decoded_frames':decoded,'no_audio':True}
    opts=['-c:v','libvpx-vp9'] if file.suffix=='.webm' else []
    result=subprocess.run([FFMPEG,'-hide_banner','-loglevel','error',*opts,'-i',str(file),'-ss',str(item['seconds']-.2),'-frames:v','1','-f','image2pipe','-vcodec','png','-pix_fmt','rgba','-'],capture_output=True,check=True)
    im=Image.open(io.BytesIO(result.stdout)).convert('RGBA')
    if item['alpha']:
        alpha=im.getchannel('A');assert alpha.getextrema()==(0,255),(file,alpha.getextrema())
        assert im.getpixel((0,0))[3]==0
        record['alpha_range']=[0,255]
        if file.suffix=='.mov':assert 'prores (4444)' in metadata
    else:
        color=im.getpixel((0,0));record['night_background_rgba']=list(color)
        assert max(abs(a-b) for a,b in zip(color,(10,14,26,255)))<=3,(file,color)
    report['exports'].append(record)
    print('Verified '+file.name,flush=True)
report['tools']={'ffmpeg':subprocess.run([FFMPEG,'-version'],capture_output=True,text=True).stdout.splitlines()[0],'python':platform.python_version(),'puppeteer':'24.42.0'}
report['all_passed']=True
(V/'rapport.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print('All verifications passed.',flush=True)
