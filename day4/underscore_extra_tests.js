"use strict";

describe('partial()', function() {
  function allArgs() {
    return _.toArray(arguments);
  }

  it("partial() -> Error", function() {
    expect(_.partial(partial)).toThrow();
  });
  it("partial(allArgs)() -> []", function() {
    expect(partial(allArgs)() ).toEqual([]);
  });
  it("partial(allArgs)(0, 1, 2, 3, 4) -> [0, 1, 2, 3, 4]", function() {
    expect(partial(allArgs)(0, 1, 2, 3, 4) ).toEqual([0, 1, 2, 3, 4]);
  });
  it("partial(allArgs, 'x')() -> ['x']", function() {
    expect(partial(allArgs, 'x')() ).toEqual(['x']);
  });
  it("partial(allArgs, 'x')(0, 1, 2, 3, 4) -> ['x', 0, 1, 2, 3, 4]", function() {
    expect(partial(allArgs, 'x')(0, 1, 2, 3, 4) ).toEqual(['x', 0, 1, 2, 3, 4]);
  });
  it("partial(allArgs, 'x')(0, 1, 2, 3, 4) -> ['x', 0, 1, 2, 3, 4]", function() {
    expect(partial(allArgs, 'x')(0, 1, 2, 3, 4) ).toEqual(['x', 0, 1, 2, 3, 4]);
  });
  it("handle 500 arguments from partial", function() {
    var args = [allArgs].concat(_.range(500));
    expect(partial.apply(null, args)()).toEqual(_.range(500));
  });
  it("handle 500 arguments after partial", function() {
    expect(partial(allArgs).apply(null, _.range(500))).toEqual(_.range(500));
  });
  it("handle 500 arguments from and after partial", function() {
    var args = [allArgs].concat(_.range(500));
    expect(partial.apply(null, args).apply(null, _.range(500))).toEqual(_.range(500).concat(_.range(500)));
  });
});


describe('compose()', function() {
  it("f(g(h(x, y, z)))", function() {
    function h(x, y, z) {
      expect(arguments.length).toBe(3);
      return z * y;
    }
    function g(x) {
      expect(arguments.length).toBe(1);
      return x;
    }
    function f(x) {
      expect(arguments.length).toBe(1);
      return x * 2;
    }
    var composed = compose(f, g, h);
    expect(composed(1, 2, 3)).toBe(12);
  });
});

describe("memoize()", function() {
  it("calling 10 times with same 100 arguments calls only once", function() {
    var called = [];
    var fun = memoize(function(i) {
      expect(called[i]).toBeFalsy();
      called[i] = true;
    });

    _.range(10).forEach(function() {
      _.range(100).forEach(fun);
    });
    expect(called.length).toBe(100);
    expect(_.all(called, _.identity)).toBe(true);
  });
});
