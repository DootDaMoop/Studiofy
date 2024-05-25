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

@app.get('/top-tracks')
def get_user_top_tracks():
    token = session['token']

    if not token:
        return redirect('/login')
    
    headers = spotify_repo.get_auth_header(token)
    top_tracks = get('https://api.spotify.com/v1/me/top/tracks?limit=50', headers=headers).json()

    track_ids = [track['id'] for track in top_tracks['items']]
    audio_features = get(f'https://api.spotify.com/v1/audio-features/?ids={",".join(track_ids)}', headers=headers).json()

    return jsonify({
        'top_tracks': top_tracks,
        'audio_features': audio_features
        })

if __name__ == '__main__':
    app.run(debug=True, port=8080)