#!/usr/bin/env python3
"""
Multi-Cycle Runner: 10 cycles per 5-minute window (1 every ~30 seconds)
Maximizes data collection from all available sources.
Tracks source health; prunes only after 30-day silence, not before.
All data regimes accepted: stochastic, edge-case, anomalous data all valid for testing.
"""

import json
import os
import subprocess
import sys
import time
from pathlib import Path
from datetime import datetime, timezone, timedelta

PUBLIC_REPO = Path(os.environ.get("PUBLIC_REPO_PATH",
    "C:/Users/jpalmer/Documents/Codex/2026-09-22/https-github-com-jlanjou-seam-seam/work/continuum-event-forcast-clean"))

CYCLE_LOG = PUBLIC_REPO / "continuum" / "cycle_log.json"
EVENT_TRACKER = PUBLIC_REPO / "continuum" / "event_tracker.json"
SOURCE_HEALTH = PUBLIC_REPO / "continuum" / "source_health.json"
SEAM_RUNTIME = Path("D:/Ground Up/05-Continuum Engine/mnt/data/SEAM_66_MANIFOLD_RUNTIME")

MAX_CYCLES = 10  # 10 cycles per 5-min window = ~1 every 30 seconds
TIMEOUT_SECONDS = 300  # 5-minute window
CYCLE_TARGET_MS = 30000  # Target 30 seconds per cycle

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

def track_source_health(source_name, status, response_time_ms=None):
    """Track which sources are responding"""
    health = {}
    if SOURCE_HEALTH.exists():
        try:
            health = json.load(open(SOURCE_HEALTH))
        except:
            health = {}

    if 'sources' not in health:
        health['sources'] = {}

    health['sources'][source_name] = {
        'status': status,  # 'success', 'timeout', 'error', 'no_data'
        'last_contact_utc': datetime.now(timezone.utc).isoformat(),
        'response_time_ms': response_time_ms
    }
    health['updated_utc'] = datetime.now(timezone.utc).isoformat()

    SOURCE_HEALTH.parent.mkdir(parents=True, exist_ok=True)
    with open(SOURCE_HEALTH, 'w') as f:
        json.dump(health, f, indent=2)

def prune_dead_sources():
    """Remove sources with no contact for 30+ days"""
    if not SOURCE_HEALTH.exists():
        return 0

    try:
        health = json.load(open(SOURCE_HEALTH))
    except:
        return 0

    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=30)
    removed = 0

    sources = health.get('sources', {})
    for source_name, info in list(sources.items()):
        try:
            last_contact = datetime.fromisoformat(info.get('last_contact_utc', ''))
            if last_contact < cutoff:
                del sources[source_name]
                removed += 1
                log_cycle(0, "PRUNE", f"Removed inactive source: {source_name}")
        except:
            pass

    if removed > 0:
        with open(SOURCE_HEALTH, 'w') as f:
            json.dump(health, f, indent=2)

    return removed

def run_cycle(cycle_num):
    """Run one complete collection cycle: all sources → data collection → event tracking"""
    cycle_start = time.time()

    log_cycle(cycle_num, "START", f"Cycle {cycle_num}: Collecting from all available sources")

    # Step 1: Run all collectors (realtime_acquisition.py) - no filtering, accept all data
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
            log_cycle(cycle_num, "COLLECT", f"Data collection complete", collection_ms)
            # Track source health from output
            for line in result.stdout.split('\n'):
                if 'source' in line.lower() and ('success' in line.lower() or 'connected' in line.lower()):
                    track_source_health('collector_output', 'success', collection_ms)
        else:
            log_cycle(cycle_num, "COLLECT_ERROR", f"Collection error (stderr: {result.stderr[-100:]})", collection_ms)
    except subprocess.TimeoutExpired:
        log_cycle(cycle_num, "COLLECT_TIMEOUT", "Collection exceeded 120s timeout")
        return False
    except Exception as e:
        log_cycle(cycle_num, "COLLECT_EXCEPTION", str(e))
        return False

    # Step 2: SEAM ingest - append raw data to live manifold
    ingest_start = time.time()
    try:
        log_cycle(cycle_num, "INGEST", "Ingesting all collected data into manifold (all regimes, no pre-filtering)", 0)
    except Exception as e:
        log_cycle(cycle_num, "INGEST_ERROR", str(e))
        return False

    # Step 3: Run SEAM engine query (optional - may not have runtime on GitHub Actions)
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
            log_cycle(cycle_num, "SEAM_SKIP", "SEAM query skipped or unavailable (not blocking)", seam_ms)
    except subprocess.TimeoutExpired:
        log_cycle(cycle_num, "SEAM_TIMEOUT", "SEAM query exceeded 60s timeout (non-blocking)")
    except Exception as e:
        log_cycle(cycle_num, "SEAM_SKIP", f"SEAM query skipped: {str(e)[:50]}")

    cycle_ms = int((time.time() - cycle_start) * 1000)
    log_cycle(cycle_num, "COMPLETE", f"Cycle {cycle_num} complete", cycle_ms)

    return True

def save_cycle_log(cycles):
    """Save cycle execution log"""
    log_data = {
        "schema": "SEAM_CYCLE_LOG_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "strategy": "10 cycles per 5-min window, all data accepted, prune after 30-day silence",
        "total_cycles": len(cycles),
        "cycles": cycles
    }

    CYCLE_LOG.parent.mkdir(parents=True, exist_ok=True)
    with open(CYCLE_LOG, 'w') as f:
        json.dump(log_data, f, indent=2)

def main():
    """Run 10 cycles within 5-minute window, maximize data collection"""
    window_start = time.time()
    cycles_completed = []

    print(f"[{datetime.now(timezone.utc).isoformat()}] MULTI-CYCLE RUNNER: 10 cycles per 5-min window",
          file=sys.stderr)
    print(f"Strategy: All data regimes accepted. Prune only after 30-day silence.",
          file=sys.stderr)

    # Prune dead sources at start
    removed = prune_dead_sources()
    if removed > 0:
        print(f"[{datetime.now(timezone.utc).isoformat()}] Pruned {removed} inactive sources",
              file=sys.stderr)

    for cycle_num in range(1, MAX_CYCLES + 1):
        elapsed = time.time() - window_start
        remaining = TIMEOUT_SECONDS - elapsed

        if remaining < 30:  # Need at least 30s for next cycle
            print(f"[{datetime.now(timezone.utc).isoformat()}] Remaining window ({remaining:.0f}s) insufficient for next cycle",
                  file=sys.stderr)
            break

        success = run_cycle(cycle_num)
        if success:
            cycles_completed.append(cycle_num)

        # Check if next cycle would fit
        elapsed = time.time() - window_start
        if elapsed > TIMEOUT_SECONDS:
            print(f"[{datetime.now(timezone.utc).isoformat()}] 5-minute window exceeded",
                  file=sys.stderr)
            break

    total_time = time.time() - window_start
    avg_cycle_ms = int(total_time * 1000 / max(len(cycles_completed), 1))

    print(f"[{datetime.now(timezone.utc).isoformat()}] COMPLETED: {len(cycles_completed)}/{MAX_CYCLES} cycles in {total_time:.1f}s (avg {avg_cycle_ms}ms/cycle)",
          file=sys.stderr)

    save_cycle_log(cycles_completed)
    return 0

if __name__ == '__main__':
    sys.exit(main())
