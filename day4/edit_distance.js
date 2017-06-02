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
	debugger;
  	var matrix = [];
  	if (str1.length === 0 || str2.length === 0) {
  		return Math.max(str1.length, str2.length);
  	}
 	for (var i = 0; i < str1.length + 1; i++) {
 		matrix[i] = [];
 	 	matrix[i][0] = i;
 	}
  	for (var j = 0; j < str2.length + 1; j++) {
  		matrix[0][j] = j;
 	}
  	for (var m = 1; m < str2.length + 1; m++) {
		for (var k = 1; k < str1.length + 1; k++) {
		  	var min = Math.min(matrix[k][m - 1], matrix[k - 1][m]) + 1;
		  	var diagCost = 1;
	 	 	if (str1[k - 1] === str2[m - 1]) {
	 	 		diagCost = 0;
	 	 	}
		 	matrix[k][m] = Math.min(matrix[k - 1][m - 1] + diagCost, min);
		}
	}
	return matrix[str1.length][str2.length];
}
