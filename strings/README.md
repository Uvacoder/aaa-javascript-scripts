# javascript strings

## escape squence
```\b```	Backspace\
```\f```	Form Feed\
```\n```	New Line\
```\r```	Carriage Return\
```\t```	Horizontal Tabulator\
```\v```	Vertical Tabulator
example
```javascript
console.log("myName is\t arfy slowy");
```

## string method
``length`` length of string\
``indexOf()`` finding string in a string\
``lastIndexOf()`` return index in a string return -1 if not found\
``slice()`` extract 2 part a string and return the extracted part in new string\
``substring()`` similiar like slice() but do not accept negative value\
``replace()`` replace string\
``toUpperCase()`` transfrom string to upper case\
``toLowerCase()`` transfrom string to lower case\
``concat()`` join 2 strings\
``trim()`` remove whitespace from both side string\
``chartAt()`` return position of char in string\
``charCodeAt()`` return unicode of the char in string

## convert string to arr
``javascript
var text = "arfy,jole,sayuti,adit,cature";
text.split(,);
text.split(" ");
text.split("|");
``
