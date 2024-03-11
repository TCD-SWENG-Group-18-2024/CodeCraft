from config import ApplicationConfig
from flask import Flask, request, jsonify, send_file, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, User
from response import code_generation, code_completion, code_translation, code_analysis, AIModel
import re
app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'txt', 'py', 'c', 'cpp', 'java', 'cs', 'S', 'js', 'html', 'css', 'rb', 'php', 'kt', 'R', 'pl'}
MAX_FILE_SIZE_BYTES = 10 * 1024  # 10KB

# Initialise database and configure
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
db.init_app(app)

with app.app_context():
    db.create_all()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def homepage():
    return {"message": "Hello SwEng Project Group 18"}


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
    result = process_data(user_input, use_case, ai_model,
                          input_language, output_language)

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

    # Check if the file has an allowed extension
    if not allowed_file(file_data.filename):
        return jsonify({'error': 'Invalid file extension'}), 400

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
    result = process_data(user_input, use_case, ai_model,
                          input_language, output_language)

    return jsonify(result)


def process_data(user_input, use_case, ai_model, input_language, output_language):
    if use_case is not None:
        use_case = use_case.lower()

    if use_case == 'code_analysis':
        result = code_analysis(user_input, ai_model)
    elif use_case == 'code_generation':
        result = code_generation(user_input, ai_model)
    elif use_case == 'code_completion':
        result = code_completion(user_input, ai_model, input_language)
    elif use_case == 'code_translation':
        result = code_translation(
            input_language, output_language, user_input, ai_model)
    elif use_case == '':
        # general model for no specified operation
        result = AIModel(user_input, ai_model)
    else:
        result = {"error": "Invalid use case"}

    # TODO: Add more conditions for other AI models
    # TODO: Can add more conditions for other use cases

    return result


# POST method to occur when user chooses to export on the frontend
@app.route('/export', methods=['POST'])
def export_endpoint():
    # Extract data from the request
    data = request.get_json()
    llm_response = data.get('llm_response')         # llm response
    # the filename user wants, if none, default to response
    filename = data.get('filename', 'response')
    output_language = data.get('output_language')   # take in output_language

    #TODO: Test without output_language to see a txt file
    #TODO: Test with an output_language to check if the file extenstion logic works
    #TODO: Parse away the beginning of the AI repsonse, i.e. any instances of "Sure! Here is some code ..."
    #TODO: Check the txt responses for code generation to ensure there are no backticks or dodgy characters
    #TODO: Check where on a device the exported file actually ends up!

    # if there is an output language given, make the file extension correspond
    if output_language != '':
        if output_language.lower() == 'python':
            filename += '.py'
        elif output_language.lower() == 'c':
            filename += '.c'
        elif output_language.lower() == 'c++':
            filename += '.cpp'
        elif output_language.lower() == 'java':
            filename += '.java'
        elif output_language.lower() == 'c#':
            filename += '.cs'
        elif output_language.lower() == 'assembly':
            filename += '.S'
        elif output_language.lower() == 'javascript':
            filename += '.js'
        elif output_language.lower() == 'html':
            filename += '.html'
        elif output_language.lower() == 'css':
            filename += '.css'
        elif output_language.lower() == 'ruby':
            filename += '.rb'
        elif output_language.lower() == 'php':
            filename += '.php'
        elif output_language.lower() == 'kotlin':
            filename += '.kt'
        elif output_language.lower() == 'r':
            filename += '.R'
        elif output_language.lower() == 'perl':
            filename += '.pl'
        else:
            filename += '.txt'  # default to .txt
    # if no output_language default to .txt
    else:
        filename += '.txt'

    # Export LLM response to file
    with open(filename, 'w') as f:
        f.write(llm_response)

    # Return the exported file to the client as an attachment
    return send_file(filename, as_attachment=True)


@app.route('/register', methods=['POST'])
def register_user():
    username = request.json['username'] 
    password = request.json['password']

    # Password Requirements:
    if len(password) < 8:
        return jsonify({"error": "Password should be at least 8 characters long"}), 400 # Min length of password
    if len(password) > 20:
        return jsonify({"error": "Password should be less than 20 characters long"}), 400 # Max length of password
    if not re.search(r'\d', password):
        return jsonify({"error": "Password should contain at least one number"}), 400 # At least one number
    if re.search(r'[\s`¬¦~\t\n*#\'/|\\]', password):
        return jsonify({"error": "Password contains special characters that are not allowed"}), 400 # No dodgy chars / standard disallowed password chars
    if not re.search(r'[A-Z]', password):
        return jsonify({"error": "Password should contain at least one capital letter"}), 400 # At least one capital
    if not re.search(r'[a-z]', password):
        return jsonify({"error": "Password should contain at least one lowercase letter"}), 400 # At least one lowercase
    if re.search(r'[^\x00-\x7F]', password):
        return jsonify({"error": "Password contains special characters that are not allowed"}), 400 # No non-ASCII chars


    # Username Requirements:
    if username == '':
        return jsonify({"error": "No username provided"}), 400
    
    username = username.lower()
    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409 

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "username": new_user.username
    })


@app.route('/login', methods=['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']

    username = username.lower()
    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "User does not exist"}), 401

    login_attempts = session.get('login_attempts', 0) #Get current login attempts, or initialise to zero

    if login_attempts > 3:
        return jsonify({"error": "Your account is frozen. Please contact support."}), 403 #403: server understood request but refused to authorise

    if not bcrypt.check_password_hash(user.password, password):
        session['login_attempts'] = login_attempts + 1
        return jsonify({"error": "Incorrect password"}), 401
    
    session.pop('login_attempts', None) #Reset counter after the correct password is given

    return jsonify({
        "id": user.id,
        "username": user.username
    })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
