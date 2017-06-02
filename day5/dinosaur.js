"use strict";
/*global game*/

// Wait till the game is ready to run.
/*game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  game.clear();
  game.drawObstacle(450, 200);
});*/


game.onReady(function() {
  var obstacleX = game.width;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var interval;
  var highscore = game.getHighScore();
  var up = game.onUpArrow(function() {
    if(obstacleX === 100 && dinosaurY === 200){
      obstacleX = game.width;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      score = 0;
      interval = setInterval(eventLoop, 100);
    } else if(dinosaurY === 200){
      dinosaurVelocity = 10;
    }
  });
  var dinosaurCurrent = {
    x: 100,
    y: dinosaurY,
    width: 25,
    height: 50
  }
  var obstacleCurrent = {
    x: obstacleX,
    y: 200,
    width: 40,
    height: 20
  }

  function eventLoop() {
    obstacleX = obstacleX - 10;
    dinosaurY = dinosaurY - dinosaurVelocity;
    up;
    if(obstacleX === 0){
      game.clear();
      obstacleX = game.width;
    }

    if(dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if(dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    console.log(dinosaurCurrent.y);
    score++;
    game.clear();
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);
    game.drawScore(score);
    game.drawHighScore(game.getHighScore());
    if(score > highscore){
      game.saveHighScore(score);
    }
    if(obstacleX === 100 && dinosaurY === 200){
      game.drawMessage("You lose!! :(((. Up to restart!");
      clearInterval(interval);
      up;
      game.drawObstacle(obstacleX, 200);
      game.drawDinosaur(100, dinosaurY);
      game.drawScore(score);
    }
  }
  interval = setInterval(eventLoop, 100);
});
