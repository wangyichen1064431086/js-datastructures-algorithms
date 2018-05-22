//归并排序

function mergeSort(arr) {
    return mergeSortRec(arr);
}
function mergeSortRec(arr) {
    const length = arr.length;
    if (length === 1) {
        return arr;
    }
    const mid = Math.floor(length / 2);
    console.log(mid);
    const left = arr.slice(0,  mid);
    const right = arr.slice(mid, length);
    console.log('left:');
    console.log(left);
    console.log('right:');
    console.log(right);
    return merge(mergeSortRec(left), mergeSortRec(right)); //要将原始数组分割直只有一个元素时，才开始归并
}

function merge(left, right) {
    console.log('merge:');
    console.log('left:');
    console.log(left);
    console.log('right:');
    console.log(right);
    const result = [];
    let il = 0;
    let ir = 0;

    //left, right本身肯定都是从小到大排好序的
    while( il < left.length && ir < right.length) {
        console.log(`left[${il}]:${left[il]}`);
        console.log(`right[${ir}]:${right[ir]}`);
        if (left[il] < right[ir]) {
            result.push(left[il]);
            il++;
        } else {
            result.push(right[ir]);
            ir++;
        }
        
    }
    console.log(`result:${result}`);
     console.log(`il:${il}`);
    console.log(`ir:${ir}`);
    //不可能同时存在left和right都有剩余项的情况, 要么left要么right有剩余项, 把剩余项加进来即可
    while (il < left.length) { 
        console.log(`left[${il}]:${left[il]}`);
        result.push(left[il]);
        console.log(`result:${result}`);
        il++;
    }
    while(ir < right.length) {
        console.log(`right[${ir}]:${right[ir]}`);
        result.push(right[ir]);
        console.log(`result:${result}`);

        ir++;
    }
    console.log('result:'); //
    console.log(result);
    return result;
}

console.log(mergeSort([8, 7, 6, 5, 4, 3, 2, 1]));

export default mergeSort; //复杂度O(nlogn)

//第一个可以被实际应用的排序算法，性能好于冒泡和插入法