from pathlib import Path
from collections import namedtuple


# exceptions
class TextException(Exception):
    def __init__(self, message):
        self.message = message


# common data structures
Image = namedtuple('Image', 'b64 x y')

# paths
SERVER_PATH = Path(__file__).parent
BACKGROUND_PATH = SERVER_PATH / 'data/board.png'
NOTE_PATH = SERVER_PATH / 'data/stickynote.png'
NOTE_FONT_PATH = SERVER_PATH / 'data/stickynotefont.ttf'

# other constants
MAX_WIDTH_RATIO = 0.3
MAX_HEIGHT_RATIO = 0.3
NOTE_CHARACTER_LIMIT = 100
NOTE_CHARACTERS_NEWLINE = 15
NOTE_OFFSET = (25, 60)
NOTE_FONT_SIZE = 40
NOTE_FONT_COLOR = (0, 0, 0)
