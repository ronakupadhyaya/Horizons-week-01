"use strict";

describe("fold", function() {
  it("fold", function() {
    expect(towers.isArray('a')).toBe(false);
  });
  it("towers.isArray(0) -> false", function() {
    expect(towers.isArray(0)).toBe(false);
  });
  it("towers.isArray([]) -> true", function() {
    expect(towers.isArray([])).toBe(true);
  });
});
