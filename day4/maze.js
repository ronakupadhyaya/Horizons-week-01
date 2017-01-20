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
  if (this instanceof Maze) this.maze = maze;
  else throw 'exception';
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
  var str = '';
  for(var i = 0; i < this.maze.length; i++){
    for(var j = 0; j < this.maze[i].length; j++){
      this.maze[i][j] === ' ' ? str += '_' : str += this.maze[i][j];
    }
    if(i !== this.maze.length- 1) str += '\n';
  }
  return str;
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  for(var i = 0; i < this.maze.length; i++){
    if(this.maze[i].indexOf('S') !== -1){
      return[i, this.maze[i].indexOf('S')];
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

  // YOUR CODE HERE
  function helper(row, column, mazes){

    if(row < 0 || column < 0 || row > mazes.length - 1 ||
       column > mazes[0].length -1 || mazes[row][column] === 'X'){
      return false;
    }
    return true;
  }
  var startPosition = this.getStartPosition();
  if(!helper(startPosition[0], startPosition[1], this.maze)){
    return false;
  }
  if(direction === 'up') {
    if(helper(row-1, column, this.maze)){
      row -= 1;
      return [row, column];
    }
  }
  if(direction === 'down') {
    if(helper(row+1, column, this.maze)){
      row += 1;
      return [row, column];
    }
  }
  if(direction === 'right') {
    if(helper(row, column+1, this.maze)){
      column+= 1;
      return [row, column];
    }
  }
  if(direction === 'left') {
    if(helper(row, column-1, this.maze)){
      column -= 1;
      return [row, column];
    }
  }
  return false;
}

// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
//   console.log(this.maze)
// }
  var startPoint = this.getStartPosition();
  // console.log(startPoint);
  var newArray = [];
  for (var i = 0; i < this.maze.length; i++){
    var tempArr = [];
    for (var j = 0; j < this.maze[i].length; j++){
      if(this.maze[i][j] === 'S'|| this.maze[i][j] === 'E' || this.maze[i][j] === 'X'){
        tempArr.push(true);
      } else{
        tempArr.push(false);
      }
    }
    newArray.push(tempArr);

  }
  // console.log(newArray);
  var self = this;
  var works = false;

  function recursiveHelper(startRow, startColumn, maze){
    // var counter1 = 0;
    // for(var k =0; k < maze.length; k++){
    //   for(var l = 0; l < maze[k].length; l++){
    //     if(maze[k][l] === ' '){
    //       counter1++;
    //     }
    //   }
    // }
    if(maze[startRow][startColumn] === 'E'){
      return true;
    }
    // var counter = 0;
    // for(var k =0; k < newArray.length; k++){
    //   for(var l = 0; l < newArray[k].length; l++){
    //     if(newArray[k][l] === true){
    //       counter++;
    //     }
    //   }
    // }
    // if(counter === counter1) return false;
    if (self.tryMove(startRow, startColumn,'up')){

      newArray[startRow-1][startColumn] = true;
      works = works || recursiveHelper(startRow -1, startColumn, maze);
    }
    if (self.tryMove(startRow, startColumn,'down')){

      newArray[startRow+1][startColumn] = true;
      works = works || recursiveHelper(startRow +1, startColumn, maze);
    }
    if (self.tryMove(startRow, startColumn,'right')){

      newArray[startRow][startColumn+1] = true;
      works = works || recursiveHelper(startRow , startColumn+1, maze);
    }
    if (self.tryMove(startRow, startColumn,'left')){

      newArray[startRow][startColumn-1] = true;
      works = works || recursiveHelper(startRow, startColumn-1, maze);
    }
    return false;
  }
  var a = recursiveHelper(startPoint[0],startPoint[1], this.maze);
  return works;
}
