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
// ex. new Maze([['E', ' '],
//               ['X', ' '],
//               ['S', ' ']]).getShortestPath() -> ['right', 'up', 'up', 'left']
Maze.prototype.getShortestPath = function() {
  // YOUR CODE HERE
  var queue = [{ pos: this.getStartPosition(), path: [] }];
  var visited = {}; // row -> array of columns

  while (queue.length > 0) {
    var curr = queue.shift();
    var cell = curr.pos;

    if (this.maze[cell[0]][cell[1]] === 'E') {
      return curr.path;
    }

    for (var i = 0; i < Maze.validDirections.length; i++) {
      var ok = this.tryMove(cell[0], cell[1], Maze.validDirections[i]);
      if (ok) {
        if (visited[ok[0]] && visited[ok[0]].indexOf(ok[1]) >= 0) { // visited
          continue;
        }
        visited[cell[0]] = visited[cell[0]] || [];
        visited[cell[0]].push(cell[1]);

        queue.push({
          pos: ok,
          path: curr.path.concat([Maze.validDirections[i]])
        });
      }
    }
  }
  return [];
}
