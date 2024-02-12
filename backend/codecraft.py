import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
#AI team will be coding in response.py ( as pushed to the github already )
#Uncomment the below line when AI team are ready
#from response.py import default_response

app = Flask(__name__)
CORS(app)

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
    frontend_request_data = request.get_json()
    # Make API call to LLM
    #the below line contains a placeholder 'default_response'. Will be removed when AI team is ready
    llm_response = requests.post('default_response', json=frontend_request_data)  # Replace 'LLM_API_ENDPOINT' with the LLM API endpoint from AI team
    
    #if successful return  from LLM
    if llm_response.status_code == 200:
        llm_data = llm_response.json()
        #return response to frontend
        return jsonify(llm_data) 
        #if the LLM returns its value as a string, replace the above line with: return llm_data
    else:
        #error message:
        return jsonify({'error': 'Failed to fetch response from LLM'}), 500

if __name__=="__main__":
    app.run(debug=True, port=8080)