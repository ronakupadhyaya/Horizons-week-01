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

  var shand1 = hand1, shand2 = hand2;

  //replace 10, J, Q, etc with a b c etc...
  for(var i = 0; i < shand1.length; i++){
    var one1 = shand1[i].substring(0,shand1[i].length - 1);
    var two1 = shand1[i].substring(shand1[i].length - 1);
    if( one1 === '10'  ){
      shand1[i] = 'A' + two1;
    }else if(one1 === 'J'){
      shand1[i] = 'B' + two1;
    }else if(one1 === 'Q'){
      shand1[i] = 'C' + two1;
    }else if(one1 === 'K'){
      shand1[i] = 'D' + two1;
    }else if(one1 === 'A'){
      shand1[i] = 'E' + two1;
    }

    var one2 = shand2[i].substring(0,shand2[i].length - 1);
    var two2 = shand2[i].substring(shand2[i].length - 1);
    if( one2 === '10'  ){
      shand2[i] = 'A' + two2;
    }else if(one2 === 'J'){
      shand2[i] = 'B' + two2;
    }else if(one2 === 'Q'){
      shand2[i] = 'C' + two2;
    }else if(one2 === 'K'){
      shand2[i] = 'D' + two2;
    }else if(one2 === 'A'){
      shand2[i] = 'E' + two2;
    }



  }

  //sort hands by rank than Clubs, Diamonds, Hearts, spades
  shand1.sort();
  shand2.sort();

  console.log(shand1);
  console.log(shand2);


  var score1;
  var score2;

  //check for straight flush
  if( (shand1[0].charAt(1) === shand1[1].charAt(1) &&  shand1[1].charAt(1) === shand1[2].charAt(1)
  && shand1[1].charAt(1) === shand1[3].charAt(1) && shand1[1].charAt(1) === shand1[4].charAt(1))  &&

  (shand1[0].charAt(0) === (shand1[1].charAt(0) -1)    && shand1[1].charAt(0) === (shand1[2].charAt(0)  -1)
  &&  shand1[2].charAt(0) === (shand1[3].charAt(0)  -1) && shand1[3].charAt(0) === (shand1[4].charAt(0)  -1) )
  ){

  }


}
