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
    throw new Error('use new keyword');
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
  var mazeStr = "";
  for(var row = 0; row < this.maze.length; row++){
    mazeStr += this.maze[row].join("");
    if (row !== this.maze.length - 1) {
      mazeStr += "\n";
    }
  }
  mazeStr = mazeStr.split(' ').join('_');
  return mazeStr;
  // YOUR CODE HERE
  // Hint: See Array.prototype.join()!
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  for (var i = 0; i < this.maze.length; i++) {
    if (this.maze[i].indexOf('S') !== -1) {
      return [i, this.maze[i].indexOf('S')];
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

  var check = true;
  if (row >= this.maze.length || column < 0 || column >= this.maze[0].length || row < 0) {
    return false;
  }
  var checkForX = function (myColumn, myRow) {
    if (myRow >= this.maze.length || myColumn < 0 || myColumn >= this.maze[0].length || myRow < 0) {
      return false;
    }
    if (this.maze[myRow][myColumn] === 'X') {
      return false;
    }
    return true;
  }.bind(this);

  var myColumn = column;
  var myRow = row;
  switch (direction) {
  case 'up':
    myRow--;
    check = checkForX(myColumn, myRow);
    break;
  case 'down':
    myRow++;
    check = checkForX(myColumn, myRow);
    break;
  case 'right':
    myColumn++;
    check = checkForX(myColumn, myRow);
    break;
  case 'left':
    myColumn--;
    check = checkForX(myColumn, myRow);
    break;
  default:
    return;
  }
  if (check) {
    return [myRow, myColumn];
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
  var log = {};
  var maze = this;
  var recursive = function (row, column) {
    //check if visited before
    var key = row + '_' + column;
    if (log.hasOwnProperty(key)) {
      return false;
    }

    //trymove
    var up = this.tryMove(row, column, 'up');
    var down = this.tryMove(row, column, 'down');
    var left = this.tryMove(row, column, 'left');
    var right = this.tryMove(row, column, 'right');


    log[key] = key;

    //call recursive again

    if (up) {
      if (this.maze[up[0]][up[1]] === 'E') {
        return true;
      } else {
        if(recursive(up[0], up[1])) {
          return true;
        }
      }
    }
    if (down) {
      if (this.maze[down[0]][down[1]] === 'E') {
        return true;
      } else {
        if (recursive(down[0], down[1])) {
          return true;
        }
      }
    }
    if (left) {
      if (this.maze[left[0]][left[1]] === 'E') {
        return true;
      } else {
        if (recursive(left[0], left[1])) {
          return true;
        }
      }
    }
    if (right) {
      if (this.maze[right[0]][right[1]] === 'E') {
        return true;
      } else {
        if (recursive(right[0], right[1])) {
          return true;
        }
      }
    }
    return false;
  }.bind(maze);
  return recursive(startPosition[0], startPosition[1]);
}
