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
  var maze = this.maze;
  var ret = ''
  //console.log(maze)

  for(var i = 0; i < maze.length; i ++){
    for(var j = 0;  j < maze[i].length; j++){
      if(maze[i][j] === ' ')
        maze[i][j] = '_'
    }
  }

  for(var k = 0; k < maze.length; k ++){
    ret += maze[k].join('');
    if(k+1 !== maze.length){
      ret += '\n'
    }

  }

  return ret

  // Hint: See Array.prototype.join()!
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  var maze = this.maze;
  //console.log(maze)

  for(var i = 0; i < maze.length; i ++){
    for(var j = 0;  j < maze[i].length; j++){
      if(maze[i][j] === 'S')
        return [i, j]
    }
  }

  throw new Error("Maze has no starting point");
}

Maze.prototype.getEndPosition = function() {
  // YOUR CODE HERE
  var maze = this.maze;
  //console.log(maze)

  for(var i = 0; i < maze.length; i ++){
    for(var j = 0;  j < maze[i].length; j++){
      if(maze[i][j] === 'E')
        return [i, j]
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

  var maze = this.maze

//NOT ON BOARD TO START
  if(row < 0 || row >= maze.length || column < 0 || column >= maze[0].length ){
    return false      //not on the board
  }

//CALCULATES NEW POSITION
  var new_location;
  if(direction === 'up'){
    new_location = [row - 1, column]
  }else if(direction === 'down'){
    new_location = [row + 1, column]
  }else if (direction === 'left'){
    new_location = [row, column - 1]
  }else if(direction === 'right'){
    new_location = [row, column + 1]
  }

//MOVES OFF THE BOARD
  if(new_location[0] < 0 || new_location[0] >= maze.length ||
    new_location[1] < 0 || new_location[1] >= maze[0].length ){
    return false
  }

//MOVES INTO WALL
  //console.log( maze[ new_location[0] ] [ new_location[1] ] )
  if(maze[ new_location[0] ] [ new_location[1] ]  === 'X')
    return false;

  return new_location

}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  var maze = this.maze;
  var self = this;

  //get current and end position
  var current = this.getStartPosition();

  //console.log(current)
  var end = this.getEndPosition();
  //console.log(end)

  //stack that holds possible and visited
  var stack = []
  var visited = []
  for(var i = 0; i < maze.length; i++){
    visited[i] = []
    for(var j = 0; j < maze[i].length; j++){
      visited[i][j] = false;
    }
  }

  //console.log(visited)

  //add all possible moves as long as they haven't been visited
  var directions = ['up','down','left','right']

  for(var i = 0; i < directions.length; i++){
    var att = self.tryMove(current[0] , current[1] , directions[i]);
    //if  it equals the end return true
    if(att && att[0] === end[0] && att[1] === end[1]){
      return true
    //otherwise if its not false just push it on stack
    }else if(att){
      stack.push(att)
    }
  }

  //mark the spot you just left as visited
  visited[current[0]][current[1]] = true;

  var count = 0;

  //while the stack isn't empty
  while(stack.length !== 0){
    //pop something off the stack and make that your current
    current = stack.pop();

    //repeat the steps from above to add neighbors and mark current as visited
    for(var i = 0; i < directions.length; i++){
      var att = self.tryMove(current[0] , current[1] , directions[i]);
      //if  it equals the end return true
      if(att && att[0] === end[0] && att[1] === end[1]){
        return true
      //otherwise if its not false just push it on stack
      }else if(att && visited[att[0]][att[1]] === false){
        stack.push(att)
      }
    }
    visited[current[0]][current[1]] = true
  }
  return false
}
