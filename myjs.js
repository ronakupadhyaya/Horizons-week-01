var comparer = function(a,b) {
  var lastLetterA = a[a.length - 1];
  var lastLetterB = b[b.length - 1];
  var aCheck = lastLetterA != 'J' || lastLetterA != 'K' || lastLetterA != 'Q' || lastLetterA != 'A';
  var bCheck = lastLetterB != 'J' || lastLetterB != 'K' || lastLetterB != 'Q' || lastLetterB != 'B';

  if(!aCheck || !bCheck) {
    return 0;
  }
  if(lastLetterA == 'A' && lastLetterB = 'A') {
    return 0;
  }
  if(lastLetterA == 'Q' && lastLetterB = 'A') {
    return 0;
  }
}
