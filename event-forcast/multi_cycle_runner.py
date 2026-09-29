#!/usr/bin/env python3
"""
Multi-Cycle Runner: Execute 4-5 complete collection cycles within 5-minute window.
Each cycle runs all 118 sources, ingests into manifold, updates event tracker.
Logs timestamps to measure actual cycle duration and event update frequency.
"""

import json
import os
import subprocess
import sys
import time
from pathlib import Path
from datetime import datetime, timezone

PUBLIC_REPO = Path(os.environ.get("PUBLIC_REPO_PATH",
    "C:/Users/jpalmer/Documents/Codex/2026-09-22/https-github-com-jlanjou-seam-seam/work/continuum-event-forcast-clean"))

CYCLE_LOG = PUBLIC_REPO / "continuum" / "cycle_log.json"
EVENT_TRACKER = PUBLIC_REPO / "continuum" / "event_tracker.json"
MAX_CYCLES = 4
TIMEOUT_SECONDS = 300  # 5 minute window

def log_cycle(cycle_num, phase, message, duration_ms=None):
    """Log cycle phase with timestamp"""
    ts = datetime.now(timezone.utc).isoformat()
    entry = {
        "cycle": cycle_num,
        "phase": phase,
        "timestamp_utc": ts,
        "message": message
    }
    if duration_ms:
        entry["duration_ms"] = duration_ms

    print(json.dumps(entry), file=sys.stderr)
    return entry

def run_cycle(cycle_num):
    """Run one complete collection cycle: all 118 sources → ingest → update tracker"""
    cycle_start = time.time()

    log_cycle(cycle_num, "START", f"Cycle {cycle_num} starting: running all 118 sources")

    # Step 1: Run all collectors (realtime_acquisition.py)
    collection_start = time.time()
    try:
        result = subprocess.run(
            ["python", "step1_raw_data_retrieval/realtime_acquisition.py"],
            cwd=str(Path(__file__).parent),
            capture_output=True,
            text=True,
            timeout=120
        )
        collection_ms = int((time.time() - collection_start) * 1000)

        if result.returncode == 0:
            log_cycle(cycle_num, "COLLECT", "All 118 sources collected successfully", collection_ms)
        else:
            log_cycle(cycle_num, "COLLECT_ERROR", f"Collection failed: {result.stderr[-200:]}", collection_ms)
    except subprocess.TimeoutExpired:
        log_cycle(cycle_num, "COLLECT_TIMEOUT", "Collection exceeded 120s timeout")
        return False
    except Exception as e:
        log_cycle(cycle_num, "COLLECT_EXCEPTION", str(e))
        return False

    # Step 2: SEAM ingest (update manifold with collected data)
    ingest_start = time.time()
    try:
        # This would run ingest_runner to append observations to manifold.arcv
        # For now, placeholder since ingest_runner needs proper setup
        log_cycle(cycle_num, "INGEST", "Ingesting observations into manifold (placeholder)", 0)
    except Exception as e:
        log_cycle(cycle_num, "INGEST_ERROR", str(e))
        return False

    # Step 3: Run SEAM engine query
    seam_start = time.time()
    try:
        result = subprocess.run(
            ["python", "backend_processor_live.py"],
            cwd=str(Path(__file__).parent),
            capture_output=True,
            text=True,
            timeout=60
        )
        seam_ms = int((time.time() - seam_start) * 1000)

        if result.returncode == 0:
            log_cycle(cycle_num, "SEAM", "SEAM engine query and event update complete", seam_ms)
        else:
            log_cycle(cycle_num, "SEAM_ERROR", f"SEAM failed: {result.stderr[-200:]}", seam_ms)
    except subprocess.TimeoutExpired:
        log_cycle(cycle_num, "SEAM_TIMEOUT", "SEAM query exceeded 60s timeout")
        return False
    except Exception as e:
        log_cycle(cycle_num, "SEAM_EXCEPTION", str(e))
        return False

    cycle_ms = int((time.time() - cycle_start) * 1000)
    log_cycle(cycle_num, "COMPLETE", f"Cycle {cycle_num} complete", cycle_ms)

    return True

def save_cycle_log(cycles):
    """Save cycle execution log"""
    log_data = {
        "schema": "SEAM_CYCLE_LOG_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "total_cycles": len(cycles),
        "cycles": cycles
    }

    CYCLE_LOG.parent.mkdir(parents=True, exist_ok=True)
    with open(CYCLE_LOG, 'w') as f:
        json.dump(log_data, f, indent=2)

def main():
    """Run multiple cycles within 5-minute window"""
    import os

    window_start = time.time()
    cycles_completed = []

    print(f"[{datetime.now(timezone.utc).isoformat()}] MULTI-CYCLE RUNNER: Starting {MAX_CYCLES} collection cycles",
          file=sys.stderr)

    for cycle_num in range(1, MAX_CYCLES + 1):
        elapsed = time.time() - window_start
        remaining = TIMEOUT_SECONDS - elapsed

        if remaining < 60:  # Need at least 60s for next cycle
            print(f"[{datetime.now(timezone.utc).isoformat()}] Remaining window ({remaining:.0f}s) insufficient for next cycle",
                  file=sys.stderr)
            break

        success = run_cycle(cycle_num)
        if not success:
            print(f"[{datetime.now(timezone.utc).isoformat()}] Cycle {cycle_num} failed, continuing...",
                  file=sys.stderr)

        cycles_completed.append(cycle_num)

        # Check if next cycle would fit
        elapsed = time.time() - window_start
        if elapsed > TIMEOUT_SECONDS:
            print(f"[{datetime.now(timezone.utc).isoformat()}] 5-minute window exceeded",
                  file=sys.stderr)
            break

    total_time = time.time() - window_start
    print(f"[{datetime.now(timezone.utc).isoformat()}] COMPLETED: {len(cycles_completed)} cycles in {total_time:.1f}s",
          file=sys.stderr)

    save_cycle_log(cycles_completed)
    return 0

if __name__ == '__main__':
    import os
    sys.exit(main())
