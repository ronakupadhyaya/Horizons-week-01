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

describe("fold.any(array, fun)", function() {
  beforeEach(function() {
    spyOn(_, 'reduce').and.callThrough();
  });

  function isTruthy(item) {
    return !! item;
  }
  it("fold.any([1], isTruthy) calls _.reduce()", function() {
    fold.any([1], isTruthy);
    expect(_.reduce).toHaveBeenCalled();
  });
  it("fold.any([], isTruthy) -> false", function() {
    expect(fold.any([], isTruthy) ).toBeFalsy();
  });
  it("fold.any([0, 0], isTruthy) -> false", function() {
    expect(fold.any([0, 0], isTruthy) ).toBe(false);
  });
  it("fold.any([0, 1, 0], isTruthy) -> true", function() {
    expect(fold.any([0, 1, 0], isTruthy) ).toBe(true);
  });
  it("fold.any([1], isTruthy) -> true", function() {
    expect(fold.any([1], isTruthy) ).toBe(true);
  });
});

describe("fold.fold(array, fun)", function() {
  function sum(a, b) {
    return a + b;
  }
  it("fold.fold([1], sum) -> 1", function() {
    expect(fold.fold([1], sum) ).toBe(1);
  });
  it("fold.fold([1, 2], sum) -> 3", function() {
    expect(fold.fold([1, 2], sum) ).toBe(3);
  });
  it("fold.fold([1, 2, -3], sum) -> 0", function() {
    expect(fold.fold([1, 2, -3], sum) ).toBe(0);
  });
  it("fold.fold([1, -1, 2, -3], sum) -> -1", function() {
    expect(fold.fold([1, -1, 2, -3], sum) ).toBe(-1);
  });
  it("fold.fold([0], sum) -> 0", function() {
    expect(fold.fold([0], sum) ).toBe(0);
  });

  function and(a, b) {
    return a && b;
  }
  it("fold.fold([true], and) -> true", function() {
    expect(fold.fold([true], and) ).toBe(true);
  });
  it("fold.fold([true, true, true], and) -> true", function() {
    expect(fold.fold([true, true, true], and) ).toBe(true);
  });
  it("fold.fold([true, false], and) -> false", function() {
    expect(fold.fold([true, false], and) ).toBe(false);
  });
  it("fold.fold([true, false, true, true], and) -> false", function() {
    expect(fold.fold([true, false, true, true], and) ).toBe(false);
  });
  it("fold.fold([false], and) -> false", function() {
    expect(fold.fold([false], and) ).toBe(false);
  });
  it("fold.fold([false, false], and) -> false", function() {
    expect(fold.fold([false, false], and) ).toBe(false);
  });
});

describe("fold.keys(object)", function() {
  it("fold.keys({}) -> []", function() {
    expect(fold.keys({}) ).toEqual([]);
  });
  it("fold.keys({a: 1, hello: 10}) -> ['a', 'hello']", function() {
    expect(fold.keys({a: 1, hello: 10}).length).toBe(['a', 'hello'].length);
    expect(fold.keys({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining(['a', 'hello']));
  });
});

describe("fold.values(object)", function() {
  it("fold.values({}) -> []", function() {
    expect(fold.values({}) ).toEqual([]);
  });
  it("fold.values({a: 1, hello: 10}) -> [1, 10]", function() {
    expect(fold.values({a: 1, hello: 10}).length).toEqual([1, 10].length);
    expect(fold.values({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining([1, 10]));
  });
});

describe("fold.pairs(object)", function() {
  it("fold.pairs({}) -> []", function() {
    expect(fold.pairs({}) ).toEqual([]);
  });
  it("fold.pairs({a: 1, hello: 10}) -> [['a', 1], ['hello', 10]]", function() {
    expect(fold.pairs({a: 1, hello: 10}).length ).toBe([['a', 1], ['hello', 10]].length);
    expect(fold.pairs({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining([['a', 1], ['hello', 10]]));
  });
});

describe("fold.groupByState(people)", function() {
  it("groupByState(people)", function() {
    var people = [
    {name: 'Darwish', state: 'GA'},
    {name: 'Moose', state: 'CA'},
    {name: 'Lane', state: 'PA'},
    {name: 'Ethan', state: 'CA'},
    {name: 'Josh', state: 'NJ'},
    {name: 'Edward', state: 'FR'},
    {name: 'Abhi', state: 'GA'}
    ];
    expect(groupByState(people)).toEqual({
      "GA": [
      { "name": "Darwish", "state": "GA" },
      { "name": "Abhi", "state": "GA" }
      ],
      "CA": [
      { "name": "Moose", "state": "CA" },
      { "name": "Ethan", "state": "CA" }
      ],
      "PA": [
      { "name": "Lane", "state": "PA" }
      ],
      "NJ": [
      { "name": "Josh", "state": "NJ" }
      ],
      "FR": [
      { "name": "Edward", "state": "FR" }
      ]
    });
  });
});
