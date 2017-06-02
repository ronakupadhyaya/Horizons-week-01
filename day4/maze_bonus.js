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
Maze.prototype.getShortestPath = function() {
  var object = {};
  var start = this.getStartPosition();
  var end = this.getEndPosition().join(',');
  object[start.join(',')] = [];
  debugger;
  while (!object[end]) {
    for (var key in object) {
      var neighbors = false
      var temp = key.split(',');
      temp[0] = parseInt(temp[0]);
      temp[1] = parseInt(temp[1]);
      var row = temp[0];
      var column = temp[1];
      if (this.tryMove(row, column, 'up')) {
        var tempValue = object[key].push('up');
        row = temp[0] - 1;
        object[temp.join(',')] = tempValue;
        delete object[key];
        neighbors = true;
      }
      if (this.tryMove(row, column, 'down')) {
        var tempValue = object[key].push('down');
        row = temp[0] + 1;
        object[temp.join(',')] = tempValue;
        delete object[key];
        neighbors = true;
      }
      if (this.tryMove(row, column, 'left')) {
        var tempValue = object[key].push('left');
        column = temp[1] - 1;
        object[temp.join(',')] = tempValue;
        delete object[key];
        neighbors = true;
      }
      if (this.tryMove(row, column, 'right')) {
        var tempValue = object[key].push('right');
        column = temp[1] + 1;
        object[temp.join(',')] = tempValue;
        delete object[key];
        neighbors = true;
      }
      if (!neighbors) {
        delete object[key];
      }
    }
    if (_.keys([]).length === 0) {
      return [];
    }
  }
  return object[end];
}



Maze.prototype.getEndPosition = function() {
  for (var i = 0; i < this.maze.length; i++) {
    for (var j = 0; j < this.maze[i].length; j++) {
      if (this.maze[i][j] === 'E') {
        return [i , j];
      }
    }
  }
  return false;
}

// Maze.prototype.checkAdjacent = function(row, column, mayz) {
//   //debugger;
//   //console.log(mayz.maze)
//   console.log('row', row, 'column', column)
//
//   if (mayz.maze[row][column] === 'E') {
//     return true;
//   }
//   var newMaze = mayz
//
//   if (newMaze.tryMove(row, column, 'up')) {
//     newMaze.maze[row][column] = 'X'
//     if (newMaze.checkAdjacent(row - 1, column, newMaze)) {
//       return true;
//     }
//   }
//
//   if (newMaze.tryMove(row, column, 'down')) {
//     newMaze.maze[row][column] = 'X'
//     if (newMaze.checkAdjacent(row + 1, column, newMaze)) {
//       return true;
//     }
//   }
//   if (newMaze.tryMove(row, column, 'left')) {
//     newMaze.maze[row][column] = 'X'
//     if (newMaze.checkAdjacent(row, column - 1, newMaze)) {
//       return true;
//     }
//   }
//   if (newMaze.tryMove(row, column, 'right')) {
//     newMaze.maze[row][column] = 'X'
//     if (newMaze.checkAdjacent(row, column + 1, newMaze)) {
//       return true;
//     }
//   }
// }
//
// Maze.prototype.isSolvable = function() {
//   var startPos = this.getStartPosition();
//   // var initArray = this.maze;
//
//   if (this.checkAdjacent(startPos[0], startPos[1], this)) {
//     return true;
//   } else {
//     return false;
//   };
// }
