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
  var flag = true;
  //  console.log("The word is :", word);

  var board = Array.prototype.slice.call(arguments).slice(1);
  var boardTmp = [];
  for (var i = 0; i < board[0].length; i++) {
    boardTmp.push(board[0][i].split(' '));
  }

  var BoardVerti = boardTmp.slice();

  for (var i = 0; i < boardTmp.length; i++) {
    var linePadded = padding(boardTmp[i]);
    console.log("horizontally", linePadded);
    var resultPerLine = checkRow(linePadded, word);

    if (resultPerLine) {
      return true;
    }
  }
  //checking vertically
  BoardVerti = rotateRight(BoardVerti);
  for (var i = 0; i < BoardVerti.length; i++) {
    var linePadded = padding(BoardVerti[i]);
    console.log("vertical", linePadded);
    var resultPerLine = checkRow(linePadded, word);
    if (resultPerLine) {
      return true;
    }
  }
  return false;
}

function padding(arr) {
  if (arr[0] !== '#') {
    arr.unshift('#');
  }
  if (arr[arr.length - 1] !== '#' || arr.length === 1) {
    arr.push('#');
  }
  //  console.log(arr);
  return arr;
}

// TODO: check rotateRight issue; check when more then 3 lines
// function rotateRight(arr, arrLen) {
//   for (var i = 0; i < arrLen; i++) {
//     for (var j = 0; j < i; j++) {
//       //swap element[i,j] and element[j,i]
//       var temp = arr[i][j];
//       arr[i][j] = arr[j][i];
//       arr[j][i] = temp;
//     }
//   }
//   //console.log(arr);
// }
function rotateRight(arr) {
  var tmpArr1 = [];

  for (var i = 0; i < arr[0].length; i++) {
    var tmpArr = [];
    for (var j = 0; j < arr.length; j++) {
      tmpArr.push(arr[j][i]);
    }
    tmpArr1.push(tmpArr);

  }
  return tmpArr1;
}
