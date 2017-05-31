window.util = {};


util.splitExpression = function(expression){
  return expression.split("");
}

util.throwInvalid = function(arr){
  // valid if even number of item
  // valid if even number index is number
  // valid if odd number idex is NaN
  if(arr.length % 2 === 0){
    throw 'must have odd number of items';
  }

  if(arr.indexOf("sqrt") > -1){
    for (var i = 0; i < arr.length; i++) {
      if(arr[i] === "sqrt") arr.splice(arr.indexOf("sqrt"), 1)
      i--;
    }
  }

  for (var i = 0; i < arr.length; i++) {
    if(i % 2 === 0 && arr[i] === NaN) throw " too many operators";
    else if (i % 2 === 1 && arr[i] !== NaN) throw "too many numbers";
  }
}

util.opList = {
  "+": function (x,y) {
    return x+y;
  },
  "-": function (x,y) {
    return x-y;
  },
  "*": function (x,y) {
    return x*y;
  },
  "/": function (x,y) {
    return x/y;
  },
  "sqrt": function (y) {
    return Math.sqrt(y);
  }
}

util.cutOperation = function (arr, op1, op2) {
  while(arr.indexOf(op1) > -1 && arr.indexOf(op2)){
    var op = ""
    //set op to the earliest (index) operator, while checking to make sure that
    //both op1 and op2 are actually in arr
    if (!(arr.indexOf(op1)+1)) op = op2;
    else if(!(arr.indexOf(op2)+1)) op = op1;
    else op = arr.indexOf(op1) < arr.indexOf(op2) ? op1:op2;

    //find the index of the op
    var ind = arr.indexOf(op);

    //splice the answer of the operation
    if(op === "sqrt") arr.splice(ind, 2, util.opList[op](arr[ind + 1]));
    else arr.splice(ind - 1, 3, util.opList[op](arr[ind-1], arr[ind+1]));
  }
  return arr;
}

util.calc = function (expression){
  var arr = util.splitExpression(expression);
  util.throwInvalid(arr);
  util.cutOperation(arr, "sqrt", "");
  util.cutOperation(arr, "*", "/");
  util.cutOperation(arr, "+", "-");
  return arr[0];
}
