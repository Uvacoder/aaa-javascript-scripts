var decimalNumber = 12;
var floatingNumber = 12.2;
var scientificNumber = 12e+2;
var scientificNumber2 = 12e-2;


//precision
/*
Integers (numbers without a period or exponent notation) are accurate up to 15 digits.
var number1 = 999999999999999;   // number1 will be 999999999999999
var number2 = 9999999999999999;  // number2 will be 10000000000000000
*/

/*
The maximum number of decimals is 17, but floating point arithmetic is not always 100% accurate:

var getNum = 0.1 + 0.2;
var getOtherNum = (0.2 * 10 + 0.1 * 10) / 10;
console.log(getNum);
console.log(getOtherNum);
*/

console.log(decimalNumber);
console.log(floatingNumber);
console.log(scientificNumber);
console.log(scientificNumber2);
