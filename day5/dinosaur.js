"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var gameOver = false;
  var obstacleVel = 10;
  var highScore = game.getHighScore();
  function eventLoop() {
    //reset obstacle if moving off screen
    if (obstacleX === 0) {
      obstacleX = game.width;
    } else {
      obstacleX -= obstacleVel; // move obstacle 10 pixels leftmost
    }
    //bring dinosaur back down after jumping
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    } else if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    if (score > 500) {
      obstacleVel = 20
    } else if (score > 300) {
      obstacleVel = 15
    } else {
      obstacleVel = 10;
    }

    //increment score
    score++;
    if(score > highScore) {
      highScore = score;
      game.saveHighScore(highScore);
    }

    // clear screen
    game.clear();
    // draw obstacle again
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score);
    game.drawHighScore(highScore);
    dinosaurY = dinosaurY - dinosaurVelocity;

    //check for collison
    if(game.isCollision(100, dinosaurY, obstacleX, 200)) {
      game.drawMessage('You lose! Press up to restart');
      gameOver = true;
      clearInterval(interval);
    }
  }

  game.onUpArrow(function() {
    if(gameOver) {
      //reset game state
      obstacleX = 450;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      score = 0;
      gameOver = false;
      interval = setInterval(eventLoop, 100);
    } else {
      dinosaurVelocity = 10;
    }
  });

  var interval = setInterval(eventLoop, 100);
});
