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
window.createHand = function(hand) {
  var newHand = [];
  for (var x of hand) {
    var val = x[0]
    var suite = x[1]
    switch (val) {
      case '1':
        if (suite === '0') {
        	val = 10
        	suite = x[2]
        }
        break;
      case 'J':
        val = 11;
        break;
      case 'Q':
        val = 12;
        break;
      case 'K':
       val = 13;
       break;
      case 'A':
        val = 14
        break;
      default:
        val = parseInt(val)
        break;
    }
    newHand.push([val,suite])
  }
  return newHand
}

window.isOnePair = function(hand) {
  var foundOnlyOne = false
  for (var i = 0; i <4; i++) {
    for (var j = i+1; j <5; j++) {
      if(hand[i][0] === hand[j][0]) {
        if(!foundOnlyOne) {
          foundOnlyOne = true
          var tiebreak = hand[i][0]
        } else {
          return [false]
        }
      }
    }
  }
  return [foundOnlyOne,tiebreak]
}

window.isTwoPairs = function(hand) {
  var numFound = 0
  for (var i = 0; i <4; i++) {
    for (var j = i+1; j <5; j++) {
      if(hand[i][0] === hand[j][0]) {
        numFound ++
        if (numFound === 1) {
          var tiebreak1 === hand[i][0]
        } else if (numFound === 2) {
          var tiebreak2 = hand[i][0]
        }
        }
      }
    }
  }
  var maxTie = Math.max(tiebreak1,tiebreak2)
  var minTie = Math.max(tiebreak1,tiebreak2)
  if(numFound === 2) {
    return [true,maxTie,minTie]
  } else {
    return [false]
  }
}

window.isThreeOfAKind = function(hand) {
  for (var i = 0; i <3; i++) {
    for (var j = i+1; j <4; j++) {
        for (var k = j + 1; k < 5; k++) {
          if(hand[i][0] === hand[j][0] && hand[j][0] === hand[k][0]) {
            return [true,hand[i][0]]
          }
        }
      }
    }
  return [false]
}

window.isFlush = function(hand) {
	var suit = hand[0][1];
	for (var i = 1; i < 5; i++) {
		if (hand[i][1] != suit) {
			return [false];
		}
	}
	return [true];
}

window.isStraight = function(hand) {
	var numList = [];
	for(var i = 0; i < hand.length; i++) {
		numList.push(hand[i][0]);
	}
	numList.sort();
	for(var i = 0; i < numList.length - 1; i++) {
		if (numList[i] + 1 !== numList[i + 1]) {
			return [false];
		}
	}
	return [true,numList[4]];
}

window.isStraightFlush = function(hand) {
	if (isStraight(hand)[0] && isFlush(hand)[0]) {
    return isStraight
  }
  return [false]
}

window.isRoyalFlush = function(hand) {
	if (!isStraight(hand) || !isFlush(hand)) {
		return [false];
	}
	var numList = [];
	for(var i = 0; i < hand.length; i++) {
		numList.push(hand[i][0]);
	}
	numList.sort();
	if (numList[0] != 10) {
		return [false];
	}
	return [true];
}

window.isFourOfAKind = function(hand) {
	var firstHalf = [];
	var secondHalf = [];
	firstHalf.push(hand[0][0]);
	for (var i = 1; i < 5; i++) {
		if (hand[0][0] === hand[i][0]) {
			firstHalf.push(hand[i][0]);
		} else {
			secondHalf.push(hand[i][0]);
		}
	}
	if (firstHalf.length === 4) {
		return [true, firstHalf[0]];
	}
	if (firstHalf.length === 1) {
		for (var j = 1; j < 4; j++) {
			if (secondHalf[0] !== secondHalf[j]) {
				return [false];
			}
		}
		return [true, secondHalf[0]];
	}
	return [false];
}

window.isFullHouse = function(hand) {
	if (isTwoPairs(hand)[0] && isThreeOfAKind(hand)[0]) {
    return [true, isThreeOfAKind(hand)[1]]
  }
  return [false]
}

window.getHand = function(hand) {
	if (isRoyalFlush(hand)[0]) {
		return [10];
	} else if (isStraightFlush(hand)[0]) {
		return [9, isStraightFlush(hand)[1]];
	} else if (isFourOfAKind(hand)[0]) {
		return [8, isFourOfAKind(hand)[1]];
	} else if (isFullHouse(hand)[0]) {
		return [7, isFullHouse(hand)[1]];
	} else if (isFlush(hand)[0]) {
		return [6, window.highestVal(hand)];
	} else if (isStraight(hand)[0]) {
		return [5, isStraight(hand)[1]];
	} else if (isThreeOfAKind(hand)[0]) {
		return [4, isThreeOfAKind(hand)[1]];
	} else if (isTwoPairs(hand)[0]) {
		return [3, isTwoPairs(hand)[1]];
	} else if (isOnePair(hand)[0]) {
		return [2, isOnePair(hand)[1]];
	} else {
		return [1, window.highestVal(hand)];
	}
}

window.highestVal = function(arr) {
  var numVals = [];
  for(var i = 0; i < 5; i++) {
    numVals.push(hand1[i][0]);
  }
  window.sortByValue(numVals);
  return numVals[4];
}

window.sortByValue = function(arr) {
  var currIndex = 0;
  var indexOfSmall = 0;
  while (currIndex < arr.length) {
  	for (var i = currIndex + 1; i < arr.length; i++) {
  		if (arr[i] < arr[indexOfSmall]) {
  			indexOfSmall = i;
  		}
  	}
  	var temp = arr[currIndex];
  	arr[currIndex] = arr[indexOfSmall];
  	arr[indexOfSmall] = temp;
  	currIndex++;
  	indexOfSmall = currIndex;
  }
  return arr;
};

window.rankPokerHand = function(hand1, hand2) {
	//debugger;
  hand1 = window.createHand(hand1);
  hand2 = window.createHand(hand2);
  var hand1Val = window.getHand(hand1);
  var hand2Val = window.getHand(hand2);
  if (hand1Val[0] > hand2Val[0]) {
  	return 1;
  } else if (hand1Val[0] < hand2Val[0]) {
  	return 2;
  } else {
      if (hand1Val[1] > )
  }
  return 0;
}
