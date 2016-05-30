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
		this.obstacles = [];
		this.player = new game.Dinosaur(154, cv.height - 50);
		console.log("playerObject created", this.player);
		// add objects
		this.obstacles.push(new game.Obstacle(this.width - 75, this.height));
		
		// add controls
		var that = this;
		document.addEventListener('keydown', function(evt) {
			that.player.jump();
		}, false);
		
		this.render();
	},
	update: function() {
		// [helper] use this.tick as the time step input for game objects
		this.tick = (Date.now() - this.tick) / 1000000000000.0;
		
		// Exercise 1. Update game objects
		// Write a few statements to update the internal state of the game objects with the tick. 
		// Use your knowledge of the player object and the other game objects to update each object with the time step.
		// 
		// hint. check out the `dinosaur.js` file to check out the pertinent methods!
		// hint. how do you iterate through an array and perform a function on each item?
		// hint. use `.update()`!
		// YOUR CODE HERE
		
		// Exercise 2.A Bound Player & Collision Detection | Player Care	
		// Write a few lines that check if the player's position is under the canvas.The bottom border of the canvas is at position y =`this.height`, and the top level is y = 0. The player's position is accessible via `.getPosition()`
		// If the player is under the canvas, stop the player from falling by setting its inAir property to false and setting it's position to the same x-point but vertically positioned ("stopped") the bottom border, `this.height`.
		// 
		// YOUR CODE HERE
		
		this.obstacles.forEach(function(gObj) {
			// Exercise 2.B Bound Player & Collision Detection | Bound Obstacles
			// Write a block of code that resets the position of the game obstacles.
			// The obstacle(s) always move to the left, so when the object is fully past the left border, move it back to the right side.
			// 
			// hint. use `getPosition` and `setPosition`
			// hint. the left border of the canvas is at x = 0;
			// YOUR CODE HERE
			
			// Exercise 2.C Bound Player & Collision Detection | Check Collisions
			// Write a block of code that calls `this.exit` if an obstacle has collided with the player object.
			// 
			// hint. use `gObj.isCollidingWith` but you'll need to implement it first! Check out `dinosaur.js`.
			// YOUR CODE HERE
			
			// [helper] collideTime
			// if collided and after 3 seconds, clear it
			if (gObj.hasCollided && (Date.now() - gObj.collideTime) > 3000.0) {
				gObj.hasCollided = false;
				gObj.collideTime = null;
			}
		}, this);
		
	},
	exit: function() {
		console.log("Game over!");
	},
	render: function() {
		// update game state
		this.update();
		
		// clear canvas
		this.ctx.fillStyle = "#5873fd";
		this.ctx.fillRect(0, 0, this.width, this.height);
		
		// re-render game objects
		this.player.render(this.ctx);
		this.obstacles.forEach(function(gObj) {
			gObj.render(this.ctx);
		}, this);
		
		requestAnimationFrame(this.render.bind(this));
	}
};
