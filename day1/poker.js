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
var values = {"A":"13", "K":"12", "Q":"11", "J":"10", "10":"9" ,"9": "8", "8": "7",
  "7":"6" , "6": "5", "5": "4", "4": "3", "3": "2", "2": "1"};
window.handNoSuitByValue = function(hand){
  //console.log(hand);
  //REMOVE THE SUIT FROM CARDS AND RETURN NEW HAND
  var noSuit = [];
  hand.forEach(function(card){
    var val = card[0]; //most cases, the value will just be first char
    //console.log(typeof val);
    //if card is a 10
    if(card.length == 3){
      val = card.substring(0,2);
    }
    noSuit.push(parseInt(val));
  })
  return noSuit;
}
//Convert cards to numbers
window.convert = function(hand) {
  console.log(hand);
  var newArray = [];
  for (var a = 0; a < hand.length; a++) {
    if (hand[a].length == 3) {
      newArray.push("10" + hand[a][2]);
    } else {
      newArray.push(values[hand[a][0]] + hand[a][1]);
    }
  }
  return newArray;
}
// Takes an array of numbers and sorts
window.sortCards = function(numbers) {
  numbers.sort(function(a,b) {
    return b - a;
  });
  return numbers;
}
window.rankPokerHand = function(hand1, hand2) {
  var hand1C = window.convert(hand1);
  var hand2C = window.convert(hand2);
  var calculations = [window.straightFlush,
    window.fourOfAKind,
    window.fullHouse,
    window.flush,
    window.straight,
    window.triple,
    window.twoPair,
    window.pair,
    window.highCard]
  for (var i = 0; i < calculations.length; i++) {
    console.log(i);
    var ans = calculations[i](hand1C, hand2C);
    if (ans == 1) {
      return 1;
    } else if (ans == 2) {
      return 2;
    } else if (ans == 0) {
      continue;
    } else {
      return 3;
    }
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
window.pair = function(hand1,hand2){
  //takes in hands that either have 1 pair or no pairs
  //returns array where the first element is an array containing the
  //pairs and the second is an array of remaining cards
  var h1 = window.sortCards(window.handNoSuitByValue(hand1));
  var h2 = window.sortCards(window.handNoSuitByValue(hand2));
  var h1p = window.findPair(h1);
  var h2p = window.findPair(h2);
  console.log(h1p);
  console.log(h2p);
  //if both have a pair
  if (h1p === null && h2p === null) {
    return 0;
  } else if (h1p == h2p) {
    return window.highCard(hand1, hand2);
  } else if (h2p === null || h1p > h2p) {
    return 1;
  } else if (h1p === null || h1p < h2p) {
    return 2;
  }
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
window.twoPair = function(hand1,hand2){
  //takes in hands that either have 1 pair or no pairs
  //returns array where the first element is an array containing the
  //pairs and the second is an array of remaining cards
  var h1 = window.sortCards(window.handNoSuitByValue(hand1));
  var h2 = window.sortCards(window.handNoSuitByValue(hand2));
  var h1p = window.findTwoPair(h1);
  var h2p = window.findTwoPair(h2);
  //if both have a pair
  if (h1p === null && h2p === null) {
    return 0;
  } else if (h2p === null) {
    return 1;
  } else if (h1p === null) {
    return 2;
  } else {
    if (h1p[0] > h2p[0]) {
      return 1;
    } else if (h2p[0] > h1p[0]) {
      return 2;
    } else {
      if (h1p[1] > h2p[1]) {
        return 1;
      } else if (h2p[1] > h1p[1]) {
        return 2;
      }
    }
  }
  return window.highCard(hand1, hand2);
}
window.findTwoPair = function(h){
  //given a number version of hand sort4ed in DESC order
  var i = 0;
  var pairFound = [];
  while(i < h.length-1){
    //if there is a pair
    if(h[i]===h[i+1]){
      //matches.push(h[i]);
      pairFound.push(h[i]);
    }
    i+=1;
  }
  if (pairFound.length == 2) {
    return pairFound.sort(function(a,b) {
      return b - a;
    });
  } else {
    return null;
  }
}
window.triple = function(hand1,hand2){
  var h1 = window.sortCards(window.handNoSuitByValue(hand1));
  var h2 = window.sortCards(window.handNoSuitByValue(hand2));
  var h1t = window.findTriple(h1);
  var h2t = window.findTriple(h2);
  console.log(h1t);
  console.log(h2t);
  if (h1t === null && h2t === null) {
    return 0;
  } else if (h1t == h2t) {
    return window.highCard(hand1, hand2);
  } else if (h2t === null || h1t > h2t) {
    return 1;
  } else if (h1t === null || h1t < h2t) {
    return 2;
  }
}
window.findTriple = function(h){
  //given a number version of hand sorted in DESC order
  var i = 0;
  var tripleFound = null;
  while(i < h.length-2){
    //if there is a triple
    if(h[i]===h[i+1] && h[i+1]===h[i+2]){
      //matches.push(h[i]);
      tripleFound = h[i];
      break;
    }
    i+=1;
  }
  return tripleFound;
}
window.straight = function(hand1, hand2) {
  var p1 = straightHelper(window.handNoSuitByValue(hand1));
  var p2 = straightHelper(window.handNoSuitByValue(hand2));
  if (p1 === null && p2 === null) {
    return 0;
  } else if (p2 === null) {
    return 1;
  } else if (p1 === null) {
    return 2;
  }
  return window.highCard(hand1, hand2);
}
window.straightHelper = function(hand) {
  var orderedHand = window.sortCards(hand);
  // Checks to see if all cards are in order
  for (var a = 1; a < 4; a++) {
    if (hand[a] - hand[a + 1] != 1) {
      return null;
    }
  }
  return hand;
}
window.flush = function(hand1, hand2) {
  var p1 = flushHelper(hand1);
  var p2 = flushHelper(hand2);
  if (p1 === null && p2 === null) {
    return 0;
  } else if (p2 === null) {
    return 1;
  } else if (p1 === null) {
    return 2;
  }
  return window.highCard(hand1, hand2);
}
window.flushHelper = function(hand) {
  if (hand[0].length === 3) {
    var suit = hand[0][2];
  } else {
    var suit = hand[0][1];
  }
  // Checks to see if all other cards match the first card's suit
  for(var a = 1; a < 4; a++) {
    if (hand[a].length === 3) {
      if (hand[a][2] != suit) {
        return null;
      }
    } else {
      if (hand[a][1] != suit) {
        return null;
      }
    }
  }
  return hand;
}
window.fullHouse = function(hand1, hand2) {
  var p1trip = findTriple(window.handNoSuitByValue(hand1));
  var p2trip = findTriple(window.handNoSuitByValue(hand2));
  var p1pair, p2pair;
  if (p1trip !== null && p2trip !== null) {
    p1pair = fullHousePairHelper(window.handNoSuitByValue(hand1), p1trip);
    p2pair = fullHousePairHelper(window.handNoSuitByValue(hand2), p2trip);
    console.log(p1pair);
    if (p1pair !== null && p2pair !== null) {
      if (p1trip > p2trip) {
        return 1;
      } else if (p2trip > p1trip) {
        return 2;
      } else {
        if (p1pair > p2pair) {
          return 1;
        } else if (p2pair > p1pair) {
          return 2;
        } else {
          return 3;
        }
      }
    }
  }
  return 0;
}
window.fullHousePairHelper = function(h, tripleValue) {
  var i = 0;
  var pairFound = null;
  while(i < h.length-1){
    //if there is a pair that isn't a triple
    if(h[i]===h[i+1] && h[i] !== tripleValue ){
      //matches.push(h[i]);
      pairFound = h[i];
    }
    i+=1;
  }
  return pairFound;
}
window.straightFlush = function(hand1, hand2) {
  var p1s = straightHelper(window.handNoSuitByValue(hand1));
  var p2s = straightHelper(window.handNoSuitByValue(hand2));
  var p1f = flushHelper(hand1);
  var p2f = flushHelper(hand2);
  var finalp1, finalp2;
  if (p1s !== null && p1f !== null) {
    finalp1 = p1s;
  } else {
    finalp1 = null;
  }
  if (p2s !== null && p2f !== null) {
    finalp2 = p2s;
  } else {
    finalp2 = null;
  }
  if (finalp1 === null && finalp2 === null) {
    return 0;
  } else if (finalp2 === null) {
    return 1;
  } else if (finalp1 === null) {
    return 2;
  }
  return window.highCard(hand1, hand2);
}
window.fourOfAKind = function(hand1, hand2) {
  var p1 = fourOfAKindHelper(window.sortCards(window.handNoSuitByValue(hand1)));
  var p2 = fourOfAKindHelper(window.sortCards(window.handNoSuitByValue(hand2)));
  if (p1 === null && p2 === null) {
    return 0;
  } else if (p2 === null) {
    return 1;
  } else if (p1 === null) {
    return 2;
  }
  return window.highCard(hand1, hand2);
}
window.fourOfAKindHelper = function(hand) {
  var four = null;
  console.log(hand);
  for (var a = 0; a < 2; a++) {
    if (hand[a] == hand[a + 1] && hand[a + 1] == hand[a + 2] &&
      hand[a + 2] == hand[a + 3]) {
      console.log("hello");
      four = hand[a];
      break;
    }
  }
  return four;
}
