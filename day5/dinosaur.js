"use strict";

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = game.getHighScore();
  var gameInProgress = true;
  game.drawObstacle(obstacleX, 200);

  function eventLoop() {
    if (obstacleX === 0) {
      obstacleX = game.width;
    }
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    dinosaurY = dinosaurY - dinosaurVelocity;
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost

    score++;

    game.clear();
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score);
    game.drawHighScore(game.getHighScore());
    game.onUpArrow(function() {
      if (!gameInProgress) {
        game.clear();
        obstacleX = 450;
        dinosaurY = 200;
        dinosaurVelocity = 0;
        score = 0;
        gameInProgress = true;
        interval = setInterval(eventLoop, 100);
      }


    });
    if (dinosaurY === 200 && obstacleX === 100) {
      gameInProgress = false;
      game.drawMessage("You Lose :( Press up to restart");
      if (score > game.getHighScore()) {
        game.saveHighScore(score);
      }
      clearInterval(interval);
    }
  }
  game.onUpArrow(function() {
    if (gameInProgress) {
      dinosaurVelocity = 10;
    }
  });

  var interval = setInterval(eventLoop, 100);



});
