'use strict';

window.comp = {};

// In this exercise, you are going to take the following array of basic values
// for all different types - from booleans to numbers to arrays -

var valuesToCheck = function() {
  return [true, false, 1, 0, -1, "true", "false", "1", "0",
"-1", "", null, undefined, Infinity, -Infinity, [], {}, [[]], [0], [1], NaN];
}

// Good luck!
function compare(type){
  // YOUR CODE HERE
  var twoD = [];
  var array = valuesToCheck();
  for (var i = 0; i < array.length; i++){
    for (var j = 0; j < array.length; j++){
      var temp = [];
      if (Array.isArray(array[i]))
        temp.push(array[i].slice());
      else if (_.isEqual(array[i], {}))
        temp.push({});
      else
        temp.push(array[i]);
      if (_.isEqual(array[j], []))
        temp.push(array[j].slice());
      else if (_.isEqual(array[j], {}))
        temp.push({});
      else
        temp.push(array[j]);
      twoD.push(temp);
    }
  }


  var obj = {};

  for (var i = 0; i < twoD.length; i++){
    var s = '';
    if (typeof twoD[i][0] === "string"){
      s += "\"" + twoD[i][0] + "\"";
    }
    else if (_.isEqual(twoD[i][0], [])){
      s += "[]"
    }
    else if (_.isEqual(twoD[i][0], [[]])){
      s += "[[]]"
    }
    else if (_.isEqual(twoD[i][0], [0])){
      s += "[0]"
    }
    else if (_.isEqual(twoD[i][0], [1])){
      s += "[1]"
    }
    else if (_.isEqual(twoD[i][0], {})){
      s += "{}"
    }
    else
    s += String(twoD[i][0]);
  s += '_'
  if (typeof twoD[i][1] === "string"){
      s += "\"" + twoD[i][1] + "\"";
    }
    else if (_.isEqual(twoD[i][1], [])){
      s += "[]"
    }
    else if (_.isEqual(twoD[i][1], [[]])){
      s += "[[]]"
    }
    else if (_.isEqual(twoD[i][1], [0])){
      s += "[0]"
    }
    else if (_.isEqual(twoD[i][1], [1])){
      s += "[1]"
    }
    else if (_.isEqual(twoD[i][1], {})){
      s += "{}"
    }
    else
       s += twoD[i][1];
    if (type === '==')
      obj[s] = twoD[i][0] == twoD[i][1];
    else {
      obj[s] = twoD[i][0] === twoD[i][1];
    }
  }

  return obj;
}

comp.testLooseEquality = function() {
    // YOUR CODE HERE
    return compare('==');
};

comp.testStrictEquality = function() {
    // YOUR CODE HERE
    return compare('===');
};
