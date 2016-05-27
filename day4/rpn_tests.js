"use strict";

describe("RPN Calculator", function() {
  it("rpnCalculator('0 1') -> Error", function() {
    expect(function() { rpnCalculator("0 1") }).toThrow();
  });

  it("rpnCalculator('*') -> Error", function() {
    expect(function() { rpnCalculator("*") }).toThrow();
  });

  it("rpnCalculator('1 2 * 3 + *') -> Error", function() {
    expect(function() { rpnCalculator("1 2 * 3 + *") }).toThrow();
  });

  it("rpnCalculator('2 *') -> Error", function() {
    expect(function() { rpnCalculator("2 *") }).toThrow();
  });

  it("rpnCalculator('0') -> 0", function() {
    expect(rpnCalculator("0") ).toBe(0);
  });
  it("rpnCalculator('10') -> 0", function() {
    expect(rpnCalculator("0") ).toBe(0);
  });
  it("rpnCalculator('-8 8 -') -> 0", function() {
    expect(rpnCalculator('-8 8 -') ).toBe(0);
  });
  it("rpnCalculator('-6 -6 / -1 -8 +') -> 0", function() {
    expect(rpnCalculator('-6 -6 / -1 -8 +') ).toBe(0);
  });
  it("rpnCalculator('-6 -6 -1 -8 / +') -> 0", function() {
    expect(rpnCalculator('-6 -6 -1 -8 / +') ).toBe(0);
  });
  it("rpnCalculator('5 -5 / 1 3 - 6 4 *') -> 0", function() {
    expect(rpnCalculator('5 -5 / 1 3 - 6 4 *') ).toBe(0);
  });
  it("rpnCalculator('5 -5 1 3 6 4 / - *') -> 0", function() {
    expect(rpnCalculator('5 -5 1 3 6 4 / - *') ).toBe(0);
  });
  it("rpnCalculator('9 -5 - -10 9 / 5 -8 * 5 -6 -') -> 0", function() {
    expect(rpnCalculator('9 -5 - -10 9 / 5 -8 * 5 -6 -') ).toBe(0);
  });
  it("rpnCalculator('9 -5 -10 9 5 -8 5 -6 - / * -') -> 0", function() {
    expect(rpnCalculator('9 -5 -10 9 5 -8 5 -6 - / * -') ).toBe(0);
  });
  it("rpnCalculator('-7 -5 / -1 6 / -7 -4 / -10 -7 + -10 4 /') -> 0", function() {
    expect(rpnCalculator('-7 -5 / -1 6 / -7 -4 / -10 -7 + -10 4 /') ).toBe(0);
  });
  it("rpnCalculator('-7 -5 -1 6 -7 -4 -10 -7 -10 4 / / / + /') -> 0", function() {
    expect(rpnCalculator('-7 -5 -1 6 -7 -4 -10 -7 -10 4 / / / + /') ).toBe(0);
  });
  it("rpnCalculator('9 0 / -6 7 + -1 3 + 10 7 + -6 4 / 3 7 *') -> 0", function() {
    expect(rpnCalculator('9 0 / -6 7 + -1 3 + 10 7 + -6 4 / 3 7 *') ).toBe(0);
  });
  it("rpnCalculator('9 0 -6 7 -1 3 10 7 -6 4 3 7 / + + + / *') -> 0", function() {
    expect(rpnCalculator('9 0 -6 7 -1 3 10 7 -6 4 3 7 / + + + / *') ).toBe(0);
  });
  it("rpnCalculator('-4 9 - -3 2 / -10 2 * 0 6 - 3 -3 * -8 -6 * -9 6 +') -> 0", function() {
    expect(rpnCalculator('-4 9 - -3 2 / -10 2 * 0 6 - 3 -3 * -8 -6 * -9 6 +') ).toBe(0);
  });
  it("rpnCalculator('-4 9 -3 2 -10 2 0 6 3 -3 -8 -6 -9 6 - / * - * * +') -> 0", function() {
    expect(rpnCalculator('-4 9 -3 2 -10 2 0 6 3 -3 -8 -6 -9 6 - / * - * * +') ).toBe(0);
  });
  it("rpnCalculator('-4 -9 * -9 -9 / -3 -9 + 8 7 - 4 -1 * -1 -2 / 5 0 - 9 3 -') -> 0", function() {
    expect(rpnCalculator('-4 -9 * -9 -9 / -3 -9 + 8 7 - 4 -1 * -1 -2 / 5 0 - 9 3 -') ).toBe(0);
  });
  it("rpnCalculator('-4 -9 -9 -9 -3 -9 8 7 4 -1 -1 -2 5 0 9 3 * / + - * / - -') -> 0", function() {
    expect(rpnCalculator('-4 -9 -9 -9 -3 -9 8 7 4 -1 -1 -2 5 0 9 3 * / + - * / - -') ).toBe(0);
  });
  it("rpnCalculator('-6 4 * 7 -8 - 5 -10 - -9 10 + -4 8 + -6 7 - -9 -7 / -9 -9 * 6 8 *') -> 0", function() {
    expect(rpnCalculator('-6 4 * 7 -8 - 5 -10 - -9 10 + -4 8 + -6 7 - -9 -7 / -9 -9 * 6 8 *') ).toBe(0);
  });
  it("rpnCalculator('-6 4 7 -8 5 -10 -9 10 -4 8 -6 7 -9 -7 -9 -9 6 8 * - - + + - / * *') -> 0", function() {
    expect(rpnCalculator('-6 4 7 -8 5 -10 -9 10 -4 8 -6 7 -9 -7 -9 -9 6 8 * - - + + - / * *') ).toBe(0);
  });
  it("rpnCalculator('-1 9 * -5 3 + -7 -7 + -10 6 * -6 7 / -5 -6 + -2 4 * 10 9 / 0 -6 - 6 6 -') -> 0", function() {
    expect(rpnCalculator('-1 9 * -5 3 + -7 -7 + -10 6 * -6 7 / -5 -6 + -2 4 * 10 9 / 0 -6 - 6 6 -') ).toBe(0);
  });
  it("rpnCalculator('-1 9 -5 3 -7 -7 -10 6 -6 7 -5 -6 -2 4 10 9 0 -6 6 6 * + + * / + * / - -') -> 0", function() {
    expect(rpnCalculator('-1 9 -5 3 -7 -7 -10 6 -6 7 -5 -6 -2 4 10 9 0 -6 6 6 * + + * / + * / - -') ).toBe(0);
  });
});
