"use strict";

describe("truthy.isTruthy(thing)", function() {
  it("truthy.isTruthy('a') -> true", function() {
    expect(truthy.isTruthy('a')).toBe(true);
  });
  
  it("truthy.isTruthy('') -> false", function() {
    expect(truthy.isTruthy('')).toBe(false);
  });
  
  it("truthy.isTruthy(113) -> true", function() {
    expect(truthy.isTruthy(113)).toBe(true);
  });
  
  it("truthy.isTruthy(0) -> false", function() {
    expect(truthy.isTruthy(0)).toBe(false);
  });
  
});

describe("truthy.isSortOfEqual(a, b)", function() {
  it("truthy.isSortOfEqual(1, 1) -> true", function() {
    expect(truthy.isSortOfEqual(1, 1)).toBe(true);
  });
  
  it("truthy.isSortOfEqual(1, 0) -> false", function() {
    expect(truthy.isSortOfEqual(1, 0)).toBe(false);
  });
  
  it("truthy.isSortOfEqual('1', 1) -> true", function() {
    expect(truthy.isSortOfEqual('1', 1)).toBe(true);
  });
  
  it("truthy.isSortOfEqual('', ' ') -> false", function() {
    expect(truthy.isSortOfEqual('', ' ')).toBe(false);
  });
  
  it("truthy.isSortOfEqual([ 'a', 'b' ], 'a') -> false", function() {
    expect(truthy.isSortOfEqual([ 'a', 'b' ], 'a')).toBe(false);
  });
  
  it("truthy.isSortOfEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'}) -> false", function() {
    expect(truthy.isSortOfEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'})).toBe(false);
  });
  
  it("truthy.isSortOfEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'}) -> false", function() {
    expect(truthy.isSortOfEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'})).toBe(false);
  });
  
});

describe("truthy.max(a, b)", function() {
  
  it("truthy.max(1, 1) -> 1", function() {
    expect(truthy.max(1, 1)).toBe(1);
  });
  
  it("truthy.max(-1, 0) -> 0", function() {
    expect(truthy.max(-1, 0)).toBe(0);
  });
  
  it("truthy.max('1', 1) -> '1'", function() {
    expect(truthy.max('1', 1)).toBe('1');
  });
  
  it("truthy.max(0, '0') -> 0", function() {
    expect(truthy.max(0, '0')).toBe(0);
  });
  
});

describe("truthy.and(a, b)", function() {
  
  it("truthy.and(1, 1) -> true", function() {
    expect(truthy.and(1, 1)).toEqual(true);
  });
  
  it("truthy.and(1, 0) -> false", function() {
    expect(truthy.and(1, 0)).toEqual(false);
  });
  
  it("truthy.and(false, 1) -> false", function() {
    expect(truthy.and(false, 1)).toEqual(false);
  });
  
  it("truthy.and(true, '') -> false", function() {
    expect(truthy.and(true, '')).toEqual(false);
  });
  
});

describe("truthy.or(a, b)", function() {
  
  it("truthy.or(1, 1) -> true", function() {
    expect(truthy.or(1, 1)).toBe(true);
  });
  
  it("truthy.or(1, 0) -> true", function() {
    expect(truthy.or(1, 0)).toBe(true);
  });
  
  it("truthy.or(false, 1) -> true", function() {
    expect(truthy.or(false, 1)).toBe(true);
  });
  
  it("truthy.or(true, '') -> true", function() {
    expect(truthy.or(true, '')).toBe(true);
  });
  
});

describe("truthy.compareStr(a, b)", function() {
  
});

describe("truthy.isReallyEquals(a, b)", function() {
  
  it("truthy.isReallyEquals('john', 'John') -> false", function() {
    expect(truthy.isReallyEquals('john', 'John')).toBe(false);
  });
  
  it("truthy.isReallyEquals('xDvz7h$k', 'xDvz7h$k') -> true", function() {
    expect(truthy.isReallyEquals('xDvz7h$k', 'xDvz7h$k')).toBe(true);
  });
  
  it("truthy.isReallyEquals('1', 1) -> true", function() {
    expect(truthy.isReallyEquals('1', 1)).toBe(false);
  });
  
  it("truthy.isReallyEquals(1, 1) -> true", function() {
    expect(truthy.isReallyEquals(1, 1)).toBe(true);
  });
  
  it("truthy.isReallyEquals(1, 0) -> false", function() {
    expect(truthy.isReallyEquals(1, 0)).toBe(false);
  });
  
  it("truthy.isReallyEquals(1, 1.000000000000000000000000000000001) -> true", function() {
    expect(truthy.isReallyEquals(1, 1.000000000000000000000000000000001)).toBe(true);
  });

});