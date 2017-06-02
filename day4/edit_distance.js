// Challenge: Edit distance
//
// Given two strings x and y, calculate the edit distance of x and y, i. e. the
// minimum number of edits needed to transform x into y. The allowed edits are:
// - insert a single item
// - delete a single item
// - replace a single item with another item
//
// Edit distance is otherwise known as Levenshtein distance.  This is a good
// explanation of how to implement this algorithm efficiently:
// http://odur.let.rug.nl/kleiweg/lev/levenshtein.html
//
// NOTE: Inefficient solutions may take a long time to run!
//
// Adapted from 4clojure
// https://www.4clojure.com/problem/101



function differenceCount(shifted, static) {
    var matched1 = []
    while (static.length >= shifted.length) {
        for(var j = 0; j < shifted.length; j++) {
            if (shifted[j] === static[j]){
                if (matched1[j] !== 1) matched1[j] = 1
            }
        }
        static = static.substring(1)
    }
    return matched1.reduce(function (a, b) {
        return a + b;
        }, 0);

}

function editDistance(str1, str2) {
    var matched = []
    if (str1.length === str2.length) {
        var count = 0
        for (var i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i]) count += 1
        }
        return count
    } else {
        var count = 0


        if (str1.length < str2.length) {

            if (Math.abs(str1.length - str2.length) === 1) {
                for (var m = 0; m < str2.length; m++) {
                    if (str2[m] !== str1[m]) count += 1
                }
                return count
            }

            if (str1 === '') return str2.length
            count = differenceCount(str1, str2)
            return str2.length - count
        } else {

            if (Math.abs(str1.length - str2.length) === 1) {
                for (var m = 0; m < str1.length; m++) {
                    if (str2[m] !== str1[m]) count += 1
                }
                return count
            }

            if (str2 === '') return str1.length
            count = differenceCount(str2, str1)
            return str1.length - count
        }
    }
    throw new Error("Failed.")
}

// console.log(editDistance('1234',
// '02345'))


// console.log(editDistance('hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello', 'hallohallohallo'))
// console.log(editDistance('hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello', 'hallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallo'))


'ttttattttctg',
'tcaaccctaccat'
'x      x x   '

// '1234',
// '02345'
//
// 'abcd',
// 'ad'
//
// 'xyx',
// 'xyyyx'
//
// 'c  acaa  aattt'
// ' aa    aa     '
// 'gaattctaatctc',
// 'caaacaaaaaattt'
// ' xx    xx  x'
//
//
// 's   i g'
// 'kitten'
// 'sitting'
