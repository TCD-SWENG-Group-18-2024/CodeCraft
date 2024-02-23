import requests
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from response import code_generation, code_completion, code_translation, code_analysis, AIModel
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'txt', 'py', 'c', 'cpp', 'java', 'cs', 'S', 'js', 'html','css','rb','php','kt','R','pl'}
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

#POST method to occur when user chooses to export on the frontend
@app.route('/export', methods=['POST'])
def export_endpoint():
    # Extract data from the request
    data = request.get_json()           
    llm_response = data.get('llm_response')     #llm response
    filename = data.get('filename', 'response') #the filename user wants, if none, default to response
    output_language = data.get('output_language') #take in output_language

    #if there is an output language given, make the file extension correspond
    if output_language != '':                
        if output_language.lower() == 'python':
            filename += '.py'
        elif output_language.lower() =='c':
            filename += '.c'
        elif output_language.lower() =='c++':
            filename += '.cpp'
        elif output_language.lower() =='java':
            filename += '.java'
        elif output_language.lower() =='c#':
            filename += '.cs'
        elif output_language.lower() =='assembly':
            filename += '.S'
        elif output_language.lower() =='javascript':
            filename += '.js'
        elif output_language.lower() =='html':
            filename += '.html'
        elif output_language.lower() =='css':
            filename += '.css'
        elif output_language.lower() =='ruby':
            filename += '.rb'
        elif output_language.lower() =='php':
            filename += '.php'
        elif output_language.lower() =='kotlin':
            filename += '.kt'
        elif output_language.lower() =='r':
            filename += '.R'
        elif output_language.lower() =='perl':
            filename += '.pl'
        else:
            filename += '.txt' #default to .txt
    #if no output_language default to .txt
    else:
        filename += '.txt'


    # Export LLM response to file
    with open(filename, 'w') as f:
        f.write(llm_response)
    # Return the exported file to the client as an attachment
    return send_file(filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, port=8080)