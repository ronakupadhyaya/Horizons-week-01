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


  var convert = function(hand, nums, suites) {
  	for (var i = 0; i < hand.length; i++) {
  		var first = hand[i][0];
  		var last = hand[i][hand[i].length - 1];
  		if (first == "1") {
  			nums.push(10);
  		} else if (first == "J") {
  			nums.push(11);
  		} else if (first == "Q") {
  			nums.push(12);
  		} else if (first == "K") {
  			nums.push(13);
  		} else if (first == "A") {
  			nums.push(14);
  		} else {
  			nums.push(parseInt(first));
  		}
  		suites.push(last);
  	}
  }



  function occurances(arr) {
    var a = [], b = [], prev;
    //arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
   }

   function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
	}

   var isStraight = function(nums) {
   	for (var i = 1; i < nums.length; i++) {
   		if (nums[i - 1] != nums[i] - 1) {
   			return false;
   		}
   	}
   	return true;
   }

   var isFourOfAKind = function(dups) {
   		return dups[1].indexOf(4) !== -1;
   }

   var isThreeOfAKind = function(dups) {
   		return dups[1].indexOf(3) !== -1;
   }

   var isPair = function(dups) {
   		return dups[1].indexOf(2) !== -1;
   }


   var isTwoPair = function(dups) {
   		var two = getAllIndexes(dups[1], 2)
   		//console.log(two);
   		return two.length == 2;
   }

   var isFlush = function(suites) {
   	for (var i = 1; i < suites.length; i++) {
   		if (suites[i - 1] !== suites[i]) {
   			return false;
   		}
   	}
   	return true;
   }


   var getInitHandValue = function(nums, dups, suites) {
   		var handValue = 0;
   		if (isPair(dups)) {
   			handValue = 1;
   		}
   		if (isTwoPair(dups)) {
   			handValue = 2;
   		}
   		if (isThreeOfAKind(dups)) {
   			handValue = 3;
   		}
   		if (isStraight(nums)) {
   			handValue = 4;
   		}
   		if (isFlush(suites)) {
   			handValue = 5;
   		}
   		if (isThreeOfAKind(dups) && isPair(dups)) {
   			handValue = 6;
   		}
   		if (isFourOfAKind(dups)) {
   			handValue = 7;
   		}
   		if (isFlush(suites) && isStraight(nums)) {
   			handValue = 8;
   		}
   		if (isFlush(suites) && isStraight(nums) && nums[4] == 14) {
   			handValue = 9;
   		}
   		console.log("My hand", handValue);
   		return handValue;
   }

	function sortNumber(a,b) {
    	return a - b;
	}
  var nums1 = [];
  var nums2 = [];
  var suites1 = [];
  var suites2 = [];

  convert(hand1, nums1, suites1);
  convert(hand2, nums2, suites2);

  	console.log(nums1)
  	console.log(nums2)


	//nums1 = _.sortBy(nums1);
	//nums2 = _.sortBy(nums2);

	nums1.sort(function(a, b) {
		if (a < b) 
			return -1;
		if (a > b) 
			return 1;
		else
			return 0;
	});

	nums2.sort(function(a, b) {
		if (a < b) 
			return -1;
		if (a > b) 
			return 1;
		else
			return 0;
	});
	console.log(nums1);
	console.log(nums2);

	//debugger;

  var high1 = nums1[4];
  var high2 = nums2[4];

   var dups1 = occurances(nums1);
   var dups2 = occurances(nums2);

   var val1 = getInitHandValue(nums1, dups1, suites1);
   var val2 = getInitHandValue(nums2, dups2, suites2);
	console.log(nums1);
	console.log(nums2);



   if (val1 > val2) {
   	return 1;
   } else if (val1 < val2) {
   	return 2;
   }

   if (val1 == 0) {
   		for (var j = nums1.length - 1; j >= 0; j--) {
   	 		if (nums1[j] > nums2[j]) {
   	 			return 1;
   	 		}
   	 		if (nums1[j] < nums2[j]) {
   	 			return 2;
   	 		}
   	 	}
   }

   if (val1 == 1) {
   	 	var pairNum1 = dups1[0][dups1[1].indexOf(2)];
   	 	var pairNum2 = dups2[0][dups2[1].indexOf(2)];
   	 	if (pairNum1 > pairNum2) {
   	 		return 1;
   	 	} else if (pairNum1 < pairNum2) {
   	 		return 2;
   	 	} else {
   	 		for (var j = 4; j >= 0; j--) {
   	 			if (nums1[j] > nums2[j]) {
   	 				return 1;
   	 			} else if (nums1[j] < nums2[j]) {
   	 				return 2;
   	 			}
   	 		}
   	 	}
   	 }

   	 if (val1 == 2) {
   	 	var highPair1 = 0;
   	 	var highPair2 = 0;
   	 	var pairs1 = getAllIndexes(dups1[1], 2);
   	 	var pairs2 = getAllIndexes(dups2[1], 2);
   	 	for (var i = pairs1.length - 1; i >= 0; i--) {
   	 		if (pairs1[i]<pairs2[i]) {
   	 			return 1;
   	 		}
   	 		else if (pairs1[i]>pairs2[i]) {
   	 			return 2;
   	 		}

   	 	}
   	 }


   	 if (val1 == 3) {
   	 	 for (var j = 4; j >= 0; j--) {
   	 		if (nums1[j] > nums2[j]) {
   	 			return 1;
   	 		} else if (nums1[j] < nums2[j]) {
   	 			return 2;
   	 		}
   	 	}
   	 }

   	 if (val1 == 4) {
   	 	 for (var j = 4; j >= 0; j--) {
   	 		if (nums1[j] > nums2[j]) {
   	 			return 1;
   	 		} else if (nums1[j] < nums2[j]) {
   	 			return 2;
   	 		}
   	 	}
   	 }

   	if (val1 == 5) {
   	 	 for (var j = 4; j >= 0; j--) {
   	 		if (nums1[j] > nums2[j]) {
   	 			return 1;
   	 		} else if (nums1[j] < nums2[j]) {
   	 			return 2;
   	 		}
   	 	}
   	 }


   	  if (val1 == 6) {
   	 	var tripNum1 = dups1[0][dups1[1].indexOf(3)];
   	 	var tripNum2 = dups2[0][dups2[1].indexOf(3)];
   	 	if (tripNum1 > tripNum2) {
   	 		return 1;
   	 	} else if (tripNum1 < tripNum2) {
   	 		return 2;
   	 	} else {
   	 		var pairNum1 = dups1[0][dups1[1].indexOf(2)];
   	 		var pairNum2 = dups2[0][dups2[1].indexOf(2)];
   	 		if (pairNum1 > pairNum2) {
   	 			return 1;
   	 		} else if (pairNum1 < pairNum2) {
   	 			return 2;
   	 		} else {
   	 			for (var j = 4; j >= 0; j--) {
   	 				if (nums1[j] > nums2[j]) {
   	 					return 1;
   	 				} else if (nums1[j] < nums2[j]) {
   	 					return 2;
   	 				}
   	 			}
   	 		}
   	 	}
   	 }

   	if (val1 == 7) {
   		var pairNum1 = dups1[0][dups1[1].indexOf(4)];
   	 	var pairNum2 = dups2[0][dups2[1].indexOf(4)];
   	 	if (pairNum1 > pairNum2) {
   	 		return 1;
   	 	} else if (pairNum1 < pairNum2) {
   	 		return 2;
   	 	} else {
   	 		for (var j = 4; j >= 0; j--) {
   	 			if (nums1[j] > nums2[j]) {
   	 				return 1;
   	 			} else if (nums1[j] < nums2[j]) {
   	 				return 2;
   	 			}
   	 		}
   	 	}
   	}



}
