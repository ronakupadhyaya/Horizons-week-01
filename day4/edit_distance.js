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
    memo = {}
    memo["(0,0)"] = 0;
    for(var i = 1; i < str1.split("").length + 1; i++) {
        memo["("+i.toString()+",0)"] = i;
    }
    for(var j = 1; j < str2.split("").length + 1; j++) {
        memo["(0,"+j.toString()+")"] = j;
    }
    for(var i = 1; i < str1.split("").length + 1; i++) {
        for(var j = 1; j < str2.split("").length + 1; j++) {

        }
    }
    //   memo[(0,0)] = 0
    // //   console.log(memo);
    //   for i in range(1,len(str1)+1):
    //       memo[(i,0)] = i
    //   for j in range(1,len(str2)+1):
    //       memo[(0,j)] = j
    //   for i in range(1,len(str1)+1):
    //       for j in range(1,len(str2)+1):
    //           if str1[i-1] == str2[j-1]:
    //               memo[(i,j)] = memo[(i-1,j-1)]
    //           else:
    //               memo[(i,j)]=max((memo[(i-1,j-1)],
    //                                  memo[(i,j-1)],
    //                                  memo[(i-1,j)]))
    // //   # return memo[(len(str1), len(str2))]
    //
    //   for i in range(len(str1) + 1):
    //       for j in range(len(str2) + 1):
    //           print memo[(i,j)]
}
