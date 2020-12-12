/*
for(i =0; i<length; i++)
{
  statement
}
*/
var personInformation = {firstName: "jole", age: 20};
var text = "";
var x;
for(x in personInformation)
{
  text += personInformation[x];
}
