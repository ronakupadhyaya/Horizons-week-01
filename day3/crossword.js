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
function findViableSpace (word, space, pad1, pad2) {
  if (pad1 === "#" && pad2 === "#"){
    for (var i = 0; i < space.length; i++) {
      if(space[i] !== "_"){

      }
    }
  }
}

function solveCrossword(word, arr) {
  // must use the entirety of all spaces left or right
  // may not use hashes, but hashes act allow you to bind words

  // recreates the arr without spaces
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].split(" ").join("");
  }

  console.log(arr);
  var yes = false;
  //horizontal test
  if(arr[0].length > word.length){
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j <= array[0].length - word.length; j++) {
        var pad1 = arr[i].substring(j-1, j) || "#";
        var pad2 = arr[i].substring(j + word.length, j + word.length+1) || "#";
        var space = arr[i].substring(j, j + word.length);
        if(findViableSpace(word, space, pad1, pad2)) yes = true;
      }
    }
  }

  //vertical test
  if (arr.length > word.length){
    for (var j = 0; j < arr[0].length; j++) {
      for (var i = 0; i <= arr.length - word.length ; i++) {
        var space = "";
        var pad1 = arr[i-1][j] || "#";
        var pad2 = arr[i+word.length][j] || "#"
        for (var k = i; k < i + word.length; k++) {
          space += arr[k][j];
        }
        if(findViableSpace(word, space, pad1, pad2)) yes = true;
      }
    }
  }

  return yes;
}
