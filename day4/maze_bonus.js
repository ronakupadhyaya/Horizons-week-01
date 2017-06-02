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
  var stack = [this.getStartPosition()];
  var nextStack = [];
  var visited = {};
  var parentMapping = [];

  while(true){
    while(stack.length !== 0){
      var current = stack.splice(0, 1)[0];
      visited[current] = true;
      if(this.maze[current[0]][current[1]] === 'E'){
        return computeDirections(parentMapping, current);
      }
      var newLevel = {};
      for(var i = 0; i < Maze.validDirections.length; i++){
        var triedMove = this.tryMove(current[0], current[1], Maze.validDirections[i]);
        if(triedMove){
          if(!_.has(visited, triedMove)){
            nextStack.push(triedMove);
            newLevel[triedMove] = current;
          }
        }
      }
      parentMapping.push(newLevel);
    }
    if(nextStack.length === 0){
      return [];
    }
    stack = nextStack;
    nextStack = [];
  }

  function computeDirections(parentMapping, endLocation){
    var directions = [];
    var curr = endLocation;
    for(var i = parentMapping.length-1; i >= 0; i--){
      var prev = parentMapping[i][curr];
      var x1 = prev[1];
      var y1 = prev[0];
      var x2 = curr[1];
      var y2 = curr[0];
      if(y1 === y2-1){
        directions.push("down");
      } else if(y1 === y2+1){
        directions.push("up");
      } else if(x1 === x2+1){
        directions.push("left");
      } else {
        directions.push("right");
      }

      curr = prev;
    }
    return directions;
  }

}
