"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var obstacleX = 450;
  var obstacleY = game.height*.8;
  var dinosaurY = 200;
  var dinosaurX = 100;
  var dinosaurVelocity = 0;
  var lastTimestamp = 0;
  var score = 0;
  var lost = false;
  var highScore = game.getHighScore();
  var interval = setInterval(eventLoop, 100);
  var gid = requestAnimationFrame(step);
  var framRate = 0;
  function step(timestamp) {
    if (lastTimestamp == 0) {
      lastTimestamp = timestamp;
    }
  }
  function eventLoop() {
    //frameRate = 0;
    if (dinosaurX < obstacleX + game.obstacleWidth &&
   dinosaurX + game.dinosaurHeight > obstacleX &&
   dinosaurY < obstacleY + game.obstacleHeight &&
   game.dinosaurWidth + dinosaurY > obstacleY){
    // if (obstacleX === dinosaurX && dinosaurY === obstacleY){
    //   console.log('lose');
      game.drawMessage('You lose :(. Press Up to Restart');
      lost = true;
      clearInterval(interval);
      return;
    }
    if (obstacleX === 0){
      obstacleX = game.width;
    }else{
      obstacleX = obstacleX - 10; // move obstacle 10 pixels leftmost
    }
    if (dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if (dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }else{
      dinosaurY = dinosaurY - dinosaurVelocity;
    }
    if (dinosaurY<200){
      dinosaurVelocity--;
    }
    if (score > highScore){
      highScore = score;
      game.saveHighScore(highScore);
    }
    score++;
    game.clear();
    game.drawDinosaur(dinosaurX, dinosaurY)
    game.drawObstacle(obstacleX, obstacleY);
    game.drawScore(score);
    game.drawHighScore(highScore);
    //window.requestAnimationFrame(eventLoop);
    game.onUpArrow(function() {
      if (!lost){
        dinosaurVelocity = 10
      }else{
        score = 0;
        dinosaurVelocity = 0;
        obstacleX = 450;
        dinosaurY = 200;
        lost = false;
        interval = setInterval(eventLoop, 100);
        //window.requestAnimationFrame(eventLoop);
      }

    });
  }
  //window.requestAnimationFrame(eventLoop);
});
