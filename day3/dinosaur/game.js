"use strict";

window.game = {};

game.Game = function() {
	this.tick;
	
	this.initialize();
};

game.Game.prototype = {
	initialize: function() {
		// create canvas
		var cv = document.createElement("canvas");;
		this.ctx = cv.getContext("2d");
		
		this.width = cv.width = 768;
		this.height = cv.height = 240;
		document.body.appendChild(cv);
		
		// game state
		this.tick = Date.now();
		
		// create game objects
		// create player
		this.gameObjects = [];
		this.player = new game.Dinosaur(154, cv.height - 50);
		
		this.gameObjects.push(new game.Obstacle(this.width - 75, this.height));
		
		// add controls
		var that = this;
		cv.addEventListener('click', function(evt) {
			that.player.jump();
		});
		
		this.render();
	},
	update: function() {
		// use this.tick as time
		this.tick = (Date.now() - this.tick) / 1000000000000.0;
		
		// update game objects
		this.player.update(this.tick);
		this.gameObjects.forEach(function(gObj) {
			gObj.update(this.tick);
		}, this);
		
		// bound player
		var pPos = this.player.getPosition();
		if (pPos[0] >= this.width || pPos[0] < 0) {
			this.player.setPosition(0, pPos[1]);
		}
		
		if (pPos[1] >= this.height) {
			this.player.inAir = false;
			this.player.setPosition(pPos[0], this.height);
		}
		
		this.gameObjects.forEach(function(gObj) {
			if (gObj.getPosition()[0] < 0) {
				gObj.setPosition(this.width + gObj.width, gObj.getPosition()[1]);
			}
		}, this);
		
	},
	render: function() {
		// update game state
		this.update();
		
		// clear canvas
		this.ctx.fillStyle = "#5873fd";
		this.ctx.fillRect(0, 0, this.width, this.height);
		
		// re-render game objects
		this.player.render(this.ctx);
		this.gameObjects.forEach(function(gObj) {
			gObj.render(this.ctx);
		}, this);
		
		requestAnimationFrame(this.render.bind(this));
	}
};
