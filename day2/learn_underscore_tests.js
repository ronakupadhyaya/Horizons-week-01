"use strict";

describe("learn_underscore.contains(item, array)", function() {
  beforeEach(function() {
    spyOn(_, 'any').and.callThrough();
  });

  it("learn_underscore.contains([], 'a') should call _.any()", function() {
    learn_underscore.contains([], 'a');
    expect(_.any).toHaveBeenCalled();
  });

  it("learn_underscore.contains([], 'a') -> false", function() {
    expect(learn_underscore.contains([], 'a')).toBe(false);
  });

  it("learn_underscore.contains(['a'], 'a') -> true", function() {
    expect(learn_underscore.contains(['a'], 'a')).toBe(true);
  });

  it("learn_underscore.contains(['a', 'b', 'c'], 1) -> false", function() {
    expect(learn_underscore.contains(['a', 'b', 'c'], 1)).toBe(false);
  });
});

describe("learn_underscore.hasZeros(array)", function() {
  it("learn_underscore.hasZeros([]) -> false", function() {
    expect(learn_underscore.hasZeros([]) ).toBe(false);
  });
  it("learn_underscore.hasZeros([1]) -> false", function() {
    expect(learn_underscore.hasZeros([1]) ).toBe(false);
  });
  it("learn_underscore.hasZeros([1, 0, 0]) -> true", function() {
    expect(learn_underscore.hasZeros([1, 0, 0]) ).toBe(true);
  });
  it("learn_underscore.hasZeros([0]) -> true", function() {
    expect(learn_underscore.hasZeros([0]) ).toBe(true);
  });
});

describe("learn_underscore.any(array, fun)", function() {
  beforeEach(function() {
    spyOn(_, 'reduce').and.callThrough();
  });

  function isTruthy(item) {
    return !! item;
  }
  it("learn_underscore.any([1], isTruthy) calls _.reduce()", function() {
    learn_underscore.any([1], isTruthy);
    expect(_.reduce).toHaveBeenCalled();
  });
  it("learn_underscore.any([], isTruthy) -> false", function() {
    expect(learn_underscore.any([], isTruthy) ).toBeFalsy();
  });
  it("learn_underscore.any([0, 0], isTruthy) -> false", function() {
    expect(learn_underscore.any([0, 0], isTruthy) ).toBe(false);
  });
  it("learn_underscore.any([0, 1, 0], isTruthy) -> true", function() {
    expect(learn_underscore.any([0, 1, 0], isTruthy) ).toBe(true);
  });
  it("learn_underscore.any([1], isTruthy) -> true", function() {
    expect(learn_underscore.any([1], isTruthy) ).toBe(true);
  });
});

describe("learn_underscore.fold(array, fun)", function() {
  function sum(a, b) {
    return a + b;
  }
  it("learn_underscore.fold([1], sum) -> 1", function() {
    expect(learn_underscore.fold([1], sum) ).toBe(1);
  });
  it("learn_underscore.fold([1, 2], sum) -> 3", function() {
    expect(learn_underscore.fold([1, 2], sum) ).toBe(3);
  });
  it("learn_underscore.fold([1, 2, -3], sum) -> 0", function() {
    expect(learn_underscore.fold([1, 2, -3], sum) ).toBe(0);
  });
  it("learn_underscore.fold([1, -1, 2, -3], sum) -> -1", function() {
    expect(learn_underscore.fold([1, -1, 2, -3], sum) ).toBe(-1);
  });
  it("learn_underscore.fold([0], sum) -> 0", function() {
    expect(learn_underscore.fold([0], sum) ).toBe(0);
  });

  function and(a, b) {
    return a && b;
  }
  it("learn_underscore.fold([true], and) -> true", function() {
    expect(learn_underscore.fold([true], and) ).toBe(true);
  });
  it("learn_underscore.fold([true, true, true], and) -> true", function() {
    expect(learn_underscore.fold([true, true, true], and) ).toBe(true);
  });
  it("learn_underscore.fold([true, false], and) -> false", function() {
    expect(learn_underscore.fold([true, false], and) ).toBe(false);
  });
  it("learn_underscore.fold([true, false, true, true], and) -> false", function() {
    expect(learn_underscore.fold([true, false, true, true], and) ).toBe(false);
  });
  it("learn_underscore.fold([false], and) -> false", function() {
    expect(learn_underscore.fold([false], and) ).toBe(false);
  });
  it("learn_underscore.fold([false, false], and) -> false", function() {
    expect(learn_underscore.fold([false, false], and) ).toBe(false);
  });
});

describe("learn_underscore.keys(object)", function() {
  it("learn_underscore.keys({}) -> []", function() {
    expect(learn_underscore.keys({}) ).toEqual([]);
  });
  it("learn_underscore.keys({a: 1, hello: 10}) -> ['a', 'hello']", function() {
    expect(learn_underscore.keys({a: 1, hello: 10}).length).toBe(['a', 'hello'].length);
    expect(learn_underscore.keys({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining(['a', 'hello']));
  });
});

describe("learn_underscore.values(object)", function() {
  it("learn_underscore.values({}) -> []", function() {
    expect(learn_underscore.values({}) ).toEqual([]);
  });
  it("learn_underscore.values({a: 1, hello: 10}) -> [1, 10]", function() {
    expect(learn_underscore.values({a: 1, hello: 10}).length).toEqual([1, 10].length);
    expect(learn_underscore.values({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining([1, 10]));
  });
});

describe("learn_underscore.pairs(object)", function() {
  it("learn_underscore.pairs({}) -> []", function() {
    expect(learn_underscore.pairs({}) ).toEqual([]);
  });
  it("learn_underscore.pairs({a: 1, hello: 10}) -> [['a', 1], ['hello', 10]]", function() {
    expect(learn_underscore.pairs({a: 1, hello: 10}).length ).toBe([['a', 1], ['hello', 10]].length);
    expect(learn_underscore.pairs({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining([['a', 1], ['hello', 10]]));
  });
});

describe("learn_underscore.groupByState(people)", function() {
  it("learn_underscore.groupByState(people)", function() {
    var people = [
    {name: 'Darwish', state: 'GA'},
    {name: 'Moose', state: 'CA'},
    {name: 'Lane', state: 'PA'},
    {name: 'Ethan', state: 'CA'},
    {name: 'Josh', state: 'NJ'},
    {name: 'Edward', state: 'FR'},
    {name: 'Abhi', state: 'GA'}
    ];
    expect(learn_underscore.groupByState(people)).toEqual({
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

describe("learn_underscore.countLetters(string)", function() {
  it("learn_underscore.countLetters('hello') -> {h: 1, e: 1, l: 2, o: 1}", function() {
    expect(learn_underscore.countLetters('hello') ).toEqual({h: 1, e: 1, l: 2, o: 1});
  });
  it("learn_underscore.countLetters('zaaaa') -> {a: 4, z: 1}", function() {
    expect(learn_underscore.countLetters('zaaaa') ).toEqual({a: 4, z: 1});
  });
});

describe("learn_underscore.countBy(array, fun)", function() {
  it("learn_underscore.countBy(words, wordLength) -> {4: 1, 5: 3, 2: 1}", function() {
    var words = ['hello', 'great', 'foot', 'class', 'hi'];
    function wordLength(word) {
      return word.length;
    }
    expect(learn_underscore.countBy(words, wordLength) ).toEqual({4: 1, 5: 3, 2: 1});
  });
});
