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
// ex. rankPokerHand(['5H', '5C', '6S', '7S', 'KD'], ['2C', '3S', '8S', '8D', 'TD']) -> 2, Pair of 8 vs Pair of 5
//
// ex. rankPokerHand(['5D', '8C', '9S', 'JS', 'AC'], ['2C', '5C', '7D', '8S', 'QH']) -> 1, High card Ace vs High card Queen
//
// ex. rankPokerHand(['2D', '9C', 'AS', 'AH', 'AC'], ['3D', '6D', '7D', 'TD', 'QD']) -> 2, 3 aces vs Diamond flush
//
// ex. rankPokerHand(['4D', '6S', '9H', 'QH', 'QC'] ['3D', '6D', '7H', 'QD', 'QS']) -> 1, Pair of Q with high 9, Pair of Q with high 7
//
// ex. rankPokerHand(['2H', '2D', '4C', '4D', '4S'], ['3C', '3D', '3S', '9S', '9D']) -> 1, Full house with 3 4s, Full house with 3 3s
window.rankPokerHand = function(hand1, hand2) {
  var handOne = window.parseHand(hand1);
  var handTwo = window.parseHand(hand2);
  var oneScore = window.getScore(handOne);
  var twoScore = window.getScore(handTwo);
  if (oneScore === twoScore) {
    var dup1 = window.highDups(handOne.ranks);
    var dup2 = window.highDups(handTwo.ranks);
    console.log("NEXT TEST");
    console.log(dup1);
    console.log(dup2);
    for (var i = 0; i < dup1.length; i++) {
      if (dup1[i] > dup2[i]) {
        return 1;
      } else if (dup1[i] < dup2[i]) {
        return 2;
      }
    }
    throw "tiedddd";
  } else {
    if (oneScore > twoScore) {
      return 1;
    } else {
      return 2;
    }
  }
}

//takes the ranks, and turn it into duplicate first, then high values
window.highDups = function (duplicates) {
  var temp = [];
  var count = 1;
  var obj = {};
  for (var i = 0; i < duplicates.length; i++) {
    if (duplicates[i] in obj) {
      obj[duplicates[i]]++;
    } else {
      obj[duplicates[i]] = 1;
    }
  }
  return window.sortObj(Object.entries(obj));
}

window.sortObj = function (arr) {
  var temp = arr.sort(function(a, b) {
    if (a[1] === b[1]) {
      return b[0] - a[0];
    } else {
      return b[1] - a[1];
    }
  });
  return temp.map(function (x) {
    return parseInt(x[0]);
  });
}

//finds the handscore of the person
//pass in an object, and then return the score
window.getScore = function(hand) {
  var temp = window.duplicate(hand.ranks);
  if (window.isEqual(temp, [4, 1])) {
    return 7;
  } else if (window.isEqual(temp, [3, 2])) {
    return 6;
  } else if (window.isEqual(temp, [3, 1, 1])) {
    return 3;
  } else if (window.isEqual(temp, [2, 2, 1])) {
    return 2;
  } else if (window.isEqual(temp, [2, 1, 1, 1])) {
    return 1;
  } else if (window.isEqual(temp, [1, 1, 1, 1, 1])) {
    if (window.order(hand.ranks) && window.flush(hand.suits)) {
      return 8;
    } else if (window.order(hand.ranks)) {
      return 4;
    } else if (window.flush(hand.suits)) {
      return 5;
    } else {
      return 0;
    }
  } else {
    throw "you goofed up";
  }
}

window.parseHand = function(hand) {
  var suits = [];
  var ranks = [];
  hand.forEach( function(val) {
    suits.push(val.slice(-1));
  });
  hand.forEach( function(val) {
    var temp = val.slice(0, -1);
    if (temp === "K") {
      ranks.push(13);
    } else if (temp === "Q") {
      ranks.push(12);
    } else if (temp === "J") {
      ranks.push(11)
    } else if (temp === "A") {
      ranks.push(14)
    } else {
      ranks.push(parseInt(temp));
    }
  });
  var hand = {};
  hand.suits = suits;
  hand.ranks = ranks;
  return hand;
}

//take in an array of values sans suits
window.duplicate = function(handValues) {
  var temp = [];
  var count = 1;
  var obj = {};
  for (var i = 0; i < handValues.length; i++) {
    if (handValues[i] in obj) {
      obj[handValues[i]]++;
    } else {
      obj[handValues[i]] = 1;
    }
  }
  return window.sortByValueDec(Object.values(obj));
}

window.sortByValueDec = function(arr) {
  var descending = function (a, b) {
    return b - a;
  };
  return arr.sort(descending);
}

window.sortByValueAsc = function(arr) {
  var asc = function (a, b) {
    return a - b;
  };
  return arr.sort(asc);
}

//check for straights
window.order = function(handValues) {
  var order = window.sortByValueAsc(handValues);
  var sum = 0;
  for (var i = 0; i < order.length - 1; i++) {
    sum += (order[i + 1] - order[i]);
  }
  if (window.isEqual([2, 3, 4, 5, 14], order)) {
    return true;
  }
  if (sum === 4) {
    return true;
  } else {
    return false;
  }
}

window.isEqual = function(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++){
    if (a[i] !== b[i]) return false;
  }
  return true;
};

window.flush = function(handSuit) {
  return window.duplicate(handSuit).length === 1;
}
