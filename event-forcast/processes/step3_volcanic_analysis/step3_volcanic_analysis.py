from __future__ import annotations

from collections import Counter, defaultdict
from datetime import UTC, datetime
from email.utils import parsedate_to_datetime
from pathlib import Path
from xml.etree import ElementTree
import hashlib
import html
import json
import math
import os
import re
import unicodedata

try:
    from seam_common import *
except Exception:

    def utc_iso():
        return datetime.now(UTC).isoformat()

    def load_json(path):
        return json.loads(Path(path).read_text(encoding="utf-8", errors="replace"))

    def write_json(path, obj):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        Path(path).write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding="utf-8")

    def append_jsonl(path, obj):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with open(path, "a", encoding="utf-8") as f:
            f.write(json.dumps(obj, ensure_ascii=False) + "\n")


PROJECT_ROOT = Path(os.environ.get("SEAM_ROOT", Path(__file__).resolve().parents[3])).resolve()
ROOT = PROJECT_ROOT / "continuum"
CFG = load_json(ROOT / "config" / "pipeline_config.json")

STEP2_FILE = ROOT / CFG["outputs"]["continuum_master"]
OUTFILE = ROOT / "output" / "volcanic_manifold_analysis.json"
LOGFILE = ROOT / "logs" / "step3_manifold_resolution.jsonl"

SCHEMA = "SEAM_STEP3_STRUCTURAL_MANIFOLD_V1"
EPS = 1e-6
CS133_HZ = 9_192_631_770
MAX_OBSERVATION_TEXT = 160_000
MAX_FEATURES_PER_RECORD = 300
MAX_STREAM_RECORDS = int(os.environ.get("SEAM_STEP3_MAX_STREAM_RECORDS", "250"))

DEFAULT_SIGNATURES = {
    "volcanic": ["volcano", "volcanic", "eruption", "lava", "magma", "ash", "ash plume"],
    "seismic": ["earthquake", "quake", "tremor", "seismic", "magnitude", "epicenter"],
    "severe_weather": ["severe thunderstorm", "thunderstorm", "lightning", "hail", "damaging wind", "convective"],
    "tornadic": ["tornado", "tornadic", "funnel cloud", "mesocyclone", "rotation"],
    "tropical_cyclone": ["hurricane", "cyclone", "typhoon", "tropical storm", "storm surge"],
    "flood": ["flood", "flash flood", "inundation", "flood warning"],
    "wildfire": ["wildfire", "thermal hotspot", "hotspot", "smoke plume", "fire perimeter"],
    "drought": ["drought", "dry conditions", "soil moisture", "heatwave"],
    "winter_weather": ["winter storm", "blizzard", "ice storm", "heavy snow"],
    "tsunami": ["tsunami", "sea level", "dart", "wave height"],
    "geomagnetic": ["geomagnetic", "solar flare", "cme", "kp index", "aurora", "solar wind"],
    "rf_disruption": ["radio blackout", "hf blackout", "propagation", "ionosphere", "wspr"],
    "grid_instability": ["grid instability", "blackout", "power outage", "load shed"],
}

# Used as a spatial constraint after an observation names a feature. This is not
# the event engine; it only bounds location when the source text omits geometry.
VOLCANO_REFERENCE = {
    "kilauea": (19.4210, -155.2924),
    "mauna loa": (19.4755, -155.6081),
    "sakurajima": (31.5933, 130.6568),
    "aira": (31.5772, 130.6589),
    "popocatepetl": (19.0228, -98.6272),
    "merapi": (-7.5412, 110.4429),
    "stromboli": (38.7914, 15.2127),
    "etna": (37.7412, 15.0031),
    "yasur": (-19.5297, 169.4412),
    "villarrica": (-39.4210, -71.9310),
    "cotopaxi": (-0.6772, -78.4369),
    "taal": (14.0356, 120.9965),
    "great sitkin": (52.0760, -176.1300),
    "yellowstone": (44.4300, -110.6700),
}


def canonical_text(value) -> str:
    text = html.unescape(str(value or ""))
    text = re.sub(r"<[^>]+>", " ", text)
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"\s+", " ", text).strip()


def lower_blob(value) -> str:
    try:
        value = json.dumps(value, ensure_ascii=False, sort_keys=True)
    except Exception:
        value = str(value)
    return canonical_text(value).lower()


def safe_float(value):
    try:
        if value is None or value == "":
            return None
        return float(value)
    except Exception:
        return None


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def bounded_log(value: float) -> float:
    return math.log(max(EPS, value))


def hash24(obj) -> str:
    payload = json.dumps(obj, ensure_ascii=False, sort_keys=True, default=str)
    return hashlib.sha256(payload.encode("utf-8", errors="replace")).hexdigest()[:24]


def parse_time(value):
    if not value:
        return None
    if isinstance(value, (int, float)):
        raw = float(value) / 1000.0 if float(value) > 10_000_000_000 else float(value)
        try:
            return datetime.fromtimestamp(raw, UTC).isoformat()
        except Exception:
            return None
    text = str(value).strip()
    try:
        dt = datetime.fromisoformat(text.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=UTC)
        return dt.astimezone(UTC).isoformat()
    except Exception:
        pass
    try:
        dt = parsedate_to_datetime(text)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=UTC)
        return dt.astimezone(UTC).isoformat()
    except Exception:
        return None


def deep_get(obj, path):
    cur = obj
    for part in path:
        if isinstance(cur, dict):
            cur = cur.get(part)
        elif isinstance(cur, list) and isinstance(part, int) and 0 <= part < len(cur):
            cur = cur[part]
        else:
            return None
    return cur


def flatten_coords(coords):
    points = []
    if isinstance(coords, (list, tuple)):
        if len(coords) >= 2 and isinstance(coords[0], (int, float)) and isinstance(coords[1], (int, float)):
            lon, lat = coords[0], coords[1]
            if abs(lat) <= 90 and abs(lon) <= 180:
                points.append((float(lat), float(lon)))
        else:
            for item in coords:
                points.extend(flatten_coords(item))
    return points


def centroid(points):
    if not points:
        return None, None
    return sum(p[0] for p in points) / len(points), sum(p[1] for p in points) / len(points)


def regex_coordinates(text):
    if not text:
        return None, None
    patterns = [
        r"<georss:point>\s*(-?\d{1,3}(?:\.\d+)?)\s+(-?\d{1,3}(?:\.\d+)?)\s*</georss:point>",
        r"\b(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)\b",
        r"\blat(?:itude)?[:=\s]+(-?\d{1,3}(?:\.\d+)?).*?\blon(?:gitude)?[:=\s]+(-?\d{1,3}(?:\.\d+)?)",
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
        if not match:
            continue
        a = safe_float(match.group(1))
        b = safe_float(match.group(2))
        if a is None or b is None:
            continue
        if abs(a) <= 90 and abs(b) <= 180:
            return a, b
        if abs(b) <= 90 and abs(a) <= 180:
            return b, a
    return None, None


def referenced_location(text):
    blob = canonical_text(text).lower()
    for name, coords in VOLCANO_REFERENCE.items():
        if name in blob:
            return coords
    return None, None


def extract_coordinates(payload, text=""):
    if isinstance(payload, dict):
        for path in (("geometry", "coordinates"), ("properties", "geometry", "coordinates")):
            lat, lon = centroid(flatten_coords(deep_get(payload, path)))
            if lat is not None and lon is not None:
                return lat, lon
        for lat_path, lon_path in (
            (("latitude",), ("longitude",)),
            (("lat",), ("lon",)),
            (("lat",), ("lng",)),
            (("properties", "lat"), ("properties", "lon")),
            (("properties", "latitude"), ("properties", "longitude")),
        ):
            lat = safe_float(deep_get(payload, lat_path))
            lon = safe_float(deep_get(payload, lon_path))
            if lat is not None and lon is not None:
                return lat, lon
    blob = f"{lower_blob(payload)}\n{text}"
    lat, lon = regex_coordinates(blob)
    if lat is not None and lon is not None:
        return lat, lon
    return referenced_location(blob)


def first_present(payload, paths):
    if not isinstance(payload, dict):
        return None
    for path in paths:
        value = deep_get(payload, path)
        if value not in (None, ""):
            return value
    return None


def source_refs(record):
    refs = []
    for key in ("source_set", "source_family", "source_file"):
        value = record.get(key)
        if value:
            refs.append(str(value)[:220])
    return sorted(set(refs))


def parse_possible_json(text):
    if not isinstance(text, str):
        return None
    stripped = text.strip()
    if not stripped or stripped[0] not in "[{":
        return None
    try:
        return json.loads(stripped)
    except Exception:
        return None


def find_payload_texts(record):
    payloads = []
    payload_json = record.get("payload_json")
    payload_text = record.get("payload_text")
    if payload_text:
        payloads.append((payload_json if isinstance(payload_json, dict) else None, str(payload_text)[:MAX_OBSERVATION_TEXT]))
    if isinstance(payload_json, dict):
        for capture in payload_json.get("captures", []) or []:
            if not isinstance(capture, dict):
                continue
            result = capture.get("result") if isinstance(capture.get("result"), dict) else capture
            text = result.get("payload") or result.get("payload_preview") or result.get("text") or result.get("body") or ""
            if text:
                payloads.append((result, str(text)[:MAX_OBSERVATION_TEXT]))
    return payloads


def xml_text(elem, local_name):
    for child in list(elem):
        if child.tag.split("}")[-1].lower() == local_name.lower():
            return child.text or ""
    return ""


def build_observation(record, payload, text, ordinal):
    lat, lon = extract_coordinates(payload, text)
    timestamp = parse_time(
        first_present(
            payload,
            (
                ("timestamp_utc",),
                ("timestamp",),
                ("event_time",),
                ("time",),
                ("created_utc",),
                ("observed_utc",),
                ("pubDate",),
                ("properties", "time"),
                ("properties", "updated"),
            ),
        )
        or record.get("captured_utc")
    ) or utc_iso()
    summary = canonical_text(
        first_present(
            payload,
            (
                ("title",),
                ("event_title",),
                ("description",),
                ("summary",),
                ("properties", "title"),
                ("properties", "place"),
            ),
        )
        or text[:500]
    )[:700]
    return {
        "observation_id": hash24(
            {
                "source": record.get("source_file"),
                "ordinal": ordinal,
                "timestamp": timestamp,
                "summary": summary,
                "lat": lat,
                "lon": lon,
            }
        ),
        "timestamp_utc": timestamp,
        "latitude": lat,
        "longitude": lon,
        "summary": summary,
        "payload": payload if isinstance(payload, dict) else {},
        "text": canonical_text(text),
        "source_refs": source_refs(record),
        "source_set": record.get("source_set"),
        "source_family": record.get("source_family"),
        "source_file": record.get("source_file"),
        "sha256": record.get("sha256"),
    }


def observations_from_rss(record, payload, text):
    if "<item" not in text.lower():
        return []
    try:
        root = ElementTree.fromstring(text.encode("utf-8"))
    except Exception:
        return []
    observations = []
    for idx, item in enumerate(root.iter()):
        if item.tag.split("}")[-1].lower() != "item":
            continue
        fields = {
            "title": xml_text(item, "title"),
            "description": xml_text(item, "description"),
            "link": xml_text(item, "link"),
            "guid": xml_text(item, "guid"),
            "pubDate": xml_text(item, "pubDate"),
            "georss_point": xml_text(item, "point"),
        }
        item_text = " ".join(str(v) for v in fields.values() if v)
        if fields["georss_point"]:
            item_text += f" <georss:point>{fields['georss_point']}</georss:point>"
        observations.append(build_observation(record, fields, item_text, f"rss_item_{idx}"))
    return observations


def observations_from_geojson(record, payload, text):
    data = payload if isinstance(payload, dict) else parse_possible_json(text)
    if not isinstance(data, dict) or not isinstance(data.get("features"), list):
        return []
    return [
        build_observation(record, feature, json.dumps(feature, ensure_ascii=False)[:MAX_OBSERVATION_TEXT], f"feature_{idx}")
        for idx, feature in enumerate(data["features"][:MAX_FEATURES_PER_RECORD])
        if isinstance(feature, dict)
    ]


def expand_observations(record):
    expanded = []
    for payload, text in find_payload_texts(record):
        local = observations_from_rss(record, payload, text) + observations_from_geojson(record, payload, text)
        expanded.extend(local or [build_observation(record, payload or {}, text, "record")])
    if not expanded:
        expanded.append(build_observation(record, record.get("payload_json") or {}, record.get("payload_text", ""), "record"))
    return expanded


def signature_terms():
    terms = CFG.get("signatures")
    if isinstance(terms, dict):
        return {k: [canonical_text(t).lower() for t in v] for k, v in terms.items() if isinstance(v, list)}
    return DEFAULT_SIGNATURES


SIGNATURE_TERMS = signature_terms()


def term_hits(observation):
    payload = observation.get("payload")
    payload_blob = ""
    if isinstance(payload, dict):
        payload_blob = lower_blob({k: payload.get(k) for k in ("title", "description", "summary", "properties", "georss_point", "pubDate") if k in payload})
    blob = f"{payload_blob}\n{observation.get('text', '').lower()[:MAX_OBSERVATION_TEXT]}"
    hits = {}
    for signature, terms in SIGNATURE_TERMS.items():
        matched = []
        for term in terms:
            if not term:
                continue
            if re.search(r"(?<![a-z0-9])" + re.escape(term) + r"(?![a-z0-9])", blob):
                matched.append(term)
        if matched:
            hits[signature] = sorted(set(matched))
    return hits


def extract_numeric_features(observation, hits):
    text = observation.get("text", "").lower()
    payload = observation.get("payload") if isinstance(observation.get("payload"), dict) else {}
    mag = safe_float(first_present(payload, (("magnitude",), ("mag",), ("properties", "mag"))))
    alert = 0.0
    alert_match = re.search(r"alert level (?:remained at |raised to |lowered to )?(?:level )?(\d)", text)
    if alert_match:
        alert = clamp(float(alert_match.group(1)) / 5.0)
    for word, value in (("red", 0.95), ("orange", 0.75), ("warning", 0.75), ("watch", 0.65), ("advisory", 0.45)):
        if word in text:
            alert = max(alert, value)
    heights = [safe_float(v) for v in re.findall(r"(\d+(?:\.\d+)?)\s*(?:km|kilometers?)", text)]
    plume = clamp(max([h for h in heights if h is not None], default=0.0) / 20.0)
    wind_values = [safe_float(v) for v in re.findall(r"(\d+(?:\.\d+)?)\s*(?:kt|kts|mph|m/s|mps)", text)]
    wind = clamp(max([w for w in wind_values if w is not None], default=0.0) / 150.0)
    pressure_values = [safe_float(v) for v in re.findall(r"(\d{3,4}(?:\.\d+)?)\s*(?:mb|hpa)", text)]
    pressure_anomaly = clamp(abs(1013.25 - min(pressure_values)) / 80.0) if pressure_values else 0.0
    lightning = clamp(text.count("lightning") / 5.0)
    seismic = clamp(((mag or 0.0) / 8.0) + (text.count("earthquake") + text.count("tremor")) / 20.0)
    volcanic = clamp((len([w for w in ("eruption", "lava", "ash", "fountain", "plume", "tremor") if w in text]) / 6.0) + alert * 0.35 + plume * 0.35)
    weather = clamp((len([w for w in ("storm", "hail", "wind", "tornado", "convective", "cyclone") if w in text]) / 6.0) + wind * 0.5 + pressure_anomaly * 0.5 + lightning * 0.25)
    rf = clamp(len([w for w in ("rf", "radio", "ionosphere", "propagation", "blackout") if w in text]) / 5.0)
    raw_density = len(hits) / max(8.0, len(text.split()) / 80.0)
    return {
        "term_density": clamp(raw_density),
        "magnitude": mag,
        "alert": alert,
        "plume": plume,
        "wind": wind,
        "pressure_anomaly": pressure_anomaly,
        "lightning": lightning,
        "seismic": seismic,
        "volcanic": volcanic,
        "weather": weather,
        "rf": rf,
        "has_location": 1.0 if observation.get("latitude") is not None and observation.get("longitude") is not None else 0.0,
        "has_time": 1.0 if observation.get("timestamp_utc") else 0.0,
    }


def construct_state(observation, signature, hits):
    features = extract_numeric_features(observation, hits)
    family_bias = {
        "volcanic": features["volcanic"],
        "seismic": features["seismic"],
        "severe_weather": features["weather"],
        "tornadic": max(features["weather"], 0.8 if "tornado" in observation.get("text", "").lower() else 0.0),
        "tropical_cyclone": max(features["weather"], features["pressure_anomaly"], features["wind"]),
        "rf_disruption": features["rf"],
        "geomagnetic": features["rf"],
        "flood": features["weather"],
        "wildfire": features["weather"],
        "drought": features["weather"],
        "winter_weather": features["weather"],
        "tsunami": max(features["seismic"], features["weather"]),
        "grid_instability": features["rf"],
    }.get(signature, features["term_density"])
    intensity = clamp(0.45 * family_bias + 0.25 * features["term_density"] + 0.15 * features["alert"] + 0.15 * features["has_location"])
    interaction = clamp(0.35 * features["lightning"] + 0.25 * features["seismic"] + 0.20 * features["rf"] + 0.20 * features["wind"] + 0.10 * features["alert"])
    boundary = clamp(0.35 + 0.45 * intensity + 0.20 * features["has_location"] - 0.15 * features["pressure_anomaly"])
    frequency = clamp(0.20 + 0.30 * features["term_density"] + 0.20 * features["seismic"] + 0.20 * features["lightning"] + 0.10 * features["plume"])
    continuity = clamp(0.25 + 0.25 * features["has_time"] + 0.25 * features["has_location"] + 0.25 * features["alert"])
    aggregate = clamp(0.20 + 0.30 * intensity + 0.25 * features["has_location"] + 0.25 * min(1.0, len(hits) / 4.0))
    path = clamp(0.20 + 0.45 * features["has_location"] + 0.20 * features["wind"] + 0.15 * features["plume"])
    xi_f = clamp(0.50 + intensity - features["pressure_anomaly"], EPS, 4.0)
    vector = [
        bounded_log(xi_f),
        interaction,
        bounded_log(clamp(boundary, EPS, 4.0)),
        bounded_log(clamp(frequency, EPS, 4.0)),
        bounded_log(clamp(continuity, EPS, 4.0)),
        aggregate,
        bounded_log(clamp(path, EPS, 4.0)),
    ]
    return {
        "coordinates": {
            "ln_xi_f": vector[0],
            "chi_e": vector[1],
            "ln_q_shell": vector[2],
            "ln_chi_omega": vector[3],
            "ln_chi_s": vector[4],
            "chi_mol": vector[5],
            "ln_chi_lambda": vector[6],
        },
        "vector": [round(v, 6) for v in vector],
        "features": {k: round(v, 6) if isinstance(v, float) else v for k, v in features.items()},
        "matched_terms": hits,
    }


def q_shell(state):
    return math.exp(state["coordinates"]["ln_q_shell"])


def xi_f(state):
    return math.exp(state["coordinates"]["ln_xi_f"])


def chi_omega(state):
    return math.exp(state["coordinates"]["ln_chi_omega"])


def chi_s(state):
    return math.exp(state["coordinates"]["ln_chi_s"])


def chi_lambda(state):
    return math.exp(state["coordinates"]["ln_chi_lambda"])


def transfer(sa, sb):
    return q_shell(sa) * q_shell(sb) - abs(sa["coordinates"]["chi_e"] - sb["coordinates"]["chi_e"]) - ((xi_f(sa) - xi_f(sb)) ** 2)


def coherence(state):
    return clamp(math.exp(-abs(state["coordinates"]["ln_xi_f"])) * math.exp(-abs(state["coordinates"]["chi_e"])) * q_shell(state))


def structural_change(sa, sb):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(sa["vector"], sb["vector"])))


def coupling(sa, sb):
    return transfer(sa, sb) * math.sqrt(max(EPS, coherence(sa) * coherence(sb)))


def influence(state):
    return coherence(state) * abs(state["coordinates"]["chi_e"])


def responsiveness(state):
    chi_e = max(EPS, abs(state["coordinates"]["chi_e"]))
    k_act = chi_e * chi_lambda(state) * chi_omega(state) * chi_s(state)
    return coherence(state) * (1.0 - math.exp(-k_act))


def propagation_coefficient(state):
    theta = xi_f(state) * math.exp(-state["coordinates"]["chi_e"]) * q_shell(state)
    psi = 1.0 + 0.5 * (1.0 - math.exp(-max(EPS, responsiveness(state))))
    return max(0.0, theta * psi * chi_lambda(state) * chi_omega(state))


def time_order_key(frame_or_obs):
    obs = frame_or_obs.get("observation", frame_or_obs)
    try:
        return datetime.fromisoformat(obs["timestamp_utc"]).timestamp()
    except Exception:
        return 0.0


def distance_km(a, b):
    if None in (a.get("latitude"), a.get("longitude"), b.get("latitude"), b.get("longitude")):
        return None
    lat1, lon1 = math.radians(a["latitude"]), math.radians(a["longitude"])
    lat2, lon2 = math.radians(b["latitude"]), math.radians(b["longitude"])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    h = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 6371.0 * 2.0 * math.asin(min(1.0, math.sqrt(h)))


def build_candidates(records):
    candidates = []
    observation_count = 0
    for record in records:
        for observation in expand_observations(record):
            observation_count += 1
            hits_by_signature = term_hits(observation)
            for signature, hits in hits_by_signature.items():
                state = construct_state(observation, signature, hits)
                candidates.append(
                    {
                        "signature_class": signature,
                        "observation": observation,
                        "state": state,
                        "coherence": coherence(state),
                        "influence": influence(state),
                        "responsiveness": responsiveness(state),
                        "propagation": propagation_coefficient(state),
                    }
                )
    return candidates, observation_count


def select_live_records(records):
    selected = []
    streams = []
    for record in records:
        source_set = record.get("source_set")
        if source_set == "streams":
            streams.append(record)
        else:
            selected.append(record)
    streams.sort(key=lambda r: str(r.get("captured_utc", "")), reverse=True)
    selected.extend(streams[:MAX_STREAM_RECORDS])
    return selected


def cluster_key(candidate):
    obs = candidate["observation"]
    signature = candidate["signature_class"]
    lat, lon = obs.get("latitude"), obs.get("longitude")
    if lat is not None and lon is not None:
        return signature, round(lat, 1), round(lon, 1)
    return signature, obs.get("source_family"), hash24(obs.get("summary", "")[:120])


def persistence_score(frames):
    if not frames:
        return 0.0
    presence = clamp(len(frames) / 3.0)
    located = sum(1 for f in frames if f["observation"].get("latitude") is not None) / len(frames)
    forms = len({hash24(f["state"]["vector"])[:8] for f in frames})
    form = clamp(forms / max(1, len(frames)))
    relation = clamp(sum(f["coherence"] for f in frames) / len(frames))
    interference = 1.0 - clamp(sum(1 for f in frames if f["coherence"] < 0.2) / len(frames))
    obstruction = located
    return clamp((presence + form + relation + interference + obstruction) / 5.0)


def trajectory_check(frames):
    ordered = sorted(frames, key=time_order_key)
    transitions = []
    admissible = True
    for prev, cur in zip(ordered, ordered[1:]):
        delta = structural_change(prev["state"], cur["state"])
        gamma = coupling(prev["state"], cur["state"])
        distance = distance_km(prev["observation"], cur["observation"])
        transition = {
            "from_observation": prev["observation"]["observation_id"],
            "to_observation": cur["observation"]["observation_id"],
            "delta_t": round(delta, 6),
            "transfer": round(transfer(prev["state"], cur["state"]), 6),
            "coupling": round(gamma, 6),
            "distance_km": round(distance, 3) if distance is not None else None,
            "admissible": delta <= 4.0 and gamma >= -1.5,
        }
        admissible = admissible and transition["admissible"]
        transitions.append(transition)
    return admissible, transitions


def selected_future_state(frames, persistence, trajectory_ok):
    current = sorted(frames, key=time_order_key)[-1]
    phi = propagation_coefficient(current["state"])
    vector = list(current["state"]["vector"])
    vector[3] = vector[3] - (phi * 0.05)
    return {
        "base_observation": current["observation"]["observation_id"],
        "state_vector": [round(v, 6) for v in vector],
        "propagation_coefficient": round(phi, 6),
        "admissible": bool(trajectory_ok and persistence >= 0.35),
    }


def resolve_cluster(key, frames):
    frames = sorted(frames, key=time_order_key)
    current = frames[-1]
    p_score = persistence_score(frames)
    trajectory_ok, transitions = trajectory_check(frames)
    if len(frames) > 1:
        deltas = [structural_change(a["state"], b["state"]) for a, b in zip(frames, frames[1:])]
        couplings = [coupling(a["state"], b["state"]) for a, b in zip(frames, frames[1:])]
        avg_delta = sum(deltas) / len(deltas)
        avg_coupling = sum(couplings) / len(couplings)
    else:
        avg_delta = current["state"]["features"]["term_density"]
        avg_coupling = current["coherence"] * 0.25
    operator_results = {
        "change_delta_t": round(avg_delta, 6),
        "coherence_c_t": round(current["coherence"], 6),
        "coupling_gamma_t": round(avg_coupling, 6),
        "influence_pi_t": round(current["influence"], 6),
        "responsiveness_lambda_t": round(current["responsiveness"], 6),
        "persistence_p_s": round(p_score, 6),
        "trajectory_admissible": trajectory_ok,
        "propagation_phi": round(current["propagation"], 6),
    }
    falsifiers = []
    if current["coherence"] < 0.18:
        falsifiers.append("low_coherence")
    if p_score < 0.25:
        falsifiers.append("insufficient_persistence")
    if not trajectory_ok:
        falsifiers.append("trajectory_violation")
    if current["responsiveness"] < 0.03:
        falsifiers.append("inactive_structure")
    if current["observation"].get("latitude") is None:
        falsifiers.append("unbounded_location")
    closure = "resolved" if not falsifiers and p_score >= 0.35 else "bounded"
    if "low_coherence" in falsifiers or "trajectory_violation" in falsifiers:
        closure = "rejected"
    seam_phi = clamp(
        0.20
        + 0.20 * current["coherence"]
        + 0.18 * clamp(avg_delta / 2.0)
        + 0.18 * clamp((avg_coupling + 1.0) / 2.0)
        + 0.14 * current["responsiveness"]
        + 0.20 * p_score
    )
    obs = current["observation"]
    signature = current["signature_class"]
    event_seed = {
        "signature": signature,
        "key": key,
        "summary": obs["summary"][:200],
        "lat": obs.get("latitude"),
        "lon": obs.get("longitude"),
    }
    event_id = f"SEAM-{hash24(event_seed)}"
    selected_state = selected_future_state(frames, p_score, trajectory_ok)
    refs = sorted({ref for frame in frames for ref in frame["observation"].get("source_refs", [])})
    signal_summary = {
        "question": f"Resolve retained {signature} structure from Step 2 manifold",
        "requested_output": ["event", "location", "timing", "trajectory", "diagnostics"],
        "closure": closure,
        "observation_count": len(frames),
        "window_start_utc": frames[0]["observation"]["timestamp_utc"],
        "window_end_utc": obs["timestamp_utc"],
        "matched_terms": sorted({term for frame in frames for term in frame["state"]["matched_terms"]}),
        "summary": obs["summary"],
        "operator_results": operator_results,
        "falsifiers": falsifiers,
    }
    return {
        "event_id": event_id,
        "signature_class": signature,
        "primary_regime": signature,
        "timestamp_utc": obs["timestamp_utc"],
        "latitude": obs.get("latitude"),
        "longitude": obs.get("longitude"),
        "spatial_region": f"{round(obs['latitude'], 2)}_{round(obs['longitude'], 2)}" if obs.get("latitude") is not None and obs.get("longitude") is not None else None,
        "geohash": f"{round(obs['latitude'], 3)}:{round(obs['longitude'], 3)}" if obs.get("latitude") is not None and obs.get("longitude") is not None else None,
        "seam_phi": round(seam_phi, 4),
        "projected_event_time": obs["timestamp_utc"] if selected_state["admissible"] else None,
        "signal_summary": json.dumps(signal_summary, ensure_ascii=False),
        "source_refs": refs,
        "magnitude": current["state"]["features"].get("magnitude"),
        "official_reference": obs.get("sha256") or hash24(refs),
        "evidence_hash": hash24(event_seed),
        "state_vector": current["state"]["vector"],
        "operator_results": operator_results,
        "trajectory": transitions,
        "selected_state": selected_state,
        "closure_status": closure,
        "falsifiers": falsifiers,
        "observation_ids": [frame["observation"]["observation_id"] for frame in frames],
    }


def resolve_manifold(candidates):
    clusters = defaultdict(list)
    for candidate in candidates:
        clusters[cluster_key(candidate)].append(candidate)
    resolved = [resolve_cluster(key, frames) for key, frames in clusters.items()]
    retained = [event for event in resolved if event["closure_status"] != "rejected"]
    retained.sort(key=lambda event: (-event["seam_phi"], event.get("signature_class", ""), event.get("timestamp_utc", ""), event.get("event_id", "")))
    return retained, resolved


def main():
    print("\n=== STEP 3 STRUCTURAL MANIFOLD RESOLUTION ===\n", flush=True)
    if not STEP2_FILE.exists():
        print("[step3] missing continuum master:", flush=True)
        print(f"[step3] {STEP2_FILE}", flush=True)
        return
    master = load_json(STEP2_FILE)
    records = master.get("entries", [])
    print(f"[step3] loaded substrate entries: {len(records)}", flush=True)
    active_records = select_live_records(records)
    print(f"[step3] selected live records: {len(active_records)}", flush=True)
    candidates, observation_count = build_candidates(active_records)
    matches, all_resolutions = resolve_manifold(candidates)
    counts = Counter(event["signature_class"] for event in matches)
    candidate_counts = Counter(candidate["signature_class"] for candidate in candidates)
    output = {
        "generated_utc": utc_iso(),
        "schema": SCHEMA,
        "source": str(STEP2_FILE),
        "white_paper_contract": {
            "state_vector": ["ln_xi_f", "chi_e", "ln_q_shell", "ln_chi_omega", "ln_chi_s", "chi_mol", "ln_chi_lambda"],
            "operators": ["transfer", "coherence", "change", "coupling", "influence", "responsiveness", "persistence", "trajectory_check", "propagation", "future_state_selection"],
            "time_reference": {"presentation": "UTC ISO-8601", "canonical_basis_hz": CS133_HZ},
        },
        "records_scanned": len(records),
        "records_selected": len(active_records),
        "observations_constructed": observation_count,
        "candidate_state_count": len(candidates),
        "signature_classes": len(counts),
        "signature_counts": dict(sorted(counts.items())),
        "candidate_signature_counts": dict(sorted(candidate_counts.items())),
        "total_manifold_events": len(matches),
        "matches": matches,
        "manifold_events": matches,
        "event_substrate": matches,
        "all_operator_returns": all_resolutions,
    }
    write_json(OUTFILE, output)
    append_jsonl(
        LOGFILE,
        {
            "records_scanned": len(records),
            "records_selected": len(active_records),
            "observations_constructed": observation_count,
            "candidate_state_count": len(candidates),
            "total_manifold_events": len(matches),
            "signature_counts": dict(counts),
        },
    )
    print(f"[step3] continuum substrate: {STEP2_FILE}")
    print(f"[step3] substrate entries: {len(records)}")
    print(f"[step3] selected live records: {len(active_records)}")
    print(f"[step3] observations constructed: {observation_count}")
    print(f"[step3] candidate structural states: {len(candidates)}")
    for key_name, value in sorted(counts.items()):
        print(f"[step3] retained {key_name}: {value}")
    print(f"[step3] total manifold events: {len(matches)}")
    print(f"[step3] output: {OUTFILE}")
    update_event_tracker(matches)


def update_event_tracker(matches):
    try:
        from tracker_manager import update_tracker_with_events

        tracker, removed = update_tracker_with_events(matches)
        print(f"[step3] tracker updated: {len(tracker['events'])} events, {removed} pruned")
    except Exception as exc:
        print(f"[step3] tracker update failed: {exc}")


if __name__ == "__main__":
    main()
