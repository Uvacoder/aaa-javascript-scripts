# javascript date format
Type  | Example
------------- | -------------
ISO Date  | "2020-03-25" (The International Standard)
Short Date  | "03/25/2020"
Long Date  | "Mar 25 2020" or "25 Mar 2020"


## javascript warning errors
month or days without leading zeros
```javascript
var myDate = new Date("2020-5-12");
console.log(myDate);
```
The behavior of "YYYY/MM/DD" is undefined
Some browsers will try to guess the format Some will return NaN
```javascript
var myDate = new Date("2020/05/12");
console.log(myDate);
```
