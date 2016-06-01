// Week 1 challenge: more functions from underscore.
//
// Implement the following functions from the underscore library.
// You'll need to use the 'arguments' object and function.apply()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

// http://underscorejs.org/#partial
function partial() {
  var args = _.toArray(arguments);
  if (! args.length) {
    throw "Insufficient arguments";
  }
  var fn = args.shift();
  return function() {
    return fn.apply(null, args.concat(_.toArray(arguments)));
  }
}

// http://underscorejs.org/#compose
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

// http://underscorejs.org/#memoize
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
