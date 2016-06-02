"use strict";

window.game = window.game || {};

// [Helper] `game.CanvasWrapper`

game.CanvasWrapper = function() {
	this.width = 550;
  this.height = 250;
	this.canvasId = "dinosaur-panel";
  
  this.cv;
  this.ctx;
  
  this.attachTo();
  console.log("Initalizing");
};

game.CanvasWrapper.prototype = {
	getHeight: function() {
		return this.height;
	},
	getWidth: function() {
		return this.width;
	},
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
	drawText: function(text) {
		this.ctx.font = "36px Helvetica";
		this.ctx.fillText(text, this.width / 2, this.height / 2);
	},
	drawLine: function(x, y, xp, yp) {
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(xp, yp);
		this.ctx.stroke();
	},
  drawDinosaur: function(x, y) {
		var dino = [25, 50, "#e44e44"];
		this.ctx.fillStyle = dino[2];
    this.ctx.fillRect(x, y - dino[1], dino[0], dino[1]);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0,2*Math.PI);
    this.ctx.stroke();
  },
  drawObstacle: function(x, y) {
		var obs = [40, 20, "#ccc"];
		this.ctx.fillStyle = obs[2];
    this.ctx.fillRect(x, y - obs[1], obs[0], obs[1]);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0,2*Math.PI);
    this.ctx.stroke();
  },
	callOnUp: function(fun) {
		window.addEventListener('keydown', function(evt) {
			if (evt.which === 38 || evt.keyCode === 38) {
				fun();
			}
		});
	}
};



// Put your Event Loop here for parts 1 & 2!

// Put your `Game` object here for part 3!
