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
  var strings = arguments[1];
  var board = [];
  for (var i = 0; i < strings.length; i++){
  	board.push(strings[i].split(" "));
  }
  var width = board[0].length;
  var height = board.length;

  var words = [];
  var hWords = function(){
  	for (var i = 0; i < height; i++){
  	var word = '';	
  		for (var j = 0; j < width; j++){
  			word+=board[i][j];
  		}
  		words.push(word);
  	}
  };
  var vWords = function(){
  	for (var i = 0; i < width; i++){
  	var word = '';	
  		for (var j = 0; j < height; j++){
  			word+=board[j][i];
  		}
  		words.push(word);
  	}
  };

  hWords();
  vWords();

  var findWord = function(word, mode){
  	for (var i = 0; i < words.length; i++){
	  	if (words[i].indexOf('#') !== -1){
	  		if (mode === 'strict'){
	  			if (words[i] === word)
	  				return true;
	  		}
	  		else{
	  			if (words[i].indexOf(word) !== -1){
	  				return true;
	  			}
	  		}
	  	}
	}
  	return false;
  }

  //'the'  _ _ e

  var numSpaces = function(s){
  	var count = 0;
  	for (var i = 0; i < s.length; i++){
  		if (s[i] === '_')
  			count++;
  	}
  	return count;
  };

  var canFit = function (word, space){
  	// console.log('does ' + word + ' fit in', space);
  	if (word.length > space.length)
  		return false;
  	var fits = true;
  	var done = false;
  	for (var i = 0, j = 0; i < space.length && j < word.length; i++, j++){
  		// console.log(word[j] + ' <--> ' + space[i]);
  		if (space[i] === '#'){
  			// console.log('found a #, quitting.');
  			j = -1;
  			continue;
  		}
  		else if (word[j] !== space[i] && space[i] !== '_'){
  			fits = false;
  		}
  		else if (j === word.length-1 && i === space.length-1)
  			done = true;
  	}
  	if (!done)
  		fits = false;
  	// console.log('returning', fits, '!');
  	return fits;
  };
  var checkFit = function(){
  	for (var i = 0; i < words.length; i++){
  		if (canFit(word, words[i]))
  			return true;
  	}
  	return false;
  };
  
  if (findWord(word, 'simple') || findWord('_'.repeat(word.length), 'strict') || checkFit()){
  	return true;
  }
  else
  	return false;
}
