function sum(arr) {
  return arr.reduce((a,b) => a+b);
}

console.log(sum([1, 2, 3, 4, 5]));

function mergeArraysConcat(arrs) {
  return arrs.reduce((a,b) => a.concat(b))
}

console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]));
export default sum;