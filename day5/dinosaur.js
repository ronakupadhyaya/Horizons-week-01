"use strict";
/*global game*/


// Wait till the game is ready to run.
var gameOver = false;
var highscore = game.getHighScore();
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var obstacleX = game.width;
  var score = 0;
  var rect1 = { y: 200, width: game.obstacleWidth, height: game.obstacleHeight };
  var rect2 = { x: 100, width: game.dinosaurWidth, height: game.dinosaurHeight };
  
  function eventLoop() {
    obstacleX -= 10;
    if (obstacleX <= 0) {
      obstacleX = game.width;
    }
    game.clear();
    //draw dinosaur
    dinosaurY -= dinosaurVelocity;
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score);
    game.drawHighScore(highscore);
    score++;
    if (score > highscore) {
      game.saveHighScore(score);
      highscore = game.getHighScore() - 1;
    }
    rect1.x = obstacleX;
    rect2.y = dinosaurY;
    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y > rect2.y - rect2.height &&
       rect1.y - rect1.height < rect2.y) {
      gameOver = true;
      clearInterval(interval);
      game.drawMessage('You lose :( Press up to restart');
    }
  }

  game.onUpArrow(function() {
    console.log('2');
    if (gameOver) {
      dinosaurY = 200;
      dinosaurVelocity = 0;
      obstacleX = game.width;
      score = 0;
      interval = setInterval(eventLoop, 100);
      gameOver = false;
    } else {
      dinosaurVelocity = 10;
    }
  });
  var interval = setInterval(eventLoop, 100);
});
