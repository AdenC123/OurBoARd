# Starts API
import flask
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
        resized_img = image_util.resize_to_fit(img_b64)
        x, y = image_util.get_random_location(resized_img)
        img_b64 = image_util.pil_to_b64(resized_img)
        img = Image(img_b64, x, y)
        mongo.add_image(img)
        response = flask.jsonify({
            "status": "success",
            "data": None
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
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
        response = flask.jsonify({
            "status": "success",
            "data": {"board": str(board_b64)}
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return json.dumps({
            "status": "error",
            "data": None,
            "message": "Internal Server Error: " + repr(e)
        })


# Start flask API
app.run(port=API_PORT, host="0.0.0.0")
