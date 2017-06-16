"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacle1X = 450;
  var obstacle2X = 450;
  var dinosaurY = 200;
  var obstacleY = game.height - game.obstacleHeight * 2.5;
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = game.getHighScore();
  var dead = false;
  var interval;
  var counter = 0;

  window.requestAnimationFrame(function() {
    interval = setInterval(eventLoop, 100)
  });

  function eventLoop() {
    score++;
    game.clear()

    if (score >= highScore) {
      highScore = score;
      game.saveHighScore(score);
    }

    game.drawScore(score);
    game.drawHighScore(highScore);
    obstacleX -= 10 + score * .05;
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacle1X, obstacleY)
    game.drawObstacle(obstacle2X, obstacleY)

    dinosaurY = dinosaurY - dinosaurVelocity;

    if (obstacleX <= 0)
      obstacleX = game.width;
    if (dinosaurY < 200) {
      if (score * .005 > 1.2)
        dinosaurVelocity -= .5 + 1.2;
      else
        dinosaurVelocity -= .5 + score * .005;
    } else if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
      counter = 0;
    }

    if (obstacleX < 100 + game.dinosaurWidth && obstacleX + game.obstacleWidth > 100 &&
      obstacleY - game.obstacleHeight < dinosaurY - game.dinosaurHeight + game.dinosaurHeight &&
      game.obstacleHeight + obstacleY - game.obstacleHeight > dinosaurY - game.dinosaurHeight) {

      dead = true;
      clearInterval(interval);
      game.drawMessage('You lose :(. Press up to restart');
    }
  }

  game.onUpArrow(function() {
    if (!dead && counter <= 1) {
      dinosaurVelocity = 10;
      counter++;
    } else if (dead) {
      dead = false;
      window.requestAnimationFrame(function() {
        interval = setInterval(eventLoop, 100);
      })
      obstacleX = 450;
      dinosaurY = 200;
      score = 0;
      counter = 0;
    }
  })

});