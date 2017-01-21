"use strict";

// Wait till the game is ready to run.
var dinosaurVelocity = 0;
var ended = false;
var gameFunc = function() {

  var obstacleX = 450;
  var dinosaurY = 200;
  var score =0;
  var highScore = game.getHighScore();
  function eventLoop() {

    dinosaurY = dinosaurY - dinosaurVelocity;
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    // console.log(obstacleX)
    // debugger;

    game.clear();

    if(obstacleX===100 && dinosaurY === 200) {
      console.log("you lode");
      clearInterval(intID);
      game.drawMessage('You lose :(')
      if (score > highScore)highScore= game.saveHighScore(score);
      ended = true;
      // game.onUpArrow(function(){
      //   (eventLoop();
      // })

    }

    game.drawHighScore(game.getHighScore());
    score++;
    game.drawScore(score);
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacleX, 200);
    if(dinosaurY<100) dinosaurVelocity= -10;
    if(dinosaurY>200) {
      dinosaurVelocity= 0;
      dinosaurY = 200;

    }
    if(obstacleX===0) obstacleX= game.width
  }
  var intID =  setInterval (eventLoop,100);
  game.onUpArrow(function() {
    dinosaurVelocity = 10;
    if (ended){
      obstacleX = 450;
      dinosaurY = 200;
      score =0;
      ended = false;
      intID = setInterval(eventLoop, 100)
    }
  });
}

game.onReady(gameFunc);
