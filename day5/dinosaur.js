"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var start = null;

  var dinosaurY = 200;
  var dinosaurVelocity = 0;

  var newX = 450;

  var score = 0;
  var highScore = game.getHighScore();

  var ended = false;

  var doubleJump = true;

  game.onUpArrow(function() {
    if (ended) {
      score = 0;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      newX = 450;
      ended = false;
      window.requestAnimationFrame(eventLoop);
    } else if (dinosaurY !== 200 && doubleJump) {
      doubleJump = false;
      dinosaurVelocity = 12;
    } else if (dinosaurY === 200) {
      dinosaurVelocity = 12;
      doubleJump = true;
    }
  });

  function eventLoop(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    score++;
    if (newX <= 0) {
      newX = game.width;
    }
    newX -= 10 + score / 60;
    game.clear();
    game.drawObstacle(newX, 200);
    if (score > highScore) {
      highScore = score;
      game.saveHighScore(highScore);
    }
    game.drawScore(score);
    game.drawHighScore(highScore);

    dinosaurY -= dinosaurVelocity;

    if (dinosaurY < 200)
      dinosaurVelocity -= 1.2;
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
    game.drawDinosaur(100, dinosaurY);
    if (100 < newX + game.obstacleWidth &&
      100 + game.dinosaurWidth > newX &&
      dinosaurY - game.dinosaurHeight + 3 < 200 &&
      dinosaurY + 3 > 200 - game.obstacleHeight) {
      game.drawMessage('You lose!');
      ended = true;
      return;
    }
    window.requestAnimationFrame(eventLoop);
  }
  window.requestAnimationFrame(eventLoop);
});
