/* eslint-disable no-unused-vars */
class Input {
  constructor() {
    this.keys = [];
    this.timeLastPressed = Date.now();
    window.addEventListener('keydown', this.keyDown.bind(this));
    window.addEventListener('keyup', this.keyUp.bind(this));
  }
  keyDown(event) {
    this.keys[event.keyCode] = true;
    if (playing) {
      event.preventDefault();
    }
  }
  keyUp(event) {
    this.keys[event.keyCode] = false;
    if (playing) {
      event.preventDefault();
    }
  }
  getPress(keyCode) {
    if (this.keys[keyCode] && Date.now() > this.timeLastPressed + KEY_BOUNCE_TIME) {
      this.timeLastPressed = Date.now();
      return this.keys[keyCode];
    }
  }
}
