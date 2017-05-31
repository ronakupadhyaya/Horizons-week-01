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
  var obj1= _.groupBy(data, function(obj) {
    return obj.ticker;
  });
  for(var key1 in obj1){
    var obj2 = obj1[key1];
    for(var key2 in obj2){
      obj2.sort(function(a,b){
        return new Date(a.time)-new Date(b.time);
      });
    }
  }
  var returnObj = {};
  for(var key in obj1){
    var temp = obj1[key];
      returnObj[key] = temp[temp.length-1].price-temp[0].price;
  }
// console.log( returnObj)
  return returnObj;

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
  var obj1= _.groupBy(data, function(obj) {
    return obj.ticker;
  });
  for(var key1 in obj1){
    var obj2 = obj1[key1];
    for(var key2 in obj2){
      obj2.sort(function(a,b){
        return new Date(a.time)-new Date(b.time);
      });
    }
  }
  var returnObj = {};
  for(var key in obj1){
    var temp = obj1[key];
      returnObj[key] = (temp[temp.length-1].price-temp[0].price);

  }

  _.mapObject(returnObj,function(val,key){
    if(val<0){return -1*val;}
  });

  var max=0;
  var str;
for(var key in returnObj){
  if(returnObj[key]>max){
    max = returnObj[key];
    str = key;
  }
}
return str;

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
  var obj1= _.groupBy(data, function(obj) {
    return obj.ticker;
  });
  for(var key1 in obj1){
    var obj2 = obj1[key1];
    for(var key2 in obj2){
      obj2.sort(function(a,b){
        return new Date(a.time)-new Date(b.time);
      });
    }
  }
  var returnObj = {};
  for(var key in obj1){
    var temp = obj1[key];
      returnObj[key] = (temp[temp.length-1].price-temp[0].price);

  }

  _.mapObject(returnObj,function(val,key){
    if(val<0){return -1*val;}
  });

  var min=Infinity;
  var str;
for(var key in returnObj){
  if(returnObj[key]<min){
    min = returnObj[key];
    str = key;
  }
}
return str;
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
  var obj1= _.groupBy(data, function(obj) {
    return obj.ticker;
  });

  for(var key1 in obj1){
    var obj2 = obj1[key1];
    for(var key2 in obj2){
      obj2.sort(function(a,b){
        return new Date(a.price)-new Date(b.price);
      });
    }
  }
  console.log(obj1);

  var returnObj={}
  for (var key in obj1){
    returnObj[key]=obj1[key][obj1[key].length-1].price - obj1[key][0].price;
  }
  // console.log(returnObj)

  var max=0;
  var str;
for(var key in returnObj){
  if(returnObj[key]>max){
    max = returnObj[key];
    str = key;
  }
}
return str;


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
// console.log(date.toISOString())
  var obj1= _.groupBy(data, function(obj) {
    return obj.time;
  });
// console.log(obj1);

var portfolio_arr = Object.keys(portfolio);
for(var key in obj1){
if(key===date.toISOString()){

  var array_on_date = obj1[key];

  }
}
// console.log(portfolio_arr)

var sum=0;
for(var i=0;i<portfolio_arr.length;i++){

  for(var j=0;j<array_on_date.length;j++){
    if(portfolio_arr[i]===array_on_date[j].ticker){
      sum+= array_on_date[j].price * portfolio[portfolio_arr[i]];
    }
  }

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
  var obj1= _.groupBy(data, function(obj) {
    return obj.ticker;
  });

  for(var key1 in obj1){
    var obj2 = obj1[key1];
    for(var key2 in obj2){
      obj2.sort(function(a,b){
        return new Date(a.time)-new Date(b.time);
      });
    }
  }
  //  console.log(obj1);

   var trades = []
for(var key in obj1){
if(key===ticker){trades = obj1[key]; }

}

   var buy = 0;
   var sell = 1;
   var curBuy = 0;
   var maxDiff = trades[1].price - trades[0].price;
   var minPrice = trades[0].price;

   for (var i = 1; i < trades.length; i++) {
     var curPrice = trades[i].price;
     var diff = curPrice - minPrice;
     if (diff > maxDiff) {
       maxDiff = diff;
       buy = curBuy;
       sell = i;
     }
     if (curPrice < minPrice) {
       minPrice = curPrice;
       curBuy = i;
     }
   }

   return [new Date(trades[buy].time), new Date(trades[sell].time), maxDiff];
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
  var temp = data;
  var obj1= _.groupBy(temp, function(obj) {
    return obj.ticker;
  });
  var store = [];
  temp = Object.keys(obj1);

  for(var i=0;i<temp.length;i++){
  var temp2 = data;
  var array = stocks.bestTrade(temp2, temp[i])
  store.push(array);
  }
  console.log(store)

  var max=store[0][2];
  var max_index= 0;
  for(var i=0;i<store.length;i++){
    if(store[i][2]>max){
      max=store[i][2];
      max_index=i;
    }
  }
  return [ temp[max_index],store[max_index][0],store[max_index][1],store[max_index][2] ]

};
