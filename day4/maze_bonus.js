"use strict";

// New maze constructor. Given a maze layout, construct a new maze.
//
// A maze is a rectangular grid of cells. Each cell can either be:
//  - A wall, represented by 'X'
//  - Empty space, represented by ' ' a single space character
//  - Starting point, represented by 'S'
//  - Ending point, represented by 'E'
//
// A maze is represented by a 2-dimensional array.  Inner arrays represent rows
//
// Mazes are solved by finding a path from the starting point to the ending
// point.
//
// Parameters:
//  * maze: A 2-dimensional array representing a rectangular maze.
//          The lengths of the inner arrays must be the same.
//          Each item of the inner array must be a string that represents a valid maze cell
//          There must be only one starting point and only one ending point.
//
// ex. new Maze([['S', 'E']) represents a trivial solvable maze
// ex. new Maze([['S', 'X', 'E']) represents a trivial unsolvable maze
window.Maze = function(maze) {
  this.maze = maze;
}

Maze.validDirections = ['up', 'down', 'left', 'right'];
Maze.prototype.validDirections = ['up', 'down', 'left', 'right'];

// Return a string representation of the current maze.
// Empty spaces are represented by underscores '_',
// and new rows are separated by newlines (\n in a string).

// Use this for your logging purposes!

// ex. new Maze(['S', ' ', 'E']).toString() -> "S_E"
// ex. new Maze([[' ', 'E'], [' ', 'S']]).toString() -> "_E\n_S"
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).toString -> "S_E\nXXX"

Maze.prototype.toString = function() {
  var rows = [];
  this.maze.forEach(function(item){
      item.forEach(function(char,index){
        if(char===" "){item[index]="_";}
      });
      rows.push(item.join(""));
  });
  var maze = rows.join("\n");
  console.log(maze);
  return maze;
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  var index1 = -1;
  var index2 = -1;
  var maze = this.maze;
  maze.forEach(function(item,i){
    item.forEach(function(char,j){
      if(maze[i][j]==="S"){
        index1 = i;
        index2 = j;
      }
    })
  })
  if(index1<0){
    throw new Error("Maze has no starting point");
  }
  return [index1,index2];
}

// Write a method tryMove() that takes a position (row and column parameters)
// a direction to move, and returns:
//  - if the move is valid, a new position ([row, column])
//  - if the move is invalid, false
//
// The position 0, 0 represents the upper left corner of the maze.
//
// A move is invalid if any of the following conditions are true:
//  - starting position is invalid (i.e. not on the board)
//  - move results in moving off the board (i.e. moving up from the top row, or
//    moving left from the leftmost column etc.)
//  - move ends on a cell that's a wall (represented by 'X')
//
// Parameters:
//  - row: row before the move. 0 represents top row.
//  - column: column before the move. 0 represents leftmost column.
//  - direction: direction to try to move. Must be one of:
//    - 'up': Move up i.e. decrement row
//    - 'down': Move down i.e. increment row
//    - 'left': Move left i.e. decrement column
//    - 'right': Move right i.e. increment column
//
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'leftright') -> Throws error: 'leftright' is not a valid direction
// ex. new Maze([['S', 'E']]).tryMove(1, 0, 'right') -> false, invalid starting position
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'left') -> false, moves off the left side of board
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'up') -> false, moves off the top of the board
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'down') -> false, moves off the bottom of the board
// ex. new Maze([['S', 'X', 'E']]).tryMove(0, 0, 'right') -> false, moves into wall
// ex. new Maze([['S', 'X', 'E']]).tryMove(0, 2, 'left') -> false, moves into wall
// ex. new Maze([['S'], ['E']]).tryMove(0, 0, 'right') -> false, moves off right side of the board
// ex. new Maze([['S'], ['X'], ['E']]).tryMove(0, 0, 'down') -> false, moves into wall
// ex. new Maze([['S'], ['X'], ['E']]).tryMove(2, 0, 'up') -> false, moves into wall
//
//
// ex. new Maze([['S'], ['E']]).tryMove(0, 0, 'down') -> [1, 0]
// ex. new Maze([['S'], ['E']]).tryMove(1, 0, 'up') -> [0, 0]
// ex. new Maze([['S', 'E']]).tryMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'right') -> [0, 2]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 0, 'right') -> [0, 1]
Maze.prototype.checkSpot = function(row,column){
  if(row===0 && column ===1){
  }
  var maze = this.maze;
  var width = maze[0].length;
  var height = maze.length;
  if(row < 0 || row >= height || column < 0 || column >= width){
    return false;
  }
  var char = maze[row][column];
  if(char === "X"){
    return false;
  }
  return true;
}
Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  if(!this.checkSpot(row,column)){
    return false;
  }
  var newRow = row;
  var newCol = column;
  switch (direction) {
    case "up":
      newRow--;
      break;
    case "left":
      newCol--;
      break;
    case "right":
      newCol++;
      break;
    case "down":
      newRow++;
      break;
  }
  if(!this.checkSpot(newRow,newCol)){
    return false;
  }
  return [newRow,newCol];
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
}

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

function Queue(){
  this.moves = [];
}

Queue.prototype.enqueue = function(item) {
  this.moves.push(item);
}

Queue.prototype.dequeue = function() {
  return this.moves.shift();
}

Queue.prototype.isEmpty = function(){
    return this.moves.length===0;
}

Maze.prototype.positionString = function(arr){
  return "(" + arr[0] + "," + arr[1] +")";
}

Maze.prototype.tryDirections = function(position){ //up, down, left, right
  var self = this;
  var i = position[0];
  var j = position[1];
  var ret = [];
  self.validDirections.forEach(function(direction){
    var testMove = self.tryMove(i,j,direction);
    if(testMove!=false){
      ret.push([testMove[0],testMove[1],self.positionString([testMove[0],testMove[1]]),direction,self.positionString(position)]);
    }
  });
  return ret;
}

Maze.prototype.getShortestPath = function() {
  var self = this;
  var plan = new Queue();
  var record = {}; // Record stores keys: '(i,j)', value array of moves that is the fastest way to get to
  var prevPosition;
  var prevPositionString;
  var currPosition = self.getStartPosition();
  var currPositionString = self.positionString(currPosition);
  record[currPositionString] = [];
  var currChar = self.maze[currPosition[0]][currPosition[1]];
  while(currChar !== 'E'){
    var futurePaths = self.tryDirections(currPosition); //array of arrays like [i,j,'(i,j)','direction']
    for(var i = 0; i < futurePaths.length;i++){
      if(record.hasOwnProperty(futurePaths[i][2])){ //if the move puts us where we've already been, don't add to record.
        continue;
      }
      plan.enqueue(futurePaths[i]); //adding array like [i,j,'(i,j)','direction'] to queue
    }
    if(plan.isEmpty()){return [];}
    prevPosition = currPosition;
    prevPositionString = currPositionString;
    var currMove = plan.dequeue();  //move to a new position
    currPosition = [currMove[0],currMove[1]];
    currChar = self.maze[currPosition[0]][currPosition[1]];
    currPositionString = currMove[2];
    debugger;
    record[currPositionString] = record[currMove[4]].slice();
    record[currPositionString].push(currMove[3]);
  }
  return record[currPositionString];
}
