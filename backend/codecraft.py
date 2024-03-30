import dotenv
import os
import re
import requests
import time
from config import ApplicationConfig
from flask import Flask, request, jsonify, session, redirect
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, User
from response import code_generation, code_completion, code_translation, code_analysis, AIModel, utility
from itsdangerous import URLSafeTimedSerializer

# Load environment varibles
dotenv.load_dotenv()

# Create Flask app
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

# Configuration for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'                    # Gmail SMTP server
app.config['MAIL_PORT'] = 587                                   # Gmail SMTP port (use 587 for TLS)
app.config['MAIL_USE_TLS'] = True                               # Enable TLS encryption
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')        # Sender email
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')        # Sender password
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # Default sender (same as MAIL_USERNAME)
mail = Mail(app)

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
    result = process_data(user_input, use_case, ai_model,input_language, output_language)

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
    result = process_data(user_input, use_case, ai_model,input_language, output_language)
    return jsonify(result)


@app.route('/llm/clearmemory', methods=['DELETE'])
def clear_memory():
    """
    Clears the MilvusDB collection
    """
    utility.drop_collection('LangChainCollection')
    # Should be 200 whether the collection exists or not
    return jsonify({'success': 'Cleared the Milvus collection.'})

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
        result = code_translation(input_language, output_language, user_input, ai_model)
    elif use_case == '':
        # General model for no specified operation
        result = AIModel(user_input, ai_model)
    else:
        result = {"error": "Invalid use case"}

    return result


@app.route('/register', methods=['POST'])
def register_user():
    ALLOWED_EMAIL_EXTENSIONS = ['@gmail.com','@tcd.ie']
    email = request.json['email']
    password = request.json['password']
    confirm_password = request.json['confirm_password']

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
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400  # Ensure password matches the confirm password

    # Username Requirements:
    if email == '':
        return jsonify({"error": "No username provided"}), 400
    if not any(email.endswith(ext) for ext in ALLOWED_EMAIL_EXTENSIONS):
        return jsonify({"error": "Enter a valid email"}), 400
    
    email = email.lower()
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409 

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route('/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    email = email.lower()
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "User does not exist"}), 401
    
    if 'last_login_attempt' in session:  # if a last login attempt exists
        last_login_attempt_time = session['last_login_attempt']     # find out when
        elapsed_time_since_last_attempt = time.time() - last_login_attempt_time

        if elapsed_time_since_last_attempt < 300:  # Lock the account for 5 minutes (300 seconds)
            return jsonify({"error": "Your account is locked. Please try again later."}), 403

    login_attempts = session.get('login_attempts', 0) #Get current login attempts, or initialise to zero

    if login_attempts >= 3:
        session['last_login_attempt'] = time.time()  # Update the last login attempt time
        return jsonify({"error": "Your account is frozen. Please contact support."}), 403 #403: server understood request but refused to authorise

    if not bcrypt.check_password_hash(user.password, password):
        session['login_attempts'] = login_attempts + 1
        return jsonify({"error": "Incorrect password"}), 401
    
    session.pop('login_attempts', None) #Reset counter after the correct password is given
    session.pop('last_login_attempt', None)  # Reset the last login attempt time upon successful login

    return jsonify({
        "id": user.id,
        "email": user.email
    })

# serializer = URLSafeTimedSerializer(app.secret_key)

# # Function to generate a reset token
# def generate_reset_token(user):
#     return serializer.dumps(user.email, salt='reset_password')


# Function to send reset password email
def send_reset_password_email(email):
    reset_url = "http://localhost:3000/reset"
    msg = Message("Reset Your Password", recipients=[email])
    msg.body = f"Click the following link to reset your password: {reset_url}"
    mail.send(msg)


# Route for forgot password
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json['email']  # Extract email from user input
    # Check if the user exists
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "User does not exist"}), 404
    else:
    #   token = generate_reset_token(user) # Generate a reset token
        send_reset_password_email(email)#, token) # Send reset password email
        return jsonify({"message": "Reset password link sent to your email"})


# Route for resetting password
@app.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        email = request.json['email']
        user = User.query.filter_by(email=email).first()
        new_password = request.json['password']
        confirm_new_password = request.json['confirm_password']

        # Ensure the new password matches the confirm new password
        if new_password != confirm_new_password:
            return jsonify({"error": "New passwords do not match"}), 400
            
        # Proceed with updating the user's password
        hashed_password = bcrypt.generate_password_hash(new_password)
        user.password = hashed_password
        db.session.commit()
        return jsonify({"message": "Password reset successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/execute', methods=['POST'])
def execute():
    code = request.json['code']
    language = request.json['language']

    if code is None or code == '':
        return jsonify({"error": "No code was entered"}), 400
    
    if language is None or language == '':
        return jsonify({"error": "No programming language was entered"}), 400

    submission_token = create_submission(code, language)
    submission_info = get_submission(submission_token)

    return jsonify({
        "exit_code": submission_info['exit_code'],
        "language":submission_info['language'],
        "message": submission_info['message'],
        "source_code": submission_info['source_code'],
        "status": submission_info['status'],
        "stderr": submission_info['stderr'],
        "stdout": submission_info['stdout'],
    })


def create_submission(code : str, language : str) -> str:
    # Set language id
    language = language.lower()
    language_id = 43 # Default is plain text

    if language == "assembly":
        language_id = 45
    elif language == "c":
        language_id = 50
    elif language == "c#":
        language_id = 51
    elif language == "c++":
        language_id = 54
    elif language == "java":
        language_id = 62
    elif language == "javascript":
        language_id = 63
    elif language == "php":
        language_id = 68
    elif language == "python":
        language_id = 71
    elif language == "ruby":
        language_id = 72

    # API endpoint
    url = "https://judge0-ce.p.rapidapi.com/submissions"
    
    # Additional Parameters
    querystring = {"base64_encoded": "false", "fields": "*"}

    # Request payload
    payload = {
        "language_id": language_id,
        "source_code": code
    }

    # Define key and host
    headers = {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": os.getenv("CODE_EXE_KEY"),        # TODO: Generate API Keys
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }

    # POST request
    response = requests.post(url, json=payload, headers=headers, params=querystring)

    # Return response token
    return response.json()['token']


def get_submission(token : str) -> dict:
    # API endpoint
    url = "https://judge0-ce.p.rapidapi.com/submissions/" + token

    # Additional Parameters
    querystring = {"base64_encoded": "false", "fields": "*"}

    # Define key and host
    headers = {
        "X-RapidAPI-Key": os.getenv("CODE_EXE_KEY"),        # TODO: Generate API Keys
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }

    # GET request
    response = requests.get(url, headers=headers, params=querystring)

    # GET request again if it is still processing
    while (response.json()['status_id'] == 2):
        time.sleep(0.5)
        response = requests.get(url, headers=headers, params=querystring)

    # Return response
    return response.json()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
