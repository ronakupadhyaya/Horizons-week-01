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
  var newPuzzle = {};
  var output = [];

  for (var i = 0; i < puzzle[0].length; i++) {
  	for (var j = 0; j < puzzle.length; j++) {
		if (j === 0) {
	  		newPuzzle[i] = "";
	  	}
		newPuzzle[i] = newPuzzle[i] + puzzle[j][i];
  	}
  	output.push(newPuzzle[i]);
  }
  
  var checkRow = solveCrosswordHelp(word, puzzle);
  var checkCol = solveCrosswordHelp(word, output);

  if (checkRow || checkCol) {
  	return true;
  }
  return false;
}

function solveCrosswordHelp(word, puzzle) {
  var wordI = 0;
  var found = false;
  var valid = true;
  for (var i = 0; i < puzzle.length; i++) {
  	var row = puzzle[i];
  	for (var j = 0; j < row.length; j++) {
  		if (row[j] === ' ') {
  			continue;
  		}
	  	if (found && (row[j] === '#')) {
	  		return true
	  	}

	  	if (!found && valid && (row[j] === word[wordI] || row[j] === '_')) {
	  		if (wordI === word.length - 1) {
	  			found = true;
	  			if (j === row.length - 1) {
	  				return true
	  			}
	  		}
	  		wordI = wordI + 1;
	  		valid = true;
			continue;
	  	}
	  	else if (row[j] !== '#') {
	  		valid = false;
	  		wordI = 0;
	  	}
	  	else {
	  		wordI = 0;
	  	}
  	}
  	valid = true;
  	found = false;
  }

  return false;
}
