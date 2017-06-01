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
function solveCrossword() {
  var str = arguments[0];
  var board = arguments[1];
  board = _.map(board, function(string) {
    return string.split(" ");
  });
  var count = [];
  var val = 0;
  var seen = false;
  var char = "";
  var newBoard =[];

  //left to right
  for (var i = 0; i < board.length; i++) {
    newBoard[i] = [];
    for (var j = 0; j < board[i].length; j++) {
      if (j < board.length) {
        newBoard[i][j] = board[j][i];
      }
      char = board[i][j];
      if (char === "_") {
        if (!seen) {
          val++;
        }
      } else if (char === "#") {
        seen = false;
        count.push(val);
        val = 0;
      } else {
        var index = str.indexOf(char);
        if (index !== -1 && index === val) {
          val++;
        } else {
          //count.push(val);
          seen = true;
          val = 0;
        }
      }
    }
    count.push(val);
    if (count.includes(str.length)) {
      return true;
    }
    seen = false;
  }

  count = [];
  val = 0;
  //top-down
  for (var i = 0; i < newBoard.length; i++) {
    for (var j = 0; j < newBoard[i].length; j++) {
      debugger;
      char = newBoard[i][j];
      if (char === "_") {
        if (!seen) {
          val++;
        }
      } else if (char === "#") {
        seen = false;
        count.push(val);
        val = 0;
      } else {
        var index = str.indexOf(char);
        if (index !== -1 && index === val) {
          val++;
        } else {
          //count.push(val);
          seen = true;
          val = 0;
        }
      }
    }
    count.push(val);
    if (count.includes(str.length)) {
      return true;
    }
    seen = false;
  }
  return false;
}
