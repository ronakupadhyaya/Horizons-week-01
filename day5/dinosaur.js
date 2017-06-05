"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity =0;
  var score = 0;
  var highScore = game.getHighScore()
  var interval = setInterval(eventLoop, 100);
  var lose=0;
  function eventLoop() {
    obstacleX = obstacleX - 10;
    game.clear();
    game.drawObstacle(obstacleX, 200);
    if (obstacleX===0) {
      obstacleX = game.width;
    }
  // Jumping Dinosaur
    game.drawDinosaur(100, dinosaurY);
    dinosaurY = dinosaurY - dinosaurVelocity;
    if (dinosaurY < 100) {
      dinosaurVelocity = -10
    }
    if (dinosaurY >200) {
      dinosaurVelocity = 0;
      dinosaurY=200;
    }
  // Dinosaur collision
    if (obstacleX === 100 && dinosaurY === 200) {
      game.drawMessage('You lose:( Press up to restart');
      clearInterval(interval);
      lose =1;
    } else {
      score++;
      game.drawScore(score);
    }
//high score
    if (score > highScore) {
      game.saveHighScore(score);
      highScore = score;
    }
    game.drawHighScore(highScore);
  }

/// OUTSIDE EVENT LOOP
  var highScore =game.getHighScore(highScore);
  game.onUpArrow(function() {
    if (lose ===1) {
      obstacleX = 450;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      score = 0;
      interval = setInterval(eventLoop, 100);
      lose =0;
    } else {
      dinosaurVelocity=10;
    }
  })


});
