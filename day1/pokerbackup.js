window.samesuit = function(hand) {
	if (hand[0][1] === hand[1][1]
  		&& hand[0][1] === hand[2][1]
  		&& hand[0][1] === hand[3][1]
  		&& hand[0][1] === hand[4][1]) {
  	return true;
  	}
  	else {
  		return false;
  	}
}

window.remove_duplicates = function(hand) {
	var newArray = [];
	var seen = {};
	for (var i = 0; i < hand.length; i++) {
		if (!seen[hand[i]]) {
			newArray.push(hand[i]);
			seen[hand[i]] = true
		}
	}
	return newArray
}

window.compare = function(x, y) {
	if (x > y){
		return 1;
	}
	else if (y > x) {
		return 2;
	}
	else {
		return 0;
	}
}

window.findKey = function(obj, target) {
	for (var prop in obj) {
		if (obj[prop] === target) {
			return prop
		}
	}
}

window.findKey2pair = function(obj, target) {
	var newarray = [];
	for (var prop in obj) {
		if (obj[prop] === target) {
			newarray.push(prop)
		}
	}
	return newarray
}

window.rankPokerHand = function(hand1, hand2) {
	for (var i = 0; i < 2; i++) {
		var rank2 = []
	  	var hand = Array.prototype.slice.call(arguments)[i]
	  	for (var j = 0; j < hand.length; j++) {
	  		if (hand[j][0] === "1" && hand[j][1] === "0") {
	  			hand[j] = hand[j].replace('10', 'B');
	  		}
	  		if (hand[j][0] === "J") {
	  			hand[j] = hand[j].replace('J', 'C');
	  		}
	  		if (hand[j][0] === "Q") {
	  			hand[j] = hand[j].replace('Q', 'D');
	  		}
	  		if (hand[j][0] === "K") {
	  			hand[j] = hand[j].replace('K', 'E');
	  		}
	  		if (hand[j][0] === "A") {
	  			hand[j] = hand[j].replace('A', 'F');
	  		}
	 	}

	 	// definitions for the conditions
	 	var nodups = window.remove_duplicates(hand).sort();
		hand = hand.sort()

		var counts = {};
		for (var j = 0; j < hand.length; j++) {
			if (!counts[hand[j][0]]) {
				counts[hand[j][0]] = 1;
			}
			else {
				counts[hand[j][0]]++;
			}
		}

		// CONDITIONS
	 	//royal flush
		if (hand[0][0] === "B" && hand[1][0] === "C" 
			&& hand[2][0] === "D" 
			&& hand[3][0] === "E" 
			&& hand[4][0] === "F"
			&& window.samesuit(hand)) {
			rank2 = [10];
		}
		//straight flush
		else if (window.samesuit(hand) && hand.length === nodups.length
			&& (hand[4][0] - hand[0][0] === 4 || 
				(hand[0][0] === '6' && hand[4][0] === 'B') || 
				(hand[0][0] === '7' && hand[4][0] === 'C') || 
				(hand[0][0] === '8' && hand[4][0] === 'D') || 
				(hand[0][0] === '9' && hand[4][0] === 'E') || 
				(hand[0][0] === 'B' && hand[4][0] === 'F'))) {
			rank2 = [9, hand[4][0]];
		}
		//four of a kind
		else if (Object.values(counts).indexOf(4) > -1) {
			rank2 = [8, window.findKey(counts, 4), window.findKey(counts, 1)];
		}
		//full house
		else if (Object.values(counts).indexOf(3) > -1 &&
			Object.values(counts).indexOf(2) > -1) {
			rank2 = [7, window.findKey(counts, 3), window.findKey(counts, 2)];
		}
		//flush
		else if (window.samesuit(hand)) {
			rank2 = [6, hand[4][0], hand[3][0], hand[2][0]];
		}
		//straight
		else if (hand.length === nodups.length
			&& (hand[4][0] - hand[0][0] === 4 || 
				(hand[0][0] === '6' && hand[4][0] === 'B') || 
				(hand[0][0] === '7' && hand[4][0] === 'C') || 
				(hand[0][0] === '8' && hand[4][0] === 'D') || 
				(hand[0][0] === '9' && hand[4][0] === 'E') || 
				(hand[0][0] === 'B' && hand[4][0] === 'F'))) {
			rank2 = [5, hand[4][0]]
		}
		//three of a kind
		else if (Object.values(counts).indexOf(3) > -1) {
			rank2 = [4, window.findKey(counts, 3), window.findKey2pair(counts, 1)[1], window.findKey2pair(counts, 1)[0]]
		}
		//two pair
		else if (window.findKey2pair(counts, 2).length === 2) {
			rank2 = [3, window.findKey2pair(counts, 2)[1], window.findKey2pair(counts, 2)[0], window.findKey(counts, 1)]
		}
		//pair
		else if (Object.values(counts).indexOf(2) > -1) {
			console.hand
			rank2 = [2, window.findKey(counts, 2), hand[4][0], hand[3][0], hand[2][0], hand[1][0]]
		}
		//high card
		else {
			rank2 = [1, hand[4][0], hand[3][0], hand[2][0], hand[1][0], hand[0][0]]
		}

		//copy of rank1
		if (i === 0) {
			var rank1 = rank2.slice()
		}
	}
	//comparing
	console.log("H: " + hand)
	console.log(rank1 + "   " + rank2)
	var index = 0;
	while (index < 5) {
		var result = compare(rank1[index], rank2[index])
		if (result === 0) {
			index++;
		}
		else {
			return result
		}
	}

}