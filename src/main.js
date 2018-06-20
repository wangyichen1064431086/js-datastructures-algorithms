

//import quickSort from './sort/quicksort';

function quickSort(arr) {
  quick(arr, 0, arr.length-1);
}

function quick(arr, left, right) {
  if (arr.length ===1) {
    return;
  }
  const sliceIndex = partition(arr, left, right);
  if(left < sliceIndex-1) {
    quick(arr, left, sliceIndex-1);
  }
  if(sliceIndex < right) {
    quick(arr, sliceIndex, right);
  }
}

function partition(arr, left, right) {
  let i = left;
  let j = right;
  const pivot = arr[i];
  while(i < j) {
    while(arr[i] < pivot) {
      i++;
    }
    while(arr[j] > pivot) {
      j--;
    }
    if(i < j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    if(i <= j) { 
      i++;
      j--;
    }
  }
  return i;//其实也是等于j的
}


const myArr = [3, 5, 2, 6, 4, 7, 2];
quickSort(myArr);
console.log(myArr);