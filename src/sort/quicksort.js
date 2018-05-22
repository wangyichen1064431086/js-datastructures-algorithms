function quicksort(arr) {
  if (!arr.length) {
    return [];
  }

  const [pivot, ...rest] = arr;

  return [
    ...quicksort(rest.filter(x => x < pivot)),
    pivot,
    ...quicksort(rest.filter(x => x >= pivot))
  ];
}

/******快速排序算法实现*****/
function quickSort(arr) {
  return quick(arr, 0, arr.length-1);
}
function quick(arr, left, right) {
  if(arr.length>1) {
    const index = partition(arr, left, right);
    console.log(`index:${index}`);
    if (left < index-1) {
      quick(arr, left, index-1);
    }
    if (index < right) {
      quick(arr, index, right);
    }
  }  
  return arr;
}
function partition(arr, left, right) {
  let i = left;
  let j = right;
  console.log(`arr:${arr}  left:${left} right:${right}`);
  const pivot = arr[Math.floor((i+j)/2)];
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

console.log(quickSort(myArr));

export default quickSort;