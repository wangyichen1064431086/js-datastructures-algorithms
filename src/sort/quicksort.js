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
      quick(arr, sliceIndex, right);
    }
  }  
 // return arr;这个返回不返回都行
}
function partition(arr, left, right) {
  let i = left;
  let j = right;
  console.log(`arr:${arr}  left:${left} right:${right}`);
  //const pivot = arr[Math.floor((i+j)/2)];
  const pivot = arr[i];
  console.log(`pivotIndex:${Math.floor((i+j)/2)}`);
  console.log(`pivot:${pivot}`);
  while(i<j) {
    ///一开始肯定是i<j
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    ///这两步执行完，可能出现i==j或i<j

    if(i<j) { //这里是二者交换的条件，二者相等的时候就为同一项，所以不需要i<=j,只需要i<j
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    if(i<=j){ //这里条件一定要是i<=j。 
      //如果条件仅仅是i<j，那么当i==j的时候就永远也进入不了这个条件，return 的值就是i也是j。那么这一整段partion代码下来，i可能从来没有变过，又原封不动地return了i,即  const sliceIndex = partition(arr, left, right);的这个sliceIndex是和参数left相等的，那么在接下来的quick(arr, sliceIndex, right)就等于之前的quick(arr,left,right)，无限循环了
      //总之，这个条件的目的就是让i一定要改变一次
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