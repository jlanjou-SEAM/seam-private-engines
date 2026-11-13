import unittest
from publish_bio_lookup import validate_cases


class LookupCasesTests(unittest.TestCase):
    def setUp(self):
        self.case = dict(id='example', label='Example', compound='H2O', dose='1 mg', interval='once daily')

    def test_explicit_inputs_required(self):
        for field in self.case:
            with self.subTest(field=field), self.assertRaises(ValueError):
                validate_cases([{k:v for k,v in self.case.items() if k != field}])

    def test_no_path_escape(self):
        with self.assertRaises(ValueError):
            validate_cases([{**self.case, 'id':'../private'}])

    def test_no_ambiguous_duplicate(self):
        with self.assertRaises(ValueError):
            validate_cases([self.case, {**self.case, 'id':'other'}])

    def test_valid_explicit_case(self):
        self.assertEqual(validate_cases([self.case]), [self.case])


if __name__ == '__main__':
    unittest.main()
