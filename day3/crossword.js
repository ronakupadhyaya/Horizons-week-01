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
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function create2dBoard(board){
  return board.map(function(element, index, array){
    var returnArray = [];
    for(var i = 0; i <element.length;i++){
      returnArray.push(element[i]);
    }
    return returnArray;
  });
}

function buildVerticalArray(board){
  board = create2dBoard(board);
  var returnArray = [];
  for(var j =0; j < board[0].length ;j++){
    var verticalSubArray = [];
    for(var i =0; i< board.length;i++){
      verticalSubArray.push(board[i][j]);
    }
    returnArray.push(verticalSubArray);
  }

  return returnArray.filter(function(value, index, array){
    return index %2 ===0;
  });
}

function inputStringSpaced(inputString){
  var returnArray = [];
  for(var i =0; i<inputString.length;i++){
    returnArray.push(inputString[i]);
  }

  return returnArray.join(' ');
}
function checkWordOnBoard(inputString, board){

  board = create2dBoard(board);

  var verticalArray = buildVerticalArray(board);
  for(var i =0; i < board.length; i++){
    var spaceReduceRow = filterOutSpaces(board[i]);
    for(var j = 0; j < spaceReduceRow.length; j++){

      if(inputString[0] === board[i][j]){
          //first check horizontal
        if(inputStringSpaced(inputString) === board[i].slice(j, j+inputString.length+2).join('')){
          return true;
        }

        //then check vertical
        if(inputString ===verticalArray[j].slice(i, i+inputString.length+ 2).join('')){
          return true;
        }
      }
    }
  }
  return false;
}

function filterOutSpaces(row){
  return row.filter(function(element){
    return element !== ' ';
  })
}

function createTestSpaces(inputString){
  var inputStringLength = inputString.length;
  var core = Array(inputStringLength+1).join('_');
  return [core,'#' + core, core + '#', '#' + core + '#' ];
}

function checkLetterDirection(board, inputString, direction){
  var returnBool = false;
  var inputStringLength = inputString.length;
  for(var i =0; i<inputStringLength; i++){
    _.forEach(board, function(row, index, array){

      var spaceRow;
      if(direction ==='horizontal'){
        spaceRow = filterOutSpaces(row);
      }
      if(direction === 'vertical'){
        spaceRow = row;
      }
      _.forEach(spaceRow, function(letter, letterIndex, letterArray){
        if(inputString[i] === letter){
          // i is the index of the letter;
          //check before
          var underscoreCounterBefore = 0;
          var underscoreCounterAfter =0;
          console.log("WHAT", letterIndex-1)
          for(var j = letterIndex-1; j >= letterIndex - i; j--){

            var conditionedVariable = spaceRow.indexOf(inputString[j]) > -1 ? spaceRow.indexOf(inputString[j]) : undefined;
            if(spaceRow[j] === '_' || i - j === letterIndex - conditionedVariable){
              underscoreCounterBefore++;
            }


          }

          console.log(underscoreCounterBefore);

          //check after
          for(var j = letterIndex+1; j < letterIndex + inputStringLength-i; j++){
            var conditionedVariable = spaceRow.indexOf(inputString[j]) > -1 ? spaceRow.indexOf(inputString[j]) : undefined;
            if(spaceRow[j] ==='_' || j-i ===conditionedVariable - letterIndex){
              underscoreCounterAfter++;
            }
          }
          if(underscoreCounterAfter + underscoreCounterBefore + 1 === inputStringLength){
            var indexBefore = spaceRow[letterIndex - underscoreCounterBefore -1];
            var indexAfter = spaceRow[letterIndex + underscoreCounterAfter + 1];
            if((letterIndex - underscoreCounterBefore -1 < 0 || indexBefore ==='#') && (letterIndex + underscoreCounterAfter + 1 > spaceRow.length-1 || indexAfter ==='#' )){
              returnBool = true;
            }
          }
        }
      })
    });
  }
  return returnBool;
}

function checkLetterCombination(inputString, board){
  board = create2dBoard(board);
  var verticalArray = buildVerticalArray(board);
  var checkHorizontal = checkLetterDirection(board, inputString, 'horizontal');
  var checkVertical = checkLetterDirection(verticalArray, inputString, 'vertical');

  return  checkHorizontal || checkVertical ;

}

function checkSpace(inputString, board){
  board = create2dBoard(board);
  var inputStringLength = inputString.length;
  var verticalArray = buildVerticalArray(board);
  var returnArray = [];
  var checkArray = [inputStringLength+2, inputStringLength+1, inputStringLength];
  var testSpace = createTestSpaces(inputString);

  var trueReturn = false;
  for(var i =0; i<board.length;i++){
    var subArray = [];
    var space = filterOutSpaces(board[i]);
    for(var k = 0; k<checkArray.length; k++){
      for(var j = 0; j<space.length; j++){
        if(j+checkArray[k] <= space.length){
          subArray.push(space.slice(j, j+checkArray[k]));
        }
      }
    }
    _.forEach(subArray, function(element, index, array){
      // if(element.join('')==='_#_____'){
      //   console.log(testSpace[1]);
      //   console.log(space.join('').indexOf(testSpace[1]));
      //   console.log(space.length - inputStringLength);
      // }
      if(element.join('').indexOf(testSpace[3]) > -1){
        trueReturn = true;
      }
      if(element.join('').indexOf(testSpace[2]) === 0 && space.length ===testSpace[2].length){
        trueReturn = true;
      }
      if(element.join('').indexOf(testSpace[1]) > -1 && space.join('').indexOf(testSpace[1]) === space.length-1-inputStringLength){
        trueReturn = true;
      }
      if(element.join('').indexOf(testSpace[0]) > -1 && inputStringLength===space.length){
        trueReturn = true;
      }
    })

  }
  return trueReturn;

}


function solveCrossword() {
  // YOUR CODE HERE
  // checkWordOnBoard(arguments[0], arguments[1]);
  // if(checkWordOnBoard(arguments[0], arguments[1])){
  //   return true
  // } else{
  //   // if(checkSpace(arguments[0], arguments[1])){
  //   //   return checkLetterCombination(arguments[0], arguments[1]);
  //   // }
  //   return checkLetterCombination(arguments[0], arguments[1]);
  // }
  // if(checkWordOnBoard(arguments[0], arguments[1])){
  //   return true;
  // } else{
  //
  // }
  if(checkWordOnBoard(arguments[0], arguments[1])){
    return true;
  } else{
    return checkSpace(arguments[0], arguments[1]) || checkLetterCombination(arguments[0], arguments[1]);
  }


  // console.log(checkSpace("clo", ['_ _ # # j o y', '_ _ # _ _ _', '_ _ f _ # _ _']));
  // console.log(checkLetterCombination('joy', ['c _ _ _', 'd _ # e', 'r y _ _']));

}
