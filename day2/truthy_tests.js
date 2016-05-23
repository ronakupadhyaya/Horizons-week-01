"use strict";

describe("truthy.is(thing)", function() {
  it("truthy.is('a') -> true", function() {
    expect(truthy.is('a')).toBe(true);
  });
  
  it("truthy.is('') -> false", function() {
    expect(truthy.is('')).toBe(false);
  });
  
  it("truthy.is(113) -> true", function() {
    expect(truthy.is(113)).toBe(true);
  });
  
  it("truthy.is(0) -> false", function() {
    expect(truthy.is(0)).toBe(false);
  });
  
});

describe("truthy.isEqual(a, b)", function() {
  it("truthy.isEqual(1, 1) -> true", function() {
    expect(truthy.isEqual(1, 1)).toBe(true);
  });
  
  it("truthy.isEqual(1, 0) -> false", function() {
    expect(truthy.isEqual(1, 0)).toBe(false);
  });
  
  it("truthy.isEqual('1', 1) -> true", function() {
    expect(truthy.isEqual('1', 1)).toBe(true);
  });
  
  it("truthy.isEqual('', ' ') -> false", function() {
    expect(truthy.isEqual('', ' ')).toBe(false);
  });
  
  it("truthy.isEqual([ 'a', 'b' ], 'a') -> false", function() {
    expect(truthy.isEqual([ 'a', 'b' ], 'a')).toBe(false);
  });
  
  it("truthy.isEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'}) -> false", function() {
    expect(truthy.isEqual([ 'a', 'b' ], { 0: 'a', 1: 'b'})).toBe(false);
  });
  
  it("truthy.isEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'}) -> false", function() {
    expect(truthy.isEqual({ 0: 'a', 1: 'b'}, { 0: 'a', 1: 'b'})).toBe(false);
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
  
  it("truthy.compareStr('john', 'John') -> false", function() {
    expect(truthy.compareStr('john', 'John')).toBe(false);
  });
  
  it("truthy.compareStr('xDvz7h$k', 'xDvz7h$k') -> true", function() {
    expect(truthy.compareStr('xDvz7h$k', 'xDvz7h$k')).toBe(true);
  });
});

describe("truthy.compareNum(a, b)", function() {
  
  it("truthy.compareNum(1, 1) -> true", function() {
    expect(truthy.compareNum(1, 1)).toBe(true);
  });
  
  it("truthy.compareNum(1, 0) -> false", function() {
    expect(truthy.compareNum(1, 0)).toBe(false);
  });
  
  it("truthy.compareNum(1, 1.000000000000000000000000000000001) -> true", function() {
    expect(truthy.compareNum(1, 1.000000000000000000000000000000001)).toBe(true);
  });

});
