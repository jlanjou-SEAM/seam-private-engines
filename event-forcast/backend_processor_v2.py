#!/usr/bin/env python3
"""
Event-Forcast Backend: Process Public Data
- Polls data from public Continuum-Event-Forcast repo
- Extracts event timestamps: detection_time, lock_time, event_eta
- Preserves fixed event times (not current time)
- Generates combined analysis log for frontend
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

app = None
try:
    from flask import Flask, jsonify
    app = Flask(__name__)
    from flask_cors import CORS
    CORS(app)
except ImportError:
    pass

# Configuration
PUBLIC_REPO_PATH = Path(os.environ.get("PUBLIC_REPO_PATH", "C:/Users/jpalmer/Documents/Codex/2026-09-22/https-github-com-jlanjou-seam-seam/work/continuum-event-forcast-clean"))
COMBINED_LOG_FILE = PUBLIC_REPO_PATH / "curated/COMBINED_LOG.json"

def extract_event_metadata(event_data):
    """Extract timestamp metadata from event record"""
    if not isinstance(event_data, dict):
        return None
    
    return {
        "detection_time": event_data.get("timestamp") or event_data.get("time") or event_data.get("detected_at"),
        "lock_time": event_data.get("lock_time") or event_data.get("locked_at"),
        "event_eta": event_data.get("eta") or event_data.get("predicted_time") or event_data.get("event_time"),
        "location": event_data.get("location") or event_data.get("place"),
        "coordinates": event_data.get("coordinates") or event_data.get("coords") or event_data.get("geometry"),
        "magnitude": event_data.get("magnitude") or event_data.get("severity") or event_data.get("strength"),
        "event_type": event_data.get("type") or event_data.get("event_type") or event_data.get("category"),
        "status": event_data.get("status") or "Active"
    }

def load_and_process_public_data():
    """Load all public data and generate combined log with event timestamps"""
    data = {
        "realtime": {},
        "nonrealtime": {},
        "official": {},
        "streams": {},
        "metadata": {
            "collected_at": datetime.now(timezone.utc).isoformat(),
            "sources_loaded": 0,
            "data_points": 0
        }
    }
    
    events_with_times = []
    
    # Load and process each bucket
    for bucket_name, bucket_path in [
        ("realtime", PUBLIC_REPO_PATH / "realtime"),
        ("nonrealtime", PUBLIC_REPO_PATH / "nonrealtime"),
        ("official", PUBLIC_REPO_PATH / "official"),
        ("streams", PUBLIC_REPO_PATH / "streams")
    ]:
        if bucket_path.exists():
            for json_file in bucket_path.glob("*.json"):
                try:
                    with open(json_file) as f:
                        content = json.load(f)
                        data[bucket_name][json_file.stem] = content
                        data["metadata"]["sources_loaded"] += 1
                        
                        # Extract events with timestamps
                        if isinstance(content, list):
                            for item in content:
                                metadata = extract_event_metadata(item)
                                if metadata and metadata.get("detection_time"):
                                    events_with_times.append({
                                        "source": json_file.stem,
                                        "bucket": bucket_name,
                                        **metadata
                                    })
                        elif isinstance(content, dict):
                            metadata = extract_event_metadata(content)
                            if metadata and metadata.get("detection_time"):
                                events_with_times.append({
                                    "source": json_file.stem,
                                    "bucket": bucket_name,
                                    **metadata
                                })
                except Exception as e:
                    print(f"Error loading {json_file}: {e}")
    
    # Generate combined log with event timestamps
    combined_log = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "metadata": data["metadata"],
        "sources": {
            "realtime_count": len(data["realtime"]),
            "nonrealtime_count": len(data["nonrealtime"]),
            "official_count": len(data["official"]),
            "streams_count": len(data["streams"]),
            "total": data["metadata"]["sources_loaded"]
        },
        "events": events_with_times,
        "event_count": len(events_with_times),
        "raw_data": data
    }
    
    # Write combined log
    COMBINED_LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(COMBINED_LOG_FILE, 'w') as f:
        json.dump(combined_log, f, indent=2)
    
    return combined_log

# Flask endpoints (if Flask is available)
if app:
    @app.route('/health', methods=['GET'])
    def health():
        return jsonify({
            'status': 'ok',
            'service': 'event-forcast-backend',
            'public_data_path': str(PUBLIC_REPO_PATH),
            'combined_log_path': str(COMBINED_LOG_FILE),
            'timestamp': datetime.now(timezone.utc).isoformat()
        })

    @app.route('/data-summary', methods=['GET'])
    def data_summary():
        data = load_and_process_public_data()
        return jsonify({
            'collected_at': data['metadata']['collected_at'],
            'sources_loaded': data['metadata']['sources_loaded'],
            'event_count': data['event_count'],
            'events': data['events'][:10]  # Return first 10 events
        })

    @app.route('/combined-log', methods=['GET'])
    def get_combined_log():
        if COMBINED_LOG_FILE.exists():
            with open(COMBINED_LOG_FILE) as f:
                return jsonify(json.load(f))
        return jsonify({"error": "Combined log not yet generated"}), 404

    @app.route('/process', methods=['POST'])
    def process():
        try:
            log = load_and_process_public_data()
            return jsonify({
                "status": "processed",
                "log_file": str(COMBINED_LOG_FILE),
                "sources_processed": log['metadata']['sources_loaded'],
                "events_extracted": log['event_count']
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    if app:
        print("Event-Forcast Backend: Processing Public Data with Event Timestamps")
        print(f"Public data path: {PUBLIC_REPO_PATH}")
        print(f"Combined log output: {COMBINED_LOG_FILE}")
        app.run(host='localhost', port=5001, debug=True)
    else:
        # Run once without Flask
        log = load_and_process_public_data()
        print(f"Processed {log['metadata']['sources_loaded']} sources")
        print(f"Extracted {log['event_count']} events with timestamps")
