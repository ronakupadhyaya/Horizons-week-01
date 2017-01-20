//once
//var myNewFunc = once(func);
var once = function(fn){
  var called = false;
  var ret;
  return function (){
    //was it called before
    //call fn
    //swap called at the right time
    //store the fn call to ret
    if (called){
      return ret;
    }
    if(!called){
      ret = fn();
      called = true;
      return ret;
    }
  }
}
var func = function(){
  console.log('hey');
}
var onceFunc = once(func);
