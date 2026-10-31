"""Integration checks against the real archived runtime, not simulated results."""
import importlib.util
from pathlib import Path
import time
import unittest

spec = importlib.util.spec_from_file_location('bio_api', Path(__file__).with_name('seam-backend-enhanced.py'))
api = importlib.util.module_from_spec(spec)
spec.loader.exec_module(api)


class BioApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        api.configure_runtime()
        assert api.runtime is not None, api.runtime_error

    def setUp(self):
        self.client = api.app.test_client()
        with api.tasks_lock:
            api.tasks.clear()

    def run_to_completion(self, dose):
        response = self.client.post('/analyze', json={'compounds': [
            {'compound': 'Famotidine', 'dose': dose, 'interval': 'once daily'}]})
        self.assertEqual(response.status_code, 202)
        task_id = response.json['task_id']
        deadline = time.monotonic() + 120
        while time.monotonic() < deadline:
            result = self.client.get('/results/' + task_id)
            if result.json['status'] in ('completed', 'failed'):
                self.assertEqual(result.json['status'], 'completed', result.json)
                self.assertEqual(result.headers['Cache-Control'], 'no-store')
                return task_id, result.json['result']['results'][0]
            time.sleep(.1)
        self.fail('Engine did not complete')

    def test_native_execution_and_zero_loading(self):
        first_id, result = self.run_to_completion('40 mg')
        self.assertEqual(len(result['all_rows']), 5734)
        self.assertEqual(result['counts']['pair_rows_evaluated'], 5734)
        self.assertEqual(result['counts']['rows_with_relation_transition'], 1464)
        second_id, zero = self.run_to_completion('0 mg')
        self.assertNotEqual(first_id, second_id)
        self.assertEqual(zero['counts']['pair_ranked_active_hits'], 0)
        self.assertTrue(all(row['new_breaks'] == 0 for row in zero['all_rows']))

    def test_rejects_missing_inputs_and_old_placeholder_protocol(self):
        for payload in [None, {}, {'compounds': []}, {'compounds': [
            {'generic_name': 'Famotidine', 'chemical_formula': 'C8H15N7O2S3'}]}]:
            self.assertEqual(self.client.post('/analyze', json=payload).status_code, 400)

    def test_runtime_failure_never_completes_with_placeholder(self):
        response = self.client.post('/analyze', json={'compounds': [
            {'compound': 'condition', 'dose': '40 mg', 'interval': 'once daily'}]})
        task_id = response.json['task_id']
        deadline = time.monotonic() + 10
        while time.monotonic() < deadline:
            task = self.client.get('/results/' + task_id).json
            if task['status'] == 'failed':
                self.assertIsNone(task['result'])
                return
            time.sleep(.1)
        self.fail('Invalid input did not fail')

    def test_health_catalog_and_cors(self):
        response = self.client.get('/health', headers={'Origin': 'https://jlanjou-seam.github.io'})
        self.assertEqual(response.json['reference_mode'], 'retained_locked_snapshot')
        self.assertEqual(response.headers['Access-Control-Allow-Origin'], 'https://jlanjou-seam.github.io')
        self.assertNotIn('Access-Control-Allow-Origin', self.client.get('/health', headers={'Origin': 'https://example.org'}).headers)
        self.assertGreater(self.client.get('/compounds').json['count'], 0)
        self.assertEqual(self.client.get('/results/unknown').status_code, 404)


if __name__ == '__main__':
    unittest.main()
