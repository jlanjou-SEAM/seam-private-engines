#!/usr/bin/env python3
"""Execute operator diagnostics; do not manufacture event predictions.

Official observations are acquired separately by publish_live_feed.py.
Historical event records are not modified by this runner.
"""
import json
import os
from pathlib import Path
import subprocess
import sys

BASE = Path(__file__).resolve().parent
SEAM_RUNTIME = Path(os.environ.get('SEAM_RUNTIME_PATH', BASE / 'seam_runtime'))
MANIFOLD_FILE = Path(os.environ.get('MANIFOLD_PATH', BASE / 'continuum/output/manifold.arcv'))


def validate_analysis(analysis):
    operators = analysis.get('operators')
    if not isinstance(operators, list) or len(operators) != 66:
        raise ValueError('Expected 66 operator diagnostic results')
    if any(type(row.get('requirements_satisfied')) is not bool for row in operators):
        raise ValueError('Invalid operator disposition')
    resolved = sum(row['requirements_satisfied'] for row in operators)
    if analysis.get('resolved') != resolved or analysis.get('unresolved') != 66-resolved:
        raise ValueError('Operator counts disagree with diagnostic records')
    entries = analysis.get('manifold_entry_count')
    if type(entries) is not int or entries <= 0:
        raise ValueError('No manifold entries were evaluated')
    return analysis


def run_analysis():
    runner = SEAM_RUNTIME / 'question_runner.py'
    if not runner.is_file():
        raise FileNotFoundError(f'Runtime runner missing: {runner}')
    if not MANIFOLD_FILE.is_file():
        raise FileNotFoundError(f'Manifold missing: {MANIFOLD_FILE}')
    output = SEAM_RUNTIME / 'volcanic_analysis.json'
    # A previous generated diagnostic cannot stand in for this run.
    output.unlink(missing_ok=True)
    subprocess.run([
        sys.executable, str(runner.resolve()),
        'What volcanic events are currently active in the collected observations?',
        '--manifold', str(MANIFOLD_FILE.resolve()), '--json-out', str(output.resolve()),
    ], cwd=SEAM_RUNTIME, check=True, timeout=300)
    analysis = validate_analysis(json.loads(output.read_text(encoding='utf-8')))
    print(f"Operator diagnostics complete: {analysis['resolved']} resolved, "
          f"{analysis['unresolved']} unresolved, {analysis['manifold_entry_count']} entries. "
          'These diagnostics are not event predictions.')
    return analysis


if __name__ == '__main__':
    run_analysis()
