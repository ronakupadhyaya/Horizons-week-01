"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 550;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var interval = setInterval(eventLoop, 10);
  var score = 0;

 function eventLoop() {
   obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
   dinosaurY = dinosaurY - dinosaurVelocity;
   game.clear(); // clear screen
   game.drawObstacle(obstacleX, 200);// draw obstacle again
   game.drawDinosaur(100, dinosaurY);
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
  if (obstacleX === 100 && dinosaurY === 200) {
    game.drawMessage('YOU LOSE!! ');
    clearInterval(interval);
     }
  score = score += 1;
  game.drawScore(score);
  }
 game.onUpArrow(function() {
   dinosaurVelocity = 10;
 });
});
