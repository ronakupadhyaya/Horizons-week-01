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
  /*if (this.maze.length === 1){
    string = this.maze[0].join("");
  }
*/
  var copyMaze = this.maze;
  for(var k = 0; k < copyMaze.length; k++){
    for (var l = 0; l <copyMaze[k].length; l++){
      if(copyMaze[k][l] === " "){
        copyMaze[k][l] = "_";
      }
    }
  }


  var string;
  for(var i = 0; i < copyMaze.length-1; i++){
    copyMaze[i][copyMaze[i].length] = "\n";
    //console.log(this.maze[i])
  }
  var rowArr = [];
  for(var i = 0; i < copyMaze.length; i++){
    rowArr.push(copyMaze[i].join(''));
  }
  //console.log(rowArr);
  string = rowArr.join("");

  return string;
  //console.log(string);


  /*for(var k = 0; k < this.maze.length; k++){
    for (var l = 0; l <this.maze[k].length; l++){
      if(this.maze[k][l] === " "){
        this.maze[k][l] = "_";
      }
    }
  }


  var string;
  for(var i = 0; i < this.maze.length-1; i++){
    this.maze[i][this.maze[i].length] = "\n";
    //console.log(this.maze[i])
  }
  var rowArr = [];
  for(var i = 0; i < this.maze.length; i++){
    rowArr.push(this.maze[i].join(''));
  }
  //console.log(rowArr);
  string = rowArr.join("");

  return string;
  //console.log(string);*/
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  for(var i = 0; i < this.maze.length; i++){
    for (var j = 0; j <this.maze[i].length; j++){
      if (this.maze[i][j] === 'S'){
        return [i,j]
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

  //check if on board
  if(row >= this.maze.length || column >= this.maze[0].length){
    return false;
  }
  //check if movement remainson board
  var newRow = row;
  var newColumn = column;

  if(direction === 'up'){
    if (newRow === 0){
      return false;
    } else{
      newRow--;
    }
  } else if (direction === 'down'){
    newRow++;
  } else if (direction === 'right'){
    newColumn++;
  } else{
    if (newColumn === 0){
      return false;
    } else{
      newColumn--;
    }
  }

  if(newRow >= this.maze.length || newColumn >= this.maze[0].length){
    return false;
  }
  //check if movement is valid (or on wall)
  if (this.maze[newRow][newColumn]==='X'){
    return false;
  }

  //return new location
  return [newRow,newColumn];


}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
}
