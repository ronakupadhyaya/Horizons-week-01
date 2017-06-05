"use strict";
Maze.prototype.getStartPosition = function() {
  // YOUR CODE HERE
  for (var i = 0; i < this.maze.length; i++) {
    var element = this.maze[i];
    for (var j = 0; j < element.length; j++) {
      if (element[j] === "S") {
        return [i, j];
      }
    }
  }
  throw new Error("Maze has no starting point");
}

Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  // YOUR CODE HERE
  if (!this.getStartPosition) {
    return false;
  }
  if (direction === "right")
    column++;
  if (direction === "left") 
    column--;
  if (direction === "down") 
    row++;
  if (direction === "up") 
    row--;
  if (row < 0 ||
  column < 0 ||
  row >= this.maze.length ||
  column >= this.maze[0].length ||
  this.maze[row][column] === "X") {
    return false;
  }
  return [row, column];
}
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
  // YOUR CODE HERE
  var start = this.getStartPosition();
  var positions = [];
  for (var i = 0; i < this.maze.length; i++) {
    positions.push([]);
  }
  for (var i = 0; i < this.maze.length; i++) {
    var element = positions[i];
    for (var j = 0; j < this.maze[0].length; j++) {
      positions[i].push(false);
    }
  }
  var obj = this;
  var found = false;

  var directions = [];
  var path = [];

  function solve(position) {
    var row = position[0];
    var col = position[1];
    /*
    if (found) {
      return;
    }
    */
    if(obj.maze[row][col] === "E") {
      found = true;
      directions.push(path);
      path = [];
      return;
    }
    positions[row][col] = true; 
    if(obj.tryMove(row, col, "down") && 
    !positions[obj.tryMove(row, col, "down")[0]][obj.tryMove(row, col, "down")[1]]) {
      path.push("down");
      solve(obj.tryMove(row, col, "down"));
    }
    if(obj.tryMove(row, col, "up") && 
    !positions[obj.tryMove(row, col, "up")[0]][obj.tryMove(row, col, "up")[1]]) {
      path.push("up");
      solve(obj.tryMove(row, col, "up"));
    }
    if(obj.tryMove(row, col, "right") && 
    !positions[obj.tryMove(row, col, "right")[0]][obj.tryMove(row, col, "right")[1]]) {
      path.push("right");
      solve(obj.tryMove(row, col, "right"));
    }
    if(obj.tryMove(row, col, "left") && 
    !positions[obj.tryMove(row, col, "left")[0]][obj.tryMove(row, col, "left")[1]]) {
      path.push("left");
      solve(obj.tryMove(row, col, "left"));
    }    
  }
  solve(start);
  if (directions.length > 0) {
    var shortest = directions.reduce(function (a, b) {
      if (a && b) {
        a.length < b.length ? a : b;
      }
    })
    console.log(shortest);
    return shortest;
  }
  return [];
}