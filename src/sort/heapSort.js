/*******堆排序算法实现************/
function heapSort(arr) {
  let heapSize = arr.length;
  buildHeap(arr);//把最大的那个节点换到了根节点
  while(heapSize > 1) {
    const temp = arr[0];
    arr[0]=arr[heapSize-1];
    arr[heapSize-1] = temp;//在当前树中，交换位于根节点的最大值和最后一个节点的值,这样就排好了这个最大值
    console.log('Exchange:')
    console.log(arr);

    heapSize--;//当前树中最后一个节点已经排好了值，故后面就不用再考虑这个节点，故新的树的大小减一
    if (heapSize>1) {
      heapify(arr, heapSize, 0);//交换后新的根节点不满足它以下的子节点都有arr[parent[i]]<arr[i]，故要在新的树中对新的根节点再进行heapify处理
      console.log('heaplify:');
      console.log(arr);
      

    }

  }
}

function buildHeap(arr) {
  const heapSize = arr.length;
  const firstHeapifyIndex = Math.floor(heapSize/2-1);//从树的倒数第二层的最后一个有子节点的节点（对于满二叉树就是倒数第二层的最后一个节点）开始进行heapify处理
  console.log('First build heap:');
  for (let i=firstHeapifyIndex; i >= 0; i--) {//从0到firstHeapifyIndex都要进行heapify处理，才能把最大的那个节点换到根节点
    heapify(arr, heapSize, i);
    console.log(arr);
  }
}

/**
 * @description 以数组arr的前heapSize个节点为树，对其中索引为i的节点向子节点进行替换，直到满足从i往下的子节点都有arr[parent[i]]>=arr[i]
 * @param {*} arr TYPE Array  待排序的数组
 * @param {*} heapSize TYPE Number 待排序的数组中要作为当前树处理的从前往后数的节点个数，即待排序数组中前heapSize个点是要作为树来处理
 * @param {*} i TYPE Number arr数组中、heapSize长度的树中的当前要进行往子节点替换的节点的索引
 */
function heapify(arr, heapSize, i) {
  const leftIndex = i * 2 + 1;
  const rightIndex = i * 2 + 2;
  let biggestValueIndex = i;
  if (leftIndex < heapSize && arr[leftIndex] > arr[biggestValueIndex]) {
    //节点的最大index为heapSize-1
    //注意：这两次比较要跟arr[biggestValueIndex]比较，不能跟arr[i]比较，因为biggestValueIndex是会在左右i之间更新的
    biggestValueIndex = leftIndex;
  }
  if (rightIndex < heapSize && arr[rightIndex] > arr[biggestValueIndex]) {
    biggestValueIndex = rightIndex;
  }
  if (biggestValueIndex !== i) {
    const temp = arr[i];
    arr[i] = arr[biggestValueIndex];
    arr[biggestValueIndex] = temp;
    heapify(arr, heapSize, biggestValueIndex);//要继续对biggestValueIndex进行往子节点交换处理,直到树的这个分支到叶子节点都满足arr[parent[i]]>=arr[i]

  }
}

//Test
const myArr = [3, 5, 1, 6, 4, 7, 2];
heapSort(myArr);
console.log('result:');
console.log(myArr);

const myArr2 = [3, 5, 1, 6, 4, 7, 2, 9, 10, 13, 12, 14, 15, 16, 17];
heapSort(myArr2);
console.log('result:');
console.log(myArr2);
export default heapSort;