"use strict";
/*global game*/

// Wait till the game is ready to run.

game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  // setInterval(eventLoop, 100);
  var interval = setInterval(eventLoop, Math.random(100));
  var obstacleX = 450;
  var dinosaurY = 200
  var dinosaurVelocity = 0
  var score = 0
  var highScore = game.getHighScore()
  var gameOver = false
  game.onUpArrow(function() {
  		dinosaurVelocity = 10;
  		if (gameOver == true) {
  			gameOver = false
  			obstacleX = 450;
  			dinosaurY = 200
  			dinosaurVelocity = 0
  			score = 0
  			interval = setInterval(eventLoop, 100)
  		}
  		});
  function eventLoop() {
  	score += 1
  	
  	dinosaurY = dinosaurY - dinosaurVelocity
  	if (dinosaurY > 200) {
  		dinosaurY = 200
  		dinosaurVelocity = 0
  	}
  	if (dinosaurY < 100) {
  		dinosaurVelocity = -10
  	}
  	if (obstacleX === 0) {
  		obstacleX = game.width
  	} 
  	obstacleX = obstacleX - 10
  	game.clear()
  	game.drawObstacle(obstacleX, 200)
  	game.drawDinosaur(100, dinosaurY)
  	game.drawScore(score)
  	game.drawHighScore(highScore)
  	if (dinosaurY === 200 && obstacleX === 100) {
 		if (score > highScore) {
  			game.saveHighScore(score)
  		}
 		game.drawMessage("You lose :(")
  		clearInterval(interval)
  		gameOver = true
  }
  }
});
