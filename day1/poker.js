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

window.isFlush = function(hand) {
    var baseSuit = hand[0][hand[0].length - 1]
    for (var i = 0; i < hand.length; i++) {
        var card = hand[i]
        if (card[card.length - 1] !== baseSuit) {

            return false
        }
    }
    return true
}

window.cardSort = function(hand) {
    hand.sort(function compare(a, b){
        if (parseInt(a.substring(0, a.length - 1)) > parseInt(b.substring(0, b.length - 1))) {
            return 1
        }
        else if (parseInt(a.substring(0, a.length - 1)) < parseInt(b.substring(0, b.length - 1))) {
            return -1
        }
        return 0
    })
    return hand
}

window.getNum = function(card) {
    return parseInt(card.substring(0, card.length - 1))
}

window.isStraight = function(hand) {
    hand = window.cardSort(hand)
    for (var i = 0; i < hand.length - 1; i ++) {
        if (window.getNum(hand[i]) + 1 != window.getNum(hand[i + 1])) return false
    }
    return true
}

window.isFour = function(hand) {
    hand = window.cardSort(hand)
    for (var i = 0; i < 2; i++){
        var tempRank = window.getNum(hand[i])
        var fourFlag = true
        for (var j = 0; j < 4; j++){
            // console.log(hand[i + j])
            if (window.getNum(hand[i + j]) != tempRank){
                fourFlag = false
            }
        }
        if (fourFlag) return true
    }
    return false
}

window.isFull = function(hand) {
    var rankList = window.getRankList(hand)
    if (window.count(rankList, 3) === 1 && window.count(rankList, 2) === 1){
        return true
    }
    return false
}

window.isThree = function(hand) {
    var rankList = window.getRankList(hand)
    if (window.count(rankList, 3) === 1){
        return true
    }
    return false
}

window.isTwo = function(hand) {
    var rankList = window.getRankList(hand)
    if (window.count(rankList, 2) === 2){
        return true
    }
    return false
}

window.isOne = function(hand) {
    var rankList = window.getRankList(hand)
    if (window.count(rankList, 2) === 1){
        return true
    }
    return false
}

window.count = function(rankList, value) {
    var count = 0;
    for(var i = 0; i < rankList.length; ++i){
        if (rankList[i] === value) count++;
    }
    return count
}

window.getRankList = function(hand) {
    var rankList = Array.apply(null, Array(14)).map(Number.prototype.valueOf,0);
    for (var i = 0; i < hand.length; i++){
        rankList[window.getNum(hand[i]) - 2] += 1
    }
    return rankList
}

window.numberfy = function(hand) {
    for (var i = 0; i < hand.length; i++){
        if (hand[i][0] === 'J') {
            hand[i] = '11' + hand[i][1]
        } else if (hand[i][0] === 'Q'){
            hand[i] = '12' + hand[i][1]
        } else if (hand[i][0] === 'K'){
            hand[i] = '13' + hand[i][1]
        } else if (hand[i][0] === 'A'){
            hand[i] = '14' + hand[i][1]
        }
    }
    return hand
}

window.valueHigh = function(hand) {
    var total = 0
    var count = 4
    var rankList = window.getRankList(hand)
    for (var i = rankList.length - 1; i >= 0; i--) {
        if (rankList[i] === 1){
            total += Math.pow(14, count) * i
            count--;
        }
    }
    return total
}

window.valueOne = function(hand) {
    var total = 1000000
    var rankList = window.getRankList(hand)
    var oneCount = 2
    for (var i = rankList.length - 1; i >= 0; i--) {
        if (rankList[i] === 2){
            total += 14 * 14 * 14 * i
        }
        else if (rankList[i] === 1){
            total += Math.pow(14, oneCount) * i
            oneCount--;
        }
    }
    return total
}

window.valueTwo = function(hand) {
    var total = 2000000
    var rankList = window.getRankList(hand)
    var firstTwo = false
    for (var i = rankList.length - 1; i >= 0; i--){
        if (rankList[i] === 2 && !firstTwo){
            total += 14 * 14 * (i+2)
            firstTwo = true
        }
        else if (rankList[i] === 2){
            total += 14 * (i+2)
        }
        else if (rankList[i] === 1){
            total += i
        }
    }
    return total
}

window.valueThree = function(hand) {
    var middle = window.getNum(window.cardSort(hand)[2])
    return 3000000 + middle
}

window.valueFlush = function(hand) {
    hand = window.cardSort(hand)
    var highCard = window.getNum(hand[4])
    return 5000000 + highCard
}

window.valueFull = function(hand) {
    var rankList = window.getRankList(hand)
    var total = 6000000
    for (var i = rankList.length - 1; i >= 0; i--){
        if (rankList[i] === 3){
            total += 14 * (i+2)
        } else if (rankList[i] === 2){
            total += (i+2)
        }
    }
    return total
}

window.valueStraight = function(hand) {
    hand = window.cardSort(hand)
    var highCard = window.getNum(hand[4])
    return 4000000 + highCard
}

window.valueFour = function(hand) {
    var middle = window.getNum(window.cardSort(hand)[2])
    return middle + 7000000
}

window.valueStraightFlush = function(hand) {
    var straightFlush = 8000000
    hand = window.cardSort(hand)
    var highCard = window.getNum(hand[4])
    return highCard + straightFlush
}

window.valueHand = function(hand) {
    var hand = window.numberfy(hand)
    if (window.isStraight(hand) && window.isFlush(hand)){
        return window.valueStraightFlush(hand)
    } else if (window.isFour(hand)){
        return window.valueFour(hand)
    } else if (window.isFull(hand)){
        return window.valueFull(hand)
    } else if (window.isFlush(hand)){
        return window.valueFlush(hand)
    } else if (window.isStraight(hand)){
        return window.valueStraight(hand)
    } else if (window.isThree(hand)){
        return window.valueThree(hand)
    } else if (window.isTwo(hand)){
        return window.valueTwo(hand)
    } else if (window.isOne(hand)){
        return window.valueOne(hand)
    } else {
        return window.valueHigh(hand)
    }
}


window.rankPokerHand = function(hand1, hand2) {
    var value1 = window.valueHand(hand1)
    var value2 = window.valueHand(hand2)
    if (value1 > value2) return 1
    else{
        return 2
    }
}
