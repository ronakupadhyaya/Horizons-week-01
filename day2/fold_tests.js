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
