"use strict";

// Wait till the game is ready to run.
var dinosaurVelocity = 0;
var gameOn = false;
var inter;

game.onReady(function gameRun() {
  var rect1 = {x: 100, y: 200, width: 25, height: 50}
  var rect2 = {x: 450, y: 200, width: 40, height: 25}
  var obstacleX = 450;
  var score = 0;
  gameOn = true;
  var highScore = game.getHighScore();
  function eventLoop() {
    rect2.x = rect2.x - 10; // move obstacle 10 pixels leftmost
    if (rect2.x <= 0) {
      rect2.x = 450;
    }
    rect1.y = rect1.y - dinosaurVelocity;
    if (rect1.y <= 100) {
      dinosaurVelocity = -10;
    } else if (rect1.y > 200) {
      dinosaurVelocity = 0;
      rect1.y = 200;
    }
    game.clear()// clear screen
    if (rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y) {
      gameOn = false;
      if (score > highScore) {
        game.saveHighScore(score);
      }
      clearInterval(inter);
      console.log("here");
      game.drawMessage('Yo mama so dum');
      score = 0;
    }
    // if (obstacleX === 100 && 200 === dinosaurY) {
    // }
    score++;
    game.drawScore(score);
    game.drawDinosaur(100, rect1.y);
    game.drawHighScore(highScore);
    game.drawObstacle(rect2.x, 200)// draw obstacle again
  }
  game.onUpArrow(function() {
    if (!gameOn) {
      gameOn = true;
      rect1.y = 200;
      rect2.x = 450;
      inter = setInterval(eventLoop, 100);
    } else if (rect1.y >= 200) {
      dinosaurVelocity = 10;
    }
  });
  inter = setInterval(eventLoop, 100);
});
