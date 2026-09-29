#!/usr/bin/env python3
"""
Test connectivity for 500 sources
Track which ones connect, remove non-connecting sources
Report connection status and cleanup
"""

import json
import subprocess
import sys
import time
from pathlib import Path
from datetime import datetime, timezone
from urllib.request import urlopen, Request
import socket

def test_source_connectivity(source, timeout=5):
    """Test if a source URL is reachable"""
    url = source.get('url')
    if not url:
        return False

    try:
        # Add timeout and user agent
        req = Request(url, headers={'User-Agent': 'SEAM-Connectivity-Test/1.0'})
        response = urlopen(req, timeout=timeout)
        return response.status == 200 or (200 <= response.status < 400)
    except (socket.timeout, Exception) as e:
        return False

def test_all_sources(sources, max_parallel=20):
    """Test connectivity for all sources"""
    working = []
    non_working = []

    print(f"Testing {len(sources)} sources for connectivity...")

    for i, source in enumerate(sources, 1):
        source_name = source['name']

        # Test connectivity
        connects = test_source_connectivity(source)
        source['connects'] = connects

        if connects:
            working.append(source)
            print(f"[{i}/{len(sources)}] ✓ {source_name}")
        else:
            non_working.append(source)
            print(f"[{i}/{len(sources)}] ✗ {source_name}")

        # Rate limit
        if i % 10 == 0:
            time.sleep(0.5)

    return working, non_working

def save_results(working, non_working, public_repo):
    """Save connectivity test results"""

    # Working sources (keep)
    working_registry = {
        "schema": "SOURCE_REGISTRY_WORKING_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "total_working": len(working),
        "sources": working
    }

    working_file = public_repo / "continuum" / "source_registry_working.json"
    with open(working_file, 'w') as f:
        json.dump(working_registry, f, indent=2)

    # Non-working sources (remove after 30 days)
    non_working_registry = {
        "schema": "SOURCE_REGISTRY_NON_WORKING_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "total_non_working": len(non_working),
        "note": "These did not connect. Will be removed from active collection after 30-day observation period.",
        "sources": non_working
    }

    non_working_file = public_repo / "continuum" / "source_registry_non_working.json"
    with open(non_working_file, 'w') as f:
        json.dump(non_working_registry, f, indent=2)

    return working_file, non_working_file

def generate_report(working, non_working):
    """Generate connectivity report"""

    report = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "total_tested": len(working) + len(non_working),
        "total_working": len(working),
        "total_non_working": len(non_working),
        "connection_rate_percent": round(100 * len(working) / (len(working) + len(non_working)), 1) if (len(working) + len(non_working)) > 0 else 0,
        "working_by_category": {},
        "working_by_region": {},
    }

    # Group by category
    for source in working:
        cat = source.get('category', 'unknown')
        if cat not in report['working_by_category']:
            report['working_by_category'][cat] = []
        report['working_by_category'][cat].append(source['name'])

    # Group by region
    for source in working:
        region = source.get('region', 'unknown')
        if region not in report['working_by_region']:
            report['working_by_region'][region] = []
        report['working_by_region'][region].append(source['name'])

    return report

def main():
    import os

    public_repo = Path(os.environ.get("PUBLIC_REPO_PATH", "."))

    # Load 500 sources
    sources_file = public_repo / "continuum" / "source_registry_500.json"

    if not sources_file.exists():
        print("Generating 500 sources...")
        # Generate if doesn't exist
        exec(open(Path(__file__).parent / "expanded_sources.py").read())

    with open(sources_file) as f:
        data = json.load(f)
        sources = data['sources']

    print(f"Testing {len(sources)} sources...")
    print("="*80)

    working, non_working = test_all_sources(sources)

    print("\n" + "="*80)
    print(f"RESULTS:")
    print(f"  Working: {len(working)}")
    print(f"  Non-working: {len(non_working)}")
    print(f"  Connection rate: {100*len(working)/(len(working)+len(non_working)):.1f}%")

    # Save results
    working_file, non_working_file = save_results(working, non_working, public_repo)

    # Generate report
    report = generate_report(working, non_working)
    report_file = public_repo / "continuum" / "connectivity_report.json"
    with open(report_file, 'w') as f:
        json.dump(report, f, indent=2)

    print(f"\n✓ Results saved:")
    print(f"  - Working sources: {working_file.name}")
    print(f"  - Non-working sources: {non_working_file.name}")
    print(f"  - Report: {report_file.name}")

    print(f"\nWorking sources by category:")
    for cat, sources_list in sorted(report['working_by_category'].items()):
        print(f"  {cat}: {len(sources_list)}")

    return 0

if __name__ == '__main__':
    sys.exit(main())
