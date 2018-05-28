import quickSort from "../sort/quicksort";

function binarySearch(arr, item) {
  quickSort(arr);//快速排序实现从小到大排序
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high)/2);
    const midElem = arr[mid];
    if (item < midElem) {
      high = midElem - 1;
    } else if (item > midElem) {
      low = midElem + 1;
    } else {
      return mid;
    }
  }
  return -1;//没找到，返回-1

}

//Test
console.log(binarySearch([5, 4, 2, 6, 7, 8, 1, 3, 9, 0], 4));//得到的是在已排序数组中的序号，非原数组的序号

export default binarySearch;