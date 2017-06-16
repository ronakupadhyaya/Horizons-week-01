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
function editDistance(str1, str2) {
  var arr = [];

  for (var k = 0; k < str1.length; k++) {
    var temp = [];
    for (var j = 0; j < str2.length; j++) {
      temp.push(j + k)
    }
    arr.push(temp);
  }

  console.log(arr);

  for (var k = 1; k < str1.lenght; k++) {
    for (var j = 1; j < str2.length; j++) {

    }
  }



}