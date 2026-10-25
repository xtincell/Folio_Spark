"""Extract the nine disconnected painted parts from the generated RGBA master.
Usage: python scripts/prepare-xtincell-character.py path/to/master.png
Requires Pillow, numpy and scipy; used only to prepare artwork, never at runtime.
"""
from pathlib import Path
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage

source=Path(sys.argv[1])
out=Path('public/character/xtincell')
out.mkdir(parents=True,exist_ok=True)
im=Image.open(source).convert('RGBA')
arr=np.asarray(im)
labels,_=ndimage.label(arr[:,:,3]>32)
parts=[]
for index,sl in enumerate(ndimage.find_objects(labels),1):
 if sl and (sl[0].stop-sl[0].start)*(sl[1].stop-sl[1].start)>20000:
  parts.append((index,sl))
parts.sort(key=lambda p:(p[1][0].start,p[1][1].start))
names=['head','torso','pelvis','leg-right','upper-arm-right','forearm-right','leg-left','upper-arm-left','forearm-left']
assert len(parts)==len(names), f'Expected 9 isolated parts; got {len(parts)}'
meta={}
clean_sheet=Image.new('RGBA',im.size)
for name,(index,sl) in zip(names,parts):
 crop=np.array(im.crop((sl[1].start,sl[0].start,sl[1].stop,sl[0].stop)))
 # Preserve original antialiasing around this component, exclude other pieces.
 region=labels[sl]
 keep=ndimage.binary_dilation(region==index,iterations=3)
 crop[:,:,3]=np.where(keep,crop[:,:,3],0)
 # Clean the preparation caps: fabric joints are fabric, not skin discs.
 yy,xx=np.indices(crop.shape[:2])
 skin=(crop[:,:,0].astype(float)>crop[:,:,1]*1.4)&(crop[:,:,0].astype(float)>crop[:,:,2]*2)&(crop[:,:,3]>0)
 if name=='torso':
  garment=((xx<80)|(xx>315))&(yy>80)&(yy<255)|(yy>390)
  crop[skin&garment,:3]=(29,24,27)
 elif name=='pelvis': crop[skin,:3]=(40,34,36)
 elif name.startswith('leg-'): crop[skin&(yy<75),:3]=(40,34,36)
 elif name=='head': crop[yy>400,3]=0
 # Remove the drawn hinge lines inside the arm's overlapping circular ends.
 joints={
  'upper-arm-right':[(153,30,34,30),(74,345,40,29)],
  'upper-arm-left':[(33,26,35,30),(111,338,43,30)],
  'forearm-right':[(63,24,34,29)],
  'forearm-left':[(120,26,35,30)],
 }
 for cx,cy,rx,ry in joints.get(name,[]):
  joint=((xx-cx)/rx)**2+((yy-cy)/ry)**2<=1
  crop[joint&(crop[:,:,3]>0),:3]=(220,121,57)
 piece=Image.fromarray(crop)
 clean_sheet.alpha_composite(piece,(sl[1].start,sl[0].start))
 piece.save(out/f'{name}.webp',format='WEBP',quality=94,method=6)
 meta[name]={'file':f'{name}.webp','width':piece.width,'height':piece.height,'sourceBox':[sl[1].start,sl[0].start,sl[1].stop,sl[0].stop]}
# A small transparent contact sheet remains the editable assembly reference.
clean_sheet.thumbnail((1024,1024))
clean_sheet.save(out/'parts-sheet.webp',format='WEBP',quality=92,method=6)
(out/'parts.json').write_text(json.dumps(meta,indent=2)+'\n')
print(json.dumps(meta,indent=2))
print('Total webp bytes',sum(p.stat().st_size for p in out.glob('*.webp')))
