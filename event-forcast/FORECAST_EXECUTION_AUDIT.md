# Forecast execution audit — November 17, 2026

## Verified execution path

The workflow downloads observations with `continuum_recover_ingest_v7_threaded.py`,
builds an ARCV with `seam_runtime/build_manifold_from_store.py`, and invokes
`seam_runtime/question_runner.py` through `backend_processor_live.py`.
`publish_live_feed.py` separately obtains current USGS/NWS observations. Those
observations are published as official observations, not native predictions.

`seam_runtime/seam_engine.py::relation_vector` compares byte-frequency histograms
and bins more than 255 comparisons. `evaluate_question` returns operator diagnostics
and ranked source matches. It does not return predicted event location, event time,
calibrated confidence, or a validated event record. Operator execution counts
cannot be presented as evidence that those outputs were computed.

## Corrections in this change

- Removed the active no-op Step 4 from `backend_processor_live.py`.
- Removed its official-alert-to-prediction conversion, including default 0.85
  confidence and timestamps substituted with the current execution time.
- Missing runtime/manifold, subprocess failures, incomplete operator output, and
  inconsistent diagnostic counts now fail execution instead of continuing with
  apparently successful event extraction.
- Workflow output describes operator diagnostics. It no longer claims events
  were extracted. Pipe failure propagation is explicit.
- Historical tracker data is left intact; no new events are invented.

## Other implementations examined, not activated

`processes/step4_operational_event_matrix/step4_operational_event_matrix.py`
contains keyword-based fallback confidence ("eruption" -> 0.97), a forecast time
set to execution time plus four hours, and default duration/magnitude strings.
These cannot establish a validated prediction and remain disconnected.

`processes/step3_volcanic_analysis/step3_volcanic_analysis.py` uses keyword
signatures, constructed feature vectors, weighted scores, and assigns observation
time as projected event time. Its existence does not verify it as a mapping from
the deployed 66-operator runtime to a future event.

The uncommitted local `D:/GitLive/seam-private-engines/Manifold/seam_event_runner.py`
extracts official alert fields and derives strength from severity/urgency.
The local `event-forcast/engine.py` identifies itself as a synthetic clean-room
scaffold. Neither was copied into this deployment or changed.

Branches `official-match-step5`, `blind-official-separation`, and
`query-specific-manifold` contain confirmation/materialization changes; they
do not supply the missing operator-to-event prediction implementation.

## Canonical source checked and remaining gap

`D:/Ground Up/04-Manifold/MANIFOLD_CONSTRUCTION_AND_COMPARISON_COMPLETE.md`,
sections VI–VIII and XII, requires structural representation, a query-specific
evidence contract, and validation closure. It explicitly distinguishes structure
from surface encoding. The deployed byte-frequency representation is not verified
against that contract in this audit.

A working forecast still requires an authenticated executable structural mapping
and event-output projection with reproducible validation. No replacement equations,
thresholds, confidence percentages, event dates, or stub decoder were introduced.
The public "no current native event predictions" status remains correct.
