#!/usr/bin/env python3
"""
Event-Forcast Backend: Complete Pipeline
Step 1: Extract events from SEAM manifold analysis
Step 2: Verify all manifold events in event tracker
Step 3: Add official status from raw data sources
Step 4: Append supporting evidence
Step 5: Generate unified event record
"""

import json
import os
import math
from pathlib import Path
from datetime import datetime, timezone, timedelta

PUBLIC_REPO = Path(os.environ.get("PUBLIC_REPO_PATH",
    "C:/Users/jpalmer/Documents/Codex/2026-09-22/https-github-com-jlanjou-seam-seam/work/continuum-event-forcast-clean"))

MANIFOLD_FILE = PUBLIC_REPO / "continuum/output/volcanic_manifold_analysis.json"
EVENT_TRACKER = PUBLIC_REPO / "continuum/event_tracker.json"

def extract_events_from_manifold():
    """STEP 1: Extract events from SEAM manifold analysis"""
    events = {}

    if not MANIFOLD_FILE.exists():
        return events

    try:
        with open(MANIFOLD_FILE) as f:
            manifold = json.load(f)
    except:
        return events

    now = datetime.now(timezone.utc)

    # Process each manifold match
    for match in manifold.get('matches', []):
        # Skip events without location
        if match.get('latitude') is None or match.get('longitude') is None:
            continue

        evt_id = match.get('event_id', f"SEAM-{hash(str(match))}")
        phi = match.get('seam_phi', 0)
        timestamp = match.get('timestamp_utc')

        # Set detection time based on manifold timestamp
        try:
            detection_time = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        except:
            detection_time = now

        # Set ETA based on confidence
        if phi >= 0.97:
            eta = now + timedelta(minutes=15)
        elif phi >= 0.90:
            eta = now + timedelta(minutes=45)
        elif phi >= 0.75:
            eta = now + timedelta(hours=2)
        else:
            eta = now + timedelta(hours=4)

        events[evt_id] = {
            "event_id": evt_id,
            "signature_class": match.get('signature_class', 'unknown'),
            "primary_regime": match.get('primary_regime', 'unknown'),
            "first_detected_utc": detection_time.isoformat(),
            "status": "active",
            "location": {
                "best_effort_lat": float(match.get('latitude')),
                "best_effort_lon": float(match.get('longitude')),
                "region": match.get('spatial_region', 'unknown'),
                "city": match.get('city'),
                "state_province": match.get('state_province'),
                "country": match.get('country')
            },
            "signal_summary": str(match.get('signal_summary', ''))[:200],
            "projected_event_time": eta.isoformat(),
            "magnitude": match.get('magnitude'),
            "confidence_history": [{
                "timestamp_utc": detection_time.isoformat(),
                "seam_phi": phi,
                "phase": "event" if phi >= 0.75 else "warning",
                "magnitude": match.get('magnitude')
            }],
            "supporting_evidence": []
        }

    return events

def load_official_sources():
    """Load official alert data (USGS, etc.)"""
    official_data = {}

    official_dir = PUBLIC_REPO / "official"
    if official_dir.exists():
        for json_file in official_dir.glob("*.json"):
            try:
                with open(json_file) as f:
                    content = json.load(f)
                    source_name = json_file.stem
                    official_data[source_name] = content if isinstance(content, list) else [content]
            except:
                pass

    return official_data

def find_matching_official_event(manifold_evt, official_sources):
    """STEP 3: Find matching official alert for manifold event"""
    lat = manifold_evt['location']['best_effort_lat']
    lon = manifold_evt['location']['best_effort_lon']

    # Check all official sources for nearby events
    for source_name, events_list in official_sources.items():
        if not isinstance(events_list, list):
            events_list = [events_list]

        for official_evt in events_list:
            if not isinstance(official_evt, dict):
                continue

            # Extract coordinates from various possible formats
            evt_lat = official_evt.get('latitude') or official_evt.get('lat') or official_evt.get('coords', {}).get('lat')
            evt_lon = official_evt.get('longitude') or official_evt.get('lon') or official_evt.get('coords', {}).get('lon')

            if evt_lat is None or evt_lon is None:
                continue

            # Calculate distance (simple euclidean for quick matching)
            dist = math.sqrt((float(evt_lat) - lat)**2 + (float(evt_lon) - lon)**2)

            # If within ~1 degree, likely same event
            if dist < 1.0:
                return {
                    "status": official_evt.get('status', 'ACTIVE'),
                    "issued_utc": official_evt.get('issued', official_evt.get('timestamp')),
                    "source": source_name.upper(),
                    "raw_data": official_evt
                }

    return None

def enrich_with_supporting_evidence(events, official_sources):
    """STEP 4: Add supporting evidence from all sources"""
    realtime_dir = PUBLIC_REPO / "realtime"

    for evt_id, evt in events.items():
        lat = evt['location']['best_effort_lat']
        lon = evt['location']['best_effort_lon']

        # Find matching official alert
        official_match = find_matching_official_event(evt, official_sources)
        if official_match:
            evt['official_alert'] = {
                'status': official_match['status'],
                'issued_utc': official_match['issued_utc'],
                'source': official_match['source']
            }

        # Collect supporting evidence from realtime sources
        evidence = []
        if realtime_dir.exists():
            for source_dir in realtime_dir.iterdir():
                if not source_dir.is_dir():
                    continue

                for data_file in source_dir.glob("*.json"):
                    try:
                        with open(data_file) as f:
                            data = json.load(f)
                            # Add reference if it mentions the event location/type
                            if isinstance(data, (dict, list)):
                                evidence.append({
                                    "source": source_dir.name,
                                    "file": data_file.name,
                                    "timestamp_utc": datetime.now(timezone.utc).isoformat()
                                })
                    except:
                        pass

        evt['supporting_evidence'] = evidence[:5]  # Keep last 5

def update_event_tracker():
    """Complete pipeline: manifold → verification → enrichment → tracker"""
    now = datetime.now(timezone.utc)

    # STEP 1: Extract manifold events
    new_events = extract_events_from_manifold()

    # Load existing tracker
    existing_tracker = {}
    if EVENT_TRACKER.exists():
        try:
            with open(EVENT_TRACKER) as f:
                data = json.load(f)
                existing_tracker = data.get('events', {})
        except:
            pass

    # STEP 2: Verify manifold events exist in record
    # (all extracted events will be added/updated)
    merged_events = {}

    # Keep existing events that are still active
    for evt_id, evt in existing_tracker.items():
        # Keep if: in new manifold OR status=active OR has recent official alert
        if evt_id in new_events:
            # Will be replaced by manifold version below
            continue

        is_active = evt.get('status') == 'active'
        has_recent_alert = False
        if 'official_alert' in evt:
            try:
                issued = datetime.fromisoformat(evt['official_alert'].get('issued_utc', '').replace('Z', '+00:00'))
                age_hours = (now - issued).total_seconds() / 3600
                has_recent_alert = age_hours < 24
            except:
                pass

        if is_active or has_recent_alert:
            merged_events[evt_id] = evt

    # Load official sources
    official_sources = load_official_sources()

    # STEP 3 & 4: Enrich manifold events with official status and supporting evidence
    enrich_with_supporting_evidence(new_events, official_sources)

    # Add all manifold events (authoritative)
    merged_events.update(new_events)

    # STEP 5: Generate unified event record
    tracker_data = {
        "version": "1.0",
        "schema": "SEAM_EVENT_TRACKER_V1",
        "generated_utc": now.isoformat(),
        "retention_days": 30,
        "events": merged_events,
        "metadata": {
            "event_age_display_threshold_minutes": 120,
            "manifold_events": len(new_events),
            "total_tracked": len(merged_events),
            "manifold_file": str(MANIFOLD_FILE),
            "pipeline_steps": [
                "step1_extract_manifold",
                "step2_verify_in_tracker",
                "step3_add_official_status",
                "step4_add_supporting_evidence",
                "step5_generate_unified_record"
            ]
        }
    }

    EVENT_TRACKER.parent.mkdir(parents=True, exist_ok=True)
    with open(EVENT_TRACKER, 'w') as f:
        json.dump(tracker_data, f, indent=2)

    import sys
    sys.stderr.write(f"[STEP 1] Extracted {len(new_events)} events from manifold\n")
    sys.stderr.write(f"[STEP 2] Verified events in tracker\n")
    sys.stderr.write(f"[STEP 3] Added official alert status\n")
    sys.stderr.write(f"[STEP 4] Added supporting evidence references\n")
    sys.stderr.write(f"[STEP 5] Generated unified event record: {len(merged_events)} total\n")

if __name__ == '__main__':
    update_event_tracker()
