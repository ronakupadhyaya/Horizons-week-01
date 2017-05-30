"use strict";

// Write a function that takes an array of strings and returns
// the sum of the total letters in all the words.
//
// Use Array.prototype.map() and Array.prototype.reduce()
//
// ex. countAllLetters([]) -> 0
// ex. countAllLetters(['']) -> 0
// ex. countAllLetters(['a', '', 'bc', 'd']) -> 4
function countAllLetters(words) {
  return words.map(function(word){
    return word.length;
  }).reduce(function(a,b) {
    return a + b;
  },0);
}

describe("countAllLetters()", function() {
  it("countAllLetters([]) -> 0", function() {
    expect(countAllLetters([]) ).toBe(0);
  });
  it("countAllLetters(['']) -> 0", function() {
    expect(countAllLetters(['']) ).toBe(0);
  });
  it("countAllLetters(['a', '', 'bc', 'd']) -> 4", function() {
    expect(countAllLetters(['a', '', 'bc', 'd']) ).toBe(4);
  });
});
