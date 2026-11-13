"""Build exact-input public lookup results with the unchanged private Bio runtime."""
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import tempfile

from bio_runtime import BioRuntime


def validate_cases(cases):
    if not isinstance(cases, list) or not cases:
        raise ValueError('At least one explicit lookup case is required')
    ids, inputs = set(), set()
    for case in cases:
        if set(case) != {'id', 'label', 'compound', 'dose', 'interval'}:
            raise ValueError('Each case requires id, label, compound, dose, interval')
        if any(not isinstance(value, str) or not value.strip() for value in case.values()):
            raise ValueError('Case fields must be nonempty strings')
        if not re.fullmatch(r'[a-z0-9][a-z0-9_-]{0,99}', case['id']):
            raise ValueError('Invalid case id')
        key = tuple(case[field] for field in ('compound', 'dose', 'interval'))
        if case['id'] in ids or key in inputs:
            raise ValueError('Duplicate lookup case')
        ids.add(case['id'])
        inputs.add(key)
    return cases


def publish(cases_path, output, revision):
    cases = validate_cases(json.loads(cases_path.read_text(encoding='utf-8'))['cases'])
    runtime = BioRuntime()
    generated = datetime.now(timezone.utc).isoformat()
    # Generate everything before changing the publish tree. A failure leaves the last
    # successful public dataset intact. Never publish archives, locks, or engine code.
    with tempfile.TemporaryDirectory(prefix='bio-publish-') as staging:
        stage = Path(staging)
        index = {'schema': 'SEAM_BIO_LOOKUP_V1', 'generated_utc': generated,
                 'source_revision': revision, 'reference_mode': 'retained_locked_snapshot',
                 'batch_mode': 'independent_compound_runs', 'cases': []}
        for case in cases:
            inputs = {key: case[key] for key in ('compound', 'dose', 'interval')}
            result = runtime.invoke([inputs])
            if result.get('schema') != 'SEAM_BIO_NATIVE_RESULTS_V1':
                raise ValueError('Unexpected result schema')
            rows = result.get('results', [])
            if len(rows) != 1 or rows[0].get('complete') is not True or len(rows[0].get('all_rows', [])) != 5734:
                raise ValueError('Incomplete native result')
            result.update(lookup_input=inputs, generated_utc=generated, source_revision=revision)
            filename = case['id'] + '.json'
            (stage / filename).write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
            index['cases'].append({**case, 'file': filename})
        output.mkdir(parents=True, exist_ok=True)
        for file in stage.iterdir():
            (output / file.name).write_bytes(file.read_bytes())
        # Publish index last. Git commits make the complete dataset available together.
        (output / 'index.json').write_text(json.dumps(index, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Generated {len(cases)} complete native lookup results')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cases', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--revision', required=True)
    args = parser.parse_args()
    publish(args.cases, args.output, args.revision)
