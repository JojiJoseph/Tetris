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
    promptSaveTopscore();
  }
}
function promptSaveTopscore() {
  topscorerName.onkeyup =(event) => {
    if (event.keyCode == KEY_ENTER) {
      submitTopscoreButton.click();
    }
  };
  let highScores = JSON.parse(localStorage.getItem('high-scores'));
  topscorerName.value = '';
  if (highScores != null) {
    if (highScores.length < 10 || score > highScores[highScores.length-1].score) {
      addTopScoreDialog.style.display = 'block';
      submitTopscoreButton.onclick = () => {
        saveTopscore(topscorerName.value, score);
        addTopScoreDialog.style.display = 'none';
      };
    }
  } else {
    addTopScoreDialog.style.display = 'block';
    submitTopscoreButton.onclick = () => {
      saveTopscore(topscorerName.value, score);
      addTopScoreDialog.style.display = 'none';
    };
  }
}
function saveTopscore(name, score) {
  let highScores = JSON.parse(localStorage.getItem('high-scores')) || [];
  highScores.push({name: name, score: score});
  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores = highScores.slice(0, 10);
  localStorage.setItem('high-scores', JSON.stringify(highScores));
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
  let bottom = piece[0][1];
  let left = piece[0][0];
  let top = bottom;
  let right = left;
  for (let i=1; i<4; ++i) {
    if (piece[i][0] < left) {
      left = piece[i][0];
    }
    if (piece[i][0] > right) {
      right = piece[i][0];
    }
    if (piece[i][1] > bottom) {
      bottom = piece[i][1];
    }
    if (piece[i][1] < top) {
      top = piece[i][1];
    }
  }
  let newPiece = [[0, 0], [0, 0], [0, 0], [0, 0]];
  for (let i=0; i<4; ++i) {
    newPiece[i][0] = left - (piece[i][1] - bottom);
    newPiece[i][1] = bottom + (piece[i][0] - right);
  }
  return newPiece;
}
function nextRotationCCW(piece) {
  let bottom = piece[0][1];
  let left = piece[0][0];
  let top = bottom;
  let right = left;
  for (let i=1; i<4; ++i) {
    if (piece[i][0] < left) {
      left = piece[i][0];
    }
    if (piece[i][0] > right) {
      right = piece[i][0];
    }
    if (piece[i][1] > bottom) {
      bottom = piece[i][1];
    }
    if (piece[i][1] < top) {
      top = piece[i][1];
    }
  }
  let newPiece = [[0, 0], [0, 0], [0, 0], [0, 0]];
  for (let i=0; i<4; ++i) {
    newPiece[i][0] = left + (piece[i][1] - top);
    newPiece[i][1] = bottom - (piece[i][0] - left);
  }
  return newPiece;
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
