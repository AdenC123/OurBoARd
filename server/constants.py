from pathlib import Path
from collections import namedtuple

# common data structures
Image = namedtuple('Image', 'b64 x y')

# paths
SERVER_PATH = Path(__file__).parent
BACKGROUND_PATH = SERVER_PATH / 'data/board.png'
