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
    throw "Error"
  }
  this.maze = maze;
};

Maze.validDirections = ['up', 'down', 'left', 'right'];

// Return a string representation of the current maze.
// Empty spaces are represented by underscores '_',
// and new rows are separated by newlines (\n in a string).

// Use this for your logging purposes!

// ex. new Maze(['S', ' ', 'E']).toString() -> "S_E"
// ex. new Maze([[' ', 'E'], [' ', 'S']]).toString() -> "_E\n_S"
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).toString -> "S_E\nXXX"

Maze.prototype.toString = function() {
  var boardBad = this.maze;
  var board = '';
  for (var i=0; i < boardBad.length; i++) {
    var fixed = boardBad[i];

    for (var j=0; j<fixed.length; j++) {
      if (fixed[j] === " ") {
        fixed[j] = "_";
      }
    }

    var rowString = fixed.join('').trim();

    if (boardBad.length > 1 && i !== (boardBad.length - 1)) {
      board = board + rowString + '\n';
    }
    else {
      board += rowString;
    }

  }

  return board;
};

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  var maze = this.maze;
  var pos;

  for (var i = 0; i < maze.length; i++) {
    for (var j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 'S') {
        pos = [i,j];
      }
    }
  }

  if (pos) {
    return pos;
  }
  else {
    throw new Error("Maze has no starting point");
  }
};

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

  var maze = this.maze;

  if (!(maze[row]) || !(maze[row][column])) {
    return false;
  }

  var newPos;

  if (direction === 'up') {
    newPos = [row  - 1, column];
  }
  else if (direction === 'down') {
    newPos = [row + 1, column];
  }
  else if (direction === 'right') {
    newPos = [row, column + 1];
  }
  else {
    newPos = [row, column - 1]
  }

  if (!(maze[newPos[0]]) || !(maze[newPos[0]][newPos[1]]) || maze[newPos[0]][newPos[1]] === 'X') {
    return false;
  }

  return newPos;

};

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.


Maze.prototype.buildGraph = function() {

  var maze = this.maze;
  var graphRep = {};

  for (var i = 0; i < maze.length; i++) {
    for (var j = 0; j < maze[i].length; j++) {

      var name;
      if (maze[i][j] === 'S') {
        name = 'S'
      }
      else if (maze[i][j] === 'E') {
        name = 'E'
      }
      else {
        name = i + ',' + j;
      }


      if (!(graphRep[name])) {
        graphRep[name] = new Set([]);
        //console.log(name);
      }

      var up = [i - 1, j];
      var down = [i + 1, j];
      var right = [i, j + 1];
      var left = [i, j - 1];

      if ((maze[up[0]])) {
        if ((maze[up[0]][up[1]]) && maze[up[0]][up[1]] !== 'X') {
          if (maze[up[0]][up[1]] === 'E') {
            graphRep[name].add(('E'))
          }
          else {
            graphRep[name].add((up[0] + ',' + up[1]))
          }
        }
      }

      if ((maze[down[0]])) {
        if ((maze[down[0]][down[1]]) && maze[down[0]][down[1]] !== 'X') {
          if (maze[down[0]][down[1]] === 'E') {
            graphRep[name].add(('E'))
          }
          else {
            graphRep[name].add((down[0] + ',' + down[1]))
          }
        }
      }

      if ((maze[left[0]])) {
        if ((maze[left[0]][left[1]]) && maze[left[0]][left[1]] !== 'X') {
          if (maze[left[0]][left[1]] === 'E') {
            graphRep[name].add(('E'))
          }
          else {
            graphRep[name].add((left[0] + ',' + left[1]))
          }
        }
      }

      if ((maze[right[0]])) {
        if ((maze[right[0]][right[1]]) && maze[right[0]][right[1]] !== 'X') {
          if (maze[right[0]][right[1]] === 'E') {
            graphRep[name].add(('E'))
          }
          else {
            graphRep[name].add((right[0] + ',' + right[1]))
          }
        }
      }
      //console.log(graphRep[name]);

    }
  }
  console.log(graphRep);
  return graphRep;
};



Maze.prototype.isSolvable = function() {
  //var maze = this.maze;
  var graphRep = this.buildGraph();

  var nodes = Object.keys(graphRep);

  var paths = {};

  nodes.forEach(function(node) {
    paths[node] = false;
  });

  paths['S'] = true;

  var Q = [];
  Q.unshift('S');

  while (Q.length > 0) {

    var j = Q.shift();

    graphRep[j].forEach(function(nbr) {
      if (paths[nbr] === false) {
        paths[nbr] = true;
        Q.push(nbr);
      }
    })

  }
  console.log("here",paths);
  return paths['E'];


};
