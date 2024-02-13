import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from response import response

#AI team will be coding in response.py ( as pushed to the github already )
#Uncomment the below line when AI team are ready

app = Flask(__name__)
CORS(app)

# Define the LLM API endpoint and key
LLM_API_ENDPOINT = 'http://localhost:8080/llm'
LLM_API_KEY = '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'

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
    # Get JSON data from the frontend
    user_input = request.get_json()
    # Make API call to LLM
    llm_response = response(user_input)
    # Return JSON of response
    return jsonify(llm_response) 

if __name__=="__main__":
    app.run(debug=True, port=8080)