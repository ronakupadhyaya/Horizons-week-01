"use strict";
/*global game*/


// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var restarted = false;
  var high_score = 0;

  //dinosaurx = 100

  function eventLoop(){
    obstacleX = obstacleX - 10;
    if(obstacleX < 0){
      obstacleX = game.width
    }
    game.clear();
    game.drawObstacle(obstacleX, 200);

    game.drawDinosaur(100, dinosaurY);

    dinosaurY -= dinosaurVelocity;
    if(dinosaurY < 100){
      dinosaurVelocity = -10;
    }
    if(dinosaurY > 200){
      dinosaurVelocity = 0;
      dinosaurY = 200;
    }

    if(dinosaurY < 200){
      dinosaurVelocity --
    }

    //if(obstacleX === 100 && 200 === dinosaurY){
    //Game.dinosaurWidth=25
    //Game.obstacleHeight=20

    console.log(game.dinosaurWidth)
    console.log(obstacleX);

    console.log('')
    console.log(dinosaurY)
    console.log(game.obstacleHeight)
//     25
// dinosaur.js:42 440
//
// dinosaur.js:45 200
// dinosaur.js:46 20

    // debugger
    if(obstacleX === 100 && 200 === dinosaurY){
      game.drawMessage('You lose :(');
      clearInterval(interval);
      restarted  = true;  

    // if(   (obstacleX <= 100 + game.dinosaurWidth && dinosaurY >= 200 - game.obstacleHeight)) {
    //   game.drawMessage('You lose :(');
    //   clearInterval(interval);
    //   restarted  = true;
    //   return;
    // } else if ( (100 + game.dinosaurWidth >= obstacleX || 100 <= obstacleX + game.obstacleWidth)  &&
    //       200 - game.obstacleHeight <= dinosaurY  )  {
    //         console.log('lose')
    //   game.drawMessage('You lose :(');
    //   clearInterval(interval);
    //   restarted  = true;
    //   return;

    } else {
      score++;
    }
    game.drawScore(score)

    if(score > high_score){
      high_score = score;
      game.saveHighScore(high_score);
    }
    game.drawHighScore(high_score);

  }


  high_score = game.getHighScore();




  var interval = setInterval(eventLoop, 100);
  game.onUpArrow(function(){
    if(!restarted){
      dinosaurVelocity = 10;
    } else {
      restarted = false;
      obstacleX = 450;
      dinosaurY = 200;
      dinosaurVelocity = 0;
      score = 0;
      interval = setInterval(eventLoop, 100);
    }
  });

});
