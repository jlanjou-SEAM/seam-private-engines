"""Publish GitHub's rolling 14-day repository views, without visitor tracking."""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import urllib.request
import sys

REPOSITORY = 'jlanjou-SEAM/continuum-bio-analysis'


def publish(output):
    request = urllib.request.Request(
        f'https://api.github.com/repos/{REPOSITORY}/traffic/views',
        headers={'Authorization': 'Bearer ' + os.environ['GH_TOKEN'],
                 'Accept': 'application/vnd.github+json', 'User-Agent': 'Bio-repository-views'})
    with urllib.request.urlopen(request, timeout=30) as response:
        traffic = json.load(response)
    count = traffic.get('count')
    if type(count) is not int or count < 0:
        raise ValueError('Invalid repository view count; preserving previous published data')
    data = {'schema': 'REPOSITORY_VIEWS_V1', 'repository': REPOSITORY,
            'views': count, 'window_days': 14,
            'updated_utc': datetime.now(timezone.utc).isoformat()}
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(data, indent=2) + '\n', encoding='utf-8')
    print(f'Published {count} repository views for the last 14 days')


if __name__ == '__main__':
    publish(Path(sys.argv[1]))
