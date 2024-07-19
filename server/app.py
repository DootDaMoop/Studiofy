from flask import Flask, jsonify, redirect, request, session
from flask_cors import CORS
from repositories import spotify_repo
from requests import get, post

app = Flask(__name__)
app.secret_key = 'lol'
CORS(app, supports_credentials=True)

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
    top_tracks_json = get('https://api.spotify.com/v1/me/top/tracks?limit=50', headers=headers).json()

    track_ids = [track['id'] for track in top_tracks_json['items']]
    audio_features_json = get(f'https://api.spotify.com/v1/audio-features/?ids={",".join(track_ids)}', headers=headers).json()

    audio_features = audio_features_json['audio_features']

    feature_dict = {
        'danceability': 0,
        'acousticness': 0,
        'energy': 0,
        'instrumentalness': 0,
        'liveness': 0,
        'speechiness': 0,
        'valence': 0
    }

    for feature in audio_features:
        feature_dict['danceability'] += feature['danceability']
        feature_dict['acousticness'] += feature['acousticness']
        feature_dict['energy'] += feature['energy']
        feature_dict['instrumentalness'] += feature['instrumentalness']
        feature_dict['liveness'] += feature['liveness']
        feature_dict['speechiness'] += feature['speechiness']
        feature_dict['valence'] += feature['valence']

    feature_averages_json = {}
    num_tracks = len(audio_features)

    for k,v in feature_dict.items():
        feature_averages_json[k] = v / num_tracks

    closest_tracks = {}

    for feature in feature_averages_json.keys():
        closest_tracks[feature] = min(audio_features, key=lambda x: abs(x[feature] - feature_averages_json[feature]))

    closest_tracks_json = {
        feature: {
            'track_id': song['id'],
            'track_name': top_tracks_json['items'][track_ids.index(song['id'])]['name'],
            'artist_names': [artist['name'] for artist in top_tracks_json['items'][track_ids.index(song['id'])]['artists']],
            'album_art': top_tracks_json['items'][track_ids.index(song['id'])]['album']['images'][0]['url'],
            'track_link': top_tracks_json['items'][track_ids.index(song['id'])]['external_urls']['spotify']
            } for feature, song in closest_tracks.items()
        }

    return jsonify({
        'top_tracks': top_tracks_json,
        'audio_features': audio_features_json,
        'feature_averages': feature_averages_json,
        'closest_tracks': closest_tracks_json
        })

if __name__ == '__main__':
    app.run(debug=True, port=8080)