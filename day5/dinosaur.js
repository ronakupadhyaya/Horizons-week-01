"use strict";

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var obstacleX = 450;
  function eventLoop() {
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    // clear screen
    // draw obstacle again
    game.clear();
    game.drawObstacle(450, 200);
  }
});
