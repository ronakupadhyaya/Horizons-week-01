"use strict";
/*global game*/

// Wait till the game is ready to run.

game.onReady(function Start() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.

  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var interval = setInterval(eventLoop, 100);
  var score = 0;
  var gameOver;
  var highScore = game.getHighScore();

  function eventLoop(){

    var obstacleRect = {x: obstacleX, y: 200, width: game.obstacleWidth, height: game.obstacleHeight}
  	     // console.log(obstacleRect);
  	var dinosaurRect = {x: 100, y: dinosaurY, width: game.dinosaurWidth, height: game.dinosaurHeight}
  	     // console.log(dinosaurRect);

  	game.clear();
  	game.drawDinosaur(100, dinosaurY);
  	dinosaurY = dinosaurY - dinosaurVelocity;
  	obstacleX = obstacleX - 10;// move obstacle 10 pixels leftmost
    // clear screen
    // draw obstacle again
    score ++;
    game.drawScore(score);
    game.onUpArrow(function() {
 		if(gameOver === true){
	 		dinosaurVelocity = 0;
 			score = 0;
 			obstacleX = 450;
 			dinosaurY = 200;
  			gameOver = false;
  			game.onReady(Start());
 		}
 		else{
 			if(dinosaurVelocity === 0){
 				dinosaurVelocity = 10;

 			}
 		}
 		}
	);
	if (dinosaurY<100){
		dinosaurVelocity = -10;
	}
	if (dinosaurY > 200){
		dinosaurVelocity = 0;
		dinosaurY = 200;
	}

    game.drawObstacle(obstacleX, 200)
    if (obstacleX === 0){
    	obstacleX = game.width;
	}
	// if(dinosaurY === 200 && obstacleX === 100
	// 	){

	// 	game.drawMessage('You lost:( Press up to restart');
	// 	gameOver = true;
	// 	clearInterval(interval);
	// }

	if (obstacleRect.x < dinosaurRect.x + dinosaurRect.width &&
   obstacleRect.x + obstacleRect.width > dinosaurRect.x &&
   obstacleRect.y < dinosaurRect.y + dinosaurRect.height &&
   obstacleRect.height + obstacleRect.y > dinosaurRect.y) {
    // collision detected!
		game.drawMessage('You lost:( Press up to restart');
		gameOver = true;
		clearInterval(interval);

}
	if (score > highScore){
		highScore = score;
		game.saveHighScore(highScore);
	}
	game.drawHighScore(highScore);

  }


});
