"use strict";
/*global game*/
// Wait till the game is ready to run.
game.onReady(function() {
	var obstacleX = game.width;
	var dinosaurY = 200;
	var dinosaurVelocity = 0;
	var score = 0;
	var hasLost = false;
	var highScore = game.getHighScore();
	// dinosaurY = 200 & obstacleX = 100	
	function eventLoop(){
		// check for collision
		if(dinosaurY == 200 && obstacleX == 100){
			game.drawMessage('You lose :( Press up to restart');
			clearInterval(id);
			hasLost = true;
			return;
		}
		// clear last position
		game.clear()
		// increment score		
		score += 1;
		// save highscore
		if(score > highScore){
			highScore = score;
			game.saveHighScore(highScore);
		}
		// reset obstacle
		if(obstacleX <= 0){
			obstacleX = game.width;
		}
		// "gravity"
		if(dinosaurY < 100){
			dinosaurVelocity = -10;
		}
		// bring dinosaur to the ground
		if(dinosaurY > 200){
			dinosaurVelocity = 0;
			dinosaurY = 200;
		}
		obstacleX -= 10;
		dinosaurY -= dinosaurVelocity;		
		// draw stuff
		game.drawHighScore(highScore);
		game.drawScore(score);
		game.drawDinosaur(100, dinosaurY);
		game.drawObstacle(obstacleX, 200);
	}

	game.onUpArrow(function() {
		if(hasLost){
			obstacleX = game.width;
			dinosaurY = 200;
			dinosaurVelocity = 0;
			score = 0;
			hasLost = false;
			id = setInterval(eventLoop, 100);
		}else{
			dinosaurVelocity = 10;
		}
	});

	var id = setInterval(eventLoop, 100);
});
