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
  console.log(isFlush(hand2));

}

var isRoyalFlush = function(hand){
  if(!isFlush){
    return false;
  }
  var king = false;
  var queen = false;
  var jack = false;
  var ten = false;
  var ace = false;


  if(isFlush(hand)){
    //get rid of all the suits
    for(var i = 0; i < hand.length; i++){
      hand[i] = hand[i].substring(0, substring.length())
    }

  }

}

var isFlush = function(hand){
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
