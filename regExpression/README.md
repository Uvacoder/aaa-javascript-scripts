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

## regular expression patterns

Brackets are used to find a range of characters\
```[abc]```	Find any of the characters between the brackets\
```[0-9]```	Find any of the digits between the brackets\
```(x|y)```	Find any of the alternatives separated with ```|```

Metacharacters are characters with a special meaning\
```\d```	Find a digit\
```\s```	Find a whitespace character\
```\b```	Find a match at the beginning of a word like this: \bWORD, or at the end of a word like this: ```WORD\b```\
```\uxxxx```	Find the Unicode character specified by the hexadecimal number xxxx\