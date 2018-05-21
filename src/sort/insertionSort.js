function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) { //在arr[0,...,i-1]中插入arr[i]
    const toInsertValue = arr[i];
    let j;
    for (j = i; j >0 && arr[j-1] > toInsertValue; j--) { //找到一个比arr[i]大的项，就把这个项往后挪一项。因为最后一项就是toInsertValue，所以该值一直可以通过toInsertValue访问，故也不必另做保存。
      arr[j] = arr[j-1];
    }
    arr[j] = toInsertValue;//内循环结束得到的arr[j-1]是第一个比arr[i]小的值，那么就把arr[i]存储在此处的arr[j]上。而之前的arr[j]已经在上一轮循环中存储到了arr[j+1]中
    
  }
}

const myArr = [1, 0, 5, 4, 2, 3];

insertionSort(myArr);
console.log(myArr);

export default insertionSort;//排序小型数组时，此算法比冒泡排序和选择排序好