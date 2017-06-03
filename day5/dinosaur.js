"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var self = this;
  game.clear();
  //initial values
  var obsX = 450;
  var obsY = 200;
  var obsVel = 7

  var dinoX = 100;
  var dinoY = 200;
  var dinoVel = 0;
  var dinoGoingUP = false;
  var sec = 0;
  var initialVel = 20;

  var score = 0;
  var gameLost = false;
  var hiScore = game.getHighScore();
  //draw game
  game.drawObstacle(obsX, obsY);

  //events occur
  function eventLoop() {
    game.clear();
    score = score+1;
    if (score > hiScore) {
      hiScore = score;
      game.saveHighScore(score);
    }
    sec += .015;
    if (score % 50 === 0) {
      obsVel += 2;
    }
    //change obstacle position
    obsX = obsX-obsVel;
    if (obsX<=0-game.obstacleWidth)
      obsX = game.width;
    //adjust dino values
    dinoY = dinoY - dinoVel;
    //action
    game.onUpArrow(function () {
      if (!gameLost) {
        if (dinoY === 200) {
          dinoVel = initialVel;
          dinoGoingUP = true;
          sec = 0;
        }
      } else {
        newGame();
        gameLost = false;
      }
    });
    //check dino values
    if (dinoY <= 100) {
      dinoVel = -10;
      dinoGoingUP = false;
      sec = 0;
    } else if (dinoY < 200 && dinoGoingUP) {
      dinoVel = 10 - 9.8*sec;
    } else if (dinoY < 200 && !dinoGoingUP) {
      dinoVel = -10 - 9.8*sec;
    } else   {
      dinoVel = 0;
      dinoY = 200;
    }
    //draw obs & dino
    game.drawScore(score);
    game.drawHighScore(hiScore);
    game.drawObstacle(obsX, obsY);
    game.drawDinosaur(dinoX, dinoY);
    //check for collision
    var dinoWithinObsX = obsX <= dinoX+game.dinosaurWidth && obsX+game.obstacleWidth > dinoX;
    var dinoWithinObsY = dinoY+game.dinosaurHeight > obsY+game.obstacleHeight;
    if (dinoWithinObsX && dinoWithinObsY) {

      game.drawMessage("You win :)");
      game.drawMessage2("Press up to restart");
      clearInterval(interval);
      gameLost = true;
    }

  }
  //start initial game
  var interval = setInterval(eventLoop, 50);
  //start new game
  function newGame () {
    obsX = 450;
    obsY = 200;
    obsVel = 7

    dinoX = 100;
    dinoY = 200;
    dinoVel = 0;

    score = 0;
    interval = setInterval(eventLoop, 50);
  }

});
