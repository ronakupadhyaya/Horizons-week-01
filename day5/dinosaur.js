"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450
  var dinosaurY = 200
  var dinosaurVelocity = 0
  var score = 0

  function eventLoop() {
    if(obstacleX === 0){
      obstacleX = game.width
    }
    obstacleX = obstacleX - 10;
    dinosaurY= dinosaurY-dinosaurVelocity;
    if(dinosaurY<100){
      dinosaurVelocity= -10;
    }
    if(dinosaurY>200){
      dinosaurVelocity= 0;
      dinosaurY= 200
    }
    game.clear();
    game.drawDinosaur(100, dinosaurY)
    game.drawObstacle(obstacleX, 200);

    score+= 1
    game.drawScore(score)
    game.drawHighScore(highScore)

    if(dinosaurY === 200 && obstacleX ===100){
      game.drawMessage('You lose :(');
      clearInterval(interval);
    }
    if(score>highScore){
      highScore=score
      game.saveHighScore(highScore)
    }
  }
  game.onUpArrow(function() {
    if(dinosaurY === 200 && obstacleX ===100){
      score = 0;
      dinosaurY=200
      obstacleX=450
      interval= setInterval(eventLoop, 100)
    }else {
      if(dinosaurVelocity !== 10 && dinosaurVelocity !== -10) {
        dinosaurVelocity = 10;
      }

    }
  });
  var highScore = game.getHighScore()
  var interval = setInterval(eventLoop, 100)
});
