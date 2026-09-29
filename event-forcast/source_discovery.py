#!/usr/bin/env python3
"""
Source Discovery & Management
Identifies, tests, and registers new data sources.
Strategy: All data regimes valid → test after adding, not before.
Focus areas: EDU, International, Utilities, Open data.
"""

import json
from pathlib import Path
from datetime import datetime, timezone

def generate_source_candidates():
    """Generate candidates for new data sources to test"""

    candidates = {
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "strategy": "Accept all, prune invalid after testing",
        "candidates": {
            "edu_seismic": [
                {"name": "UNAVCO", "url": "https://www.unavco.org/data/", "category": ["seismic", "geodesy"], "priority": "high"},
                {"name": "Berkeley Seismic Lab", "url": "https://seismo.berkeley.edu/", "category": ["seismic"], "priority": "high"},
                {"name": "Caltech Seismic Network", "url": "https://www.usgs.gov/programs/vhp/volcanic-rocks", "category": ["seismic"], "priority": "high"},
                {"name": "LDEO", "url": "https://www.ldeo.columbia.edu/research", "category": ["seismic", "climate"], "priority": "high"},
                {"name": "University of Washington Seismic", "url": "https://www.pnsn.org/", "category": ["seismic"], "priority": "high"},
            ],
            "edu_weather": [
                {"name": "University of Wyoming Weather", "url": "https://weather.uwyo.edu/", "category": ["weather"], "priority": "high"},
                {"name": "Cornell Lab Ornithology (bioacoustics)", "url": "https://www.allaboutbirds.org/", "category": ["bioacoustics", "environmental"], "priority": "medium"},
            ],
            "international_seismic": [
                {"name": "JMA Japan", "url": "https://www.jma.go.jp/jma/indexe.html", "category": ["seismic", "weather"], "priority": "high"},
                {"name": "CENC China", "url": "https://www.cenc.ac.cn/", "category": ["seismic"], "priority": "high"},
                {"name": "GFZ Germany", "url": "https://www.gfz-potsdam.de/", "category": ["seismic", "geodesy"], "priority": "high"},
                {"name": "INGV Italy", "url": "https://www.ingv.it/en/", "category": ["seismic"], "priority": "high"},
                {"name": "BOM Australia", "url": "http://www.bom.gov.au/", "category": ["weather", "marine"], "priority": "high"},
                {"name": "GeoNet NZ", "url": "https://www.geonet.org.nz/", "category": ["seismic"], "priority": "high"},
            ],
            "utilities_power": [
                {"name": "CAISO Realtime", "url": "https://www.caiso.com/pages/default.aspx", "category": ["power"], "priority": "high"},
                {"name": "ERCOT Texas", "url": "http://www.ercot.com/", "category": ["power"], "priority": "high"},
                {"name": "ISO-NE Northeast", "url": "https://www.iso-ne.com/", "category": ["power"], "priority": "high"},
                {"name": "Hydro Quebec", "url": "https://www.hydroquebec.com/", "category": ["power"], "priority": "medium"},
                {"name": "BC Hydro", "url": "https://www.bchydro.com/", "category": ["power"], "priority": "medium"},
            ],
            "utilities_water": [
                {"name": "US Geological Survey Water", "url": "https://waterdata.usgs.gov/", "category": ["hydrological"], "priority": "high"},
                {"name": "Hycom Ocean Model", "url": "https://www.hycom.org/", "category": ["marine", "oceanographic"], "priority": "high"},
                {"name": "NOAA Tides & Currents", "url": "https://tidesandcurrents.noaa.gov/", "category": ["marine"], "priority": "high"},
            ],
            "open_data_aggregate": [
                {"name": "Kaggle Datasets", "url": "https://www.kaggle.com/datasets", "category": ["multi", "aggregate"], "priority": "medium"},
                {"name": "Google Earth Engine", "url": "https://earthengine.google.com/", "category": ["satellite", "climate"], "priority": "high"},
                {"name": "AWS Open Data", "url": "https://registry.opendata.aws/", "category": ["multi", "aggregate"], "priority": "high"},
                {"name": "Zenodo", "url": "https://zenodo.org/", "category": ["multi", "scientific"], "priority": "medium"},
            ],
            "radio_rf": [
                {"name": "KiwiSDR Expanded", "url": "http://kiwisdr.com/", "category": ["rf", "radio"], "priority": "high"},
                {"name": "RTL-SDR Community", "url": "https://www.rtl-sdr.com/", "category": ["rf", "radio"], "priority": "medium"},
                {"name": "ISS Passes", "url": "https://www.heavens-above.com/", "category": ["space", "rf"], "priority": "medium"},
            ],
            "environmental": [
                {"name": "AirNow", "url": "https://www.airnow.gov/", "category": ["air_quality"], "priority": "high"},
                {"name": "Copernicus Climate", "url": "https://www.copernicus.eu/", "category": ["climate", "satellite"], "priority": "high"},
                {"name": "Fire & Smoke Map", "url": "https://fire.airnow.gov/", "category": ["wildfire"], "priority": "high"},
                {"name": "Drought Monitor", "url": "https://droughtmonitor.unl.edu/", "category": ["drought"], "priority": "high"},
            ],
            "astronomical": [
                {"name": "NASA ADS", "url": "https://ui.adsabs.harvard.edu/", "category": ["astronomical", "multi"], "priority": "medium"},
                {"name": "ESA Missions", "url": "https://www.esa.int/", "category": ["space", "satellite"], "priority": "medium"},
                {"name": "Minor Planet Center", "url": "https://minorplanetcenter.net/", "category": ["astronomical"], "priority": "low"},
            ],
        }
    }

    return candidates

def create_source_registry_template():
    """Generate a template for source registration"""

    registry = {
        "schema": "SOURCE_REGISTRY_V1",
        "generated_utc": datetime.now(timezone.utc).isoformat(),
        "strategy": "Accept all data. Prune only after 30-day silence.",
        "total_registered": 0,
        "categories": {
            "seismic": {"count": 0, "priority": "high"},
            "weather": {"count": 0, "priority": "high"},
            "power": {"count": 0, "priority": "high"},
            "marine": {"count": 0, "priority": "high"},
            "space": {"count": 0, "priority": "medium"},
            "rf": {"count": 0, "priority": "medium"},
            "environmental": {"count": 0, "priority": "high"},
            "astronomical": {"count": 0, "priority": "low"},
            "geodesy": {"count": 0, "priority": "medium"},
            "hydrological": {"count": 0, "priority": "high"},
        },
        "sources": []
    }

    return registry

def main():
    import os

    public_repo = Path(os.environ.get("PUBLIC_REPO_PATH", "."))

    # Generate candidates
    candidates = generate_source_candidates()

    candidates_file = public_repo / "continuum" / "source_candidates.json"
    candidates_file.parent.mkdir(parents=True, exist_ok=True)

    with open(candidates_file, 'w') as f:
        json.dump(candidates, f, indent=2)

    print(f"Source candidates generated: {len(candidates['candidates'])} categories")

    # Generate registry template
    registry = create_source_registry_template()

    registry_file = public_repo / "continuum" / "source_registry.json"
    with open(registry_file, 'w') as f:
        json.dump(registry, f, indent=2)

    print(f"Source registry template created")
    print(f"\nTo add a source:")
    print(f"1. Pick from source_candidates.json")
    print(f"2. Test connectivity")
    print(f"3. Add to source_registry.json")
    print(f"4. Configure in collector_sources.json")
    print(f"5. All regimes accepted - prune only if no contact for 30 days")

if __name__ == '__main__':
    main()
