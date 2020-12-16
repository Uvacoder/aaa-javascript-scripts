var dat1 = "arms";
var dat2 = "mars";

//remove non letter character and sort the letters in alphabetical order
var n1 = dat1.replace(/\W+/g,'').toLowerCase().split("").sort().join("");
var n2 = dat2.replace(/\W+/g,'').toLowerCase().split("").sort().join("");

var isAnagram = n1 == n2;
if(isAnagram) console.log("two words are anagram");
else console.log("two words are not anagram");
