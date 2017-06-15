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
  var word = arguments[0];
  var arr = arguments[1];
  var arrHorizontal = [];
  var arrVertical = [];

  //fills the horizontal array
  for (var k = 0; k < arr.length; k++) {
    arrHorizontal.push(arr[k].split(' ').join(''));
  }

  //fills the vertical array
  for (var j = 0; j < arrHorizontal[0].length; j++) {
    var temp = [];
    for (var k = 0; k < arrHorizontal.length; k++) {
      temp.push(arrHorizontal[k][j])
    }
    arrVertical.push(temp.join(''));
  }

  //checks the horizontals for already having the word
  for (var k = 0; k < arrHorizontal.length; k++) {
    if (arrHorizontal[k].indexOf(word) !== -1)
      return true;
  }

  //checks the verticals for already having the word
  for (var k = 0; k < arrVertical.length; k++) {
    if (arrVertical[k].indexOf(word) !== -1)
      return true;
  }

  //checks the horizontals for having enough blank spaces for the word
  var cnt = 0;
  for (var k = 0; k < arrHorizontal.length; k++) {
    for (var j = 0; j < arrHorizontal[0].length; j++) {
      if (arrHorizontal[k].charAt(j) === '_')
        cnt++;
      else
        cnt = 0;
      if (cnt === word.length) {
        if (word.length === arrHorizontal[0].length)
          return true;
        if (arrHorizontal[k].charAt(j + 1) === '' || arrHorizontal[k].charAt(j + 1) === '#')
          if (arrHorizontal[k].charAt(j - word.length) === '' || arrHorizontal[k].charAt(j + 1) === '#')
            return true;
        cnt = 0;
      }
    }
  }

  //checks the verticals for having enough blank spaces for the word
  cnt = 0;
  for (var k = 0; k < arrVertical.length; k++) {
    for (var j = 0; j < arrVertical[0].length; j++) {
      if (arrVertical[k].charAt(j) === '_')
        cnt++;
      else
        cnt = 0;
      if (cnt === word.length) {
        if (word.length === arrVertical[0].length)
          return true;
        if (arrVertical[k].charAt(j + 1) === '' || arrVertical[k].charAt(j + 1) === '#')
          if (arrVertical[k].charAt(j - word.length) === '' || arrVertical[k].charAt(j + 1) === '#')
            return true;
        cnt = 0;
      }
    }
  }

  //checks the horizontals for having enough blank spaces and letters for the word
  var cnt = 0;
  for (var k = 0; k < arrHorizontal.length; k++) {
    for (var j = 0; j < arrHorizontal[0].length; j++) {
      if (word.indexOf(arrHorizontal[k].charAt(j)) !== -1) {
        var works = true;
        for (var i = j - 1; i >= j - 1 - word.indexOf(arrHorizontal[k].charAt(j)); i--) {
          if (arrHorizontal[k].charAt(i) !== '_' &&
            arrHorizontal[k].charAt(j - 1 - word.indexOf(arrHorizontal[k].charAt(j))) !== '#' &&
            arrHorizontal[k].charAt(j - 1 - word.indexOf(arrHorizontal[k].charAt(j))) !== '') {
            console.log(arrHorizontal[k].charAt(i))
            works = false;
            break;
          }
        }

        debugger;
        var works2 = true;
        if (works) {
          for (var i = j + 1; i < j + word.length - word.indexOf(arrHorizontal[k].charAt(j)); i++) {
            // console.log(arrHorizontal[k].charAt(j + word.length - word.indexOf(arrHorizontal[k].charAt(j))))
            if (arrHorizontal[k].charAt(j + word.length - word.indexOf(arrHorizontal[k].charAt(j))) === '_' || arrHorizontal[k].charAt(i) !== '_') {
              works2 = false;
              break;
            }
          }
          if (works2)
            return true;
        }
      }
    }
  }


  //checks the verticals for having enough blank spaces and letters for the word
  var cnt = 0;
  for (var k = 0; k < arrVertical.length; k++) {
    for (var j = 0; j < arrVertical[0].length; j++) {
      if (word.indexOf(arrVertical[k].charAt(j)) !== -1) {
        var works = true;
        for (var i = j - 1; i >= j - word.indexOf(arrVertical[k].charAt(j)); i--) {
          if (arrVertical[k].charAt(i) !== '_') {
            works = false;
          }
        }
        var works2 = true;
        if (works) {
          for (var i = j + 1; i < j + word.length - word.indexOf(arrVertical[k].charAt(j)); i++) {
            if (arrVertical[k].charAt(i) !== '_') {
              works2 = false;
            }
          }
          if (works2)
            return true;
        }
      }
    }
  }
  return false;
}
