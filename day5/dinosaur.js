"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  // debugger;
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var interval = setInterval(eventLoop, 100);
  var score = 0;
  var calledArrow = false
  var highScore = game.getHighScore();
  // console.log(highScore);

  game.onUpArrow(function(){
    if (calledArrow === true) {
      score = 0;
      obstacleX = 450;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      interval = setInterval(eventLoop, 100);
      calledArrow = false;
    } else {
      dinosaurVelocity = 10;
    }
  })
  // /var interval =  setInterval(eventLoop, 100);

  function eventLoop() {
    obstacleX = obstacleX - 10; // move obstacle 10 pixels to the left
    dinosaurY = dinosaurY - dinosaurVelocity; //position - velocity
    game.clear();
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);


    if (obstacleX === 0) {
      obstacleX = game.width;
    }
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    if (obstacleX === 100 && dinosaurY === 200) {
      game.drawMessage(" You lose :( ");
      clearInterval(interval);
      calledArrow = true;

      }
      if (score > highScore) {
        game.saveHighScore(score);
        highScore = game.getHighScore() - 1;
      }
      game.drawHighScore(highScore);

    }
    game.drawScore(score++);
    // console.log(highScore);


  });
