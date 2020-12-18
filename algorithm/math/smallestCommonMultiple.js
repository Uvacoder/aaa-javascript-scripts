function smallestCommons(arr) {
  arr.sort(function(a, b) {                         
    return b - a;
  });

  var num = [];
  for (var i = arr[0]; i >= arr[1]; i--) {
    num.push(i);
  }

  var quot = 0;
  var loop = 1;
  var n;

  do {
    quot = num[0] * loop * num[1];
    for (n = 2; n < num.length; n++) {
      if (quot % num[n] !== 0) {
        break;
      }
    }
    loop++;
  } while (n !== num.length);

 return quot;
}

smallestCommons([1,5]);
