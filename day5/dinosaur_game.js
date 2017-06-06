"use strict";

(function() {
  function Game() {
    this.width = 800;
    this.height = 300;

    this.obstacleWidth = 40;
    this.obstacleHeight = 20;

    this.dinosaurWidth = 25;
    this.dinosaurHeight = 50;

    this.canvasId = "dinosaur-panel";

    this.attachTo();
    console.log("Dinosaur game initialized");
  }

  Game.prototype = {
    attachTo: function() {
      this.cv = document.querySelector("#" + this.canvasId);
      this.ctx = this.cv.getContext("2d");

      this.cv.width = this.width;
      this.cv.height = this.height;
    },
    clear: function() {
      this.ctx.fillStyle = "#5873fd";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "#905010";
      this.ctx.fillRect(0, 200, this.width, this.height - 200);
    },
    drawMessage: function(text) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = "36px Helvetica";
      this.ctx.fillText(text, 10, this.height / 2);
    },
    drawScore: function(score) {
      this.ctx.fillStyle = "#000";
      this.ctx.font = "12px Helvetica";
      this.ctx.fillText('Score: ' + score, this.width - 150, 20);
    },
    drawHighScore: function(score) {
      this.ctx.fillStyle = "#000";
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
      var dino = [this.dinosaurWidth, this.dinosaurHeight, "green"];
      this.ctx.fillStyle = dino[2];
      this.ctx.fillRect(x, y - dino[1], dino[0], dino[1]);

      this.ctx.beginPath(); // Back
      this.ctx.moveTo(x, y);
      for (var h = 0; h < dino[1]; h += 5) {
        this.ctx.lineTo(x - 10 * (h%2===0), y - h + 5);
      }
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath(); // Head
      this.ctx.arc(x + 5, y - dino[1] + 5, 10, 0, 2*Math.PI );
      this.ctx.fill();

      this.ctx.beginPath(); // Jaw
      this.ctx.arc(x + dino[0], y - dino[1] + 10, 11, 0, 2*Math.PI );
      this.ctx.fill();

      this.ctx.beginPath(); // Eye
      this.ctx.arc(x + 7, y - dino[1] + 5, 4, Math.PI/12, Math.PI + Math.PI/12 );
      this.ctx.fillStyle = "white";
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.arc(x + 8, y - dino[1] + 6, 2, 0, 2*Math.PI );
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.beginPath(); // Nose
      this.ctx.arc(x + dino[0] + 4, y - dino[1] + 4, 2, 0, 2*Math.PI );
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(x + dino[0], y - dino[1]/3 + 4, 12, Math.PI/2, 3/2*Math.PI);
      this.ctx.fillStyle = "yellowgreen";
      this.ctx.fill();
    },
    drawObstacle: function(x, y) {
      var obs = [this.obstacleWidth, this.obstacleHeight, "#ccc"];
      this.ctx.fillStyle = obs[2];
      this.ctx.fillRect(x, y - obs[1], obs[0], obs[1]);
      this.ctx.fillRect(x + 5, y - obs[1] - 5, 32, 5);
      this.ctx.fillRect(x - 5, y - 12, 50, 12);
    },
    drawCloud: function(x, y) {
      this.ctx.fillStyle = "white".
      this.ctx.beginPath();
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
    },
    saveHighScore: function(score) {
      localStorage.setItem('dinosaurHiScore', score || 0);
    },
    getHighScore: function() {
      return localStorage.getItem('dinosaurHiScore') || 0;
    },
    clearHighScore: function() {
      localStorage.removeItem('dinosaurHiScore');
    }
  };

  window.game = new Game();
}());
