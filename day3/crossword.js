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
function solveCrossword(word, rows) {
  //all the rows, all the columns
  //number of consecutive empty spaces is equal to length of word
//  console.log("Word: " + word);
//  console.log("Rows: " + rows);

  //split rows into subarrays
  for (var i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split(" ");
  }

  //create columns array
  var cols = [];
  for (var i = 0; i < rows[0].length; i++) {
    var subCol = [];
    for (var j = 0; j < rows.length; j++) {
      subCol.push(rows[j][i]);
    //  console.log("hi");
    }
    cols.push(subCol);
  }

  //case 1: check if puzzle already has word
  //loop through the ROWS
  for (var i = 0; i < rows.length; i++) {
    var currentWord = "";
    for (var j = 0; j < rows[i].length; j++) {
      //make sure to add only consecutive letters
      //if letter add to current word
      //else make current word an empty string again
    //  console.log(rows[i][j]);
      if (/^[a-z]$/.test(rows[i][j])) {
        currentWord += rows[i][j];
      } else {
        currentWord = "";
      }
    //  console.log("Word in row " + (j + 1) + " is " + currentWord);
      if (currentWord === word) {
        return true;
      }
    }
  }
  console.log("Word already in row");
    //checking if word is already in crossword still
    //checking all COLUMNS
  for (var i = 0; i < cols.length; i++) {
    var currentWord = "";      for (var j = 0; j < cols[i].length; j++) {
        //make sure to add only consecutive letters
        //if letter add to current word
        //else make current word an empty string again
      //  console.log(cols[i][j]);
      if (/^[a-z]$/.test(cols[i][j])) {
        currentWord += cols[i][j];
      } else {
        currentWord = "";
      }
            //  console.log("Word in column " + (j + 1) + " is " + currentWord);
      if (currentWord === word) {
        return true;
      }
    }
  }
  console.log('Word already in column');
    //now to actually start checking
    //look for empty consecutive spaces equal to length of word
    //cannot be bounded by letters or underscores, hashes are okay
    //first rows
  for (var i = 0; i < rows.length; i++) {
    var frontBound = null; //stuff in front of spaces
    var backBound = null; //stuff behind the spaces
    var count = 0; //count for number of consecutive spaces
    var firstIndex = 0; //index at which the available empty spaces start at
    for (var j = 0; j < rows[i].length; j++) {
      if (count === word.length) {
        break;
      } else if (count === 0) {
        firstIndex = j;
      }
      if (rows[i][j] === '_') {
        count++;
      } else {
        count = 0;
      }
    }
    frontBound = rows[i].slice(0, firstIndex);
    backBound = rows[i].slice(firstIndex + count);

    //  console.log("Count is " + count);
    //  console.log("First index is " + firstIndex);
    //  console.log("Front bound: " + frontBound);
    //  console.log("Back bound: " + backBound);
    if (count < word.length) {
      continue;
    } else {
      console.log("For row, umber of consecutive spaces equals word length");
        //check bounds in frontBound
      var frontBoundOkay = true;
      var index = frontBound.length - 1;
      while (frontBound[index] !== '#' && index >= 0) {
        if (frontBound[index] === '_' || /^[a-z]$/.test(frontBound[index])) {
          frontBoundOkay = false;
          break;
        }
        index--;
      }
      //  console.log("Front bound okay: " + frontBoundOkay);
        //check bounds in backBound
      var backBoundOkay = true;
      index = 0;
      while (backBound[index] !== '#' && index <= backBound.length - 1) {
        if (backBound[index] === '_' || /^[a-z]$/.test(backBound[index])) {
          backBoundOkay = false;
          break;
        }
        index++;
      }
      //  console.log("Back bound okay: " + backBoundOkay);
      if (frontBoundOkay && backBoundOkay) {
        return true;
      }
    }
  }
  console.log("Available spaces in rows");
    //now checking for available spaces (no letters) in columns
  for (var i = 0; i < cols.length; i++) {
    var frontBound = null; //stuff in front of spaces
    var backBound = null; //stuff behind the spaces
    var count = 0; //count for number of consecutive spaces
    var firstIndex = 0; //index at which the available empty spaces start at
    for (var j = 0; j < cols[i].length; j++) {
      if (count === word.length) {
        break;
      } else if (count === 0) {
        firstIndex = j;
      }
      if (cols[i][j] === '_') {
        count++;
      } else {
        count = 0;
      }
    }
    frontBound = cols[i].slice(0, firstIndex);
    backBound = cols[i].slice(firstIndex + count);

    console.log("Count is " + count);
    console.log("First index is " + firstIndex);
    console.log("Front bound: " + frontBound);
    console.log("Back bound: " + backBound);
    if (count < word.length) {
      continue;
    } else {
      console.log("Number of consecutive spaces equals word length");
        //check bounds in frontBound
      var frontBoundOkay = true;
      var index = frontBound.length - 1;
      while (frontBound[index] !== '#' && index >= 0) {
        if (frontBound[index] === '_' || /^[a-z]$/.test(frontBound[index])) {
          frontBoundOkay = false;
          break;
        }
        index--;
      }
      console.log("Front bound okay: " + frontBoundOkay);
        //check bounds in backBound
      var backBoundOkay = true;
      index = 0;
      while (backBound[index] !== '#' && index <= backBound.length - 1) {
        if (backBound[index] === '_' || /^[a-z]$/.test(backBound[index])) {
          backBoundOkay = false;
          break;
        }
        index++;
      }
      console.log("Back bound okay: " + backBoundOkay);
      if (frontBoundOkay && backBoundOkay) {
        return true;
      }
    }
  }

}
