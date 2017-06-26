function calculator(str){
  var strArr = str.split(' ')
  console.log(strArr);
//assume error checking has been complete



  for(var i = 1; i<strArr.length; i += 2){
      var operand1 = parseInt(strArr[i-1])
      var operand2 = parseInt(strArr[i+1])
      var result = operand1 + operand2

    };
    else if(strArr[i] === "-") {
      var operand1 = parseInt(strArr[i-1])
      var operand2 = parseInt(strArr[i+1])
      var result = operand1 - operand2
      strArr.splice(i-1, 3,result)
      break;
    }

  return strArr
}
calculator('1 + 2 -3 + 4')

//
