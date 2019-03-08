// Ui Components
/* eslint-disable no-unused-vars */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let menu = document.getElementById('menu');
let playButton = document.getElementById('play-button');
let aboutButton = document.getElementById('about-button');
let highScoresButton = document.getElementById('high-scores-button');
let mainScreen = document.getElementById('main');
let gameOver = document.getElementById('game-over');
let gameOverScore = document.getElementById('game-over-score');
let restartButton = document.getElementById('restart-button');
let aboutDialog = document.getElementById('about-dialog');
let aboutDialogCloseButton = document.getElementById('about-close-button');
let helpButton = document.getElementById('help-button');
let helpDialog = document.getElementById('help-dialog');
let helpDialogCloseButton = document.getElementById('help-close-button');
let highScoresDialog = document.getElementById('high-scores');
let highScoresDialogCloseButton = document.getElementById('high-scores-close-button');
let backButton = document.getElementById('back-button');
let submitTopscoreButton = document.getElementById('submit-topscore-button');
let topscorerName = document.getElementById('topscorer-name');
let addTopScoreDialog = document.getElementById('add-topscore');

// Ui Event Listeners
aboutButton.addEventListener('click', ()=>{
  aboutDialog.style.display = 'block';
});
backButton.addEventListener('click', ()=>{
  menu.style.display = 'block';
  gameOver.style.display = 'none';
});
highScoresButton.addEventListener('click', () => {
  let highScores = JSON.parse(localStorage.getItem('high-scores'));
  let table = highScoresDialog.querySelector('table');
  if (highScores) {
    table.innerHTML = '';
    let tableHeader = document.createElement('tr');
    tableHeader.innerHTML = '<th>Name</th><th>Score</th>';
    table.appendChild(tableHeader);
    for (let i=0; i<highScores.length; ++i) {
      let row = document.createElement('tr');
      row.innerHTML = `<td>${highScores[i].name}</td><td>${highScores[i].score}</td>`;
      table.appendChild(row);
    }
  } else {
    table.innerHTML = '<tr><th>Nothing to show.</th></tr>';
  }
  highScoresDialog.style.display = 'block';
});
playButton.addEventListener('click', ()=>{
  menu.style.display = 'none';
  mainScreen.style.display = 'block';
  playing = true;
  initLevel();
});
helpButton.addEventListener('click', ()=>{
  helpDialog.style.display = 'block';
});
aboutDialogCloseButton.addEventListener('click', ()=>{
  aboutDialog.style.display = 'none';
});
helpDialogCloseButton.addEventListener('click', ()=>{
  helpDialog.style.display = 'none';
});
helpDialogCloseButton.addEventListener('click', ()=>{
  helpDialog.style.display = 'none';
});
highScoresDialogCloseButton.addEventListener('click', ()=>{
  highScoresDialog.style.display = 'none';
});
restartButton.addEventListener('click', ()=>{
  menu.style.display = 'none';
  gameOver.style.display = 'none';
  mainScreen.style.display = 'block';
  playing = true;
  initLevel();
});
