// Week 1 Challenge Problem

// function allArgs() {
//  return _.toArray(arguments);
// }
// ex. partial(allArgs)() -> []
// ex. partial(allArgs)(0, 1, 2, 3, 4) -> [0, 1, 2, 3, 4]
// ex. partial(allArgs, 'x')() -> ['x']
// ex. partial(allArgs, 'x')(0, 1, 2, 3, 4) -> ['x', 0, 1, 2, 3, 4]
// ex. partial(allArgs, 'x')(0, 1, 2, 3, 4) -> ['x', 0, 1, 2, 3, 4]
function partial() {
  var args = _.toArray(arguments);
  var fn = args.shift();
  return function() {
    return fn.apply(null, args.concat(_.toArray(arguments)));
  }
}

function compose() {
  var args = _.toArray(arguments);
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) {
      result = args[i].call(this, result);
    }
    return result;
  };
}

function memoize(func) {
  var memoize = function(key) {
    var cache = memoize.cache;
    var address = '' + key;
    if (!_.has(cache, address)) {
      cache[address] = func.apply(null, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};
