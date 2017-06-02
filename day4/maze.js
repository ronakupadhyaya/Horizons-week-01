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
// Return a string representation of the current maze.
// Empty spaces are represented by underscores '_',
// and new rows are separated by newlines (\n in a string).
// Use this for your logging purposes!
// ex. new Maze(['S', ' ', 'E']).toString() -> "S_E"
// ex. new Maze([[' ', 'E'], [' ', 'S']]).toString() -> "_E\n_S"
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).toString -> "S_E\nXXX"
Maze.prototype.toString = function() {
  var mazer = this.maze;
  var arr2 = [];
  for (var i = 0; i <mazer.length; i++) {
    var arr = [];
    for (var j = 0; j<mazer[0].length; j++) {
      if (mazer[i][j] === ' '){
        arr.push('_');
      }else{
        arr.push(mazer[i][j]);
      }
    }
    arr2.push(arr.join(''));
  }
  return arr2.join('\n');
}
// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  var mymaze = this.maze;

  for (var row = 0; row < mymaze.length; row++) {
    for (var col = 0; col < mymaze[0].length; col++) {
      if(mymaze[row][col] === 'S'){
        return [row,col];
      }
      //console.log(mymaze[row][col]);
    }
  }
  throw new Error("Maze has no starting point");
}

Maze.prototype.getEndPosition = function() {
  // YOUR CODE HERE
  var mymaze = this.maze;

  for (var row = 0; row < mymaze.length; row++) {
    for (var col = 0; col < mymaze[0].length; col++) {
      if(mymaze[row][col] === 'E'){
        return [row,col];
      }
      //console.log(mymaze[row][col]);
    }
  }
  throw new Error("Maze has no starting point");
}
//ex. new Maze([['S', 'E']]).tryMove(0, 0, 'leftright') -> Throws error: 'leftright' is not a valid direction
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
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') -> [0, 2]
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
Maze.prototype.tryMove = function(row, column, direction) {
  var mymaze = this.maze;
  var obj = this;
  var start;
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  try{
    start = obj.getStartPosition();
    console.log(start);
  } catch(thrownerror) {
    console.log("invalid starting position");
    return false;
  }
  if (mymaze.length-1 < row){
    console.log("Invalid starting position");
    return false;
  }
  if (mymaze[0].length-1 < column){
    console.log("Invalid starting position");
    return false;
  }

  var desiredPosition;
  if(direction === "up" && row!==0){
    desiredPosition = [row-1,column];
  }else if(direction === "down" && row!== mymaze.length-1){
    desiredPosition = [row+1,column];
  }else if(direction === "left" && column!==0){
    desiredPosition = [row,column-1];
  }else if(direction === "right" && column!==mymaze[0].length - 1){
    desiredPosition = [row,column+1];
  }else{
    return false;
  }
  var next = mymaze[desiredPosition[0]][desiredPosition[1]];
  if ( next === 'X'){
    return false;
  }
  return desiredPosition;
  // YOUR CODE HERE
}
// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  var mymaze = this.maze;
  var obj = this;
  var wasHere = (function(){ var i=mymaze.length, arr=[]; while(i--) arr.push([]); return arr })();
  var start = obj.getStartPosition();
  var end = obj.getEndPosition();

  for (var row = 0; row < mymaze.length; row++){
    wasHere[row].push([]);
    for (var col = 0; col < mymaze[row][col][0].length; col++){
      wasHere[row][col].push('_');

    }
  }
  console.log(mymaze[row][col][0].length);
  console.log(mymaze);
  console.log(wasHere);
  var recursive = function(a,b){


    if (start[0] === end[0] && start[1] === end[1]){
      return true;
    }
    //console.log(start);
    //console.log(end);
  }
}
