"use strict";


(function() {
  // TODO
  function GameBoard() {
    this.width = 550;
    this.height = 250;

    this.obstacleWidth = 40;
    this.obstacleHeight = 20;

    this.dinosaurWidth = 25;
    this.dinosaurHeight = 50;

    this.canvasId = "dinosaur-panel";

    this.attachTo();
    console.log("Initialized");
  };

  GameBoard.prototype = {
    attachTo: function() {
      this.cv = document.querySelector("#" + this.canvasId);
      this.ctx = this.cv.getContext("2d");

      this.cv.width = this.width;
      this.cv.height = this.height;
    },
    clear: function() {
      this.ctx.fillStyle = "#5873fd";
      this.ctx.fillRect(0, 0, this.width, this.height);
    },
    drawMessage: function(text) {
      this.ctx.font = "36px Helvetica";
      this.ctx.fillText(text, 10, this.height / 2);
    },
    drawScore: function(score) {
      this.ctx.font = "12px Helvetica";
      this.ctx.fillText('Score: ' + score, this.width - 150, 20);
    },
    drawHighScore: function(score) {
      this.ctx.font = "12px Helvetica";
      this.ctx.fillText('High score: ' + score, this.width - 150, 40);
    },
    drawLine: function(x, y, xp, yp) {
      this.ctx.beginPath();
      this.ctx.moveTo(x,y);
      this.ctx.lineTo(xp, yp);
      this.ctx.stroke();
    },
    drawDinosaur: function(x, y) {
      var dino = [this.dinosaurWidth, this.dinosaurHeight, "#e44e44"];
      this.ctx.fillStyle = dino[2];
      this.ctx.fillRect(x, y - dino[1], dino[0], dino[1]);
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0,2*Math.PI);
      this.ctx.stroke();
    },
    drawObstacle: function(x, y) {
      var obs = [this.obstacleWidth, this.obstacleHeight, "#ccc"];
      this.ctx.fillStyle = obs[2];
      this.ctx.fillRect(x, y - obs[1], obs[0], obs[1]);
      this.ctx.beginPath();
      this.ctx.arc(x, y, 5, 0,2*Math.PI);
      this.ctx.stroke();
    },
    onUpArrow: function(fun) {
      window.addEventListener('keydown', function(evt) {
        if (evt.which === 38 || evt.keyCode === 38) {
          fun();
        }
      });
    },
    onReady: function(fun) {
      document.addEventListener("DOMContentLoaded", fun);
    }
  };

  window.game = new GameBoard();
})();
