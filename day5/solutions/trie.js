// This is a Trie. We can represent search indexes using this.
// It's a tree where each node is a letter (except for the
// root node which represents empty string).
//
// A node is marked as a terminal if a word ends there.
//
// So if we insert 'HELLO' the tree will be:
//
//    H -> E -> L -> L -> O
//
// But only O will be a terminal. So until I insert
//
// It let's us check if we've seen a word before.
//
//
// ex.
//  var t = new Trie();
//  t.insert('hello');
//  t.search('hello') -> true
//  t.search('hell') -> false
//  t.search('hel') -> false
//  t.search('he') -> false
//  t.search('h') -> false
//
//  t.insert('he') // Insert 'he' now
//  t.search('he') -> true
//  t.search('hel') -> false
//  t.search('h') -> false
function Trie(letter) {
  this.letter = letter;
  this.children = {};
  this.terminal = false;
}

// Write a function that searches tree and returns true if and only if the
// exact given word has been inserted before.
Trie.prototype.search = function(word) {
  // YOUR CODE HERE
  if (word.length === 0) {
    return this.terminal;
  }

  return _.has(this.children, word[0]) &&
    this.children[word[0]].search(word.substring(1));
}

// Write a function that inserts given word into the trie.
Trie.prototype.insert = function(word) {
  // YOUR CODE HERE
  if (word.length === 0) {
    this.terminal = true;
    return;
  }

  if (! _.has(this.children, word[0])) {
    this.children[word[0]] = new Trie(word[0]);
  }

  this.children[word[0]].insert(word.substring(1));
}

// Write a function that removes given word from the trie.
// You can do this by setting 'terminal = false' for the right node.
//
// If the word is not already stored, you don't need to do anything.
// You don't need to remove branches of the tree that are no longer
// used.
Trie.prototype.remove = function(word) {
  // YOUR CODE HERE
  if (word.length === 0) {
    this.terminal = false;
  }

  if (_.has(this.children, word[0])) {
    this.children[word[0]].remove(word.substring(1));
  }
}

// Write a function that counts all the words in this trie and
// returns the count;
//
// Only nodes that are terminals should counted.
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
  if (prefix.length === 0) {
    return this.countWords();
  }
}
