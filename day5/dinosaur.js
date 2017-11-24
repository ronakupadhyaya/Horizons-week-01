"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  //initialize variables (obstacle X start, dinosaurY start,
  //dinosaur velocity(0), interval(setInterval(for animation/movement)), score(0),
  //highscore and jump booelan.

  let obstacleX = game.width;
  let dinosaurY = 200;
  let dinosaurVelocity = 0;
  let interval = setInterval(eventLoop, 100);
  let score = 0;
  let highScore = game.getHighScore();
  let jumped = false;


  //event loop. code to be executed every interval.
  function eventLoop() {
    score += 1;
    game.clear();
    game.drawScore(score);
    game.drawHighScore(highScore);
    game.drawDinosaur(100, dinosaurY);
    dinosaurY = dinosaurY - dinosaurVelocity;

    //jump with up arrow
    game.onUpArrow(function() {
      if(jumped === false) {
        dinosaurVelocity = 10;
        jumped = true;
      }
    });


    //move dinosaur
    if (dinosaurY < 200) {
      dinosaurVelocity -= 1;
    }
    if (dinosaurY < 100) {
      dinosaurVelocity = -10;
    }

    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200;
      jumped = false;
    }

    //move obstacle
    obstacleX = obstacleX - 10;
    game.drawObstacle(obstacleX, 200);
    if (obstacleX < 10) {
      obstacleX = game.width;
    }

    //initialize collision boxes
    let dinoBox = {x: 100, y: dinosaurY, width: game.dinosaurWidth, height: game.dinosaurHeight};
    let obstacleBox = {x: obstacleX, y: 200, width: game.obstacleWidth, height: game.obstacleHeight};


    //check for collision of dinoBox and obstacleBox
    if (dinoBox.x < obstacleBox.x + obstacleBox.width &&
       dinoBox.x + dinoBox.width > obstacleBox.x &&
       dinoBox.y > obstacleBox.y - obstacleBox.height){
      game.drawMessage('You lose! :( Press up to restart');
      interval = clearInterval(interval);

      //check if score is new highScore.
      if(score > highScore) {
        game.clearHighScore();
        game.saveHighScore(score);
      };

      //restart game with up arrow.
      game.onUpArrow(function () {
        if (interval === undefined) {
          game.clear();
          score = 0;
          dinosaurY = 200;
          obstacleX = game.width;
          game.drawScore(score);
          highScore = game.getHighScore();
          game.drawHighScore(highScore);
          game.drawDinosaur(100, dinosaurY);
          interval = setInterval(eventLoop, 100);
        }
      });


  };

  //end of event loop
};


//helper function; just set collisionCheck to an if statement that checks for collision
//based on dinosaurY coords and obstacleX coords


//end of .ready function
});
