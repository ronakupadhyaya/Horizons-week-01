"use strict";

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
