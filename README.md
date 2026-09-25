# SEAM Private Engines

**⚠️ PROPRIETARY — PRIVATE REPOSITORY**

Centralized engine repository for all SEAM public frontends. This repo holds the proprietary processing engines, builders, and locked runtimes that power the public-facing interfaces.

## Repository Structure

### `bio-analysis/`
- **Purpose**: SEAM Compound Analyzer backend — v3.12 locked runtime for structural perturbation analysis
- **Public Frontend**: [continuum-bio-analysis](https://github.com/jlanjou-SEAM/continuum-bio-analysis)
- **Exposure**: REST API on **port 5000** via `seam-server-enhanced.c` or `seam-backend-enhanced.py`
- **Endpoints**: `/health`, `/compounds`, `/conditions`, `/analyze`, `/results/{taskId}`
- **Contents**:
  - `seam-server-enhanced.c` — Zero-dependency C HTTP server (production)
  - `seam-backend*.py` — Python backends (Flask variants)
  - `SEAM_Archive/` — Locked runtime (v3.12) with data files, core engine, and verification
  - Build scripts: `BUILD.sh`, `BUILD.bat`, `Makefile`
  - Documentation: `ARCHITECTURE.md`, `SETUP.md`, `QUICKSTART.md`, `DEPLOY_SETUP.md`

### `event-forcast/`
- **Purpose**: SEAM Continuum Database collector pipeline — 118+ data source acquisition system
- **Public Frontend**: [Continuum-Event-Forcast](https://github.com/jlanjou-SEAM/Continuum-Event-Forcast) (SEAM-Core)
- **Exposure**: Git-based (no live port) — runs via GitHub Actions workflows; results committed to public repo
- **Contents**:
  - `collectors/` — 118 collector modules (one per data source)
  - `step1_raw_data_retrieval/` — Acquisition scripts and configuration
  - `processes/` — Step 2-5 processing pipeline
  - `workflows/` — GitHub Actions YAML for scheduling (realtime, batch, reconciliation)
  - `seam_orchestrator.py` — Orchestration logic
  - Documentation: `CLAUDE.md`, `GITHUB_ACTIONS_SETUP.md`

### `paradigm/`
- **Purpose**: Documentation framework (no engine)
- **Public Frontend**: [Continuum-Paradigm](https://github.com/jlanjou-SEAM/Continuum-Paradigm)
- **Exposure**: None — pure markdown/validation documentation
- **Contents**: Empty or minimal (documentation is public in the Paradigm repo itself)

### `shared/`
- **Purpose**: Common data, schemas, and shared resources
- **Contents**:
  - `SEAM_common_drugs_supplements_choice_registry_v1.json` — Compound database (used by bio-analysis)
  - `conditions_database.json` — Medical conditions profiles (used by bio-analysis)
  - `collector_sources.json` — Collector configuration schema (used by event-forcast)
  - Engine-design documentation and lock contracts

---

## Access & Deployment

### For `continuum-bio-analysis`:
1. **Build the server locally or in a CI pipeline**:
   ```bash
   cd bio-analysis
   ./BUILD.sh enhanced  # or BUILD.bat on Windows
   ./seam-server
   ```
2. **Configure the public frontend** to point to your deployed server:
   - Environment variable: `SEAM_BIO_API_URL` (default: `http://localhost:5000`)
   - CORS: Locked to public frontend origin only (not `*`)

### For `Continuum-Event-Forcast`:
1. **Pull collectors and configuration** into the public repo at deploy time
2. **GitHub Actions workflows** run on schedule, pull latest collectors from here
3. **No live server** — all data flows through Git commits

### For `Continuum-Paradigm`:
- No engine needed — see the public repo for all documentation

---

## Security & Provenance

- **Locked Runtimes**: bio-analysis engine is hash-verified (SHA256 lock in `SEAM_Archive/LOCK.json`)
- **Access Control**: This repo is private; only team members can clone/pull
- **Public Frontends**: Have no engine code — only static HTML, data JSONs, and API client code
- **Commit History**: Purged from public repos to protect proprietary implementations

---

## Development

### For bio-analysis engine development:
```bash
cd bio-analysis
make          # Compile C server
python seam-backend-enhanced.py  # or run C server
```

### For event-forcast collector development:
```bash
cd event-forcast
python seam_orchestrator.py --test  # Test orchestration
```

### Adding a new collector:
1. Create `collectors/{source_name}.py`
2. Register in `step1_raw_data_retrieval/collector_sources.json`
3. Test locally, then commit here
4. Public repo pulls on next workflow run

---

## Integration with Public Repos

| Public Repo | Dependency | Integration Method |
|---|---|---|
| `continuum-bio-analysis` | `bio-analysis/` | Deploy port 5000; frontend calls `SEAM_BIO_API_URL` |
| `Continuum-Event-Forcast` | `event-forcast/` | GitHub Actions submodule/workflow triggers; pulls collectors |
| `Continuum-Paradigm` | `paradigm/` | None (pure docs) |

---

## License

Proprietary — SEAM Foundation. Not for public distribution.

---

**Last Updated**: 2026-09-25  
**Maintained by**: Jason Palmer (jlanjou@gmail.com)
