from pathlib import Path
from datetime import timedelta
import os
from seam_common import *

PROJECT_ROOT = Path(os.environ.get("SEAM_ROOT", Path(__file__).resolve().parents[3])).resolve()
ROOT = PROJECT_ROOT / "continuum"
CFG = load_json(ROOT / "config" / "pipeline_config.json")

LOCATION_HINTS = {
    "hawaii": ("United States", "Hawaii", "Hawaii County", "Volcano", "Kilauea Summit", "Crater Rim Drive", "USGS HVO"),
    "kilauea": ("United States", "Hawaii", "Hawaii County", "Volcano", "Kilauea Summit", "Crater Rim Drive", "USGS HVO"),
    "mauna loa": ("United States", "Hawaii", "Hawaii County", "Volcano", "Mauna Loa Observatory Road", None, "USGS HVO"),
    "yellowstone": ("United States", "Wyoming", "Park County", "Yellowstone", "Grand Loop Road", "Norris Canyon Road", "USGS YVO"),
    "kamchatka": ("Russia", "Kamchatka", None, "Petropavlovsk", "Klyuchevskoy Region", None, "KVERT"),
    "iceland": ("Iceland", "Reykjanes", None, "Grindavik", "Route 43", "Grindavikurvegur", "IMO Iceland")
}

def first_coord(match):
    lat = match.get("latitude")
    lon = match.get("longitude")
    if lat is not None and lon is not None:
        return lat, lon
    coords = match.get("location_analysis", {}).get("coordinates", [])
    for a, b in coords:
        try:
            x = float(a); y = float(b)
            if abs(x) <= 90:
                return x, y
            return y, x
        except Exception:
            continue
    return None, None

def infer_location(match):
    names = match.get("location_analysis", {}).get("named_locations", [])
    blob = lower_blob(match)
    for key, vals in LOCATION_HINTS.items():
        if key in names or key in blob:
            return vals
    return (None, None, None, None, None, None, None)

def phi(match):
    if match.get("seam_phi") is not None:
        return float(match.get("seam_phi"))
    blob = lower_blob(match)
    if "eruption" in blob:
        return 0.97
    if "lava" in blob or "ash" in blob:
        return 0.83
    if "volcano" in blob or "volcanic" in blob:
        return 0.61
    return 0.0

def lock_state(p):
    pct = round(p * 100, 1)
    if p >= 0.95:
        return f"HARD LOCK ({pct}%)"
    if p >= 0.75:
        return f"TARGET ACQUISITION ({pct}%)"
    if p >= 0.50:
        return f"FOLLOW PROTOCOL ({pct}%)"
    return f"MONITOR ({pct}%)"

def build_record(i, match):
    p = phi(match)
    now = utc_now()
    lat, lon = first_coord(match)
    country, state, county, city, street, cross, agency = infer_location(match)
    signature_type = match.get("signature_class") or match.get("primary_regime") or "volcanic"
    event_id = match.get("event_id") or f"SEAM-{i:05d}"
    description = match.get("signal_summary")
    operator_results = match.get("operator_results", {})
    return {
        "event_id": event_id,
        "signature_type": signature_type,
        "classification": signature_type.replace("_", " ").title(),
        "event_title": f"{signature_type.replace('_', ' ').title()} Manifold Event",
        "event_description": description,
        "manifold_percent": p,
        "lock_state": lock_state(p),
        "continuum_state": "active" if p >= 0.5 else "monitor",
        "forecast_strength": "High" if p >= 0.95 else "Elevated" if p >= 0.75 else "Moderate",
        "forecast_track": "Retained structural trajectory" if match.get("trajectory") else "Localized structural state",
        "forecast_duration": "24-72 Hours" if p >= 0.75 else "6-24 Hours",
        "forecast_magnitude": match.get("magnitude") or ("VEI-2" if signature_type == "volcanic" and p >= 0.75 else "structural"),
        "forecast_confidence": round(p * 100, 1),
        "initial_record_creation_utc": now.isoformat(),
        "acquisition_utc": now.isoformat(),
        "predicted_time_utc": (now + timedelta(hours=4)).isoformat(),
        "last_updated_utc": now.isoformat(),
        "country": country,
        "state": state,
        "county": county,
        "city": city,
        "street": street,
        "cross_street": cross,
        "latitude": lat,
        "longitude": lon,
        "course": "Localized",
        "signature": signature_type,
        "officially_identified": None,
        "official_agency": agency,
        "official_record_timestamp_utc": None,
        "official_event_reference": None,
        "reconciliation_state": None,
        "supporting_sources": match.get("source_refs", []),
        "supporting_signals": [description],
        "supporting_coordinates": [[lat, lon]] if lat is not None and lon is not None else [],
        "operator_results": operator_results,
        "trajectory": match.get("trajectory", []),
        "selected_state": match.get("selected_state", {}),
        "closure_status": match.get("closure_status"),
        "raw_match": match
    }

def build_table(records):
    cols = ["event_id","acquisition_utc","lock_state","predicted_time_utc","forecast_strength","forecast_magnitude","forecast_duration","country","state","county","city","street","cross_street","latitude","longitude","course","signature","officially_identified","official_agency","official_record_timestamp_utc","official_event_reference","reconciliation_state"]
    lines = [" | ".join(cols), "-" * 260]
    for r in records:
        lines.append(" | ".join(str(r.get(c, "")) for c in cols))
    return "\n".join(lines)

def main():
    print("\n=== STEP 4 OPERATIONAL EVENT MATRIX v33 ===\n")
    data = load_json(ROOT / CFG["outputs"]["volcanic_analysis"])
    substrate = data.get("event_substrate") or data.get("manifold_events") or data.get("matches", [])
    records = [build_record(i, m) for i, m in enumerate(substrate)]
    out = ROOT / CFG["outputs"]["event_matrix"]
    table = ROOT / CFG["outputs"]["event_matrix_table"]
    write_json(
        out,
        {
            "generated_utc": utc_iso(),
            "schema": "SEAM_EVENT_MATRIX_V34",
            "record_count": len(records),
            "records": records,
            "event_substrate": substrate,
        }
    )
    table.parent.mkdir(parents=True, exist_ok=True)
    table.write_text(build_table(records), encoding="utf-8")
    append_jsonl(ROOT / "logs" / "step4_event_matrix.jsonl", {"record_count": len(records)})
    print(f"[step4] event records: {len(records)}")
    print(f"[step4] output: {out}")

if __name__ == "__main__":
    main()
