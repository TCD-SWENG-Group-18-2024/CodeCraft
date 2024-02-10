import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

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

if __name__=="__main__":
    app.run(debug=True, port=8080)