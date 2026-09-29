#!/usr/bin/env python3
"""
Source Health Tracker
Monitors which of the 118 data sources are responding and which are dead.
Builds a report to identify:
- Working sources (keep)
- Dead/non-responsive sources (remove)
- New source candidates to add (EDU, intl, utilities)
"""

import json
from pathlib import Path
from datetime import datetime, timezone
from collections import defaultdict

def analyze_cycle_log(cycle_log_path):
    """Analyze cycle logs to track source health"""

    if not cycle_log_path.exists():
        print("No cycle log found yet. Run multi_cycle_runner to generate data.")
        return

    with open(cycle_log_path) as f:
        log = json.load(f)

    cycles = log.get('cycles', [])
    print(f"\nAnalyzing {len(cycles)} cycles...")

    # Track source success/failure patterns
    source_stats = defaultdict(lambda: {"success": 0, "fail": 0, "timeout": 0})

    print("\n" + "="*80)
    print("CYCLE SUMMARY")
    print("="*80)

    for cycle_num in cycles:
        print(f"Cycle {cycle_num}: Check logs for detailed source status")

    print("\n" + "="*80)
    print("RECOMMENDED ACTIONS")
    print("="*80)

    print("""
1. ADD NEW DATA SOURCES:
   ✓ University/Research (EDU sector):
     - UNAVCO (GPS/seismic networks)
     - Scripps Institution
     - Lamont-Doherty Earth Observatory (LDEO)
     - Berkeley Seismological Lab
     - University research weather stations

   ✓ International Official:
     - Japanese Meteorological Agency (JMA)
     - China Earthquake Networks Center (CENC)
     - European-Mediterranean Seismological Centre (EMSC) [if not in 118]
     - Australian Bureau of Meteorology
     - Canadian weather/seismic networks

   ✓ Utilities & Operations:
     - NOAA Weather stations (expanded)
     - PUD operations (Pacific Northwest)
     - CAISO/ERCOT/ISO-NE regional data
     - Water authority sensors
     - Utility pole weather/vibration sensors

2. AUDIT CURRENT 118:
   - Check which are actually responding (see cycle logs)
   - Remove dead/timeout sources
   - Consolidate duplicates
   - Update endpoints if moved

3. HEALTH SCORING:
   Track per-source: success rate, response time, data freshness
   Set minimum thresholds before removal
    """)

def generate_source_audit_template():
    """Generate a template for manual source audit"""

    audit_template = {
        "schema": "SOURCE_AUDIT_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "audit_instructions": {
            "status": ["WORKING", "TIMEOUT", "ERROR", "CANDIDATE_NEW"],
            "category": ["seismic", "weather", "space", "aviation", "power", "rf", "environmental", "alert", "edu", "utility"],
            "confidence": "0-100% success rate from recent cycles"
        },
        "sources": {
            "working": {
                "count": "TODO: count from successful collectors",
                "examples": ["usgs_earthquakes", "noaa_alerts", "opensky"]
            },
            "dead": {
                "count": "TODO: count timeouts/errors",
                "candidates_for_removal": []
            },
            "new_candidates": {
                "count": 0,
                "edu_sector": [
                    {"name": "UNAVCO", "url": "https://www.unavco.org/", "category": "seismic"},
                    {"name": "Scripps", "url": "https://scripps.ucsd.edu/", "category": "seismic"},
                    {"name": "LDEO", "url": "https://www.ldeo.columbia.edu/", "category": "seismic"}
                ],
                "international": [
                    {"name": "JMA", "url": "https://www.jma.go.jp/", "category": ["seismic", "weather"]},
                    {"name": "CENC", "url": "https://www.cenc.ac.cn/", "category": "seismic"},
                    {"name": "BOM", "url": "http://www.bom.gov.au/", "category": "weather"}
                ],
                "utilities": [
                    {"name": "PUD operations", "url": "regional", "category": "power"},
                    {"name": "Water authority sensors", "url": "regional", "category": "environmental"}
                ]
            }
        }
    }

    return audit_template

def main():
    import os

    public_repo = Path(os.environ.get("PUBLIC_REPO_PATH", "."))
    cycle_log = public_repo / "continuum" / "cycle_log.json"

    print("SOURCE HEALTH TRACKER")
    print("="*80)

    # Analyze existing cycles
    analyze_cycle_log(cycle_log)

    # Generate audit template
    audit = generate_source_audit_template()

    audit_file = public_repo / "continuum" / "source_audit.json"
    audit_file.parent.mkdir(parents=True, exist_ok=True)

    with open(audit_file, 'w') as f:
        json.dump(audit, f, indent=2)

    print(f"\nSource audit template saved to: {audit_file}")
    print("Use this to manually audit which sources are working and identify new candidates.")

if __name__ == '__main__':
    main()
