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

window.findRank=function(card){
  if(card.length===2){
    return parseInt(card[0]);
  }else{
    var r =card.substr(0,2);
    return parseInt(r);
  }
}

window.findSuit=function(card){
  return card[card.length-2];
}

window.isFlush=function(hand){
  for(var i=0;i<4;i++){
    if(findSuit(hand[i])!==findSuit(hand[i+1]))
      return false;
  }
  return true;
}

window.isStraight=function(hand){

  for(var i=0;i<4;i++){
    if(findRank(hand[i])+1!==findRank(hand[i+1]))
      return false;
  }
  return true;
}

window.isPair=function(hand){
  var result=1;
  var index=0;
  for(var i=0;i<4;i++){
    if(findRank(hand[i])===findRank(hand[i+1])){
      result=2;
      index=i;
      break;
    }
  }
  if(result===2 && index<=3){
    if(findRank(hand[index])===findRank(hand[index+2]))
      result=3;
  }
  if(result===2 && index<=2){
    if(findRank(hand[index])===findRank(hand[index+3]))
      result=4;
  }
  return [result,findRank(hand[i])];
}

window.isFullHouse=function(hand){
  if(hand[0]!==hand[1])
    return false;
  if(hand[3]!==hand[4])
    return false;
  if(hand[1]===hand[2]){
    return true;
  }
  if(hand[2]===hand[3]){
    return true;
  }
  return false;
}

window.is2Pair=function(hand){
  if(hand[1]===hand[2] && hand[3]===hand[4])
    return [hand[0],hand[1],hand[2]];
  else if(hand[0]===hand[1] && hand[3]===hand[4])
    return [hand[2],hand[0],hand[3]];
  else if(hand[0]===hand[1] && hand[2]===hand[3])
    return [hand[4],hand[0],hand[2]];
  else return false;
}

window.points=function(hand){
  debugger;
  var p=0;
  /*if(isFlush(hand)){
    if(isStraight(hand)){
      p=200+findRank(hand[4]);
    }else{
      p=130+findRank(hand[0]);
    }
  } else if(isStraight(hand))p=110+findRank(hand[4]);
  else if(isFullHouse(hand))p=150+findRank(hand[0])+findRank(hand[4]);
  else if(is2Pair(hand))p=50+findRank(hand[1])+findRank(hand[3]);
  else if(isPair(hand)[0]===4)p=180+findRank(hand[3]);
  else if(isPair(hand)[0]===3)p=90+findRank(isPair(hand)[1]);
  else if(isPair(hand)[0]===2)p=30+isPair(hand)[1];
  else if(isPair(hand)[0]===1)p=findRank(hand[0])+findRank(hand[1])+findRank(hand[2]);*/
  if(isPair(hand)[0]===2)p=30+isPair(hand)[1];
  return p;
}

window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  //debugger;
  for(var i=0;i<hand1.length;i++){
    if(hand1[i][0]==='A'){
      hand1[i]='14'+hand1[i][1];
    }else if(hand1[i][0]==='K'){
      hand1[i]='13'+hand1[i][1];
    }else if(hand1[i][0]==='Q'){
      hand1[i]='12'+hand1[i][1];
    }else if(hand1[i][0]==='J'){
      hand1[i]='11'+hand1[i][1];
    }
  }

  for(var i=0;i<hand2.length;i++){
    if(hand2[i][0]==='A'){
      hand2[i]='14'+hand2[i][1];
    }else if(hand2[i][0]==='K'){
      hand2[i]='13'+hand2[i][1];
    }else if(hand2[i][0]==='Q'){
      hand2[i]='12'+hand2[i][1];
    }else if(hand2[i][0]==='J'){
      hand2[i]='11'+hand2[i][1];
    }
  }

  for(var i=0;i<hand1.length-1;i++){
    var min=i;
    var minRank=window.findRank(hand1[i]);
    for(var j=i+1;j<hand1.length;j++){
      var rank=findRank(hand1[j]);
      if(minRank>rank){
        minRank=rank;
        min=j;
      }
    }
    var temp = hand1[min];
    hand1[min] = hand1[i];
    hand1[i] = temp;
  }

  for(var i=0;i<hand2.length-1;i++){
    var min=i;
    var minRank=window.findRank(hand2[i]);
    for(var j=i+1;j<hand2.length;j++){
      var rank=findRank(hand2[j]);
      if(minRank>rank){
        minRank=rank;
        min=j;
      }
    }
    var temp = hand2[min];
    hand2[min] = hand2[i];
    hand2[i] = temp;
  }


  var r1=points(hand1);
  var r2=points(hand2);
  //debugger;
  if(r1>r2)return 1;
  else return 2;
}
