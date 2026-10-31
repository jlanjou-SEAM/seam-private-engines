#!/usr/bin/env python3
"""Bio API: submit explicit inputs to the retained runtime and return native results."""
import argparse
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import threading
import time
import uuid

from flask import Flask, jsonify, request
from flask_cors import CORS
from bio_runtime import BioRuntime

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 32768
CORS(app, origins=os.environ.get('SEAM_BIO_ORIGINS',
     'https://jlanjou-seam.github.io,http://localhost:8000,http://127.0.0.1:8000').split(','))
runtime = None
runtime_error = 'Runtime has not been initialized'
tasks = {}
tasks_lock = threading.Lock()
MAX_ACTIVE = 2
MAX_TASKS = 20
TASK_TTL = 1800


def configure_runtime(path=None):
    global runtime, runtime_error
    try:
        runtime = BioRuntime(path or os.environ.get('SEAM_BIO_RUNTIME'))
        runtime_error = None
    except Exception as exc:
        runtime = None
        runtime_error = str(exc)


@app.get('/health')
def health():
    ready = runtime is not None
    return jsonify(status='ok' if ready else 'unavailable',
                   runtime_configured=ready, runner_available=ready,
                   result_schema='SEAM_BIO_NATIVE_RESULTS_V1',
                   reference_mode='retained_locked_snapshot',
                   required_inputs=['compound', 'dose', 'interval'],
                   error=runtime_error), 200 if ready else 503


def catalog(filename, key):
    data = json.loads((Path(__file__).parent / filename).read_text(encoding='utf-8'))
    return jsonify({key: data[key], 'count': len(data[key])})


@app.get('/compounds')
def compounds():
    return catalog('SEAM_common_drugs_supplements_choice_registry_v1.json', 'compounds')


@app.get('/conditions')
def conditions():
    return catalog('conditions_database.json', 'conditions')


def validate_request(data):
    if not isinstance(data, dict) or set(data) != {'compounds'}:
        raise ValueError('Provide compounds with compound, dose, and interval; condition profiles are not runtime inputs.')
    values = data['compounds']
    if not isinstance(values, list) or not 1 <= len(values) <= 10:
        raise ValueError('Provide 1 to 10 compounds. Each is evaluated independently.')
    for item in values:
        if not isinstance(item, dict) or set(item) != {'compound', 'dose', 'interval'}:
            raise ValueError('Each compound requires exactly compound, dose, and interval.')
        if any(not isinstance(v, str) or not v.strip() or len(v) > 160 for v in item.values()):
            raise ValueError('Compound, dose, and interval must be nonempty text, at most 160 characters each.')
    return values


def prune_tasks():
    now = time.monotonic()
    for key in list(tasks):
        if tasks[key]['status'] in ('completed', 'failed') and now - tasks[key]['updated'] > TASK_TTL:
            del tasks[key]


@app.post('/analyze')
def analyze():
    if runtime is None:
        return jsonify(error='Bio runtime unavailable'), 503
    try:
        values = validate_request(request.get_json(silent=True))
    except ValueError as exc:
        return jsonify(error=str(exc)), 400
    with tasks_lock:
        prune_tasks()
        active = sum(t['status'] in ('queued', 'running') for t in tasks.values())
        if active >= MAX_ACTIVE or len(tasks) >= MAX_TASKS:
            return jsonify(error='Analysis capacity reached. Please retry later.'), 429
        task_id = uuid.uuid4().hex
        tasks[task_id] = {'task_id': task_id, 'status': 'queued', 'progress': 0,
                          'result': None, 'error': None, 'updated': time.monotonic()}
    # Capture the reference so a future update cannot change an in-flight run.
    threading.Thread(target=execute_analysis, args=(task_id, values, runtime), daemon=True).start()
    return jsonify(task_id=task_id, status='queued'), 202


def execute_analysis(task_id, values, active_runtime):
    with tasks_lock:
        tasks[task_id].update(status='running', progress=5)
    try:
        result = active_runtime.invoke(values)
        result['completed_utc'] = datetime.now(timezone.utc).isoformat()
        with tasks_lock:
            tasks[task_id].update(status='completed', progress=100, result=result,
                                  updated=time.monotonic())
    except Exception as exc:
        with tasks_lock:
            tasks[task_id].update(status='failed', error=str(exc), updated=time.monotonic())


@app.get('/results/<task_id>')
def results(task_id):
    with tasks_lock:
        prune_tasks()
        task = tasks.get(task_id)
        if task is None:
            return jsonify(error='Task not found or expired'), 404
        response = jsonify({k: v for k, v in task.items() if k != 'updated'})
        response.headers['Cache-Control'] = 'no-store'
        return response


@app.get('/docs')
def docs():
    return jsonify(required_inputs=['compound', 'dose', 'interval'],
                   result_schema='SEAM_BIO_NATIVE_RESULTS_V1',
                   reference_mode='retained_locked_snapshot',
                   batch_mode='independent_compound_runs',
                   endpoints=['GET /health', 'GET /compounds', 'GET /conditions',
                              'POST /analyze', 'GET /results/<task_id>'])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--runtime', help='Verified runtime directory; defaults to repository archive')
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=5000)
    args = parser.parse_args()
    configure_runtime(args.runtime)
    if runtime is None:
        raise SystemExit(runtime_error)
    app.run(host=args.host, port=args.port, threaded=True)


if __name__ == '__main__':
    main()
