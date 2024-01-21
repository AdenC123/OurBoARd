# Starts API
import flask
from flask import Flask, request
from flask_cors import CORS
import json

import mongo
import image_util
from image_util import Image
from constants import TextException


# Init flask
API_PORT = 2620
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# helpers
def error_response(e: Exception) -> str:
    return json.dumps({
        "status": "error",
        "data": None,
        "message": "Internal Server Error: " + repr(e)
    })


# Endpoints
@app.route('/addImage', methods=['POST'])
def add_image():
    try:
        img_b64 = request.json.get("image")
        resized_img = image_util.resize_to_fit(image_util.b64_to_pil(img_b64))
        x, y = image_util.get_random_location(resized_img)
        img_b64 = image_util.pil_to_b64(resized_img)
        mongo.add_image(Image(img_b64, x, y))
        response = flask.jsonify({
            "status": "success",
            "data": None
        })
        return response
    except Exception as e:
        print(e)
        return error_response(e)


@app.route('/addNote', methods=['POST'])
def add_note():
    try:
        text = request.json.get("text")
        note_img = image_util.make_note(text)
        note_b64 = image_util.pil_to_b64(note_img)
        x, y = image_util.get_random_location(note_img)
        mongo.add_image(Image(note_b64, x, y))
        response = flask.jsonify({
            "status": "success",
            "data": None
        })
        return response
    except TextException as e:
        response = flask.jsonify({
            "status": "fail",
            "data": {"text": e.message}
        })
        return response
    except Exception as e:
        print(e)
        return error_response(e)


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
        return response
    except Exception as e:
        print(e)
        return error_response(e)


# Start flask API
app.run(port=API_PORT, host="0.0.0.0")
