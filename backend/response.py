import dotenv
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

# For this to work, you need to create a file called '.env' and input the following:
# OPENAI_API_KEY=YOUR_KEY_HERE
dotenv.load_dotenv()

chat = ChatOpenAI()
system_message = SystemMessage(content="""
You are a code analysis tool. Please analyse the following code. 
State what the code does and give feedback or tips on how to improve it. 
Be specific. : 
""")


def default_response(user_input: str) -> str:
    return chat([system_message, HumanMessage(content=user_input)]).content



print(default_response("""
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
    app.run(debug=True)
"""))
