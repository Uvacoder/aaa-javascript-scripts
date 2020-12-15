var band = ["avenged sevenfold", "nirvana", "queen"];

//pop()
band.pop(); //remove last element
//push()
band.push("metalica"); //adding last element
//shifting()
band.shift(); //remove first element
//unshift()
band.undshift("creed"); //addiing element
//deleting element
delete band[1]; //remove "nirvana"
//splice()
band.splice(2,1, "led zeppelin", "the beatles");
//concat()
var otherBand = ["ac/dc", "pink floyd", "aerosmith"];
var res = band.concat(otherBand);

//slice()
var slicing = band.slice(1);
