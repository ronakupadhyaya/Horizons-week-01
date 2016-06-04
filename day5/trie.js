function Trie(letter) {
  // YOUR CODE HERE
  this.letter = letter || '';
  this.children = {};
  this.terminal = false;
}

Trie.prototype.search = function(word) {
  // YOUR CODE HERE
  if (word.length === 0) {
    return this.terminal;
  }

  return _.has(this.children, word[0]) &&
    this.children[word[0]].search(word.substring(1));
}

Trie.prototype.insert = function(word) {
  // YOUR CODE HERE
  if (word.length === 0) {
    this.terminal = true;
  }

  if (! _.has(this.children, word[0])) {
    this.children[word[0]] = new Trie(word[0]);
  }
  this.children[word[0]].insert(word.substring(1));
}

Trie.prototype.remove = function(word) {
  // YOUR CODE HERE
  if (word.length === 0) {
    this.terminal = false;
  }

  if (_.has(this.children, word[0])) {
    this.children[word[0]].remove(word.substring(1));
  }
}

Trie.prototype.countNodes = function() {
  // YOUR CODE HERE
}

Trie.prototype.countWords = function() {
  // YOUR CODE HERE
  var ret = 0;
  if (this.terminal) {
    ret++;
  }

  _.each(this.children, function(child) {
    ret += child.countWords();
  });

  return ret;
}

// Write a method that takes a string and returns the number of words
// that start with that prefix.
Trie.prototype.searchPrefix = function(prefix) {
  // YOUR CODE HERE
}
