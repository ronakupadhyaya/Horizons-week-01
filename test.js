util.calc = function(expression) {
  // YOUR CODE HERE

  // check that there is something inside
  if (! expression) {
    throw new Error('Empty expression');
  }

  // function to check that stuff are numbers
  function isNumber(n) {
    return ! isNaN(n);
  }

  // treat the args as an array
  // we know that each thing is separated by a space so let's split
  // on a space
  var things = expression.split(' ');

  // get the next thing
  function nextThing() {
    // grabs the next index item
    return things[i++];
  }

  // get the num
  function num() {
    // get the thing after it
    var cur = nextThing();
    // check that it's a num
    if (! isNum(cur)) {
      // not a num
      throw new Error('Expected number, got ' + cur);
    }
    // return the num/cur
    return + cur;
  }

  // get the operator
  function op() {
    // get a thing after it
    var cur = nextThing();
    // array to hold all that is an op
    var opArray = ['-', '+', '/', '*', 'sqrt'];
    // check that it's an operators
    if (opArray.indexOf(cur) < 0) {
      // if the cur thing doesn't exist
      throw new Error('Error, this is not an operator');
    }
    // return the operator/ current
    return cur;
  }

  // initialize variables before the loop
  var i = 0;
  var product = num();
  var tot = 0;

  // while we still have stuff
  while (i < things.length) {
    var oper = op();
    if (oper === '+') {
      tot += product;
      product = num();
    } else if (oper === '-') {
      tot += product;
      product = -num();
    } else if (oper === '*') {
      product *= num();
    } else if (oper === '/') {
      product /= num();
    }
  }

  return tot + product;
};
