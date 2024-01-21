# Add and get data from the mongoDB database
import pymongo.collection
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

from constants import Image


def _get_images_collection() -> pymongo.collection.Collection:
    load_dotenv()
    uri = os.getenv("MONGO_URI")
    client = MongoClient(uri, server_api=ServerApi('1'))
    return client['board']['images']


def add_image(img: Image):
    """
    Insert an encoded image with location to the database.
    Coordinates are relative to top left?
    """
    collection = _get_images_collection()
    collection.insert_one({"img_b64": img.b64, "img_x": img.x, "img_y": img.y})


# Get all
def get_images():
    """
    Get the list of images in the database.
    """
    images = []
    items = _get_images_collection().find()
    for item in items:
        img = Image(item['img_b64'], item['img_x'], item['img_y'])
        images.append(img)
    return images
