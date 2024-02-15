import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from response import code_analysis
from response import code_generation
import os

#AI team will be coding in response.py ( as pushed to the github already )
#Uncomment the below line when AI team are ready

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'txt', 'py', 'c', 'cpp', 'java', 'cs', 'S', 'asm' 'js', 'html','css','rb','php','kt','R','pl'}
MAX_FILE_SIZE_BYTES = 10 * 1024  # 3KB

# Define the LLM API endpoint and key
LLM_API_ENDPOINT = 'http://localhost:8080/llm'

@app.route('/')
def homepage():
    return{"message": "Hello SwEng Project Group 18"}

@app.route('/joke', methods=['GET'])
def get_joke():
    # Make a request to the model
    response = requests.get('https://official-joke-api.appspot.com/random_joke')
    # Check if response was successful
    if response.status_code == 200:
        # Parse the JSON response
        joke_data = response.json()
        return jsonify({'setup': joke_data['setup'], 'punchline': joke_data['punchline']})
    else:
        # Return an error message if request failed
        return jsonify({'error': 'Failed to fetch joke'}), 500

@app.route('/llm', methods=['POST'])
def llm_request():
    data = request.get_json()
    user_input = data.get('user_input')
    use_case = data.get('use_case')
    ai_model = data.get('ai_model')
    # expects json payload structure from frontend

    #Throws error if empty request
    if user_input is None:
        return jsonify({'error': 'No user input provided'}), 400
    
    #Throws error if file too big
    if len(file.read()) > MAX_FILE_SIZE_BYTES:
        return jsonify({'error': 'File size exceeds the limit of 10KB'}), 400
    
    # Check if the provided user_input is a file path
    if os.path.exists(user_input):
        # If user_input is a file path, read the file and use its contents as input
        with open(user_input, 'r') as file:
            user_input = file.read()
    
    # Call the appropriate function based on use_case and ai_model
    result = process_data(user_input, use_case, ai_model)

    return jsonify(result)

def process_data(user_input, use_case, ai_model):
    if use_case == 'code_analysis':
            result = code_analysis(user_input, ai_model)
    elif use_case == 'code_generation':
            result = code_generation(user_input, ai_model)
        # Add more conditions for other AI models

    # Can add more conditions for other use cases
    else:
        result = {"error": "Invalid use case"}

    return result

# @app.route('/llm', methods=['POST']) 
# def llm_request():
#     # Get JSON data from the frontend
#     user_input = request.get_json()
#     # Make API call to LLM
#     llm_response = response(user_input)
#     # Return JSON of response
#     return jsonify(llm_response) 

# @app.route('/process', methods=['POST'])
# def process_request():
#     data = request.get_json()
#     user_input = data.get('user_input')
#     use_case = data.get('use_case')
#     ai_model = data.get('ai_model')
#     # expects json payload structure from frontend
    
#     # Call the appropriate function based on use_case and ai_model
#     result = process_data(user_input, use_case, ai_model)

#     return jsonify(result)

if __name__=="__main__":
    app.run(debug=True, port=8080)