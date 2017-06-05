"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.

  //
  game.clear();
  var obstacleX = 450;
  var dinosaurY = 200;
  var dino = {x:100, y:200, width:game.dinosaurWidth, height:game.dinosaurHeight };
  var obs = {x:450, y:200, width:game.obstacleWidth, height:game.obstacleHeight };
  var dinosaurVelocity = 0;
  var score = 0;
  var gameOver = false;
  var interval = setInterval(eventLoop, 100);
  var highScore = game.getHighScore();

  game.drawObstacle(450, 200);
  game.onUpArrow(function() {
    dinosaurVelocity = 10;
    if(gameOver){
      score = 0;
      dino.y = 200;//dinosaurY;
      obs.x = 450;//obstacleX;
      interval = setInterval(eventLoop,100);
    }
  });

  function eventLoop(){
    game.clear();
    gameOver = false;
    score+=1;

    game.drawScore(score);
    //game.drawHighScore(highScore);
    game.drawDinosaur(100,dino.y);//dinosaurY);
    if(score>highScore){
      highScore = score;
      game.saveHighScore(score);
    }
    game.drawHighScore(highScore);

    if(((obs.x <= dino.x+dino.width && obs.x>= dino.x) || (obs.x<=dino.x && obs.x+obs.width >= dino.x))  &&
     (dino.y >= obs.y - obs.height && dino.y - dino.height <= obs.y)){
      gameOver = true;
      game.drawMessage('you lose press up to restart');
      clearInterval(interval);
    }

    if(obs.x === 0){
      obs.x = game.width;
    }else{
      obs.x -= 10;// obstacleX;
    }
    game.drawObstacle(obs.x,200);//game.drawObstacle(obstacleX, 200);

    dino.y -= dinosaurVelocity//dinosaurY;
    // if(dino.y <100){
    //   dinosaurVelocity -= 10;
    // }
    if(dino.y < 200){
      dinosaurVelocity-=10;
    } else if(dino.y>200){
      dinosaurVelocity = 0;
      dino.y = 200;//dinosaurY;
    }
  }




  //
});
