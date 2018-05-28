// 顺序搜索
function sequentialSearch(arr, item) {
  for (let i=0, len=arr.length; i<len; i++) {
    if (item === arr[i]) {
      return i;
    }
  }
  return -1;
}

//test
console.log(sequentialSearch([5, 4, 3, 2, 1], 3));

export default sequentialSearch;