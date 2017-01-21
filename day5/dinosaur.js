"use strict";

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var obstacleY = 200;
  var dinosaurX = 100;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = game.getHighScore();

  function eventLoop () {
    obstacleX = obstacleX - 10
    game.clear();
    game.drawObstacle(obstacleX, obstacleY);
    game.drawDinosaur(dinosaurX, dinosaurY);
    if (obstacleX === 0) {
      obstacleX = game.width;
    }
    dinosaurY = dinosaurY - dinosaurVelocity;

    game.onUpArrow(function() {
      dinosaurVelocity = 10;
      if (obstacleX === dinosaurX && obstacleY === dinosaurY) {
        score = 0
        game.clear();
        obstacleX = 450;
        dinosaurY = 200;
        interval = setInterval(eventLoop, 100);
      }
    });

    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }

    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    if (obstacleX === dinosaurX && obstacleY === dinosaurY) {
      game.drawMessage('You suck :(');
      clearInterval(interval);
    }

    score++;
    game.drawScore(score);
    game.drawHighScore(highScore);

    if (score > highScore) {
      highScore = score;
      game.saveHighScore(score);
    }

  }
  var interval = setInterval(eventLoop, 100);


});
