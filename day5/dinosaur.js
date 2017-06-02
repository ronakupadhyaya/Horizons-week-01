"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.

  game.clear();
  //obstacle variables
  game.drawObstacle(450, 200);
  var obstacleX = 450;

  //set interval
  var interval = setInterval(eventLoop, 100);

  //dinosaur variables
  var dinosaurY = 200;
  var dinosaurVelocity = 0;

  //score
  var score = 0;
  var highScore = game.getHighScore();

  //end
  var end;

  function eventLoop() {
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    game.clear();
    game.drawScore(score);
    score++;

    game.drawHighScore(highScore);
    if (score > highScore) {
      highScore = score;
      game.saveHighScore();
    }


    game.drawObstacle(obstacleX, 200);
    if (obstacleX === 0)
      obstacleX = game.width;

    dinosaurY = dinosaurY - dinosaurVelocity;
    game.drawDinosaur(100, dinosaurY);

    if (dinosaurY < 100)
      dinosaurVelocity = -10;
    //if (dinosaurY < 200)
    //dinosaurVelocity -= 10;
    if (dinosaurY > 200) {
      dinosaurY = 200;
      dinosaurVelocity = 0;
    }

    if (dinosaurY === 200 && obstacleX === 100) {
      game.drawMessage('You lose :( press \'up\' arrow to restart');
      clearInterval(interval);
      end = true;
    }
  }

  game.onUpArrow(function() {
    dinosaurVelocity = 10;
    if (end) {
      score = 0;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      obstacleX = 450;
      end = false;
      interval = setInterval(eventLoop, 100);
    }
  });







});
