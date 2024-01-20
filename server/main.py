# Starts API
from flask import Flask

# Server constants


# Init flask server
app = Flask(__name__)
API_PORT = 2620


# Endpoints
@app.route('/addImage', methods=['POST'])
def add_image():
    pass


@app.route('/getBoard')
def get_board():
    pass
