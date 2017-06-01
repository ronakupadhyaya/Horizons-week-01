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
  var args = Array.prototype.slice.call(arguments);
  var word = args[0];
  var board = args[1];
  var possibleLineCount = 0;
  var possibleLine = [];
  var verticalImp = false;
  var fit = false;
  if (board.length < word.length) {
    verticalImp = true;
  }
  board.forEach(function(line) {
    if (blanksLeft(line) >= word.length) {
      possibleLineCount++;
      possibleLine.push(line);
    }
  })
  if (possibleLineCount === 0 && verticalImp) {
    return false;
  }

  var wordArr = [];
  for (var i=0; i<word.toString().length;i++) {
    wordArr.push(word[i]);
  }
  for (var i=0; i<board.length;i++) {
    var currentIndex;
    wordArr.forEach(function(letter) {
      currentIndex = posLineRow(letter,board[i])
      console.log(currentIndex)
      if (currentIndex > -1) {
        var outOfBounds = fitHorizon(currentIndex,wordArr.indexOf(letter),word.length, board[i])
        console.log(outOfBounds);
        if (outOfBounds) {
          console.log(fits(wordArr.indexOf(letter),currentIndex,word,board[i]))
          console.log(bounded(board[i],currentIndex,wordArr.indexOf(letter),word.length))
          if (fits(wordArr.indexOf(letter),currentIndex,word,board[i]) && bounded(board[i],currentIndex,wordArr.indexOf(letter),word.length)) {
            console.log("true")
             fit = true
          }
        }
      }
    })
  }
  return fit;
}

function bounded(str,indexStr,indexWord,wordLeng) {
  var arr = str.split(' ');
  //console.log(arr[indexStr-indexWord+wordLeng])
  console.log(indexStr)
  console.log(indexWord)
  console.log(arr)
  console.log(arr[indexStr-indexWord-1])
  if (arr[indexStr-indexWord+wordLeng] === '_') {
    return false;
  } else if (arr[indexStr-indexWord-1] === '_') {
    return false;
  } else {
    return true;
  }

}

function fits(indexWord, indexStr, word,str) {
  var arr = str.split(' ')
  console.log(arr)
  var number_= 0;
  var number = 0;
  for (var i=0;i<arr.length;i++) {
    if (arr[i] === '_') {
      number_++;
    } else if (arr[i] === '#') {
      number++;
    }
  }
  for (var i=indexStr-indexWord; i<indexStr+word.length; i++) {
    if (i>indexStr-indexWord && i<indexStr-indexWord+word.length && i!==indexStr) {
      if (arr[i] !== '_') {
        return false;
      }
    }
  }
  return true;
}

function blanksLeft(str) {
  var count = 0;
  var arr = str.split(' ');
  arr.forEach(function(char) {
    if (char === '_') {
      count++;
    }
  })
  return count;
}

function fitHorizon(indexStr,indexWord,lengthWord,str) {
  var numberOf = 0;
  var arr = str.split(' ');
  console.log(arr)
  for (var i=indexStr-indexWord; i<lengthWord;i++) {
    if (arr[i] === '#') {
      return false;

    }
  }
  if (arr.length-numberOf < lengthWord) {
    return false;
  }
  if (indexStr<indexWord) {
    return false;
  } else if (indexStr-indexWord+lengthWord > arr.length) {
    return false;
  }
  return true;
}

function posLineRow(letter,str) {
  var arr = str.split(' ');
  if (arr.includes(letter)) {
    return arr.indexOf(letter);
  }
}
