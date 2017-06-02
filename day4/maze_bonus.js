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
Maze.validDirections = ['up', 'down', 'left', 'right']

var Path = function(maze, pos, movesArray) {
  this.moves = movesArray
  this.maze = maze
  this.row = pos[0]
  this.col = pos[1]
  this.end = false
  this.up = null
  this.down = null
  this.left = null
  this.right = null
}

Maze.prototype.getShortestPath = function() {
  var startPos = this.getStartPosition()
  var path = new Path(this.maze, startPos, [])
  return path.buildPath()
}

Path.prototype.buildPath = function() {
  if (this.maze[this.row][this.col] === "E") {
    this.end = true
  }
  if (this.end) {
    return [this.moves]
  }
  for (var direction of Maze.validDirections) {
    var newPos = Maze.tryMove(this.row,this.col, direction)
    if (newPos !== false) {
      var newMaze = this.maze
      newMaze[row][col] = "X"
      console.log(newMaze)
      var newPath = new Path(newMaze, newPos, direction)
      this[direction] = newPath
    } else {
      this[direction] = false
    }
  }
}





Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  try {
      if (this.maze[row][column] === 'X'){
          return false
      }
  } catch (e) {
      return false
  }
  switch (direction) {
    case 'up':
      if (row - 1 < 0 || this.maze[row-1][column] === 'X') {return false}
      return [row - 1 , column]
      break;
    case "down":
      if (row + 1 >= this.maze.length || this.maze[row+1][column] === 'X') {return false}
      return [row + 1 , column]
      break;
    case "left"  :
      if (column - 1 < 0 || this.maze[row][column-1] === 'X') {return false}
      return [row , column - 1]
      break;
    case "right":
      if (column + 1 >= this.maze[row].length || this.maze[row][column+1] === 'X') {return false}
      return [row , column + 1]
      break;
    default:
      return false
      break;
  }
}
