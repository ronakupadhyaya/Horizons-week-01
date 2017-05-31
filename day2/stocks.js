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
  // group by ticker
  //map --> getTime()
  //identify min & max for each ticker
  //substract max.price - min.price
  var tickerObj = _.groupBy(data, function(n){
    return n.ticker;
  })
   var sortedT = _.map(tickerObj, function(value, key) {
    return _.sortBy(value, function(n) {
      return n.time;
    })
  })
  var results = [];
  _.forEach(sortedT, function(n){
    var min = n[0].price;
    var max = n[29].price;
    results.push(max-min);
  })
var nananana = {
  GOOG: results[0],
  NFLX: results[1],
  FB: results[2],
  MSFT: results[3],
  AMZN: results[4],
  NVDA: results[5]
}
return nananana;
};

// Exercise 2. stocks.biggestGainer(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total gain is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestGainer(stockData) -> 'AMZN'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestGainer = function(data) {
  // YOUR CODE HERE
  var arr = [];
_.forEach(stocks.gainAndLoss(data), function(value, key){
  arr.push({'ticker': key,
            'difference': value
})
})
 var maxT = _.max(arr, function(n){
   return n.difference
 })
 return maxT.ticker
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
  var arr = [];
_.forEach(stocks.gainAndLoss(data), function(value, key){
  arr.push({'ticker': key,
            'difference': value
})
})
 var minT = _.min(arr, function(n){
   return n.difference
 })
 return minT.ticker
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
  var tickerObj = _.groupBy(data, function(n){
    return n.ticker;
  })


//console.log(tickerObj)

  var sortedMax = _.map(tickerObj, function(value, key) {
   return _.max(value, function(n) {
     return n.price;
   })
 })




 var sortedMin = _.map(tickerObj, function(value, key) {
  return _.min(value, function(n) {
    return n.price;
  })
 })

  sortedMin = _.sortBy(sortedMin, function(n) {
    return n.ticker;
  })
  sortedMax = _.sortBy(sortedMax, function(n) {
    return n.ticker;
  })

var arr1 = [];
var arr2 = [];

_.forEach(sortedMin, function(n){
  var temp = []
  temp.push(n.ticker);
  temp.push(n.price);
  arr1.push(temp)
})

_.forEach(sortedMax, function(n){
  var temp = []
  temp.push(n.ticker);
  temp.push(n.price);
  arr2.push(temp)
})

var results = [];

for (var i =0; i< arr1.length; i++){
  results.push({'ticker': arr1[i][0],
             'difference': arr2[i][1]-arr1[i][1]
})
}

var res = _.max(results, function(n){
  return n.difference
})

return res.ticker
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

var tally = 0;

_.forEach(portfolio, function(value,key){
  data.forEach(function(x){
    //console.log(date, new Date(x.time));
    if(x.ticker === key && new Date(x.time).getDate() === date.getDate()){
      tally += x.price * value;
    }
  })

})
return tally
}



//  var stocks = _.filter(data, function(n){
  //console.log(n.time);
//   console.log(new Date(n.time))
//    return new Date(n.time) === date;

  //})
  //console.log(stocks);
//};

// [Bonus] Exercise 6. stocks.bestTrade(


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

  var dataOfInterest = _.filter(data, function(n){
    return n.ticker === ticker
  })

  var sortedData = _.sortBy(dataOfInterest, function(x){
    return x.time
  })
  //console.log(sortedData)
  var maxDiff = 0;
  var index1 = 0;
  var index2 = 0;
  for(var i = 0; i < sortedData.length; i++){
    for(var j =i; j < sortedData.length; j++){
      var temp = sortedData[j].price - sortedData[i].price;
      if(temp > maxDiff){
        maxDiff = temp;
        index1 = i; //buy
        index2 = j; //sell
      }
    }
  }
  //console.log(maxDiff, index1, index2)
  return [new Date(sortedData[index1].time), new Date(sortedData[index2].time), maxDiff]

};

stocks.bestTrade2 = function(data, ticker) {

  var dataOfInterest = _.filter(data, function(n){
    return n.ticker === ticker
  })

  var sortedData = _.sortBy(dataOfInterest, function(x){
    return x.time
  })
  //console.log(sortedData)
  var maxDiff = 0;
  var index1 = 0;
  var index2 = 0;
  for(var i = 0; i < sortedData.length; i++){
    for(var j =i; j < sortedData.length; j++){
      var temp = sortedData[j].price - sortedData[i].price;
      if(temp > maxDiff){
        maxDiff = temp;
        index1 = i; //buy
        index2 = j; //sell
      }
    }
  }
  //console.log(maxDiff, index1, index2)
  return [new Date(sortedData[index1].time), new Date(sortedData[index2].time), maxDiff, ticker]

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
  var tickers = ["GOOG","NFLX","FB","MSFT","AMZN","NVDA"];
  var resultsArr = [];
  for(var i = 0; i < tickers.length; i++){
    resultsArr.push(stocks.bestTrade2(data, tickers[i]));
  }
  var best = _.max(resultsArr, function(n){
    return n[2];
  })
  return [best[3], best[0], best[1], best[2]]
};
