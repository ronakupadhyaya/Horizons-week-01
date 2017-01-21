"use strict";


// Wait till the game is ready to run.
game.onReady(function() {
  var highScore = game.getHighScore();
  var obstacleX = game.width;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var intervalId = setInterval(eventLoop, 100);

  game.onUpArrow(function() {
    if (obstacleX === 100 && dinosaurY === 200) {
      obstacleX = game.width;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      score = 0;
      intervalId = setInterval(eventLoop, 100);
    } else {
      dinosaurVelocity = 10;
    }
  });



  function eventLoop() {
    score++;
    if (score > highScore) {
      highScore = score;
      game.saveHighScore(highScore);
    }

    obstacleX = obstacleX - 10;
    if (obstacleX === 0) {
      obstacleX = game.width;
    }
    dinosaurY -= dinosaurVelocity;
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    } else if (dinosaurY >200) {
      dinosaurY = 200;
      dinosaurVelocity = 0;
    }

    game.clear()
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);
    game.drawScore(score);
    game.drawHighScore(highScore);

    if (obstacleX === 100 && dinosaurY === 200) {
      console.log("over");
      game.drawMessage("You lose :(");
      clearInterval(intervalId);
    }
  }
});
