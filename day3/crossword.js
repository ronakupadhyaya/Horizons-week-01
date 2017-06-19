// Challenge: Crossword
//
// Write a function that takes a string and a partially-filled crossword puzzle
// board, and returns true if the input string can be legally placed onto the
// board.
//
// The crossword puzzle board is represented by an array containing strings.
// Each array represents a partially filled row.  Empty spaces are denoted with
// an underscore (_), unusable spaces are denoted with a hash symbol (#), and
// pre-filled spaces have a character in place.  Each tile is separated by one
// and only one space.
//
// For a word to be legally placed on the board:
// - It is already on the board.
// - It may use empty spaces (underscores).
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
function solveCrossword(word, puzzle) {
  var args = Array.prototype.slice.call(arguments);
  var word = args.shift().split("");
  var puzzle = args.shift();
  var puzzleArr = [];
  var next = 0;
  puzzle = puzzle.forEach(function(item) {
      puzzleArr.push(item.split(" "));
  });
  function pass() {
      for(var i = 0; i < puzzleArr.length; i++) {
          for(var j = 0; j < puzzleArr[i].length; j++) {
              console.log(word[next], puzzleArr[i][j]);
              if (next === word.length - 1) {
                  if(typeof puzzleArr[i][j+1] === "string" || puzzleArr[i][j+1] === "_") {
                      next = 0;
                  }
                  else {
                      return true;
                  }
              }
              else if (next === word.length - 1 && i === puzzleArr.length - 1 && j === puzzleArr[i].length) {
                  return true;
              }
              else if (!(next === word.length - 1) && i === puzzleArr.length - 1 && j === puzzleArr[i].length) {
                  return false;
              }
              else if (puzzleArr[i][j] === word[next] || puzzleArr[i][j] === "_") {
                  if (typeof puzzleArr[i][j-1] === "string") {
                      return false;
                  }
                  else {
                      next = next + 1;
                  }
              }
              else if (puzzleArr[i][j] === "#") {
                  next = 0;
              }
          }
      }
  }
  console.log(pass());
  // return pass();
}
