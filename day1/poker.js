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


window.breakCardApart = function(card) {

  var valueConversion = {
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
  };

  var suit = card[card.length - 1];

  var value = card.slice(0, card.length-1);

  // convert non-integer card values to integer weight
  if (value in valueConversion) {
    value = valueConversion[value];
  } else {
    value = parseInt(value);
  }

  return {'suit': suit, 'value': value};


}



window.checkRoyalFlush = function(hand) {

  var valObj = {
    '10': false,
    '11': false,
    '12': false,
    '13': false,
    '14': false
  };

  var lastSuit = hand[0].suit;

  for(var i=0; i<hand.length; i++) {
    if(hand[i].suit != lastSuit) return false;

    // set flag that value has been seen
    if(hand[i].value in valObj) {
      valObj[hand[i].value] = true;
    }
  }

  // check if any values have not been found
  for(var k in valObj){
    if(valObj[k] === false) return false;
  }

  return true;
}

window.checkStraightFlush = function(hand) {
  var lastSuit = hand[0].suit;
  var valuesSeen = [];

  for(var i=0; i<hand.length; i++) {
    if(hand[i].suit != lastSuit) return false;

    valuesSeen.push(hand[i].value);
  }

  // sort values to check that all values are consecutive
  valuesSeen.sort(function(a, b) {
    return a-b;
  });

  // check for consecutive values in hand
  var lastConsecutiveValue = valuesSeen[0];

  for (var i=1; i<valuesSeen.length; i++) {
    if (valuesSeen[i] !== lastConsecutiveValue + 1) {
      return [false, ''];
    }

    lastConsecutiveValue = valuesSeen[i];
  }

  return [true, valuesSeen[valuesSeen.length - 1]];
}

window.checkFourOfAKind = function(hand) {
  var valObj = {};

  for(var i=0; i<hand.length; i++) {
    if (hand[i].value in valObj) {
      valObj[hand[i].value]++;
    } else {
      valObj[hand[i].value] = 1;
    }
  }

  for (var value in valObj) {
    if (valObj[value] === 4) {
      return [true, value];
    }
  }

  return [false, ''];
}

window.checkFullHouse = function(hand) {
  var valObj = {};

  for(var i=0; i<hand.length; i++) {
    if (hand[i].value in valObj) {
      valObj[hand[i].value]++;
    } else {
      valObj[hand[i].value] = 1;
    }
  }

  var isPair = false;
  var isThreeOfAKind = false;
  var threeKindVal;
  var twoKindVal;

  for (var value in valObj) {
    if (valObj[value] === 3) {
      isThreeOfAKind = true;
      threeKindVal = value;
    }
    if (valObj[value] === 2) {
      isPair = true;
      twoKindVal = value;
    }
  }

  if (isThreeOfAKind && isPair) {
    return [true, [twoKindVal, threeKindVal]];
  } else {
    return [false, ''];
  }
}

window.checkFlush = function(hand) {
  var lastSuit = hand[0].suit;

  var valuesSeen = [];

  for(var i=0; i<hand.length; i++) {
    if(hand[i].suit != lastSuit) return [false, ''];

    valuesSeen.push(hand[i].value);
  }

  valuesSeen.sort(function(a, b) {
    return a-b;
  });

  return [true, valuesSeen[valuesSeen.length - 1]];
}

window.checkStraight = function(hand) {
  var valuesSeen = [];

  for(var i=0; i<hand.length; i++) {
    valuesSeen.push(hand[i].value);
  }

  // sort values to check that all values are consecutive
  valuesSeen.sort(function(a, b) {
    return a-b;
  });

  // check for consecutive values in hand
  var lastConsecutiveValue = valuesSeen[0];

  for (var i=1; i<valuesSeen.length; i++) {
    if (valuesSeen[i] !== lastConsecutiveValue + 1) {
      return [false, ''];
    }

    lastConsecutiveValue = valuesSeen[i];
  }

  // console.log('straight', hand);
  return [true, valuesSeen[valuesSeen.length - 1]];
}

window.checkThreeOfAKind = function(hand) {
  var valObj = {};

  for(var i=0; i<hand.length; i++) {
    if (hand[i].value in valObj) {
      valObj[hand[i].value]++;
    } else {
      valObj[hand[i].value] = 1;
    }
  }

  for (var value in valObj) {
    if (valObj[value] === 3) {
      return [true, value];
    }
  }

  return [false, ''];
}

window.checkTwoPairs = function(hand) {
  var valObj = {};

  for(var i=0; i<hand.length; i++) {
    if (hand[i].value in valObj) {
      valObj[hand[i].value]++;
    } else {
      valObj[hand[i].value] = 1;
    }
  }

  var isPair1 = false;
  var isPair2 = false;

  var pairValues = [];

  for (var value in valObj) {
    if (!isPair1 && valObj[value] === 2) {
      pairValues.push(value);
      isPair1 = true;
    } else if (isPair1 && valObj[value] === 2) {
      pairValues.push(value);
      isPair2 = true;
    }
  }

  if (isPair1 && isPair2) {
    console.log('two pairs', hand);
    return [true, pairValues];
  } else {
    return [false, []];
  }
}

window.checkOnePair = function(hand) {
  var valObj = {};

  for(var i=0; i<hand.length; i++) {
    if (hand[i].value in valObj) {
      valObj[hand[i].value]++;
    } else {
      valObj[hand[i].value] = 1;
    }
  }

  for (var value in valObj) {
    if (valObj[value] === 2) {
      return [true, value];
    }
  }

  return [false, value];
}

window.checkHighCard = function(hand) {
  var valuesSeen = [];

  for(var i=0; i<hand.length; i++) {
    valuesSeen.push(hand[i].value);
  }

  // sort values to check that all values are consecutive
  valuesSeen.sort(function(a, b) {
    return a-b;
  });

  return [true, valuesSeen[valuesSeen.length-1]];
}


window.rankPokerHand = function(hand1, hand2) {

  var hand1Arr = [];
  for(var i=0; i<hand1.length; i++) {
    hand1Arr.push(breakCardApart(hand1[i]));
  }

  var hand2Arr = [];
  for(var i=0; i<hand2.length; i++) {
    hand2Arr.push(breakCardApart(hand2[i]));
  }

  var handCheckFunctions = [
    checkRoyalFlush,
    checkStraightFlush,
    checkFourOfAKind,
    checkFullHouse,
    checkFlush,
    checkStraight,
    checkThreeOfAKind,
    checkTwoPairs,
    checkOnePair,
    checkHighCard
  ];

  // hand1
  var playerOneScore;
  var playerOneData;
  for (var i=0; i<handCheckFunctions.length; i++) {
    var data = handCheckFunctions[i](hand1Arr);

    if (data[0] === true) {
      playerOneScore = i;
    }
  }

  // hand2
  var playerTwoScore;
  var playerTwoData;
  for (var i=0; i<handCheckFunctions.length; i++) {
    var data = handCheckFunctions[i](hand1Arr);

    if (data[0] === true) {
      playerTwoScore = i;
    }
  }

  // // check winner
  // if (playerOneScore < playerTwoScore) {
  //   return 1;
  // } else if (playerOneScore > playerTwoScore) {
  //   return 2;
  // } else {
  //   console.log("tie", handCheckFunctions[playerOneScore].name);
  // }
}
