"use strict";

describe('Maze.isValidMove()', function() {
  it("new Maze([['S', 'E']]).isValidMove(1, 0, 'right') -> false, invalid starting position", function() {
    expect(new Maze([['S', 'E']]).isValidMove(1, 0, 'right') ).toBe(false);
  });
  it("new Maze([['S', 'E']]).isValidMove(0, 0, 'left') -> false, moves off the left side of board", function() {
    expect(new Maze([['S', 'E']]).isValidMove(0, 0, 'left') ).toBe(false);
  });
  it("new Maze([['S', 'E']]).isValidMove(0, 0, 'up') -> false, moves off the top of the board", function() {
    expect(new Maze([['S', 'E']]).isValidMove(0, 0, 'up') ).toBe(false);
  });
  it("new Maze([['S', 'E']]).isValidMove(0, 0, 'down') -> false, moves off the bottom of the board", function() {
    expect(new Maze([['S', 'E']]).isValidMove(0, 0, 'down') ).toBe(false);
  });
  it("new Maze([['S', 'X', 'E']]).isValidMove(0, 0, 'right') -> false, moves into wall", function() {
    expect(new Maze([['S', 'X', 'E']]).isValidMove(0, 0, 'right') ).toBe(false);
  });
  it("new Maze([['S', 'X', 'E']]).isValidMove(0, 2, 'left') -> false, moves into wall", function() {
    expect(new Maze([['S', 'X', 'E']]).isValidMove(0, 2, 'left') ).toBe(false);
  });
  it("new Maze([['S'], ['E']]).isValidMove(0, 0, 'right') -> false, moves off right side of the board", function() {
    expect(new Maze([['S'], ['E']]).isValidMove(0, 0, 'right') ).toBe(false);
  });
  it("new Maze([['S'], ['X'], ['E']]).isValidMove(0, 0, 'down') -> false, moves into wall", function() {
    expect(new Maze([['S'], ['X'], ['E']]).isValidMove(0, 0, 'down') ).toBe(false);
  });
  it("new Maze([['S'], ['X'], ['E']]).isValidMove(2, 0, 'up') -> false, moves into wall", function() {
    expect(new Maze([['S'], ['X'], ['E']]).isValidMove(2, 0, 'up') ).toBe(false);
  });

  it("new Maze([['S'], ['E']]).isValidMove(0, 0, 'down') -> [1, 0]", function() {
    expect(new Maze([['S'], ['E']]).isValidMove(0, 0, 'down') ).toEqual([1, 0]);
  });
  it("new Maze([['S'], ['E']]).isValidMove(1, 0, 'up') -> [0, 0]", function() {
    expect(new Maze([['S'], ['E']]).isValidMove(1, 0, 'up') ).toEqual([0, 0]);
  });
  it("new Maze([['S', 'E']]).isValidMove(0, 1, 'left') -> [0, 0]", function() {
    expect(new Maze([['S', 'E']]).isValidMove(0, 1, 'left') ).toEqual([0, 0]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'left') -> [0, 0]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'left') ).toEqual([0, 0]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'right') -> [0, 2]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'right') ).toEqual([0, 2]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 0, 'right') -> [0, 1]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 0, 'right') ).toEqual([0, 1]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).isValidMove(1, 2, 'up') -> [0, 2]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).isValidMove(1, 2, 'up') ).toEqual([0, 2]);
  });
});

describe("Maze.getStartPosition()", function() {
  it("new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]", function() {
    expect(new Maze([['S'], ['E']]).getStartPosition() ).toEqual([0, 0]);
  });
  it("new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]", function() {
    expect(new Maze([['E'], ['S']]).getStartPosition() ).toEqual([1, 0]);
  });
  it("new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]", function() {
    expect(new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() ).toEqual([1, 1]);
  });
});

describe("Maze.isSolvable()", function() {
  var solvableMazes = [];
  solvableMazes.push([["S", "E"]]);
  solvableMazes.push([["S"],
                      ["E"]]);
  solvableMazes.push([["X", "S", "E", "X"]]);
  solvableMazes.push([["S", "X"],
                      ["E", "X"]]);

  solvableMazes.push([["X", "S", " ", " ", " ", " ", " "],
                      [" ", "X", " ", " ", " ", " ", " "],
                      [" ", " ", "X", " ", " ", " ", "E"],
                      [" ", " ", " ", "X", " ", " ", " "]]);

  solvableMazes.push([[" ", "S", " ", "X", " ", " ", " "],
                      [" ", " ", " ", " ", " ", " ", " "],
                      [" ", " ", " ", "X", " ", " ", "E"],
                      [" ", " ", " ", "X", " ", " ", " "]]);

  solvableMazes.push([[" ", "E", " ", "X", " ", " ", " "],
                      [" ", " ", " ", " ", " ", " ", " "],
                      [" ", " ", " ", "X", " ", " ", "S"],
                      [" ", " ", " ", "X", " ", " ", " "]]);

  var unsolvableMazes = [];
  unsolvableMazes.push([["S", "X", "E"]]);
  unsolvableMazes.push([["S"],
                        ["X"],
                        ["E"]]);
  unsolvableMazes.push([["S", "X"],
                        ["X", " "],
                        ["E", " "]]);

  unsolvableMazes.push([["X", " ", " ", " ", " ", " ", " "],
                        [" ", "X", " ", " ", " ", " ", " "],
                        ["S", " ", "X", " ", " ", " ", "E"],
                        [" ", " ", " ", "X", " ", " ", " "]]);

  unsolvableMazes.push([[" ", "S", " ", "X", " ", " ", " "],
                        [" ", " ", " ", " ", "X", " ", " "],
                        [" ", " ", " ", "X", " ", " ", "E"],
                        [" ", " ", " ", "X", " ", " ", " "]]);

  unsolvableMazes.push([[" ", "E", " ", "X", " ", " ", " "],
                        [" ", " ", " ", " ", "X", " ", " "],
                        [" ", " ", " ", "X", " ", " ", "S"],
                        [" ", " ", " ", "X", " ", " ", " "]]);

  solvableMazes.forEach(function(maze) {
    var m = new Maze(maze);
    it("Maze should be solvable: " + m, function() {
      expect(m.isSolvable()).toBe(true);
    });
  });

  unsolvableMazes.forEach(function(maze) {
    var m = new Maze(maze);
    it("Maze should not be solvable: " + m, function() {
      expect(m.isSolvable()).toBe(false);
    });
  });
})
