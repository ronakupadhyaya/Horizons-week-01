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
  var maze = this.maze
  var v = []
  var p = []
  maze.forEach(function() {
  	v.push([])
  	p.push([])
  })

  if (!this.isSolvable()) return [];

  var Q = [this.getStartPosition()]
  v[Q[0][0]][Q[0][1]] = 1
  p[Q[0][0]][Q[0][1]] = -1

  while (Q.length > 0) {
  	var U = Q.shift(1)

  	if (this.tryMove(U[0], U[1], "up")) {
  		if (v[U[0] - 1][U[1]] != 1) {
  			v[U[0] - 1][U[1]] = 1
  			p[U[0] - 1][U[1]] = U
  			Q.push([U[0] -1, U[1]])
  		}
  	}

  	if (this.tryMove(U[0], U[1], "down")) {
  		if (v[U[0] + 1][U[1]] != 1) {
  			v[U[0] + 1][U[1]] = 1
  			p[U[0] + 1][U[1]] = U
  			Q.push([U[0] +1, U[1]])
  		}
  	}

  	if (this.tryMove(U[0], U[1], "left")) {
  		if (v[U[0]][U[1] - 1] != 1) {
  			v[U[0]][U[1] - 1] = 1
  			p[U[0]][U[1] - 1] = U
  			Q.push([U[0], U[1] - 1])
  		}
  	}

  	if (this.tryMove(U[0], U[1], "right")) {
  		if (v[U[0]][U[1] + 1] != 1) {
  			v[U[0]][U[1] + 1] = 1
  			p[U[0]][U[1] + 1] = U
  			Q.push([U[0], U[1] + 1])
  		}
  	}

  	// console.log(v)

  }

  for (var i=0; i<maze.length; i++) {
    for (var j=0; j<maze[0].length; j++) {
      if (maze[i][j] === "E") var path = [[i, j]];
    }
  }

  var curPos = path[0]
  console.log(maze)
  console.log(p, curPos)
  console.log(p[0][1])
  while (p[curPos[0]][curPos[1]] != -1) {
  	curPos = p[curPos[0]][curPos[1]]
  	path.push(curPos)
  }
  // console.log("new test case")
  // console.log(path)
  // path.forEach(console.log)

  var dir = {
  	"1,0": "up",
  	"-1,0": "down",
  	"0,1": "left",
  	"0,-1": "right"

  }

  var wordPath = [] 
  curPos = path.pop()
  while(path.length > 0) {
  	var nextPos = path.pop()
  	var move = [curPos[0] - nextPos[0], curPos[1] - nextPos[1]]
  	curPos = nextPos
  	wordPath.push(dir[String(move)])
  }

  return wordPath

}
