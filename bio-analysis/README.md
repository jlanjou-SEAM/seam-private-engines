# SEAM Bio Analysis Engine

Proprietary SEAM v3.12 locked runtime for structural perturbation analysis of pharmaceuticals and medical conditions.

## Quick Start

### Build
```bash
# Linux/macOS
./BUILD.sh enhanced

# Windows (MinGW)
BUILD.bat enhanced

# Or manually
gcc -o seam-server seam-server-enhanced.c -lpthread -Wall -O2
```

### Run
```bash
./seam-server
# Output: Server listening on http://localhost:5000
```

### Test
```bash
curl http://localhost:5000/health
curl http://localhost:5000/compounds | jq '.count'
```

## Files

- **seam-server-enhanced.c** — Production C server (zero dependencies)
- **seam-backend-enhanced.py** — Python alternative (Flask + CORS)
- **SEAM_Archive/** — Locked runtime (v3.12) with engine, data, and verification
- **Documentation/** — ARCHITECTURE.md, SETUP.md, QUICKSTART.md, etc.

## Environment Variables

- `SEAM_BIO_API_URL` — Frontend should point to your deployed server (default: http://localhost:5000)
- `SEAM_CORS_ORIGIN` — Lock CORS to this origin (frontend URL only, not wildcard)

## Endpoints

- **GET /health** — Server health check
- **GET /compounds** — List available compounds
- **GET /conditions** — List available conditions
- **POST /analyze** — Submit analysis job `{compounds: [...], conditions: [...]}`
- **GET /results/{taskId}** — Poll analysis results

## Security

- **CORS**: Locked to public frontend origin only (not `*`)
- **Lock Hash**: Verify with `SEAM_Archive/LOCK.json` SHA256
- **Port Access**: Restricted to internal deployment; public frontend reaches via HTTPS proxy

## Integration

Public frontend: [continuum-bio-analysis](https://github.com/jlanjou-SEAM/continuum-bio-analysis)  
Frontend calls: `${SEAM_BIO_API_URL}/analyze` with JSON payload
