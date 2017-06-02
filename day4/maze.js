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
  var ans = [];
  this.maze.forEach(function(row) {
    var mazeStr = row;
    //if row is array, convert to string
    if (typeof row === "object") {
      var mazeRow = row.join('');
      mazeStr = "";
      for (var i = 0; i<mazeRow.length; i++) {
        if (mazeRow.substring(i,i+1)===" ")
          mazeStr += "_";
        else
          mazeStr += mazeRow.substring(i,i+1);
      }
    }
    ans.push(mazeStr);
  });
  return ans.join("\n");
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  var self = this;
  var position = null;
  self.maze.forEach(function (row, mIndex) {
    row.forEach(function (item, rIndex) {
      if (item === "S"){
        position = [mIndex, rIndex];
      }
    });
  });
  if (position !== null)
    return position;
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
  var self = this.maze;
  //check validity of direction
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  //check if start position on board
  if (row > self.length-1 || column > self[0].length-1) {
    return false;
  }
  //get new row and column values
  var nextR = row;
  var nextC = column;

  switch(direction) {
  case "left":
    if (column === 0) return false;
    nextC--;
    break;
  case "right":
    if (column === self[0].length-1) return false;
    nextC++;
    break;
  case "up":
    if (row === 0) return false;
    nextR--;
    break;
  case "down":
    if (row === self.length-1) return false;
    nextR++;
    break;
  default:
    //nothing
  }
  //check move to new row and column
  if (self[nextR][nextC] === 'X')
    return false;
  return [nextR, nextC];
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  var self = this;
  function getEndPosition() {
    var position = null;
    self.maze.forEach(function (row, mIndex) {
      row.forEach(function (item, rIndex) {
        if (item === "E"){
          position = [mIndex, rIndex];
        }
      });
    });
    if (position !== null)
      return position;
  }

  var start = self.getStartPosition();
  var end = getEndPosition();
  //console.log(start, end);
  var visited = ["false", start.toString()];

  function recurse(start, visited) {
    if (!start)
      return false;
    if (start.toString() === end.toString())
      return true;

    var left = self.tryMove(start[0],start[1],'left');
    var right = self.tryMove(start[0],start[1],'right');
    var down = self.tryMove(start[0],start[1],'down');
    var up = self.tryMove(start[0],start[1],'up');

    if (visited.indexOf(left.toString()) < 0) {
      visited.push(left.toString());
      left = recurse(left, visited);
    } else {
      left = false;
    }
    if (visited.indexOf(right.toString()) < 0) {
      visited.push(right.toString());
      right = recurse(right, visited);
    } else {
      right = false;
    }
    if (visited.indexOf(down.toString()) < 0) {
      visited.push(down.toString());
      down = recurse(down, visited);
    } else {
      down = false;
    }
    if (visited.indexOf(up.toString()) < 0) {
      visited.push(up.toString());
      up = recurse(up, visited);
    } else {
      up = false;
    }
    return left || right || up || down;
  }

  return recurse(start, visited);
}
