"use strict";
/*global game*/
var gameover = false;
// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = game.width;
  var dinosaurY = 200;
  var obstacleobj = {y: 200, width: game.obstacleWidth, height: game.obstacleHeight};
  var dinoobj = {x: 100, width: game.dinosaurWidth, height: game.dinosaurHeight};
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = game.getHighScore();
  function eventLoop() {
    obstacleX = obstacleX - 10;
    if (obstacleX <= 0) {
      obstacleX = game.width;
    }
    game.clear();
    game.drawDinosaur(100, dinosaurY);
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    dinosaurY = dinosaurY - dinosaurVelocity;
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score);
    score++;
    if (score > highScore) {
      game.saveHighScore(score);
      highScore = game.getHighScore() - 1;
    }
    game.drawHighScore(highScore);
    obstacleobj.x = obstacleX;
    dinoobj.y = dinosaurY;
    if (obstacleobj.x < dinoobj.x + dinoobj.width &&
   obstacleobj.x + obstacleobj.width > dinoobj.x &&
   obstacleobj.y > dinoobj.y - dinoobj.height &&
    obstacleobj.y - obstacleobj.height < dinoobj.y) { //Ending the game (obstacleX === 100 && dinosaurY === 200)
      game.drawMessage('You lose :( Press up to restart.');
      gameover = true;
      clearInterval(interval);
    }
  }

  game.onUpArrow(function() {
    if (gameover === true) {
      score = 0;
      dinosaurY = 200;
      obstacleX = game.width;
      dinosaurVelocity = 0;
      interval = setInterval(eventLoop, 100);
      gameover = false;
    }
    else {
      dinosaurVelocity = 10;
    }
  });
  var interval = setInterval(eventLoop, 100);
  
});
