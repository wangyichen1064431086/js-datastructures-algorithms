function selectionSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1 ; j < length ; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    
  }
}

const myArr =  [5, 1, 2, 2, 3];

selectionSort(myArr);
console.log(myArr);

export default selectionSort;//复杂度 O(n^2)