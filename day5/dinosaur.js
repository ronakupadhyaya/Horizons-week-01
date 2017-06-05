"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var initialOX = 450
  var initialOY = 200

  var initialDX = 100
  var initialDY = 200

  var obstacleX = 450;
  var obstacleY = 200

  var dinosaurX = 100;
  var dinosaurY = 200;

  var dinosaurVelocity = 0;

  var rect2 = {obstacleX: 5, obstacleY: 5, width: 27, height: 20}
  var rect1 = {dinosaurX: 20, dinosaurY: 10, width: 25, height: 50}

  var score = 0;
  var isOver = false

  var highScore = game.getHighScore()

  var interval = setInterval(eventLoop, 1);

  function eventLoop() {
    game.clear();

    score++
    if(score > highScore){
      highScore = score;
      game.saveHighScore()
    }
    obstacleX = obstacleX - 1; // move obstacle 10 pixels leftmost
    if(obstacleX <= 0) obstacleX = game.width
    //if(dinosaurY <50) dinosaurVelocity = -2
    if(dinosaurY > 200){
      dinosaurVelocity = 0
      dinosaurY = 200
    }
    if (dinosaurY < 200) dinosaurVelocity = dinosaurVelocity -0.09
    dinosaurY = dinosaurY - dinosaurVelocity;

    rect1.x = obstacleX
    rect1.y = obstacleY
    rect2.x = dinosaurX
    rect2.y = dinosaurY


    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
      game.drawMessage('You lose :(')
      clearInterval(interval)
      isOver = true
    }


    game.drawHighScore(highScore)
    game.drawScore(score)
    game.drawObstacle(obstacleX, obstacleY);
    game.drawDinosaur(dinosaurX, dinosaurY)
  }


  game.onUpArrow(function(){
    if(isOver){
      isOver = false
      score = 0;
      obstacleX = initialOX;
      obstacleY = initialOY
      dinosaurY = initialDY
      dinosaurX = initialDX
      interval = setInterval(eventLoop, 1)
    }else{
      dinosaurVelocity = 5;
    }
  })
});
