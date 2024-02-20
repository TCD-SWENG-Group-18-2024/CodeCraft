import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from response import code_generation, code_completion, code_translation, code_analysis, AIModel
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'txt', 'py', 'c', 'cpp', 'java', 'cs', 'S', 'asm' 'js', 'html','css','rb','php','kt','R','pl'}
MAX_FILE_SIZE_BYTES = 10 * 1024  #10KB

@app.route('/')
def homepage():
    return{"message": "Hello SwEng Project Group 18"}

#@app.route('/llm', methods=['POST'])
#def llm_request():

    # Check if 'file' is in the request files
#    if 'file' in request.files:
#        uploaded_file = request.files['file']
        # Check if file is too large
#        if uploaded_file.content_length > MAX_FILE_SIZE_BYTES:
#            return jsonify({'error': 'File size exceeds the limit of 10KB'}), 400
        # Read the contents of the file
#        user_input = uploaded_file.read().decode("utf-8") #removed requirement of checking file path

#    else:
        # If 'file' is not in the request files, assume 'user_input' is a text input
#        data = request.get_json()
#        user_input = data.get('user_input')

    # Extract other parameters from the request JSON
#    data = request.get_json()
#    use_case = data.get('use_case')
#    ai_model = data.get('ai_model')
#    input_language = data.get('input_language')
#    target_language = data.get('output_language')

    # Throws error if empty request
#    if user_input is None:
#        return jsonify({'error': 'No user input provided'}), 400

    # Call the appropriate function based on use_case and ai_model
#    result = process_data(user_input, use_case, ai_model, input_language, target_language)

#    return jsonify(result)

@app.route('/llm/text', methods=['POST'])
def llm_text_request():
    # Extract parameters from the request JSON
    data = request.get_json()
    use_case = data.get('use_case')
    ai_model = data.get('ai_model')
    input_language = data.get('input_language')
    target_language = data.get('output_language')
    user_input = data.get('user_input')

    # Throws error if empty request
    if user_input is None:
        return jsonify({'error': 'No user input provided'}), 400

    # Call the appropriate function based on use_case and ai_model
    result = process_data(user_input, use_case, ai_model, input_language, target_language)

    return jsonify(result)

@app.route('/llm/file', methods=['POST'])
def llm_file_request():
    # Check if 'file' is in the request files
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    uploaded_file = request.files['file']

    # Check if file is too large
    if uploaded_file.content_length > MAX_FILE_SIZE_BYTES:
        return jsonify({'error': 'File size exceeds the limit of 10KB'}), 400

    # Read the contents of the file
    user_input = uploaded_file.read().decode("utf-8")

    # Extract other parameters from the request JSON
    data = request.get_json()
    use_case = data.get('use_case')
    ai_model = data.get('ai_model')
    input_language = data.get('input_language')
    target_language = data.get('output_language')

    # Call the appropriate function based on use_case and ai_model
    result = process_data(user_input, use_case, ai_model, input_language, target_language)

    return jsonify(result)

#def llm_request():
#    data = request.get_json()
#    user_input = data.get('user_input')
#    use_case = data.get('use_case')
#    ai_model = data.get('ai_model')
#    input_language = data.get('input_language')
#    target_language = data.get('output_language')
    # expects json payload structure from frontend

    # Throws error if empty request
#    if user_input is None:
#        return jsonify({'error': 'No user input provided'}), 400
    
    # Check if the provided user_input is a file path
#    if os.path.exists(user_input):
        # Throws error if file too big
#        if os.path.getsize(user_input) > MAX_FILE_SIZE_BYTES:
#            return jsonify({'error': 'File size exceeds the limit of 10KB'}), 400
 
        # If user_input is a file path, read the file and use its contents as input
#        with open(user_input, 'r') as file:
#            user_input = file.read()
    
    # Call the appropriate function based on use_case and ai_model
#    result = process_data(user_input, use_case, ai_model, input_language, target_language)

#    return jsonify(result)


def process_data(user_input, use_case, ai_model, input_language, target_language):
    use_case = use_case.lower()

    if use_case == 'code_analysis':
        result = code_analysis(user_input, ai_model)
    elif use_case == 'code_generation':
        result = code_generation(user_input, ai_model)
    elif use_case == 'code_completion':
        result = code_completion(user_input, ai_model)
    elif use_case == 'code_translation':
        result = code_translation(user_input, ai_model, input_language, target_language)
    elif use_case == '':    # general model for no specified operation
        result = AIModel(user_input, ai_model)
    # Add more conditions for other AI models

    # Can add more conditions for other use cases
    else:
        result = {"error": "Invalid use case"}

    return result

if __name__ == "__main__":
    app.run(debug=True, port=8080)
