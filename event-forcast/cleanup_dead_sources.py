#!/usr/bin/env python3
"""
Cleanup: Remove dead sources from active collection
Keep only the 67 verified working sources
Move non-working sources to observation list
"""

import json
import os
from pathlib import Path
from datetime import datetime, timezone

def cleanup_sources():
    """Remove non-working sources from active collection"""

    public_repo = Path(os.environ.get("PUBLIC_REPO_PATH", "."))

    # Load working and non-working registries
    working_file = public_repo / "continuum" / "source_registry_working.json"
    non_working_file = public_repo / "continuum" / "source_registry_non_working.json"

    if not working_file.exists() or not non_working_file.exists():
        print("ERROR: Source registries not found. Run connectivity test first.")
        return False

    with open(working_file) as f:
        working_data = json.load(f)

    with open(non_working_file) as f:
        non_working_data = json.load(f)

    working_sources = working_data.get('sources', [])
    non_working_sources = non_working_data.get('sources', [])

    print(f"Cleanup Report")
    print(f"=" * 80)
    print(f"Working sources (KEEP): {len(working_sources)}")
    print(f"Dead links (REMOVE): {len(non_working_sources)}")

    # Create active registry with only working sources
    active_registry = {
        "schema": "SOURCE_REGISTRY_ACTIVE_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "strategy": "Only verified working sources. Non-working sources moved to observation.",
        "total_active": len(working_sources),
        "sources": working_sources
    }

    active_file = public_repo / "continuum" / "source_registry_active.json"
    with open(active_file, 'w') as f:
        json.dump(active_registry, f, indent=2)

    # Create observation registry for dead links (30-day watch)
    observation_registry = {
        "schema": "SOURCE_REGISTRY_OBSERVATION_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "strategy": "Non-connecting sources. Will be removed after 30 days of silence.",
        "observation_period_days": 30,
        "total_observing": len(non_working_sources),
        "sources": non_working_sources
    }

    observation_file = public_repo / "continuum" / "source_registry_observation.json"
    with open(observation_file, 'w') as f:
        json.dump(observation_registry, f, indent=2)

    # Summary by category
    print(f"\nWorking Sources by Category:")
    print("-" * 80)

    categories = {}
    for source in working_sources:
        cat = source.get('category', 'unknown')
        if cat not in categories:
            categories[cat] = 0
        categories[cat] += 1

    for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
        print(f"  {cat:20} {count:3} sources")

    print(f"\n" + "=" * 80)
    print(f"CLEANUP COMPLETE")
    print(f"- Active registry: {active_file.name} ({len(working_sources)} sources)")
    print(f"- Observation list: {observation_file.name} ({len(non_working_sources)} sources, 30-day watch)")
    print(f"- Dead links: REMOVED from active collection")

    return True

if __name__ == '__main__':
    cleanup_sources()
