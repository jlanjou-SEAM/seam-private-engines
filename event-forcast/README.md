# SEAM Event Forcast Engine

Proprietary collector pipeline and orchestration for the Continuum Database — acquires data from 118+ sources across multiple buckets with automatic processing and anomaly detection.

## Structure

- **collectors/** — 118 data source collectors (one module per source)
- **step1_raw_data_retrieval/** — Acquisition configuration and scripts
- **processes/** — Processing pipeline (Steps 2-5): validation, anomaly detection, substrate wrapping, reconciliation
- **workflows/** — GitHub Actions YAML files for automated scheduling
- **seam_orchestrator.py** — Central orchestration logic

## Quick Start

### Local Testing
```bash
cd step1_raw_data_retrieval
python acquisition_runtime.py          # Live data acquisition
python acquisition_runtime_72hr.py     # 72-hour window backfill
```

### GitHub Actions Deployment

Workflows automatically run on schedule:
- **Realtime bucket**: Every 1-5 minutes (22 sources)
- **Nonrealtime bucket**: Every 5 minutes (69 sources)
- **Official bucket**: Every 1-5 minutes (6 sources)
- **Batch (72hr)**: Every 6 hours
- **Batch (168hr)**: Weekly on Sunday

### Collector Development

Add a new collector:
1. Create `collectors/{source_name}.py`
2. Register in `step1_raw_data_retrieval/collector_sources.json`
3. Commit here; public repo pulls on next workflow

## Environment Variables

- `SEAM_RETRIEVAL_MODE` — "live", "live_plus_72h", or "weekly_168hr_update"
- `SEAM_BACKFILL_HOURS` — 0 (live), 72, or 168
- `SEAM_WINDOW_START_UTC` / `SEAM_WINDOW_END_UTC` — Time boundaries
- `SEAM_ACQUISITION_LABEL` — Bucket name (realtime, nonrealtime, official, streams)

## Output

Results committed to public repo:
- `realtime/*.json` — Live data (22 sources)
- `nonrealtime/*.json` — Secondary data (69 sources)
- `official/*.json` — Alerts (6 sources)
- `streams/*.json` — Continuous feeds (8 sources)
- `curated/*.json` — Processed anomalies
- `state/*.sha256` — Integrity checksums

## Integration

Public repo: [Continuum-Event-Forcast](https://github.com/jlanjou-SEAM/Continuum-Event-Forcast) (SEAM-Core)

The public repo has no collector code — it only:
- Runs GitHub Actions workflows (pulled from `.github/workflows/` here)
- Stores output data files
- Commits results on each cycle

## Security

- **Proprietary Collectors**: Not public; kept in this private repo
- **Configuration**: `collector_sources.json` stays private (API endpoints, timeouts, credentials)
- **Public Outputs**: Data files are public (results of collection, not the collection logic itself)
