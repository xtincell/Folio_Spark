"""Encode the deterministic PNG renders. Python standard library only.

FFMPEG=/path/to/ffmpeg python3 source/encode.py
Requires a build with libx264, libvpx-vp9 and prores_ks.
"""
from pathlib import Path
import os, shutil, subprocess, time, json, sys

ROOT = Path(__file__).resolve().parent.parent
FFMPEG = os.environ.get('FFMPEG') or shutil.which('ffmpeg')
if not FFMPEG:
    raise SystemExit('Set FFMPEG to the absolute path of an FFmpeg executable.')
FPS = int(os.environ.get('FPS', '60'))
OUT = ROOT/'exports'
OUT.mkdir(exist_ok=True)
formats = {'16x9':(1920,1080), '1x1':(1080,1080), '9x16':(1080,1920)}
night_only='--night-only' in sys.argv
manifest=json.loads((OUT/'manifest.json').read_text()) if night_only else []
start=time.time()
for mode,seconds in [('apparition',4.2),('boucle',3.0)]:
    for aspect,(width,height) in formats.items():
        inputs=['-framerate',str(FPS),'-i',str(ROOT/'frames'/mode/'%04d.png')]
        pad=f'pad={width}:{height}:(ow-iw)/2:(oh-ih)/2:color=black@0'
        variants={
            'nuit.mp4': (
                ['-f','lavfi','-i',f'color=c=0x0A0E1A:s={width}x{height}:r={FPS},format=rgba'],
                ['-filter_complex',f'[0:v]format=rgba,{pad}[logo];[1:v][logo]overlay=shortest=1:format=auto,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]','-map','[v]',
                 '-c:v','libx264','-preset','medium','-crf','16','-movflags','+faststart','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709']),
            'alpha.webm': (
                [],['-vf',f'format=rgba,{pad},format=yuva420p','-c:v','libvpx-vp9','-lossless','1','-b:v','0','-row-mt','1','-deadline','good','-cpu-used','4','-auto-alt-ref','0','-metadata:s:v:0','alpha_mode=1']),
            'alpha.mov': (
                [],['-vf',f'format=rgba,{pad},format=yuva444p10le','-c:v','prores_ks','-profile:v','4','-alpha_bits','16','-vendor','apl0'])
        }
        for suffix,(extra,options) in variants.items():
            if night_only and suffix!='nuit.mp4': continue
            name=f'spark-{mode}-{aspect}-{suffix}';dest=OUT/name
            cmd=[FFMPEG,'-hide_banner','-loglevel','error','-y',*inputs,*extra,*options,'-threads','4','-an','-frames:v',str(round(seconds*FPS)),str(dest)]
            subprocess.run(cmd,check=True)
            item={'file':name,'width':width,'height':height,'fps':FPS,'seconds':seconds,'frames':round(seconds*FPS),'alpha':'alpha' in suffix,'bytes':dest.stat().st_size}
            manifest=[entry for entry in manifest if entry['file']!=name]+[item]
            print(f'{name}: {dest.stat().st_size/1e6:.1f} MB / elapsed {time.time()-start:.0f}s',flush=True)
            (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Requested exports complete.',flush=True)
