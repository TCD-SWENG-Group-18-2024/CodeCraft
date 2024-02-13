from flask import Flask, request,jsonify
import requests
from response import complete
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_request():
    data = request.get_json()
    user_input = data.get('user_input')
    use_case = data.get('use_case')
    ai_model = data.get('ai_model')
    # expects json payload structure from frontend
    
    # Call the appropriate function based on use_case and ai_model
    result = process_data(user_input, use_case, ai_model)

    return jsonify(result)

def process_data(user_input, use_case, ai_model):
    if use_case == 'code_generation':
        if ai_model == 'watsonx.ai':
            # Call the WatsonX.ai code generation function
            result = watsonx_ai_code_generation(user_input)
        elif ai_model == 'openai':
            # Call the OpenAI code generation function
            result = openai_code_generation(user_input)
        # Add more conditions for other AI models

    elif use_case == 'code_completion':
        if ai_model == 'watsonx.ai':
            # Call the WatsonX.ai code generation function
            result = watsonx_ai_code_generation(user_input)
        elif ai_model == 'openai':
            # Call the OpenAI code generation function
            result = openai_code_generation(user_input)
        # Add more conditions for other AI models

    elif use_case == 'code_analysis':
        if ai_model == 'watsonx.ai':
            # Call the WatsonX.ai code generation function
            result = watsonx_ai_code_generation(user_input)
        elif ai_model == 'openai':
            # Call the OpenAI code generation function
            result = openai_code_generation(user_input)
        # Add more conditions for other AI models

    # Can add more conditions for other use cases

    else:
        result = {"error": "Invalid use case"}

    return result

def watsonx_ai_code_generation(user_input):
    # Logic for WatsonX.ai code generation
    return {"result": "Generated code from WatsonX.ai"}

def openai_code_generation(user_input):
    # Logic for OpenAI code generation
    return {"result": "Generated code from OpenAI"}
