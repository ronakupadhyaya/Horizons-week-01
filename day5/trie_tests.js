"use strict";

describe("Trie.prototype.search", function() {
  // YOUR CODE HERE
});
describe("Trie.prototype.insert", function() {
  // YOUR CODE HERE
});
describe("Trie.prototype.remove", function() {
  // YOUR CODE HERE
});
describe("Trie.prototype.countWords", function() {
  // YOUR CODE HERE
});
describe("Trie.prototype.searchPrefix", function() {
  // YOUR CODE HERE
});


function randomWords(n) {
  return _.shuffle(words).slice(0, n);
}

function randomLetters(n) {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  return _.range(n).map(function() {
    return letters[_.random(0, letters.length - 1)];
  }).join('');
}

describe("End to end test", function() {
  it("insert words, check that they are there, check count, remove some, check count", function() {
    var t = new Trie();
    words.forEach(function(word) {
      t.insert(word);
    });
    expect(t.countWords()).toBe(words.length);

    words.forEach(function(word) {
      if (! t.search(word)) {
        fail(); // fail if you can't find all words
      }
    });

    words.forEach(function(word) {
      if (! t.search(word)) {
        fail(); // fail if you can't find all words
      }
    });

    var remove = randomWords(1000);
    remove.forEach(function (word) {
      t.remove(word);
      if (t.search(word)) {
        fail();
      }
    });

    expect(t.countWords()).toBe(words.length - 1000);

    // try 100 random letter combinations
    _.range(100).forEach(function() {
      var word = randomLetters(_.random(0, 10));
      var isActualWord = words.indexOf(word) > -1;
      if (!isActualWord && t.search(word)) {
        fail();
      }
    });
  });
});
