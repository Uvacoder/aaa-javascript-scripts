var number1 = 20;
number1.valueOf();
(75).valueOf();
(80 + 30).valueOf();
console.log(number1.valueOf());

//Number()
Number(true);          // returns 1
Number(false);         // returns 0
Number("20");          // returns 20
Number("  20");        // returns 20
Number("20  ");        // returns 20
Number(" 20  ");       // returns 20
Number("20.33");       // returns 20.33
Number("20,33");       // returns NaN
Number("20 33");       // returns NaN
Number("arfy");        // returns NaN


//parseInt()
parseInt("20");         // returns 20
parseInt("20.33");      // returns 20
parseInt("20 20 30");   // returns 20
parseInt("20 years");   // returns 20
parseInt("years 20");   // returns NaN

//parseFloat()
parseFloat("20");        // returns 20
parseFloat("20.33");     // returns 20.33
parseFloat("20 30 40");  // returns 20
parseFloat("20 years");  // returns 20
parseFloat("years 20");  // returns NaN
