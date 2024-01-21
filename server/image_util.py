# Handles images and the board
import random

from PIL import Image as PILImage, ImageFont, ImageDraw
from typing import List
from io import BytesIO
import base64

import constants
from constants import Image, TextException


def pil_to_b64(img: PILImage) -> str:
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    b64 = str(base64.b64encode(buffer.getvalue()))
    # remove extra characters
    b64 = b64[2:-1]
    return b64


def b64_to_pil(img_b64: str) -> PILImage:
    return PILImage.open(BytesIO(base64.b64decode(img_b64)))


def resize_to_fit(img: PILImage) -> PILImage:
    """Resize img to fit inside background and return as PIL image."""
    background = PILImage.open(constants.BACKGROUND_PATH)
    bg_width, bg_height = background.size
    img_width, img_height = img.size
    max_width = bg_width * constants.MAX_WIDTH_RATIO
    max_height = bg_height * constants.MAX_HEIGHT_RATIO
    # resize to fix max width or height
    if img_width > img_height:
        # long image
        ratio = max_width / img_width
    else:
        # tall image
        ratio = max_height / img_height
    new_size = int(img_width * ratio), int(img_height * ratio)
    img = img.resize(new_size)
    return img


def get_random_location(img: PILImage):
    """
    Returns a random location for the top left corner of the image.
    Assumes image is already resized to fit normally inside background.
    """
    background = PILImage.open(constants.BACKGROUND_PATH)
    bg_width, bg_height = background.size
    img_width, img_height = img.size
    max_x = bg_width - img_width
    max_y = bg_height - img_height
    x = random.randrange(0, max_x)
    y = random.randrange(0, max_y)
    return x, y


def build_board(images: List[Image]):
    """
    Build a board image out of all images in list.
    :return: Base64 encoded board image.
    """
    board = PILImage.open(constants.BACKGROUND_PATH)
    # add all images to board
    for img in images:
        to_add = b64_to_pil(img.b64)
        board.paste(to_add, (img.x, img.y))
    # comment out in server
    # board.show()
    return pil_to_b64(board)


def make_note(text: str) -> PILImage:
    """
    Create a sticky note image with given text and return it.
    Should be dynamically sized based on background.
    """
    if len(text) > constants.NOTE_CHARACTER_LIMIT:
        raise TextException(f'Text is too long ({len(text)} characters)')
    # TODO add newlines
    note = PILImage.open(constants.NOTE_PATH)
    note = resize_to_fit(note)
    draw = ImageDraw.Draw(note)
    font = ImageFont.truetype(constants.NOTE_FONT_PATH, constants.NOTE_FONT_SIZE)
    draw.text(constants.NOTE_OFFSET, text, font=font, fill=constants.NOTE_FONT_COLOR)
    # TODO remove
    note.show()
    return note
