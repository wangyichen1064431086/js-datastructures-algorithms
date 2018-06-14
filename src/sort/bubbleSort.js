
function bubbleSort(arr) {
  const length = arr.length;
  let cost = 0;//计算开销
  for (let i = 0; i < length - 1; i++) {
    cost++;
    let changeOccur = false;
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
        changeOccur = true;
      }
    }

    if (!changeOccur) {
      break;
    }
  }
  console.log(cost);
}
//test
const myArr = [5, 1, 2, 2, 3];
bubbleSort(myArr);
console.log(myArr);

function coaktailBubbleSort(arr) {
  const length = arr.length;
  let low = 0;
  let high = length - 1;
  
  while(low < high) {
    let changeOccur = false;
    for (let j = low; j < high; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        changeOccur = true;
      }
    }
    if(!changeOccur) {
      break;//如果一次交换也没有发生，那直接就可以跳出，结束排序
    }
    high--;
    changeOccur = false;
    for (let j = high; j > low; j--) {
      if (arr[j] < arr[j-1]) {
        [arr[j-1], arr[j]] = [arr[j], arr[j-1]];
        changeOccur = true;
      }
    }
    if(!changeOccur) {
      break;
    }
    low++;
  }
}
const myArr1 = [1, 0, 5, 4, 2, 3,1,1,1,1];
coaktailBubbleSort(myArr1);
console.log(myArr1);
export default coaktailBubbleSort; //复杂度 O(n^2)