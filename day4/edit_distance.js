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
  
  return (function getCost(str1, str2) {
  	var cost;
  	// base case: empty strings
  	if (str1.length === 0) { return str2.length; }
  	if (str2.length === 0) { return str1.length; }

  	// test for matching last chars
  	if (str1[str1.length - 1] === str2[str2.length- 1]) {// ? cost = 0 : cost = 1;
  		return getCost(str1.substring(0, str1.length - 1), str2.substring(0, str2.length - 1))
  	}
  	// recursive case
  	return 1 + Math.min(
  				getCost(str1.substring(0, str1.length - 1), str2), // remove on str1
  				getCost(str1, str2.substring(0, str2.length - 1)),//add on str1
  				getCost(str1.substring(0, str1.length - 1), str2.substring(0, str2.length - 1))
  		   );
  }(str1, str2));
}
