# Handles images and the board
from PIL import Image as PILImage
from typing import List
from io import BytesIO
import base64

from constants import BACKGROUND_PATH, Image


# TODO implement this
def get_random_location():
    return 0, 0


def build_board(images: List[Image]):
    """
    Build a board image out of all images in list.
    :return: Base64 encoded board image.
    """
    board = PILImage.open(BACKGROUND_PATH)
    # add all images to board
    for img in images:
        to_add = PILImage.open(BytesIO(base64.b64decode(img.b64)))
        board.paste(to_add, (img.x, img.y))
    # encode board image to b64
    buffer = BytesIO()
    board.save(buffer, format="PNG")
    board_b64 = base64.b64encode(buffer.getvalue())
    return board_b64
