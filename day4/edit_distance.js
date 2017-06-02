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

  if (str1 === '') { return str2.length; }
  if (str2 === '') { return str1.length; }

  var delete_value = 1;
  var replace_value = 1;
  var insert_value = 1;
  
  // Create blank 2D array with the required size
  var distances = [];
  for (let i = 0; i < str1.length + 1; i++) {
    distances[i] = new Array(str2.length);
  }

  // Populate distance matrix with initial numbers
  for (let i = 0; i < str1.length + 1; i++) {
    distances[i][0] = i;
  }

  for (let j = 0; j < str2.length + 1; j++) {
    distances[0][j] = j;
  }

  // Fill in the rest of the spaces
  for (let i = 1; i < str1.length + 1; i++) {
    for (let j = 1; j < str2.length + 1; j++) {

      var replace_value = (str1.charAt(i-1) === str2.charAt(j-1) ? 0 : 1);
      distances[i][j] = Math.min(
        distances[i-1][j] + delete_value,
        distances[i-1][j-1] + replace_value,
        distances[i][j-1] + insert_value
      );
    }
  }
  return distances[str1.length][str2.length];
}
