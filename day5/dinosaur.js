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

  var eventLoop = function() {
    obstacleX = obstacleX - 10;
    game.clear();
    game.drawObstacle(obstacleX, obstacleY);
    game.drawScore(score);
    score +=1;

    if(obstacleX === 0) {
      obstacleX = 550;
      game.drawObstacle(obstacleX, obstacleY);
    }
    game.drawDinosaur(100, dinosaurY);
    dinosaurY = dinosaurY - dinosaurVelocity;

    // game.onUpArrow(function() {
    //   dinosaurVelocity = 10;
    // });

    if(dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if(dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    // Part 3 :
    // If the x and y coordinates of dinosaur and obstacle are the same,
    // then tell the player that they have lost the game --> game.drawMessage()
    if(dinosaurX===obstacleX && dinosaurY===obstacleY) {
      game.drawMessage('You lose :(');
      clearInterval(interval);
    }

    if(score > highScore) {
      highScore = score;
      game.saveHighScore();
    }
    game.drawHighScore(highScore);
  }

  var interval = window.setInterval(eventLoop, 100);

  game.onUpArrow(function() {
    if (dinosaurX===obstacleX && dinosaurY===obstacleY) {
      game.drawMessage('You lose :( Press up to restart)');
      obstacleX = 450;
      obstacleY = 200;
      dinosaurX = 100;
      dinosaurY = 200;
      score = 0;
      interval = window.setInterval(eventLoop, 100);
    } else {
      dinosaurVelocity = 10;
    }
  });
});
