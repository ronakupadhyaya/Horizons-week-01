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
  var stocks = _.groupBy(data,function(item){
    return item.ticker;
  })
  //console.log(stocks)

  var answer = _.mapObject(stocks,function(val,key){
    //console.log("before sort: ", val[10])
    val = _.sortBy(val,function(item){
      var date = new Date(item.time)
      return date
    })
    //console.log("after sort: ", val[10])
    return val[val.length-1].price - val[0].price
  });
  return answer
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
  var ss = stocks.gainAndLoss(data)
  var max = -999
  var stock = ''
  for (var key in ss){
    if(ss.hasOwnProperty(key)){
      if(ss[key]>max){
        max = ss[key];
        stock = key;
      }
    }
  }
  return stock
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
  // YOUR CODE HERE
  var ss = stocks.gainAndLoss(data)
  var min = Infinity
  var stock = ''
  for (var key in ss){
    if(ss.hasOwnProperty(key)){
      if(ss[key]<min){
        min = ss[key];
        stock = key;
      }
    }
  }
  return stock
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
  var stocks = _.groupBy(data,function(item){
    return item.ticker;
  })
  //console.log(stocks)

  var ss = _.mapObject(stocks,function(val,key){
    val = _.sortBy(val,function(item){
      return item.price
    })
    return val[val.length-1].price - val[0].price
  });

  var max = -999
  var stock = ''
  for (var key in ss){
    if(ss.hasOwnProperty(key)){
      if(ss[key]>max){
        max = ss[key];
        stock = key;
        //console.log("stock: ",stock)
      }
    }
  }
  return stock
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
  // YOUR CODE HERE
  var time = date.getTime()
  var data1 = _.filter(data,function(item){
    var d = new Date(item.time)
    return (d.getTime() === time) && (Object.keys(portfolio).includes(item.ticker))
  })

  var answer = 0
  data1.forEach(function(item){
    answer += portfolio[item.ticker] * item.price
  })
  return answer

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
  data = _.filter(data,function(item){
    return item.ticker === ticker
  })

  //console.log("before: ",data)
  data = _.sortBy(data,function(item){
    return item.price
  })
  //console.log("after: ",data)

  var profit = 0
  var dBuy
  var dSell

  for (var i=0; i<data.length;i++) {
    for (var j = data.length-1; j>=i; j--){
      if(new Date(data[j].time) > new Date(data[i].time)){
        if (data[j].price - data[i].price > profit){
          profit = data[j].price - data[i].price
          dBuy = new Date(data[i].time)
          dSell = new Date(data[j].time)
        }
      }
    }
  }

  return [dBuy,dSell,profit]

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
  var data1 = _.groupBy(data,function(item){
    return item.ticker
  })
  //console.log(data1)

  var data2 = _.mapObject(data1, function(val,key){
    return stocks.bestTrade(val,key)
  })
  //console.log(data2)

  var max = -Infinity
  var name
  var buyArr
  for (var key in data2){
    if (data2.hasOwnProperty(key)){
      if (data2[key][2] > max){
        buyArr = data2[key]
        max = data2[key][2]
        name = key
      }
    }
  }

  return [name,buyArr[0],buyArr[1],buyArr[2]]

};
