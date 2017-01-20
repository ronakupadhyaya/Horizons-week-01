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
//          Each item of the inner array must be a string that represents a
//          valid maze cell
//          There must be only one starting point and only one ending point.
//
// ex. new Maze([['S', 'E']) represents a trivial solvable maze
// ex. new Maze([['S', 'X', 'E']) represents a trivial unsolvable maze
window.Maze = function(maze) {
  // TODO throw exception if this is not called with new
  // if (!(this instanceof Maze)){
  //   throw "hello";
  // }
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
  // YOUR CODE HERE
  // Hint: See Array.prototype.join()!

  var result = "";
  // traverse outer loop
  for (var i = 0; i < this.maze.length; i ++){
    // inner array joins on empty
    var inner = this.maze[i].join('');
    // replace ' ' with _
    inner = inner.replace(/ /g, "_");
    result = result + inner + "\n";
  }

  return result.substring(0, result.length-1);

}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  // row, column
  // row

  for (var i = 0; i < this.maze.length; i ++){
    if (this.maze[i].indexOf("S") !== -1) {

    // column
      for (var j = 0; j < this.maze[i].length; j ++){
        if (this.maze[i][j] === "S"){
          return [i,j];
        }
      }
    }
  }

  throw new Error("Maze has no starting point");


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
//  - move ends on a cell that's a wall (represented by 'X')
//  - move results in moving off the board (i.e. moving up from the top row, or
//    moving left from the leftmost column etc.)
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
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') -> [0, 2]
Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }

  // check if valid start position
  if (row > this.maze.length -1 || row < 0){
    return false;
  }

  if (column > this.maze[0].length -1 || column < 0){
    return false;
  }

  if (this.maze[row][column] === "X"){
    return false;
  }

  var directions = {
    left: function(row, column) {
      column--;
      return [row, column];
    },
    right: function(row, column) {
      column++;
      return [row, column];
    },
    up: function(row, column) {
      row--;
      return [row, column];
    },
    down: function(row, column) {
      row++;
      return [row, column];
    }
  }

  var endPosition = directions[direction](row, column);

  if (endPosition[0] > this.maze.length -1 || endPosition[0] < 0){
    return false;
  }

  if (endPosition[1] > this.maze[0].length -1 || endPosition[1] < 0){
    return false;
  }

  if (this.maze[endPosition[0]][endPosition[1]] === "X"){
    return false;
  }

  return endPosition;

}

// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  var q = [];
  // var visited = false;

  // make markers
  var markerMaze = [];
  for (var i =0; i < this.maze.length; i ++){
    var markerRow = [];
    for (var j =0; j < this.maze[i].length; j ++){
      if (this.maze[i][j] === "X" || this.maze[i][j] === "S" ){
        markerRow.push(true);
      } else {
        markerRow.push(false);
      }
    }
    markerMaze.push(markerRow);
  }

  // start by putting start point into the q
  q.push(this.getStartPosition());

  //(Q's are FIFO, meaning enter and exit from opposite sides)
  //until we are done:
  while (q.length !== 0){
    // take something out of the q
    var rowAndColumn = q.shift();
    console.log(rowAndColumn);
    // examine it (return true if the exit "E")
    if (this.maze[rowAndColumn[0]][rowAndColumn[1]] === "E"){
      return true;
    }
    // mark it
    markerMaze[rowAndColumn[0]][rowAndColumn[1]] = true;
    // add it's neighbors to the q (if unmarked)
    var leftTry = this.tryMove(rowAndColumn[0],rowAndColumn[1],"left");
    if (leftTry !== false && markerMaze[leftTry[0]][leftTry[1]] === false){
      q.push(leftTry);
    }
    var rightTry = this.tryMove(rowAndColumn[0],rowAndColumn[1],"right");
    if (rightTry !== false && markerMaze[rightTry[0]][rightTry[1]] === false){
      q.push(rightTry);
    }
    var upTry = this.tryMove(rowAndColumn[0],rowAndColumn[1],"up");
    if (upTry !== false && markerMaze[upTry[0]][upTry[1]] === false){
      q.push(upTry);
    }
    var downTry = this.tryMove(rowAndColumn[0],rowAndColumn[1],"down");
    if (downTry !== false && markerMaze[downTry[0]][downTry[1]] === false){
      q.push(downTry);
    }
  }
  // checked everything by this Point
  return false;
}
