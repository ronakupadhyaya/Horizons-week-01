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
  // FIRST ATTEMPT!!!
  // for (var i =0; i<wallPosition.length;i++){
  //   this.maze.splice(wallPosition[i], 0, '\n')
  // }
  // console.log(this.maze)

  // for (var i=0; i<this.maze.length; i++){
  //   this.maze[i].push("\n")
  // }
  // var mazeString = _.map(this.maze,function(item){
  //                         return _.map(item,function(x){
  //                           if(x=== ' '){
  //                             return '_'
  //                           }else{
  //                             return x
  //                           }
  //                         }).join('')
  // })
  // var mazeString2 = mazeString.join('')
  // console.log(mazeString2);
  // return mazeString2;

  var mazeString = _.map(this.maze,function(item){
    return _.map(item,function(x){
      if(x=== ' '){
        return '_'
      }else{
        return x
      }
    }).join('')
  })
  var mazeString2 = mazeString.join('\n')
  console.log(mazeString2);
  return mazeString2;

  // Hint: See Array.prototype.join()!
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  var position = [];
  for (var i =0; i<this.maze.length; i++){
    for (var j= 0; j< this.maze[i].length; j++){
      if(this.maze[i][j] === 'S'){
        return [i,j];
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

Maze.prototype.checkinBounds = function (row, column){
  if(row<this.maze.length && row >=0
    && column<this.maze[0].length && column >=0){
      return true;
    } else {
      return false;
    }
  }
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
    //Validity
    if(!this.checkinBounds(row,column)) {
      return false;
    }
    // Directions
    var down = function (){row +=1}
    var up = function (){row -=1}
    var right = function (){column +=1}
    var left = function (){column -=1}

    if(direction === 'down'){
      down()
    }
    if(direction === 'up'){
      up()
    }
    if(direction === 'right'){
      right()
    }
    if(direction === 'left'){
      left()
    }

    // later check if new row,column is in bounds
    if(!this.checkinBounds(row,column)){
      return false;
    }

    if(this.maze[row][column] === 'X'){
      return false;
    }
    return [row,column]
  }
  //
  // function sum*({
  //   return
  //   Array.prototype.slice.call(arguments).reduce(function(a,b))
  //   {return a+b;})
  // >>>>>>> Stashed changes
  // }
  //
  // bind.apply explained
  // partial(sum,1,2)(2,3) --> sum(1,2,2,3)
  // var boundSum = sum.bind(null,1,2)
  // boundSum(5) --> 8
  //
  // partial (sum,1,2) ---> sum.bind(null,1,2) --> these two should be equal
  // function partial (){
  //   var fn = arguments [0]
  //   arguments[0] = nullreturn
  //   fn.bind.apply (fn, arguments)
  // }

  // Bonus!
  // Write a method that returns true if this maze is solvable.
  // A maze is solvable if there exists a path from the Starting Point
  // to the Ending Point.
  //
  // No diagonal moves are allowed.
  Maze.prototype.isSolvable = function() {
    var start = this.getStartPosition();
    var q = [start];  //queue. put start inside to kick off path

    //making a  lookup array to avoid repeats. 2D array with outer array as row
    var height = this.maze.length; //this.maze is outer array, #rows
    var width = this.maze[0].length  //number of columns
    var lookupMaze=[] //make array of size height, constructor
    for (var i=0;i<height;i++){
      lookupMaze.push(new Array(width).fill(false));
    }

    var startRow= start[0]
    var startCol = start[1]
    lookupMaze[startRow][startCol]= true

    var currentNode;

    while (q.length > 0) {  //queue not empty. for any given node
      //shift takes something out of front and modify array. inefficient
      //b/c have to modify alll keys to pop something out the front
      currentNode = q.shift(); //q.pop would make it dfs 
      // [row,column]; currentNode at all times
      var currentRow = currentNode[0];
      var currentCol = currentNode[1];
      var currentLetter = this.maze[currentRow][currentCol]

      if (currentLetter === "E") {
        return true;
      }

      for (var i=0; i<Maze.validDirections.length; i++) {
        var currentDir = Maze.validDirections[i];  //loop through and check all 4 directions

        var move = this.tryMove(currentRow, currentCol, currentDir); // if false, do nothing
        var moveRow=[0]
        var moveCol=[1]
                                                              //and not add anything to q
        if (move !== false && !lookupMaze[moveRow][moveCol]) {
          q.push(move)
          lookupMaze[moveRow][moveCol] = true;
        }
        // now add checking stuff
        //initialize array with same dimensions as original and start with all falses
      }
    }
    return false; // reached when while completes, dont find E
  }
