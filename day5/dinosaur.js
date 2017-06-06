"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {

    var interval = setInterval(eventLoop,100);

    var dinosaurY = 200;
    var dinosaurVelocity = 0;
    var score = 0;
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var obstacleX = 450;
  function eventLoop(){
    obstacleX = obstacleX - 10;
    game.clear();
    game.drawObstacle(obstacleX, 200);
    if (obstacleX === 0){
      obstacleX = game.width;
    }
    game.drawDinosaur(100, dinosaurY);
    dinosaurY = dinosaurY - dinosaurVelocity;

    if (dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if  (dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    if (obstacleX === 100 && dinosaurY === 200){
      game.drawMessage('You lose :( press up to restart')
      clearInterval(interval);
    }
    score ++;
    game.drawScore(score)



  }
  game.onUpArrow(function(){
    if (obstacleX === 100 && dinosaurY === 200){
      score = 0;
      obstacleX = 450;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      interval = setInterval(eventLoop,100);
    } else{
      dinosaurVelocity = 10;
    }

  })



});
