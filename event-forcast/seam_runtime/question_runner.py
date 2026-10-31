#!/usr/bin/env python3
import argparse, csv, json
from pathlib import Path
from seam_engine import evaluate_question
p=argparse.ArgumentParser(description='Run one question against the active ARCV manifold through all 66 operators.')
p.add_argument('question')
p.add_argument('--manifold', default='manifold.arcv')
p.add_argument('--json-out', default='answer.json')
p.add_argument('--csv-out', default='answer.csv')
a=p.parse_args()
res=evaluate_question(a.question, a.manifold)
Path(a.json_out).write_text(json.dumps(res, indent=2, ensure_ascii=False), encoding='utf-8')
with open(a.csv_out,'w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f, fieldnames=['operator_id','nomenclature','signature','requirements_satisfied','missing_requirements','result_type','indices_consumed','result'])
    w.writeheader()
    for r in res['operators']:
        row=dict(r); row['missing_requirements']=json.dumps(row['missing_requirements']); row['result']=json.dumps(row['result'],ensure_ascii=False)
        w.writerow(row)
print(json.dumps({'resolved':res['resolved'],'unresolved':res['unresolved'],'manifold_entry_count':res['manifold_entry_count'],'json_out':a.json_out,'csv_out':a.csv_out,'top_matches':res['top_matches'][:3]}, indent=2))
