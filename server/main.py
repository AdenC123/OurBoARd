# Starts API
from flask import Flask, request
import json

import mongo
import image_util
from image_util import Image


# Init flask
app = Flask(__name__)
API_PORT = 2620


# Endpoints
@app.route('/addImage', methods=['POST'])
def add_image():
    try:
        img_b64 = request.json.get("image")
        x, y = image_util.get_random_location()
        img = Image(img_b64, x, y)
        mongo.add_image(img)
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
    # TODO use cache to make this faster
    try:
        imgs = mongo.get_images()
        board_b64 = image_util.build_board(imgs)
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
