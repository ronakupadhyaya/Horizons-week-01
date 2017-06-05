"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var obstacleY = 100;
  var p1X = 200;
  var p1Y = 100;
  var p2X = 400;
  var p2Y = 200;
  var p1XVel = 0;
  var p1YVel = 0;
  var p2XVel = 0;
  var p2YVel = 0;
  var score = 0;
  var interval;
  var previousCounter = 0;
  var counter = 0;

  function eventLoop() {
    score++;
    obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    game.clear();
    p1Y = p1Y - p1YVel;
    p1X = p1X - p1XVel;
    p2Y = p2Y - p2YVel;
    p2X = p2X - p2XVel;
    game.drawP1(p1X, p1Y);
    game.drawP2(p2X, p2Y);
    //game.drawDinosaur(dinosaurX + 10, dinosaurY + 10);
    game.drawObstacle(obstacleX, obstacleY);
    //game.drawObstacle(obstacleX + 25, obstacleY + 25);
    //game.drawMessage("Your actions per minute are: " + previousCounter);
    if (obstacleX === 0) {
      obstacleX = game.width;
    }

    if (dinosaurX < obstacleX + game.obstacleWidth &&
      dinosaurX + game.dinosaurHeight > obstacleX &&
      dinosaurY < obstacleY + game.obstacleHeight + 100 &&
      game.dinosaurWidth + dinosaurY > obstacleY){
      console.log("hello");
    }

    //console.log(dinosaurX)
    //console.log(obstacleX)
    // if ((dinosaurX < obstacleX && dinosaurX + game.dinosaurWidth > obstacleX) ||
    //     (dinosaurX < obstacleX + game.obstacleWidth && dinosaurX + game.dinosaurWidth > obstacleX)) {
    //   console.log("hello");
    // }
  }

  // function apm() {
  //   previousCounter = counter * 30;
  //   counter = 0;
  // }
  interval = setInterval(eventLoop, 1e2);

  //var apmTab = setInterval(apm, 2000);


  game.onW(function() {
    p1YVel = 20;
  });

  game.onS(function() {
    p1YVel = -20;
  });

  game.onA(function() {
    p1XVel = 20;
  });

  game.onD(function() {
    p1XVel = -20;
  });

  game.onUp(function() {
    p2YVel = 20;
  });

  game.onDown(function() {
    p2YVel = -20;
  });

  game.onLeft(function() {
    p2XVel = 20;
  });

  game.onRight(function() {
    p2XVel = -20;
  });

///
  game.upW(function() {
    p1YVel = 0;
  });

  game.upS(function() {
    p1YVel = 0;
  });

  game.upA(function() {
    p1XVel = 0;
  });

  game.upD(function() {
    p1XVel = 0;
  });

  game.upUp(function() {
    p2YVel = 0;
  });

  game.upDown(function() {
    p2YVel = 0;
  });

  game.upLeft(function() {
    p2XVel = 0;
  });

  game.upRight(function() {
    p2XVel = 0;
  });

});
