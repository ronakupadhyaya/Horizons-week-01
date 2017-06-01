// Challenge: Crossword
//
// Write a function that takes a string and a partially-filled crossword puzzle
// board, and returns true if the input string can be legally placed onto the
// board.
//
// The crossword puzzle board is represented by an array containing strings.
// Each array represents a partially filled row.  Empty spaces are denoted with
// an underscore (_), unusable spaces are denoted with a hash symbol (#), and
// pre-filled spaces have a character in place.  Each tile is sepearted by one
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
  // YOUR CODE HERE
  var word = arguments[0];
  var board = arguments[1];
  board = board.map(function(e) {
  	return e.split(" ")
  })

  function existsInRow(word, rowNum) {
  	var row = board[rowNum]
  	var return_val1 = false
  	console.log(row)
  	for (var i=0; i<row.length-word.length+1; i++) {
  		var return_val2 = true
  	  	for (var j=0; j<word.length; j++) {
  	  		console.log(row[i+j], word[j])
  	  		if (row[i+j] != word[j] && row[i+j] != "_") return_val2 = false;
  	  		if (return_val2) return_val1 = true;
  	  	}
  	};
  	return return_val1;
  };

  console.log(existsInRow("joy", 0))

  function existsInCol(row, colNum) {

  };



}
