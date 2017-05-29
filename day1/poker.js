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
window.isFlush(hand) {
	var suit = hand[0][1];
	for (var i = 1; i < 5; i++) {
		if (hand[i][1] !== suit) {
			return false;
		}
	}
	return true;
}

window.isStraight(hand) {
	var numList = [];
	for(var i = 0; i < hand.length; i++) {
		numList.push(hand[i][0]);
	}
	numList.sort();
	for(var i = 0; i < numList.length - 1; i++) {
		if (numList[i] + 1 !== numList[i + 1]) {
			return false;
		}
	}
	return true;
}

window.isStraightFlush(hand) {
	return isStraight(hand) && isFlush(hand);
}

window.isRoyalFlush(hand) {
	if (!isStraight(hand) || !isFlush(hand)) {
		return false;
	}
	var numList = [];
	for(var i = 0; i < hand.length; i++) {
		numList.push(hand[i][0]);
	}
	numList.sort();
	if (numList[0] != 10) {
		return false;
	}
	return true;
}

window.isFourOfAKind(hand) {
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
		return true;
	}
	if (firstHalf.length === 1) {
		for (var j = 1; j < 4; j++) {
			if (secondHalf[0] !== secondHalf[j]) {
				return false;
			}
		}
		return true;
	}
	return false;
}

window.isFullHouse(hand) {
	return isTwoPairs(hand) && isThreeOfAKind(hand);
}

window.getHand(hand) {
	if (isRoyalFlush(hand)) {
		return 10;
	} else if (isStraightFlush(hand)) {
		return 9;
	} else if (isFourOfAKind(hand)) {
		return 8;
	} else if (isFullHouse(hand)) {
		return 7;
	} else if (isFlush(hand)) {
		return 6;
	} else if (isStraight(hand)) {
		return 5;
	} else if (isThreeOfAKind(hand)) {
		return 4;
	} else if (isTwoPairs(hand)) {
		return 3;
	} else if (isOnePair(hand)) {
		return 2;
	} else {
		return 1;
	}
}

window.rankPokerHand = function(hand1, hand2) {
  // YOUR CODE HERE
}
