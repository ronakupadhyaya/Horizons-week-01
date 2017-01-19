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
function solveCrossword(str, puzzle) {
  // YOUR CODE HERE
  var trimmedPuzzle = []
  for(var k = 0; k < puzzle.length; k++){
    trimmedPuzzle.push(puzzle[k].replace(/ /g,''));
  }
  console.log(trimmedPuzzle);
  for(var i = 0; i < trimmedPuzzle.length; i ++){
    if(canFitHorizontally(trimmedPuzzle[i], str)){
      return true;
    }
  }
  var columns = horizontalize(trimmedPuzzle);
  for(var i = 0; i < columns.length; i ++){
    if(canFitHorizontally(columns[i], str)){
      return true;
    }
  }
  return false;
}


function canFitHorizontally(row, str){
  var splitRows = row.split('#');
  for(var i = 0; i < splitRows.length; i ++){
    if(splitRows[i].length !== str.length){
      continue;
    }

    var flagInner = true;
    for(var j = 0; j < splitRows[i].length;  j++){
      console.log(splitRows[i][j], str[j]);
      if(splitRows[i][j] === '_' || splitRows[i][j] === str[j]){
        continue;
      }
      flagInner = false;
      break;
    }
    if(flagInner) return true;
  }
  return false;
}


function horizontalize(puzzle){
  var horizontalizedColumns = [];
  for(var i = 0; i < puzzle[0].length; i++){
    var str = '';
    for(var j = 0; j < puzzle.length; j++){
      str += puzzle[j][i];
    }
    horizontalizedColumns.push(str);
  }
  return horizontalizedColumns;
}
