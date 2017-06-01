// Challenge: Crossword
//
// Write a function that takes a string and a partially-filled crossword puzzle
// board, and returns true if the input string can be legally placed onto the
// board.
//
// The crossword puzzle board is represented by an array containing strings.
// Each array represents a partially filled row.  Empty spaces are denoted with
// an underscore (_), unusable spaces are denoted with a hash symbol (#), and
// pre-filled spaces have a character in place.  Each tile is separted by one
// and only one space.
//
// For a word to be legally placed on the board:
// - It may use empty spaces (underscores)
// - It may use but must not conflict with any pre-filled characters.
// - It must not use any unusable spaces (hashes).
// - There must be no empty spaces (underscores) or extra characters before or
//   after the word (the word may be bound by unusable spaces though).
// - Characters are not case-sensitive.
// - Words may be placed vertically (proceeding top-down only), or horizontally
//   (proceeding left-right only).
//
// Adapted from 4clojure
// https://www.4clojure.com/problem/111
//
// ex. solveCrossword("the", ["_ # _ _ e"]) -> true
//
// ex. solveCrossword("the", ["c _ _ _",
//                            "d _ # e",
//                            "r y _ _"]) -> false
//
// ex. solveCrossword("joy", ["c _ _ _",
//                            "d _ # e",
//                            "r y _ _"]) -> true
//
// ex. solveCrossword("joy", ["c o n j",
//                            "_ _ y _",
//                            "r _ _ #"]) -> false
//
// ex. solveCrossword("clojure", ["_ _ _ # j o y",
//                                "_ _ o _ _ _ _",
//                                "_ _ f _ # _ _"]) -> true
//
// ex. solveCrossword("joy", ["_ # j o y",
//                            "o _ # _ _",
//                            "f _ # _ _"]) -> true
function solveCrossword() {
  if (arguments.length !== 2)
    throw "error: invalid input";

  function isUsable(char, place) {
    if (char === place || place === '_')
      return true;
    return false;
  }

  function doesFit(word, places) {
    if (word.length !== places.length) return false;
    for (var i = 0; i < places.length; i++) {
      if (!isUsable(word[i], places[i]))
        return false;
    }
    return true;
  }

  var word = arguments[0];
  var cw = arguments[1];

  if (word.length > cw[0].length && word.length > cw.length) {
    console.log("f bc length")
    return false;
  }
  //check left-right
  //iterate over array
  for (var a = 0; a < cw.length; a++) {
    var row = cw[a];
    var newRow = row.split(" ");
    row = newRow.join("");
    //iterate over row
    for (var r = 0; r < row.length; r++) {
      var place = row.substring(r, r+word.length);
      var test = doesFit(word, place);
      var next = r+word.length === row.length || row[r+word.length+1] === "#";
      var prev = r === 0 || row[r-1] === "#";
      if (test && next && prev) {
        return true;
      }
    }
  }

  //check up-down
  for (c = 0; c < cw[0].length; c++) {
    var col = [];
    //iterate over array to get column
    for (var a = 0; a<cw.length; a++) {
      col.push(cw[a][c]);
    }
    var place = col.join("");
    if (doesFit(word, place)) {
      return true;
    }

  }

  return false;
}
