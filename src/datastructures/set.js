/******** 手动实现的Set ********/
function MySet() {
    let items = {};
    
 
    this.has = function(value) {
        return items.hasOwnProperty(value);
    }
    this.add = function(value) {
        if(!this.has(value)) {
            items[value] = value;
            return true;
        } else {
            return false;
        }
    }
    this.remove = function(value) {
        if (this.has(value)) {
            delete items[value];
            return true;
        } else {
            return false;
        }
    }
    this.clear = function() {
        items = {};
    }
    this.size = function() {
        return Object.keys(items).length;
    }
    this.values = function() {
        const values = [];
        for (let key of Object.keys(items)) {
            values.push(items[key]);
        }
        return values;
    }

        /**
         * 
         * @param {MySet} otherMySet 
         */
    this.union = function(otherSet) {
        let unionSet = new MySet();// 这里体现出无法用es6 class构造Set的原因。此处调用Set会直接调用class Set, 而无法调用最外层包含了私有变量items的Set,那么这样新的Set和原Set引用的是同一个items
        let thisSetValues = this.values();
        for (let value of thisSetValues) {
            unionSet.add(value);
        }
        let otherSetValues = otherSet.values();
        for (let value of otherSetValues) {
            unionSet.add(value);
        }
        return unionSet;
    }

    this.intersection = function(otherSet) {
        let intersectionSet = new MySet();
        
        let thisSetValues = this.values();
        for (let value of thisSetValues) {
            if(otherSet.has(value)) {
                intersectionSet.add(value);
            }
        }
        return intersectionSet;
    }

    this.difference = function(otherSet) {//this-otherSet
        let differenceSet = new MySet();
        let thisSetValues = this.values();
        for (let value of thisSetValues) {
            if(!otherSet.has(value)) {
                differenceSet.add(value);
            }
        }
        return differenceSet;
    }

    this.subset = function(otherSet) {//判断this是否是otherSet的子集
        if (this.size() > otherSet.size()) {
            return false;
        }
        let thisSetValues = this.values();
        return thisSetValues.every(value => otherSet.has(value));
    }
}
   

let set = new MySet();

console.log(set.add(1));
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
console.log(set.add(2));
console.log(set.values());
console.log(set.remove(1));
console.log(set.values());
set.clear();
console.log(set.values());

let setA = new MySet();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new MySet();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

console.log('setA:',setA.values());
console.log('setB:',setB.values());
let unionSet = setA.union(setB);
console.log(unionSet.values());

let intersectionSet = setA.intersection(setB);
console.log(intersectionSet.values());

let differenceSet = setA.difference(setB);
console.log(differenceSet.values());

console.log(setA.subset(setB));

let setC = new MySet();
setC.add(3);
setC.add(5);
console.log(setC.subset(setB));

/******ES6的Set******/
let nativeSet = new Set();
nativeSet.add(1);

console.log(nativeSet.has(1));
console.log(nativeSet.size);
nativeSet.delete(1);
console.log(nativeSet.values());
nativeSet = new Set([1,2,3,4,5]);
console.log(nativeSet);
console.log(nativeSet.keys());
console.log(nativeSet.values());
console.log(nativeSet.entries());

console.log('next:')
let setEntries = nativeSet.entries();
console.log(setEntries.next().value);//[1,1]
console.log(setEntries.next().value);//[2,2]
console.log(setEntries.next().value);//[3,3]

//Set迭代
console.log('iterator:')
for (let item of nativeSet) {
   console.log(item);
}//依次输出 1  2  3  4  5

for (let item of nativeSet.keys()) {
    console.log(item);
}//依次输出 1  2  3  4  5

for (let item of nativeSet.values()) {
    console.log(item);
}//依次输出 1  2  3  4  5

for (let [key, value] of nativeSet.entries()) {
    console.log(key,value);
}//依次输出 1 1    2 2   3 3   4 4   5 5（键与值相等

//Arr,Set转换
let theArr = ['a','b','c','c'];
let theSet = new Set(theArr);//Set(3){"a","b","c"}     //arrr转set
console.log(theSet);
console.log([...theSet]);//["a","b","c"]  //set转arr


//模拟并集操作
let nativeSetA = new Set([1,2,3]);
let nativeSetB = new Set([2,3,4]);
let unionAb = new Set();
for (let x of nativeSetA) {
    unionAb.add(x);
}
for (let x of nativeSetB) {
    unionAb.add(x);
}
console.log(unionAb);

//模拟交集操作
function intersection(setA, setB) {
    let intersectionSet = new Set();
    for (let item of setA) {
        if (setB.has(item)) {
            intersectionSet.add(item)
        }
    }
    return intersectionSet
}
console.log(intersection(new Set([1,2,4]), new Set([2,3,4])));//Set(2) {2, 4}

//模拟差集操作
function difference(setA,setB) {
    let differenceSet = new Set();
    for (let item of setA) {
        if (!setB.has(item)) {
            differenceSet.add(item);
        }
    }
    return differenceSet;
}
console.log(difference(new Set([2,4,5,6]), new Set([2,5])))//Set(2) {4, 6}
export default MySet;