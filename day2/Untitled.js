function runCounter(func/* will be captured */) {
  var runCount = 0; // will be captured
  return function inner() {
    runCount = runCount + 1;
    func();
    return runCount;
  }
}

function square(x) { return x * x;}
function cube(x) { return x * x * x;}
var countedSquareFunction = runCounter(square);
var countedCubeFunction = runCounter(cube);
