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
  var self = this;
  function getEndPosition() {
    var position = null;
    self.maze.forEach(function (row, mIndex) {
      row.forEach(function (item, rIndex) {
        if (item === "E"){
          position = [mIndex, rIndex];
        }
      });
    });
    if (position !== null)
      return position;
  }

  var start = self.getStartPosition();
  var end = getEndPosition();
  //console.log(start, end);
  var visited = ["false", start.toString()];

  function recurse(start, visited, path) {
    if (!start)
      return false;
    if (start.toString() === end.toString())
      return path;

    var left = self.tryMove(start[0],start[1],'left');
    var right = self.tryMove(start[0],start[1],'right');
    var down = self.tryMove(start[0],start[1],'down');
    var up = self.tryMove(start[0],start[1],'up');

    if (visited.indexOf(left.toString()) < 0) {
      visited.push(left.toString());
      left = recurse(left, visited, path + "left.");
    } else {
      left = false;
    }
    if (visited.indexOf(right.toString()) < 0) {
      visited.push(right.toString());
      right = recurse(right, visited, path+ "right.");
    } else {
      right = false;
    }
    if (visited.indexOf(down.toString()) < 0) {
      visited.push(down.toString());
      down = recurse(down, visited, path + "down.");
    } else {
      down = false;
    }
    if (visited.indexOf(up.toString()) < 0) {
      visited.push(up.toString());
      up = recurse(up, visited, path + "up.");
    } else {
      up = false;
    }

    var paths = [left.length, right.length, down.length, up.length];
    var shortest = paths.reduce(function (prev, curr) {
      if (typeof prev === "number" && typeof curr === "number") {
        return prev < curr ? prev : curr;
      } else if (typeof prev === "number") {
        return prev;
      } else {
        return curr;
      }
    })

    var ans = "";
    switch(shortest) {
    case shortest === left.length:
      ans = left;
      break;
    case shortest === right.length:
      ans = right;
      break;
    case shortest === down.length:
      ans = down;
      break;
    case shortest === up.length:
      ans = up;
      break;
    }

    return ans;

  }

  return recurse(start, visited, start.toString());
}
