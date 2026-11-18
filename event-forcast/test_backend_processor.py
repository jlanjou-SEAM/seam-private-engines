import unittest
from pathlib import Path
from unittest.mock import patch
import backend_processor_live as processor


class ProcessorTests(unittest.TestCase):
    def analysis(self):
        return {'operators':[{'requirements_satisfied': i < 30} for i in range(66)],
                'resolved':30, 'unresolved':36, 'manifold_entry_count':2}

    def test_counts_must_match_actual_operator_returns(self):
        result = self.analysis()
        result['resolved'] = 66
        with self.assertRaises(ValueError):
            processor.validate_analysis(result)

    def test_empty_manifold_is_failure(self):
        result = self.analysis()
        result['manifold_entry_count'] = 0
        with self.assertRaises(ValueError):
            processor.validate_analysis(result)

    def test_incomplete_operator_output_is_failure(self):
        result = self.analysis()
        result['operators'].pop()
        with self.assertRaises(ValueError):
            processor.validate_analysis(result)

    def test_missing_manifold_is_failure(self):
        with patch.object(processor, 'MANIFOLD_FILE', Path('does-not-exist.arcv')):
            with self.assertRaises(FileNotFoundError):
                processor.run_analysis()

    def test_valid_diagnostics_do_not_generate_predictions(self):
        result = self.analysis()
        self.assertEqual(processor.validate_analysis(result), result)
        self.assertNotIn('events', result)


if __name__ == '__main__':
    unittest.main()
