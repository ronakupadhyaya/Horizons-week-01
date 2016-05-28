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
		this.player = new game.Dinosaur(154, cv.height - 50);
		
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
		
		// bound player
		var pPos = this.player.getPosition();
		if (pPos[0] >= this.width || pPos[0] < 0) {
			this.player.setPosition(0, pPos[1]);
		}
		
		if (pPos[1] >= this.height) {
			this.player.inAir = false;
			this.player.setPosition(pPos[0], this.height);
		}
		
	},
	render: function() {
		// update game state
		this.update();
		
		// clear canvas
		this.ctx.fillStyle = "#5873fd";
		this.ctx.fillRect(0, 0, this.width, this.height);
		
		// re-render game objects
		this.player.render(this.ctx);
		
		requestAnimationFrame(this.render.bind(this));
	}
};
