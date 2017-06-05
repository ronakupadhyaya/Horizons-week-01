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
  var mazer = this.maze;
  var arr2 = [];
  for (var i = 0; i <mazer.length; i++) {
    var arr = [];
    for (var j = 0; j<mazer[0].length; j++) {
      if (mazer[i][j] === ' '){
        arr.push('_');
      }else{
        arr.push(mazer[i][j]);
      }
    }
    arr2.push(arr.join(''));
  }
  return arr2.join('\n');
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  var mymaze = this.maze;
  for (var row = 0; row < mymaze.length; row++) {
    for (var col = 0; col < mymaze[0].length; col++) {
      if(mymaze[row][col] === 'S'){
        return [row,col];
      }
      //console.log(mymaze[row][col]);
    }
  }
  throw new Error("Maze has no starting point");
}

//ex. new Maze([['S', 'E']]).tryMove(0, 0, 'leftright') -> Throws error: 'leftright' is not a valid direction
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


Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  var mazeobj = this;
  var mymaze = this.maze;
  var maxRow = mymaze.length - 1;
  var maxCol = mymaze[0].length - 1;
  var start;
  try{
    mazeobj.getStartPosition();
    //console.log("valid start posotion for",mymaze);
  } catch(thrownerror) {
    //console.log("invalid starting position", thrownerror);
    return false;
  }

  if(maxRow<row || maxCol<column){
    return false;
  }

  var desiredPosition;
  if(direction === "up" && row!==0){
    desiredPosition = [row-1,column];
  }else if(direction === "down" && row!== maxRow){
    desiredPosition = [row+1,column];
  }else if(direction === "left" && column!==0){
    desiredPosition = [row,column-1];
  }else if(direction === "right" && column!==maxCol){
    desiredPosition = [row,column+1];
  }else{
    return false;
  }
  //mymaze[row][col];
  var nextSpot = mymaze[desiredPosition[0]][desiredPosition[1]];
  if(nextSpot === 'X'){//} || desiredPosition== undefined){
    //console.log("apparently theres an x in thsi spot fuck")
    return false;
  }
  return desiredPosition;

}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.

window.MazeCopy = function(maze) {
  this.maze = maze;
}



Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
  var mazeobj = this;
  var mymaze = this.maze;
  var visited =[];
  var paths = [];
  var next = [];
  try{
    var start = mazeobj.getStartPosition();
    //console.log(start);
  } catch(thrownerror) {
    //console.log("invalid starting position", thrownerror);
    return false;
  }
  next.push(start);
  while(next.length>0){
    var current = next.pop();
    visited.push(current.toString());
    //console.log(visited);
    var currentPosition = mymaze[current[0]][current[1]];
    if(currentPosition === 'E'){
      paths.push(1);
      return true;
    }else if(currentPosition == 'X'){
      continue;
    }

    var tryup = mazeobj.tryMove(current[0],current[1],'up');
    //console.log();
    if(!! tryup && visited.indexOf(tryup.toString())===-1){
      console.log(tryup);
      next.push(tryup);
    }
    var trydown = mazeobj.tryMove(current[0],current[1],'down');
    if(!!trydown && visited.indexOf(trydown.toString())===-1){
      next.push(trydown);
    }

    var tryleft = mazeobj.tryMove(current[0],current[1],'left');
    if(!!tryleft && visited.indexOf(tryleft.toString())===-1){
      next.push(tryleft);
    }

    var tryright = mazeobj.tryMove(current[0],current[1],'right');
    if(!!tryright && visited.indexOf(tryright.toString())===-1){
      next.push(tryright);
    }

  }
  return false;
  //var currentPosition = mymaze[start[0]][start[1]];


  // var mazecpy = new MazeCopy(mymaze);
  //
  // return mazeobj.solveMaze(mazeobj,mazecpy,start[0],start[1]);

}


// Maze.prototype.isSolvable = function() {
//   // YOUR CODE HERE
//   var mazeobj = this;
//   var mymaze = this.maze;
//   try{
//     var start = mazeobj.getStartPosition();
//     //console.log(start);
//   } catch(thrownerror) {
//     //console.log("invalid starting position", thrownerror);
//     return false;
//   }
//   var mazecpy = new MazeCopy(mymaze);
//
//   return mazeobj.solveMaze(mazeobj,mazecpy,start[0],start[1]);
//
// }
// if(mazeobj == undefined){
//   console.log("maze is undefined, returning false");
//   return false;
// }
// var mymaze = mazeobj.maze;
// var mazecopy = mazeC.maze;
// var currentRow = mymaze[row];//[col];
// if(currentRow){
//   var move = mymaze[row][col]
//   //console.log(move);
// }
// //console.log(move);
// if(move == undefined){
//   //console.log("row and column location doesnt exist");
//   console.log("move is undefined, returning false");
//   return false;
// }
// //console.log(mymaze[row][col]);
// if(move === 'E'){
//   return true;
// } else if(move === 'X'){
//   console.log("reached a wall, returning false");
//   return false;
// } else if(move === 'S' || move === ' '){
//   //mark spot as visited
//   mazecopy[row][col] = "visited";
//
//
//   var tryup = mazeobj.tryMove(row,col,'up');
//   //console.log("CHECKING FOR VISITED",mazecopy[row+1][col]);
//
//   if(tryup){// && mazecopy[row-1][col] !== "visited"){
//     console.log("up entered");// was not visit4ed");
//     mazecopy[row-1][col] = "visited";
//     var moveUp,moveDown,moveLeft,moveRight;
//     moveUp = mazeobj.solveMaze(mazeobj,mazecopy,tryup[0],tryup[1]);
//   }
//
//
//   var trydown = mazeobj.tryMove(row,col,'down');
//   if(trydown && mazecopy[row+1][col] !== "visited"){
//     console.log("down was not visit4ed");
//     mazecopy[row+1][col] = "visited";
//     moveDown = mazeobj.solveMaze(mazeobj,mazecopy,trydown[0],trydown[1]);//mazeobj.tryMove(row,col,'down');
//   }
//
//
//   var tryleft = mazeobj.tryMove(row,col,'left');
//   if(tryleft && mazecopy[row][col-1] !== "visited"){
//     console.log("left was not visit4ed");
//     mazecopy[row][col-1] = "visited";
//     moveLeft = mazeobj.solveMaze(mazeobj,mazecopy,tryleft[0],tryleft[1]);//mazeobj.tryMove(row,col,'left');
//   }
//
//
//   var tryright = mazeobj.tryMove(row,col,'right');
//   if(tryright && mazecopy[row][col+1] !== "visited"){
//     console.log("right was not visit4ed");
//     mazecopy[row][col+1] = "visited";
//     moveRight = mazeobj.solveMaze(mazeobj,mazecopy,tryright[0],tryright[1]);//mazeobj.tryMove(row,col,'right');
//   }
//
//   //console.log(moveUp,moveDown,moveLeft,moveRight);
//   if(!!moveUp || !!moveDown || !!moveLeft || !!moveRight){
//     return true;
//   }
// }
// console.log("reached end of function returning false");
// return false;
