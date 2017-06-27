// "use strict";

window.game = window.game || {};

// [Helper] `Mob(initialX, initialY)` class
// This class is responsible for a lot of the moving-object (mobb) functionality.

game.Mob = function(initialX, initialY) {
  // state-related properties
  this.inAir = true;
  this.animated = true;
  this.animationSpeed = 1;

  // position (bottom-left vertex)
  this.x = initialX;
  this.y = initialY;

  // velocity
  this.vel = [0, 0];

  // acceleration
  this.gravity = 0.33;
  this.jumpHeight = 2 * this.height;
  this.accel = [0, this.gravity];

  // offset & collisions
  this.width = 25;
  this.height = 50;
  this.hasCollided = false;
  this.collideTime = null;
  this.shapeColor = "#e44e44";

  // Admin stuff
  this.hasCalledUpdate = false;
};

game.Mob.prototype = {
  // `Move(t<Number>)` method
  //
  move: function(t) {
    // update velocities w/ gravity
    this.vel = this.vel.map(function(vel, i) {
      var newVel = vel + this.accel[i];
      if (i == 1 && !this.inAir) {
        newVel = 0;
      }
      return newVel;
    }, this);
    // console.log("updated velocities", this.vel);

    // weight velocities with time
    var wVel = this.vel.map(function(vel, i) {
      return vel * t;
    });
    this.setPosition(this.x + wVel[0], this.y + wVel[1]);

  },
  // `setPosition(x<Number>, y<Number>)` method
  // Sets the position of the bottom-left vertext of the object given numerical X & Y coordinates
  setPosition: function(x, y) {
    this.x = x;
    this.y = y;
  },
  // `getPosition()` method
  getPosition: function() {
    return [this.x, this.y];
  },
  jump: function() {
    // calculate acceleration necessary to reach height:
    if (!this.inAir) {
      var velApply = Math.sqrt(2 * this.accel[1] * this.jumpHeight);
      this.vel[1] = -velApply;
      this.inAir = true;
    }
  },
  // Exercise 1.`isCollidingWith(other<Mob>)` method
  // Finally, you can also treat each
  //
  // hint. use `getPosition`!
  // hint. the .width and .height properties come in useful too.
  // hint. use can also use game.comparePositions as well.
  isCollidingWith: function(other) {
    // YOUR CODE HERE
    if (this.hasCollided) return false;
    var myPos = this.getPosition();
    var otherPos = other.getPosition();
    // Point-based collision (bottom-left)
    // return game.comparePositions(this.getPosition(), other.getPosition());
    var isCollision = game.comparePositions(myPos, otherPos);
    if (isCollision) {
      this.hasCollided = true;
      this.collideTime = Date.now();
      // console.log("My pos,", myPos);
      // console.log("Their pos,", otherPos);
    }
    return isCollision;
  },
  // `freeze()` method
  // Stops the object from moving
  freeze: function() {
    this.inAir = false;
    this.vel = [0, 0];
  },
  // `update(t<Number>)` method
  // Main state update loop for the mob object
  update: function(t) {
    // Move (check conditions first)
    this.move(t);

    if (!this.hasCalledUpdate) {
      this.hasCalledUpdate = true;
    }
  },
  // `render(ctx<canvasObject>)` method
  // Render the object's image to the the canvas
  render: function(ctx) {
    // draw image at position
    ctx.fillStyle = this.shapeColor;
    ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
};

// [Helper] `Dinosaur` Class
// This `Dinosaur` class inherits a majority of its functions from Mob
game.Dinosaur = function(initialX, initialY) {
  game.Mob.call(this, initialX, initialY);

};

// Inherit from Mob
game.Dinosaur.prototype = new game.Mob();

// [Helper] `Obstacle` Class

game.Obstacle = function(initialX, initialY) {
  game.Mob.call(this, initialX, initialY);

  this.inAir = false;
  this.vel[0] = -3;
  this.width = 50;
  this.height = 20;
  this.shapeColor = "#ccc";
};

// Inherit from Mob
game.Obstacle.prototype = Object.create(game.Mob.prototype);
game.Obstacle.prototype.constructor = game.Obstacle;
