var arr = ['A', 'B', 'C', 'D'];
console.log(arr);
console.log(arr[1]);
arr[2] = 3;
console.log(arr);
console.log(arr.length);
arr.push('E');
console.log(arr);

var number = [1, 400, 12, 34, 5];
var i = 0;
while (i < 5){
  console.log(number[i]);
  i++;
}

var i = 0;
while (i < number.length){
  console.log(number[i]);
  i++;
}

for (i in number){
  console.log(number[i]);
}
