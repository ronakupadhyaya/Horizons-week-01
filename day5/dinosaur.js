"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // GLOBAL VARIABLES
  var groundY = 200;
  var obstacleY = groundY;
  var obstaclesX = game.width;
  var dinosaurX = 100;
  var dinosaurY = groundY;
  var dinosaurVelocity = 0;
  var score = 0;
  var highScore = game.getHighScore();
  var counter = 0;
  var gameOver = false;
  var obstacles = [];

  // HOMEMADE FUNCTIONS
  function incrementCounter(){
    if(counter % 10 === 0){
      score++;
    }
    counter++;
  }


  var obs1 = new game.Obstacle(obstaclesX, obstacleY, 40, 20);
  obstacles.push(obs1);

  game.clear();
  game.drawObstacle(obstacles[0]);

  function eventLoop(){

    incrementCounter();
    if(hasCollision()){
      game.drawMessage('You lose :(');
      clearInterval(interval);
      gameOver = true;
    }

    game.onUpArrow(function() {
      if(!(dinosaurY < 200)){
        dinosaurVelocity = 1;
        if(gameOver){
          obstacles[0].x = game.width;
          dinosaurX = 100;
          dinosaurY = groundY;
          dinosaurVelocity = 0;
          score = 0;
          counter = 0;
          interval = setInterval(eventLoop, 10);
          gameOver = false;
        }
      }
    });
  }

  var interval = setInterval(eventLoop, 10);

});
