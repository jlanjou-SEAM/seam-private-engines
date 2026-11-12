from datetime import datetime, timezone, timedelta
import unittest
from publish_live_feed import observations, native_predictions


class LiveFeedTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 11, 11, 12, tzinfo=timezone.utc)

    def test_old_official_fixture_is_not_a_native_prediction(self):
        fixture = {'confidence': .97, 'status': 'ACTIVE',
                   'evidence_updated_utc': self.now.isoformat()}
        self.assertEqual(native_predictions({'events': {'old': fixture}}, self.now), [])

    def test_native_predictions_require_recent_evidence(self):
        valid = {'source_type': 'seam_prediction', 'evidence_updated_utc': self.now.isoformat()}
        stale = dict(valid, evidence_updated_utc=(self.now - timedelta(days=1)).isoformat())
        future = dict(valid, evidence_updated_utc=(self.now + timedelta(days=1)).isoformat())
        self.assertEqual(native_predictions({'events': [valid, stale, future]}, self.now), [valid])

    def test_usgs_preserves_event_time_and_does_not_create_confidence(self):
        event_time = int((self.now - timedelta(hours=1)).timestamp() * 1000)
        payload = {'features': [{'id': 'us123', 'properties': {'time': event_time,
                    'updated': event_time, 'mag': 0, 'title': 'Observed quake'}}]}
        rows = observations('USGS earthquakes', payload, self.now.isoformat(), self.now)
        self.assertEqual(rows[0]['magnitude'], 0)
        self.assertNotEqual(rows[0]['observed_utc'], rows[0]['retrieved_utc'])
        self.assertNotIn('confidence', rows[0])
        self.assertNotIn('prediction', rows[0])

    def test_nws_excludes_expired_and_test_alerts(self):
        actual = {'id': 'alert', 'properties': {'event': 'Flood Warning', 'status': 'Actual',
                  'expires': (self.now + timedelta(hours=1)).isoformat()}}
        expired = {'id': 'old', 'properties': dict(actual['properties'], expires=(self.now - timedelta(hours=1)).isoformat())}
        test = {'id': 'test', 'properties': dict(actual['properties'], status='Test')}
        rows = observations('NWS alerts', {'features': [actual, expired, test]}, self.now.isoformat(), self.now)
        self.assertEqual([row['id'] for row in rows], ['alert'])


if __name__ == '__main__':
    unittest.main()
