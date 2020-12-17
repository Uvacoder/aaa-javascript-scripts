const reverse = integer =>
parseInt(integer
    .toString()
    .split("")
    .reverse()
    .join("")
  ) * Math.sign(integer);

console.log(reverse(4729));
console.log(reverse(-270));
