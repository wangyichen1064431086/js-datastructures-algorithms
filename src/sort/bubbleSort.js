
function bubbleSort(arr) {
  const length = arr.length;
  let cost = 0;//计算开销
  for (let i = 0; i < length - 1; i++) {
    cost++;
    for (let j = 0; j < length - i -1; j++) {
      cost++;
      if (arr[j] > arr[j+1]) {
        /*
        const temp = arr[j]; 
        arr[j] = arr[j+1];
        arr[j+1] = temp; 
        */
        //这三行的交换函数用ES6来写：
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];

      }
    }
  }
  console.log(cost);
}

const myArr = [1, 0, 5, 4, 2, 3,1,1,1,1];
bubbleSort(myArr);
console.log(myArr);
export default bubbleSort; //复杂度 O(n^2)