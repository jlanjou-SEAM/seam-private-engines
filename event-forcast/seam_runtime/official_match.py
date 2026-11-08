#!/usr/bin/env python3
"""
Step 5: attach official timestamps from stored USGS CAP captures to tracker records.

- parse_cap_items(): reads every CAP XML capture under <store>/raw, one item per GUID.
- apply_official(): matches each item to a tracker event by volcano name and
  attaches it as supporting evidence. It never overwrites SEAM detection fields
  (first_detected_utc, confidence_history, projected_event_time).
- confirmation: an official item that is not a Cancel and was issued at or after
  the SEAM first_detected_utc confirms the record. The earliest such item is kept.
"""
import argparse, json, re, sys, unicodedata
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
import xml.etree.ElementTree as ET

TITLE_RE = re.compile(
    r"^(?P<product>.+?) - (?P<volcano>.+?) - (?P<status>[A-Za-z]+) - "
    r"Alert level: (?P<level>[A-Za-z]+), Color Code: (?P<color>[A-Za-z]+)")


def norm_name(s):
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"\bvolcano\b", "", s, flags=re.I)
    return re.sub(r"\s+", " ", s).strip().lower()


def iso_utc(rfc):
    dt = parsedate_to_datetime(rfc)
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def parse_cap_items(store: Path):
    items, seen = [], set()
    for xml_path in sorted((store / "raw" / "official_confirmation").rglob("*.xml")):
        try:
            root = ET.parse(xml_path).getroot()
        except ET.ParseError:
            continue
        if root.findtext("./channel/title") != "USGS Volcano CAP Alerts":
            continue
        for it in root.findall("./channel/item"):
            guid = (it.findtext("guid") or "").strip()
            if not guid or guid in seen:
                continue
            seen.add(guid)
            title = " ".join((it.findtext("title") or "").split())
            m = TITLE_RE.match(title)
            if not m:
                continue
            items.append({
                "guid": guid,
                "issued_utc": iso_utc(it.findtext("pubDate")),
                "volcano": m["volcano"].strip(),
                "volcano_norm": norm_name(m["volcano"]),
                "status": m["status"],
                "alert_level": m["level"].upper(),
                "color_code": m["color"].upper(),
                "description": " ".join((it.findtext("description") or "").split()),
                "link": (it.findtext("link") or "").strip(),
                "source_file": xml_path.name,
            })
    return items


def parse_ts(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00")) if s else None


def apply_official(tracker: dict, items: list):
    events = tracker.get("events", {})
    report = {"matched": 0, "unmatched_items": 0, "confirmed": [], "cancelled": []}
    for it in sorted(items, key=lambda x: x["issued_utc"]):
        targets = [e for e in events.values()
                   if norm_name(e.get("name")) and (
                       norm_name(e.get("name")) in it["volcano_norm"] or it["volcano_norm"] in norm_name(e.get("name")))]
        if not targets:
            report["unmatched_items"] += 1
            continue
        for ev in targets:
            report["matched"] += 1
            ev.setdefault("official_alerts", {})
            ev["official_alerts"][it["guid"]] = {
                k: it[k] for k in ("guid", "issued_utc", "status", "alert_level", "color_code", "description", "link", "source_file")
            }
            ev["official_alert"] = {
                "source": "USGS HVO CAP",
                "status": it["status"],
                "alert_level": it["alert_level"],
                "color_code": it["color_code"],
                "issued_utc": it["issued_utc"],
                "guid": it["guid"],
                "description": it["description"],
            }
            detected = parse_ts(ev.get("first_detected_utc"))
            issued = parse_ts(it["issued_utc"])
            if it["status"].lower() == "cancel":
                report["cancelled"].append(ev["event_id"])
                continue
            if detected and issued >= detected and not (ev.get("confirmation") or {}).get("confirmed"):
                ev["confirmation"] = {
                    "confirmed": True,
                    "official_guid": it["guid"],
                    "official_issued_utc": it["issued_utc"],
                    "lag_minutes": round((issued - detected).total_seconds() / 60, 1),
                }
                report["confirmed"].append(ev["event_id"])
    return report


def main():
    ap = argparse.ArgumentParser(description=__doc__.strip().splitlines()[0])
    ap.add_argument("--store", required=True)
    ap.add_argument("--tracker", required=True)
    args = ap.parse_args()
    tracker_path = Path(args.tracker)
    tracker = json.loads(tracker_path.read_text(encoding="utf-8"))
    items = parse_cap_items(Path(args.store))
    report = apply_official(tracker, items)
    tracker_path.write_text(json.dumps(tracker, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"items": len(items), **report}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
