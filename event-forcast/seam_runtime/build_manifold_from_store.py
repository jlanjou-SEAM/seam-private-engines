#!/usr/bin/env python3
"""
Build a SEAM ARCV manifold from the raw store.

Reads every preserved raw body under <store>/raw, deduplicates by sha256,
and writes one manifold.arcv in the same outer/inner format that
seam_engine.load_manifold() reads. Runs inside each pipeline job, so the
manifold itself is never committed.
"""
import argparse, base64, json, re, sys
from datetime import datetime
from hashlib import sha256
from pathlib import Path

# Official confirmation sources are read only by official_match.py, after SEAM has run.
EXCLUDED_FROM_SEAM = {"official_confirmation"}

TS_RE = re.compile(r"(\d{8}T\d{6})\.(\d+)Z")


def captured_from_name(name):
    m = TS_RE.search(name)
    if not m:
        return None
    dt = datetime.strptime(m.group(1), "%Y%m%dT%H%M%S")
    return dt.strftime("%Y-%m-%dT%H:%M:%S") + "." + m.group(2) + "+00:00"


def build(store: Path, out: Path, regimes=None, reveal_utc=None):
    raw_root = store / "raw"
    if not raw_root.is_dir():
        raise SystemExit(f"no raw store at {raw_root}")
    entries, seen, skipped, excluded, out_of_regime, after_reveal = [], set(), 0, 0, 0, 0
    for p in sorted(raw_root.rglob("*")):
        if not p.is_file():
            continue
        data = p.read_bytes()
        digest = sha256(data).hexdigest()
        if digest in seen:
            skipped += 1
            continue
        seen.add(digest)
        parts = p.relative_to(raw_root).parts
        if parts and parts[0] in EXCLUDED_FROM_SEAM:
            excluded += 1
            continue
        if regimes and (not parts or parts[0] not in regimes):
            out_of_regime += 1
            continue
        cap = captured_from_name(p.name)
        if reveal_utc and cap and cap > reveal_utc:
            after_reveal += 1
            continue
        disc = next((x for x in parts if x.startswith("DISC-")), None)
        entries.append({
            "file_name": p.name,
            "source_family": parts[0] if parts else "other",
            "source_id": disc,
            "source_file": "/".join(parts),
            "source_set": "store",
            "captured_utc": captured_from_name(p.name),
            "payload_encoding": "base64",
            "payload_base64": base64.b64encode(data).decode("ascii"),
            "sha256": digest,
            "bytes": len(data),
        })
    outer = {"_seam_marcv_substrate": 1,
             "entries": [{"entries": entries, "entry_count": len(entries)}]}
    payload = json.dumps(outer, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(base64.b64encode(payload))
    return {"entries": len(entries), "duplicates_skipped": skipped, "excluded_official": excluded,
            "out_of_regime": out_of_regime, "after_reveal": after_reveal,
            "within_engine_slots": len(entries) <= 255, "out": str(out)}


def main():
    ap = argparse.ArgumentParser(description=__doc__.strip().splitlines()[0])
    ap.add_argument("--store", required=True, help="store root containing raw/")
    ap.add_argument("--out", required=True, help="path for manifold.arcv")
    ap.add_argument("--regimes", default="", help="comma list of regime folders in the run contract's evidence boundary")
    ap.add_argument("--reveal-utc", default="", help="ISO UTC; entries captured after this are excluded")
    args = ap.parse_args()
    regimes = {r.strip() for r in args.regimes.split(",") if r.strip()} or None
    reveal = args.reveal_utc or None
    report = build(Path(args.store), Path(args.out), regimes, reveal)
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
