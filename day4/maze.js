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
  // YOUR CODE HERE
  // Hint: See Array.prototype.join()!
  debugger;
  var arr = [];
  this.maze.forEach(function(row) {
    arr = arr.concat(row);
    arr.push("\n");
  })
  arr.pop();
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];
    if (arr[i] === " ") {
      arr[i] = "_";
    }
  }
  var str = arr.join("");
  return str;
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  for (var i = 0; i < this.maze.length; i++) {
    var element = this.maze[i];
    for (var j = 0; j < element.length; j++) {
      if (element[j] === "S") {
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
  // YOUR CODE HERE
  if (!this.getStartPosition) {
    return false;
  }
  if (direction === "right")
    column++;
  if (direction === "left") 
    column--;
  if (direction === "down") 
    row++;
  if (direction === "up") 
    row--;
  if (row < 0 ||
  column < 0 ||
  row >= this.maze.length ||
  column >= this.maze[0].length ||
  this.maze[row][column] === "X") {
    return false;
  }
  return [row, column];
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  debugger;
  var start = this.getStartPosition();
  var positions = [];
  for (var i = 0; i < this.maze.length; i++) {
    positions.push([]);
  }
  for (var i = 0; i < this.maze.length; i++) {
    var element = positions[i];
    for (var j = 0; j < this.maze[0].length; j++) {
      positions[i].push(false);
    }
  }
  var obj = this;
  var found = false;
  function solve(position) {
    var row = position[0];
    var col = position[1];
    if (found) {
      return;
    }
    if(obj.maze[row][col] === "E") {
      found = true;
      return;
    }
    positions[row][col] = true; 
    if(obj.tryMove(row, col, "down") && 
    !positions[obj.tryMove(row, col, "down")[0]][obj.tryMove(row, col, "down")[1]]) {
      solve(obj.tryMove(row, col, "down"));
    }
    if(obj.tryMove(row, col, "up") && 
    !positions[obj.tryMove(row, col, "up")[0]][obj.tryMove(row, col, "up")[1]]) {
      solve(obj.tryMove(row, col, "up"));
    }
    if(obj.tryMove(row, col, "right") && 
    !positions[obj.tryMove(row, col, "right")[0]][obj.tryMove(row, col, "right")[1]]) {
      solve(obj.tryMove(row, col, "right"));
    }
    if(obj.tryMove(row, col, "left") && 
    !positions[obj.tryMove(row, col, "left")[0]][obj.tryMove(row, col, "left")[1]]) {
      solve(obj.tryMove(row, col, "left"));
    }    
  }
  solve(start);
  return found;
}
