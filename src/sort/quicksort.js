function quickSortEs6(arr) {
  if (!arr.length) {
    return [];
  }

  const [pivot, ...rest] = arr;
  return [
    ...quickSortEs6(rest.filter(item => item < pivot)),
    pivot,
    ...quickSortEs6(rest.filter(item => item >= pivot))
  ]
}

/******快速排序算法实现*****/
function quickSort(arr) {
  return quick(arr, 0, arr.length-1);
}
function quick(arr, left, right) {
  if(arr.length>1) {
    const sliceIndex = partition(arr, left, right);
    console.log(`index:${sliceIndex}`);
    if (left < sliceIndex-1) {
      quick(arr, left, sliceIndex-1);
    }
    if (sliceIndex+1 < right) {
      quick(arr, sliceIndex+1, right);
    }
  }  
 // return arr;这个返回不返回都行
}
function partition(arr, left, right) {
  let i = left;
  let j = right;
  console.log(`arr:${arr}  left:${left} right:${right}`);
  //const pivotIndex = Math.floor((i+j)/2); 
  const pivot = arr[Math.floor((i+j)/2)];
  console.log(`pivotIndex:${Math.floor((i+j)/2)}`);
  console.log(`pivot:${pivot}`);
  while(i<=j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if(i<=j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      
      i++;
      j--;
    }
  }
  return i;
}

const myArr = [3, 5, 1, 6, 4, 7, 2];
quickSort(myArr);
console.log(myArr);

export default quickSort;