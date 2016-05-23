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
  it("new Maze([['S'], ['E']]).isValidMove(0, 0, 'down') -> true", function() {
    expect(new Maze([['S'], ['E']]).isValidMove(0, 0, 'down') ).toBe(true);
  });
  it("new Maze([['S', 'E']]).isValidMove(0, 1, 'left') -> true", function() {
    expect(new Maze([['S', 'E']]).isValidMove(0, 1, 'left') ).toBe(true);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'left') -> true", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'left') ).toBe(true);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'right') -> true", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 1, 'right') ).toBe(true);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 0, 'right') -> true", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).isValidMove(0, 0, 'right') ).toBe(true);
  });
});

var solvableMazes = [];

var unsolvableMazes = [];
