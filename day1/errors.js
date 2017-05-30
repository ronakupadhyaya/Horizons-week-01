
var errors = function () {
  var permission = function () {
    if (false) {
      var x = 0;
    }
    console.log(x);
  };

  var recursion = function (num) {
    if (num > 100000) {
      return;
    }
    recursion(num + 1)
  };
}
