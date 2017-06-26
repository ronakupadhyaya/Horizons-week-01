"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
var obstacleX = game.width
var dinosaurX = 100
var obstacleY = 200
var dinosaurY = 200
var dinosaurVelocity = 0
var highScore = game.getHighScore();


game.onUpArrow(function(){
  console.log("print")
if(dinosaurX === obstacleX && dinosaurY === obstacleY){
  interval = setInterval(eventLoop, 100)
console.log("hello")
dinosaurY = 200
obstacleX = game.width
score = 0
}
else{
  dinosaurVelocity = 10
}

});
var score = 0
var interval = setInterval(eventLoop, 100);

function eventLoop(){

  obstacleX = obstacleX - 10;
  dinosaurY = dinosaurY - dinosaurVelocity

  game.clear();
  game.drawObstacle(obstacleX, 200);
  game.drawDinosaur(100, dinosaurY);
  if(obstacleX === 0){
    obstacleX = game.width
  }
  if(dinosaurY > 200){
    dinosaurVelocity = 0
    dinosaurY = 200
  }
  if(dinosaurY < 100){
    dinosaurVelocity = -10
  }
  if(dinosaurX === obstacleX && dinosaurY === obstacleY){

    game.drawMessage('You lose :(')
    clearInterval(interval)
    // dinosaurY = 200
    // obstacleX = game.width
  //   if(typeof game.onUpArrow === "function"){
  //   interval = setInterval(eventLoop, 100)}
  //
  }
  game.drawScore(score)
  score += 1
  game.drawHighScore(highScore)
  if(score > highScore){
    highScore = score
    game.saveHighScore()
  }


 }





  // game.clear();
  // game.drawObstacle(450, 200);
});
