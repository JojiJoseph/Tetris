/* eslint-disable no-unused-vars */
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
  ctx.strokeStyle = PALETTE[currentStrokeStyle];
  let offsetX = (800-COLUMNS*CELL_WIDTH)/2;
  let offsetY = (600-ROWS*CELL_HEIGHT)/2;
  for (column=0; column<COLUMNS; ++column) {
    for (row=0; row<ROWS; ++row) {
      ctx.fillStyle = PALETTE[Math.floor(Math.random()*(PALETTE.length-1))+1];
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
  ctx.fillStyle = PALETTE[nextFillStyle];
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
  ctx.fillStyle = PALETTE[currentFillStyle];
  ctx.strokeStyle = PALETTE[currentStrokeStyle];
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
  ctx.strokeStyle = PALETTE[currentStrokeStyle];

  for (column=0; column<COLUMNS; ++column) {
    for (row=0; row<ROWS; ++row) {
      if (matrix[row][column] != 0) {
        ctx.fillStyle = PALETTE[matrix[row][column]] || '#AAA';
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
