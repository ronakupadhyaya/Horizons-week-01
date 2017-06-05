"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var obstacleXPos=450;
  var obstacleYPos=200
  var dinosaurY=200;
  var dinosaurX=100;
  var dinosaurVelocity=0;
  var score=0;
  var collided=false;
  var highscore=0;
  function eventLoop(){
    obstacleXPos-=10;
    dinosaurY = dinosaurY - dinosaurVelocity;

    if (obstacleXPos===0){
      obstacleXPos=game.width
    }
    if (dinosaurY<100) {
      dinosaurVelocity=-10

    }
    if (dinosaurY>200) {
      dinosaurVelocity=0
      dinosaurY=200

    }


    game.clear();
    game.drawObstacle(obstacleXPos, obstacleYPos);
    game.drawDinosaur(dinosaurX, dinosaurY)
    score+=1
    if(score>highscore){
      highscore=score;
      game.saveHighScore(highscore)

    }
    game.drawHighScore(highscore)
    game.drawScore(score)
    if (dinosaurY===obstacleYPos && dinosaurX===obstacleXPos) {

      collided=true;
      clearInterval(interval)
      game.drawMessage('You loose:( Press Up to restart')

    }


  }
  game.onUpArrow(function() {
    if(collided){
      obstacleXPos=450;
      obstacleYPos=200
      dinosaurY=200;
      dinosaurX=100;
      dinosaurVelocity=0;
      score=0;
      interval=setInterval(eventLoop,100);
      collided=false

    }else{
      dinosaurVelocity = 10;
    }

  });

  var interval=setInterval(eventLoop,100);


});
