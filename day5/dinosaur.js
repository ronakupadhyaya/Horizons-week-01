"use strict";
/*global game*/

// Wait till the game is ready to run

game.onReady(function() {

  var newFun = function(){
    var running = true;
    var obstacleX = 450;
    var dinosaurY = 200;
    var dinosaurVelocity = 0;
    var score = 0;
    var highscore = game.getHighScore();




    function eventLoop(){
      if (obstacleX === 0){
        obstacleX = game.width;
      } else {
        obstacleX = obstacleX - 10;
      }
      if (dinosaurY < 100){
        dinosaurVelocity = -10;
      } else if (dinosaurY > 200){
        dinosaurVelocity = 0;
        dinosaurY = 200;
      }
      score++;

      if (score > highscore){
        highscore = score;
        game.saveHighScore(highscore);
      }
      var r1 = {x : 100, y : dinosaurY, w : game.dinosaurWidth, h : game.dinosaurHeight};
      var r2 = {x : obstacleX, y : 200, w : game.obstacleWidth, h : game.obstacleHeight};

      game.clear();
      game.drawObstacle(obstacleX, 200);
      game.drawDinosaur(100, dinosaurY);
      if (r1.x < r2.x + r2.w && r2.x < r1.x + r1.w && r1.y > r2.y - r2.h &&  r2.y > r1.h - r1.y){
        game.drawMessage('You lose :( Press Up to Restart');
        clearInterval(int);
        running = false;
        game.onUpArrow(function(){
          if (! running){
            newFun();
          }
          running = true;
        });
      };
      dinosaurY = dinosaurY - dinosaurVelocity;
      game.onUpArrow(function() {
        dinosaurVelocity = 10;
      });
      game.drawScore(score);
      game.drawHighScore(highscore);


    }
    var int = setInterval(eventLoop, 100);
  }

  newFun();


});
