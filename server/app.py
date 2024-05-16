from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get('/')
def index():
    return jsonify({
        'message':'HELLO GOONS'
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)