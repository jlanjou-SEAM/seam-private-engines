SEAM 66-Manifold Runtime

Files:
  manifold.arcv       base ARCV manifold copied from supplied manifold(4).arcv
  seam_engine.py      common engine: manifold load/append, question-manifold relation, 66-operator execution
  operator_matrix.py  supplied 66-operator registry implementation
  ingest_runner.py    append exactly one raw datum to manifold.arcv; exact duplicates are suppressed
  question_runner.py  run one question against manifold.arcv and emit all 66 operator rows

Usage:
  python ingest_runner.py <datum_file> --manifold manifold.arcv
  python question_runner.py "How many planets are in this solar system?" --manifold manifold.arcv

The question runner does not select an operator by nomenclature. It computes a raw numerical question-to-manifold relation vector and invokes all 66 operator specifications. Missing mathematical prerequisites are reported as unresolved.
