"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function () {

  var obstacleX;
  var obstacleY = 200;
  var obstacleSpd = 5;
  var dinosaurX = 100;
  var dinosaurY;
  var dinosaurVelocity;

  var score;
  var highScore;
  var failMessage = "You lose...";

  function reset() {
    obstacleX = 450;
    dinosaurY = 200;
    dinosaurVelocity = 0;
    score = 0;
    highScore = game.getHighScore();
  }

  reset();

  function eventLoop() {
    obstacleX = obstacleX - obstacleSpd;
    score++;

    if (score > highScore) {
      highScore = score;
      game.saveHighScore(highScore);
    }
    game.clear();
    game.drawScore(score);
    game.drawDinosaur(dinosaurX, dinosaurY);
    game.drawObstacle(obstacleX, obstacleY);
    game.drawHighScore(highScore);

    if (obstacleX < -game.obstacleWidth) {
      obstacleX = game.width;
    }
    if (dinosaurY < 200) {
      dinosaurVelocity -= 1;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    if (dinosaurX <= obstacleX + game.obstacleWidth &&
      dinosaurX + game.dinosaurWidth >= obstacleX &&
      dinosaurY >= obstacleY - game.obstacleHeight &&
      dinosaurY <= obstacleY) {
      clearInterval(intervalID);
      game.drawMessage(failMessage);
    }
    dinosaurY = dinosaurY - dinosaurVelocity;
  }

  var intervalID = setInterval(eventLoop, obstacleSpd * 5);

  game.onUpArrow(function () {
    dinosaurVelocity = 10;
    if (dinosaurX <= obstacleX + game.obstacleWidth &&
      dinosaurX + game.dinosaurWidth >= obstacleX &&
      dinosaurY >= obstacleY - game.obstacleHeight &&
      dinosaurY <= obstacleY) {
      reset();
      intervalID = setInterval(eventLoop, obstacleSpd * 5);
    }
  });
});
