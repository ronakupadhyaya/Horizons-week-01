"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function () {
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var interval;
  var highScore = game.getHighScore();
  var obstacleVelocity = 10;
  game.onUpArrow(function () {
    if (obstacleX < 100 + 25 &&
      obstacleX + 40 > 100 &&
      200 > dinosaurY - 50 &&
      200 - 20 < dinosaurY) {
      score = 0;
      obstacleX = 450;
      obstacleVelocity = 10;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      interval = setInterval(eventLoop, 100);
    }
    else if(dinosaurY === 200) {
      dinosaurVelocity = 15;
    }
  });
  function eventLoop() {
    obstacleX = obstacleX - obstacleVelocity;
    dinosaurY = dinosaurY - dinosaurVelocity;
    if (dinosaurY !== 200)
      dinosaurVelocity -= 2;
    game.clear();
    if (obstacleX <= 0) {
      obstacleX = game.width;
      obstacleVelocity += 2;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    if (obstacleX < 100 + 25 &&
      obstacleX + 40 > 100 &&
      200 > dinosaurY - 50 &&
      200 - 20 < dinosaurY) {
      game.drawMessage("You lose :( Press up to restart");
      clearInterval(interval);
    }
    score++;
    if (score > highScore) {
      highScore = score;
      game.saveHighScore();
    }
    game.drawHighScore(highScore);
    game.drawScore(score);
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);
  }
  interval = setInterval(eventLoop, 100);
});

