var fs = require('fs');

//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');

console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
  console.log(result)  ;
});
console.log('C');
console.log('D');
console.log('E');
console.log('F');
console.log('G');
console.log('H');
console.log('I');
console.log('J');
console.log('K');
console.log('L');
console.log('M');
console.log('N');
console.log('O');
console.log('P');
console.log('Q');
console.log('R');
console.log('S');
console.log('T');
console.log('U');
console.log('V');
console.log('W');
console.log('X');
console.log('Y');
console.log('Z');
