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
// of the grid.
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
  // TODO throw exception if this is not called with new
  this.maze = maze;
}

Maze.validDirections = ['up', 'down', 'left', 'right'];

// Write a method isValidMove() that takes a position (row and column parameters)
// a direction to move, and returns:
//  - if the move is valid, a new position ([row, column])
//  - if the move is invalid, false
//
// A move is invalid if any of the following conditions are true:
//  - starting position is invalid (i.e. not on the board)
//  - move ends on a cell that's a wall (represented by 'X')
//  - move results in moving off the board (i.e. moving up from the top row, or
//    moving left from the leftmost column etc.)
//
// Parameters:
//  - row & column: the position before the move
//  - direction: direction to try to move. Must be one of:
//    - 'up': Move up
//    - 'down': Move down
//    - 'left': Move left
//    - 'right': Move right
//
// ex. new Maze([['S', 'E']]).isValidMove(0, 0, 'leftright') -> Throws error: 'leftright' is not a valid direction
// ex. new Maze([['S', 'E']]).isValidMove(1, 0, 'right') -> false, invalid starting position
// ex. new Maze([['S', 'E']]).isValidMove(0, 0, 'left') -> false, moves off the left side of board
// ex. new Maze([['S', 'E']]).isValidMove(0, 0, 'up') -> false, moves off the top of the board
// ex. new Maze([['S', 'E']]).isValidMove(0, 0, 'down') -> false, moves off the bottom of the board
// ex. new Maze([['S', 'X', 'E']]).isValidMove(0, 0, 'right') -> false, moves into wall
// ex. new Maze([['S', 'X', 'E']]).isValidMove(0, 2, 'left') -> false, moves into wall
// ex. new Maze([['S'], ['E']]).isValidMove(0, 0, 'right') -> false, moves off right side of the board
// ex. new Maze([['S'], ['X'], ['E']]).isValidMove(0, 0, 'down') -> false, moves into wall
// ex. new Maze([['S'], ['X'], ['E']]).isValidMove(2, 0, 'up') -> false, moves into wall
//
//
// ex. new Maze([['S'], ['E']]).isValidMove(0, 0, 'down') -> [1, 0]
// ex. new Maze([['S'], ['E']]).isValidMove(1, 0, 'up') -> [0, 0]
// ex. new Maze([['S', 'E']]).isValidMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'right') -> [0, 2]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 0, 'right') -> [0, 1]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(2, 2, 'up') -> [1, 2]
Maze.prototype.isValidMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }

  // YOUR CODE HERE
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  for (var row = 0; row < this.maze.length; row++) {
    var curRow = this.maze[row];
    for (var column = 0; column < curRow.length; column++) {
      if (curRow[column] === 'S') {
        return [row, column];
      }
    }
  }
  throw new Error("Maze has no starting point");
}

// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
}

// Return a string representation of the current maze.
// Empty spaces are represented by underscores '_'.
Maze.prototype.toString = function() {
  return this.maze.map(function(row) {
    return row.map(function(cell) {
      if (cell === ' ') {
        return '_';
      }
      return cell;
    }).join('');
  }).join('\n');
}
