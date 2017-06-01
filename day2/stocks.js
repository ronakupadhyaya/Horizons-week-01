"use strict";

window.stocks = {};

// # Introduction
//
// You will be implementing several key functions for a stock analysis program.
// We are providing you with the data whose format is described in the next paragraph.
// You can view the data under data/transactions.js. Each function you implement
// will be tested with the data from that file.

// # Data
//
// The data that will be run through each function is an array of Transaction objects.
// Transaction objects have three properties: 'ticker', 'time' and 'price'.
// The 'ticker' property is the name of the company to which the transaction refers to.
// The 'time' property is the time of the transaction on 5/17/2016.
// The 'price' property is the price of the stock of 'ticker' at 'time'.
// You can access these properties the usual ways, like (assuming a given item is called `trans`):
// `var price = trans["price"];` or `var ticker = trans.ticker`
//
// So, the data's gonna look something like:
// var data = [ { "ticker": "MSFT", "time": "2016-05-17T11:02:20", "price": 22.83 }, ... ];


// Exercise 1. stocks.gainAndLoss(data)
//
// Write a function that calculates the total loss or gain for each ticker/company.
// This function should return an object with stock tickers as keys and the total
// gain or loss for the given stock as the values.
//
// Total gain or loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.gainAndLoss(data) -> {
//   GOOG: -32.36,
//   NFLX: 43.44,
//   FB: -47.36,
//   MSFT: -16.21,
//   AMZN: 299.04,
//   NVDA: 17.5
// }
stocks.gainAndLoss = function(data) {
  // YOUR CODE HERE

  var groupbyCompany = _.groupBy(data, function(student) {
    return student.ticker;
  });
  var able = {};
  _.forEach(groupbyCompany, function(value, key){
  	var earlier = value.reduce(function(object1,object2){
  		var time1 = (new Date(object1.time)).getTime();
  		var time2 = (new Date(object2.time)).getTime();
  		if(time1 < time2){
  			return object1;
  		}
  		return object2;
  	})

  	var later = value.reduce(function(object1,object2){
  		var time1 = (new Date(object1.time)).getTime();
  		var time2 = (new Date(object2.time)).getTime();
  		if(time1 > time2){
  			return object1;
  		}
  		return object2;
  	})
  	able[key]  = (later.price - earlier.price);
  })

  return able;
};

// Exercise 2. stocks.biggestGainer(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total gai// You can use stocks.gainAndLoss() in your answer.
//n is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestGainer(stockData) -> 'AMZN'
//
stocks.biggestGainer = function(data) {
  // YOUR CODE HERE
  var obj = stocks.gainAndLoss(data);
  //var arr = []
  var max1 = 0;
  var key1 = "";
  //console.log(obj);
  _.forEach(obj, function(value, key){
  	//console.log(value);
  	if(value > max1){
  		max1 = value;
  		key1 = key;
  	}
  });
  return key1;
};

// Exercise 3. stocks.biggestLoser(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestLoser(stockData) -> 'GOOG'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestLoser = function(data) {
	var obj = stocks.gainAndLoss(data);
	//console.log(obj);
	var min1 = Infinity;
  var key1 = "";
  //console.log(obj);
  _.forEach(obj, function(value, key){
  	//console.log(value);
  	if(value < min1){
  		min1 = value;
  		key1 = key;
  	}
  });
  return key1;
  // YOUR CODE HERE
};

// Exercise 4. stocks.widestTradingRange(data)
//
// Write a function that finds the ticker of the stock with the widest trading
// range (biggest difference between the lowest and the highest stock price)
// over the lifetime of the given dataset.
//
// Example.
// stocks.widestTradingRange(data) -> 'AMZN'
stocks.widestTradingRange = function(data) {
  // YOUR CODE HERE
 
if(stocks.gainAndLoss(data)[stocks.biggestGainer(data)] > Math.abs(stocks.gainAndLoss(data)[stocks.biggestLoser(data)])){

  return stocks.biggestGainer(data);
}
return stocks.biggestLoser(data);
};

// Exercise 5. stocks.portfolioValue(data, date, portfolio)
// Write a function that calculates the value of a stock portfolio at a given
// date.
//
// Arguments:
//  - date: a JavaScript Date object indicating which point in time to calculate
//    the value of the portfolio for
//  - portfolio: an object mapping tickers to number of shares owned
//
// ex.
// stocks.totalPortfolioValue(data,
//                            new Date('2016-06-30T00:00:00.000Z'),
//                            {NFLX: 1, GOOG: 10})
//    -> 513.31
stocks.portfolioValue = function(data, date, portfolio) {
	
	var newObj = {};
	data.forEach(function(transaction){
		var date3 = new Date(transaction.time);
		if(date3.getTime() === date.getTime()){
			newObj[transaction.ticker] = transaction.price;
		}
	})
	//console.log(newObj);
	var total = 0;
	_.forEach(portfolio, function(value, key){
		total += newObj[key] * value;
	})
	return total;
	

  // YOUR CODE HERE
};

// [Bonus] Exercise 6. stocks.bestTrade(data, ticker)
// Write a function to figure out the best time to buy and sell a given
// stock/ticker/company.
//
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing three items:
//  1. buy date (a Date object)
//  2. sell date (a Date object)
//  3. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTrade(stockData, 'GOOG') ->
//  [new Date('2016-06-19T00:00:00.000Z'),
//   new Date('2016-06-28T00:00:00.000Z'),
//   55.54]
stocks.bestTrade = function(data, ticker) {
  // YOUR CODE HERE
  var groupbyCompany = _.groupBy(data, function(student) {
    return student.ticker;
  });
  var tickerData = groupbyCompany[ticker];
  tickerData.sort(function(object1, object2){
  	var time1 = (new Date(object1.time)).getTime();
  	var time2 = (new Date(object2.time)).getTime();
  	return time1 - time2
  });
  //console.log(tickerData);
  var diff = 0;
  var buyingTime = "";
  var sellingTime = "";
  for(var i = 0; i < tickerData.length; i++){
  	for(var j =i+1; j < tickerData.length; j++){
  		if(tickerData[j].price - tickerData[i].price > diff){
  			diff = tickerData[j].price - tickerData[i].price;
  			buyingTime = tickerData[i].time;
  			sellingTime = tickerData[j].time;
  		}
  	}
  }
  var arr = [];
  arr.push(new Date(buyingTime));
  arr.push(new Date(sellingTime));
  arr.push(diff);
  return arr;
  
};

// [Super Bonus] Exercise 8. stocks.bestTradeEver(data)
// Write a function to figure out the best stock to buy and when to
// buy and sell it.
//
//  - You can only buy one stock.
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing four items:
//  1. ticker (a string)
//  2. buy date (a Date object)
//  3. sell date (a Date object)
//  4. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTradeEver(data) ->
//  ['AMZN',
//   new Date('2016-06-02:00:00.000Z'),
//   new Date('2016-06-24:00:00.000Z'),
//   55.54]
stocks.bestTradeEver = function(data) {
  // YOUR CODE HERE
  var gainandLossObject = stocks.gainAndLoss(data);
  var compArr = [];
  var finalArr = [];
  //console.log(gainandLossObject);
  _.forEach(gainandLossObject, function(value, key){
  	compArr.push(key);
  });
  compArr.forEach(function(n){
  	var temp = stocks.bestTrade(data, n);
  	temp.unshift(n);
  	finalArr.push(temp);
  });
  return finalArr.reduce(function(s1, s2){
  	if(s1[3] > s2[3]){
  		return s1;
  	}
  	return s2;
  });

 //console.log(finalArr);
};
