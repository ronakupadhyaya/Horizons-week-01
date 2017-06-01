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
  	// YOUR CODE HERE
  	var word = arguments[0];
  	var crossword = arguments[1];

  	crossword = crossword.map(function(val){
  		return val.split(" ");
  	});

  	if(allHoriz(word, crossword)) return true;

  	var crossword2 = crossword[0].map(function(val, i){
  		return crossword.map(function(val, ii){
  			return val[i];
  		});
  	});

  	return allHoriz(word, crossword2);
}


function allHoriz(word, crossword){
	for(var i = 0; i < crossword.length; i ++){
		var row = crossword[i];
		var ii = 0;
		while(ii + word.length <= row.length ){
			var canFitHere = true;
	  		if(ii > 0 && row[ii - 1] !== "#"){
	  			canFitHere = false;
	  		}
	  		for(var iii = 0; iii < word.length; iii ++){
	  			if(row[ii + iii] !== "_" && row[ii + iii] !== word[iii])
	  				canFitHere = false;
	  		}
	  		if(ii + word.length < row.length && row[ii + word.length] !== "#"){
	  			canFitHere = false;
	  		}
			if(canFitHere) return true;
			ii ++;
		}
	}
	return false;
}