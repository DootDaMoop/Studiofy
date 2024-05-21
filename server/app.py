from flask import Flask, jsonify, redirect, request, session
from flask_cors import CORS
from repositories import spotify_repo
from requests import get, post

app = Flask(__name__)
app.secret_key = 'lol'
CORS(app, supports_credentials=True)

@app.get('/')
def index():
    return jsonify({
        'message':'HELLO GOONS'
    })

@app.get('/login')
def login():
    auth_url = spotify_repo.get_auth_url()
    return redirect(auth_url)

@app.get('/callback')
def callback():
    auth_code = request.args.get('code')
    token = spotify_repo.get_token(auth_code)
    session['token'] = token
    return redirect('http://localhost:3000/profile')

@app.get('/profile')
def profile():
    token = session['token']

    if not token:
        return redirect('/login')
    
    headers = spotify_repo.get_auth_header(token)
    user_profile = get('https://api.spotify.com/v1/me',headers=headers).json()
    return jsonify(user_profile)

if __name__ == '__main__':
    app.run(debug=True, port=8080)