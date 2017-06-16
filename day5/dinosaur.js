"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var obstacle2X = 280;
  var obstacleY = game.height - game.obstacleHeight - 30;
  var dinosaurY = 200;
  var dinosaurX = 100;
  var dinosaurVelocity = 0;
  var id;
  var score = 0;
  var dead = false;
  var highScore = game.getHighScore();
  var count = 0;

  function eventLoop() {
    score++;
    if (score > highScore) {
      highScore = score;
      game.saveHighScore(score);
    }
    obstacleX -= 5 + score * 0.005;
    obstacle2X -= 5 + score * 0.005;

    if (obstacleX <= 0) {
      obstacleX = game.width;
    }
    if (obstacle2X <= 0) {
      obstacle2X = game.width;
    }

    if (dinosaurY < 200) {
      dinosaurVelocity -= 0.3;
    } else if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
      count = 0;
    }

    game.clear();
    game.drawHighScore(highScore);
    dinosaurY = dinosaurY - dinosaurVelocity;
    game.drawDinosaur(dinosaurX, dinosaurY);
    game.drawObstacle(obstacleX, obstacleY);
    game.drawObstacle(obstacle2X, obstacleY);
    game.drawScore(score);

    if (obstacleX < 100 + game.dinosaurWidth && obstacleX + game.obstacleWidth > 100 &&
      obstacleY - game.obstacleHeight < dinosaurY - game.dinosaurHeight + game.dinosaurHeight &&
      game.obstacleHeight + obstacleY - game.obstacleHeight > dinosaurY - game.dinosaurHeight) {
      game.drawMessage("You lose :( Press up to restart");
      dead = true;
      return;
    }

    if (obstacle2X < 100 + game.dinosaurWidth && obstacle2X + game.obstacleWidth > 100 &&
      obstacleY - game.obstacleHeight < dinosaurY - game.dinosaurHeight + game.dinosaurHeight &&
      game.obstacleHeight + obstacleY - game.obstacleHeight > dinosaurY - game.dinosaurHeight) {
      game.drawMessage("You lose :( Press up to restart");
      dead = true;
      return;
    }

    window.requestAnimationFrame(eventLoop);
  }

  window.requestAnimationFrame(eventLoop);

  game.onUpArrow(function() {
    if (!dead && count <= 2) {
      dinosaurVelocity = 10;
      count++;
      console.log(count);
    } else {
      dead = false;
      window.requestAnimationFrame(eventLoop);
      score = 0;
      dinosaurY = 200;
      obstacleX = 450;
      obstacle2X = 280;
      counter = 0;
    }
  });
});
