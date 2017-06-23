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
// GOOG: -32.36,
// NFLX: 43.44,
// FB: -47.36,
// MSFT: -16.21,
// AMZN: 299.04,
// NVDA: 17.5
// }

stocks.gainAndLoss = function(data) {
  var result= {}
  var companyGroup = _.groupBy(data, function (company){
    return company['ticker'];
  });

  for (var name in companyGroup) {
    companyGroup[name].forEach(function(trait) {
      trait.time = new Date(trait.time);
      trait.time = trait.time.getTime();
    })
    companyGroup[name].sort(function (a, b) {
      return a.time - b.time;
    })
  }
  var tickers = Object.keys(companyGroup)
  for (var i=0; i<tickers.length; i++){
    result[tickers[i]] = companyGroup[tickers[i]][companyGroup[tickers[i]].length-1].price
    - companyGroup[tickers[i]][0].price
  }
  return result;
}

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
  var result = stocks.gainAndLoss(data)
  var bigGain= Object.values(result).sort(function(a,b){
    return a>b
  })
  for (var key in result)
  if(result[key] === bigGain[bigGain.length-1]){
    return key;
  }
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
  var result = stocks.gainAndLoss(data)
  var bigLoss= Object.values(result).sort(function(a,b){
    return a>b
  })
  for (var key in result)
  if(result[key] === bigLoss[0]){
    return key;
  }
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
  var result = {}
  var companyGroup = _.groupBy(data, function (company){
    return company['ticker'];
  });

  for (var name in companyGroup) {
    companyGroup[name].sort(function (a, b) {
      return a.price - b.price;
    })
  }
  var tickers = Object.keys(companyGroup)
  for (var i=0; i<tickers.length; i++){
    result[tickers[i]] = companyGroup[tickers[i]][companyGroup[tickers[i]].length-1].price
    - companyGroup[tickers[i]][0].price
  }

  var bigVar= Object.values(result).sort(function(a,b){
    return a>b
  })
  for (var key in result)
  if(result[key] === bigVar[bigVar.length-1]){
    return key;
  }
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
  var companyGroup = _.groupBy(data, function (company){
    return company['ticker'];
  });

  var price = []

  for (var name in companyGroup) {
    companyGroup[name].forEach(function(trait) {
      trait.time = new Date(trait.time);
      trait.time = trait.time.getTime();

      var tickers = Object.keys(portfolio)
      var shares = Object.values(portfolio)

      for (var i=0; i< tickers.length; i++){
        if(name === tickers[i] && trait.time === date.getTime()){
          price.push(trait.price * shares[i])

        }
      }
    })
  }

  var sum =0;
  for (var i=0;i<price.length; i++){
    sum += price[i]
  }
  return sum;

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
  var companyGroup = _.groupBy(data, function (company){
    return company['ticker'];
  });

  var result = 0;
  var resultArray =[]
  var buyTime;
  var sellTime;

  for (var name in companyGroup) {
    companyGroup[name].forEach(function(trait) {
      trait.time = new Date(trait.time);
    })
  }
  for (var i=0; i<companyGroup[ticker].length; i++){
    for(var j=0; j<companyGroup[ticker].length; j++){
      if(companyGroup[ticker][i].time - companyGroup[ticker][j].time >0 &&
        companyGroup[ticker][i].price - companyGroup[ticker][j].price >result
      ){
        result = companyGroup[ticker][i].price - companyGroup[ticker][j].price;
        buyTime = companyGroup[ticker][j].time
        sellTime = companyGroup[ticker][i].time
      }
    }
  }
  resultArray.push(buyTime,sellTime,result)
  return resultArray
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
  var companyGroup = _.groupBy(data, function (company){
    return company['ticker'];
  });

  var result = 0;
  var resultArray =[]
  var buyTime;
  var sellTime;
  var ticker;

  for (var name in companyGroup) {
    companyGroup[name].forEach(function(trait) {
      trait.time = new Date(trait.time);
    })

    for (var i=0; i<companyGroup[name].length; i++){
      for(var j=0; j<companyGroup[name].length; j++){
        if(companyGroup[name][i].time - companyGroup[name][j].time >0 &&
          companyGroup[name][i].price - companyGroup[name][j].price >result
        ){
          result = companyGroup[name][i].price - companyGroup[name][j].price;
          buyTime = companyGroup[name][j].time
          sellTime = companyGroup[name][i].time
          ticker = companyGroup[name][i].ticker
        }
      }
    }
  }
  resultArray.push(ticker,buyTime,sellTime,result)
  return resultArray
};
