# Starts API
import base64

from flask import Flask, request
import json
from pathlib import Path

# Constants
SERVER_PATH = Path(__file__).parent
BOARD_PATH = SERVER_PATH / 'data' / 'board.png'

# Init flask
app = Flask(__name__)
API_PORT = 2620


# Endpoints
@app.route('/addImage', methods=['POST'])
def add_image():
    pass


@app.route('/getBoard')
def get_board():
    # TODO proof of concept, serve static board image
    with BOARD_PATH.open() as f:
        board_b64 = base64.b64encode(f.read())
        return json.dumps({
            "status": "success",
            "data": {"board": board_b64}
        })


# Start flask API
app.run(port=API_PORT, host="0.0.0.0")
