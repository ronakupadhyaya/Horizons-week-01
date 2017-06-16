"use strict";
/*global game*/

// Wait till the game is ready to run.

game.onReady(function() {
  // var obstacleX = 450;
  // var dinosaurY = 200;
  var dino = {x: 100, y: 200, w: 25, h: 50}
  var obst = {x: 450, y: 200, w: 40, h: 20}
  var dinosaurVelocity = 0;
  var score = 0;
  var hiScore = score;
  var over = false;
  var done = false
  var loopTime = 100;
  var startLoop = 100;
  function eventLoop() {
  	game.clear()
  	game.drawScore(score)
  	game.drawHighScore(hiScore);
  	if (!over && !done) {
		obst.x = obst.x - 10;
		score = score + 1;
		if (score % 100 === 0) {
			loopTime = startLoop - (score / 100) * 10
			if (loopTime <= 0) {
			done = true;
	    	clearInterval(interval);
	    	if (score > hiScore) {
	    		hiScore = score;
	    		game.saveHighScore();
    		}
       		game.drawMessage('You won!');
		}
		}
		
		console.log(loopTime)
		dino.y = dino.y - dinosaurVelocity;

		if (obst.x === 0) {
    		obst.x = game.width
    	}
    	if (dino.y < 100) {
    		dinosaurVelocity = -10
    	}
    	if (dino.y < 200) {
    		dinosaurVelocity = dinosaurVelocity - 1
    	}
	    else if (dino.y > 200) {
	    	dinosaurVelocity = 0;
	    	dino.y = 200;
	    }

		var x = (dino.x > obst.x && dino.x < (obst.x + obst.w) ||
			(dino.x + dino.w) > obst.x && (dino.x + dino.w) < (obst.x + obst.w));
		var y = dino.y <= obst.y && dino.y >= (obst.y - obst.h);
		if (x && y) {
	    	over = true;
	    	clearInterval(interval);
	    	if (score > hiScore) {
	    		hiScore = score;
	    		game.saveHighScore();
    		}
       		game.drawMessage('You lose :( Press up to restart');
       	}
    }

    game.onUpArrow(function() {
  		if (over) {
  			score = 0;
  			obst.x = 450;
  			dino.y = 200;
  			dinosaurVelocity = 0;
  			over = false;
  			interval = setInterval(eventLoop, loopTime);
  			return true
  		}
  		else {	
  			dinosaurVelocity = 10;
  		}
  	});

    game.drawObstacle(obst.x, obst.y)
    game.drawDinosaur(dino.x, dino.y)
  }
  var interval = setInterval(eventLoop, startLoop)
});