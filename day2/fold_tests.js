"use strict";

describe("fold.contains(item, array)", function() {
  beforeEach(function() {
    spyOn(_, 'any').and.callThrough();
  });

  it("fold.contains([], 'a') should call _.any()", function() {
    fold.contains([], 'a');
    expect(_.any).toHaveBeenCalled();
  });

  it("fold.contains([], 'a') -> false", function() {
    expect(fold.contains([], 'a')).toBe(false);
  });

  it("fold.contains(['a'], 'a') -> true", function() {
    expect(fold.contains(['a'], 'a')).toBe(true);
  });

  it("fold.contains(['a', 'b', 'c'], 1) -> false", function() {
    expect(fold.contains(['a', 'b', 'c'], 1)).toBe(false);
  });
});

describe("fold.hasZeros(array)", function() {
  it("fold.hasZeros([]) -> false", function() {
    expect(fold.hasZeros([]) ).toBe(false);
  });
  it("fold.hasZeros([1]) -> false", function() {
    expect(fold.hasZeros([1]) ).toBe(false);
  });
  it("fold.hasZeros([1, 0, 0]) -> true", function() {
    expect(fold.hasZeros([1, 0, 0]) ).toBe(true);
  });
  it("fold.hasZeros([0]) -> true", function() {
    expect(fold.hasZeros([0]) ).toBe(true);
  });
});
