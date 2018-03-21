function Set() {
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
         * @param {Set} otherSet 
         */
    this.union = function(otherSet) {
        let unionSet = new Set();// 这里体现出无法用es6 class构造Set的原因。此处调用Set会直接调用class Set, 而无法调用最外层包含了私有变量items的Set,那么这样新的Set和原Set引用的是同一个items
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
        let intersectionSet = new Set();
        
        let thisSetValues = this.values();
        for (let value of thisSetValues) {
            if(otherSet.has(value)) {
                intersectionSet.add(value);
            }
        }
        return intersectionSet;
    }

    this.difference = function(otherSet) {//this-otherSet
        let differenceSet = new Set();
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
   

let set = new Set();

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

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
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

let setC = new Set();
setC.add(3);
setC.add(5);
console.log(setC.subset(setB));
export default Set;