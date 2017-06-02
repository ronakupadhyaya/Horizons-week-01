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
  var mazeStr = "";
  var mazeArr = [];
  for (var i = 0; i < this.maze.length; i++) {
    for (var j = 0; j < this.maze[i].length; j++) {
      var tempStr = this.maze[i][j].replace(/\s/, "_");
      this.maze[i][j] = tempStr;
    }
    mazeArr.push(this.maze[i].join(""));
  }
  mazeStr = mazeArr.join("\n");
  return mazeStr;

  // Hint: See Array.prototype.join()!
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  var startPos = [];
  for (var i = 0; i < this.maze.length; i++) {
    for (var j = 0; j < this.maze[i].length; j++) {
      if (this.maze[i][j] === "S") {
        startPos = [i, j];
      }
    }
  }
  if (startPos.length > 0) {
    return startPos;
  } else {
    throw new Error("Maze has no starting point");
  }
}

Maze.prototype.getEndPosition = function() {
  var startPos = [];
  for (var i = 0; i < this.maze.length; i++) {
    for (var j = 0; j < this.maze[i].length; j++) {
      if (this.maze[i][j] === "E") {
        startPos = [i, j];
      }
    }
  }
  if (startPos.length > 0) {
    return startPos;
  } else {
    throw new Error("Maze has no ending point");
  }
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

Maze.move = {
  "left": function(row, col) {
    return [row, col - 1]
  },
  "up": function(row, col) {
    return [row + 1, col]
  },
  "right": function(row, col) {
    return [row, col + 1]
  },
  "down": function(row, col) {
    return [row - 1, col]
  }
}

Maze.prototype.getContent = function(arrPos) {
  return this.maze(arrPos[0], arrPos[1]);
}

Maze.prototype.tryMove = function(row, col, direction) {
  // throw if the direction passed in is invalid
  if (!_.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  // return false if the starting position is not on the board
  if (row < 0 || col < 0 || row > this.maze.length - 1 || col > this.maze[0].length - 1) {
    return false;
  }
  // Array of position after move
  var newPos = Maze.move[direction](row, col);
  //console.log("old position", [row, col], "new position", newPos);
  if (newPos[0] < 0 || newPos[1] < 0 || newPos[0] > this.maze.length - 1 || newPos[1] > this.maze[0].length - 1) {
    return false;
  }
  var newPosContent = this.maze[newPos[0]][newPos[1]] || "X";
  //console.log(this.maze[newPos[0]][newPos[1]]);
  //console.log(newPosContent);
  if (newPosContent === "X") {
    return false;
  }
  return newPos;
}
Maze.prototype.posToStr = function(position) {
  return position.join(",");
}

Maze.prototype.arrIndex = function(arr, bigArr) {
  var bigAssInd = -1;
  for (var i = 0; i < bigArr.length; i++) {
    if (posToStr(arr) === posToStr(bigArr[i])) bigAssInd = i;
  }
  return bigAssInd;
}
// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  var startPos = this.getStartPosition(); // starting array
  var endPos = this.getEndPosition(); //ending array
  var blankSpace = []; //available spaces to move
  var history = []; // make sure you don't go backwards
  var currentPos = startPos; // starting position and current position


  // Add currentposition to history
  history.push(currentPos);


  // Adding all the blank spaces in the maze to the blackSpace array
  for (var i = 0; i < this.maze.length; i++) {
    for (var j = 0; j < this.maze[0].length; j++) {
      if (this.maze[i][j] === " ") {
        blankSpace.push([i, j]);
      }
    }
  }

  // walking through the maze
  while (arrIndex(currentPos, [endPos]) < 0) {
    // Positions to test

    var positionsToTest = []
    positionsToTest.push([currentPos[0] + 1, currentPos[1]]); //multi-dimentional array
    positionsToTest.push([currentPos[0] - 1, currentPos[1]]);
    positionsToTest.push([currentPos[0], currentPos[1] + 1]);
    positionsToTest.push([currentPos[0], currentPos[1] - 1]);



    // if there are no more available positions to move in this path go backwards and try a new path
    for (var i = 0; i < positionsToTest.length; i++) {
      var index = arrIndex(positionsToTest[i], blankSpace);
      var histIndex = arrIndex(positionsToTest[i], history);
      if (index < 0 && histIndex > -1) {
        blankSpace.push(history.pop());
        break;
      }
    }

    //checking through to see if the positions to test are possible
    for (var i = 0; i < positionsToTest.length; i++) {
      var index = arrIndex(positionsToTest[i], blankSpace);
      var histIndex = arrIndex(positionsToTest[i], history);
      if (index > -1 && histIndex < 0) {
        currentPos = positionsToTest[i];
        history.push(blankSpace.splice(index, 1));
        break;
      }
    }

    // if there are not valid positions to move return false
    var noMoreCase =
      for (var i = 0; i < positionsToTest.length; i++) {
        var index = arrIndex(positionsToTest[i], blankSpace);
        var histIndex = arrIndex(positionsToTest[i], history);
        if (index < 0 && histIndex < 0) {
          return false;
        }
      }




    // if there are no possible position to move

    if (positionsToTest !== endPos && )
  }
  // You win case
  if (arrIndex(currentPos, [endPos]) > -1) {
    return true
  }

}

// convert currentPos to string

// find if the currentPos, with one side incremented, is inside the blankSpace
// TODO repeat for each increment
// var pointInHist = -1;
// for (var i = 0; i < blankSpace.length; i++) {
//   if(posToStr([currentPos[0] + 1 , currentPos[1]]) === posToStr(blankSpace[i])){
//     if(pointInHist === -1){
//       pointInHist++;
//       history.push(blankSpace[i]);
//       currentPos = blankSpace[i];
//       break;
//     } else if(posToStr([currentPos[0] + 1 , currentPos[1]]) !== posToStr(history[pointInHist])){
//       history.push(blankSpace[i]);
//       currentPos = blankSpace[i];
//     }
//   }





//console.log(blankSpace);
