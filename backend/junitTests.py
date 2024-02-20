import unittest
from unittest.mock import patch
from codecraft import app, process_data

class CodeCraftTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_homepage(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"message": "Hello SwEng Project Group 18"})

    @patch('codecraft.process_data')
    def test_llm_request(self, mock_process_data):
        mock_process_data.return_value = {"result": "mocked result"}
        data = {
            'user_input': 'some input',
            'use_case': 'code_analysis',
            'ai_model': 'some_model',
            'input_language': 'python',
            'output_language': 'java'
        }
        response = self.app.post('/llm', json=data)
        self.assertEqual(response.status_code, 200)
        mock_process_data.assert_called_with(
            data['user_input'], data['use_case'], data['ai_model'],
            data['input_language'], data['output_language']
        )
        self.assertEqual(response.get_json(), {"result": "mocked result"})

    def test_llm_request_empty_input(self):
        data = {
            'use_case': 'code_analysis',
            'ai_model': 'some_model',
            'input_language': 'python',
            'output_language': 'java'
        }
        response = self.app.post('/llm', json=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'error': 'No user input provided'})

    # Add more test cases for different scenarios and edge cases

if __name__ == '__main__':
    unittest.main()
