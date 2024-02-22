import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from response import code_generation, code_completion, code_translation, code_analysis, AIModel

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'txt', 'py', 'c', 'cpp', 'java', 'cs', 'S', 'asm' 'js', 'html','css','rb','php','kt','R','pl'}
MAX_FILE_SIZE_BYTES = 10 * 1024  #10KB

@app.route('/')
def homepage():
    return{"message": "Hello SwEng Project Group 18"}

@app.route('/llm/text', methods=['POST'])
def llm_text_request():
    # Extract parameters from the request JSON
    data = request.get_json()
    use_case = data.get('use_case')
    ai_model = data.get('ai_model')
    input_language = data.get('input_language')
    output_language = data.get('output_language')
    user_input = data.get('user_input')

    # Throws error if empty request
    if user_input is None:
        return jsonify({'error': 'No user input provided'}), 400

    # Call the appropriate function based on use_case and ai_model
    result = process_data(user_input, use_case, ai_model, input_language, output_language)

    return jsonify(result)

@app.route('/llm/file', methods=['POST'])
def llm_file_request():
    
    # Extract parameters from JSON payload
    use_case = request.form.get('use_case')
    ai_model = request.form.get('ai_model')
    input_language = request.form.get('input_language')
    output_language = request.form.get('output_language')

    # Check if 'file' is in the request files
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file_data = request.files['file']

    # Check if file is too large
    if file_data.content_length > MAX_FILE_SIZE_BYTES:
        return jsonify({'error': 'File size exceeds the limit of 10KB'}), 400

    # Try read the contents of the file
    try:
        # Read and decode the contents of the file
        user_input = file_data.read().decode("utf-8")
        # Log the first few characters of the file content
        app.logger.info(f"File content: {user_input[:100]}")

    except UnicodeDecodeError:
        return jsonify({'error': 'Failed to decode file content as UTF-8'}), 400

    # Call the appropriate function based on use_case and ai_model
    result = process_data(user_input, use_case, ai_model, input_language, output_language)

    return jsonify(result)

def process_data(user_input, use_case, ai_model, input_language, output_language):
    use_case = use_case.lower()

    if use_case == 'code_analysis':
        result = code_analysis(user_input, ai_model)
    elif use_case == 'code_generation':
        result = code_generation(user_input, ai_model)
    elif use_case == 'code_completion':
        result = code_completion(user_input, ai_model)
    elif use_case == 'code_translation':
        result = code_translation(user_input, ai_model, input_language, output_language)
    elif use_case == '':    # general model for no specified operation
        result = AIModel(user_input, ai_model)
    # Add more conditions for other AI models

    # Can add more conditions for other use cases
    else:
        result = {"error": "Invalid use case"}

    return result

if __name__ == "__main__":
    app.run(debug=True, port=8080)