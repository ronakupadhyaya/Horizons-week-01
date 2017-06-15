"use strict";
/*global game*/

// Wait till the game is ready to run.


game.onReady = function() {

  var obstacleX = game.width;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var gameIsRunning = true;
  var highScore = game.getHighScore();
  var isJumping = false;

  game.onUpArrow(function(){
    if(gameIsRunning){
      isJumping = true;
      dinosaurVelocity = 10;
    }
    else{
      gameIsRunning = true;
      interval = setInterval(game.onReady(), 50);
    }
  });

  return function eventLoop(){
    score++;
    if(score>highScore){
      highScore = score;
      game.saveHighScore(highScore);
    }
    dinosaurY = dinosaurY - dinosaurVelocity;

    if(isJumping){
      dinosaurVelocity--;
    }

    if(dinosaurY>200){
      isJumping = false;
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    if(obstacleX<=0){
      obstacleX = game.width;
    }
    else{
      obstacleX -= 10
    }
    game.clear()
    game.drawDinosaur(100, dinosaurY)
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score)
    game.drawHighScore(highScore);

    if((100 < obstacleX + 40) &&
      (100 + 25 > obstacleX) &&
      (dinosaurY < 220) &&
      (50 + dinosaurY > 225)){
      game.drawMessage('You lose :(');
      clearInterval(interval);
      gameIsRunning = false;
    }
    // else{
    // requestAnimationFrame(eventLoop);
    // }
  };
};

var interval = setInterval(game.onReady(), 50);
