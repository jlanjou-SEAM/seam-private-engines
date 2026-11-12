"""Publish fresh official observations alongside, never as, native predictions."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone, timedelta
import json
from pathlib import Path
import urllib.request

SOURCES = {
    'USGS earthquakes': 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    'NWS alerts': 'https://api.weather.gov/alerts/active',
}


def utc():
    return datetime.now(timezone.utc)


def timestamp(value):
    if isinstance(value, (int, float)):
        return datetime.fromtimestamp(value / 1000, timezone.utc).isoformat()
    if isinstance(value, str):
        parsed = datetime.fromisoformat(value.replace('Z', '+00:00'))
        if parsed.tzinfo is None:
            raise ValueError('Source timestamp lacks timezone')
        return parsed.isoformat()
    return None


def observations(source, payload, fetched, now=None):
    now = now or utc()
    features = payload.get('features')
    if not isinstance(features, list):
        raise ValueError('Expected a GeoJSON feature list')
    rows = []
    for feature in features:
        props = feature.get('properties') or {}
        if source == 'USGS earthquakes':
            occurred = timestamp(props.get('time'))
            if not occurred or datetime.fromisoformat(occurred) < now - timedelta(days=1):
                continue
            rows.append({'id': str(feature.get('id')), 'provider': source,
                         'kind': 'observed_earthquake', 'title': props.get('title') or props.get('place'),
                         'area': props.get('place'), 'observed_utc': occurred,
                         'source_updated_utc': timestamp(props.get('updated')),
                         'magnitude': props.get('mag'), 'url': props.get('url'),
                         'retrieved_utc': fetched})
        else:
            if props.get('status') not in (None, 'Actual'):
                continue
            expires = timestamp(props.get('expires'))
            if expires and datetime.fromisoformat(expires) <= now:
                continue
            rows.append({'id': str(feature.get('id')), 'provider': source,
                         'kind': 'official_alert', 'title': props.get('event'),
                         'area': props.get('areaDesc'), 'severity': props.get('severity'),
                         'issued_utc': timestamp(props.get('sent')),
                         'effective_utc': timestamp(props.get('effective')),
                         'expires_utc': expires, 'url': props.get('@id') or feature.get('id'),
                         'retrieved_utc': fetched})
    return rows


def fetch_source(item):
    name, url = item
    try:
        request = urllib.request.Request(url, headers={
            'User-Agent': 'Continuum-Event-Forcast (https://github.com/jlanjou-SEAM/Continuum-Event-Forcast)',
            'Accept': 'application/geo+json, application/json',
        })
        with urllib.request.urlopen(request, timeout=25) as response:
            raw = response.read(16 * 1024 * 1024 + 1)
        if len(raw) > 16 * 1024 * 1024:
            raise ValueError('Response exceeds acquisition limit')
        fetched = utc().isoformat()
        rows = observations(name, json.loads(raw), fetched)
        return {'provider': name, 'url': url, 'status': 'ok',
                'retrieved_utc': fetched, 'record_count': len(rows)}, rows
    except Exception as exc:
        return {'provider': name, 'url': url, 'status': 'failed', 'error': str(exc)}, []


def native_predictions(tracker, now=None):
    now = now or utc()
    events = tracker.get('events', {})
    if isinstance(events, dict):
        events = events.values()
    result = []
    for event in events:
        # Official alerts cannot acquire SEAM confidence simply by entering the tracker.
        if event.get('source_type') != 'seam_prediction':
            continue
        evidence = event.get('evidence_updated_utc')
        try:
            stamp = datetime.fromisoformat(timestamp(evidence))
        except (ValueError, TypeError):
            continue
        if now - timedelta(hours=2) <= stamp <= now + timedelta(minutes=5):
            result.append(event)
    return result


def publish(tracker_path, analysis_path, output):
    tracker = json.loads(tracker_path.read_text(encoding='utf-8'))
    sources, official = [], []
    with ThreadPoolExecutor(max_workers=2) as pool:
        for status, rows in pool.map(fetch_source, SOURCES.items()):
            sources.append(status)
            official.extend(rows)
    successful = sum(source['status'] == 'ok' for source in sources)
    native = {'status': 'unavailable', 'prediction_decoder': 'not_implemented'}
    if analysis_path.is_file():
        analysis = json.loads(analysis_path.read_text(encoding='utf-8'))
        native.update(status='executed', manifold_entries=analysis.get('manifold_entry_count'),
                      resolved_operators=analysis.get('resolved'), unresolved_operators=analysis.get('unresolved'))
    events = native_predictions(tracker)
    # Bound public output without pretending the displayed subset is the complete feed.
    official.sort(key=lambda row: row.get('issued_utc') or row.get('observed_utc') or '', reverse=True)
    data = {'schema': 'SEAM_LIVE_FEED_V1', 'generated_utc': utc().isoformat(),
            'status': 'ok' if successful == len(SOURCES) else 'degraded' if successful else 'unavailable',
            'sources_loaded': successful, 'source_status': sources,
            'event_count': len(events), 'events': events,
            'official_observation_count': len(official), 'official_observations': official[:200],
            'seam_execution': native,
            'prediction_status': 'available' if events else 'No current native event predictions; event decoder is not implemented.'}
    output.parent.mkdir(parents=True, exist_ok=True)
    temp = output.with_suffix('.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    temp.replace(output)
    print(json.dumps({'status': data['status'], 'sources_loaded': successful,
                      'official_observations': len(official), 'native_predictions': len(events)}))
    return data


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--tracker', type=Path, required=True)
    parser.add_argument('--analysis', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    publish(args.tracker, args.analysis, args.output)
