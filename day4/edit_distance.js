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
  // YOUR CODE HERE

  if (str1.length === str2.length) {
    var truthArr = [];
    var ctr = 0;
    var mapArr = _.map(str1, function(x, idx) {
      if (x !== str2[idx]) {
        ctr += 1
      }
      return (x === str2[idx])
    })
    return ctr;
  }

  ctr = 0;
  var newStr1 = str1.slice();
  for (var s in str2) {
    // console.log(str2[s], newStr1[s], str2[s] === str1[s], newStr1, str2, s)
    if (str2[s] !== newStr1[s]) {
      newStr1 = newStr1.slice(0,s) + str2[s] + newStr1.slice(s);
      ctr += 1
    }
  }
  // console.log(newStr1, ctr);
  return ctr;
}
