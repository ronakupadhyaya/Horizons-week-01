"use strict";

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var gameEnd = false;
  var iD = setInterval(eventLoop,100)
  var highScore = game.getHighScore()

  function eventLoop() {
    obstacleX = obstacleX - 10;

    game.clear();
    game.drawObstacle(obstacleX, 200);

    if(obstacleX === 0) {
      obstacleX = game.width
    }

    game.drawDinosaur(100, dinosaurY)
    dinosaurY = dinosaurY - dinosaurVelocity

    if(dinosaurY < 100) {
      dinosaurVelocity = -10
    } else if (dinosaurY > 200) {
      dinosaurVelocity = 0
      dinosaurY = 200
    } if (obstacleX === 100 && dinosaurY === 200) {
      game.drawMessage('YOU SUCK')
      gameEnd = true;
      clearInterval(iD)
    }

    score++
    game.drawScore(score);
    if (score > highScore) {
      highScore = score
      game.saveHighScore(highScore)
    }
    game.drawHighScore(highScore);
  }

  game.onUpArrow(function() {
    dinosaurVelocity = 10;
    if(gameEnd) {
      game.clear();
      obstacleX = 450
      dinosaurY = 200
      score = 0;
      gameEnd = false;
      iD = setInterval(eventLoop, 100);
    }
  });
});
