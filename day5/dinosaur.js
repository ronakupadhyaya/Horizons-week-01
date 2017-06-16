"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  //game.clear();
  //game.drawObstacle(450, 200);
  var inactive = false
  var score = 0
  var dinosaurY = 200
  game.drawDinosaur(100, dinosaurY)
  var dinosaurVelocity = 0
  var highScore = 0

  var newX = game.width * 0.9
  var obstacleSpeed = 10

  game.onUpArrow(function() {
    if (inactive) {
      score = 0
      dinosaurY = 200
      dinosaurVelocity = 0
      newX = game.width * 0.9

      inactive = false

      intervalId = setInterval(eventLoop, 50)
      return true
    }
    if (dinosaurY >= 200) {
      debugger;
      dinosaurVelocity = 12
    }


  })

  var eventLoop = function() {
    score = score + 1



    if (newX <= 0) {
      newX = game.width
    }
    if (score % 150 === 0) {
      obstacleSpeed = obstacleSpeed + 5
    }
    newX = newX - obstacleSpeed
    game.clear()
    game.drawScore(score)
    if (score > highScore) {
      highScore = highScore + 1
    }
    game.drawHighScore(highScore)
    game.drawObstacle(newX, 200)


    if (dinosaurY < 100) {
      dinosaurVelocity = -12
    }
    if (dinosaurY > 200) {
      dinosaurVelocity = 0;
      dinosaurY = 200
      game.drawDinosaur(100, dinosaurY)
    }
    dinosaurY = dinosaurY - dinosaurVelocity
    game.drawDinosaur(100, dinosaurY)

    if ((newX - 35 < 100 && newX + 50 > 100) && (dinosaurY - 25 < 200 && dinosaurY + 25 > 200)) {
      debugger;
      inactive = true
      obstacleSpeed = 10
      game.drawMessage('You Lose!')
      // setTimeout(function() {
      //   game.clear()
      //   game.drawMessage('Your score was ' + score)
      // }, 1000)
      clearInterval(intervalId)
    }

  }

  var intervalId = setInterval(eventLoop, 50)
})
