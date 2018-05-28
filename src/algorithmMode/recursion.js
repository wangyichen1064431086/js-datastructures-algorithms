// 递归
// Test: JavaScript调用栈大小的限制

let i = 0;

function recursiveFn() {
  i++;
  recursiveFn();
}

// try {
//   recursiveFn();
// } catch (err) {
//   alert(`i=${i} error: ${err}`);
// }

//递归的应用：斐波那契数列
function fibonacci(index) {
  if (index < 0) {
    return null;
  }
  if (index === 0 || index === 1) {
    return 1;
  }
  return fibonacci(index - 1) + fibonacci(index - 2);
}
//Test:
console.log(fibonacci(5));
export default fibonacci;
