// Ui Components
/* eslint-disable no-unused-vars */
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let menu = document.getElementById('menu');
let playButton = document.getElementById('play-button');
let aboutButton = document.getElementById('about-button');
let mainScreen = document.getElementById('main');
let gameOver = document.getElementById('game-over');
let gameOverScore = document.getElementById('game-over-score');
let restartButton = document.getElementById('restart-button');
let aboutDialog = document.getElementById('about-dialog');
let aboutDialogCloseButton = document.getElementById('about-close-button');
let helpButton = document.getElementById('help-button');
let helpDialog = document.getElementById('help-dialog');
let helpDialogCloseButton = document.getElementById('help-close-button');

// Ui Event Listeners
aboutButton.addEventListener('click', ()=>{
  aboutDialog.style.display = 'block';
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
restartButton.addEventListener('click', ()=>{
  menu.style.display = 'none';
  gameOver.style.display = 'none';
  mainScreen.style.display = 'block';
  playing = true;
  initLevel();
});
