"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var obstacleY = 200;
  var dinosaurVelocity = 0;
  var dinosaurX = 100;
  var dinosaurY = 200;
  var score = 0;
  var highScore = game.getHighScore();
  function eventLoop() {
      obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
      game.clear();
      game.drawObstacle(obstacleX, 200);
      if (obstacleX === 0) {
          obstacleX = game.width;
      }
      if(dinosaurY < 100) {
          dinosaurVelocity = dinosaurVelocity - 5;
      }
      game.drawDinosaur(100, dinosaurY);
      dinosaurY = dinosaurY - dinosaurVelocity;
      if(dinosaurY > 200) {
          dinosaurVelocity = 0;
          dinosaurY = 200;
      }
      if (dinosaurX < obstacleX + game.dinosaurWidth &&
       dinosaurX + game.obstacleWidth > obstacleX &&
       dinosaurY < obstacleY + game.dinosaurHeight &&
       game.obstacleHeight + dinosaurY > obstacleY) {
          game.drawMessage('You lose :(')
          clearInterval(interval)
      }

      score = score + 1;
      game.drawScore(score);
      if (score > highScore) {
          highScore = score;
          game.saveHighScore(highScore);
      }
      game.drawHighScore(highScore);
  }
  var interval = setInterval(eventLoop, 50);
  game.onUpArrow(function() {
    if (dinosaurX < obstacleX + game.dinosaurWidth &&
     dinosaurX + game.obstacleWidth > obstacleX &&
     dinosaurY < obstacleY + game.dinosaurHeight &&
     game.obstacleHeight + dinosaurY > obstacleY) {
        score = 0;
        obstacleY = 200;
        obstacleX = game.width;
        // dinosaurY = 200;
        dinosaurVelocity = 0;
        interval = setInterval(eventLoop, 50);
    }
    else {
        dinosaurVelocity = 20;
    }
  });
});
