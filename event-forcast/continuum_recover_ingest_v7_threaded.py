#!/usr/bin/env python3
"""
Continuum Recover / Discover / Change-Gated Ingest v5

Single-list behavior:
  1. Walk every registry source.
  2. Use conditional HTTP validators first.
  3. If unchanged, do NOT download/store the payload.
  4. If changed, retrieve once, hash, and preserve immutable raw bytes.
  5. Record acquisition manifest and source state.
  6. Discover new pollable endpoints from changed HTML/JSON payloads.
  7. Preserve no duplicate raw object when hash is unchanged.

Notes:
- HTTP 304 / ETag / Last-Modified can prevent body transfer.
- Sources without reliable validators require a GET to prove change.
  Duplicate bytes are then discarded rather than preserved.
- Standard library only.
"""

from __future__ import annotations
import argparse, hashlib, html.parser, json, os, re, socket, ssl, statistics, tempfile, time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
import urllib.error, urllib.parse, urllib.request
from datetime import datetime, timezone
from pathlib import Path

UA = "ContinuumWeather-RecoverIngest/0.5"
READ_LIMIT = 64 * 1024 * 1024
MAX_HISTORY = 100

DATA_EXT = {
    ".json",".geojson",".xml",".csv",".txt",".dat",".data",".spec",".supl",
    ".adcp",".ocean",".swr1",".swr2",".swdir",".swdir2",".data_spec",
    ".m3u8",".mpd",".rss",".atom",".cap",".kml",".kmz",".grib",".grb",
    ".grib2",".nc",".netcdf",".hdf",".h5",".fits",".bin"
}
DATASET_HINTS = (
    "/api/", "/feed/", "/feeds/", "/data/", "/products/", "/product/",
    "/collections", "/catalog", "/realtime", "/latest", "/current",
    "/observations", "/stations", "/radar", "/alerts", "/summary/",
    ".json", ".geojson", ".xml", ".csv", ".txt", ".m3u8", ".mpd",
    ".rss", ".atom", ".nc", ".grib", ".grib2"
)
RECORD_PATTERNS = [
    re.compile(r"/alerts/[A-Za-z0-9._:-]{8,}$", re.I),
    re.compile(r"/stations/[A-Z0-9]{3,10}$", re.I),
    re.compile(r"/events/[A-Za-z0-9._:-]{6,}$", re.I),
    re.compile(r"/earthquakes/eventpage/", re.I),
    re.compile(r"/features/[A-Za-z0-9._:-]{6,}$", re.I),
]

def utcnow():
    return datetime.now(timezone.utc)

def iso(dt):
    return dt.isoformat().replace("+00:00","Z")

def parse_iso(value):
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z","+00:00"))
    except Exception:
        return None

def atomic_write_json(path: Path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=path.name+".", suffix=".tmp", dir=str(path.parent))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(obj, f, indent=2, ensure_ascii=False)
            f.write("\n")
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)

def append_jsonl(path: Path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(obj, ensure_ascii=False) + "\n")

def sha256_bytes(data: bytes):
    return hashlib.sha256(data).hexdigest()

def stable_id(url):
    return "DISC-" + hashlib.sha1(url.encode("utf-8")).hexdigest()[:14].upper()

def safe_name(value):
    return re.sub(r"[^A-Za-z0-9._-]+", "_", str(value)).strip("_") or "source"

def source_url(candidate):
    access = candidate.get("access") or {}
    return access.get("data_endpoint") or access.get("landing_url")

def normalize_url(base, raw):
    if not raw:
        return None
    raw = raw.strip().strip("'\"")
    if raw.startswith(("javascript:", "mailto:", "#", "data:")):
        return None
    if raw.startswith("//"):
        raw = urllib.parse.urlparse(base).scheme + ":" + raw
    url = urllib.parse.urljoin(base, raw)
    p = urllib.parse.urlparse(url)
    if p.scheme not in ("http", "https", "ws", "wss"):
        return None
    return urllib.parse.urlunparse((p.scheme,p.netloc,p.path,p.params,p.query,""))

def is_record_url(url):
    path = urllib.parse.urlparse(url).path
    return any(rx.search(path) for rx in RECORD_PATTERNS)

def looks_pollable(url):
    if is_record_url(url):
        return False
    p = urllib.parse.urlparse(url)
    if Path(p.path).suffix.lower() in DATA_EXT:
        return True
    low = url.lower()
    return any(h in low for h in DATASET_HINTS)

class LinkParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for k in ("href","src","data-src","action"):
            if a.get(k):
                self.links.append(a[k])
        if tag == "source" and a.get("srcset"):
            for value in a["srcset"].split(","):
                self.links.append(value.strip().split()[0])

def classify_payload(content_type, body):
    ct=(content_type or "").lower()
    sample=body[:4096].lstrip().lower()
    if "json" in ct or sample.startswith((b"{",b"[")): return "json"
    if "xml" in ct or sample.startswith(b"<?xml"): return "xml"
    if "csv" in ct: return "csv"
    if "mpegurl" in ct or b"#extm3u" in sample: return "hls_manifest"
    if "html" in ct or b"<html" in sample or b"<!doctype html" in sample: return "html"
    if ct.startswith("image/"): return "image"
    if ct.startswith("audio/"): return "audio"
    if ct.startswith("video/"): return "video"
    if ct.startswith("text/"): return "text"
    if "octet-stream" in ct: return "binary"
    return "unknown"

def request_http(url, timeout, method="GET", headers=None, read_body=True):
    started=time.perf_counter()
    out={
        "ok":False,"not_modified":False,"url_requested":url,"url_final":None,
        "status_code":None,"elapsed_ms":None,"content_type":None,
        "content_length":None,"bytes_read":0,"payload_class":None,
        "payload_sha256":None,"etag":None,"last_modified":None,
        "date_header":None,"error_type":None,"error":None,"body":b""
    }
    h={"User-Agent":UA,"Accept":"*/*"}
    if headers:
        h.update(headers)
    try:
        req=urllib.request.Request(url,headers=h,method=method)
        with urllib.request.urlopen(req,timeout=timeout,context=ssl.create_default_context()) as r:
            rh={k.lower():v for k,v in r.headers.items()}
            body=r.read(READ_LIMIT) if read_body and method!="HEAD" else b""
            out.update(
                ok=True,
                url_final=r.geturl(),
                status_code=getattr(r,"status",None),
                content_type=rh.get("content-type"),
                content_length=rh.get("content-length"),
                bytes_read=len(body),
                payload_class=classify_payload(rh.get("content-type"),body) if body else None,
                payload_sha256=sha256_bytes(body) if body else None,
                etag=rh.get("etag"),
                last_modified=rh.get("last-modified"),
                date_header=rh.get("date"),
                body=body
            )
    except urllib.error.HTTPError as e:
        if e.code == 304:
            rh={k.lower():v for k,v in e.headers.items()}
            out.update(
                ok=True,not_modified=True,status_code=304,
                url_final=getattr(e,"url",url),etag=rh.get("etag"),
                last_modified=rh.get("last-modified"),
                date_header=rh.get("date"),content_type=rh.get("content-type"),
                content_length=rh.get("content-length")
            )
        else:
            out.update(status_code=e.code,error_type="http_error",error=str(e),
                       url_final=getattr(e,"url",url))
    except urllib.error.URLError as e:
        reason=getattr(e,"reason",None)
        typ="dns_error" if isinstance(reason,socket.gaierror) else \
            "tls_error" if isinstance(reason,ssl.SSLError) else \
            "timeout" if isinstance(reason,(socket.timeout,TimeoutError)) else "url_error"
        out.update(error_type=typ,error=str(e))
    except Exception as e:
        out.update(error_type=type(e).__name__,error=str(e))
    out["elapsed_ms"]=round((time.perf_counter()-started)*1000,3)
    return out

def validator_headers(candidate):
    health=candidate.get("health") or {}
    headers={"Cache-Control":"no-cache"}
    if health.get("last_etag"):
        headers["If-None-Match"]=health["last_etag"]
    if health.get("last_modified"):
        headers["If-Modified-Since"]=health["last_modified"]
    return headers

def cheap_change_probe(candidate, timeout):
    """
    Return (state, probe)
      state = unchanged | changed | unknown | error
    """
    url=source_url(candidate)
    if not url:
        return "error", {"error_type":"no_endpoint","error":"No endpoint configured."}

    parsed=urllib.parse.urlparse(url)
    if parsed.scheme not in ("http","https"):
        return "error", {"error_type":"protocol_unsupported","error":"Unsupported protocol."}

    old=(candidate.get("health") or {})
    headers=validator_headers(candidate)

    # Conditional HEAD first. It transfers no payload body.
    head=request_http(url,timeout,method="HEAD",headers=headers,read_body=False)

    if head.get("not_modified") or head.get("status_code")==304:
        return "unchanged", head

    if head.get("ok"):
        old_etag=old.get("last_etag")
        old_lm=old.get("last_modified")
        new_etag=head.get("etag")
        new_lm=head.get("last_modified")

        if old_etag and new_etag:
            return ("unchanged" if old_etag==new_etag else "changed"), head
        if old_lm and new_lm:
            return ("unchanged" if old_lm==new_lm else "changed"), head

        # No reliable validators: body GET is required to prove change.
        return "unknown", head

    # HEAD is often unsupported. Try conditional GET; 304 still avoids body transfer.
    if head.get("status_code") in (400,403,405,501) or head.get("error_type"):
        cond=request_http(url,timeout,method="GET",headers=headers,read_body=True)
        if cond.get("not_modified") or cond.get("status_code")==304:
            return "unchanged", cond
        if cond.get("ok"):
            return "body_ready", cond
        return "error", cond

    return "error", head

def discover_html(base, body):
    text=body.decode("utf-8","ignore")
    p=LinkParser()
    try: p.feed(text)
    except Exception: pass
    vals=list(p.links)
    vals += re.findall(r"https?://[^\s\"'<>\\]+|wss?://[^\s\"'<>\\]+", text, re.I)
    vals += re.findall(
        r"[\"']([^\"']+\.(?:json|geojson|xml|csv|txt|m3u8|mpd|nc|grib2?|rss|atom)(?:\?[^\"']*)?)[\"']",
        text,re.I
    )
    out=[]
    for raw in vals:
        u=normalize_url(base,raw)
        if u and looks_pollable(u):
            out.append(u)
    return list(dict.fromkeys(out))

def walk_json(obj, values, record_counter):
    if isinstance(obj,dict):
        for k,v in obj.items():
            kl=k.lower()
            if kl in {"features","items","events","alerts"} and isinstance(v,list):
                record_counter[0]+=len(v)
                continue
            if isinstance(v,str) and (
                kl in {"href","url","self","next","link","collection","catalog","feed"}
                or v.startswith(("http://","https://","ws://","wss://"))
            ):
                values.append(v)
            else:
                walk_json(v,values,record_counter)
    elif isinstance(obj,list):
        for v in obj:
            walk_json(v,values,record_counter)

def discover_json(base, body):
    try:
        obj=json.loads(body.decode("utf-8","ignore"))
    except Exception:
        return [],0
    vals=[]; rc=[0]
    walk_json(obj,vals,rc)
    out=[]
    for raw in vals:
        u=normalize_url(base,raw)
        if u and looks_pollable(u):
            out.append(u)
    return list(dict.fromkeys(out)),rc[0]

def ext_for(content_type, payload_class, url):
    suffix=Path(urllib.parse.urlparse(url).path).suffix
    if suffix and len(suffix)<=12:
        return suffix
    return {
        "json":".json","xml":".xml","csv":".csv","html":".html",
        "image":".img","audio":".audio","video":".video",
        "hls_manifest":".m3u8","text":".txt","binary":".bin"
    }.get(payload_class,".bin")

def preserve_raw(store_root, candidate, probe, checked):
    cid=safe_name(candidate.get("candidate_id","unknown"))
    dt=checked
    raw_dir=store_root/"raw"/safe_name(candidate.get("scientific_regime",["other"])[0] if candidate.get("scientific_regime") else "other")/f"{dt:%Y}"/f"{dt:%m}"/f"{dt:%d}"/cid
    raw_dir.mkdir(parents=True,exist_ok=True)

    digest=probe["payload_sha256"]
    ext=ext_for(probe.get("content_type"),probe.get("payload_class"),probe.get("url_final") or probe.get("url_requested") or "")
    filename=f"{dt:%Y%m%dT%H%M%S.%fZ}_{digest[:16]}{ext}"
    raw_path=raw_dir/filename

    # Content-addressed duplicate protection within candidate history.
    if not raw_path.exists():
        with raw_path.open("wb") as f:
            f.write(probe["body"])

    manifest={
        "candidate_id":candidate.get("candidate_id"),
        "provider":candidate.get("provider"),
        "dataset":candidate.get("dataset"),
        "sector":candidate.get("sector"),
        "country":candidate.get("country"),
        "scientific_regime":candidate.get("scientific_regime"),
        "retrieved_utc":iso(checked),
        "request_url":probe.get("url_requested"),
        "final_url":probe.get("url_final"),
        "status_code":probe.get("status_code"),
        "content_type":probe.get("content_type"),
        "byte_length":probe.get("bytes_read"),
        "sha256":digest,
        "etag":probe.get("etag"),
        "last_modified":probe.get("last_modified"),
        "raw_path":str(raw_path),
        "parent_id":candidate.get("parent_id"),
        "discovery_depth":candidate.get("discovery_depth")
    }
    manifest_dir=store_root/"manifests"/f"{dt:%Y}"/f"{dt:%m}"/f"{dt:%d}"
    manifest_path=manifest_dir/f"{cid}_{dt:%Y%m%dT%H%M%S.%fZ}_{digest[:16]}.json"
    atomic_write_json(manifest_path,manifest)
    return raw_path,manifest_path

def make_child(parent,url,t,method):
    p=urllib.parse.urlparse(url)
    return {
        "candidate_id":stable_id(url),
        "provider":parent.get("provider","unknown"),
        "dataset":Path(p.path).name or p.path or url,
        "scientific_regime":parent.get("scientific_regime",[]),
        "content_type":"unknown",
        "source_kind":"discovered",
        "parent_id":parent.get("candidate_id"),
        "sector":parent.get("sector"),
        "country":parent.get("country"),
        "region":parent.get("region"),
        "access_policy":parent.get("access_policy"),
        "discovery_depth":int(parent.get("discovery_depth") or 0)+1,
        "access":{
            "landing_url":None,"data_endpoint":url,"protocol":p.scheme,
            "adapter":"auto_discovered","authentication":"none_or_unknown"
        },
        "availability":{
            "mode":"observed","last_checked_utc":None,"last_success_utc":None,
            "last_change_utc":None,"observed_change_intervals_sec":[],
            "median_change_interval_sec":None,"jitter_sec":None,
            "published_interval_sec":None,"next_expected_utc":None,
            "observation_count":0,"change_count":0
        },
        "discovery":{
            "enabled":True,"first_seen_utc":iso(t),"last_seen_utc":iso(t),
            "method":method,"discovered_children":0
        },
        "health":{
            "status":"candidate","http_reachable":None,"payload_valid":None,
            "payload_changes":None,"notes":"Automatically discovered pollable endpoint."
        },
        "ingest":{
            "enabled":True,"preserve_raw":True,"last_preserved_sha256":None,
            "last_preserved_utc":None,"preserved_objects":0,"unchanged_checks":0
        },
        "change_probe":{
            "method":"auto","url":None,"json_timestamp_path":None
        }
    }

def update_timing(candidate, checked, changed):
    av=candidate.setdefault("availability",{})
    av["last_checked_utc"]=iso(checked)
    av["observation_count"]=int(av.get("observation_count") or 0)+1
    av.setdefault("observed_change_intervals_sec",[])
    av.setdefault("change_count",0)
    if changed:
        previous=parse_iso(av.get("last_change_utc"))
        if previous:
            delta=(checked-previous).total_seconds()
            if delta>=0:
                arr=av["observed_change_intervals_sec"]
                arr.append(round(delta,3))
                if len(arr)>MAX_HISTORY:
                    del arr[:-MAX_HISTORY]
                med=statistics.median(arr)
                av["median_change_interval_sec"]=round(med,3)
                if len(arr)>1:
                    av["jitter_sec"]=round(statistics.median(abs(x-med) for x in arr),3)
        av["last_change_utc"]=iso(checked)
        av["change_count"]=int(av.get("change_count") or 0)+1

def status_from_probe(probe,payload_class=None):
    code=probe.get("status_code")
    if probe.get("error_type")=="no_endpoint": return "discovery"
    if probe.get("error_type") in {"dns_error","timeout","tls_error","url_error"}: return "temporary_failure"
    if code in (401,403): return "auth_required"
    if code==429: return "rate_limited"
    if code and code>=500: return "temporary_failure"
    if code and code>=400: return "degraded"
    if not probe.get("ok"): return "degraded"
    if payload_class=="html": return "discovery"
    return "active"



_host_locks_guard = threading.Lock()
_host_semaphores = {}

def host_key(candidate):
    url = source_url(candidate) or ""
    try:
        return urllib.parse.urlparse(url).netloc.lower() or "unknown"
    except Exception:
        return "unknown"

def host_semaphore(host, limit):
    with _host_locks_guard:
        sem = _host_semaphores.get(host)
        if sem is None:
            sem = threading.BoundedSemaphore(limit)
            _host_semaphores[host] = sem
        return sem

def probe_candidate_snapshot(candidate, timeout, per_host):
    """
    Network phase only. Does not mutate shared registry state.
    Returns enough information for the main thread to apply the result safely.
    """
    url = source_url(candidate)
    checked = utcnow()
    host = host_key(candidate)
    sem = host_semaphore(host, per_host)

    with sem:
        state, probe = cheap_change_probe(candidate, timeout)

        if state in ("unchanged", "error"):
            return {
                "candidate_id": candidate.get("candidate_id"),
                "checked": checked,
                "state": state,
                "probe": probe,
                "body_probe": None,
            }

        if state == "body_ready":
            body_probe = probe
        else:
            body_probe = request_http(
                url,
                timeout,
                method="GET",
                headers=validator_headers(candidate),
                read_body=True,
            )

        return {
            "candidate_id": candidate.get("candidate_id"),
            "checked": checked,
            "state": state,
            "probe": probe,
            "body_probe": body_probe,
        }

def apply_probe_result(c, result, store, known, candidates, args, stats):
    """
    Serialized mutation/commit phase. All registry mutations occur in the main thread.
    """
    checked = result["checked"]
    state = result["state"]
    probe = result["probe"]

    if state == "unchanged":
        update_timing(c, checked, False)
        c.setdefault("availability", {})["last_success_utc"] = iso(checked)
        h = c.setdefault("health", {})
        # Preserve discovery state for HTML/non-payload roots.
        prior_class = h.get("last_payload_class")
        status = "discovery" if prior_class == "html" and not h.get("payload_valid") else "active"
        h.update(
            status=status,
            http_reachable=True,
            payload_changes=False,
            last_checked_utc=iso(checked),
            last_status_code=probe.get("status_code"),
            last_etag=probe.get("etag") or h.get("last_etag"),
            last_modified=probe.get("last_modified") or h.get("last_modified"),
            last_error_type=None,
            last_error=None,
        )
        ing = c.setdefault("ingest", {})
        ing["unchanged_checks"] = int(ing.get("unchanged_checks") or 0) + 1
        stats["unchanged_no_body"] += 1
        return "unchanged-validator"

    if state == "error":
        update_timing(c, checked, False)
        h = c.setdefault("health", {})
        h.update(
            status=status_from_probe(probe),
            http_reachable=False,
            last_checked_utc=iso(checked),
            last_status_code=probe.get("status_code"),
            last_error_type=probe.get("error_type"),
            last_error=probe.get("error"),
        )
        stats["errors"] += 1
        return "error"

    body_probe = result["body_probe"]
    stats["bytes_transferred"] += int(body_probe.get("bytes_read") or 0)

    if body_probe.get("not_modified") or body_probe.get("status_code") == 304:
        update_timing(c, checked, False)
        c.setdefault("availability", {})["last_success_utc"] = iso(checked)
        ing = c.setdefault("ingest", {})
        ing["unchanged_checks"] = int(ing.get("unchanged_checks") or 0) + 1
        stats["unchanged_no_body"] += 1
        return "unchanged-304"

    if not body_probe.get("ok"):
        update_timing(c, checked, False)
        h = c.setdefault("health", {})
        h["status"] = status_from_probe(body_probe)
        h["last_error_type"] = body_probe.get("error_type")
        h["last_error"] = body_probe.get("error")
        h["last_checked_utc"] = iso(checked)
        stats["errors"] += 1
        return "retrieval-error"

    digest = body_probe.get("payload_sha256")
    ing = c.setdefault("ingest", {})
    prior_digest = ing.get("last_preserved_sha256") or (c.get("health") or {}).get("last_payload_sha256")
    changed = (digest != prior_digest) if prior_digest else True

    update_timing(c, checked, changed)
    c.setdefault("availability", {})["last_success_utc"] = iso(checked)

    h = c.setdefault("health", {})
    pclass = body_probe.get("payload_class")
    h.update(
        status=status_from_probe(body_probe, pclass),
        http_reachable=True,
        payload_changes=changed,
        last_payload_sha256=digest,
        last_etag=body_probe.get("etag"),
        last_modified=body_probe.get("last_modified"),
        last_payload_class=pclass,
        last_status_code=body_probe.get("status_code"),
        last_content_type=body_probe.get("content_type"),
        last_bytes_read=body_probe.get("bytes_read"),
        last_checked_utc=iso(checked),
        last_error_type=None,
        last_error=None,
        payload_valid=bool(pclass not in (None, "unknown", "html")),
    )

    if not changed:
        ing["unchanged_checks"] = int(ing.get("unchanged_checks") or 0) + 1
        stats["body_checked_unchanged"] += 1
        return "unchanged-hash"

    raw_path, manifest_path = preserve_raw(store, c, body_probe, checked)
    ing["last_preserved_sha256"] = digest
    ing["last_preserved_utc"] = iso(checked)
    ing["preserved_objects"] = int(ing.get("preserved_objects") or 0) + 1
    stats["changed_preserved"] += 1
    stats["bytes_preserved"] += int(body_probe.get("bytes_read") or 0)

    # Discovery only on changed content.
    d = c.setdefault("discovery", {})
    d["last_seen_utc"] = iso(checked)
    if d.get("enabled", True):
        base_url = body_probe.get("url_final") or source_url(c)
        if pclass == "html":
            found = discover_html(base_url, body_probe["body"])
            records = 0
            method = "html_link/script"
        elif pclass == "json":
            found, records = discover_json(base_url, body_probe["body"])
            method = "json_link"
        else:
            found, records, method = [], 0, "none"

        stats["records_observed"] += records
        added = 0
        for found_url in found:
            if stats["new_discovered"] >= args.max_new or added >= args.max_new_per_parent:
                break
            if found_url in known:
                known[found_url].setdefault("discovery", {})["last_seen_utc"] = iso(checked)
                continue
            nc = make_child(c, found_url, checked, method)
            candidates.append(nc)
            known[found_url] = nc
            added += 1
            stats["new_discovered"] += 1

        d["discovered_children"] = int(d.get("discovered_children") or 0) + added
        d["records_observed_last_probe"] = records

    return "changed"

def run_pass(reg, path, store, args, pass_number):
    candidates = reg.get("candidates", [])
    known = {source_url(c): c for c in candidates if source_url(c)}
    selected = [c for c in candidates if not args.only or c.get("candidate_id") == args.only]
    if args.max_test > 0:
        selected = selected[:args.max_test]

    by_id = {c.get("candidate_id"): c for c in selected}
    pass_started = utcnow()
    stats = {
        "pass": pass_number,
        "started_utc": iso(pass_started),
        "tested": 0,
        "unchanged_no_body": 0,
        "body_checked_unchanged": 0,
        "changed_preserved": 0,
        "errors": 0,
        "bytes_transferred": 0,
        "bytes_preserved": 0,
        "new_discovered": 0,
        "records_observed": 0,
        "workers": args.workers,
        "per_host": args.per_host,
        "checkpoint_every": args.checkpoint_every,
    }

    print(f"\n=== PASS {pass_number}/{args.passes} ===")
    print(f"Started: {stats['started_utc']}")
    print(f"Candidates: {len(selected)} | workers={args.workers} | per-host={args.per_host}")

    completed = 0
    last_checkpoint = 0

    with ThreadPoolExecutor(max_workers=args.workers, thread_name_prefix="cw") as pool:
        futures = {
            pool.submit(probe_candidate_snapshot, c, args.timeout, args.per_host): c.get("candidate_id")
            for c in selected
        }

        for fut in as_completed(futures):
            cid = futures[fut]
            completed += 1
            stats["tested"] += 1
            c = by_id.get(cid)

            try:
                result = fut.result()
                outcome = apply_probe_result(c, result, store, known, candidates, args, stats)
            except Exception as e:
                stats["errors"] += 1
                outcome = f"exception:{type(e).__name__}"
                if c is not None:
                    h = c.setdefault("health", {})
                    h["status"] = "degraded"
                    h["last_error_type"] = type(e).__name__
                    h["last_error"] = str(e)
                    h["last_checked_utc"] = iso(utcnow())

            if completed % args.progress_every == 0 or completed == len(selected):
                print(
                    f"[{completed}/{len(selected)}] "
                    f"changed={stats['changed_preserved']} "
                    f"unchanged={stats['unchanged_no_body'] + stats['body_checked_unchanged']} "
                    f"errors={stats['errors']}"
                )

            # Checkpoint the large registry only periodically, never per candidate.
            if args.checkpoint_every > 0 and completed - last_checkpoint >= args.checkpoint_every:
                reg.setdefault("registry", {})["candidate_count"] = len(candidates)
                reg["registry"]["last_run_utc"] = iso(utcnow())
                reg["registry"]["last_checkpoint_completed"] = completed
                atomic_write_json(path, reg)
                last_checkpoint = completed

    # Single authoritative commit at end of pass.
    reg.setdefault("registry", {})["candidate_count"] = len(candidates)
    reg["registry"]["last_run_utc"] = iso(utcnow())
    reg["registry"]["last_checkpoint_completed"] = len(selected)
    atomic_write_json(path, reg)

    pass_finished = utcnow()
    stats["finished_utc"] = iso(pass_finished)
    stats["duration_sec"] = round((pass_finished - pass_started).total_seconds(), 3)
    stats["candidates_after_pass"] = len(candidates)

    append_jsonl(store / "run_log.jsonl", stats)

    print(f"Finished: {stats['finished_utc']}")
    print(f"Duration: {stats['duration_sec']:.3f} sec")
    return stats

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("registry", nargs="?", default="continuum_source_registry_v4.json")
    ap.add_argument("--store", default="manifold_store")
    ap.add_argument("--timeout", type=float, default=12.0)
    ap.add_argument("--max-new", type=int, default=2000)
    ap.add_argument("--max-new-per-parent", type=int, default=150)
    ap.add_argument("--max-test", type=int, default=0)
    ap.add_argument("--only")
    ap.add_argument("--passes", type=int, default=1)
    ap.add_argument("--workers", type=int, default=32)
    ap.add_argument("--per-host", type=int, default=4)
    ap.add_argument("--checkpoint-every", type=int, default=100)
    ap.add_argument("--progress-every", type=int, default=50)
    args = ap.parse_args()

    if args.passes < 1 or args.workers < 1 or args.per_host < 1:
        raise SystemExit("passes/workers/per-host must be at least 1")

    path = Path(args.registry).resolve()
    store = Path(args.store).resolve()
    reg = json.loads(path.read_text(encoding="utf-8"))

    overall_started = utcnow()
    pass_reports = []

    for pass_number in range(1, args.passes + 1):
        pass_reports.append(run_pass(reg, path, store, args, pass_number))

    overall_finished = utcnow()
    durations = [p["duration_sec"] for p in pass_reports]
    totals = {
        k: sum(p[k] for p in pass_reports)
        for k in (
            "tested","unchanged_no_body","body_checked_unchanged",
            "changed_preserved","errors","bytes_transferred",
            "bytes_preserved","new_discovered","records_observed"
        )
    }

    final_report = {
        "overall_started_utc": iso(overall_started),
        "overall_finished_utc": iso(overall_finished),
        "overall_duration_sec": round((overall_finished-overall_started).total_seconds(),3),
        "passes": args.passes,
        "workers": args.workers,
        "per_host": args.per_host,
        "per_pass": pass_reports,
        "totals": totals,
        "timing": {
            "fastest_pass_sec": min(durations),
            "slowest_pass_sec": max(durations),
            "average_pass_sec": round(sum(durations)/len(durations),3),
        },
        "final_candidate_count": len(reg.get("candidates",[])),
    }

    atomic_write_json(store/"pass_report.json", final_report)
    append_jsonl(store/"session_log.jsonl", final_report)

    print("\nFINAL REPORT")
    for p in pass_reports:
        print(
            f"Pass {p['pass']}: {p['duration_sec']:.3f}s | tested={p['tested']} | "
            f"changed={p['changed_preserved']} | "
            f"unchanged={p['unchanged_no_body']+p['body_checked_unchanged']} | errors={p['errors']}"
        )
    print(
        f"Overall={final_report['overall_duration_sec']:.3f}s | "
        f"avg={final_report['timing']['average_pass_sec']:.3f}s | "
        f"workers={args.workers} | per-host={args.per_host}"
    )
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
