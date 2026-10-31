"""Transport adapter for the unmodified, archived Bio runtime."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import zipfile

BASE = Path(__file__).resolve().parent
ARCHIVE = BASE / 'SEAM_Archive/SEAM_Famotidine_Ammonia_Perturbation_Engineering_Archive_v1/01_original_runtime/SEAM_DRUG_STRUCTURAL_RUNTIME_LOCKED_v3_12.zip'
RUNTIME_NAME = 'SEAM_DRUG_STRUCTURAL_RUNTIME_LOCKED_v3_12'


class BioRuntime:
    def __init__(self, runtime=None):
        self.storage = tempfile.TemporaryDirectory(prefix='seam-bio-')
        if runtime:
            self.root = Path(runtime).resolve()
        else:
            # The original archive preserves the locked bytes across Git line-ending conversions.
            with zipfile.ZipFile(ARCHIVE) as archive:
                destination = Path(self.storage.name).resolve()
                for member in archive.namelist():
                    if not (destination / member).resolve().is_relative_to(destination):
                        raise RuntimeError('Invalid runtime archive path')
                archive.extractall(destination)
            self.root = destination / RUNTIME_NAME
        manifest = json.loads((self.root / 'LOCK.json').read_text(encoding='utf-8'))
        for name, expected in manifest['files'].items():
            path = (self.root / name).resolve()
            if not path.is_relative_to(self.root) or not path.is_file():
                raise RuntimeError(f'Runtime artifact missing: {name}')
            if hashlib.sha256(path.read_bytes()).hexdigest() != expected:
                raise RuntimeError(f'Runtime artifact changed: {name}')

    def invoke(self, compounds, validate=False):
        completed = subprocess.run(
            [sys.executable, str(Path(__file__).resolve()), str(self.root),
             'validate' if validate else 'run'],
            input=json.dumps(compounds), capture_output=True, text=True,
            encoding='utf-8', timeout=600,
            env={**os.environ, 'PYTHONDONTWRITEBYTECODE': '1', 'PYTHONUTF8': '1'},
        )
        if completed.returncode:
            raise ValueError(completed.stderr.strip() or 'Bio runtime failed')
        return json.loads(completed.stdout)


def worker():
    root = Path(sys.argv[1]).resolve()
    sys.path.insert(0, str(root))
    from engine.inputs import parse_dose, parse_interval, resolve_compound
    from engine.full_sider import load_lock
    from engine.run import run
    compounds = json.load(sys.stdin)
    lock = load_lock(root / 'data/prescreen.lock')
    for item in compounds:
        resolve_compound(item['compound'], root, lock)
        parse_dose(item['dose'])
        parse_interval(item['interval'])
    if sys.argv[2] == 'validate':
        print(json.dumps({'valid': True}))
        return
    results = []
    with tempfile.TemporaryDirectory(prefix='seam-bio-result-') as output:
        for index, item in enumerate(compounds):
            result = run(item['compound'], item['dose'], item['interval'],
                         str(Path(output) / str(index)), make_pdf=False)
            if not result.get('complete') or len(result.get('all_rows', [])) != 5734:
                raise RuntimeError('Incomplete engine result')
            results.append(result)
    print(json.dumps({'schema': 'SEAM_BIO_NATIVE_RESULTS_V1',
                     'reference_mode': 'retained_locked_snapshot',
                     'batch_mode': 'independent_compound_runs', 'results': results}))


if __name__ == '__main__':
    try:
        worker()
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)
