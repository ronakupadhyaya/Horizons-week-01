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
  // YOUR CODE HERE
  puzzle = puzzle.map(function(e) {return e.split(' ');});
  console.log(puzzle);
  var numTrue = 0;
  // check horizontally
  for (let i = 0; i < puzzle.length; i++) {
  	for (let k = 0; k <= puzzle[i].length - word.length; k++) {
  		if (puzzle[i][k] === '#') {
  			continue;
  		}
  		for (let j = 0; j < word.length; j++) {
  			if (legalPlacement(word[j], [i, k + j], puzzle)) {
  				numTrue++;
  			}
  		}
  		if (numTrue === word.length) {
  			console.log('im in')
  			console.log(k);
  			console.log(k + word.length);
  			console.log(puzzle[i].length);
  			if ((k - 1 < 0 || puzzle[i][k - 1] === '#') && (k + word.length >= puzzle[i].length || puzzle[i][k + word.length] === '#')) {
  				return true;
  			}

  		} else {
  			numTrue = 0;
  	}
  	}
  }
  // puzzle = transpose(puzzle);
  // var newpuzzle = [];
  // for(var i=0;i<puzzle.length;i++){
  // 	var temp = []
  // 	for(var j=0;j<puzzle[i].length;j++){
  // 		temp.push(puzzle[j][i]);
  // 	}
  // 	newpuzzle.push(temp);
  // }
  // puzzle = newpuzzle;
  puzzle = transpose(puzzle);
  var numTrue = 0;
  // check vertically
  for (let i = 0; i < puzzle.length; i++) {
  	for (let k = 0; k <= puzzle[i].length - word.length; k++) {
  		if (puzzle[i][k] === '#') {
  			continue;
  		}
  		for (let j = 0; j < word.length; j++) {
  			if (legalPlacement(word[j], [i, k + j], puzzle)) {
  				numTrue++;
  			}
  		}
  		if (numTrue === word.length) {
  			console.log('im in')
  			console.log(k);
  			console.log(k + word.length);
  			console.log(puzzle[i].length);
  			if ((k - 1 < 0 || puzzle[i][k - 1] === '#') && (k + word.length >= puzzle[i].length || puzzle[i][k + word.length] === '#')) {
  				return true;
  			}

  		} else {
  			numTrue = 0;
  	}
  	}
  }

  return false;
}

// returns true if legal, false otherwise
function legalPlacement(currLetter, index, puzzle) {

	if (puzzle[index[0]][index[1]] === '#') {
		return false;
	} else if (puzzle[index[0]][index[1]] === currLetter) {
		return true;
	} else if (puzzle[index[0]][index[1]] === '_') {
		return true;
	} else {
		return false;
	}
}

function transpose(a)
{
  return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}
