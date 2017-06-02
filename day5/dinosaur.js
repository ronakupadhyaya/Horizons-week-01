"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  var hasLost = false;
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var highScore = game.getHighScore();
  var hasJumped = 0;

  var rect1 = {x: 5, y: 5, width: 25, height: 50}
  var rect2 = {x: 20, y: 10, width: 27, height: 20}
  game.onUpArrow(function() {
  	if (hasLost) {
  		hasLost = false;
  		dinosaurVelocity = 0;
  		obstacleX = game.width;
  		interval = setInterval(eventLoop, 20);
  		score = 0;
  	} else {
  		if (hasJumped < 2) {
  			dinosaurVelocity = 5;
  		}
  		hasJumped++;
  	}
  });
  var score = 0;
  function eventLoop() {
  	score++;
  	if (score > highScore) {
  		highScore = score;
  		game.saveHighScore(highScore);
  	}
    obstacleX = obstacleX - (2 + score * 0.005); // move obstacle 10 pixels leftmost
    dinosaurY = dinosaurY - dinosaurVelocity;
    game.clear();
    if (obstacleX <= 0) {
    	obstacleX = game.width;
    }
    if (dinosaurY < 200) {
    	dinosaurVelocity = dinosaurVelocity - .15;
    }
    if (dinosaurY > 200) {
    	dinosaurVelocity = 0;
    	dinosaurY = 200;
    	hasJumped = 0;
    }
    game.drawDinosaur(100, dinosaurY);
    game.drawObstacle(obstacleX, 200);
    game.drawScore(score); 
    game.drawHighScore(highScore);

    rect2.x = 100;
    rect2.y = dinosaurY;
    rect1.x = obstacleX;
    rect1.y = 200;

    if (rect1.x < rect2.x + rect2.width &&
   		rect1.x + rect1.width > rect2.x &&
   		rect1.y < rect2.y + rect2.height &&
   		rect1.height + rect1.y > rect2.y) {
    	game.drawMessage('You lose :( Press up to restart!');
  		hasLost = true;
  		clearInterval(interval);
    }
  }
  var interval = setInterval(eventLoop, 20);
});




