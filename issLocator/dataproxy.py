from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route("/iss-now")
def get_iss_now():
    response = requests.get("http://api.open-notify.org/iss-now.json")
    return jsonify(response.json())


@app.route("/astros")
def get_astros():
    response = requests.get("http://api.open-notify.org/astros.json")
    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True, port=5014)
