import unittest, os, secrets, string
from unittest.mock import patch
from codecraft import app, process_data
from io import BytesIO
from codecraft import app
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
        # Make a POST request to /llm/text endpoint with the sample JSON payload
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
         #select the default AI model by not providing a specified model
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
         "ai_model": ""#select the default AI model by not providing a specified model
     }
         print("Sending text upload request...")
         response = self.app.post('/llm/text', json=json_text_payload, content_type='application/json')

         print("Response received.")
         self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
         
class TestFileUploadCodeCompletionOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

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
        response = self.app.post('/llm/file',content_type='multipart/form-data',data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
class TestFileUploadCodeCompletionWatsonX(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

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
        response = self.app.post('/llm/file',content_type='multipart/form-data',data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")
        
class TestFileUploadCodeTranslationOpenAi(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

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
        response = self.app.post('/llm/file',content_type='multipart/form-data',data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

class TestFileUploadCodeTranslationWatsonX(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

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
        response = self.app.post('/llm/file',content_type='multipart/form-data',data=data)
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

class TestFileUploadCodeAnalysis(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

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
        response = self.app.post('/llm/file',content_type='multipart/form-data',data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")

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
        response = self.app.post('/llm/file',content_type='multipart/form-data',data=data)
 
        print("Response received.")
        
       #  Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200, msg=f"Response content: {response.data}")     


def generate_random_email():
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(20)) + '@gmail.com' #generate a very long random email with @gmail.com to test registration and forgot password

random_email =generate_random_email()
class TestRegistration(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        print("Registration Test")

    def test_register_user(self):
        # Prepare the JSON payload for registration
        random_email=random_email.lower()
        json_payload = {
            "email": random_email,
            "password": "test_Password1", #need to include all the password conditions like number and captial
            "confirm_password":"test_Password1"
        }

        # Make a POST request to register a new user
        response = self.app.post('/register', json=json_payload, content_type='application/json')
        # Check the response status code
        self.assertIn(response.status_code, [200, 409]) #allow success if the user already exists
        # Check that response data is in JSON format
        self.assertTrue(response.is_json)
        # Check the response content for successful registration
        response_data = response.json
        self.assertIn('id', response_data)
        self.assertIn('email', response_data)
        self.assertEqual(response_data['email'], random_email)

class TestLogin(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        print("Login Test")

    def test_login_user(self):
        # Prepare the JSON payload for login
        json_payload = {
            "email": "test_username@gmail.com",
            "password": "test_Password1"
        }

        # Make a POST request to login with the prepared JSON payload
        response = self.app.post('/login', json=json_payload, content_type='application/json')
        #Check the response status code
        #Allow a success on the 401 state (user does not exist OR wrong passeord)
        #Allow a success on the 403 state (account was frozen)
        self.assertIn(response.status_code, [200,401,403]) 
        # Check that response data is in JSON format
        self.assertTrue(response.is_json)
        # Check the response content for successful login
        response_data = response.json
        self.assertIn('id', response_data)
        self.assertIn('email', response_data)

class TestForgot(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        print("Forgot Password Test")
    def test_forgot_password(self):
        # Prepare the JSON payload for forgot
        random_email=random_email.lower()
        json_payload = {
        "email": random_email}
        # Make a POST request to forgot with the prepared JSON payload
        response = self.app.post('/forgot-password', json=json_payload, content_type='application/json')
        # Check the response status code
        self.assertEqual(response.status_code, 200)
        # Check that response data is in JSON format
        self.assertTrue(response.is_json)


if __name__ == '__main__':
    unittest.main()