# Add and get data from the mongoDB database
import pymongo.collection
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os


def _get_images_collection() -> pymongo.collection.Collection:
    load_dotenv()
    uri = os.getenv("MONGO_URI")
    client = MongoClient(uri, server_api=ServerApi('1'))
    return client['board']['images']


def add_image(img_b64: str, img_x: float, img_y: float):
    """
    Insert an encoded image with location to the database.
    Coordinates are relative to top left?
    """
    collection = _get_images_collection()
    collection.insert_one({"img_b64": img_b64, "img_x": img_x, "img_y": img_y})


# Get all
def get_images():
    """
    Get the list of images in the database.
    Format: "img_b64": base64 encoded image,
            "img_x", "img_y": image coordinates
    """
    images = []
    items = _get_images_collection().find()
    for item in items:
        images.append(item)
    return images
