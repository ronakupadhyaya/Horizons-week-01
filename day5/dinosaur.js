"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {

  var obstacleX = game.width;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = 0;
  game.saveHighScore(highScore);

  var dino = {};
  var obst = {};

  function eventLoop() {
    dino = {x: game.dinosaurX, y:dinosaurY, width: game.dinosaurWidth, height: game.dinosaurHeight};
    obst = {x: obstacleX, y: game.obstacleY, width: game.obstacleWidth, height:game.obstacleHeight};
    score++;
    obstacleX = obstacleX - 10;
    dinosaurY = dinosaurY - dinosaurVelocity;
    game.clear();
    game.drawDinosaur(100,dinosaurY);
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score);

    if (obstacleX === 100 && dinosaurY === 200) {
      game.drawMessage('You lose :(');
      clearInterval(interval);
    }

    game.onUpArrow(function() {
      dinosaurVelocity = 10;
      if (obstacleX === game.dinosaurX && dinosaurY === game.obstacleY) {
        obstacleX = game.width;
        dinosaurY = 200;
        dinosaurVelocity = 0;
        score = 0;
        game.clear();
        game.drawDinosaur(100,dinosaurY);
        game.drawObstacle(obstacleX, 200);
        game.drawScore(score);

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

    if (score >= game.getHighScore()) {
      highScore = score;
      game.saveHighScore(highScore);
      game.drawHighScore(highScore);
    }
    else {
      game.drawHighScore(highScore);
    }

  }

  var interval = setInterval(eventLoop, 100);

  function reset() {
  }

});
