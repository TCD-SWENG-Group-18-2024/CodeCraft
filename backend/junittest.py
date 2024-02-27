import unittest
from unittest.mock import patch
from codecraft import app, process_data
from io import BytesIO
from codecraft import app
import os
class TestCodeAnalysisWatsonxAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"import math def quadratic_roots(a, b, c):  discriminant = b**2 - 4*a*c  if discriminant < 0:     return None  # No real roots  elif discriminant == 0:    root = -b / (2*a)   return rootelse:root1 = (-b + math.sqrt(discriminant)) / (2*a)root2 = (-b - math.sqrt(discriminant)) / (2*a)return root1, root2",
        "use_case": "code_analysis",
        "ai_model": "watsonx_ai"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
class TestCodeAnalysisOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"import math def quadratic_roots(a, b, c):  discriminant = b**2 - 4*a*c  if discriminant < 0:     return None  # No real roots  elif discriminant == 0:    root = -b / (2*a)   return rootelse:root1 = (-b + math.sqrt(discriminant)) / (2*a)root2 = (-b - math.sqrt(discriminant)) / (2*a)return root1, root2",
        "use_case": "code_analysis",
        "ai_model": "open_ai"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
class TestCodeGenerationWatsonxAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"i want to generate code to sum the integers from 1 to 20",
        "use_case": "code_generation",
        "ai_model": "watsonx_ai"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

class TestCodeGenerationOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"i want to generate code to sum the integers from 1 to 20",
        "use_case": "code_generation",
        "ai_model": "open_ai"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
class TestCodeCompletionWatsonxAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"def insertionSort(arr): n = len(arr)  # Get the length of the array if n <= 1: return  # If the array has 0 or 1 element, it is already sorted, so return for i in range(1, n):  # Iterate over the array starting from the second element key = arr[i]  # Store the current element as the key to be inserted in the right position j = i-1  # Set the index of the previous element as j while j >= 0 and key < arr[j]:  # While the previous element is greater than the key and j is greater than or equal to 0, swap the elements arr[j+1] and arr[j] arr[j+1] = arr[j] arr[j] = key j -= 1  # Decrement j to get the next previous element return arr  # Return the sorted array def vs what the ai actually generated",
        "use_case": "code_completion",
        "ai_model": "watsonx_ai"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
class TestCodeCompletionOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"def insertionSort(arr): n = len(arr)  # Get the length of the array if n <= 1: return  # If the array has 0 or 1 element, it is already sorted, so return for i in range(1, n):  # Iterate over the array starting from the second element key = arr[i]  # Store the current element as the key to be inserted in the right position j = i-1  # Set the index of the previous element as j while j >= 0 and key < arr[j]:  # While the previous element is greater than the key and j is greater than or equal to 0, swap the elements arr[j+1] and arr[j] arr[j+1] = arr[j] arr[j] = key j -= 1  # Decrement j to get the next previous element return arr  # Return the sorted array def vs what the ai actually generated",
        "use_case": "code_completion",
        "ai_model": "open_ai"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
class TestCodeTranslationOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"translate the code from python to javascript",
        "use_case": "code_translation",
        "ai_model": "open_ai",
        "input_language" : "python",
        "output_language": "javascript"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
class TestCodeTranslationWatsonxAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_text_upload(self):
        json_text_payload = {
        "user_input":"translate the code from python to javascript",
        "use_case": "code_translation",
        "ai_model": "watsonx_ai",
        "input_language" : "python",
        "output_language": "javascript"
    }
        print("Sending text upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

        print("Response received.")
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
   #Testing plain text input
class TestTextUpload(unittest.TestCase):
     def setUp(self):
         self.app = app.test_client()

    #TEXT INPUT: python code which calculates the roots of a quadratic equation
     def test_text_upload_complex_code(self):
         json_text_payload = {
         "user_input":"import math def quadratic_roots(a, b, c):  discriminant = b**2 - 4*a*c  if discriminant < 0:     return None  # No real roots  elif discriminant == 0:    root = -b / (2*a)   return rootelse:root1 = (-b + math.sqrt(discriminant)) / (2*a)root2 = (-b - math.sqrt(discriminant)) / (2*a)return root1, root2",
         "use_case": "code_analysis",
         "ai_model": ""
     }
         print("Sending text upload request...")
         response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

         print("Response received.")
         self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

    #TEXT INPUT: C++ code which prints the numbers 0-9 inclusive
     def test_text_upload_simple_code(self):
         json_text_payload = {
         "user_input":"int main() { for (int i = 0; i <= 9; ++i) {std::cout << i << ' ';}std::cout << std::endl;return 0;}",
         "use_case": "code_analysis",
         "ai_model": ""
     }
         print("Sending text upload request...")
         response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

         print("Response received.")
         self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

### These tests make use of absolute paths specific to one team member's machine. These paths must be generalized to run on all machines before these tests can be used in workflows.
         
class TestFileUploadCodeCompletionOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    #FILE INPUT: python code which calculates the roots of a quadratic equation
    def test_file_upload_complex_code(self):
        from werkzeug.datastructures import MultiDict
         #Define a sample JSON payload
        json_file_payload = {
            "use_case": "code_completion",
            "ai_model": "OpenAI",
        }
        # Get the current script's directory
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the path to the test.py file
        test_file_path = os.path.join(script_dir, "testing_files", "codecompletion.py")
                # Open the file from the specified path
        file_path = test_file_path
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Log the first few characters of the file content
        print(f"File content: {file_content}")

        print("Sending file upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        data = MultiDict([
        ('file', (BytesIO(file_content), 'codecompletion.py')),
        ('use_case', 'code_completion'),
        ('ai_model', 'OpenAI'),
        ('input_language', ''),
        ('output_language', '')
        ])
    # Use a MultiDict for the data parameter
        data = MultiDict(data)
        response = self.app.post('/llm/file',
                             content_type='multipart/form-data',
                             data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
class TestFileUploadCodeCompletionWatsonX(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    #FILE INPUT: python code which calculates the roots of a quadratic equation
    def test_file_upload_complex_code(self):
        from werkzeug.datastructures import MultiDict
         #Define a sample JSON payload
        json_file_payload = {
            "use_case": "code_completion",
            "ai_model": "watsonx_ai",
        }
       # Get the current script's directory
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the path to the test.py file
        test_file_path = os.path.join(script_dir, "testing_files", "codecompletion.py")
                # Open the file from the specified path
        file_path = test_file_path
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Log the first few characters of the file content
        print(f"File content: {file_content}")

        print("Sending file upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        data = MultiDict([
        ('file', (BytesIO(file_content), 'codecompletion.py')),
        ('use_case', 'code_completion'),
        ('ai_model', 'watsonx_ai'),
        ('input_language', ''),
        ('output_language', '')
        ])
    # Use a MultiDict for the data parameter
        data = MultiDict(data)
        response = self.app.post('/llm/file',
                             content_type='multipart/form-data',
                             data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
class TestFileUploadCodeTranslationOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    #FILE INPUT: python code which calculates the roots of a quadratic equation
    def test_file_upload_complex_code(self):
        from werkzeug.datastructures import MultiDict
         #Define a sample JSON payload
        json_file_payload = {
            "use_case": "code_translation",
            "ai_model": "OpenAI",
        }

         # Get the current script's directory
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the path to the test.py file
        test_file_path = os.path.join(script_dir, "testing_files", "Triangle.java")
                # Open the file from the specified path
        file_path = test_file_path
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Log the first few characters of the file content
        print(f"File content: {file_content}")

        print("Sending file upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        data = MultiDict([
        ('file', (BytesIO(file_content), 'Triangle.java')),
        ('use_case', 'code_translation'),
        ('ai_model', 'OpenAI'),
        ('input_language', 'java'),
        ('output_language', 'python')
        ])
    # Use a MultiDict for the data parameter
        data = MultiDict(data)
        response = self.app.post('/llm/file',
                             content_type='multipart/form-data',
                             data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

class TestFileUploadCodeTranslationWatsonX(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    #FILE INPUT: python code which calculates the roots of a quadratic equation
    def test_file_upload_complex_code(self):
        from werkzeug.datastructures import MultiDict
         #Define a sample JSON payload
        json_file_payload = {
            "use_case": "code_translation",
            "ai_model": "watsonx_ai",
        }

          # Get the current script's directory
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the path to the test.py file
        test_file_path = os.path.join(script_dir, "testing_files", "Triangle.java")
                # Open the file from the specified path
        file_path = test_file_path
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Log the first few characters of the file content
        print(f"File content: {file_content}")

        print("Sending file upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        data = MultiDict([
        ('file', (BytesIO(file_content), 'Triangle.java')),
        ('use_case', 'code_translation'),
        ('ai_model', 'watsonx_ai'),
        ('input_language', 'java'),
        ('output_language', 'python')
        ])
    # Use a MultiDict for the data parameter
        data = MultiDict(data)
        response = self.app.post('/llm/file',
                             content_type='multipart/form-data',
                             data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

class TestFileUploadCodeAnalysis(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    #FILE INPUT: python code which calculates the roots of a quadratic equation
    def test_file_upload_complex_code(self):
        from werkzeug.datastructures import MultiDict
         #Define a sample JSON payload
        json_file_payload = {
            "use_case": "code_analysis",
            "ai_model": "OpenAI",
        }

        # Get the current script's directory
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the path to the test.py file
        test_file_path = os.path.join(script_dir, "testing_files", "Triangle.java")
                # Open the file from the specified path
        file_path = test_file_path
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Log the first few characters of the file content
        print(f"File content: {file_content}")

        print("Sending file upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        data = MultiDict([
        ('file', (BytesIO(file_content), 'Triangle.java')),
        ('use_case', 'code_analsis'),
        ('ai_model', 'OpenAI'),
        ('input_language', ''),
        ('output_language', '')
        ])
    # Use a MultiDict for the data parameter
        data = MultiDict(data)
        response = self.app.post('/llm/file',
                             content_type='multipart/form-data',
                             data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

    #FILE INPUT: C code which prints the numbers 0-9 inclusive
    def test_file_upload_simple_code(self):
        from werkzeug.datastructures import MultiDict
         #Define a sample JSON payload
        json_file_payload = {
            "use_case": "code_analysis",
            "ai_model": "OpenAI",
        }

         # Get the current script's directory
        script_dir = os.path.dirname(os.path.abspath(__file__))

        # Construct the path to the test.py file
        test_file_path = os.path.join(script_dir, "testing_files", "Triangle.java")
                # Open the file from the specified path
        file_path = test_file_path
        with open(file_path, 'rb') as file:
            file_content = file.read()

        # Log the first few characters of the file content
        print(f"File content: {file_content}")

        print("Sending file upload request...")
        # Make a POST request to /llm/file endpoint with the sample JSON payload and file
        data = MultiDict([
        ('file', (BytesIO(file_content), 'Triangle.java')),
        ('use_case', 'code_analysis'),
        ('ai_model', 'OpenAI'),
        ('input_language', ''),
        ('output_language', '')
        ])
    # Use a MultiDict for the data parameter
        data = MultiDict(data)
        response = self.app.post('/llm/file',
                             content_type='multipart/form-data',
                             data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")     

if __name__ == '__main__':
    unittest.main()