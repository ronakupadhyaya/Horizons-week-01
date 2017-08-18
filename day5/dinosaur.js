"use strict";
/*global game*/

// Wait till the game is ready to run.



game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
	var obstacleX = 450
  	var dinosaurY = 200;
  	var dinosaurX = 100
	var dinosaurVelocity = 0;
	var obstacleY = 200;
	var obsVel = 10;
  
  	var interval = setInterval(eventLoop,obsVel)

  	var score = 0;
  	var isOver = false;

  	var highScore = game.getHighScore()

  	// obstacle
  	var rect1 = {x: 5, y: 5, width: 25, height: 50}
  	// dinosaur
	var rect2 = {x: 20, y: 10, width: 27, height: 20}

	  function eventLoop(){

	  	game.clear();
	  	
	  	score += 1;
	  	game.drawScore(score)
	  	game.drawHighScore(highScore)
	  	//obstacleX -= 2 ;
	  	obstacleX = obstacleX - (2 + score*0.005);

	  	if(obstacleX <= 0){
	  		obstacleX = game.width
	  	}


	  	if(dinosaurY > 200){
	  		dinosaurVelocity = 0;
	  		dinosaurY = 200;
	  	}

	  	if(dinosaurY < 200){
	  		dinosaurVelocity = dinosaurVelocity - 0.1;
	  	}

	  	dinosaurY = dinosaurY - dinosaurVelocity 

		 rect2.x = dinosaurX
		 rect2.y = dinosaurY 

		 rect1.x = obstacleX
		 rect1.y = obstacleY

	  	if (rect1.x < rect2.x + rect2.width &&
		   rect1.x + rect1.width > rect2.x &&
		   rect1.y < rect2.y + rect2.height &&
		   rect1.height + rect1.y > rect2.y) {
	  		game.drawMessage('You lose : ( Press up to restart')
	  		clearInterval(interval)
	  		isOver = true;
	  	}

	  	// if(dinosaurX === obstacleX && dinosaurY === obstacleY){
	  	// 	game.drawMessage('You lose : ( Press Up to restart')
	  	// 	clearInterval(interval)
	  	// 	isOver = true;
	  	// }

	  	game.drawObstacle(obstacleX, 200);
	  	game.drawDinosaur(100, dinosaurY)

	  	if(score > highScore){
	  		highScore = score;
	  		game.saveHighScore() = highScore;
	  	}
	  	
	
}
	game.onUpArrow(function() {
		if(isOver){
			isOver = false;
			interval = setInterval(eventLoop,obsVel)
			score = 0;
			dinosaurY = 200;
  			dinosaurX = 100;
  			obstacleX = 450;
  			obstacleY = 200;

		}
		dinosaurVelocity = 4;
	});

});

