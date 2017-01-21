"use strict";

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  game.drawObstacle(450, 200);
  var obstacleX = 450;
  var obstacleY = 200;
  var dinosaurX = 100;
  var score = 0;


  function eventLoop() {
    game.clear();
    obstacleX = obstacleX - 10;
    game.drawObstacle(obstacleX, obstacleY);
    if (obstacleX < 0) {
      obstacleX = 450;
    }
    game.drawDinosaur(100, dinosaurY);

    game.onUpArrow(function() {
      dinosaurVelocity = 10;
    });

    score++;
    game.drawScore(score);

    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    dinosaurY -= dinosaurVelocity;

    if (dinosaurY === obstacleY && dinosaurX === obstacleX) {
      game.drawText("You Losaaaaa");
      clearInterval(interval);
    }
  }
  var interval = setInterval(eventLoop, 100);
  // setInterval(eventLoop, 100);

  var dinosaurY = 200;
  var dinosaurVelocity = 0;

});
