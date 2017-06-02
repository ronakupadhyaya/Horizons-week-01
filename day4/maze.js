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
  var result = '';
  this.maze.forEach(function(item) {
    var string = '';
    item.forEach(function(ele) {
      // console.log(ele);
      if (ele === ' ') {
        string = string + '_';
      } else {
        string = string + ele;
        // console.log(string);
      }
    })
    string = string + '\n';
    result = result + string;
  })
  // console.log(result);
  return result.slice(0, result.length - 1);
  // YOUR CODE HERE
  // Hint: See Array.prototype.join()!
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  var coordS = [];
  this.maze.forEach(function(item, index) {
    if (item.indexOf('S') !== -1) {
      coordS.push(index);
      coordS.push(item.indexOf('S'));
    }
  })
  if (coordS.length === 0) {
    throw new Error("Maze has no starting point");
  }
  return coordS;
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
  if (!_.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }

  var newPos = [row, column];
  if (this.maze.length < row + 1) return false;

  if (this.maze[0].length < column + 1) return false;


  if (direction === 'up') {
    newPos[0] = row - 1;
  }
  if (direction === 'down') {
    newPos[0] = row + 1;
  }
  if (direction === 'left') {
    newPos[1] = column - 1;
  }
  if (direction === 'right') {
    newPos[1] = column + 1;
  }
  if (newPos[0] < 0 || newPos[1] < 0) return false;
  if (this.maze.length < newPos[0] + 1) return false;
  if (this.maze[0].length < newPos[1] + 1) return false;
  if (this.maze[newPos[0]][newPos[1]] === 'X') return false;
  return newPos;
  // YOUR CODE HERE
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
var moves = {
  1: 'up',
  2: 'down',
  3: 'left',
  4: 'right'
}

var validMoves = function(current) {
  var validMoves = [];
  for (var key in moves) {
    if (this.tryMove(current[0], current[1], moves[key]) !== false) {
      validMoves.push(this.tryMove(current[0], current[1], moves[key]));
    }
  }
  return validMoves;
}

Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE

  console.log(validMoves);
}
