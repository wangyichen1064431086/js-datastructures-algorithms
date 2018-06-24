/*******堆排序算法实现************/
function heapSort(arr) {
  let heapSize = arr.length;
  buildHeap(arr);//构造一个所有节点都满足arr[parent[i]] > arr[i]的堆结构数组，这样就把值最大的那个节点换到了根节点
  while(heapSize > 1) {
    //在当前树中，交换位于根节点的最大值和最后一个节点的值,这样就把最大值排在了最后一个节点，这样就排好了最大值
    const temp = arr[0];
    arr[0]=arr[heapSize-1];
    arr[heapSize-1] = temp;
    console.log('Exchange:')
    console.log(arr);

    heapSize--;//当前树中最后一个节点已经排好了值，故后面就不用再考虑这个节点，故新的树的大小减一
    if (heapSize>1) {
      heapify(arr, heapSize, 0);//上面的交换操作产生了新的根节点，新的根节点只是通过跟最后一个节点交换得到了值，故新的根节点不满足其以下的子节点都有arr[parent[i]]<arr[i]，故要在新的树中对新的根节点再进行heaplify处理，直到满足从根节点往下的子节点都有arr[parent[i]]>=arr[i]
      console.log('heaplify:');
      console.log(arr);
    }
  }
}

/**
 * @description 构造一个所有节点都满足arr[parent[i]] > arr[i]的堆结构数组
 * @param {Array} arr 待排序数组
 */
function buildHeap(arr) {
  const heapSize = arr.length;
  const firstHeapifyIndex = Math.floor(heapSize/2-1);//从树的倒数第二层的最后一个有子节点的节点（对于满二叉树就是倒数第二层的最后一个节点）开始进行heapify处理。(heapSize/2-1)就是这个最后一个有子节点的节点索引。
  for (let i=firstHeapifyIndex; i >= 0; i--) {//从0到firstHeapifyIndex都要进行heapify处理，才能把最大的那个节点换到根节点
    heapify(arr, heapSize, i);
  }
}

/**
 * @description 以数组arr的前heapSize个节点为树，对其中索引为i的节点向子节点进行替换，直到满足从i往下的子节点都有arr[parent[i]]>=arr[i]
 * @param {*} arr TYPE Array  待排序的数组
 * @param {*} heapSize TYPE Number 待排序的数组中要作为当前树处理的从前往后数的节点个数，即待排序数组中前heapSize个点是要作为树来处理
 * @param {*} i TYPE Number arr数组中、heapSize长度的树中的当前要进行往子节点替换的节点的索引
 */
function heapify(arr, heapSize, i) {
  const leftIndex = i * 2 + 1;//索引i的节点的左子节点索引
  const rightIndex = i * 2 + 2;//索引i的节点的右子节点索引
  let biggestValueIndex = i;
  if (leftIndex < heapSize && arr[leftIndex] > arr[biggestValueIndex]) {
    //节点的最大index为heapSize-1
    //注意：这两次比较要跟arr[biggestValueIndex]比较，不能跟arr[i]比较，因为biggestValueIndex是会在左右i之间更新的
    biggestValueIndex = leftIndex; //如果左子节点的值大于biggestValueIndex的值（此时就是根节点的值），那么更新biggestValueIndex为左子节点索引
  }
  if (rightIndex < heapSize && arr[rightIndex] > arr[biggestValueIndex]) {
    biggestValueIndex = rightIndex;//如果右子节点的值大于biggestValueIndex的值(此时可能是根节点的值，也可能是左子节点的值)，那么更新biggestValueIndex为右子节点索引
  }
  if (biggestValueIndex !== i) { //如果biggestValueIndex是左子节点索引或右子节点索引，那么交换根节点与biggestValueIndex节点的值
    const temp = arr[i];
    arr[i] = arr[biggestValueIndex];
    arr[biggestValueIndex] = temp;

    //交换后，被交换的那个子节点（左子节点或右子节点）往下可能就不再满足[parent[i]]>=arr[i]，所以要继续对biggestValueIndex进行heaify处理，即将biggestValueIndex可能需要和子节点进行值交换,直到树的这个分支到叶子节点都满足arr[parent[i]]>=arr[i]
    heapify(arr, heapSize, biggestValueIndex);//要

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