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
  var power1 = findPower(hand1)
  var power2 = findPower(hand2)
  console.log(power1[0], power2[0])
  if (power1[0] == power2[0]) {
  	console.log(largestCardValue(power1[1]), largestCardValue(power2[1]))
  	if (largestCardValue(power1[1]) > largestCardValue(power2[1])) {
  		return 1;
  	} else return 2;
  } else if (power1[0] > power2[0]) return 1;
  else return 2;
}

window.findPower = function(hand) {
	if (isRoyalFlush(hand)[0]) return [9,isRoyalFlush(hand)[1]];
	if (isStraightFlush(hand)[0]) return [8,isStraightFlush(hand)[1]];
	if (isFourOfAKind(hand)[0]) return [7,isFourOfAKind(hand)[1]];
	if (isFullHouse(hand)[0]) return [6,isFullHouse(hand)[1]];
	if (isFlush(hand)[0]) return [5,isFlush(hand)[1]];
	if (isStraight(hand)[0]) return [4,isStraight(hand)[1]];
	if (isThreeOfAKind(hand)[0]) return [3,isThreeOfAKind(hand)[1]];
	if (isTwoPairs(hand)[0]) return [2,isTwoPairs(hand)[1]];
	if (isOnePair(hand)[0]) return [1,isOnePair(hand)[1]];
	else return [0, hand];
}

window.isRoyalFlush = function(hand) {
	// Check if all the suits are the same
    if (!isFlush(hand)) { return [false, hand]; }

    // Check if the values are A, 10, J, Q, K
    var arr = hand.map(getValue).sort();
    return [arr[0] === 10 && 
            arr[1] === 11 &&
            arr[2] === 12 &&
            arr[3] === 13 &&
            arr[4] === 14, hand];
}

window.isStraightFlush = function(hand) {
	if (isStraight(hand)[0] && isFlush(hand)[0]) {
		return [true, hand];
	} else return [false, hand];
}

window.isFourOfAKind = function(hand) {
	var values = []
	for (var i=0; i<hand.length; i++) {
		values.push(window.getValue(hand[i]))
	}
	values.sort()
	for (var i=0; i<2; i++) {
		if (values[0+i] == values[1+i] &&
			values[1+i] == values[2+i] &&
			values[2+i] == values[3+i]) {
			return [true, hand];
		}
	}
	return [false, hand];
}

window.isFullHouse = function(hand) {
	return [isThreeOfAKind(hand)[0] && isOnePair(hand)[0], isThreeOfAKind(hand)[1]]
}

window.isFlush = function(hand) {
    var suits = hand.map(getSuit);

    var s = suits[0];
    return [suits.reduce(function(acc, e) { return acc && (e == s); }, 
                         true), hand];
}

window.isStraight = function(hand) {
    var values = hand.map(getValue).sort(function(a,b){return a-b;});

    return [values[1] === values[0] + 1 &&
            values[2] === values[1] + 1 &&
            values[3] === values[2] + 1 &&
            values[4] === values[3] + 1];
}

window.isThreeOfAKind = function(hand) {
	var values = []
	for (var i=0; i<hand.length; i++) {
		values.push(window.getValue(hand[i]))
	}
	values.sort()
	for (var i=0; i<3; i++) {
		if (values[0+i] == values[1+i] &&
			values[1+i] == values[2+i]) {
			var return_hand = []
			for (var i=0; i<hand.length; i++) {
				if (window.getValue(hand[i]) == values[0+i]) return_hand.push(hand[i])
			}
			return [true, return_hand];
		}
	}
	return [false, hand];
}

window.isTwoPairs = function(hand) {
	var values = []
	for (var i=0; i<hand.length; i++) {
		values.push(window.getValue(hand[i]))
	}
	values.sort()
	var matches = 0
	while (values.length>1){
		var val = values.pop()
		var match = []
		var noMatch = []
		for (var i=0; i<values.length; i++) {
			if (values[i] == val) {
				match.push(values[i])
			} else {
				noMatch.push(values[i])
			}
		}
		if (match.length == 1) {
			matches++
			if (matches == 2) {
				return [true, hand]
			} else {
				values = noMatch
			}
		} else {
			values = noMatch
		}
	}
	return [false, hand]
}

window.isOnePair = function(hand) {
    var values = []
    for (var i=0; i<hand.length; i++) {
        values.push(window.getValue(hand[i]))
    }
    values.sort()
    while (values.length>1){
        var val = values.pop()
        var match = []
        var noMatch = []
        for (var i=0; i<values.length; i++) {
            if (values[i] == val) {
                match.push(values[i])
            } else {
                noMatch.push(values[i])
            }
        }
        if (match.length == 1) {
            var return_hand = []
            for (var i=0; i<values.length; i++) {
                if (getValue(hand[i]) == val) return_hand.push(hand[i]);
            }
            return [true, return_hand]
        } else {
            values = noMatch
        }
    }
    return [false, hand]
}

window.largestCardValue = function(hand) {
    var values = hand.map(getValue);
    return Math.max.apply(null, values);
}

window.getValue = function(card) {
	if (!window.isNaN(parseInt(card))){
		return parseInt(card);
	} else {
		switch(card[0]) {
			case "J": return 11;
			case "Q": return 12;
			case "K": return 13;
			case "A": return 14;
		}
	}
}

window.getSuit = function(card) {
	return card[card.length - 1]
}