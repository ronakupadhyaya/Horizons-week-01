"use strict";

// Write a method (i.e. a function) that returns the shortest path through a
// maze. This function should return an array of strings containing 'right',
// 'left', 'up' or 'down'.  If there is no path through the maze it should
// return empty array.
//
// There may be multiple shortest paths in a maze, you only need to find one of
// them.
//
// ex. new Maze([['S', 'X', 'E']]).getShortestPath() -> [], not solvable
// ex. new Maze([['S', 'E']]).getShortestPath() -> ['right']
// ex. new Maze([['E', ' '], ['X', ' '], ['S', ' ']]).getShortestPath() -> ['right', 'up', 'up', 'left']
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
  var rows = [];
  for (var i = 0; i < this.maze.length; i++){
      rows.push(this.maze[i].join(''));
  }
  rows = rows.join('\n');
  var s = '';
  for (var i = 0; i < rows.length; i++){
    if (rows[i] === ' ')
      s+= '_';
    else
      s+=rows[i]
  }
  return s;
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  for (var i = 0; i < this.maze.length; i++){
    for (var j = 0; j < this.maze[0].length; j++){
      if (this.maze[i][j] === 'S')
        return [i, j];
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
  var maze = this.maze;

  // YOUR CODE HERE
  var startingPosition = [row, column];
  var isWall = function(position){
    return (maze[position[0]][position[1]] === 'X');
  }
  var isOnBoard = function(position){
    return !(position[0] < 0 || position[0] >= maze.length || position[1] < 0 || position[1] >= maze[0].length)
  }

  var makeMove = function(startingPosition, direction){
    var r = startingPosition[0];
    var c = startingPosition[1];
    switch(direction){
      case 'up':    r--;
                    break;
      case 'down':  r++;
                    break;
      case 'right': c++;
                    break;
      case 'left':  c--;
                    break;
      default:      break;
    }
    return [r, c];
  };



  var newPosition = makeMove(startingPosition, direction);


  if(!isOnBoard(startingPosition) || !isOnBoard(newPosition) || isWall(newPosition))
    return false;
  else
    return newPosition;

}

var isWall = function(position, maze){
  return (maze[position[0]][position[1]] === 'X');
}
var isOnBoard = function(position, maze){
  return !(position[0] < 0 || position[0] >= maze.length || position[1] < 0 || position[1] >= maze[0].length)
}

var makeMove = function(startingPosition, direction){
  var r = startingPosition[0];
  var c = startingPosition[1];
  switch(direction){
    case 'up':    r--;
                  break;
    case 'down':  r++;
                  break;
    case 'right': c++;
                  break;
    case 'left':  c--;
                  break;
    default:      break;
  }
  return [r, c];
};

var stopBackTrack = function(direction){
  switch(direction){
    case 'up':    return 'down';
                  break;
    case 'down':  return 'up';
                  break;
    case 'right': return 'left';
                  break;
    case 'left':  return 'right';
                  break;
    default:      return undefined;
  }
}

var checkAvailableDirections = function(position, lastMove, maze){
  var directions = []
  for(var i =0; i < Maze.validDirections.length; i++){
    if(maze.tryMove(position[0], position[1], Maze.validDirections[i]) && stopBackTrack(lastMove) !== Maze.validDirections[i]){
      directions.push(Maze.validDirections[i])
    }
  }
  return directions;
}
// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
function searchParentNodes(startingObj, maze){
  var startingPoint = maze.getStartPosition();

  var returnArray = [];
  var currentCoordinates = startingObj["coordinates"];

  while(_.isEqual(currentCoordinates, startingPoint) === false){
    //traverse tree.
    returnArray.push(startingObj["lastMove"]);

    currentCoordinates = startingObj["parent"]["coordinates"];
    startingObj = startingObj["parent"];

  }
  return returnArray;
}

function findSubArray(array, target){
  var targetString = target.toString();
  for(var i =0; i <array.length;i++){
    if(targetString === array[i].toString()) break;
  }

  if(i >= array.length){
    return -1;
  } else{
    return i;
  }
}


Maze.prototype.isSolvable = function() {
  // YOUR CODE HERE
    //{coordinates: [3,0], value: 'S',parent: '', children : [{coordinate: [3,1], value:'_', parent[3,0] children: []}, {...}]}
  var maze = new Maze(this.maze);
  var startingPoint = this.getStartPosition();
  var startingObj = {
    coordinates: startingPoint,
    value: 'S',
    parent: {},
    children: [],
    lastMove: null
  };
  var cacheArray = [startingPoint];
  var storePathArray = [];
  function generateRecursiveTree(startingObj, maze){
    //check which directions are possible
    //startingPoint = [row, column] //[0,1]
    // debugger;
    var validDirections = ['left', 'up', 'down', 'right'];
    // var parentNodes = searchParentNodes(startingObj, maze);

    for(var i =0; i < validDirections.length; i++){
      var moveCoordinates = maze.tryMove(startingObj["coordinates"][0], startingObj["coordinates"][1], validDirections[i]);

      //check for all parents of parents.
      //if moveCoordinates is a subarray and findSubarray gives you a null value;
      if(moveCoordinates && findSubArray(cacheArray, moveCoordinates) ===-1){
        //populate childArray with obj
        var newChildObj = {coordinates: moveCoordinates, value: maze.maze[moveCoordinates[0]][moveCoordinates[1]], parent: startingObj,children: [], lastMove: validDirections[i]}
        // console.log(startingObj.children);
        cacheArray.push(moveCoordinates);
        startingObj.children.push(newChildObj);
        if(newChildObj["value"] === 'E'){
          //if you can't move then break? otherwise generate new Tree;
          var routes = searchParentNodes(newChildObj, maze);
          storePathArray.push(routes);
          // console.log(maze, "what", storePathArray);
          return true;
        }
      }
    }
    if(startingObj.children.length === 0){
      //can't move anywhere so return null;
      return null;
    } else{
      //recursively go throuh every thing in startingObj.children;
      for(var i = 0; i < startingObj.children.length; i++){
        if(generateRecursiveTree(startingObj.children[i], maze)){
          return true;
        };
      }
    }

  }
  var hierachalTree = generateRecursiveTree(startingObj, maze);

  if(hierachalTree){
    return storePathArray[0].reverse();
  }
  return false;
}


Maze.prototype.getShortestPath = function() {
  // YOUR CODE HERE
  var maze = new Maze(this.maze);
  if(!maze.isSolvable()){
    return [];
  } else{
    console.log(maze.isSolvable())
    return maze.isSolvable();
  }
}
