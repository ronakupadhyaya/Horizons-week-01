"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var dinosaurY = 200;
  dinosaurVelocity = 0;
  setInterval(eventLoop, 100);
  function eventLoop() {
    if (obstacleX === 0){
      obstacleX = game.width;
    }else{
      obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    }
    game.clear();
    game.drawObstacle(obstacleX, game.height*.75);
  }
});
