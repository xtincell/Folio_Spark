from pathlib import Path
from PIL import Image
import json, sys
source = Path(sys.argv[1])
out = Path(__file__).resolve().parents[1] / 'public/character/magazine-rig'
out.mkdir(parents=True, exist_ok=True)
im = Image.open(source).convert('RGBA')
im.save(out / 'master.webp', quality=92)
boxes = {
 'head-confident': (70,10,480,450), 'head-smile': (550,10,960,450),
 'head-sly': (1030,10,1440,450), 'torso': (25,530,575,765),
 'upper-left': (720,450,905,765), 'upper-right': (1180,450,1360,765),
 'forearm': (25,800,340,970), 'hand-rest': (310,810,515,1005),
 'forearm-open': (530,800,880,970), 'hand-open': (855,790,1095,980),
 'camera': (1120,770,1525,1005),
}
for name, box in boxes.items():
 im.crop(box).save(out / (name + '.webp'), quality=94)
(out/'parts.json').write_text(json.dumps(boxes, indent=2))
print('Saved', len(boxes), 'transparent parts.')
