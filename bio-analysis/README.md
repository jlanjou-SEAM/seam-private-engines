# Corrected native execution path

Use the Python API and instructions in [BIO_RUNTIME_CONNECTION.md](BIO_RUNTIME_CONNECTION.md)
for actual v3.12 engine execution. It requires compound, dose, and interval and
returns native row-wise results. The C server described below is a separate
implementation and is not the repaired engine adapter. The bundled Manifold is a
retained snapshot; an updating feed and public HTTPS deployment are not supplied
by the validation workflow.

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

- **seam-server-enhanced.c** â€” Production C server (zero dependencies)
- **seam-backend-enhanced.py** â€” Python alternative (Flask + CORS)
- **SEAM_Archive/** â€” Locked runtime (v3.12) with engine, data, and verification
- **Documentation/** â€” ARCHITECTURE.md, SETUP.md, QUICKSTART.md, etc.

## Environment Variables

- `SEAM_BIO_API_URL` â€” Frontend should point to your deployed server (default: http://localhost:5000)
- `SEAM_CORS_ORIGIN` â€” Lock CORS to this origin (frontend URL only, not wildcard)

## Endpoints

- **GET /health** â€” Server health check
- **GET /compounds** â€” List available compounds
- **GET /conditions** â€” List available conditions
- **POST /analyze** â€” Submit analysis job `{compounds: [...], conditions: [...]}`
- **GET /results/{taskId}** â€” Poll analysis results

## Security

- **CORS**: Locked to public frontend origin only (not `*`)
- **Lock Hash**: Verify with `SEAM_Archive/LOCK.json` SHA256
- **Port Access**: Restricted to internal deployment; public frontend reaches via HTTPS proxy

## Integration

Public frontend: [continuum-bio-analysis](https://github.com/jlanjou-SEAM/continuum-bio-analysis)  
Frontend calls: `${SEAM_BIO_API_URL}/analyze` with JSON payload
