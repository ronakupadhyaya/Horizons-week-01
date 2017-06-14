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
  var replace = function(hand) {
    for (var i = 0; i < hand.length; i++) {
      hand[i] = hand[i].split('')
      switch (hand[i][0]) {
      case 'J':
        hand[i][0] = 11;
        break;
      case 'Q':
        hand[i][0] = 12;
        break;
      case 'K':
        hand[i][0] = 13;
        break;
      case 'A':
        hand[i][0] = 14;
        break;
      }

    }
    return hand;
  }

  var handValues = function(hand) {
    var handValues = [];
    for (var i = 0; i < hand.length; i++) {
      handValues.push(parseInt(hand[i]));
    }
    return handValues;
  }

  var countInArray = function(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === what) {
        count++;
      }
    }
    return count;
  }

  var sortByValue = function(arr) {
    return arr.sort(function(a, b) {
      return a - b;
    });

  }

  var fourOfAKind = function(hand) {
    var handValues1 = handValues(hand);
    if (countInArray(handValues1, handValues1[0]) === 4) {
      return [true, handValues1[0]];
    } else if (countInArray(handValues1, handValues1[1]) === 4) {
      return [true, handValues1[1]]
    } else {
      return [false];
    }

    var fullHouse = function(hand) {
      var handValues1 = handValues(hand);
      var first = handValues1[0];
      if (countInArray(handValues1, handValues1[0]) === 3 || countInArray(handValues1, handValues1[0]) === 2) {
        while (handValues1.indexOf(first) !== -1) {
          handValues1.splice(handValues1.indexOf(first), 1);
        }
        var secondGroup = handValues1[0];
        for (var i = 1; i < handValues1.length; i++) {
          if (handValues1[i] !== secondGroup) {
            return [false];
          }
        }
        var handValues2 = handValues(hand);
        for (var i = 0; i < handValues2.length; i++) {
          if (countInArray(handValues2, handValues2[i]) === 3) {
            return [true, handValues2[i]]
          }
        }
      } else {
        return [false];
      }
    }

    var flush = function(hand) {
      var handSuits = [];
      for (var i = 0; i < hand.length; i++) {
        handSuits.push(hand[i][hand[i].length - 1]);
      }
      var suit = handSuits[0];
      for (var i = 1; i < handSuits.length; i++) {
        if (handSuits[i] !== suit) {
          return [false];
        }
      }
      var handValues1 = sortByValue(handValues(hand))
      return [true, handValues1[handValues1.length-1]];
    }

    var straight = function(hand) {
      var handValues1 = sortByValue(handValues(hand));
      var index = 0
      for (var i = handValues1[0]; i < handValues1[0]+5; i++) {
        if (handValues1[index] !== i) {
          return [false]
        }
        index++
      }
      return [true, handValues1[handValues1.length-1]]
    }

    var threeOfAKind = function(hand) {
      var handValues1 = handValues(hand)
      for (var i = 0; i < handValues1.length - 2; i++) {
        if (countInArray(handValues1, handValues1[i]) === 3) {
          return [true, handValues1[i]]
        }
      }
      return [false]
    }

    var twoPairs = function(hand) {
      var handValues1 = handValues(hand);
      var counter = 0;
      var highPair = 0;
      for (var i = 0; i < handValues1.length; i++) {
        if (countInArray(handValues1, handValues1[i]) === 2) {
          counter++
          if (handValues1[i] > highPair) {
            highPair = handValues[i]
          }
        }
      }
      if (counter === 4) {
        return [true, highPair]
      }
      return [false]
    }

    var onePair = function(hand) {
      var handValues1 = handValues(hand);
      var counter = 0;
      var highPair = 0
      for (var i = 0; i < handValues1.length; i++) {
        if (countInArray(handValues1, handValues1[i]) === 2) {
          counter++
          highPair = handValues1[i]
        }
      }
      if (counter === 2) {
        return true
      }
      return false
    }

    // var pairHand = ['5H', '5C', '6S', '7S', 'KD'];
    // var twoPairHand = ['5H', '5C', '6S', '7S', '6D'];
    // var threeKindHand = ['5H', '5C', '6S', '7S', '5D']; //*
    // var straightHand = ['5H', '6C', '8S', '7S', '9D'];
    // var fullHouseHand = ['5H', '5C', '6S', '6H', '6D'];
    // var flushHand = ['5H', '4H', '6H', '7H', 'KH'];
    // var fourKindHand = ['5H', '5C', '6S', '5S', '5D'];
    //
    // //console.log(onePair(pairHand));
    // //console.log(twoPairs(twoPairHand));
    // //console.log(threeOfAKind(threeKindHand));
    // //console.log(straight(straightHand));
    // console.log(fullHouse(fullHouseHand));
    // //console.log(flush(flushHand));
    // //console.log(fourOfAKind(fourKindHand));
    hand1 = replace(hand1)
    var hand1Rank = 0
    var tieBreaker = []

    debugger;
    if (straight(hand1)[0] && flush(hand1)[0]) {
      hand1Rank = 8
      tieBreaker.push(straight)
    } else if (fourOfAKind(hand1)[0]){
      hand1Rank = 7
      tieBreaker.push(fourofAKing)
    } else if (fullHouse(hand1)[0]){
      hand1Rank = 6
      tieBreaker.push(fullHouse)
    } else if (flush(hand1)[0]){
      hand1Rank = 5
      tieBreaker.push(flush)
    } else if (straight(hand1)[0]){
      hand1Rank = 4
      tieBreaker.push(straight)
    } else if (threeOfAKind(hand1)[0]){
      hand1Rank = 3
      tieBreaker.push(threeOfAKind)
    } else if (twoPairs(hand1)[0]){
      hand1Rank = 2
      tieBreaker.push(twoPairs)
    } else if (onePair(hand1)[0]){
      hand1Rank = 1
      tieBreaker.push(onePair)
    }
    hand2 = replace(hand2)
    var hand2Rank = 0
    if (straight(hand2)[0] && flush(hand2)[0]) {
      hand2Rank = 8
      tieBreaker.push(straight)
    } else if (fourOfAKind(hand2)[0]){
      hand2Rank = 7
      tieBreaker.push(fourOfAKind)
    } else if (fullHouse(hand2)[0]){
      hand2Rank = 6
      tieBreaker.push(fullHouse)
    } else if (flush(hand2)[0]){
      hand2Rank = 5
      tieBreaker.push(flush)
    } else if (straight(hand2)[0]){
      hand2Rank = 4
      tieBreaker.push(straight)
    } else if (threeOfAKind(hand2)[0]){
      hand2Rank = 3
      tieBreaker.push(threeOfAKind)
    } else if (twoPairs(hand2)[0]){
      hand2Rank = 2
      tieBreaker.push(twoPairs)
    } else if (onePair(hand2)[0]){
      hand2Rank = 1
      tieBreaker.push(onePair)
    }
    console.log("Hand 1: " + hand1Rank);
    console.log("Hand 2: " + hand2Rank);
    debugger;
    if (hand1Rank > hand2Rank) {
      return 1
    } else if (hand1Rank < hand2Rank) {
      return 2
    } else {
      if (tieBreaker[0] > tieBreaker[1]) {
        return 1
      } else if (tieBreaker[0] < tieBreaker[1]) {
        return 2
      } else {
        return "Tie!"
      }
    }
  }


  var frank = {job: 'vet', name: 'frank', height: 'short'}
  var sam = {job: 'nurse'}
  var george = {job: 'vet'}
  var martha = {job: 'soldier'}
  var gavin = {job: 'vet'}
  var steve = {job: 'nurse'}

  console.log(_.forEach(frank, function(val, key) {
    frank[key] = val + ' truster'
  }))
}
