"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var dinosaur = {x: 100, y: 200, vy: 0,
    w: window.game.dinosaurWidth, h: window.game.dinosaurHeight};
  var obstacles = [new Obstacle()];
  var score = 0;
  var gameOver = false;
  var doubleJumped = false;

  var highScore = game.getHighScore();

  game.onUpArrow(function() {
    if (gameOver) {
      obstacles = [new Obstacle()];
      dinosaur.y = 200;
      gameOver = false;
      score = 0;
      requestAnimationFrame(eventLoop);
    } else {
      if (dinosaur.y === 200) { // Have not jumped
        dinosaur.vy = 10;
      } else if (!doubleJumped) { // Jumped only once
        dinosaur.vy = 10;
        doubleJumped = true;
      }
    }
  });

  function eventLoop() {
    game.clear();

    // Obstacle positions
    obstacles.forEach(function(obstacle) {
      obstacle.x = obstacle.x - obstacle.vx;
    });

    if (obstacles[0].x < -window.game.obstacleWidth) {
      console.log('deleted obst')
      obstacles.shift();
      obstacles.push(new Obstacle());
    }

    // Randomly spawns in additional obstacles
    if (Math.random() < 0.005) {
      obstacles.push(new Obstacle());
    }

    // Dinosaur position
    dinosaur.vy = dinosaur.vy - 0.5;
    dinosaur.y -= dinosaur.vy

    // Collide with ground
    if (dinosaur.y > 200) {
      dinosaur.vy = 0;
      dinosaur.y = 200;
      doubleJumped = false;
    }

    // Draw objects
    obstacles.forEach(function(obstacle) {
      game.drawObstacle(obstacle.x, obstacle.y);
    })
    game.drawDinosaur(dinosaur.x, dinosaur.y);
    //game.drawCloud();

    // Update scores
    game.drawScore(++score);
    if (score > highScore) {
      highScore = score;
      game.saveHighScore(score);
    }
    game.drawHighScore(highScore);

    // Check collision
    if (collide()) {
      gameOver = true;
      game.drawMessage('You lose :( Press up to restart.');
    } else {
      window.requestAnimationFrame(eventLoop);
    }


  }

  function collide() {
    return obstacles.some(function(o) {
      return dinosaur.x < o.x + o.w &&
             dinosaur.x + dinosaur.w > o.x &&
             dinosaur.y > o.y - o.h &&
             dinosaur.y - dinosaur.h < o.y
    });
  }

  window.requestAnimationFrame(eventLoop);
});

function Obstacle() {
  this.x = window.game.width + window.game.obstacleWidth;
  this.y = 200;
  this.vx = 5;
  this.w = window.game.obstacleWidth;
  this.h = window.game.obstacleHeight;
}
