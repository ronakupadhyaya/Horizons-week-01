"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {

  var obstacleX = 450;
  var obstacleY = 200;
  var dinosaurX = 100;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = game.getHighScore();

  game.onUpArrow(function() {
    //press up to restart
    if (obstacleX < dinosaurX + 25 &&
        obstacleX + 40 > dinosaurX &&
        obstacleY < dinosaurY + 20 &&
        20 + obstacleY > dinosaurY){
      dinosaurVelocity = 0;
      interval = setInterval(eventLoop, 100)
      score = 0;
      dinosaurX = 100;
      dinosaurY = 200;
      obstacleX = 450;
      obstacleY = 200;
    }else{
      dinosaurVelocity = 10;
    }
  });


  function eventLoop() {
    game.clear();
    //obstacle
    if (obstacleX === 0){
      obstacleX = game.width;
    }
    else {
      obstacleX = obstacleX - 10;
    }

    //dinosaur
    if (dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if (dinosaurY < 200){
      dinosaurVelocity = dinosaurVelocity - 1;
    }
    else if (dinosaurY >200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    dinosaurY = dinosaurY - dinosaurVelocity;

    //game.clear();
    game.drawObstacle(obstacleX, obstacleY);
    game.drawDinosaur(dinosaurX, dinosaurY);

    //you loose
    if (obstacleX < dinosaurX + 25 &&
        obstacleX + 40 > dinosaurX &&
        obstacleY < dinosaurY + 20 &&
        20 + obstacleY > dinosaurY){
      game.drawMessage('You loose :(')
      clearInterval(interval);

    }

    //keeping score
    score = score + 1;
    game.drawScore(score);

    //get highscore
    if (score > highScore){
      highScore = score;
      game.saveHighScore(score);
    }

    game.drawHighScore(highScore);
  //end of eventLoop
  }

  var interval = setInterval(eventLoop, 100);

});
