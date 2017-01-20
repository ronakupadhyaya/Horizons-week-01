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
  // TODO throw exception if this is not called with new
  this.maze = maze;
}

Maze.validDirections = ['up', 'down', 'left', 'right'];

var directions = {
  left: function(y, x) {
    return [y, x - 1];
  },
  right: function(y, x) {
    return [y, x + 1];
  },
  up: function(y, x) {
    return [y - 1, x];
  },
  down: function(y, x) {
    return [y + 1, x];
  }
};


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


  // return this.maze.map(function(row) {
  //   return row.map(function(cell) {
  //     if (cell === ' ') {
  //       return '_';
  //     }
  //     return cell;
  //   }).join('');
  // }).join('\n');


  return this.maze.map(function(row) {
    return row.map(function(cell) {
      if (cell === " ") {
        return "_";
      }
      return cell;
    }).join("");
  }).join('\n');

}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE

  //find which element in the first array it's in
  //find which element it's in
  // var i = 0,
  //   j = 0;
  // console.log(this.maze);
  // while (i < this.maze.length) {
  //   var currentArray = this.maze[i];
  //   while (j < currentArray.length) {
  //     console.log(i,j, currentArray);
  //
  //     j++;
  //   }
  //   i++;
  // }

  var a = [];
  this.maze.forEach(function(row, i) {
    row.forEach(function(str, j) {
      if (str === 'S') {
        a = [i, j];
      }
    })
  })
  if (a.length != 0) {
    return a;
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
  if (!_.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  // if (!this.maze[column][row]) {
  //   return false;
  // }

  // YOUR CODE HERE

  var travel = directions[direction](row, column);
  // console.log(travel);
  // console.log(this.maze[travel[0]][travel[1]]);
  // console.log(travel)
  if (travel &&
    this.maze[travel[0]] &&
    this.maze[travel[0]][travel[1]] &&
    this.maze[travel[0]][travel[1]] != "X" &&
    this.maze[travel[0]][travel[1]] != "V"
  ) {
    return travel;
  }

  return false;
}

// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  var maze = this.maze;
  var self = this;
  // if (tryMove(row, column, direction)) {
  //
  // }
  //   0   1   2   3   4   5   6
  // ["X","S"," "," "," "," "," "] 0
  // [" ","X"," "," "," "," "," "] 1
  // [" "," ","X"," "," "," ","E"] 2
  // [" "," "," ","X"," "," "," "] 3
  this.returnValue = false;
  traverse(this.getStartPosition());


  function traverse(position) { //pos is an array containing y, x
    var y = position[0];
    var x = position[1];
    console.log("currently at " + maze[y][x]);
    if (maze[y][x] === "E") {
      console.log("match, return true");
      // console.log(self);
      self.returnValue = true;
    } else {
      maze[y][x] = "V";
      if (self.tryMove(y, x, "right")) {
        console.log(directions.right(y, x));
        traverse(directions.right(y, x));
      }
      if (self.tryMove(y, x, "up")) {
        console.log(directions.up(y, x));
        traverse(directions.up(y, x));
      }
      if (self.tryMove(y, x, "down")) {
        console.log(directions.down(y, x));
        traverse(directions.down(y, x));
      }
      if (self.tryMove(y, x, "left")) {
        console.log(directions.left(y, x));
        traverse(directions.left(y, x));
      }
    }
  }

  return this.returnValue;

}
