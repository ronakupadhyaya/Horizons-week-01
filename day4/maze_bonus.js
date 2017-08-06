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

Maze.prototype.toString = function() {
  // YOUR CODE HERE
  // Hint: See Array.prototype.join()!
  var arr = this.maze;
  // console.log(arr);

  for(var i  = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++){
      if((arr[i])[j] === ' '){
        (arr[i])[j] = '_';
      }
    }
  }
  var string = arr.join('\n');
  string = string.split(',');
  string = string.join('');

  return string;
}

Maze.prototype.getEndPosition = function() {
  // YOUR CODE HERE
  var maze = this.maze
  for(var i  = 0; i < maze.length; i++){
    for(var j = 0; j < maze[i].length; j++){
      if((maze[i])[j] === 'E'){
        return [i, j];
      }
    }
  }
  }

Maze.prototype.getStartPosition = function() {
    // YOUR CODE HERE
    var maze = this.maze
    for(var i  = 0; i < maze.length; i++){
      for(var j = 0; j < maze[i].length; j++){
        if((maze[i])[j] === 'S'){
          return [i, j];
        }
      }
    }
    throw 'Error';
    }
  Maze.prototype.tryMove = function(row, column, direction) {
      if (! _.contains(Maze.validDirections, direction)) {
        throw new Error('Invalid direction: ' + direction);
      }
      var maze = this.maze;
      // YOUR CODE HERE
      // console.log(maze[row][column]);
      if(maze[row] && maze[row][column]){
      if(direction === "up"){
        if(row === 0 || maze[row - 1][column] === "X"){
          return false;
        } else {
          return [row - 1, column];
        }
      }

      else if(direction === "down"){
        if(row === maze.length - 1 || maze[row+1][column] === 'X'){
          return false;
        } else {
          return [row + 1, column];
        }
      }

      else if(direction === "left"){
        if(column === 0 || maze[row][column - 1] === 'X'){
          return false;
        } else {
          return [row, column - 1];
        }
      }

      else if(direction === "right"){
        if(column === maze[row].length - 1 || maze[row][column + 1] === 'X'){
          return false;
        } else{
          return [row, column + 1];
        }
      }
    } else {return false};
    }
    Maze.prototype.isSolvable = function() {
      // YOUR CODE HERE
      var maze = this.maze;
      var obj  = this;
      var start = this.getStartPosition();
      var end = this.getEndPosition();


    var point = start;
      var directions =  Maze.validDirections;

      // console.log(start[0], start[1]);
      // console.log(end[0], end[1]);
    var path = [];
      var recursion = function (point){
        for(var i = 0; i < directions.length; i++){


          point = obj.tryMove(start[0], start[1], directions[i]);

          if(!point){
            path = [];
            continue;
          }
          else if(point[0] === end[0] && point[1] === end[1]){
            path.push(directions[i]);
            // console.log(path);
            return true;
          } else{
            path.push(directions[i])
            return recursion(point);
          }

        }
        path = [];
        return false;
      }

      console.log(recursion);
      return recursion(start);

    }


Maze.prototype.getShortestPath = function() {
  // YOUR CODE HERE
  var maze = this.maze;
  var path = [];
  this.isSolvable();
  console.log(path);

}
