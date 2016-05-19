it("builtins.trim('  Horizons  ') -> 'Horizons'", function() {
  expect(builtins.trim('  Horizons  ')).toBe('Horizons');
});
it("builtins.trim('Hello World!    ') -> 'Hello World!'", function() {
  expect(builtins.trim('Hello World!    ')).toBe('Hello World!');
});
it("builtins.search('Horizons', 'o') -> true", function() {
  expect(builtins.search('Horizons', 'o')).toBe(true);
});
it("builtins.search('Horizons', 'oz') -> false", function() {
  expect(builtins.search('Horizons', 'oz')).toBe(false);
});
it("builtins.parseQuantity('1 tool') -> 1", function() {
  expect(builtins.parseQuantity('1 tool')).toBe(1);
});
it("builtins.parseQuantity('8 buckets') -> 8", function() {
  expect(builtins.parseQuantity('8 buckets')).toBe(8);
});
it("builtins.reverse([1, 2, 3]) -> [3, 2, 1]", function() {
  expect(builtins.reverse([1, 2, 3])).toEqual([3, 2, 1]);
});
it("builtins.reverse(['dogs', 'cats', 'moose']) -> ['moose', 'cats', 'dogs']", function() {
  expect(builtins.reverse(['dogs', 'cats', 'moose'])).toEqual(['moose', 'cats', 'dogs']);
});
it("builtins.isEqual([1, 2, 3], [1, 2, 3]) -> true", function() {
  expect(builtins.isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
});
it("builtins.isEqual(['1', '2', '3'], [1, 2, 3]) -> false", function() {
  expect(builtins.isEqual(['1', '2', '3'], [1, 2, 3])).toBe(false);
});
it("builtins.isEqual([3, 2, 1], [1, 2, 3]) -> false", function() {
  expect(builtins.isEqual([3, 2, 1], [1, 2, 3])).toBe(false);
});
it("builtins.isPalindrome([1, 2, 3, 2, 1]) -> true", function() {
  expect(builtins.isPalindrome([1, 2, 3, 2, 1])).toBe(true);
});
it("builtins.isPalindrome([1, 2, 3, 4, 5]) -> false", function() {
  expect(builtins.isPalindrome([1, 2, 3, 4, 5])).toBe(false);
});
it("builtins.isPalindrome(['1', '2', '3', 2, 1]) -> false", function() {
  expect(builtins.isPalindrome(['1', '2', '3', 2, 1])).toBe(false);
});
it("builtins.sort([[1, 2, 3], [4, 5], [6]]) -> [[6], [4, 5], [1, 2, 3]]", function() {
  expect(builtins.sort([[1, 2, 3], [4, 5], [6]])).toBe([[6], [4, 5], [1, 2, 3]]);
});
it("builtins.sort([[], [''], []]) -> [[], [], ['']]", function() {
  expect(builtins.sort([[], [''], []])).toBe([[], [], ['']]);
});
it("builtins.flatten([[1, 2, 3], [4, 5], [6]]) -> [1, 2, 3, 4, 5, 6]", function() {
  expect(builtins.flatten([[1, 2, 3], [4, 5], [6]])).toBe([1, 2, 3, 4, 5, 6]);
});
it("builtins.flatten([[], [''], []]) -> ['']", function() {
  expect(builtins.flatten([[], [''], []])).toBe(['']);
});
