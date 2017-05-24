"use strict";

describe("recursion.factorial(number)", function() {
  it("recursion.factorial(0) -> 1", function() {
    expect(recursion.factorial(0)).toBe(1);
  });

  it("recursion.factorial(1) -> 1", function() {
    expect(recursion.factorial(1)).toBe(1);
  });

  it("recursion.factorial(5) -> 120", function() {
    expect(recursion.factorial(5)).toBe(120);
  });

  it("recursion.factorial(17) -> 355687428096000", function() {
    expect(recursion.factorial(17)).toBe(355687428096000);
  });
});

describe("recursion.fibonacci(number)", function() {
  it("recursion.fibonacci(0) -> 0", function() {
    expect(recursion.fibonacci(0)).toBe(0);
  });

  it("recursion.fibonacci(1) -> 1", function() {
    expect(recursion.fibonacci(1)).toBe(1);
  });

  it("recursion.fibonacci(3) -> 2", function() {
    expect(recursion.fibonacci(3)).toBe(2);
  });

  it("recursion.fibonacci(15) -> 610", function() {
    expect(recursion.fibonacci(15)).toBe(610);
  });
});
