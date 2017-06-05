"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.

  var obstacleY = 200;
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurX = 100;
  var dinosaurVelocity = 0;
  // var interval = setInterval(draw, 100)
  var score = 0;
  var highScore = game.getHighScore()
  var gameStatus = true;
  var rAF = window.requestAnimationFrame
  var cAF = window.cancelAnimationFrame
  var upInAir = false;
  var airTime = 0;

  function draw(){

    game.clear();


    //changing x position of obstacle

    obstacleX -= 10 + ((score*score)/1000000)

    if (obstacleX <= 0){ obstacleX = game.width }


    //redrawing obstacle
    game.drawObstacle(obstacleX, 200); //drawn every 1660ms = 16.6s
    game.drawDinosaur(100, dinosaurY);

    //crashing if statement
    if ((100 < obstacleX + 40) &&
        (100 + 25 > obstacleX) &&
        (dinosaurY < 220) &&
        (50 + dinosaurY > 225)){
        game.drawMessage('You lose :(')
        gameStatus = false;
        cAF(draw)
        return
    }

    //increment score and redraw it
    score ++
    game.drawScore(score)

    //highscor updating
    if (score > highScore){
      highScore = score
      game.saveHighScore(score);
    }


    game.drawHighScore(highScore);


      //gravity
    dinosaurY = dinosaurY - dinosaurVelocity;

    dinosaurVelocity -= 3.5

    if (dinosaurY > 200){
        dinosaurVelocity = 0;
        dinosaurY = 200;
    }
    rAF(draw);
  }

  rAF(draw);

  game.onUpArrow(function() {

    if(gameStatus && dinosaurY === 200){
      upInAir = true;
      airTime = 0;
      dinosaurVelocity = 30
    }
    else if(gameStatus && airTime === 0 && upInAir){
      airTime = 1
      dinosaurVelocity = 30
    }
    else if (!gameStatus){
      score = 0;
      obstacleX = 450;
      gameStatus = true;
      rAF(draw);
    }
  })
});
