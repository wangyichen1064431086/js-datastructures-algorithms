function heapSort(arr) {
  let len = arr.length;
  if (len === 0) {
    return;
  }
  buildHeap(arr);

  while(len > arr.length-10) {
    const temp = arr[len-1];
    arr[len-1] = arr[0];
    arr[0] = temp;

    len--;
    if(len > 1) {
      heaplify(arr, len, 0);
    }
  }
}

function buildHeap(arr) {
  const len = arr.length;
  const lastParentIndex = Math.floor(len/2) - 1;

  for(let i=lastParentIndex; i>=0; i--) {
    heaplify(arr, len, i);
  }
}

function heaplify(arr, len, index) {
  const leftIndex = index*2 + 1;
  const rightIndex = index*2 + 2;
  let biggestValueIndex = index;

  if (leftIndex < len && arr[leftIndex] > arr[biggestValueIndex]) {
    biggestValueIndex = leftIndex;
  }

  if (rightIndex < len && arr[rightIndex] > arr[biggestValueIndex]) {
    biggestValueIndex = rightIndex;
  }

  if (biggestValueIndex !== index) {
    const temp = arr[index];
    arr[index] = arr[biggestValueIndex];
    arr[biggestValueIndex] = temp;
    heaplify(arr, len, biggestValueIndex);
  }
}

const arr = [3, 5, 1, 6, 4, 7, 2, 9, 10, 13, 12, 14, 15, 16, 17];
heapSort(arr);
console.log(arr);