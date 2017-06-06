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
  var mymaze = this.maze;
  var obj = this;
  //var wasHere = (function(){ var i=mymaze.length, arr=[]; while(i--) arr.push([]); return arr })();
  var start = obj.getStartPosition();
  var end = obj.getEndPosition();
  var bfsStack = [];
  var path = [];
  bfsStack.push(obj.getStartPosition());

  this.wasHere = this.maze.map(function(row) { //More elegant solution: add new key visited to each node
    return row.map(_.constant(false)); //can also use new Array(this.maze[0].length).fill(false)
  });
  var prev= [];
  console.log(this.wasHere);
  //console.log(this.wasHere);
  //console.log(mymaze[row][col][0].length);
  //console.log(mymaze);
  //console.log(wasHere);
  // var recursive = function(a,b){
  //
  //
  //   if (start[0] === end[0] && start[1] === end[1]){
  //     return true;
  //   }
  //   //console.log(start);
  //   //console.log(end);
  // }


  while (bfsStack.length > 0){
    var dir = [];
    var s = bfsStack.shift(); //have to change all keys in array, so is expensive
    //console.log(s);
    //console.log(this.maze[s[0]][s[1]]);
    var position = this.maze[s[0]][s[1]];
    if (position === 'X') {
      throw new Error("Can't move into wall. Position: " + position);
    }
    if (s[0] === obj.getEndPosition()[0] && s[1] === obj.getEndPosition()[1]) {
      return path;
    }
    this.wasHere[s[0]][s[1]]=true;
    for (var i = 0; i < Maze.validDirections.length; i++) {
      var direction = Maze.validDirections[i];
      //console.log(direction);
      var updated = this.tryMove(s[0], s[1], direction);
      if (updated && ! this.wasHere[updated[0]][updated[1]]) {
        path.push(direction);
        bfsStack.push(updated);
      }
    }
  }
  return path;
}
