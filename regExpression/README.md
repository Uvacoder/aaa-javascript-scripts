# Regular expression

## regular expression modifiers
```i``` = Perform case-insensitive matching
```javascript
var personName = "arfy Slowy";
var searchName = "slowy";
var resultSearch = personName.match(searchName);
```

```g``` = Perform a global match (find all matches rather than stopping after the first match)
```javascript 
var personName = "arfy slowy is Name Arfy Slowy";
var searchName = /arfy/g;
var searchResult = personName.match(searchName);
```

```m``` = 	Perform multiline matching
```javascript
var personName = "\nArfy slowy is my name";
var search = /^arfy/m;
var result = personName.match(search);
```