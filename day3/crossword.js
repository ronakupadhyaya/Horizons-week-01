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



function removeSpaces(aString){
  var chars = aString.split("");
  var index = chars.indexOf(" ");
  while(index>=0){
    chars.splice(index,1);
    index = chars.indexOf(" ");
  }
  return chars;
}

function checkSpot(spot,word){
  if(word.length !== spot.length){
    return false;
  }
  for(var i = 0; i<word.length;i++)
  {
    if(spot[i]==="_"){
      continue;
    }
    if(spot[i]!==word[i]){
      return false;
    }
  }
  return true;
}


function checkRow(row, word){
    word = word.split("");
    row = row.split("#");
    for(var spot in row){
      row[spot] = removeSpaces(row[spot]);
      if(checkSpot(row[spot],word)){
        return true;
      }
    }
    return false;
}

function findCol(index,board){
  var col = "";
  col += board[0][index];
  for(var i = 1; i<board.length; i++){
    col += " " + board[i][index];
  }
  return col;
}

function solveCrossword(word, board) {
  for(var i = 0; i<board.length;i++){
    if(checkRow(board[i],word)){
      return true;
    }
  }
  for(var i = 0; i<board[0].length;i++){
    if(checkRow(findCol(i,board),word)){
      return true;
    }
  }
  return false;
}
