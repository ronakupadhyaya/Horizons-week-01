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
// ex. new Maze([['S', 'E']]) represents a trivial solvable maze
// ex. new Maze([['S', 'X', 'E']]) represents a trivial unsolvable maze
window.Maze = function(maze) {
  // TODO throw exception if this is not called with new
  if (this.constructor == Maze)
    this.maze = maze;
  else {
    throw "Not called with new";
  }

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
  var arr = this.maze.slice();
  var str='';
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++){
      if(arr[i][j]===' ')
        arr[i][j]='_';
    }
    str=str+arr[i].join('')+'\n';
  }
  return str.substring(0,str.length-1);

}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  for(var i = 0; i < this.maze.length; i++){
    for(var j = 0; j < this.maze[i].length; j++){
      if(this.maze[i][j]==='S')
        return [i,j];
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
  if(row < 0 || row > this.maze.length-1 || column < 0 || column > this.maze[0].length-1){
    return false;
  }

  //up
  if(direction === 'up'){
    if(row === 0)
      return false;
    else if(this.maze[row-1][column] === 'X')
      return false;
    else
      return [row-1,column];

  }
  //down
  if(direction === 'down'){
    if(row === this.maze.length-1)
      return false;
    else if(this.maze[row+1][column] === 'X')
      return false;
    else
      return [row+1,column];

  }
  //left
  if(direction === 'left'){
    if(column === 0)
      return false;
    else if(this.maze[row][column-1] === 'X')
      return false;
    else
      return [row,column-1];

  }
  //right
  if(direction === 'right'){
    if(column === this.maze[0].length-1)
      return false;
    else if(this.maze[row][column+1] === 'X')
      return false;
    else
      return [row,column+1];

  }else {
    throw "Exception";
  }

}
// if (tryMove(curR,CurC, 'u')){
//   if (tryMove(curR,CurC, 'u') === E){
//     return true;
//   } return
// }
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  var startArr = this.getStartPosition();
  var copyArr = this.maze.slice();

  var self = this;
  var mazeSolver = _.memoize(function fn(curArr){
    //console.log("In:",curArr[0],curArr[1]);
    var arr = [self.tryMove(curArr[0],curArr[1],'up'),self.tryMove(curArr[0],curArr[1],'down'),self.tryMove(curArr[0],curArr[1],'left'),self.tryMove(curArr[0],curArr[1],'right')];
    console.log("Arr:",arr);
    for (var i = 0; i < arr.length; i++){
      //console.log(arr.length);
      console.log(i,arr[i]);
      if(arr[i]){
        if(this.maze[arr[i][0]][arr[i][1]] === 'E'){
          // console.log(arr[i]);
          return true;


        }
      } else{
        arr.splice(i,1);
        i--;
      }
    }
    // console.log(arr);
    for( var i = 0; i < arr.length; i++){
      // console.log(i,arr);
      //pastCoord.push(arr[i]);

      // console.log(arr[i]);
      if(mazeSolver(arr[i])){
        // console.log('in');
        this.maze[arr[i][0]][arr[i][1]] = 'X';
        return true;
      }
    }
    return false;

  });


  console.log(this.maze);
  return mazeSolver(startArr);
  // var mazeSolver = _.memoize(function(curR,curC){
  //   //console.log("In:",curR,curC);
  //   var arr = [this.tryMove(curR,curC,'up'),this.tryMove(curR,curC,'down'),this.tryMove(curR,curC,'left'),this.tryMove(curR,curC,'right')];
  //   //console.log("Arr:",arr);
  //   for (var i = 0; i < arr.length; i++){
  //     //console.log(arr.length);
  //     if(arr[i]){
  //       if(this.maze[arr[i][0]][arr[i][1]] === 'E'){
  //         //console.log(arr[i]);
  //         return true;
  //
  //
  //       }
  //     } else{
  //       arr.splice(i,1);
  //       i--;
  //     }
  //   }
  //   //console.log(arr);
  //   for( var i = 0; i < arr.length; i++){
  //     //console.log(i,arr);
  //     if(mazeSolver(arr[i][0],arr[i][1])){
  //       return true;
  //     }
  //   }
  //   return false;
  //
  // }.bind(this));
  // return mazeSolver(startArr[0],startArr[1]);

}
