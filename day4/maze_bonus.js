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
  // YOUR CODE HERE
  var start=this.getStartPosition();
  var stack = [];
  var visited = [];
  for(var i=0;i<this.maze.length;i++){
    visited[i]=[];
    for(var j=0;j<this.maze[i].length;j++){
      visited[i][j] = false;
    }
  }

 var obj = {}
  obj.loc = start;
  obj.path = []
  stack.push(obj);

 while(stack.length !== 0){
    var object = stack[0];
    var pos = stack[0].loc;
    stack.shift();
    if(this.maze[pos[0]][pos[1]] === 'E') {
      return object.path;
    }
    console.log(visited)
    for(var i=0;i<Maze.validDirections.length;i++){
      var a = this.tryMove(pos[0],pos[1],Maze.validDirections[i]);
      if(a && !visited[a[0]][a[1]]){
        var o = {}
        o.loc = a;
        o.path = [];
        o.path = o.path.concat(object.path).concat(Maze.validDirections[i]);
        stack.push(o);
        visited[a[0]][a[1]]=true;
      }
    }
  }
  return [];
}
