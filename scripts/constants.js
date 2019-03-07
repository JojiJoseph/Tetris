// Constants
/* eslint-disable no-unused-vars */
const KEY_BOUNCE_TIME = 60;

const KEY_ESC = 27;
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_Z = 90;

const LEFT = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;

const CW = 0;
const CCW = 1;

const COLOR_GRAY = '#EEEEEE';
const COLOR_BLACK = '#000';
const COLOR_RED = '#F00';
const COLOR_BLUE = '#00F';
const COLOR_GREEN = '#0F0';
const COLOR_YELLOW = '#FF0';
const COLOR_MAGENTA = '#F0F';
const COLOR_CYAN = '#0FF';
const PALLET = [COLOR_BLACK, COLOR_RED, COLOR_GREEN, COLOR_BLUE, COLOR_YELLOW, COLOR_MAGENTA, COLOR_CYAN];

const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;
const ROWS = 24;
const COLUMNS = 12;

const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 600;

const pieceHorizontal = [[0, 0], [1, 0], [2, 0], [3, 0]]; // hotizontal line
const pieceVertical = [[0, 0], [0, 1], [0, 2], [0, 3]]; // vertical line
const pieceSquare = [[0, 0], [1, 0], [0, 1], [1, 1]]; // square

const pieceL = [[0, 0], [0, 1], [0, 2], [1, 2]]; // L
const pieceL2 = [[0, 1], [1, 1], [2, 1], [0, 2]]; // L 90* CW
const pieceL3 = [[0, 0], [1, 0], [1, 1], [1, 2]]; // L 180* CW
const pieceL4 = [[0, 2], [1, 2], [2, 2], [2, 1]]; // L 270* CW

const pieceLFlip = [[0, 2], [1, 2], [1, 1], [1, 0]]; // Flipped L
const pieceLFlip2 = [[0, 1], [0, 2], [1, 2], [2, 2]]; // Flipped L 90* CW
const pieceLFlip3 = [[0, 0], [0, 1], [0, 2], [1, 0]]; // Flipped L 180* CW
const pieceLFlip4 = [[0, 1], [1, 1], [2, 1], [2, 2]]; // Flipped L 270* CW

const pieceT = [[0, 1], [1, 1], [2, 1], [1, 2]]; // T
const pieceT2 = [[0, 1], [1, 1], [1, 0], [1, 2]]; // T
const pieceT3 = [[0, 2], [1, 1], [2, 2], [1, 2]]; // T
const pieceT4 = [[0, 0], [0, 1], [0, 2], [1, 1]]; // T

const pieceLeftDog = [[0, 1], [1, 1], [1, 2], [2, 2]];
const pieceLeftDog2 = [[0, 1], [1, 1], [1, 0], [0, 2]];
const pieceRightDog = [[0, 2], [1, 2], [1, 1], [2, 1]];
const pieceRightDog2 = [[0, 0], [0, 1], [1, 1], [1, 2]];

const pieces = [pieceHorizontal, pieceVertical,
  pieceSquare, pieceL, pieceL2, pieceL3, pieceL4,
  pieceLFlip, pieceLFlip2, pieceLFlip3, pieceLFlip4,
  pieceT, pieceT2, pieceT3, pieceT4,
  pieceLeftDog, pieceLeftDog2, pieceRightDog, pieceRightDog2];
