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
function Queue() {
  this.moves = []; // index 0 is front of line, index length-1 is back of line
}

Queue.prototype.enqueue = function(item) {
  this.moves.push(item);
}

Queue.prototype.dequeue = function(item) {
  return this.moves.shift();
}

Queue.prototype.isEmpty = function() {
  return this.moves.length === 0;
}

//convert [i,j] into '(i,j)'
Maze.prototype.positionString = function(position) {
  return '(' + position[0] + ',' + position[1] + ')';
}

// up, down, left, right
Maze.prototype.tryDirections = function(position) { //position in format [i, j]
  var ret = []; // [i, j, '(i,j)', 'direction'] or false
  var i = position[0];
  var j = position[1];
  var origin = this.positionString(position);
  var self = this;
  var directionList = ['up', 'down', 'left', 'right'];
  var toAdd = []; // formatted thing to push
  directionList.forEach(function(item, index) {
    var currentDirection = item;
    var arrayToAdd = [];
    var testMove = self.tryMove(i, j, currentDirection);
    // either [i, j] if move is good, false if move is bad
    if(!! testMove) {
      ret.push([testMove[0], testMove[1], self.positionString([testMove[0], testMove[1]]),
                                                currentDirection, origin]);
    }
  });
  return ret;
}

// the values stored in record should ['left', 'right', 'up']

Maze.prototype.getShortestPath = function() {
  var plan = new Queue(); //Plan will enqueue ['(i,j)', the next move to consider e.g. 'left' or 'up']
  var record = {}; // Record stores keys: '(i,j)', value array of moves that is the fastest way to get to (i, j)
  var prevPosition; // [i, j] position
  var prevPositionString;
  var currPosition = this.getStartPosition(); // [i, j]
  var currChar = this.maze[currPosition[0]][currPosition[1]];
  var self = this;
  //making sure we remember how to get to start (i.e. not move)
  var currPositionString = self.positionString(currPosition);
  record[currPositionString] = [];

  while(currChar !== 'E') {
    var futurePaths = self.tryDirections(currPosition); //array of arrays [i, j, '(i,j)', 'direction', origin as str] (i, j) positions after considered move
    for(var i = 0; i < futurePaths.length; i++) {
      if(record.hasOwnProperty(futurePaths[i][2])) { //if the move we consider goes to a place we've already been, ignore
        continue;
      }
      plan.enqueue(futurePaths[i]); //adding [i, j, '(i,j)', 'direction', origin] to the back of the queue
    }

    if(plan.isEmpty()) {
      return [];
    }

    //moving forward
    prevPosition = currPosition;
    prevPositionString = currPositionString;

    //curr move [i, j, '(i,j)', 'direction', origin]
    var currMove = plan.dequeue(); //move to a new position we are about to make
    currPosition = [currMove[0], currMove[1]];
    currChar = this.maze[currPosition[0]][currPosition[1]];
    currPositionString = currMove[2];
    debugger;
    record[currPositionString] = record[currMove[4]].slice();
    record[currPositionString].push(currMove[3]);
  }

  return record[currPositionString];
}
