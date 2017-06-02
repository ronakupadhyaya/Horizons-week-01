"use strict";

// Write a method (i.e. a function) that returns the shortest path through a
// maze. This function should return an array of strings containing 'right',
// 'left', 'up' or 'down'.  If there is no path through the maze it should
// return empty array.
//
// There may be multiple shortest paths in a maze, you only need to find one of
// them.
//
// ex. new Maze([['S', 'X', 'E']]).getShortestPath() -> [], not solvable
// ex. new Maze([['S', 'E']]).getShortestPath() -> ['right']
// ex. new Maze([['E', ' '], ['X', ' '], ['S', ' ']]).getShortestPath() -> ['right', 'up', 'up', 'left']
Maze.prototype.getEndingPosition = function() {
  var currMaze = this.maze;
  for (var i = 0; i < currMaze.length; i++) {
    for (var j = 0; j < currMaze[i].length; j++) {
      if (currMaze[i][j] === "E") {
        return [i, j];
      }
    }
  }
  throw new Error("Maze has no ending point");
}


Maze.prototype.getShortestPath = function() {
	//debugger;
  var currMaze = this.maze;
  var currPos = {};
  var pastPos = [];
  var startingPos = this.getStartPosition();
  pastPos.push(startingPos);
  var endingPos = this.getEndingPosition().toString();
  currPos[startingPos.toString()] = [];
  while (!(Object.keys(currPos).length === 0)) {
  	var newKeys = {};
  	for (var posToCheck in currPos) {
  		var latestPath = currPos[posToCheck];
  		if (posToCheck === endingPos) {
  			return currPos[posToCheck];
  		}
  		var indeces = posToCheck.split(",");
  		pastPos.push([Number(indeces[0]), Number(indeces[1])]);
  		var hasVisited1 = false;
  		if (this.tryMove(Number(indeces[0]), Number(indeces[1]), "up")) {
  			for (var i = 0; i < pastPos.length; i++) {
  				if (pastPos[i][0] === (Number(indeces[0]) - 1) && pastPos[i][1] === Number(indeces[1])) {
  					hasVisited1 = true;
  				}
  			}
  			if (!hasVisited1) {
  				console.log("here");
  				var newPath = latestPath.slice();
  				newPath.push("up");
  				newKeys[[Number(indeces[0]) - 1, Number(indeces[1])].toString()] = newPath;
  			}
  		}
  		var hasVisited2 = false;
  		if (this.tryMove(Number(indeces[0]), Number(indeces[1]), "down")) {
  			for (var i = 0; i < pastPos.length; i++) {
  				if (pastPos[i][0] === (Number(indeces[0]) + 1) && pastPos[i][1] === Number(indeces[1])) {
  					hasVisited2 = true;
  				}
  			}
  			if (!hasVisited2) {
  				var newPath = latestPath.slice();
  				newPath.push("down");
  				newKeys[[Number(indeces[0]) + 1, Number(indeces[1])].toString()] = newPath;
  			}
  		}
  		var hasVisited3 = false;
  		if (this.tryMove(Number(indeces[0]), Number(indeces[1]), "left")) {
  			for (var i = 0; i < pastPos.length; i++) {
  				if (pastPos[i][0] === Number(indeces[0]) && pastPos[i][1] === (Number(indeces[1])) - 1) {
  					hasVisited3 = true;
  				}
  			}
  			if (!hasVisited3) {
  				var newPath = latestPath.slice();
  				newPath.push("left");
  				newKeys[[Number(indeces[0]), Number(indeces[1]) - 1].toString()] = newPath;
  			}
  		}
  		var hasVisited4 = false;
  		if (this.tryMove(Number(indeces[0]), Number(indeces[1]), "right")) {
  			for (var i = 0; i < pastPos.length; i++) {
  				if (pastPos[i][0] === Number(indeces[0]) && pastPos[i][1] === (Number(indeces[1])) + 1) {
  					hasVisited4 = true;
  				}
  			}
  			if (!hasVisited4) {
  				var newPath = latestPath.slice();
  				newPath.push("right");
  				newKeys[[Number(indeces[0]), Number(indeces[1]) + 1].toString()] = newPath;
  			}
  		}
  		currPos = _.omit(currPos, posToCheck);
  	}
  	currPos = newKeys;
  }
  return [];
}


