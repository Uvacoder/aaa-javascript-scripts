var number1 = 12;
number1.toString();
(321).toString();     //return 321
(30 + 20).toString(); //return 50
console.log(number1);
console.log((40 + 20).toString());


//toExponential
var number2 = 3.652;
console.log(number2.toExponential(2));
console.log(number2.toExponential(4));
console.log(number2.toExponential(6));

//toFixed()
var number3 = 2.723;
console.log(number3.toFixed(0));
console.log(number3.toFixed(4));
console.log(number3.toFixed(6));

//toPrecision
var number4 = 8.621;
console.log(number4.toPrecision());
console.log(number4.toPrecision(4));
console.log(number4.toPrecision(6));
