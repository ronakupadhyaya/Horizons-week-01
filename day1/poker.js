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

var cardRank = {
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

function cardValue(card){
  if(isNaN(parseInt(card))){
    return cardRank[card[0]];
  } else{
    return parseInt(card);
  }
}

function checkLargestCard(hand){
  var maxCardName = '';
  var maxCardIndex;
  var maxCard = 0;
  for(var i =0; i < hand.length; i++){
    if(isNaN(parseInt(hand[i]))){
      if(cardRank[hand[i][0]] > maxCard){
        maxCard = cardRank[hand[i][0]];
        maxCardIndex = i;
        maxCardName = hand[i];
      }
    } else{
      if(parseInt(hand[i]) > maxCard){
        maxCard = parseInt(hand[i]);
        maxCardName= hand[i];
        maxCardIndex = i;
      }
    }
  }
  return maxCardIndex;
}

function checkStraightFlush(hand){
  return checkFlush(hand) && checkStraight(hand);
}

function checkFlush(hand){
  var emptyString = '';
  for(var i = 0; i < hand.length; i++){
    emptyString += hand[i][hand[i].length -1];
  }
  return emptyString === emptyString[0].repeat(5);
}

function compareFunction(a, b){
  return cardValue(a)- cardValue(b);
}

function checkStraight(hand){

  hand.sort(compareFunction);
  for(var i = 1; i < hand.length; i++ ){
    if(cardValue(hand[i]) - cardValue(hand[i-1]) !== 1){
      return false;
    }
  }
  return true;
}
function createDuplicateObj(hand){
  var obj = {};
  for(var i =0; i< hand.length;i++){
    if(obj[cardValue(hand[i])]){
      obj[cardValue(hand[i])]++
    } else{
      obj[cardValue(hand[i])] = 1;
    }
  }
  return obj;
}

function checkCardTally(hand, num){

  var emptyObj = createDuplicateObj(hand);
  for(var key in emptyObj){

    if(emptyObj[key] === num){
      return parseInt(key);
    }
  }
  return -1;
}
function fourOfAKind(hand){
  return checkCardTally(hand, 4);
}
function threeOfAKind(hand){
  return checkCardTally(hand, 3);
}

function checkPair(hand){
  return checkCardTally(hand, 2);
}
function checkTwoPair(hand){
  console.log("HI");
  var cardObj = createDuplicateObj(hand);
  var count = 0;
  var twoPairKey = 0;
  var emptyArr = [];
  for(var key in cardObj){
    if(cardObj[key] === 2){
      count++;
      emptyArr.push(parseInt(key));
    }
  }

  if(count===2){
    return emptyArr[0] > emptyArr[1] ? emptyArr[0] : emptyArr[1];
  }
  return false;

}


function fullHouse(hand){
  var cardObj = createDuplicateObj(hand);
  var count = 0;
  var fullHouseThreeOfAKind = 0;
  for(var key in cardObj){
    if(cardObj[key] === 2){
      count++;
    }
    if(cardObj[key] === 3){
      count++;
      fullHouseThreeOfAKind = parseInt(key);
    }
  }
  if(count===2){
    return fullHouseThreeOfAKind;
  }
  return 0;
}
function compareHigher(hand1, hand2){

  var largestCardHand1 = checkLargestCard(hand1);
  var largestCardHand2 = checkLargestCard(hand2);
  while(cardValue(hand1[largestCardHand1]) == cardValue(hand2[largestCardHand2])){

    hand1.splice(largestCardHand1, 1);
    hand2.splice(largestCardHand2, 1);
    largestCardHand1 = checkLargestCard(hand1);
    largestCardHand2 = checkLargestCard(hand2);
  }
  if(cardValue(hand1[largestCardHand1]) > cardValue(hand2[largestCardHand2])){
    return 1;
  } else{
    return 2;
  }


}

window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HEREd
  var functionArrays = [checkStraightFlush, fourOfAKind, fullHouse, checkFlush, checkStraight, threeOfAKind, checkTwoPair, checkPair, checkLargestCard];
  for(var i =0; i < functionArrays.length; i++){
    var fun = functionArrays[i];

    if((!fun(hand1) && !fun(hand2)) || (fun(hand1)=== -1 && fun(hand2) === -1) ){
      continue;
    }
    else if(fun(hand1) && !fun(hand2)){
      return 1;
    }
    else if(!fun(hand1) && fun(hand2)){
      return 2;
    }
    else{
      if(fun(hand1) > fun(hand2)){
        return 1;
      }
      if(fun(hand2) > fun(hand1)){
        return 2;
      }
      return compareHigher(hand1, hand2);
    }
  }
}
