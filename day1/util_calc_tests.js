describe("util.calc(op)", function() {
  it("util.calc('3 + 2') -> 5", function() {
    expect(util.calc('3 + 2')).toEqual(5);
  });
  it("util.calc('3 + 8 + 2 + 1    ') -> 14", function() {
    expect(util.calc('3 + 8 + 2 + 1    ')).toEqual(14);
  });
  it("util.calc('2 - 1 + 5 + 6') -> 12", function() {
    expect(util.calc('2 - 1 + 5 + 6')).toEqual(12);
  });
  it("util.calc('    -1 + 3 - 2 + 5') -> 1", function() {
    expect(util.calc('    -1 + 3 - 2 + 5')).toEqual(5);
  });
});
describe("util.splitIntoParts(s)", function() {
  it("util.splitIntoParts('3 + 2') -> [[3, 2], ['+']]", function() {
    expect(util.splitIntoParts('3 + 2')).toEqual([[3, 2], ['+']]);
  });
  it("util.splitIntoParts('3 + 8 + 2 + 1') -> [[3, 8, 2, 1], ['+', '+', '+']]", function() {
    expect(util.splitIntoParts('3 + 8 + 2 + 1')).toEqual([[3, 8, 2, 1], ['+', '+', '+']]);
  });
  it("util.splitIntoParts('2 - 1 + 5 + 6') -> [[2, 1, 5, 6], ['-', '+', '+']]", function() {
    expect(util.splitIntoParts('2 - 1 + 5 + 6')).toEqual([[2, 1, 5, 6], ['-', '+', '+']]);
  });
  it("util.splitIntoParts('-1 + 3 - 2 + 5') -> [[-1, 3, 2, 5], ['+', '-', '+']]", function() {
    expect(util.splitIntoParts('-1 + 3 - 2 + 5')).toEqual([[-1, 3, 2, 5], ['+', '-', '+']]);
  });
});
describe("util.validateExpression(nums, ops)", function() {
  it("util.validateExpression([3, 2], ['+']) -> true", function() {
    expect(util.validateExpression([3, 2], ['+'])).toEqual(true);
  });
  it("util.validateExpression([3, 8, 2, 1], ['+', '+', '+']) -> true", function() {
    expect(util.validateExpression([3, 8, 2, 1], ['+', '+', '+'])).toEqual(true);
  });
  it("util.validateExpression([2, 1, 5, 6], ['-', '+', '+']) -> true", function() {
    expect(util.validateExpression([2, 1, 5, 6], ['-', '+', '+'])).toEqual(true);
  });
  it("util.validateExpression([-1, 3, 2, 5], ['+', '-', '+']) -> true", function() {
    expect(util.validateExpression([-1, 3, 2, 5], ['+', '-', '+'])).toEqual(true);
  });
  it("util.validateExpression([0, 3, 4], ['-', '+', '/']) -> Exception thrown: 'Too many or too few operations'", function() {
    expect(function() { util.validateExpression([0, 3, 4], ['-', '+', '/']) }).toThrow("Too many or too few operations");
  });
  it("util.validateExpression([], []) -> Exception thrown: 'Too many or two few operations'", function() {
    expect(function() { util.validateExpression([], []) }).toThrow("Too many or too few operations");
  });
  it("util.validateExpression([1], []) -> Exception thrown: 'Too many or two few operations'", function() {
    expect(function() { util.validateExpression([1], []) }).toThrow("Too many or too few operations");
  });
  it("util.validateExpression(['+', '-', '*'], [1, 2, 3, 4]) -> Exception thrown: 'Expected number, got +'", function() {
    expect(function() { util.validateExpression(['+', '-', '*'], [1, 2]) }).toThrow("Expected number, got +");
  });
});
describe("util.calcOne(a, b, op)", function() {
  it("util.calcOne(3, 4, '+') -> 7", function() {
    expect(util.calcOne(3, 4, "+")).toEqual(7);
  });
  it("util.calcOne(3, 0, '/') -> Infinity", function() {
    expect(util.calcOne(3, 0, "/")).toEqual(Infinity);
  });
  it("util.calcOne(5, 9, '-') -> -4", function() {
    expect(util.calcOne(5, 9, "-")).toEqual(-4);
  });
});
describe("util.calc(opWithPrecedence)", function() {
  it("util.calc('1 * 3 / 5 + 2') -> 2.6", function() {
    expect(util.calc('1 * 3 / 5 + 2')).toEqual(2.6);
  });
  it("util.calc('1 + 3 / 2 - 5') -> -2.5", function() {
    expect(util.calc('1 + 3 / 2 - 5')).toEqual(-2.5);
  });
  it("util.calc('5 * 6 + 8 / 9 * 4.5') -> 34", function() {
    expect(util.calc('5 * 6 + 8 / 9 * 4.5')).toEqual(34);
  });
  it("util.calc('1 / 0 + 1 * 0') -> Infinity", function() {
    expect(util.calc('1 / 0 + 1 * 0')).toEqual(Infinity);
  });
  it("util.calc('1 / 0 * 0 + 1') -> NaN", function() {
    expect(util.calc('1 / 0 * 0 + 1')).toEqual(NaN);
  });
})

describe("Bonus: implement sqrt", function() {
  it("util.calc('sqrt 4') -> 2", function() {
    expect(util.calc('sqrt 4') ).toBe(2);
  });
  it("util.calc('sqrt 4 - 3') -> -2", function() {
    expect(util.calc('sqrt 4 - 3') ).toBe(-2);
  });
  it("util.calc('-1 * sqrt 4 - 3') -> -2", function() {
    expect(util.calc('-1 * sqrt 4 - 3') ).toBe(-2);
  });
  it("util.calc('-1 * sqrt 4 - 3') -> 2", function() {
    expect(util.calc('-1 * sqrt 4 - 3') ).toBe(2);
  });
  it("util.calc('sqrt 9 - 3 * 10') -> -27", function() {
    expect(util.calc('sqrt 9 - 3 * 10') ).toBe(-27);
  });
  it("util.calc('sqrt 9 * 10') -> 30", function() {
    expect(util.calc('sqrt 9 * 10') ).toBe(30);
  });

  it("util.calc('sqrt 9 * 10') -> 30", function() {
    expect(util.calc('sqrt 9 * 10 / 2 - 1') ).toBe(14);
  });

  it("util.calc('10 * sqrt 9') -> 30", function() {
    expect(util.calc('10 * sqrt 9') ).toBe(30);
  });
});
