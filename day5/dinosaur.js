"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.

  var score = 0;
  var highScore = game.getHighScore();
  var lost = false;

  var obstacleX = 450;
  var dinosaurY = 200;

  var dinosaurVelocity = 0;
  var obstacleVelocity = 0;
  requestAnimationFrame(eventLoop);
  function eventLoop() {
  	if (score > highScore) {
  		highScore = score;
  		game.saveHighScore();
  	}


  	score++;
  	if (obstacleVelocity < 900) {
      obstacleX -= 1 + 2 * Math.sqrt(Math.sqrt(obstacleVelocity));
    } else {
      obstacleVelocity = 0;
    }
  	dinosaurY -= dinosaurVelocity;
  	obstacleVelocity++;

  	game.onUpArrow(function() {
  		
  		if (lost) {
  			score = 0;
  			lost = false;
  			obstacleX = 450;
  			dinosaurY = 200;
  			obstacleVelocity = 0;
  			dinosaurVelocity = 0;
  			requestAnimationFrame(eventLoop);

  		} else if (dinosaurVelocity === 0) {
  				dinosaurVelocity = 10;
  		}
	});


	

	if (dinosaurY < 100) {
		dinosaurVelocity -=  Math.sqrt(dinosaurY);
	} else if (dinosaurY < 200) {
		dinosaurVelocity -=  0.05 * Math.sqrt(dinosaurY);
	}
	if (dinosaurY > 200) {
		dinosaurVelocity = 0;
		dinosaurY = 200;
	}

	if (obstacleX < 0) {obstacleX = game.width;}
  if (checkCollision(100, dinosaurY, obstacleX, 200)) {
    game.drawMessage('You lose :(');
    lost = true;
    return;
  } else {
    draw();
  }

	function draw() {
		requestAnimationFrame(eventLoop);
		game.clear();
		game.drawDinosaur(100, dinosaurY);
		game.drawObstacle(obstacleX, 200);
		game.drawScore(score);
		game.drawHighScore(highScore);
	}



  }
});

// could be a lot better
function checkCollision(dinosaurX, dinosaurY, obstacleX, obstacleY) {

	return dinosaurX < obstacleX + game.obstacleWidth &&
   dinosaurX + game.dinosaurWidth > obstacleX &&
   dinosaurY > obstacleY - game.obstacleHeight &&
   dinosaurY - game.dinosaurHeight < obstacleY;
    

}


