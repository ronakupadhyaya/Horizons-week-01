describe("EventEmitter", function() {
  beforeEach(function() {
    var testEmitter = new EventEmitter;
    var ten = 10, hundred = 100, thousand = 1000;
    var testFn10 = function () {
      return ten++;
    }
    var testFn100 = function () {
      return hundred++;
    }
    var testFn1000 = function () {
      return thousand++;
    }

    var observers = [
      new Observer('testObserver1', testEmitter),
      new Observer('testObserver2', testEmitter),
      new Observer('testObserver3', testEmitter)
    ]
  });

  it("once(eventName, fn)", function() {
    var ret1; var arr = [(arg) => ret1 += arg];
    myEventEmitter.once('connection', arr[0])
    expect(myEventEmitter.listeners['connection']).toEqual([jasmine.any(Function)]);
    myEventEmitter.emit('connection', 100)
    expect(myEventEmitter.listeners['connection']).toEqual([])
  });
});
