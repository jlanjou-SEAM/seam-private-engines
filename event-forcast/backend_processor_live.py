#!/usr/bin/env python3
"""
Event-Forcast Backend: Manifold to Event Register
Reads SEAM manifold output and updates the live event tracker
"""

import json
import os
from pathlib import Path
from datetime import datetime, timezone, timedelta

PUBLIC_REPO = Path(os.environ.get("PUBLIC_REPO_PATH", 
    "C:/Users/jpalmer/Documents/Codex/2026-09-22/https-github-com-jlanjou-seam-seam/work/continuum-event-forcast-clean"))

MANIFOLD_FILE = PUBLIC_REPO / "continuum/output/volcanic_manifold_analysis.json"
EVENT_TRACKER = PUBLIC_REPO / "continuum/event_tracker.json"

def extract_events_from_manifold():
    """Extract events from SEAM manifold analysis"""
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
        
        evt_id = match.get('event_id', f"EVT-{hash(str(match))}")
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
                "region": match.get('spatial_region', 'unknown')
            },
            "signal_summary": str(match.get('signal_summary', ''))[:200],
            "source_refs": match.get('source_refs', []),
            "projected_event_time": eta.isoformat(),
            "magnitude": match.get('magnitude'),
            "confidence_history": [{
                "timestamp_utc": detection_time.isoformat(),
                "seam_phi": phi,
                "phase": "event" if phi >= 0.75 else "warning",
                "magnitude": match.get('magnitude')
            }]
        }
    
    return events

def update_event_tracker():
    """Update the public event tracker with manifold events"""
    
    # Get events from manifold
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
    
    # Merge: keep recent old events, replace/add manifold events
    now = datetime.now(timezone.utc)
    merged_events = {}
    
    # Keep existing events that are recent (< 2 hours) and not in new manifold
    for evt_id, evt in existing_tracker.items():
        if evt_id not in new_events:
            try:
                detected = datetime.fromisoformat(evt['first_detected_utc'].replace('Z', '+00:00'))
                age_mins = (now - detected).total_seconds() / 60
                if age_mins < 120:
                    merged_events[evt_id] = evt
            except:
                pass
    
    # Add all manifold events (these are authoritative)
    merged_events.update(new_events)
    
    # Write updated tracker
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
            "manifold_file": str(MANIFOLD_FILE)
        }
    }
    
    EVENT_TRACKER.parent.mkdir(parents=True, exist_ok=True)
    with open(EVENT_TRACKER, 'w') as f:
        json.dump(tracker_data, f, indent=2)
    
    import sys
    sys.stderr.write(f"[OK] Extracted {len(new_events)} events from manifold\n")
    sys.stderr.write(f"[OK] Total tracked: {len(merged_events)}\n")
    sys.stderr.write(f"[OK] Updated event tracker\n")

if __name__ == '__main__':
    update_event_tracker()
