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
  // var hand1Num = [];
  // var hand2Num = [];
  // var maxHand1 = 0;
  // var maxHand2 = 0;
  // for(var i = 0; i < hand1.length; i++){
  //   if(hand1[i].charAt(0)  === 'A'){
  //     hand1Num.push(14);
  //   }else if(hand1[i].charAt(0) === 'J'){
  //     hand1Num.push(11);
  //   }else if(hand1[i].charAt(0)  === 'Q'){
  //     hand1Num.push(12);
  //   }else if(hand1[i].charAt(0)  === 'K'){
  //     hand1Num.push(13);
  //   } else hand1Num.push(parseInt(hand1[i][0]));
  // }
  // for(var i = 0; i < hand2.length; i++){
  //   if(hand2[i].charAt(0)  === 'A'){
  //     hand2Num.push(14);
  //   }else if(hand2[i].charAt(0)  === 'J'){
  //     hand2Num.push(11);
  //   }else if(hand2[i].charAt(0)  === 'Q'){
  //     hand2Num.push(12);
  //   }else if(hand2[i].charAt(0)  === 'K'){
  //     hand2Num.push(13);
  //   } else hand2Num.push(parseInt(hand2[i][0]));
  // }
  // maxHand1 = Math.max.apply(hand1Num);
  // maxHand2 = Math.max.apply(hand2Num);
  // if (maxHand1 > maxHand2){
  //   return 1;
  // }else{
  //   return 2;
  // }
  console.log(isFullHouse(hand1));

}









function convertToInt(hand){
}









function isFullHouse(hand){
  hand = removeSuits(hand);
  hand.sort();
  var truth = false;
  if(hand[0] === hand[1] && hand[2] === hand[3] && hand[3] === hand[4]){
    console.log("You have a full house with 3" + hand[3] + "'s and 2" + hand[0] + "'s");
    truth = true;
  }
  if(hand[0] === hand[1] && hand[0] === hand[2] && hand[3] === hand[4]){
    console.log("You have a full house with 3 " + hand[0] + "'s and 2 " + hand[3] + "'s");
    truth = true;
  }
  return truth;
}

function isThreeKind(hand){
  hand = removeSuits(hand);
  hand.sort();
  var truth = false;
  for(var i = 0; i < hand.length - 2; i++){
    if(hand[i] === hand[i+1] && hand[i] === hand[i+2]){
      console.log("Has three "+ hand[i] + "'s")
      truth = true
    }
  }
  return truth;
}


function isTwoPairs(hand){
  hand = removeSuits(hand);
  hand.sort();
  var count = 0;
  for(var i = 0; i < hand.length - 1; i++){
    if(hand[i] === hand[i+1]){
      console.log("There is a pair of " + hand[i])
      count++;
      i++;
    }
  }
  if(count === 2){
    return true;
  }
  return false;
}

function isPair(hand){
  hand = removeSuits(hand);
  hand.sort()
  var pair = false;
  for(var i = 0; i < hand.length - 1; i++){
    if(hand[i] === hand[i+1]){
      console.log("There is a pair of " + hand[i])
      pair = true;
    }
  }
  return pair;
}

function isRoyalFlush(hand){
  if(!isFlush){
    return false;
  }
  var king = false;
  var queen = false;
  var jack = false;
  var ten = false;
  var ace = false;

  if(isFlush(hand)){
    hand = removeSuits(hand);
    for(var i = 0; i < hand.length; i++){
      if(hand[i] === "10"){
        ten = true;
      }
      if(hand[i] === "A"){
        ace = true;
      }
      if(hand[i] === "K"){
        king = true;
      }
      if(hand[i] === "Q"){
        queen = true;
      }
      if(hand[i] === "J"){
        jack = true;
      }
    }
  }
  if(king && queen && jack && ten && ace){
    console.log("Royal Flush")
    return true;
  }
  return false;
}





function isFlush(hand){
  if(hand[0][hand[0].length - 1] === hand[1][hand[1].length - 1] &&
    hand[0][hand[0].length - 1] === hand[2][hand[2].length - 1] &&
    hand[0][hand[0].length - 1] === hand[3][hand[3].length - 1] &&
    hand[0][hand[0].length - 1] === hand[4][hand[4].length - 1]){
    console.log("Flush of " + hand[0][2]);
    return true;
  }else{
    return false;
  }
}

function removeSuits(hand){
  for(var i = 0; i < hand.length; i++){
    hand[i] = hand[i].substring(0, hand[i].length - 1)
  }
  return hand;
}
