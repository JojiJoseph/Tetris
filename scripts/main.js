/* eslint-disable no-unused-vars */
let input = new Input();

// State variables
let score = 0;
let matrix = [];
let playing = false;
let lines = 0;
let level = 1;
let currentFillStyle = 1;
let currentStrokeStyle = 0;
let speed = 1; // 1 block per second
let lastTime = 0;
let piece = [];
let nextPiece = [];
let pieceOffsetX = 0;
let pieceOffsetY = 0;
let onScene = false;

window.addEventListener('keydown', (event)=> {
  if (event.keyCode == KEY_ESC && onScene) {
    playing = !playing;
    if (playing == false) {
      ctx.save();
      ctx.font = '30px monospace';
      ctx.fillText('Game paused! Press Esc to continue...', 60, 300);
      ctx.restore();
    }
  }
  if (!playing) return;
  switch (event.keyCode) {
    case KEY_Z:
      if (isRotationPossible( CCW)) {
        rotate(CCW);
      }
      break;
    case KEY_SPACE:
      hardDrop();
      break;
    case KEY_UP:
      if (isRotationPossible()) {
        rotate(CW);
      }
      break;
  }
});

// First action
renderWelcomeGrid();

// Main menu matrix
function generateWelcomeMatrix() {
  let out = [];
  for (i=0; i<ROWS; ++i) {
    let row = [];
    for (j=0; j<COLUMNS; ++j) {
      row.push(0);
    }
    out.push(row);
  }
  return out;
}

function manageKeyEvents(time) {
  if (input.getPress(KEY_RIGHT)) {
    if (isPossible(piece, RIGHT)) {
      move(piece, RIGHT);
    }
  }
  if (input.getPress(KEY_LEFT)) {
    if (isPossible(piece, LEFT)) {
      move(piece, LEFT);
    }
  }
  if (input.getPress(KEY_DOWN)) {
    if (isPossible(piece, DOWN)) {
      move(piece, DOWN);
    }
  }
}

function render() {
  if (!playing) return;
  ctx.clearRect(0, 0, 800, 600);
  renderGrids();
  renderMovingBlocks();
  renderHUD();
}
function renderWelcomeGrid() {
  matrix = generateWelcomeMatrix();
  ctx.save();
  ctx.strokeStyle = PALLET[currentStrokeStyle];
  let offsetX = (800-COLUMNS*CELL_WIDTH)/2;
  let offsetY = (600-ROWS*CELL_HEIGHT)/2;
  for (column=0; column<COLUMNS; ++column) {
    for (row=0; row<ROWS; ++row) {
      ctx.fillStyle = PALLET[Math.floor(Math.random()*(PALLET.length-1))+1];
      ctx.fillRect(offsetX + column*CELL_WIDTH, offsetY + row*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      ctx.strokeRect(offsetX + column*CELL_WIDTH, offsetY + row*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    }
  }
  ctx.restore();
}
function renderHUD() {
  ctx.save();
  ctx.font= '20px monospace';
  ctx.fillStyle = 'white';
  ctx.fillRect(50, 50, 200, 200);
  ctx.strokeRect(50, 50, 200, 200);
  ctx.fillStyle = 'black';
  ctx.fillText(`Score : ${score}`, 60, 80);
  ctx.fillText(`Lines : ${lines}`, 60, 120);
  ctx.fillText(`Level : ${level}`, 60, 160);

  ctx.fillStyle = 'white';
  ctx.fillRect(550, 50, 200, 200);
  ctx.strokeRect(550, 50, 200, 200);
  ctx.fillStyle = 'black';
  ctx.fillText('Next', 600, 80);
  let offsetX = 600 + CELL_WIDTH;
  let offsetY = 80 + CELL_HEIGHT;
  ctx.fillStyle = PALLET[nextFillStyle];
  for (i=0; i<4; ++i) {
    ctx.fillRect(offsetX + nextPiece[i][0]*CELL_WIDTH, offsetY + nextPiece[i][1]*CELL_HEIGHT,
        CELL_WIDTH, CELL_HEIGHT);
    ctx.strokeRect(offsetX + nextPiece[i][0]*CELL_WIDTH, offsetY + nextPiece[i][1]*CELL_HEIGHT,
        CELL_WIDTH, CELL_HEIGHT);
  }
  ctx.restore();
}
function renderMovingBlocks() {
  ctx.save();
  ctx.fillStyle = PALLET[currentFillStyle];
  ctx.strokeStyle = PALLET[currentStrokeStyle];
  let offsetX = (800-COLUMNS*CELL_WIDTH)/2;
  let offsetY = (600-ROWS*CELL_HEIGHT)/2;
  for (i=0; i<4; ++i) {
    ctx.fillRect(offsetX + (pieceOffsetX +piece[i][0])*CELL_WIDTH,
        offsetY + (pieceOffsetY + piece[i][1])*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    ctx.strokeRect(offsetX + (pieceOffsetX +piece[i][0])*CELL_WIDTH,
        offsetY + (pieceOffsetY + piece[i][1])*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
  }
  ctx.restore();
}
function renderGrids() {
  ctx.save();
  ctx.strokeStyle = COLOR_GRAY;
  let offsetX = (VIEWPORT_WIDTH - CELL_WIDTH*COLUMNS)/2;
  let offsetY = (VIEWPORT_HEIGHT-ROWS*CELL_HEIGHT)/2;
  ctx.save();
  ctx.fillStyle = '#FFF';
  ctx.strokeStyle = '000';
  ctx.fillRect(offsetX, offsetY, CELL_WIDTH*COLUMNS, CELL_HEIGHT*ROWS);
  ctx.strokeRect(offsetX, offsetY, CELL_WIDTH*COLUMNS, CELL_HEIGHT*ROWS);
  ctx.restore();
  // Drawing the vertical lines
  for (i=0; i<=ROWS; ++i) {
    ctx.beginPath();
    ctx.moveTo(offsetX + 0, offsetY + i*CELL_HEIGHT);
    ctx.lineTo(offsetX + COLUMNS*CELL_WIDTH, offsetY + i*CELL_HEIGHT);
    ctx.stroke();
    ctx.closePath();
  }
  // Drawing horizontal lines
  for (i=0; i<=COLUMNS; ++i) {
    ctx.beginPath();
    ctx.moveTo(offsetX + i*CELL_WIDTH, offsetY + 0);
    ctx.lineTo(offsetX + i*CELL_WIDTH, offsetY + ROWS*CELL_HEIGHT);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = PALLET[currentStrokeStyle];

  for (column=0; column<COLUMNS; ++column) {
    for (row=0; row<ROWS; ++row) {
      if (matrix[row][column] != 0) {
        ctx.fillStyle = PALLET[matrix[row][column]] || '#AAA';
        ctx.fillRect(offsetX + column*CELL_WIDTH, offsetY + row*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
        ctx.strokeRect(offsetX + column*CELL_WIDTH, offsetY + row*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      }
    }
  }
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = '000';
  ctx.strokeRect(offsetX, offsetY, CELL_WIDTH*COLUMNS, CELL_HEIGHT*ROWS);
  ctx.restore();
}

function update(time) {
  if (time - lastTime > 1000/speed) {
    let okToGoDown = true;

    for (i=0; i<4; ++i) {
      if (piece[i][1] < 0 || piece[i][0] < 0) break; // Movement just started
      if (pieceOffsetY + piece[i][1] == ROWS-1 ||
        matrix[pieceOffsetY + piece[i][1]+1][pieceOffsetX + piece[i][0]]) {
        let choice = Math.floor(Math.random()*pieces.length);
        let group = pieces[choice];
        for (j=0; j<4; ++j) {
          matrix[pieceOffsetY + piece[j][1]][pieceOffsetX + piece[j][0]] = currentFillStyle;
        }
        piece = nextPiece;
        nextPiece = group;
        currentFillStyle = nextFillStyle;
        nextFillStyle = getNextFillStyle();
        okToGoDown = false;
        pieceOffsetX = COLUMNS/2 - 1;
        pieceOffsetY = getInitialPieceOffsetY(piece);
        break;
      }
    }
    if (okToGoDown && isPossible(piece, DOWN)) {
      move(piece, DOWN);
    }
    lastTime = time;
  }
  deleteCompletedRows();
  if (isGameOver()) {
    playing = false;
    onScene = false;
    gameOver.style.display = 'block';
    gameOverScore.innerText = `You scored ${score}`;
    let highScores = JSON.parse(localStorage.getItem('high-scores'));
    topscorerName.value = '';
    topscorerName.placeholder = 'Enter your name';
    if (highScores != null) {
      if (highScores.length < 10 || score > highScores[highScores.length-1].score) {
        addTopScoreDialog.style.display = 'block';
        submitTopscoreButton.onclick = () => {
          highScores.push({name: topscorerName.value, score: score});
          highScores.sort(function(a, b) {
            return b.score - a.score;
          });
          if (highScores.length >= 10);
          highScores = highScores.slice(0, 10);
          localStorage.setItem('high-scores', JSON.stringify(highScores));
          addTopScoreDialog.style.display = 'none';
        };
      }
    } else {
      addTopScoreDialog.style.display = 'block';
      submitTopscoreButton.onclick = () => {
        highScores = [{name: topscorerName.value, score: score}];
        localStorage.setItem('high-scores', JSON.stringify(highScores));
        addTopScoreDialog.style.display = 'none';
      };
    }
  }
}
function loop(time) {
  if (playing) {
    manageKeyEvents(time);
    render();
    update(time);
  }
  requestAnimationFrame(loop);
}

// Action and data manipulation functions
function initLevel() {
  onScene = true;
  clearMatrix();
  piece = getRandomPiece();
  pieceOffsetX = COLUMNS/2 - 1;
  pieceOffsetY = getInitialPieceOffsetY(piece);
  nextPiece = getRandomPiece();
  nextFillStyle = getNextFillStyle();
  score = 0;
  lines = 0;
  level = 1;
  speed = 1;
  requestAnimationFrame(loop);
}
function getRandomPiece() {
  return pieces[Math.floor(pieces.length*Math.random())];
}
function getNextFillStyle() {
  return Math.floor(Math.random()*(PALLET.length-1))+1;
}
function nextRotationCW(piece) {
  switch (piece) {
    case pieceVertical:
      return pieceHorizontal;
    case pieceHorizontal:
      return pieceVertical;
    case pieceL:
      return pieceL2;
    case pieceL2:
      return pieceL3;
    case pieceL3:
      return pieceL4;
    case pieceL4:
      return pieceL;
    case pieceLFlip:
      return pieceLFlip2;
    case pieceLFlip2:
      return pieceLFlip3;
    case pieceLFlip3:
      return pieceLFlip4;
    case pieceLFlip4:
      return pieceLFlip;
    case pieceT:
      return pieceT2;
    case pieceT2:
      return pieceT3;
    case pieceT3:
      return pieceT4;
    case pieceT4:
      return pieceT;
    case pieceLeftDog:
      return pieceLeftDog2;
    case pieceLeftDog2:
      return pieceLeftDog;
    case pieceRightDog:
      return pieceRightDog2;
    case pieceRightDog2:
      return pieceRightDog;
    default:
      return piece;
  }
}
function nextRotationCCW(piece) {
  switch (piece) {
    case pieceVertical:
      return pieceHorizontal;
    case pieceHorizontal:
      return pieceVertical;
    case pieceL:
      return pieceL4;
    case pieceL4:
      return pieceL3;
    case pieceL3:
      return pieceL2;
    case pieceL2:
      return pieceL;
    case pieceLFlip:
      return pieceLFlip4;
    case pieceLFlip4:
      return pieceLFlip3;
    case pieceLFlip3:
      return pieceLFlip2;
    case pieceLFlip2:
      return pieceLFlip;
    case pieceT:
      return pieceT4;
    case pieceT4:
      return pieceT3;
    case pieceT3:
      return pieceT2;
    case pieceT2:
      return pieceT;
    case pieceLeftDog:
      return pieceLeftDog2;
    case pieceLeftDog2:
      return pieceLeftDog;
    case pieceRightDog:
      return pieceRightDog2;
    case pieceRightDog2:
      return pieceRightDog;
    default:
      return piece;
  }
}
function nextRotation(piece, dir = CW) {
  if (dir == CW) {
    return nextRotationCW(piece);
  } else {
    return nextRotationCCW(piece);
  }
}
function isRotationPossible( dir = CW) {
  let next = nextRotation(piece, dir);
  for (let i=0; i<next.length; ++i) {
    if (pieceOffsetX+next[i][0] < 0) return false;
    if (pieceOffsetX+next[i][0] >= COLUMNS) return false;
    if (pieceOffsetY+next[i][1] < 0) return false;
    if (pieceOffsetY+next[i][1] >= ROWS) return false;
    if (matrix[pieceOffsetY+next[i][1]][pieceOffsetX+next[i][0]]) {
      return false;
    }
  }
  return true;
}
function rotate(dir = CW) {
  piece = nextRotation(piece, dir);
}
function getInitialPieceOffsetY(piece) {
  let top = piece[0][1];
  for (let i=1; i<4; ++i) {
    if (piece[i][1]<top) {
      top = piece[i][1];
    }
  }
  return -top;
}
function isPossible(piece, dir) {
  flag = true;
  for (let i=0; i<4; ++i) {
    if (piece[i][1] < 0 || piece[i][0] < 0) return true;
  } // Movement just started
  switch (dir) {
    case LEFT:
      return isMoveLeftPossible();
    case UP:
      return isMoveUpPossible();
    case RIGHT:
      return isMoveRightPossible();
    case DOWN:
      for (i=0; i<4; ++i) {
        if (pieceOffsetY + piece[i][1]+1 > ROWS-1 ||
          matrix[pieceOffsetY + piece[i][1]+1][pieceOffsetX + piece[i][0]] != 0) {
          flag = false;
        }
      }
      break;
  }
  return flag;
}
function isMoveLeftPossible() {
  for (let i=0; i<piece.length; ++i) {
    if (pieceOffsetX + piece[i][0]-1 < 0 ||
        matrix[pieceOffsetY + piece[i][1]][pieceOffsetX + piece[i][0]-1]) {
      return false;
    }
  }
  return true;
}
function isMoveUpPossible() {
  for (let i=0; i<piece.length; ++i) {
    if (pieceOffsetY + piece[i][1]-1 < 0 ||
      matrix[pieceOffsetY +piece[i][1]-1][pieceOffsetX + piece[i][0]]) {
      return false;
    }
  }
  return true;
}
function isMoveRightPossible() {
  for (let i=0; i<piece.length; ++i) {
    if (pieceOffsetX + piece[i][0]+1 > COLUMNS-1 ||
      matrix[pieceOffsetY +piece[i][1]][pieceOffsetX + piece[i][0]+1]) {
      return false;
    }
  }
  return true;
}
function move(piece, dir) {
  switch (dir) {
    case LEFT:
      movePieceLeft();
      break;
    case DOWN:
      movePieceDown();
      break;
    case UP:
      movePieceUp();
      break;
    case RIGHT:
      movePieceRight();
      break;
  }
}
function movePieceDown() {
  pieceOffsetY++;
}
// For debug purpose
function movePieceUp() {
  pieceOffsetY++;
}
function movePieceRight() {
  pieceOffsetX++;
}
function movePieceLeft() {
  pieceOffsetX--;
}
function hardDrop() {
  while (isPossible(piece, DOWN)) {
    move(piece, DOWN);
  }
}
function clearMatrix() {
  for (let row=0; row<ROWS; ++row) {
    for (let column=0; column<COLUMNS; ++column) {
      matrix[row][column] = 0;
    }
  }
}
function deleteCompletedRows() {
  for (let row=0; row<ROWS; row++) {
    let rowFilled = true;
    for (let column=0; column<COLUMNS; column++) {
      if (matrix[row][column] == 0) {
        rowFilled = false;
      }
    }
    if (rowFilled) {
      score += Math.floor(speed*COLUMNS);
      lines++;
      if (lines % 10 == 0) { // No upper limit for level as of now.
        // But it will become impossible for any human after certain level
        level++;
        speed+=0.2;
      }
      let newRow = [];
      for (let j=0; j<COLUMNS; ++j) {
        newRow.push(0);
      }
      matrix.unshift(newRow);
      matrix.splice(row+1, 1);
    }
  }
}
function isGameOver() {
  for (let i=0; i<4; ++i) {
    if (pieceOffsetY + piece[i][1] >= 0 && pieceOffsetX + piece[i][0] >=0 &&
      matrix[pieceOffsetY + piece[i][1]][pieceOffsetX + piece[i][0]] != 0) {
      return true;
    }
  }
  return false;
}
