from dotenv import load_dotenv
import os
import base64
import json
from requests import post, get
from urllib.parse import urlencode

load_dotenv()

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
redirect_uri = 'http://localhost:8080/callback'

def get_token(auth_code: str) -> str:
    auth_string = f'{client_id}:{client_secret}'
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')

    url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Authorization': f'Basic {auth_base64}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': redirect_uri
    }

    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']

    return token

def get_auth_url() -> str:
    auth_url = 'https://accounts.spotify.com/authorize'
    query_params = {
        'client_id': client_id,
        'response_type': 'code',
        'redirect_uri': redirect_uri,
        'scope': 'user-read-private user-read-email'
    }
    return f'{auth_url}?{urlencode(query_params)}'

def get_auth_header(token: str) -> dict:
    return {'Authorization': f'Bearer {token}' }
