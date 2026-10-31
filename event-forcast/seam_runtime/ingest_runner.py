#!/usr/bin/env python3
import argparse, json
from pathlib import Path
from seam_engine import append_single_datum
p=argparse.ArgumentParser(description='Append one raw datum to an ARCV manifold, suppressing exact duplicates.')
p.add_argument('datum')
p.add_argument('--manifold', default='manifold.arcv')
a=p.parse_args()
raw=Path(a.datum).read_bytes()
print(json.dumps(append_single_datum(a.manifold, raw, Path(a.datum).name), indent=2))
