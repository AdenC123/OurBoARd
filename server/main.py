# Starts API
import base64
from flask import Flask, request
import json
from pathlib import Path

import mongo
import image_util

# Constants
SERVER_PATH = Path(__file__).parent
BOARD_PATH = SERVER_PATH / 'data/board.png'

# Init flask
app = Flask(__name__)
API_PORT = 2620


# Endpoints
@app.route('/addImage', methods=['POST'])
def add_image():
    try:
        img_b64 = request.json.get("image")
        x, y = image_util.get_random_location()
        mongo.add_image(img_b64, x, y)
        return json.dumps({
            "status": "success",
            "data": None
        })
    except Exception as e:
        return json.dumps({
            "status": "error",
            "data": None,
            "message": "Internal Server Error: " + repr(e)
        })


@app.route('/getBoard')
def get_board():
    # TODO proof of concept, serve static board image
    try:
        with BOARD_PATH.open('rb') as f:
            board_b64 = base64.b64encode(f.read())
            return json.dumps({
                "status": "success",
                "data": {"board": str(board_b64)}
            })
    except Exception as e:
        return json.dumps({
            "status": "error",
            "data": None,
            "message": "Internal Server Error: " + repr(e)
        })


# Start flask API
app.run(port=API_PORT, host="0.0.0.0")
