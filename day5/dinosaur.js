"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var obstacleX = 450;
  game.drawObstacle(obstacleX, 200);
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var interval = 0;

  var highScore = game.getHighScore();

  function eventLoop(){
    // set variables
    score++;
    obstacleX -= 10;
    game.clear();
    game.drawScore(score);
    game.drawHighScore(highScore);

    game.drawObstacle(obstacleX, 200);

    if(obstacleX === 0 || obstacleX < 0){
      obstacleX = game.width;
    }

    game.drawDinosaur(100, dinosaurY);

    dinosaurY = dinosaurY - dinosaurVelocity;

    if(dinosaurY < 100){
      dinosaurVelocity = -10;
    }

    if(dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }
// if(obstacleX < 100 + this.dinosaurWidth && )

if (obstacleX < 100 + this.dinosaurWidth &&
   obstacleX + this.obstacleWidth > 100 &&
   200 < dinosaurY + this.dinosaurHeight &&
   this.obstacleHeight + 200 > dinosaurY){
      console.log(interval);
      game.drawMessage('You lose :(');
      clearInterval(interval);
      if(score > highScore){
        highScore = score;
        game.saveHighScore(highScore);
      }

      };
    }

interval = setInterval(eventLoop, 100);

game.onUpArrow(function(){
  if (obstacleX < 100 + this.dinosaurWidth &&
     obstacleX + this.obstacleWidth > 100 &&
     200 < dinosaurY + this.dinosaurHeight &&
     this.obstacleHeight + 200 > dinosaurY){
    dinosaurY = 200;
    dinosaurVelocity = 0;
    score = 0;
    obstacleX = 450;
    game.drawObstacle(obstacleX, 200);
    interval = setInterval(eventLoop, 100);

}
  else{
  dinosaurVelocity = 10;
}

});



});
