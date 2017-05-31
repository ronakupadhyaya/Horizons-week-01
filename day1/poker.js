"use strict";

// Write a function that takes two poker hands and determines which hand is the
// winner. If the first hand is the winner, this function should return 1, if
// the second hand is the winner this function should return 2.
//
// Each hand is represented by an array of 5 strings, each string representing
// a card.  The the last letter of each card represents the suite, the
// remaining letters represent the number.  For example, 5H is the 5 of hearts,
// KS is the king of spades, 10D is the 10 of diamonds.
//
// Aces are represented by 'A', Kings by 'K', Queens by 'Q', and Jacks
// by 'J'.
//
// In the card game poker, a hand consists of five cards and are ranked, from
// lowest to highest, in the following way:
//
//   - High Card: Highest value card.
//   - One Pair: Two cards of the same value.
//   - Two Pairs: Two different pairs.
//   - Three of a Kind: Three cards of the same value.
//   - Straight: All cards are consecutive values.
//   - Flush: All cards of the same suit.
//   - Full House: Three of a kind and a pair.
//   - Four of a Kind: Four cards of the same value.
//   - Straight Flush: All cards are consecutive values of same suit.
//   - Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
//
// The cards are valued in the order:
// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
//
// If two players have the same ranked hands then the rank made up of the
// highest value wins; for example, a pair of eights beats a pair of fives (see
// example 1 below). But if two ranks tie, for example, both players have a
// pair of queens, then highest cards in each hand are compared (see example 4
// below); if the highest cards tie then the next highest cards are compared,
// and so on.
//
// ex. rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', '10D']) -> 2, Pair of 8 vs Pair of 5
//
// ex. rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) -> 1, High card Ace vs High card Queen
//
// ex. rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', '10D', 'QD']) -> 2, 3 aces vs Diamond flush
//
// ex. rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) -> 1, Pair of Q with high 9, Pair of Q with high 7
//
// ex. rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) -> 1, Full house with 3 4s, Full house with 3 3s
window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  var countArr1 = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  var countArr2 = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  var hand1Times1 = 0;
  var hand2Times1 = 0;
  var hand1Times2 = 0;
  var hand2Times2 = 0;
  var hand1HighestNum =0
  var hand2HighestNum = 0;
  var hand1stright = false;
  var hand2stright = false;
  var hand1Conv=convertHand(hand1);
  var hand2Conv=convertHand(hand2);

  var color1=0;
  var color2=0;

  var color=hand1[0].charAt(1);

  for(var i = 0;i<hand1.length;i++){
    if(hand1[i].length>2){
      if(hand1[i].charAt(2) === color){
        color1++;
      }
    }
    if(hand1[i].charAt(1) === color){
      color1++;
    }
  }
  console.log(color1);

  var color2tmp=hand2[0].charAt(1);
  if(color2tmp==0){
    var color2tmp=hand2[0].charAt(2);
  }

  for(var i = 0;i<hand2.length;i++){
    //console.log(hand2[i].charAt(1));
    if(hand2[i].length>2){
      if(hand2[i].charAt(2) === color2tmp){
        color2++;
      }
    }
    else if(hand2[i].charAt(1) === color2tmp){
      color2++;
    }
  }
  console.log(color2);  //redundent could be eliminated by object

  if (color1 === 5){
    console.log("color 1 flush")
  }

  if (color2 === 5){
    console.log("color 2 flush")
  }
  console.log(hand2Conv);

  for(var i = 0; i< hand1Conv.length; i++){
    countArr1[hand1Conv[i]]++;
    console.log(hand1Conv[i]);
  }

  for(var i = 0; i < hand2Conv.length; i++){
    countArr2[hand2Conv[i]]++;
  }

  for(var i = 0; i < countArr1.length;i++){
    if(countArr1[i] === 1){
      hand1Times1++;
      if(hand1HighestNum < 1){
        hand1HighestNum = 1;
      }
    }

    else if(countArr1[i] === 2){
      hand1Times2++;
      if(hand1HighestNum < 2){
        hand1HighestNum = 2;
      }
    }
    else if(countArr1[i] === 3 && hand1HighestNum < 3 ){
      hand1HighestNum = 3;
    }
    else if(countArr1[i] === 4 ){
      hand1HighestNum = 4;
    }
  }

  for(var i = 0; i < countArr2.length;i++){
    if(countArr2[i] === 1){
      hand2Times1++;
      if(hand2HighestNum < 1){
        hand2HighestNum = 1;
      }
    }
    else if(countArr2[i] === 2){
      hand2Times2++;
      if(hand2HighestNum < 2){
        hand2HighestNum = 2;
      }
    }
    else if(countArr2[i] === 3 && hand2HighestNum < 3 ){
      hand2HighestNum = 3;
    }
    else if(countArr2[i] === 4 ){
      hand2HighestNum = 4;
    }
  }


  console.log("count array"+ countArr1);
  console.log("count array"+ countArr2);

  console.log("hand1HighestNum" + hand1HighestNum);
  console.log("hand2HighestNum" + hand2HighestNum);
  if(hand1HighestNum === hand2HighestNum){
    console.log("Same hirarachy");
    if(hand1HighestNum == 1){
      if(hand1Times1 === 5 && hand2Times1 === 5 ){
        var tmpHigh1 = countArr1.lastIndexOf(1);
        var tmpHigh2 = countArr2.lastIndexOf(1);
        for(var i = tmpHigh1; i > tmpHigh1-5;i--){
          if(countArr1[i] === 0){ //no number in a row
            hand1stright = false;
            break;
          }
          hand1stright =true;

        }

        for(var i = tmpHigh2; i > tmpHigh2-5;i--){
          if(countArr2[i] === 0){ //no number in a row
            var hand2stright = false;
            break;
          }
          hand2stright=true;
        }

      }
      if(hand1stright === true && hand2stright === true ){
        if(color1 === 5 || color2 === 5){
          if(color1 === 5 && color2 !== 5){
            return 1;
          }
          else if (color1 !== 5 && color2 === 5){
            return 2;
          }
        }
        if(tmpHigh1 > tmpHigh2){
          return 1;
        }
        else{
          return 2;
        }
      }
      else if (hand1stright === true && hand2stright === false){
        return 1;
      }
      else if (hand1stright === false && hand2stright === true){
        return 2;
      }


      var tmpHigh1 = countArr1.lastIndexOf(1);
      var tmpHigh2 = countArr2.lastIndexOf(1);
      while(tmpHigh1 === tmpHigh2){
        for(var i = tmpHigh1-1; i > 0; i--){
          if(countArr1[i] === 1){
            tmpHigh1 = i;
            break;
          }
        }
        for(var i = tmpHigh2-1; i > 0; i--){
          if(countArr2[i] === 1){
            tmpHigh2 = i;
            break;
          }
        }
      }
      console.log("count array"+ countArr1);
      console.log("count array"+ countArr2);
      if(tmpHigh1 > tmpHigh2){
        return 1;
      }
      else{
        return 2;
      }
    }
    else if(hand1HighestNum == 2){
      if(hand2Times2 > hand1Times2 ){

        return 2;
      }
      else if (hand2Times2 < hand1Times2 ){
        return 1;
      }
      else{
        while(tmpHigh1 === tmpHigh2 && hand2Times2 > 0){
          var tmpHigh1 = countArr1.lastIndexOf(2);
          var tmpHigh2 = countArr2.lastIndexOf(2);
          hand2Times2--;
        }
if(tmpHigh1 === tmpHigh2){
  var tmpHigh1 = countArr1.lastIndexOf(1);
  var tmpHigh2 = countArr2.lastIndexOf(1);
}


if(tmpHigh1 > tmpHigh2){
  return 1;
}
else{
  return 2;
}
}

}
else if(hand1HighestNum == 3){
  var tmpHigh1 = countArr1.lastIndexOf(3);
  var tmpHigh2 = countArr2.lastIndexOf(3);
  while(tmpHigh1 === tmpHigh2){
    if(countArr1.lastIndexOf(2) !== -1 || countArr2.lastIndexOf(2) !== -1){

      if(countArr1.lastIndexOf(2) !== -1 && countArr2.lastIndexOf(2) !== -1){
        var tmpHigh1 = countArr1.lastIndexOf(2);
        var tmpHigh2 = countArr2.lastIndexOf(2);
      }
      else if (countArr1.lastIndexOf(2) !== -1 ){
        return 1;
      }
      else if(countArr2.lastIndexOf(2) !== -1 )
      return 2;
    }
    else{
      var tmpHigh1 = countArr1.lastIndexOf(1);
      var tmpHigh2 = countArr2.lastIndexOf(1);
    }
  }
  while(tmpHigh1 === tmpHigh2){
    for(var i = tmpHigh1-1; i > 0; i--){
      if(countArr1[i] === 1){
        tmpHigh1 = i;
        break;
      }
    }
    for(var i = tmpHigh2-1; i > 0; i--){
      if(countArr2[i] === 1){
        tmpHigh2 = i;
        break;
      }
    }
  }
  console.log("count array"+ countArr1);
  console.log("count array"+ countArr2);
  if(tmpHigh1 > tmpHigh2){
    return 1;
  }
  else{
    return 2;
  }
}
else if(hand1HighestNum == 4){
  var tmpHigh1 = countArr1.lastIndexOf(4);
  var tmpHigh2 = countArr2.lastIndexOf(4);
  if(tmpHigh1 === tmpHigh2){
    var tmpHigh1 = countArr1.lastIndexOf(1);
    var tmpHigh2 = countArr2.lastIndexOf(1);
  }
  if(tmpHigh1 > tmpHigh2){
    return 1;
  }
  else{
    return 2;
  }
}
}

else if(color1 === 5 || color2 === 5){
  if(color1 === 5 && color2 !== 5){
    return 1;
  }
  else if (color1 !== 5 && color2 === 5){
    return 2;
  }
}
else if(hand1HighestNum > hand2HighestNum){
  console.log("1 is higher");
  return 1;
}
else {
  console.log("2 is higher");
  //printcase(hand2Times);
  return 2;
}



}


var convertHand = function (handConv){

  var reformattedHand = handConv.map(function(obj) {
    switch (obj.charAt(0)) {
      case '2': return 0;
      break;
      case '3': return 1;
      break;
      case '4': return 2;
      break;
      case '5': return 3;
      break;
      case '6': return 4;
      break;
      case '7': return 5;
      break;
      case '8': return 6;
      break;
      case '9': return 7;
      break;
      case '1': return 8; //case 10
      break;
      case 'J': return 9;
      break;
      case 'Q': return 10;
      break;
      case 'K': return 11;
      break;
      case 'A': return 12;
      break;
    }
  });

  return reformattedHand;


}
