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
//   - 1 High Card: Highest value card.
//   - 2 One Pair: Two cards of the same value.
//   - 3 Two Pairs: Two different pairs.
//   - 4 Three of a Kind: Three cards of the same value.
//   - 5 Straight: All cards are consecutive values.
//   - 6 Flush: All cards of the same suit.
//   - 7 Full House: Three of a kind and a pair.
//   - 8 Four of a Kind: Four cards of the same value.
//   - 9 Straight Flush: All cards are consecutive values of same suit.
//   - 10 Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
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
// ex. rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', '10D']) ->
// 2, Pair of 8 vs Pair of 5
//
// ex. rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) ->
//1, High card Ace vs High card Queen
//
// ex. rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', '10D', 'QD']) ->
//2, 3 aces vs Diamond flush
//
// ex. rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) -> 1,
//Pair of Q with high 9, Pair of Q with high 7
//
//ex. rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) -> 1,
//Full house with 3 4s, Full house with 3 3s

var valueOf = {"A":13, "K":12, "Q":11, "J":10, "10":9 ,"9": 8, "8": 7, "7":6 , "6": 5, "5": 4, "4": 3, "3": 2, "2": 1};

// Takes an array of numbers and sorts
window.sortCards = function(numbers) {
  numbers.sort(function(a,b) {
    return b - a;
  });
  return numbers;
}

window.handNoSuitByValue = function(hand){
  //REMOVE THE SUIT FROM CARDS AND RETURN NEW HAND
  //CHANGE TO ONLY TAKE AWAY SUIT...WILL BE GIVEN NUMBER VALUES FROM START
  var noSuit = [];
  hand.forEach(function(card){
    var val = card[0]; //most cases, the value will just be first char
    //if card is a 10
    if(card.length == 3){
      val = card.substring(0,2);
    }
    noSuit.push(valueOf[val]);
  })
  return noSuit;
}

window.findPair = function(h){
  //given a number version of hand sort4ed in DESC order
  var i = 0;
  var pairFound = null;
  while(i < h.length-1){
    //if there is a pair
    if(h[i]===h[i+1]){
      //matches.push(h[i]);
      pairFound = h[i];
    }
    i+=1;
  }
  return pairFound;
}

window.findTriple = function(h){
  //given a number version of hand sort4ed in DESC order
  var i = 0;
  var tripleFound = null;
  while(i < h.length-2){
    //if there is a pair
    if(h[i]===h[i+1] && h[i+1]===h[i+2]){
      //matches.push(h[i]);
      tripleFound = h[i];
    }
    i+=1;
  }
  return tripleFound;
}

window.triple = function(hand1,hand2){
  var h1 = window.sortCards(window.handNoSuitByValue(hand1));
  var h2 = window.sortCards(window.handNoSuitByValue(hand2));
  var h1t = window.findTriple(h1);
  var h2t = window.findTriple(h2);
  if(h1t===h2t){
    return window.highCard(hand1,hand2);
  } else if(h1t!==null && h2t!==null){
    if(h1t > h2t){
      return 1;
    } else{
      return 2;
    }
  } else if(h1t===null){
    return 2;
  } else if(h2t===null){
    return 1;
  }
}

window.pair = function(hand1,hand2){
  //takes in hands that either have 1 pair or no pairs
  //returns array where the first element is an array containing the
  //pairs and the second is an array of remaining cards
  var h1 = window.sortCards(window.handNoSuitByValue(hand1));
  var h2 = window.sortCards(window.handNoSuitByValue(hand2));
  var h1p = window.findPair(h1);
  var h2p = window.findPair(h2);
  //if both have a pair
  if(h1p===h2p){
    return window.highCard(hand1,hand2);
  } else if(h1p!==null && h2p!==null){
    if(h1p > h2p){
      return 1;
    } else{
      return 2;
    }
  } else if(h1p===null){
    return 2;
  } else if(h2p===null){
    return 1;
  }
}


window.highCard = function(hand1,hand2){
  //get only the numbers in the hand in sorted order
  var h1 = window.sortCards(window.handNoSuitByValue(hand1));
  var h2 = window.sortCards(window.handNoSuitByValue(hand2));
  var i = 0;
  //while they have the same high card
  while(i<h1.length && h1[i] === h2[i]){
    i+=1;
  }
  //if h1 has the high card
  if(h1[i] > h2[i]){
    return 1;
  }else if(h2[i] > h1[i]){
    return 2;
  }else {
    return 3;
  }
}

window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
  var highCardWinner = window.highCard(hand1,hand2);
  var pairWinner = window.pair(hand1,hand2);
  //return pairWinner;
  var tripleWinner = window.triple(hand1,hand2);
  return tripleWinner;
}
