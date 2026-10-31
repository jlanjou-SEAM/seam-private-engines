from __future__ import annotations
import base64, hashlib, json, math, os
from pathlib import Path
from typing import Any
import numpy as np
import operator_matrix as op

VECTOR_DIM = 255


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _decode_outer(path: str | Path) -> dict:
    raw = Path(path).read_bytes()
    try:
        decoded = base64.b64decode(raw, validate=True)
        obj = json.loads(decoded)
        if isinstance(obj, dict):
            return obj
    except Exception:
        pass
    return json.loads(raw.decode('utf-8'))


def _encode_outer(path: str | Path, obj: dict) -> None:
    payload = json.dumps(obj, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    Path(path).write_bytes(base64.b64encode(payload))


def _inner_surface(obj: dict) -> dict:
    if obj.get('_seam_marcv_substrate') == 1 and isinstance(obj.get('entries'), list):
        if len(obj['entries']) == 1 and isinstance(obj['entries'][0], dict) and isinstance(obj['entries'][0].get('entries'), list):
            return obj['entries'][0]
        return obj
    raise ValueError('Unsupported manifold.arcv structure')


def load_manifold(path: str | Path) -> tuple[dict, dict, list[dict]]:
    outer = _decode_outer(path)
    surface = _inner_surface(outer)
    entries = surface.get('entries', [])
    if not isinstance(entries, list):
        raise ValueError('Manifold entries are not a list')
    return outer, surface, entries


def entry_bytes(entry: dict) -> bytes:
    if entry.get('payload_encoding') == 'base64' and 'payload_base64' in entry:
        return base64.b64decode(entry['payload_base64'])
    if isinstance(entry.get('payload_text'), str):
        return entry['payload_text'].encode('utf-8')
    if 'payload_json' in entry:
        return json.dumps(entry['payload_json'], ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf-8')
    return json.dumps(entry, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf-8')


def append_single_datum(manifold_path: str | Path, datum: bytes, source_name: str = 'datum.bin') -> dict:
    outer, surface, entries = load_manifold(manifold_path)
    digest = sha256(datum)
    for idx, e in enumerate(entries):
        existing = e.get('sha256')
        if existing == digest:
            return {'status':'duplicate','sha256':digest,'entry_index':idx,'entry_count':len(entries)}
        try:
            if sha256(entry_bytes(e)) == digest:
                return {'status':'duplicate','sha256':digest,'entry_index':idx,'entry_count':len(entries)}
        except Exception:
            pass
    new_entry = {
        'file_name': source_name,
        'source_family': 'single_datum_append',
        'source_file': source_name,
        'source_set': 'append',
        'payload_encoding': 'base64',
        'payload_base64': base64.b64encode(datum).decode('ascii'),
        'sha256': digest,
        'bytes': len(datum),
    }
    entries.append(new_entry)
    if 'entry_count' in surface:
        surface['entry_count'] = len(entries)
    _encode_outer(manifold_path, outer)
    return {'status':'added','sha256':digest,'entry_index':len(entries)-1,'entry_count':len(entries),'bytes':len(datum)}


def byte_histogram(data: bytes) -> np.ndarray:
    h = np.bincount(np.frombuffer(data, dtype=np.uint8), minlength=256).astype(float) if data else np.zeros(256)
    s = h.sum()
    return h / s if s else h


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    na = float(np.linalg.norm(a)); nb = float(np.linalg.norm(b))
    if na == 0 or nb == 0: return 0.0
    return float(np.dot(a,b)/(na*nb))


def relation_vector(question: bytes, entries: list[dict], dim: int = VECTOR_DIM) -> tuple[np.ndarray, list[dict]]:
    qh = byte_histogram(question)
    sims = []
    for i,e in enumerate(entries):
        raw = entry_bytes(e)
        s = cosine(qh, byte_histogram(raw))
        sims.append((i,s,e.get('file_name') or e.get('source_file') or f'entry_{i}'))
    v = np.zeros(dim, dtype=float)
    if len(sims) <= dim:
        for i,s,_ in sims: v[i] = s
    else:
        # Preserve all comparisons by partitioning ordered manifold entries into 255 bins.
        counts = np.zeros(dim, dtype=int)
        for pos,(_,s,_) in enumerate(sims):
            b = min(dim-1, int(math.floor(dim * pos / len(sims))))
            v[b] += s; counts[b] += 1
        nz = counts > 0; v[nz] /= counts[nz]
    ranked = sorted(({'entry_index':i,'similarity':s,'source':name} for i,s,name in sims), key=lambda x:x['similarity'], reverse=True)
    return v, ranked



def jsonable(x):
    if isinstance(x, np.ndarray):
        if np.iscomplexobj(x):
            return [{"real": float(z.real), "imag": float(z.imag)} for z in x.ravel()]
        return x.tolist()
    if isinstance(x, np.generic):
        if np.iscomplexobj(x):
            z=complex(x); return {"real": float(z.real), "imag": float(z.imag)}
        return x.item()
    if isinstance(x, complex):
        return {"real": float(x.real), "imag": float(x.imag)}
    if isinstance(x, tuple):
        return [jsonable(v) for v in x]
    if isinstance(x, list):
        return [jsonable(v) for v in x]
    if isinstance(x, dict):
        return {str(k): jsonable(v) for k,v in x.items()}
    return x

def evaluate_question(question: str | bytes, manifold_path: str | Path, **extra: Any) -> dict:
    q = question.encode('utf-8') if isinstance(question,str) else bytes(question)
    _, surface, entries = load_manifold(manifold_path)
    v, ranked = relation_vector(q, entries)
    # The supplied operator registry works over v/A. Reshape is only a numeric view for M-signature operators.
    M = v.reshape(51,5)
    A = op.compute_arc_outputs(v)
    ctx = op.build_context(M, **extra)
    # build_context reconstructs identical v/A from M; ensure relation vector is authoritative.
    ctx['v'] = v; ctx['A'] = A; ctx['M'] = M
    if 'probability' not in extra:
        ctx['probability'] = op.softmax(v)
    rows=[]
    for s in op.REGISTRY:
        missing=[x for x in s.requires if x not in ctx]
        if missing:
            rows.append({'operator_id':s.operator_id,'nomenclature':s.nomenclature,'signature':s.signature,'requirements_satisfied':False,'missing_requirements':missing,'result':None,'result_type':s.result_type,'indices_consumed':s.indices_consumed})
            continue
        try:
            result=s.execute(ctx); ok=result is not None
            result=jsonable(result)
            rows.append({'operator_id':s.operator_id,'nomenclature':s.nomenclature,'signature':s.signature,'requirements_satisfied':ok,'missing_requirements':[] if ok else ['mathematical_precondition'],'result':result,'result_type':s.result_type,'indices_consumed':s.indices_consumed})
        except Exception as exc:
            rows.append({'operator_id':s.operator_id,'nomenclature':s.nomenclature,'signature':s.signature,'requirements_satisfied':False,'missing_requirements':[f'execution_precondition:{type(exc).__name__}'],'result':None,'result_type':s.result_type,'indices_consumed':s.indices_consumed})
    return {
        'question_sha256': sha256(q),
        'question_bytes': len(q),
        'manifold_entry_count': len(entries),
        'manifold_schema': surface.get('schema'),
        'relation_vector_dim': len(v),
        'top_matches': ranked[:10],
        'operators': rows,
        'resolved': sum(1 for r in rows if r['requirements_satisfied']),
        'unresolved': sum(1 for r in rows if not r['requirements_satisfied']),
    }
