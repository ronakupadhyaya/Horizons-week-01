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
function solveCrossword(guess, board) {
  if(board.length === 0) {
    throw "Empty gameboard!";
  }

  var convertedBoard = [];
  board.forEach(function(rowString) {
    var convertedRow = rowString.split(' ');
    convertedBoard.push(convertedRow);
  });
  var boardWidth = board[0].length;
  var boardHeight = board.length;
  var guessLength = guess.length;

  //check if the word can possibly fit on the board
  if(guessLength > Math.max(boardWidth, boardHeight)) {
    return false;
  }
  var currChar = guess.charAt(0); //current character of the guess being checked
  var currPosition; //current board[i][j] character on board
  var remainingChar = guess.length;
  //start by checking if the word can fit horizontally
  for(var i = 0; i < boardHeight; i++) { //i being the current row
    for(var j = 0; j < boardWidth - guessLength + 1; j++) { // j being current column
      // look for possible start locations ( _ or guess.charAt(0))
      // if is one, update currChar to the next and continue comparing
      // if remainingChar === 0, return true
      currPosition = convertedBoard[i][j];
      if()
    }
  }
}
