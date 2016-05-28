"use strict";

window.game = window.game || {};


// [Helper] `Mob(initialX, initialY)` class
// This class is responsible for a lot of the moving-object (mobb) functionality.

game.Mob = function(initialX, initialY) {
	// state-related properties
	this.inAir = true;
	this.animated = true;
	this.animationSpeed = 1;
	
	// position
	this.x = initialX;
	this.y = initialY;
	
	// velocity
	this.vel = [0, 0];
	
	// acceleration
	this.gravity = 0.98;
	this.accel = [0, this.gravity];
	
	// offset & collisions
	this.width = 25;
	this.height = 50;
	this.shapeColor = "#e44e44";
};

game.Mob.prototype = {
	// `Move(t<Number>)` method
	// Given a time step t (mathematically, a time difference or delta-t), move will update the internal velocity and position states of the instance.
	// 
	move: function(t) {
		// console.log(t);
		
		// update velocities w/ gravity
		this.vel = this.vel.map(function(vel, i) {
			var newVel = (vel + this.accel[i]);
			if (i == 1 && !this.inAir) {
				newVel = 0;
			}
			return newVel;
		}, this);
		// console.log("updated velocities", this.vel);
		
		// weight velocities with time
		var wVel = (this.vel).map(function(vel,i) {
			return vel*t;
		});
		this.setPosition(this.x + wVel[0], this.y + wVel[1]);
		
	},
	// `setPosition(x<Number>, y<Number>)` method
	// Sets the position of the object given an numerical X & Y coordinates
	setPosition: function(x, y) {
		this.x = x;
		this.y = y;
	},
	// `getPosition()` method
	// returns the position of the object in an array of the format: [xPosition<Number>, yPosition<Number>]
	getPosition: function() {
		return [this.x, this.y];
	},
	// `update(t<Number>)` method
	// Main state update loop for the mob object
	update: function(t) {
		// Move (check conditions first)
		this.move(t);

	},
	// `render(ctx<canvasObject>)` method
	// Render the object's image to the the canvas
	render: function(ctx) {
		// draw image at position
		ctx.fillStyle = this.shapeColor;
		ctx.fillRect(this.x - this.width, this.y - this.height, this.width, this.height);
	}
};

// [Helper] `Dinosaur` Class
// This `Dinosaur` class inherits a majority of its functions from Mob
game.Dinosaur = function(initialX, initialY) {
	game.Mob.call(this, initialX, initialY);
	
	this.gravity *= this.gravity * 0.75;
	this.jumpHeight = 2 * this.height;
};

// Inherit from Mob
game.Dinosaur.prototype = Object.create(game.Mob.prototype);
game.Dinosaur.prototype.constructor = game.Dinosaur;

game.Dinosaur.prototype.jump = function() {
		// calculate acceleration necessary to reach height:
		if (!this.inAir) {
			// console.log("yAccel", this.accel[1]);
			// console.log("jumpHeight", this.jumpHeight);
			var velApply = Math.sqrt(2 * (this.accel[1]) * this.jumpHeight);
			this.vel[1] = -velApply;
			this.inAir = true;
		}
};

// [Helper] `Obstacle` Class

game.Obstacle = function(initialX, initialY) {
	game.Mob.call(this, initialX, initialY);
	
	this.inAir = false;
	this.vel[0] = -3;
	this.width = 50;
	this.height = 20;
	this.shapeColor = "#ccc";
}

// Inherit from Mob
game.Obstacle.prototype = Object.create(game.Mob.prototype);
game.Obstacle.prototype.constructor = game.Obstacle;
