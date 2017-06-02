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

console.log(solveCrossword('onj', ['c o n j', '_ _ y _', 'r _ _ #']))

function alreadyOn(word, board){
    // horizontal
    for (var i = 0; i < board.length; i++) {
        var currentRow = board[i].join('')
        if (currentRow.indexOf(word) >= 0) return true
    }
    // vertical
    for (var dex = 0; dex < board[0].length; dex++) {
        var columnArr = []
        for (var row = 0; row < board.length; row++) {
            columnArr.push(board[row][dex])
        }

        if (columnArr.join('').indexOf(word) >= 0) return true
    }
    return false
}

function makeBoard(board){
    var arr = []
    for (var i = 0; i < board.length; i++) {
        console.log(board[i])
        arr.push(board[i].split(" "))
    }
    return arr
}

// function wordFitsRow(word, row) {
//     var count = 0;
//     for (var i = 0; i < row.length; i++) {
//         if (row[i] === '_' || row[i] === word[count]){
//             count ++;
//         }
//         else if (row[i] === '#' || row[i] !== word[count])
//     }
// }

function fillHorizontal(word, board) {
    for(var i=0; i < board.length; i++){
        var currentRow = board[i].join('');
        var startIndex = 0;
        var count = 0;
        for(var j=0; j < currentRow.length; j++){
            if(currentRow[j] === '_' || currentRow[j] === word[count]){
                count++;
            }
            else{
                count = 0;
                startIndex = j + 1;
            }

            if(count === word.length){
                console.log("hello")
                if ((startIndex === 0 || board[i][startIndex - 1] === '#') &&
                    (startIndex + word.length === board[i].length || board[i][startIndex + word.length] === '#' )){
                        return true
                    } else {
                        continue;
                        count = 0
                    }
            }
        }
    }
    return false
}

function transpose(board){
    // board = makeBoard(board)
    var newArray = board[0].map(function(col, i) {
        return board.map(function(row) {
            return row[i]
        })
    });
    return newArray
}

function solveCrossword(word, board) {
    board = makeBoard(board)
    if (alreadyOn(word, board)) return true

    if(fillHorizontal(word, board)) return true

    newBoard = transpose(board)

    if (fillHorizontal(word, newBoard)) return true

    return false
}
