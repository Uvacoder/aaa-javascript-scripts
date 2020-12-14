#javascript Number

## working converting string in operation
``javascript
var number1 = "20";
var number2 = "30";
var result = number1 + number2;
console.log(result); //ouput will be 50
``
not working when using ``+`` operation
``javascript
var number1 = "20";
var number2 = "30";
var result = number1 + number2;
console.log(result); //ouput will be "2030"
``

## NaN (not an number)
``javascript
var number1 = 100 / "reach"; //return is NaN
console.log(number1);
``
other
``javascript
var number1 = NaN;
var number2 = 12;
var result = number1 + number2;
console.log(result);
``

## infinity
``Infinity`` (or -Infinity) is the value JavaScript will return if you calculate a number outside the largest possible number
``javascript
var number1 = 3;
while(number1 != Infinity)
{
  number1 = number1 * number1;
}
``

## hexadecimal
javascript intreprets numeric constant as hexadecimal
``javascript
var hexadecimalNumber = 0xFF;
console.log(hexadecimalNumber);
``
