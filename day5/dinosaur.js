"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var obstacleX = 450;
  function eventLoop() {
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    game.clear()
    game.drawObstacle(obstacleX, 200);
    if (obstacleX <= 0){obstacleX  = game.width}
    game.drawDinosaur(100, dinosaurY)
    dinosaurY = dinosaurY - dinosaurVelocity;
    // if (dinosaurY < 100){return dinosaurVelocity = -10}
    // if (dinosaurY > 200){dinosaurVelocity = 0 dinosaurY = 200}
  }
setInterval(eventLoop, 100);
var dinosaurY = 200;

var dinosaurVelocity = 0;


});
game.onUpArrow(function() {
  dinosaurVelocity = 10;
});
