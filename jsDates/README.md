# javascript dates

## specific dates
5 numbers specify year,month,day,hour, minute
```javascript
var myDate = new Date(2020, 10, 4, 10, 23);
console.log(myDate);
```
4 numbers specify year, month, day, hour
```javascript
var myDate = new Date(2020, 10, 4, 10);
console.log(myDate);
```
3 numbers specify year,month,day
```javascript
var myDate = new Date(2020, 10, 4);
console.log(myDate);
```
2 numbers specify year and month
```javascript
var myDate = new Date(2020, 10);
console.log(myDate);
```
one and two digits will be intrepeted as ``19nn``
```javascript
var centuryDate = new Date(98, 11, 23);
console.log(centuryDate); //1998
```

## date string
```javascript
var myDate = new Date("December 10, 2020 11:13:00");
console.log(myDate);
```

## javascript store date milliseconds
```javascript
var myDate = new Date(200000000000);
console.log(myDate);
```

## date to utc string and ISO
```javascript
var myDate = new Date();
console.log(myDate.toUTCString());
```

```javascript
var myDate = newDate();
console.log(myDate.toISOString());
```
