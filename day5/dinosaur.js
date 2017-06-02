"use strict";

game.onReady(function() {
  var obstacleX = game.width;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var velocity = 2;
  var score = 0;
  var speed = 2;
  var interval;
  var highscore = game.getHighScore();
  var up = game.onUpArrow(function() {
    if(100 <= obstacleX + 40 &&
        125 >= obstacleX &&
        dinosaurY <= 220 &&
        50 + dinosaurY >= 180){
      obstacleX = game.width;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      score = 0;
      velocity = 2;
      speed = 2;
      interval = setInterval(eventLoop, 20);
    } else if(dinosaurY === 200){
      dinosaurVelocity = velocity;
    }
  });

  function eventLoop() {
    obstacleX = obstacleX - speed;
    dinosaurY = dinosaurY - dinosaurVelocity;
    up;
    if(obstacleX < 0){
      game.clear();
      obstacleX = game.width;
    }
    if(dinosaurY < 100){
      dinosaurVelocity = -velocity;
    }
    if(dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    score++;
    if(score > 250){
      velocity = 3+parseInt(score/250);
      speed = 3+parseInt(score/250);
    }

    game.clear();
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);
    game.drawScore(score);
    game.drawHighScore(game.getHighScore());
    if(score > highscore){
      game.saveHighScore(score);
    }
    if( 100 < obstacleX + 40 &&
      125 > obstacleX &&
      dinosaurY < 240 &&
      50 + dinosaurY > 220){
      game.drawMessage("You lose!! :(((. Up to restart!");
      clearInterval(interval);
      up;
      game.drawObstacle(obstacleX, 200);
      game.drawDinosaur(100, dinosaurY);
      game.drawScore(score);
    }
  }
  interval = setInterval(eventLoop, 20);
});
