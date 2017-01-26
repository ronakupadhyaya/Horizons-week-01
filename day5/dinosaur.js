"use strict";

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.

  game.clear();
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity =0;
  var score = 0;
  var inProgress = true;
  var highScore = game.getHighScore();

  game.drawObstacle(obstacleX, 200);

  var eventLoop =function () {
    game.clear(); // clear screen
    game.drawObstacle(obstacleX, 200);    // draw obstacle again
    game.drawDinosaur(100, dinosaurY);
    game.drawScore(score);
    game.drawHighScore(highScore);
    if(dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if(dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    if(obstacleX < 0){
      obstacleX = 550;
    }
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    dinosaurY = dinosaurY - dinosaurVelocity;
    score++;
    if(score > highScore){
      game.saveHighScore(score);
      highScore = score;
    }
    //console.log(obstacleX, 200, 100, dinosaurY);
    if(obstacleX === 100 && dinosaurY === 200){

      inProgress = false;
      game.drawMessage('You lose :(');
      clearInterval(interval);
      game.onUpArrow(function(){
        if(inProgress === false){
          game.clear(); // clear screen
          score = 0;
          obstacleX = 450;
          dinosaurY = 200;
          dinosaurVelocity =0;
          inProgress = true;
          interval = setInterval(eventLoop,100);
        }
      })
    }
  }

  game.onUpArrow(function(){
    if(inProgress === true)
      dinosaurVelocity = 10;
  });

  var interval = setInterval(eventLoop,100);

});
