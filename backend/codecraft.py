from flask import Flask

app = Flask(__name__)


@app.route("/homepage")
def homepage():
    return{"message": "Hello SwEng Project Group 18"}


if __name__=="__main__":
    app.run(debug=True)