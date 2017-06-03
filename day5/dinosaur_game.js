"use strict";


(function() {
  function Game() {
    this.width = 550;
    this.height = 250;

    this.obstacleWidth = 100;
    this.obstacleHeight = 50;

    this.dinosaurWidth = 50;
    this.dinosaurHeight = 90;

    this.testWidth = 75;
    this.testHeight = 50;

    this.canvasId = "dinosaur-panel";

    this.attachTo();
    console.log("Dinosaur game initialized");
  };

  Game.prototype = {
    attachTo: function() {
      this.cv = document.querySelector("#" + this.canvasId);
      this.ctx = this.cv.getContext("2d");

      this.cv.width = this.width;
      this.cv.height = this.height;
    },
    clear: function() {
      var base_img = new Image();
      base_img.src = 'img/rainbow.jpg';
      this.ctx.drawImage(base_img, 0, 0, this.width, this.height);

      // this.ctx.fillStyle = "rgb(0,0,0)";
      // this.ctx.fillRect(0, 0, this.width, this.height);
    },
    drawMessage: function(text) {
      this.ctx.fillStyle = 'rgb(0,235,255)';
      this.ctx.font = "100px Helvetica";
      this.ctx.fillText(text, 50, this.height / 2 + 10);
    },
    drawMessage2: function(text) {
      this.ctx.fillStyle = 'rgb(0,0,0)';
      this.ctx.font = "25px Helvetica";
      this.ctx.fillText(text, this.width / 2 - 110, this.height - 20);
    },
    drawScore: function(score) {
      this.ctx.fillStyle = 'rgb(0,235,255)';
      this.ctx.font = "12px Helvetica";
      this.ctx.fillText('Score: ' + score, this.width - 150, 20);
    },
    drawHighScore: function(score) {
      this.ctx.fillStyle = "rgb(255,255,255)";
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
      var bieber = [this.dinosaurWidth, this.dinosaurHeight, "#e44e44"];
      // this.ctx.fillStyle = bieber[2];
      // this.ctx.fillRect(x, y - bieber[1], bieber[0], bieber[1]);
      // this.ctx.beginPath();
      // this.ctx.arc(x, y, 5, 0,2*Math.PI);
      // this.ctx.stroke();
      var base_img = new Image();
      base_img.src = 'img/bieber2.gif';
      base_img.style.width = '50px';
      this.ctx.drawImage(base_img, x-45, y-bieber[1], bieber[0]+90, bieber[1]);

    },
    drawTest: function(x,y) {
      // var test = [this.testWidth, this.testHeight, "rgb(70,150,52)"]
      // var base_img = new Image();
      // base_img.src = 'img/bieber2.gif';
      // this.ctx.fillStyle = 'rgb(0,0,0)';
      // this.ctx.font = "25px Helvetica";
      // this.ctx.fillText("truck", test[0], test[1]);
      // //var img = document.getElementById("face");
      // //this.ctx.fillRect(x, y - dino[1], dino[0], dino[1]);
      // this.ctx.drawImage(base_img,x, y - test[1], test[0], test[1] )
    },
    drawObstacle: function(x, y) {
      var obs = [this.obstacleWidth, this.obstacleHeight, "rgb(0,0,0)"];
      this.ctx.fillStyle = obs[2];
      this.ctx.fillRect(x, y - obs[1], obs[0], obs[1]);
      // this.ctx.beginPath();
      // this.ctx.arc(x, y, 5, 0,2*Math.PI);
      // this.ctx.stroke();
      this.ctx.fillStyle = 'rgb(255,255,255)';
      this.ctx.font = "35px Helvetica";
      this.ctx.fillText("truck", x+10, y - 12);


      // var base_img = new Image();
      // base_img.src = 'img/truck3.gif';
      // this.ctx.drawImage(base_img, x-10, y-obs[1]-30, obs[0]+10, obs[1]+60);

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
})();
