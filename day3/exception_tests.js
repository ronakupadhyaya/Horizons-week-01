"use strict";

describe("exception.safeCall()", function() {
  function safeFunction() { }
  function unsafeFunction() {
    throw 'error';
  }
  it("exception.safeCall(safeFunction) -> false", function() {
    expect(exception.safeCall(safeFunction) ).toBe(false);
  });
  it("exception.safeCall(unsafeFunction) -> true", function() {
    expect(exception.safeCall(unsafeFunction) ).toBe(true);
  });
});

describe("exception.callBoth()", function() {
  it("should call both even if it throws", function() {
    var called = false;
    function a() {
      throw 'error';
    }
    function b() {
      called = true;
    }
    expect(_.partial(exception.callBoth, a, b)).toThrow();
    expect(called).toBe(true);
  });


  it("not throwing exceptions doesn't change behavior", function() {
    var called = 0;
    function a() {
      called++;
    }
    exception.callBoth(a, a);
    expect(called).toBe(2);
  });
});

describe("exception.catchOnlyWithA", function() {
  function throwA() {
    throw 'abcde';
  }
  function throwOther() {
    throw 'other';
  }

  it("exception.catchOnlyWithA(throwA) -> nothing happens", function() {
    exception.catchOnlyWithA(throwA);
    expect(true).toBe(true);
  });

  it("exception.catchOnlyWithA(throwZ) -> Error: 'z'", function() {
    expect(_.partial(exception.catchOnlyWithA, throwOther)).toThrow('other');
  });
});
