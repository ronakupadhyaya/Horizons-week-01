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
  var counter = 0;

  function eventLoop(timestamp) {
    score++;
    game.clear()

    if (score >= highScore) {
      highScore = score;
      game.saveHighScore(score);
    }

    game.drawScore(score);
    game.drawHighScore(highScore);
    obstacle1X -= 10 + score * .005;
    obstacle2X -= 9 + score * .006;
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacle1X, obstacleY)
    game.drawObstacle(obstacle2X, obstacleY)

    dinosaurY = dinosaurY - dinosaurVelocity;

    if (obstacle1X <= 0)
      obstacle1X = game.width;
    if (obstacle2X <= 0)
      obstacle2X = game.width;
    if (dinosaurY < 200) {
      if (score * .005 > .5)
        dinosaurVelocity -= .3 + .5;
      else
        dinosaurVelocity -= .3 + score * .005;
    } else if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
      counter = 0;
    }

    if (obstacle1X < 100 + game.dinosaurWidth && obstacle1X + game.obstacleWidth > 100 &&
      obstacleY - game.obstacleHeight < dinosaurY - game.dinosaurHeight + game.dinosaurHeight &&
      game.obstacleHeight + obstacleY - game.obstacleHeight > dinosaurY - game.dinosaurHeight ||
      obstacle2X < 100 + game.dinosaurWidth && obstacle2X + game.obstacleWidth > 100 &&
      obstacleY - game.obstacleHeight < dinosaurY - game.dinosaurHeight + game.dinosaurHeight &&
      game.obstacleHeight + obstacleY - game.obstacleHeight > dinosaurY - game.dinosaurHeight) {
      dead = true;
      game.drawMessage('You lose :(. Press up to restart');
      window.cancelAnimationFrame();
    }
    window.requestAnimationFrame(eventLoop);
  }

  window.requestAnimationFrame(eventLoop);

  game.onUpArrow(function() {
    if (!dead && counter <= 1) {
      dinosaurVelocity = 10;
      counter++;
    } else if (dead) {
      dead = false;
      window.requestAnimationFrame(eventLoop);
      obstacle1X = 450;
      obstacle2X = 450;
      dinosaurY = 200;
      score = 0;
      counter = 0;
    }
  })
});