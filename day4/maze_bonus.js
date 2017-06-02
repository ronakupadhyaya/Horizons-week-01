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
  //var finish=this.getFinishPosition();

  console.log(start);
  // var i=start[0];
  // var j=start[1];
  var stack = [];
  var visited = [];
  var pred = []
  for(var i=0;i<this.maze.length;i++){
    visited[i]=[];
    for(var j=0;j<this.maze[i].length;j++){
      visited[i][j] = false;
    }
  }
  for(var i=0;i<this.maze.length;i++){
    pred[i]=[];
    for(var j=0;j<this.maze[i].length;j++){
      pred[i][j] = 0
    }
  }
console.log(visited);

  stack.push(start);
  while(stack.length !== 0){
    var pos = stack[0];
    //stack.splice(0,1);
    stack.unshift();
    if(this.maze[pos[0]][pos[1]] === 'E') {
 
    // } finish[0] && pos[1]===finish[1]){
      //return true;
    }
    //debugger
console.log(visited)
for(var i=0;i<Maze.direction;i++){
var a = this.tryMove(pos[0],pos[1],Maze.direction[i]);
  if(a && !visited[a[0]][a[1]]){
    stack.push(a);
    visited[a[0]][a[1]]=true;
    pred[a[0]][a[1]]=[pos[0],pos[1]];
  }
}
    // if(this.tryMove(pos[0],pos[1],"up") && !visited[pos[0]-1][pos[1]]){
    //     stack.push([pos[0]-1, pos[1]]);
    //     visited[pos[0]-1][pos[1]] = true;
    // }
    // if(this.tryMove(pos[0],pos[1],"down") && !visited[pos[0]+1][pos[1]]){
    //     stack.push([pos[0]+1, pos[1]]);
    //     visited[pos[0]+1][pos[1]] = true;
    // }
    // if(this.tryMove(pos[0],pos[1],"left") && !visited[pos[0]][pos[1]-1]){
    //     stack.push([pos[0], pos[1]-1]);
    //     visited[pos[0]][pos[1]-1] = true;
    // }
    // if(this.tryMove(pos[0],pos[1],"right") && !visited[pos[0]][pos[1]+1]){
    //     stack.push([pos[0], pos[1]+1]);
    //     visited[pos[0]][pos[1]+1] = true;
    // }

  }
return false;

}
