"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  game.clear();
  game.drawObstacle(450, 200);
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var dinosaurX = 100;
  var score = 0;
  var gameStatus = true;
  var highscore = game.getHighScore();
  function eventLoop(){
    obstacleX -= 10;
    game.clear();
    if(obstacleX <= 0){
      obstacleX = game.width;
    }
    game.onUpArrow(function() {
      if(gameStatus){
        dinosaurVelocity = 10;
      }else if(!gameStatus){
        obstacleX = 450;
        dinosaurX = 100;
        dinosaurY = 200;
        score = 0;
        interval = setInterval(eventLoop,100);
        gameStatus = true;
      }
    });

    game.drawObstacle(obstacleX,200);
    game.drawDinosaur(dinosaurX, dinosaurY);
    dinosaurY = dinosaurY - dinosaurVelocity;
    if(dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if(dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    // if(dinosaurVelocity < 200 && dinosaurVelocity > 100){
    //
    // }
    if(obstacleX === 100 && dinosaurY === 200){
      game.drawMessage('You lose :( Press up to restart')
      clearInterval(interval);
      gameStatus = false;
    }
    score ++;
    if(score > game.getHighScore()){
      game.saveHighScore(score);
    }
    game.drawScore(score);
    game.drawHighScore(highscore);
  }

  var interval = setInterval(eventLoop,100);

});
