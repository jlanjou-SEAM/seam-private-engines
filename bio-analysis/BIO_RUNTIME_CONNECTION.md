# Bio runtime connection

`seam-backend-enhanced.py` now executes the archived v3.12 Python engine through
`bio_runtime.py`. The former handler simulated completion without running it.
The C server is a separate implementation and is not the corrected execution path.

## Run and verify

From the repository root:

```sh
python -m pip install -r bio-analysis/requirements.txt
python bio-analysis/test_bio_api.py -v
python bio-analysis/seam-backend-enhanced.py --port 5000
```

All default artifact paths are relative to the checkout. The adapter extracts the
original runtime archive to temporary storage and verifies its existing lock
manifest before execution. This avoids Windows Git newline conversions changing
the locked source bytes. The engine equations and archived files are unchanged.
`--runtime` or `SEAM_BIO_RUNTIME` may select another complete, verified runtime
directory conforming to this same contract. A failed artifact gate prevents execution.

Submit `POST /analyze` with:

```json
{"compounds":[{"compound":"Famotidine","dose":"40 mg","interval":"once daily"}]}
```

Poll `GET /results/{task_id}` until completed or failed. A completed result has
schema `SEAM_BIO_NATIVE_RESULTS_V1` and contains native results, including all
5,734 independently evaluated rows. A batch contains separate compound runs;
it does not claim combined interaction effects. Condition labels are a reference
catalog, not chemical inputs. Missing doses and intervals are not guessed.

The frontend requires this result schema in `/health`, collects explicit inputs,
and displays the returned metrics without computing replacement results.
For a local test, serve the public checkout on port 8000 and open its HTML page.
For an HTTPS deployment, set the page's `seam-bio-api` meta value to the real
service address. The `?api=` parameter supports connection testing.

## Deployment boundary

The bundled reference is a retained, locked snapshot, **not an updating living
Manifold feed**. This change does not introduce or claim such a producer. Each
request retains the runtime selected at submission. Integrating an updated
reference requires a producer of compatible runtime artifacts; arbitrary JSON or
an unrelated `manifold.arcv` cannot replace `prescreen.lock`.

GitHub Actions runs the native API integration tests on Linux. That workflow is
validation, not a persistent HTTP service. GitHub Pages serves the frontend;
the corrected Python API still needs an HTTPS service deployment for public use.
The development command binds to localhost by default. Public deployment must
provide HTTPS routing and a production process manager. Tasks are in-memory, so
requests and polls must reach the same process. Results expire after 30 minutes;
the API limits concurrent runs and retained tasks, and uses unpredictable task IDs.
No user inputs or generated results are committed to GitHub by this change.

`SEAM_BIO_ORIGINS` configures allowed browser origins (comma-separated). The
default permits the published GitHub Pages origin and local port 8000 testing.
