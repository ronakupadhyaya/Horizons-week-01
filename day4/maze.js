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
  if (this === window) {
    throw new Error("missing new");
  }
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
  //debugger;
  var currMaze = this.maze;
  var returnString = "";
  for (var i = 0; i < currMaze.length - 1; i++) {
    var rowString = "";
    for (var j = 0; j < currMaze[i].length; j++) {
      if (currMaze[i][j] === " ") {
        rowString += "_";
      } else {
        rowString += currMaze[i][j];
      }
    }
    returnString += (rowString + '\n');
  }
  var rowString = "";
  for (var j = 0; j < currMaze[currMaze.length - 1].length; j++) {
      if (currMaze[currMaze.length - 1][j] === " ") {
        rowString += "_";
      } else {
        rowString += currMaze[currMaze.length - 1][j];
      }
  }
  returnString += rowString;
  return returnString;
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  //debugger;
  var currMaze = this.maze;
  for (var i = 0; i < currMaze.length; i++) {
    for (var j = 0; j < currMaze[i].length; j++) {
      if (currMaze[i][j] === "S") {
        return [i, j];
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
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') -> [0, 2]
Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  var currMaze = this.maze;
  if (direction === "up") {
    var x = row - 1;
    var y = column;
    if (x < 0 || x > currMaze.length - 1 || y < 0 || y > currMaze[0].length - 1) {
      return false;
    }
    if (currMaze[x][y] === " " || currMaze[x][y] === "E" || currMaze[x][y] === "S") {
      return [x, y];
    }
  } else if (direction === "down") {
    var x = row + 1;
    var y = column;
    if (x < 0 || x > currMaze.length - 1 || y < 0 || y > currMaze[0].length - 1) {
      return false;
    }
    if (currMaze[x][y] === " " || currMaze[x][y] === "E" || currMaze[x][y] === "S") {
      return [x, y];
    }
  } else if (direction === "left") {
    var x = row;
    var y = column - 1;
    if (x < 0 || x > currMaze.length - 1 || y < 0 || y > currMaze[0].length - 1) {
      return false;
    }
    if (currMaze[x][y] === " " || currMaze[x][y] === "E" || currMaze[x][y] === "S") {
      return [x, y];
    }
  } else if (direction === "right") {
    var x = row;
    var y = column + 1;
    if (x < 0 || x > currMaze.length - 1 || y < 0 || y > currMaze[0].length - 1) {
      return false;
    }
    if (currMaze[x][y] === " " || currMaze[x][y] === "E" || currMaze[x][y] === "S") {
      return [x, y];
    }
  }
  return false;
}

Maze.prototype.isWin = function(row, column, direction) {
  var currMaze = this.maze;
  if (!this.tryMove(row, column, direction)) {
    return false;
  }
  var position = this.tryMove(row, column, direction);
  if (currMaze[position[0]][position[1]] === "E") {
    return true;
  }
  return false;
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  var startPosition = this.getStartPosition();
  return this.isSolvableHelper();
}

Maze.prototype.isSolvableHelper = function() {
  var currMaze = this.maze;
  var startPos = this.getStartPosition();
  console.log(startPos);
  console.log(currMaze);
  var startPosNew;
  if (this.isWin(startPos[0], startPos[1], "up") || this.isWin(startPos[0], startPos[1], "down") ||
    this.isWin(startPos[0], startPos[1], "left") || this.isWin(startPos[0], startPos[1], "right")) {
    return true;
  }
  if (this.tryMove(startPos[0], startPos[1], "up")) {
    startPosNew = this.getStartPosition();
    currMaze[startPosNew[0]][startPosNew[1]] = "X";
    currMaze[startPos[0] - 1][startPos[1]] = "S";
    if (this.isSolvableHelper()) {
      return true;
    }
  }
  if (this.tryMove(startPos[0], startPos[1], "down")) {
    startPosNew = this.getStartPosition();
    currMaze[startPosNew[0]][startPosNew[1]] = "X";
    currMaze[startPos[0] + 1][startPos[1]] = "S";
    if (this.isSolvableHelper()) {
      return true;
    }
  }
  if (this.tryMove(startPos[0], startPos[1], "left")) {
    startPosNew = this.getStartPosition();
    currMaze[startPosNew[0]][startPosNew[1]] = "X";
    currMaze[startPos[0]][startPos[1] - 1] = "S";
    if (this.isSolvableHelper()) {
      return true;
    }
  }
  if (this.tryMove(startPos[0], startPos[1], "right")) {
    startPosNew = this.getStartPosition();
    currMaze[startPosNew[0]][startPosNew[1]] = "X";
    currMaze[startPos[0]][startPos[1] + 1] = "S";
    if (this.isSolvableHelper()) {
      return true;
    }
  }
  return false;
}
