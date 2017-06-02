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
	var start = this.getStartPosition();
	var queue = [];
	var pred = [];
	var dist = [];
	queue.unshift(start);
	dist[start] = 0;
	while (queue.length !== 0) {
		var currPos.toString() = queue.pop();
		if (pred[this.maze.tryMove(row, col, "down").toString()] === -1) {
			queue.unshift(this.maze.tryMove(row, col, "down"));
			pred[this.maze.tryMove(row, col, "down").toString()] = currPos;
			dist[this.maze.tryMove(row, col, "down").toString()] = dist[currPos] + 1;
		}
		if (pred[this.maze.tryMove(row, col, "up").toString()] === -1) {
			queue.unshift(this.maze.tryMove(row, col, "up"));
			pred[this.maze.tryMove(row, col, "up").toString()] = currPos;
			dist[this.maze.tryMove(row, col, "up").toString()] = dist[currPos] + 1;
		}
		if (pred[this.maze.tryMove(row, col, "right").toString()] === -1) {
			queue.unshift(this.maze.tryMove(row, col, "right"));
			pred[this.maze.tryMove(row, col, "right").toString()] = currPos;
			dist[this.maze.tryMove(row, col, "right").toString()] = dist[currPos] + 1;
		}
		if (pred[this.maze.tryMove(row, col, "left").toString()] === -1) {
			queue.unshift(this.maze.tryMove(row, col, "left"));
			pred[this.maze.tryMove(row, col, "left").toString()] = currPos;
			dist[this.maze.tryMove(row, col, "left").toString()] = dist[currPos] + 1;
		}
	}
	
}
